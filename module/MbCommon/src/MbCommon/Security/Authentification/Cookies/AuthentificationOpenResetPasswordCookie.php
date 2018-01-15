<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\Cookies\AuthentificationOpenResetPasswordCookie.php
 * 
 *  Last Revision:  22-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 * Purpose: this class handles testing, reading and writing cookies
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

namespace MbCommon\Security\Authentification\Cookies;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;
use MbCommon\Database\Security\Settings\SettingsDataController;

class AuthentificationOpenResetPasswordCookie
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'cookiePath'                                    =>  '/',
        'resetPasswordCookieName'                       =>  'resetPassword',
        'openResetPasswordExpirationPeriod'             =>  10800, // seconds
        'loginDelay'                                    =>  30
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
        // add user to cookie path
        $this->config['resetPasswordCookieName'] .= '_' . $this->workDirectory;
    }
    public function setOpenResetPasswordCookie( $cookieToken ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationCookie setOpenResetPasswordCookie cookieKey: ' . $cookieToken );
        // set the cookie
        setcookie( $this->config['resetPasswordCookieName'], $cookieToken, time() + $this->config['openResetPasswordExpirationPeriod'], $this->config['cookiePath'], null, false, true );
    }
    public function validateOpenResetPasswordCookie( $cookieToken, $request ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationCookie validateOpenResetPasswordCookie cookieKey: ' . $cookieToken );
        // debug info
        $this->debugger->LogInformation( 'cookie: ' . $_COOKIE[$this->config['resetPasswordCookieName']] );
        
        
        // cookie !exists or cookie != key
        if( !isset( $_COOKIE[$this->config['resetPasswordCookieName']] ) || $_COOKIE[$this->config['resetPasswordCookieName']] != $cookieToken ){
            
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'AuthentificationCookie', 'invalid open reset passwordcookie', $request );
            // create settings controller
            $settingsDataController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // block rememeber me
            $settingsDataController->setSetting( 'loginDelayed', true, 'Open reset password called with invalid cookie' );
            // get date time
            $now = new \DateTime( 'now' );
            // add delay 
            $nextLogin = $now->add( new \DateInterval( 'PT' . $this->config['loginDelay'] . 'S' ) );
            // set next login
            $settingsDataController->setSetting( 'nextLogin', $nextLogin->format( 'YmdHis' ), 'Open  reset password called with invalid cookie' );
            // done invalid
            return false;
        }
        // done cookie !exists or cookie != key
        
        // delete login cookie
        setcookie( $this->config['resetPasswordCookieName'], '', time() - ( 3600 * 24 * 2 ), $this->config['cookiePath'], null, false, true );

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
