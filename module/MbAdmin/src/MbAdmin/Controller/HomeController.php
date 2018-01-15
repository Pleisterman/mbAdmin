<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/HomeController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          This controller handles the home route 
 *          The home route contains information about the application
 *                  
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
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
use Common\Service\DeviceDetector;
use MbCommon\Database\Language\LanguageDataController;

class HomeController extends AbstractActionController
{
    // members
    private $debugger = null;
    private $deviceDetector = null;
    private $configId = 'mbAdmin';
    private $config = array( 
        'debugger'                      => array()
    );
    private $selectedLanguageArray = null;
    private $languageController = null;
    private $viewTemplate = 'mbAdmin/home/index';
    private $layoutTemplate = 'mbAdmin/common/layout';
    
    private $cssFiles = [ 
            ];
    private $thirdPartyJsFiles = [  
            ];
    private $jsProjectFiles = [     
            ];
    private $applicationJsFiles = [ 
            ];
    // done members
    // route actions
    public function indexAction()
    {
        // get the configuration
        $this->getConfig( $this->serviceLocator );

        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, 'home' );

        // config clear log
        if( $this->config['debugger']['clearLog'] ){
            // clear the debug dir
            $this->debugger->clearLog();
        }
        // done config clear log
        
        $this->debugger->logInformation( 'MbAdmin HomeController indexAction' );
        // done create debugger

        // create language controller
        $this->languageController = new LanguageDataController( $this->configId, $this->serviceLocator, $this->debugger );
        // get default language
        $this->selectedLanguageArray = $this->languageController->getDefaultLanguage( );
        // debug info
        $this->debugger->LogInformation( 'languageId: ' . $this->selectedLanguageArray['id'] );

        // create response
        return $this->createResponse();
    }
    // assemble view
    private function createResponse() {

        // create helpers
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
        
        return $this->view;
        
    }
    private function setLayout() {
        // set layout
        $this->layout( $this->layoutTemplate );
    }
    private function createView() {
        // create the view
        $this->view = new ViewModel( );
        // set template
        $this->view->setTemplate( $this->viewTemplate );
        // add page html
        $this->view->pageHtml = 'Welkom Bij MbAdmin';
        
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
    // done assemble view
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
