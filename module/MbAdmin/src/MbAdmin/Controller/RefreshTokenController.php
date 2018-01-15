<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/IndexController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose:     
 *              This controller handles refreshing pageTokens
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

use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\AuthentificationController;

class RefreshTokenController extends AbstractActionController
{
    // members
    private $authentificationController = null;
    private $configId = 'mbAdmin';
    private $config = array( 
        'dataDir'                       => ''
    );
    private $routeHome = 'MbAdminRouteHome';
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
            // not a post request go to index page
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done validate is post

        // get post data
        $postData = $request->getPost();
        $procesId = $postData['procesId'];
        $workDirectory = $postData['workDirectory'];
        $pageToken = $postData['token'];

        // set debug file name
        $debugfileName = $procesId . '_refreshToken';
        
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        // debug info
        $this->debugger->logInformation( ' refreshTokenController start' );

        // create security class
        $this->authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        // check login
        $authentificationResult = $this->authentificationController->validateLogin( $pageToken, $request );
        // done check login

        // check authentication result
        if( isset( $authentificationResult['criticalError'] ) ){
            // set result
            $result = $authentificationResult;
            // debug info
            $this->debugger->LogInformation(' refreshTokenController login failed' );
        }
        else {
            $result = $this->authentificationController->refreshPageToken( ); 
            // debug info
            $this->debugger->LogInformation( 'refreshTokenController token: ' . $result['token'] );

        }
        // done check authentication result
        
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