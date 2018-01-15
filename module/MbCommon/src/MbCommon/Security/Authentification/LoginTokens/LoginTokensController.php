<?php
/* 
 *  Project: MbCommon
 * 
 *  File: /MbCommon/Security/Authentification/LoginTokens/LoginTokensController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles construction, saving, and verification 
 *          of a login Token used to verify user after prepare login
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

namespace MbCommon\Security\Authentification\LoginTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Database\Security\Authentification\LoginTokens\LoginTokensDataController;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;

class LoginTokensController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'loginTokenLength'             => 32
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // debug info
        $this->debugger->logInformation( 'LoginTokensController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function getLoginToken(){
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        // create new token
        $token = $tokenGenerator->getToken( $this->config['loginTokenLength'] );
        // create data acces
        $loginTokensController = new LoginTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // insert token
        $loginTokensController->insertToken( $token );
        // done
        return $token;
    }    
    public function validate( $loginToken, $request ){
        // create data acces
        $loginTokensController = new LoginTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$loginTokensController->validate( $loginToken, $request ) ){
            // debug info
            $this->debugger->LogInformation( 'LoginTokensController validate invalid login token loginToken: ' . $loginToken );
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'LoginTokensController validate', 'invalid login token', 
                                                              'loginToken: ' . $loginToken );
            // done invalid
            return false;
        }
        // done valid
        return true;
    }
    public function refreshLoginToken( $existingToken ){
        // create data acces
        $loginTokensController = new LoginTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // delete token
        $loginTokensController->deleteToken( $existingToken );
        // done 
        return $this->getLoginToken();
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
