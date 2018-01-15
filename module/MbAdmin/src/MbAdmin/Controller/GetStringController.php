<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/GetStringController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose:     
 *          This controller handles calls to the route MbAdmin\GetString
 *          the route is used to translate strings
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
use Common\Service\Debugger;
use MbCommon\Database\Language\LanguageDataController;

class GetStringController extends AbstractActionController
{
    // members
    private $debugger = null;
    private $configId = 'mbAdmin';
    private $config = array( 
        'dataDir'                       => ''
    );
    private $routeHome = 'MbAdminRouteHome';

    // route actions
    public function indexAction()
    {
        // get the configuration
        $this->getConfig( $this->serviceLocator );

        // get the request
        $request = $this->getRequest();
        
        // validate is post
        if ( !$request->isPost()) {
            // not a post request go to index page
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done validate is post

        // get post data
        $postData = $request->getPost();
        $callId = $postData['callId'];
        $procesId = $postData['procesId'];
        $workDirectory = $postData['workDirectory'];
        $type = $postData['type'];
        $languageId = $postData['languageId'];
        //done get post data
        
        // user directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done user directory ! exists 

        // create debuggerId
        $debugfileName = $procesId . '_' . $workDirectory . '_getSring';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );

        $string = 'string not found.';
        
        $languageDataController = new LanguageDataController( $this->configId, $this->serviceLocator, $this->debugger );
        
        
        // get message string
        if( $type == 'message' ){
            $messageId = $postData['messageId'];
            // create message database
            $string = $languageDataController->getMessage( $messageId, $languageId );
        
        }
        // done get message string
        
        // get error string
        if( $type == 'error' ){
            $this->debugger->LogInformation( 'hiero' );
            $errorId = $postData['errorId'];
            $this->debugger->LogInformation( 'errorId' . $errorId );
            // create data controller
            $string = $languageDataController->getError( $errorId, $languageId );
        }
        // done get error string
        
        // get info string
        if( $type == 'info' ){
            $infoId = $postData['infoId'];
            $this->debugger->LogInformation( 'infoId' . $infoId );
            // create data controller
            $string = $languageDataController->getInfo( $infoId, $languageId );
        }
        // done get info string

        // get info string
        if( $type == 'help' ){
            $subjectId = $postData['subjectId'];
            $this->debugger->LogInformation( 'subjectId' . $subjectId );
            // create message database
            $string = $languageDataController->gethelp( $subjectId, $languageId );
        }
        // done get info string
        
        // create result
        $result = array( 
            'string' => $string,
            'procesId' => $procesId
        );        
        // done create result
        
        if( $type == 'error' ){
            $result['errorId'] = $errorId;
            $result['callId'] = $callId;
        }

            
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $result ) ) );
        return $response;        
        // done return the response
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