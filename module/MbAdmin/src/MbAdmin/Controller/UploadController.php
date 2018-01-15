<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/UpdateController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose:  
 *          This controller handles the route MbAdmin\Upload
 *          The result is a frame for uploading documents
 *          and updating data in the documents table
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

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\AuthentificationController;
use MbAdmin\Database\Data\Documents\DocumentsDataController;

class UploadController extends AbstractActionController
{
    // members
    private $configId = 'mbAdmin';
    private $config = array( 
        'dataDir'                   => 'data/mbAdmin/',
        'dataFile'                  => 'data.db'
    );
    private $debugger = null;
    private $workDirectory = null;
    private $documentsDir = null;
    private $viewTemplate = 'mbAdmin/upload/upload';
    private $layoutTemplate = 'mbAdmin/upload/layout';
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
                '/modules/mbCommon/js/upload/main.js',
                '/modules/mbCommon/js/upload/dataModule.js',
                '/modules/mbCommon/js/upload/valuesModule.js',
                '/modules/mbAdmin/js/main/settingsModule.js',
                '/modules/mbCommon/js/tabStops/tabStopsModule.js',
            ];
    private $error = false;
    private $succes = false;
    private $documentId = '';
    // done members

    // route actions
    public function indexAction()
    {
        // get the configuration
        $this->getConfig( $this->serviceLocator );

        // get the request
        $request = $this->getRequest();
        
        // validate is post
        if ( !$request->isPost()) {
            // done create view
            return $this->createView();
        }
        // done validate is post

        // get post data
        $postData = $request->getPost();
        $pageToken = $postData['token'];
        $this->workDirectory = $postData['workDirectory'];
        // done get post data

        // user directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $this->workDirectory ) ){
            // done create view
            return $this->createView();
        }
        // done user directory ! exists 
        
        // create debuggerId
        $debugfileName = $this->workDirectory . '_upload';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );

        // create authentification controller
        $this->authentificationController = new AuthentificationController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // check login
        $authentificationResult = $this->authentificationController->validateLogin( $pageToken, $request );

        // check authentication result
        if( isset( $authentificationResult['criticalError'] ) ){
            // set result
            $result = $authentificationResult;
            // debug info
            $this->debugger->LogInformation(' UpdateController login failed' );
        }
        else {
            $this->documentsDir = $this->config['dataDir'] . 'data/' . $this->workDirectory . '/documents/';
            
            // upload
            $this->upload();

            // done
            $this->debugger->LogInformation(' UploadController all ok');
        }
        // done check authentication result


        // create view
        return $this->createView();
        
    }
    private function upload( ) {
        // get the request
        $request = $this->getRequest();

        // get post data
        $postData = $request->getPost();
        $subject = $postData['subject'];
        $subjectId = $postData['subjectId'];
        $documentId = $postData['documentId'];
        $mode = $postData['mode'];
        // done get post data
        
        $name = $postData['name'];
        // name !exists
        if( !$name ){
            // set error
            $this->error = 'nameUnknown';
            // done with error
            return;
        }
        // done !exists name

        // debug info
        $this->debugger->logInformation( 'name:' . $name );
        $this->debugger->logInformation( 'subject:' . $subject );
        $this->debugger->logInformation( 'subjectId:' . $subjectId );
        $this->debugger->logInformation( 'documentId:' . $documentId );
        $this->debugger->logInformation( 'mode:' . $mode );
        // done debug info
        
        // get $files 
        $files = $request->getFiles()->toArray();
        // check files value
        if( !$files ){
            // set error
            $this->error = 'fileNotFound';
            // done with error
            return;
        }
        // done check files value
        
        // files value to string
        $fileString = json_encode( $files['file'] );
        // debug info
        $this->debugger->logInformation( 'fileArray: ' . $fileString );

        // create documents data controller
        $documentsController = new DocumentsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get documents row
        $documentRow = $documentsController->get( 'rowById', $documentId );
        
        // check result
        if( isset( $documentRow['criticalError'] ) ){
            // set error
            $this->error = $documentRow['criticalError'];
            // done with error
            return;
        }
        // done check result

        // check document already deleted
        if( $documentRow['data']['deleted'] != 'false' ){
            // set error
            $this->error = 'documentAlreadyDeleted';
            // done with error
            return;
        }
        // done check document already deleted

        // mode is update
        if( $mode == 'update' ){
            // delete the existing file
            unlink( $this->documentsDir . $documentRow['data']['fileName'] );
        }
        // done mode is update
        
        // get file name
        $fileName = $documentId . '_' . $files['file']['name'];

        // set document data
        $values = array(
            'fileName'          =>  $fileName,
            'originalFileName'  =>  $files['file']['name'] 
        );
        $updateResult = $documentsController->updateFileValues( $documentId, $values );
        // done set document data

        // check update result
        if( isset( $updateResult['criticalError'] ) ){
            // set error
            $this->error = $updateResult['criticalError'];
            // doen with error
            return;
        }
        // done check update result

        // move the file to documents folder
        move_uploaded_file ( $_FILES['file']['tmp_name'] , $this->documentsDir . $fileName );

        // set docuemntId
        $this->documentId = $documentId;
        // set succes
        $this->succes = true;

    }
    private function createView() {
        // create the view
        $this->view = new ViewModel( );
        
        // has error
        if( $this->error ){
            // set view error
            $this->view->resultError = $this->error;
        }
        // done has error
        
        // is upload succes
        if( $this->succes ){
            // set view succes
            $this->view->resultSucces = true;
        }
        // done is upload succes

        // has document id
        if( $this->documentId ){
            // set view documentId
            $this->view->documentId = $this->documentId;
        }
        // has document id
        
        // set template
        $this->view->setTemplate( $this->viewTemplate );
        // set layout
        $this->layout( $this->layoutTemplate );
           // add jsProject js
        $this->layout()->jsProjectFiles = $this->jsProjectFiles;
        // add specific js
        $this->layout()->applicationJsFiles = $this->applicationJsFiles;
        // add third party js
        $this->layout()->thirdPartyJsFiles = $this->thirdPartyJsFiles;
        // add css
        $this->layout()->cssFiles = $this->cssFiles;
        // return view
        return $this->view;
    }
    private function getConfig( ) {
        // read the configuration
        $config = $this->serviceLocator->get( 'config' )[$this->configId];
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