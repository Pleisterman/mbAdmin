<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/IndexController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          This controller handles the index route of the MbAdmin application
 *          it creates the initial view and includes the nescecerry javascript files,
 *          options, translations, colors
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 * 
 *  Zend Framework (http://framework.zend.com/)
 *
 *  @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 *  @license   http://framework.zend.com/license/new-bsd New BSD License
 */


namespace MbAdmin\Controller;

use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Common\Service\Debugger;
use Common\Service\DeviceDetector;
use MbCommon\Security\Authentification\AuthentificationController;
use MbCommon\Database\Options\Options\OptionsDataController;
use MbCommon\Database\Help\HelpDataController;
use MbCommon\Database\Options\Colors\ColorsDataController;
use MbCommon\Database\Language\LanguageDataController;

class IndexController extends AbstractActionController
{
    // members
    private $debugger = null;
    private $baseDirectory = 'mbAdmin';
    private $configId = 'mbAdmin';
    private $config = array( 
        'dataDir'                       => '',
        'debugger'                      => array(),
        'minimumPasswordStrength'      => 3,
        'minimumPasswordLength'        => 8,
        'minimumLoginNameLength'       => 8,
        'pageTokenRefreshPeriod'       => 3600 // seconds
    );
    private $isResetPassword = false;
    private $routeHome = 'MbAdminRouteHome';
    private $authentificationController = null;
    private $workDirectory = null;
    private $deviceDetector = null;
    private $selectedLanguageArray = null;
    private $languageController = null;
    private $viewTemplate = 'mbAdmin/index/index';
    private $layoutTemplate = 'mbAdmin/common/layout';
    
    private $cssFiles = [ 
                '/modules/mbAdmin/css/common.css' 
            ];
    private $thirdPartyJsFiles = [  
                '/js/thirdParty/jquery.min.js'
            ];
    private $jsProjectFiles = [     
        '/modules/common/js/jsProject/jsProject.js',                           // main jsProject file
        '/modules/common/js/jsProject/eventsModule.js',                        // events
        '/modules/common/js/jsProject/debugModule.js',                         // debug
        '/modules/common/js/jsProject/ajaxModule.js',                          // ajax
        '/modules/common/js/jsProject/browserModule.js',                       // browser
        '/modules/common/js/jsProject/storageModule.js',                       // storage
        '/modules/common/js/jsProject/assetsModule.js',                        // assets
        '/modules/common/js/jsProject/valuesModule.js',                        // values
        '/modules/common/js/jsProject/jsonToElementHtmlModule.js',             // json to html element parser
        '/modules/common/js/jsProject/functions/functionsModule.js',           // functions
        '/modules/common/js/jsProject/functions/getJsonValueFunction.js',      // get json value
        '/modules/common/js/jsProject/functions/getLinearGradientPrefixFunction.js', // get linear gradient 
        '/modules/common/js/jsProject/functions/elementIsVisibleFunction.js',  // element is visible
        '/modules/common/js/jsProject/functions/scrollElementFunction.js',     // scroll element into view
        '/modules/common/js/jsProject/functions/getElementPositionFunction.js',// get element position
        '/modules/common/js/jsProject/functions/padFunction.js',               // paddig
        '/modules/common/js/jsProject/functions/checkEmailSyntaxFunction.js',  // check email syntax
        '/modules/common/js/jsProject/functions/xorStringFunction.js',         // xor string
        '/modules/common/js/jsProject/functions/orderArrayFunction.js',        // order array
        '/modules/common/js/jsProject/functions/dateObjectToDbDateFunction.js',// date object to database date format
        '/modules/common/js/jsProject/functions/dateObjectToTextFunction.js',  // date object to text date format
        '/modules/common/js/jsProject/functions/dbDateToDateObjectFunction.js',// dabatbase date format to date object
        '/modules/common/js/jsProject/functions/getNextDayFunction.js',        // get next day date object
        '/modules/common/js/jsProject/functions/getPreviousDayFunction.js',    // get previous day date object
        '/modules/common/js/jsProject/functions/getTodayDbDateFunction.js',    // gget today in database format
        '/modules/common/js/jsProject/functions/getTodayTextFunction.js',      // get today in text format
        '/modules/common/js/jsProject/functions/getWeekFunction.js',           // get next week
        '/modules/common/js/jsProject/functions/textToDateObjectFunction.js',  // text to date object
        '/modules/common/js/jsProject/functions/hexStringToRgbFunction.js',    // hex string to rgb object
        '/modules/common/js/jsProject/functions/hsvToRgbFunction.js',          // hsv object to rgb object
        '/modules/common/js/jsProject/functions/rgbIsRgbFunction.js',          // rgb object values === rgb objet values
        '/modules/common/js/jsProject/functions/rgbToHsvFunction.js',          // rgb object to hsv object
        '/modules/common/js/jsProject/functions/rgbToHexStringFunction.js',    // rgb object to hax string
        '/modules/common/js/jsProject/functions/rgbToStringFunction.js',       // rgb object to string
        '/modules/common/js/jsProject/functions/stringToRgbFunction.js'        // strng to rgb object
    ];
    private $applicationJsFiles = [ 
        
        '/modules/mbAdmin/js/main/main.js',
        '/modules/mbAdmin/js/main/valuesModule.js',
        '/modules/mbAdmin/js/main/settingsModule.js',
        '/modules/mbAdmin/js/main/brandModule.js',
        '/modules/mbAdmin/js/main/introModule.js',
        '/modules/mbAdmin/js/data/dataModule.js',
        
        '/modules/mbAdmin/js/options/testModule.js',
        
        '/modules/mbAdmin/js/data/dataModule.js',
        '/modules/mbAdmin/js/data/vat/vatSelectModule.js',
        '/modules/mbAdmin/js/data/vat/vatDataObjectModule.js',
        '/modules/mbAdmin/js/data/vat/vatModule.js',
        '/modules/mbAdmin/js/data/projects/projectsSelectModule.js',
        '/modules/mbAdmin/js/data/projects/projectsListModule.js',
        '/modules/mbAdmin/js/data/projects/projectDataObjectModule.js',
        '/modules/mbAdmin/js/data/projects/projectsModule.js',
        '/modules/mbAdmin/js/data/projects/projectContactsModule.js',
        '/modules/mbAdmin/js/data/contacts/contactsSelectModule.js',
        '/modules/mbAdmin/js/data/contacts/contactsListModule.js',
        '/modules/mbAdmin/js/data/contacts/contactDataObjectModule.js',
        '/modules/mbAdmin/js/data/contacts/contactsModule.js',
        '/modules/mbAdmin/js/data/contacts/contactProjectsModule.js',
        '/modules/mbAdmin/js/data/vehicles/vehiclesSelectModule.js',
        '/modules/mbAdmin/js/data/vehicles/vehiclesListModule.js',
        '/modules/mbAdmin/js/data/vehicles/vehicleDataObjectModule.js',
        '/modules/mbAdmin/js/data/vehicles/vehiclesModule.js',
        '/modules/mbAdmin/js/data/tasks/tasksModule.js',
        '/modules/mbAdmin/js/data/tasks/tasksListSelectModule.js',
        '/modules/mbAdmin/js/data/tasks/taskDataObjectModule.js',
        '/modules/mbAdmin/js/data/costs/costsModule.js',
        '/modules/mbAdmin/js/data/costs/costsListSelectModule.js',
        '/modules/mbAdmin/js/data/costs/costDataObjectModule.js',
        '/modules/mbAdmin/js/data/rides/ridesModule.js',
        '/modules/mbAdmin/js/data/rides/ridesListSelectModule.js',
        '/modules/mbAdmin/js/data/rides/rideDataObjectModule.js',
        '/modules/mbAdmin/js/data/documents/documentsModule.js',
        '/modules/mbAdmin/js/data/documents/documentsListModule.js',
        '/modules/mbAdmin/js/data/documents/documentsSelectModule.js',
        '/modules/mbAdmin/js/data/documents/documentsListSelectModule.js',
        '/modules/mbAdmin/js/data/documents/documentDataObjectModule.js',
        '/modules/mbAdmin/js/data/export/exportModule.js',
        '/modules/mbAdmin/js/data/export/exportProjectsDataObjectModule.js',
        '/modules/mbAdmin/js/data/export/exportContactsDataObjectModule.js',
        '/modules/mbAdmin/js/data/export/exportVehiclesDataObjectModule.js',
        '/modules/mbAdmin/js/data/export/exportTasksTotalsSelectModule.js',
        '/modules/mbAdmin/js/data/export/exportTasksDataObjectModule.js',
        '/modules/mbAdmin/js/data/export/exportRidesTotalsSelectModule.js',
        '/modules/mbAdmin/js/data/export/exportRidesDataObjectModule.js',
        
        '/modules/mbCommon/js/upload/documentUploadModule.js',
        
        '/modules/mbCommon/js/layout/layoutModule.js',
        '/modules/mbCommon/js/layout/dividerModule.js',
        
        '/modules/mbCommon/js/main/busyScreenModule.js',
        
        '/modules/mbCommon/js/data/dataFunctionsModule.js',
        '/modules/mbCommon/js/data/hasAjaxResultErrorsFunction.js',
        '/modules/mbCommon/js/data/prepareDataShowFunction.js',
        
        '/modules/mbCommon/js/export/exportContainerModule.js',
        '/modules/mbCommon/js/export/exportDisplayModule.js',
        '/modules/mbCommon/js/export/delimiterSelectModule.js',
        
        '/modules/mbCommon/js/about/aboutModule.js',
        '/modules/mbCommon/js/about/aboutMenuModule.js',
        '/modules/mbCommon/js/about/aboutMenuButtonModule.js',
        '/modules/mbCommon/js/about/aboutMenuLayerModule.js',
        
        '/modules/mbCommon/js/info/infoModule.js',
        '/modules/mbCommon/js/info/infoDialogModule.js',
        
        '/modules/mbCommon/js/help/helpModule.js',
        '/modules/mbCommon/js/help/helpDialogModule.js',
        '/modules/mbCommon/js/help/helpDialogSubjectListModule.js',
        '/modules/mbCommon/js/help/helpDialogTextModule.js',

        '/modules/mbCommon/js/errors/errorModule.js',
        '/modules/mbCommon/js/errors/errorDialogModule.js',
        
        '/modules/mbCommon/js/messages/messageModule.js',
        '/modules/mbCommon/js/messages/dataOutOfDateDialogModule.js',
        '/modules/mbCommon/js/messages/messageDialogModule.js',
        
        '/modules/mbCommon/js/options/optionsModule.js',
        '/modules/mbCommon/js/options/optionsMenuModule.js',
        '/modules/mbCommon/js/options/optionsMenuButtonModule.js',
        '/modules/mbCommon/js/options/optionsMenuLayerModule.js',
        '/modules/mbCommon/js/options/fontModule.js',
        '/modules/mbCommon/js/options/colorSchemeSelectModule.js',
        '/modules/mbCommon/js/options/colorsModule.js',
        
        '/modules/mbCommon/js/tabStops/tabStopsModule.js',
        
        '/modules/mbCommon/js/tools/repeatButtonModule.js',
        
        '/modules/mbCommon/js/templates/dataColorPickerModule.js',
        '/modules/mbCommon/js/templates/dataContainerModule.js',
        '/modules/mbCommon/js/templates/dataDatePickerModule.js',
        '/modules/mbCommon/js/templates/dataEditButtonModule.js',
        '/modules/mbCommon/js/templates/dataEditCheckboxModule.js',
        '/modules/mbCommon/js/templates/dataEditColorModule.js',
        '/modules/mbCommon/js/templates/dataEditDateModule.js',
        '/modules/mbCommon/js/templates/dataEditDocumentsModule.js',
        '/modules/mbCommon/js/templates/dataEditImageUploadModule.js',
        '/modules/mbCommon/js/templates/dataEditLinkListModule.js',
        '/modules/mbCommon/js/templates/dataEditListModule.js',
        '/modules/mbCommon/js/templates/dataEditModule.js',
        '/modules/mbCommon/js/templates/dataEditSelectImageModule.js',
        '/modules/mbCommon/js/templates/dataEditSelectModule.js',
        '/modules/mbCommon/js/templates/dataEditSpinnerModule.js',
        '/modules/mbCommon/js/templates/dataEditTextAreaModule.js',
        '/modules/mbCommon/js/templates/dataEditTextModule.js',
        '/modules/mbCommon/js/templates/dataEditPasswordStrengthModule.js',
        '/modules/mbCommon/js/templates/dataErrorModule.js',
        '/modules/mbCommon/js/templates/dataLabelModule.js',
        '/modules/mbCommon/js/templates/listHeaderModule.js',
        '/modules/mbCommon/js/templates/listHeaderNewModule.js',
        '/modules/mbCommon/js/templates/listHeaderOrderModule.js',
        '/modules/mbCommon/js/templates/listHeaderSelectionModule.js',
        '/modules/mbCommon/js/templates/listModule.js',
        '/modules/mbCommon/js/templates/listRowsDateSelectorModule.js',
        '/modules/mbCommon/js/templates/listRowsModule.js',
        '/modules/mbCommon/js/templates/listSelectionsDatePickerModule.js',
        '/modules/mbCommon/js/templates/listSelectionsModule.js',
        '/modules/mbCommon/js/templates/listSelectorModule.js',
        '/modules/mbCommon/js/templates/listsContainerModule.js',
        '/modules/mbCommon/js/templates/menuItemModule.js',

        '/modules/mbCommon/js/user/loginDialogModule.js',
        '/modules/mbCommon/js/user/reLoginDialogModule.js',
        '/modules/mbCommon/js/user/sendResetPasswordEmailDialogModule.js',
        '/modules/mbCommon/js/user/resetPasswordDialogModule.js',
        '/modules/mbCommon/js/user/userInfoModule.js',
        '/modules/mbCommon/js/user/userMenuButtonModule.js',
        '/modules/mbCommon/js/user/userMenuLayerModule.js',
        '/modules/mbCommon/js/user/userMenuModule.js',
        '/modules/mbCommon/js/user/userModule.js',
        '/modules/mbCommon/js/user/passwordModule.js',
        '/modules/mbCommon/js/user/passwordCheckModule.js'
    ];
    // done members
    // route actions
    public function indexAction()
    {
        
        // get the configuration
        $this->getConfig( $this->serviceLocator );
        
        // get user from route
        $this->workDirectory = $this->params()->fromRoute( 'workDirectory' );

        // work directory !exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $this->workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory !exists 
        
        // set debug file name
        $debugfileName = $this->workDirectory . '_index';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );

        // config clear log
        if( $this->config['debugger']['clearLog'] ){
            // clear the debug dir
            $this->debugger->clearLog();
        }
        // done config clear log

        $this->debugger->logInformation( 'MbAdmin controller indexAction' );
        // done create debugger

        // create identification controller
        $this->authentificationController = new AuthentificationController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                
        // create response
        return $this->createResponse();
    }
    public function openResetPasswordAction()
    {
        // get the configuration
        $this->getConfig( $this->serviceLocator );

        // get token from route
        $this->workDirectory = $this->params()->fromRoute( 'workDirectory' );

        // create debugger name
        $debugfileName = $this->workDirectory . '_index';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        
        // config clear log
        if( $this->config['debugger']['clearLog'] ){
            // clear the debug dir
            $this->debugger->clearLog();
        }
        // done config clear log
        
        // debug info
        $this->debugger->logInformation( 'MbAdmin controller openResetPasswordAction' );


        // work directory !exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $this->workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory !exists 

        // get token from route
        $token = $this->params()->fromRoute( 'token' );

        // debug info
        $this->debugger->logInformation( 'MbAdmin controller token: ' . $token );

        // create authentification controller
        $this->authentificationController = new AuthentificationController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );

        // get the request
        $request = $this->getRequest();
        
        // validate token
        if( $this->authentificationController->validateSendResetPasswordEmailToken( $token, $request ) ){
            // remember is password reset
            $this->isResetPassword = true;
        }
        // done validate token
        
        // create response
        return $this->createResponse();
    }
    // done route actions
    // assemble view
    private function createResponse() {
                
        // get options
        $optionsController = new OptionsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get language id from options
        $userLanguageId = $optionsController->getOption( 'languageId' );
        // create language controller
        $this->languageController = new LanguageDataController( $this->configId, $this->serviceLocator, $this->debugger );
        // get default language
        $this->selectedLanguageArray = $this->languageController->getLanguageById( $userLanguageId  );
        // debug info
        $this->debugger->LogInformation( 'languageId: ' . $this->selectedLanguageArray['id'] );
        // debug info
        $this->debugger->LogInformation( 'workDirectory: ' . $this->workDirectory );
        // get device
        $this->deviceDetector = new DeviceDetector( $this->debugger );
        // done create helpers
        
        // create view
        $this->createView();

        // create layout    
        $this->setLayout();

        // add css
        $this->addCss();

        // add js
        $this->addJs();
        
        // debug info
        $this->debugger->LogInformation( 'MbAdmin controller succes' );

        // done
        return $this->view;
        
    }
    private function setLayout() {
        // set layout
        $this->layout( $this->layoutTemplate );
        // set layout language
        $this->layout()->language = $this->selectedLanguageArray['code'];
        // get layuot translations
        $documentHeaderTranslations = $this->languageController->getDocumentHeaderTranslations( $this->selectedLanguageArray['id'] );
        // add translations to layout
        foreach( $documentHeaderTranslations as $translation ){
            // document title
            if( $translation['translationId'] == 'documentTitle' ){
                $this->layout()->documentTitle = $translation['translation'];
            }
            // document description
            if( $translation['translationId'] == 'documentDescription' ){
                $this->layout()->documentDescription = $translation['translation'];
            }
            // document keywords
            if( $translation['translationId'] == 'documentKeywords' ){
                $this->layout()->documentKeywords = $translation['translation'];
            }
        }
        // done add translations to layout
    }
    private function createView() {
        // create the view
        $this->view = new ViewModel( );
        // set template
        $this->view->setTemplate( $this->viewTemplate );
        // add workDirectory
        $this->view->workDirectory = $this->workDirectory;
        // add options
        $this->view->options = $this->getOptions();
        // add helpSubjects
        $this->view->helpSubjects = $this->getHelpSubjects();
        // add color options
        $this->view->colors = $this->getColors();
        // add selected language id
        $this->view->selectedLanguageId = $this->selectedLanguageArray['id'];
        // add languages
        $this->view->languages = $this->getLanguages();
        // add translations
        $this->view->translations = $this->getTranslations();

        // add password reset
        $this->view->isResetPassword = $this->isResetPassword;

        if( $this->isResetPassword ){
            // add pasword reset token
            $this->view->token = $this->authentificationController->openResetPassword();
        }
        else {
            // add remember me token
            $this->view->token = $this->authentificationController->getRememberMeToken();
        }

        // create a cookie to check if cookies are enabled 
        $this->authentificationController->createTestCookie();
        // add base directory
        $this->view->baseDirectory = $this->baseDirectory;
        // add workDirectory
        $this->view->workDirectory = $this->workDirectory;
        // add rememberMe option
        $this->view->rememberMe = $this->authentificationController->getRememberMeOption();
        // add minimum password strength
        $this->view->minimumPasswordStrength = $this->config['minimumPasswordStrength'];
        // add minimum password length
        $this->view->minimumPasswordLength = $this->config['minimumPasswordLength'];
        // add minimum login name length
        $this->view->minimumLoginNameLength = $this->config['minimumLoginNameLength'];
        // add token refresh period
        $this->view->pageTokenRefreshPeriod = $this->config['pageTokenRefreshPeriod'];
        // is mobile
        $this->view->isMobile = $this->deviceDetector->isMobile();
    }
    private function getLanguages() {
        // debug info
        $this->debugger->logInformation( 'get languages' );
        // create string with languages for javascript value
        $languagesString = ' { ' . PHP_EOL;
        $languages = $this->languageController->getLanguages();
        for ( $i = 0; $i < count( $languages ); $i++ ){
            $languagesString .= ' \'' . $languages[$i]['id'] . '\' ';
                $languagesString .= ' : ' . PHP_EOL;
                $languagesString .= ' { ' . PHP_EOL;
                    $languagesString .= '\'id\' : \'' . $languages[$i]['id'] . '\', ';
                    $languagesString .= '\'name\' : \'' . $languages[$i]['name'] . '\', ';
                    $languagesString .= '\'route\' : \'' . $languages[$i]['route'] . '\' ';
                $languagesString .= ' } ' . PHP_EOL;
            if( $i < count( $languages ) - 1 ){
                $languagesString .= ', ' . PHP_EOL;
            }
        }        
        $languagesString .= ' } ';
        // return result string
        return $languagesString;
    }
    private function getTranslations() {
        // debug info
        $this->debugger->logInformation( 'get translations' );
        // create string with options for javascript value
        $translations = ' ' . PHP_EOL;
        $translations = ' ' . PHP_EOL;
        $translations = ' { ' . PHP_EOL;
        // get translations
        $translationArray = $this->languageController->getIndexTranslations( $this->selectedLanguageArray['id'] );
        // create array string
        for ( $i = 0; $i < count( $translationArray ); $i++ ){
            $translations .= ' \'' . $translationArray[$i]['translationId'] . '\' ';
                    $translations .= ' : \'' . $translationArray[$i]['translation'] . '\' ';
            if( $i < count( $translationArray ) - 1 ){
                $translations .= ', ' . PHP_EOL;
            }
        }        
        // done create array string
        $translations .= ' }';
        // done create string with options for javascript value
        
        // return result string
        return $translations;
    }
    private function getOptions() {
        // debug info
        $this->debugger->logInformation( 'get options' );

        // create string with options for javascript value
        $options = ' ' . PHP_EOL;
        $options = ' ' . PHP_EOL;
        $options = ' { ' . PHP_EOL;
        // get options
        $optionsController = new OptionsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        $optionsArray = $optionsController->getOptions( );
        // create array string
        for ( $i = 0; $i < count( $optionsArray ); $i++ ){
            $options .= ' \'' . $optionsArray[$i]['name'] . '\'';
            $options .= ' : ';
                $options .= ' { ';
                    $options .= ' \'name\' : \'' . $optionsArray[$i]['name'] . '\',';
                    $options .= ' \'value\' : \'' . $optionsArray[$i]['value'] . '\' ';
                $options .= '}';
            if( $i < count( $optionsArray ) - 1 ){
                $options .= ', ' . PHP_EOL;
            }
        }        
        // done create array string
        $options .= ' }';
        // done create string with options for javascript value
        
        // return result string
        return $options;
        
    }
    private function getHelpSubjects() {
        // debug info
        $this->debugger->logInformation( 'get help subjects' );
        
        // create string with subjects for javascript value
        $subjects = ' ' . PHP_EOL;
        $subjects = ' ' . PHP_EOL;
        $subjects = ' { ' . PHP_EOL;
        // get options
        $helpDataController = new HelpDataController( $this->configId, $this->serviceLocator, $this->debugger );
        $helpSubjectsArray = $helpDataController->getSubjects( $this->selectedLanguageArray['id'] );
        // create array string
        for ( $i = 0; $i < count( $helpSubjectsArray ); $i++ ){
            $subjects .= ' \'' . $helpSubjectsArray[$i]['subjectId'] . '\'';
            $subjects .= ' : ';
                $subjects .= ' { ';
                    $subjects .= ' \'translation\' : \'' . $helpSubjectsArray[$i]['translation'] . '\' ';
                $subjects .= '}';
            if( $i < count( $helpSubjectsArray ) - 1 ){
                $subjects .= ', ' . PHP_EOL;
            }
        }        
        // done create array string
        $subjects .= ' }';
        // done create string with subjects for javascript value
        
        // return result string
        return $subjects;
    }
    private function getColors() {
        // debug info
        $this->debugger->logInformation( 'get colors' );

        // create string with options for javascript value
        $colors = ' { ' . PHP_EOL;
        // get colors
        $colorsDataController = new ColorsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        $colorsArray = $colorsDataController->getColors( $this->selectedLanguageArray['id'] );
        // create array string
        for ( $i = 0; $i < count( $colorsArray ); $i++ ){
            $colors .= ' "' . $colorsArray[$i]['name'] . '"';
            $colors .= ' : ';
                $colors .= ' { ';
                    $colors .= ' "id" : "' . $colorsArray[$i]['id'] . '",';
                    $colors .= ' "name" : "' . $colorsArray[$i]['name'] . '",';
                    $colors .= ' "translation" : "' . $colorsArray[$i]['translation'] . '",';
                    $colors .= ' "color" : "' . $colorsArray[$i]['color'] . '", ';
                    $colors .= ' "canChange" : "' . $colorsArray[$i]['canChange'] . '" ';
                $colors .= '}';
            if( $i < count( $colorsArray ) - 1 ){
                $colors .= ', ';
            }
            $colors .= PHP_EOL;
        }        
        // done create array string
        $colors .= ' }';

        // return result string
        return $colors;
    }
    private function addCss() {    
        // add css
        $this->layout()->cssFiles = $this->cssFiles;
    }
    private function addJs() {
        // add jsProject js
        $this->layout()->jsProjectFiles = $this->jsProjectFiles;
        // add specific js
        $this->layout()->applicationJsFiles = $this->applicationJsFiles;
        // add third party js
        $this->layout()->thirdPartyJsFiles = $this->thirdPartyJsFiles;
    }
    private function getConfig( ServiceLocatorInterface $serviceLocator ) {
        // read the configuration
        $config = $serviceLocator->get( 'config' )[$this->configId];
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
    }
}
