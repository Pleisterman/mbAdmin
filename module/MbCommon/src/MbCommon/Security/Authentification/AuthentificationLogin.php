<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationLogin.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this class handles validation of the login request
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
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

namespace MbCommon\Security\Authentification;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\PublicTokens\PublicTokensController;
use MbCommon\Security\Authentification\LoginTokens\LoginTokensController;
use MbCommon\Security\Authentification\AuthentificationLoginDelayController;
use MbCommon\Security\Authentification\Algorithms\AlgorithmsController;
use MbCommon\Security\Authentification\Cookies\AuthentificationCookieController;
use MbCommon\Security\Authentification\AuthentificationCheckUserCredentials;
use MbCommon\Security\Authentification\AuthentificationLoginSucces;
use MbCommon\Database\Security\User\UserDataController;

class AuthentificationLogin
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'nameKeyLength'                 =>  32,
        'passwordKeyLength'             =>  32,
        'cookiePath'                    =>  '/',
        'cookieKeyLength'               =>  32,
        'loginDelay'                    =>  30
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function login( $parameterArray ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationLogin ' );
        
        // create public tokens controller
        $publicTokensController = new PublicTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            
        // create login delay controller
        $loginDelayController = new AuthentificationLoginDelayController( $this->configId, $this->serviceLocator, $this->debugger );

        if( $loginDelayController->hasLoginDelay( $parameterArray['loginDelayed'], $parameterArray['nextLogin'] ) ){
            // create result
            $result = array(
                'error'     =>  'loginDelayed',
                'token'     =>  $publicTokensController->getPublicToken()
            );
            // done with delay
            return $result;        
        }
        // done check delay
        
        // create algorithm controller
        $algorithmsController = new AlgorithmsController( $this->debugger );
        // check if algoritm exists
        if( !$algorithmsController->algorithmExists( $parameterArray['algorithm'] ) ){
            // done with error
            return array( 'criticalError' => 'algoritmNotFound' );
        }
        // done check if algoritm exists

        // create login token controller
        $loginTokensController = new LoginTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate public token
        if( !$loginTokensController->validate( $parameterArray['loginToken'], $parameterArray['request'] ) ){
            // create result
            $result = array(
                'token'     =>  $publicTokensController->getPublicToken()
            );
            // done no message
            return $result;        
        }
        // done validate login token

        // get login keys
        $userController = new UserDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get login keys
        $loginKeys = $userController->getLoginKeys();
        // get login data
        $loginData = $userController->getLoginData();
        
        // debug info
        $this->debugger->LogInformation( 'AuthentificationLogin getLoginData cookieToken: ' . $loginData['cookieToken'] );
        
        // check data
        if( !$loginKeys || !$loginData ){
            // create result
            $result = array(
                'criticalError' => 'dataConnectionFailed'
            );
            // done with error
            return $result;        
        }
        // done check data
        
        // create cookie controller
        $cookieController = new AuthentificationCookieController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate login cookie
        if( !$cookieController->validateLoginCookie( $loginData['cookieToken'], $parameterArray['request'] ) ){
            // create result
            $result = array(
                'token'     =>  $publicTokensController->getPublicToken()
            );
            // done no message
            return $result;        
        }
        // done validate login cookie
        
        // create check credentials controller
        $userCheckCredentialsController = new AuthentificationCheckUserCredentials( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate user credentials
        if( !$userCheckCredentialsController->checkUserCredentials( $loginData, $loginKeys, $parameterArray ) ){
            // create result
            $result = array(
                'error'     =>  'loginError',
                'token'     =>  $publicTokensController->getPublicToken()
            );
            // done no message
            return $result;        
        }
        // done validate user credentials

        // create succes controller
        $loginSuccesController = new AuthentificationLoginSucces( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // call succes
        return $loginSuccesController->loginSucces( $parameterArray['algorithm'], $parameterArray['rememberMe'] );
        
        
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
