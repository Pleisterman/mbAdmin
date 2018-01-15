<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationResetPassword.php
 * 
 *  Last Revision:  24-01-2017
 * 
 *  Purpose: 
 *          this class handles password reset actions
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
use MbCommon\Security\Authentification\ResetPasswordTokens\ResetPasswordTokensController;
use MbCommon\Security\Authentification\Cookies\AuthentificationResetPasswordCookie;
use MbCommon\Database\Security\User\UserDataController;

class AuthentificationResetPassword
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'passwordResetCookieLength'     => 256
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configid
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
    public function validateResetPassword( $resetPasswordToken, $request ){
        // debug info
        $this->debugger->logInformation( '' );
        $this->debugger->logInformation( '' );
        $this->debugger->LogInformation( 'validateResetPassword ' );
        $this->debugger->logInformation( '' );
        $this->debugger->logInformation( '' );
        // done debug info
        
        // create controller
        $userController = new UserDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get cookie token
        $cookieToken = $userController->getCookieToken( );
        
        // create cookie controller
        $resetPasswordCookieController = new AuthentificationResetPasswordCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate cookie
        if( !$resetPasswordCookieController->validateResetPasswordCookie( $cookieToken, $request ) ){
            // done invalid
            return false;
        }
        // done validate cookie
        
        // create data acces
        $resetPasswordTokensController = new ResetPasswordTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$resetPasswordTokensController->validate( $resetPasswordToken, $request ) ){
            // done invalid
            return false;
        }
        // done validate token
        
        // done valid
        return true;
        
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
