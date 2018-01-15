<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\Cookies\AuthentificationCookieCheck.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this class handles testing, reading and writing cookies
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

namespace MbCommon\Security\Authentification\Cookies;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class AuthentificationCookieCheck
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'cookiePath'                    =>  '/',
        'cookieCheckName'          =>  'loginCookieCheck'
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
        $this->config['cookieCheckName'] .= '_' . $this->workDirectory;
    }
    public function createTestCookie( ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationCookieController createTestCookie' );
        
        // create cookie
        setcookie( $this->config['cookieCheckName'], 'ok', time() + ( 3600 * 24 * 7 ), $this->config['cookiePath'], null, false, true );
    }
    public function getCookiesEnabled( ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationCookieController getCookiesEnabled' );
        
        $this->debugger->LogInformation( '' );
        $this->debugger->LogInformation( 'cookie' );
        $this->debugger->LogInformation( '' );
        
        $this->debugger->LogInformation( implode( PHP_EOL, $_COOKIE ) );
        
        $this->debugger->LogInformation( '' );
        $this->debugger->LogInformation( 'done cookie' );
        $this->debugger->LogInformation( '' );

        // find cookie check cookie
        if( isset( $_COOKIE[$this->config['cookieCheckName']] ) && $_COOKIE[$this->config['cookieCheckName']] == 'ok' ){
            // debug info
            $this->debugger->LogInformation( 'AuthentificationCookieController getCookiesEnabled cookies enabled ' );

            // done cookies enabled 
            return true;
        }

        // debug info
        $this->debugger->LogInformation( 'AuthentificationCookieController getCookiesEnabled cookies disabled ' );
        
        // done cookies disabled
        return false;
        
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
