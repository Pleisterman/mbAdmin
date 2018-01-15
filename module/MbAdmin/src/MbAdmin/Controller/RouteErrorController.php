<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/RouteErrorController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          This controller handles the root route 
 *          The root route tells the visitor that this route is
 *          not used. The user should only acces a route with a user name.    
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
use Common\Service\DeviceDetector;
use MbAdmin\Database\Language\LanguageDataController;
use MbAdmin\Database\RouteError\RouteErrorDataController;

class RouteErrorController extends AbstractActionController
{
    // members
    private $debugger = null;
    private $deviceDetector = null;
    private $languageCameFromRoute = false;
    private $selectedLanguageArray = null;
    private $languageController = null;
    private $routeErrorDataController = null;
    private $viewTemplate = 'mbAdmin/routeError/index';
    private $layoutTemplate = 'mbAdmin/common/layout';
    
    private $cssFiles = [ 
                '/modules/mbAdmin/css/routeError.css' 
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
        // create debugger
        if( !$this->debugger ){ 
            $this->debugger = new Debugger( 'mbAdmin', $this->serviceLocator );
            // clear the log file 
            $this->debugger->clearLog();
            $this->debugger->logInformation( 'MbAdmin RouteErrorController indexAction' );
        }
        // done create debugger

        // create language controller
        $this->languageController = new LanguageDataController( $this->serviceLocator, $this->debugger );
        // get default language
        $this->selectedLanguageArray = $this->languageController->getDefaultLanguage( );
        // debug info
        $this->debugger->LogInformation( 'languageId: ' . $this->selectedLanguageArray['id'] );

        // create the error data controller
        $this->routeErrorDataController = new RouteErrorDataController( $this->serviceLocator, $this->debugger );
        
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
        // get keywords
        $this->layout()->keywords = $this->routeErrorDataController->getPageInfo( 'keywords', $this->selectedLanguageArray['id'] );
    }
    private function createView() {
        // create the view
        $this->view = new ViewModel( );
        // set template
        $this->view->setTemplate( $this->viewTemplate );
        // get html 
        $this->view->pageHtml = implode( '<br><br>', $this->routeErrorDataController->getPageHtml( $this->selectedLanguageArray['id'], $this->languageCameFromRoute ) );
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
}
