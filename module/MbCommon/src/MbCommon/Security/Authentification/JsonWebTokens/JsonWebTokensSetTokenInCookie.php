<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensSetTokenInCookie.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          sets the JWT in a cookie
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

namespace MbCommon\Security\Authentification\JsonWebTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Database\Security\Settings\SettingsDataController;


class JsonWebTokensSetTokenInCookie
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'cookiePath'                    =>  '/',
        'jsonWebTokenExpirationPeriod'  =>  259200 // 3600 *     24 * 3
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
    }
    public function setTokenInCookie( $token ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensSetTokenInCookie' );
        // create settingsController
        $settingsController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get rememberme option
        $rememberMe = $settingsController->getSetting( 'rememberMe' );

        // create expiration string
        $expirationString = null;
        // check remember me option
        if( $rememberMe == 'true' ){
            // add expiration period
            $expirationString = time() + $this->config['jsonWebTokenExpirationPeriod'];
        }
        // done check remember me option

        // create new JWT cookie
        setcookie( 'JWT_' . $this->workDirectory, 
                   $token, 
                   $expirationString, 
                   $this->config['cookiePath'], null, false, true );
        // doen create new JWT cookie
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
