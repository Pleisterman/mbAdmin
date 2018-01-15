<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/LoginController.php
 * 
 *  Purpose:    
 *          This controller handles the login routes of the MbAdmin section
 * 
 *  Last Revision:  20-01-2017
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
use MbCommon\Database\Security\User\UserDataController;

class LoginController extends AbstractActionController
{
    // members
    private $debugger = null;
    private $configId = 'mbAdmin';
    private $config = array( 
        'dataDir'                       => ''
    );
    private $routeHome = 'MbAdminRouteHome';
    // done members
    
    // route actions
    public function indexAction(){
        
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
        $name = $postData['name'];
        $password = $postData['password'];
        $rememberMe = $postData['rememberMe'];
        $loginToken = $postData['token'];
        // done get post data
        
        // user directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done user directory ! exists 
        
        // create debuggerId
        $debugfileName = $procesId . '_' . $workDirectory . '_login';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        
        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        // login
        $loginResult = $authentificationController->login( $loginToken, $name, $password, $rememberMe, $request );
       
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $loginResult ) ) );
        // done
        return $response;        
    }
    public function prepareLoginAction(){

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
        $publicToken = $postData['token'];
        // done get post data

        // work directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory ! exists 
        
        // create debuggerId
        $debugfileName = $procesId . '_' . $workDirectory . '_prepareLogin';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        
        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );

        // prepare login
        $prepareLoginResult = $authentificationController->prepareLogin( $publicToken, $request );
       
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $prepareLoginResult ) ) );
        // done

        $this->debugger->LogInformation( 'prepare login ready' );
        return $response;        
        
    }
    public function rememberMeAction(){

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
        $rememberMeToken = $postData['token'];
        // done get post data
        
        // work directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory ! exists 

        // create debuggerId
        $debugfileName = $procesId . '_' . $workDirectory . '_rememberMe';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        
        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        // validate rememberMe
        $authentificationResult = $authentificationController->rememberMe( $rememberMeToken, $request );
       
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $authentificationResult ) ) );
        // debug info
        $this->debugger->logInformation( 'return response procesId: ' . $procesId );
        // debug info
        $this->debugger->logInformation( 'succes' );

        // done
        return $response;        
    }
    public function logOffAction(){

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
        // done get post data

        // work directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory ! exists 
        
        // create debuggerId
        $debugfileName = $procesId . '_' . $workDirectory . '_logOff';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        
        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        // check login
        $result = $authentificationController->validateLogin( $pageToken, $request );
        // check login result
        if( isset( $result['criticalError'] ) ){
            // debug info
            $this->debugger->LogInformation(' logoff failed' );
        }
        else {
            // logoff
            $result = $authentificationController->logOff( $pageToken, $request );
        }
       
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $result ) ) );
        // done
        return $response;        
    }
    public function sendResetPasswordEmailAction(){

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
        $email = $postData['email'];
        $publicToken = $postData['token'];
        // done get post data
        
        // work directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory ! exists 
        
        // create debuggerId
        $debugfileName = $procesId . '_sendResetPasswordEmail';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        
        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        
        // check public token
        if( !$authentificationController->validatePublicToken( $publicToken, $request ) ){
            // done
            return $this->createResponse( $procesId, 'ok' );        
        }
        // done check public token
        
        $userDataController = new UserDataController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        
        // validate email
        if( !$userDataController->validateEmail( $email ) ){
            // done
            return $this->createResponse( $procesId );        
        }
        // done validate email
        
        // create email token
        $emailToken = $authentificationController->getSendPasswordResetEmailToken();
        
        // check email token
        if( $emailToken ){
            // send mail
            $userDataController->sendPasswordResetEmail( $email, $emailToken );
        }
        // done check email token
        
        // done
        return $this->createResponse( $procesId );        
        
    }
    private function createResponse( $procesId ) {
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => 'ok' ) ) );
        // done
        return $response;        
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
