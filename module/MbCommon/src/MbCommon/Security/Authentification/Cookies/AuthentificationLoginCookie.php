<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\Cookies\AuthentificationLoginCookieController.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this class handles testing, reading and writing cookies
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

namespace MbCommon\Security\Authentification\Cookies;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;
use MbCommon\Database\Security\Settings\SettingsDataController;

class AuthentificationLoginCookie
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'cookiePath'                    =>  '/',
        'loginCookieExpirationPeriod'   =>  120,
        'loginCookieName'               =>  'loginCookie',
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
        // store service locator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
        // add user to cookie path
        $this->config['loginCookieName'] .= '_' . $this->workDirectory;
    }
    public function setLoginCookie( $cookieToken ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationLoginCookie setLoginCookie cookieKey: ' . $cookieToken );
        // set the cookie
        setcookie( $this->config['loginCookieName'], $cookieToken, time() + $this->config['loginCookieExpirationPeriod'], $this->config['cookiePath'], null, false, true );
    }
    public function validateLoginCookie( $cookieToken, $request ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationLoginCookie validateLoginCookie cookieKey: ' . $cookieToken );
        // debug info
        $this->debugger->LogInformation( 'cookie: ' . $_COOKIE[$this->config['loginCookieName']] );
        
        
        // cookie !exists or cookie != key
        if( !isset( $_COOKIE[$this->config['loginCookieName']] ) || $_COOKIE[$this->config['loginCookieName']] != $cookieToken ){
            
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'AuthentificationLoginCookie', 'invalid login cookie', $request );
            // create settings controller
            $settingsDataController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // block rememeber me
            $settingsDataController->setSetting( 'loginDelayed', true, 'Login called with invalid cookie' );
            // get date time
            $now = new \DateTime( 'now' );
            // add delay 
            $nextLogin = $now->add( new \DateInterval( 'PT' . $this->config['loginDelay'] . 'S' ) );
            // set next login
            $settingsDataController->setSetting( 'nextLogin', $nextLogin->format( 'YmdHis' ), 'Login called with invalid cookie' );
            // done invalid
            return false;
        }
        // done cookie !exists or cookie != key
        
        // delete login cookie
        setcookie( $this->config['loginCookieName'], '', time() - ( 3600 * 24 * 2 ), $this->config['cookiePath'], null, false, true );

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
