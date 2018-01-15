<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/ResetPasswordController.php
 * 
 *  Purpose:    
 *          This controller handles the reset password routes of the MbAdmin section
 * 
 *  Last Revision:  23-01-2017
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
use MbCommon\Security\Authentification\AuthentificationController;
use MbCommon\Database\Security\User\UserDataController;

class ResetPasswordController extends AbstractActionController
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
        $emailAddress = $postData['email'];
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
        
        // create user data controller
        $userDataController = new UserDataController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        
        // validate email
        if( !$userDataController->validateEmail( $emailAddress ) ){
            // done
            return $this->createResponse( $procesId );        
        }
        // done validate email
        
        // create email token
        $emailToken = $authentificationController->getSendResetPasswordEmailToken();
        
        // check email token
        if( $emailToken ){
            // send mail
            $authentificationController->sendResetPasswordEmail( $emailAddress, $emailToken );
        }
        // done check email token
        
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => 'ok' ) ) );
        // done
        return $response;        
    }
    public function prepareResetPasswordAction(){
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
        $openResetPasswordToken = $postData['token'];
        // done get post data
        
        // work directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory ! exists 

        // create debuggerId
        $debugfileName = $procesId . '_prepareResetPassword';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );

        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        
        // check open reset password
        if( !$authentificationController->validateOpenResetPassword( $openResetPasswordToken, $request ) ){
            // create a response
            $response = $this->getResponse();
            // return the response
            $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => 'ok' ) ) );
            // done
            return $response;        
        }
        // done check open reset password

        // prepare reset password
        $result = $authentificationController->prepareResetPassword();
        
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $result ) ) );
        // done
        return $response;        
    }
    public function resetPasswordAction(){
        
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
        $resetPasswordToken = $postData['token'];
        $encodedPassword = $postData['value'];
        // done get post data
        
        // work directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done work directory ! exists 

        // create debuggerId
        $debugfileName = $procesId . '_resetPassword';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );

        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $workDirectory, $this->serviceLocator, $this->debugger );
        
        // check reset password
        if( !$authentificationController->validateResetPassword( $resetPasswordToken, $request ) ){
            // create a response
            $response = $this->getResponse();
            // return the response
            $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => 'ok' ) ) );
            // done
            return $response;        
        }
        // done check open reset password
        
        // reset password
        $result = $authentificationController->resetPassword( $encodedPassword  );
        
        
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $result ) ) );
        // done
        return $response;        
    }
    // route actions
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
