<?php
/* 
 *  Project: MbCommon
 * 
 *  File: /MbCommon/Security/Authentification/PublicTokens/PublicTokensController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles construction, saving and verification 
 *          of a public Token used to verify user before prepare login
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

namespace MbCommon\Security\Authentification\PublicTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Database\Security\Authentification\PublicTokens\PublicTokensDataController;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;

class PublicTokensController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'publicTokenLength'             => 32
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // debug info
        $this->debugger->logInformation( 'PublicTokensController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function getPublicToken(){
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        // create new token
        $token = $tokenGenerator->getToken( $this->config['publicTokenLength'] );
        // create data acces
        $publicTokensController = new PublicTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // insert token
        $publicTokensController->insertToken( $token );
        // done
        return $token;
    }    
    public function validate( $publicToken, $request ){
        // create data acces
        $publicTokensController = new PublicTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$publicTokensController->validate( $publicToken ) ){
            // debug info
            $this->debugger->LogInformation( 'PublicTokensController validate invalid public token publicToken: ' . $publicToken );
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'PublicTokensController validate', 'invalid public token: ' . $publicToken, $request );
            // done invalid
            return false;
        }
        // done valid
        return true;
    }
    public function refreshPublicToken( $existingToken ){
        // create data acces
        $publicTokensController = new PublicTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // delete token
        $publicTokensController->deleteToken( $existingToken );
        // done 
        return $this->getPublicToken();
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
