<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\RememberMeTokens\RememberMeTokensController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles construction, saving and verification of a 
 *          rememberMe token used to verify remember me
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

namespace MbCommon\Security\Authentification\RememberMeTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Database\Security\Authentification\RememberMeTokens\RememberMeTokensDataController;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;
use MbCommon\Database\Security\Settings\SettingsDataController;

class RememberMeTokensController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'rememberMeTokenLength'     =>  32,
        'loginDelay'                =>  30        
    );
    private $rememberMeTokensController = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // debug info
        $this->debugger->logInformation( 'RememberMeTokensController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
        // create data acces
        $this->rememberMeTokensController = new RememberMeTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
    }
    public function getRememberMeToken(){
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        // create new token
        $token = $tokenGenerator->getToken( $this->config['rememberMeTokenLength'] );
        // insert token
        $this->rememberMeTokensController->insertToken( $token );
        // done
        return $token;
    }    
    public function validate( $rememberMeToken, $request ){
        // create data acces
        $rememberMeTokensController = new RememberMeTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$rememberMeTokensController->validate( $rememberMeToken ) ){
            // debug info
            $this->debugger->logInformation( 'RememberMeTokensController invalid rememberMe token' );
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'AuthentificationValidateRememberMe', 'invalid rememeber me token', $request );
            // create settings controller
            $settingsDataController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // block rememeber me
            $settingsDataController->setSetting( 'rememberMeBlocked', true, 'AuthentificationValidateRememberMe Invalid Token' );
            // done invalid
            return false;
        }

        $this->debugger->logInformation( 'RememberMeTokensController valid rememberMe token' );
        // create invalid request controller
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
