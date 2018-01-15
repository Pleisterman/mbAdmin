<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 * Purpose: this class handles calls for authentification
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

namespace MbCommon\Security\Authentification;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Database\Security\Settings\SettingsDataController;
use MbCommon\Security\Authentification\Cookies\AuthentificationCookieController;
use MbCommon\Security\Authentification\PublicTokens\PublicTokensController;
use MbCommon\Security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensController;
use MbCommon\Security\Authentification\AuthentificationSendResetPasswordEmail;
use MbCommon\Security\Authentification\AuthentificationOpenResetPassword;
use MbCommon\Security\Authentification\AuthentificationPrepareResetPassword;
use MbCommon\Security\Authentification\AuthentificationResetPassword;
use MbCommon\Security\Authentification\RememberMeTokens\RememberMeTokensController;
use MbCommon\Security\Authentification\AuthentificationValidateLogin;
use MbCommon\Security\Authentification\AuthentificationValidateRememberMe;
use MbCommon\Security\Authentification\AuthentificationPrepareLogin;
use MbCommon\Security\Authentification\AuthentificationGetPasswordKey;
use MbCommon\Security\Authentification\AuthentificationGetUserInfo;
use MbCommon\Security\Authentification\AuthentificationChangePassword;
use MbCommon\Security\Authentification\AuthentificationChangeUserInfo;
use MbCommon\Security\Authentification\AuthentificationLogin;
use MbCommon\Security\Authentification\AuthentificationLogOff;

class AuthentificationController
{
    private $debugger = null;
    private $configId = null;
    private $workDirectory = null;
    private $serviceLocator = null;
    private $settingsController = null;
    private $cookieCheckController = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // debug info
        $this->debugger->logInformation( 'AuthentificationController construct config: ' . $this->configId . ' work directory: ' . $this->workDirectory );
        // store service locator
        $this->serviceLocator = $serviceLocator;
        // create settingsController
        $this->settingsController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create settingsController
        $this->cookieCheckController = new AuthentificationCookieController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
    }
    public function get( $what, $selection ){
        // choose what
        switch ( $what ) {
            case 'passwordKey': {
                // create get password key controller
                $getPasswordKeyContoller = new AuthentificationGetPasswordKey( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $getPasswordKeyContoller->getPasswordKey();
            }
            case 'userInfo': {
                // create get password key controller
                $getUserInfoContoller = new AuthentificationGetUserInfo( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $getUserInfoContoller->getUserInfo( );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'Error AuthentificationController get what not found what: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }
        // done choose what
    }
    public function updateData( $what, $values ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController update: ' . $what );
        // choose what
        switch ( $what ) {
            case 'password': {
                // get algorithm
                $algorithm = $this->settingsController->getSetting( 'algorithm' );
                // create get password key controller
                $changePasswordContoller = new AuthentificationChangePassword( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $changePasswordContoller->changePassword( $algorithm, $values['password'] );
            }
            case 'userInfo': {
                // create change user info controller
                $changeUserInfoContoller = new AuthentificationChangeUserInfo( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $changeUserInfoContoller->changeUserInfo( $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'AuthentificationController update, what not found: ' . $what );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
    public function getRememberMeOption( ){
        // done
        return $this->settingsController->getSetting( 'rememberMe' );
    }    
    public function validatePublicToken( $publicToken, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController validate public token' );
        // create public tokens controller
        $publicTokensController = new PublicTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $publicTokensController->validate( $publicToken, $request );
    }    
    public function getPublicToken(){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController get public token' );
        // create public tokens controller
        $publicTokensController = new PublicTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $publicTokensController->getPublicToken();
    }    
    public function getRememberMeToken(){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController get rememberMe token ' );
        $this->debugger->logInformation( '' );
        $this->debugger->logInformation( '' );
        // create public tokens controller
        $rememberMeTokensController = new RememberMeTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        $this->debugger->logInformation( '' );
        $this->debugger->logInformation( '' );
        // done 
        return $rememberMeTokensController->getRememberMeToken();
    }    
    public function openResetPassword(){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController open password reset' );
        // create open password reset controller
        $openResetPasswordController = new AuthentificationOpenResetPassword( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $openResetPasswordController->openResetPassword( );
    }    
    public function validateOpenResetPassword( $openResetPasswordToken, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController validate open reset password' );
        // create open password reset controller
        $openResetPasswordController = new AuthentificationOpenResetPassword( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $openResetPasswordController->validateOpenResetPassword( $openResetPasswordToken, $request );
    }    
    public function prepareResetPassword(){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController prepare reset password' );
        // create open password reset controller
        $prepareResetPasswordController = new AuthentificationPrepareResetPassword( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $prepareResetPasswordController->prepareResetPassword( );
    }    
    public function validateResetPassword( $resetPasswordToken, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController validate reset password ' );
        // create password reset tokens controller
        $resetpasswordController = new AuthentificationResetPassword( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $resetpasswordController->validateResetPassword( $resetPasswordToken, $request );
    }    
    public function resetPassword( $encodedPassword ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController reset password' );
        // get algorithm
        $algorithm = $this->settingsController->getSetting( 'algorithm' );
        // create get password key controller
        $changePasswordContoller = new AuthentificationChangePassword( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // change password 
        $passwordChangeResult = $changePasswordContoller->changePassword( $algorithm, $encodedPassword );
        
        // check result
        if( isset( $passwordChangeResult['criticalError'] ) ){
            // done with error
            return $passwordChangeResult;
        }
        // done check result    
            
        // create password reset tokens controller
        $loginSuccesController = new AuthentificationLoginSucces( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $loginSuccesController->loginSucces( $algorithm );
        
    }    
    public function getSendResetPasswordEmailToken(){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController get send reset password email token' );
        // create public tokens controller
        $sendResetPasswordEmailTokensController = new SendResetPasswordEmailTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $sendResetPasswordEmailTokensController->getSendResetPasswordEmailToken();
    }    
    public function validateSendResetPasswordEmailToken( $sendResetPasswordEmailToken, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController validate send reset password email token' );
        // create public tokens controller
        $sendResetPasswordEmailTokensController = new SendResetPasswordEmailTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $sendResetPasswordEmailTokensController->validate( $sendResetPasswordEmailToken, $request );
    }    
    public function sendResetPasswordEmail( $emailAddress, $emailToken ) {
        // debug info
        $this->debugger->logInformation( 'AuthentificationController validate send reset password email token' );
        // create send reset password mail controller
        $sendResetPasswordEmailController = new AuthentificationSendResetPasswordEmail( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $sendResetPasswordEmailController->sendResetPasswordEmail( $emailAddress, $emailToken );
    }
    public function createTestCookie() {
        // done
        $this->cookieCheckController->createTestCookie();
    }
    public function getCookiesEnabled(){
        // done
        return $this->cookieCheckController->getCookiesEnabled();
    }
    public function validateLogin( $pageToken, $request ){

        // check cookies enabled
        if( !$this->getCookiesEnabled() ){
            return array( 'criticalError' => 'cookiesDisabled' );
        }
        // done check cookies enabled

        // get algorithm
        $algorithm = $this->settingsController->getSetting( 'algorithm' );
        
        // create controller
        $validateLoginController = new AuthentificationValidateLogin( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $validateLoginController->validateLogin( $algorithm, $pageToken, $request );

    }
    public function rememberMe( $rememberMeToken, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController rememberMe' );
        
        // check cookies enabled
        if( !$this->getCookiesEnabled() ){
            return array( 'criticalError' => 'cookiesDisabled' );
        }
        // done check cookies enabled

        // get rememberMe setting
        $rememberMe = $this->settingsController->getSetting( 'rememberMe' );
        
        // get algorithm
        $algorithm = $this->settingsController->getSetting( 'algorithm' );
        $rememberMeBlocked = $this->settingsController->getSetting( 'rememberMeBlocked' );
         
        // create controller
        $validateRememberMeController = new AuthentificationValidateRememberMe( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $validateRememberMeController->validateRememberMe( $algorithm, $rememberMe, $rememberMeToken, $rememberMeBlocked, $request );
        
    }
    public function prepareLogin( $publicToken, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController prepareLogin' );
        
        // check cookies enabled
        if( !$this->getCookiesEnabled() ){
            return array( 'criticalError' => 'cookiesDisabled' );
        }
        // done check cookies enabled

        // get login delayed
        $loginDelayed = $this->settingsController->getSetting( 'loginDelayed' );
        // get next login
        $nextLogin = $this->settingsController->getSetting( 'nextLogin' );
        
        // get algorithm
        $algorithm = $this->settingsController->getSetting( 'algorithm' );
        
        // create controller
        $prepareLoginController = new AuthentificationPrepareLogin( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $prepareLoginController->prepareLogin( $loginDelayed, $nextLogin, $algorithm, $publicToken, $request );
        
    }
    public function login( $loginToken, $encryptedName, $encryptedPassword, $rememberMe, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController login' );

        // check cookies enabled
        if( !$this->getCookiesEnabled() ){
            return array( 'criticalError' => 'cookiesDisabled' );
        }
        // done check cookies enabled
        
        // get login delayed
        $loginDelayed = $this->settingsController->getSetting( 'loginDelayed' );
        // get next login
        $nextLogin = $this->settingsController->getSetting( 'nextLogin' );
        // get algorithm
        $algorithm = $this->settingsController->getSetting( 'algorithm' );

        $parameterArray = array(
            'loginToken'        => $loginToken,
            'nextLogin'         => $nextLogin,
            'loginDelayed'      => $loginDelayed,
            'encryptedName'     => $encryptedName,
            'encryptedPassword' => $encryptedPassword,
            'rememberMe'        => $rememberMe,
            'algorithm'         => $algorithm,
            'request'           => $request
        );
        
        // create controller
        $loginController = new AuthentificationLogin( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $loginController->login( $parameterArray );
        
    }
    public function logOff( $pageToken, $request ){
        // debug info
        $this->debugger->logInformation( 'AuthentificationController logoff' );
        // validate login
        $validateLoginResult = $this->validateLogin( $pageToken, $request );
        
        // check for errors
        if( isset( $validateLoginResult['criticalError'] ) ){
            return $validateLoginResult;
        }
        // done check for errors
        
        // create logOff controller
        $logOffController = new AuthentificationLogOff( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $logOffController->logOff( );
    }
    public function refreshPageToken( ){

        // get algorithm
        $algorithm = $this->settingsController->getSetting( 'algorithm' );
        
        // create controller
        $refreshTokenController = new AuthentificationRefreshPageToken( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $refreshTokenController->refreshPageToken( $algorithm );
        
    }
}
