<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateToken.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class creates a jsonwebtoken and saves the database token
 *          in the table jsonWebTokens
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

namespace MbCommon\Security\Authentification\JsonWebTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Database\Security\Authentification\JsonWebTokens\JsonWebTokensDataController;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateTokenHeader;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateTokenPayload;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateTokenSignature;

class JsonWebTokensCreateToken
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $config = array( 
        'jsonWebTokenTokenLength'           =>  32,
        'jsonWebTokenExpirationPeriod'      =>  259200, // 3600 * 24 * 3
    );
    public function __construct( $configId, $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function createToken( JsonWebTokensDataController $jsonWebTokensDataController, $algorithm ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensCreateToken' );
        
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        
        // create a new key
        $token = $tokenGenerator->getToken( $this->config['jsonWebTokenTokenLength'] );

        // create a new token
        $tokenId = $jsonWebTokensDataController->insertToken( $token );
        if( !$tokenId ){
            // debug info
            $this->debugger->LogInformation( 'error creating token for jsonWebToken' );
            // done with error
            return false;
        }
        // done create a new key
        
        // create the segments
        $segments = array();
        // create create header controller
        $jsonWebTokensCreateTokenHeader = new JsonWebTokensCreateTokenHeader( $this->debugger );
        // header segment
        $segments[] = $jsonWebTokensCreateTokenHeader->createTokenHeader( $algorithm );
        // create create header controller
        $jsonWebTokensCreateTokenPayload = new JsonWebTokensCreateTokenPayload( $this->debugger );
        // payload segment
        $segments[] = $jsonWebTokensCreateTokenPayload->createTokenPayload( $tokenId );
        // create create signature controller
        $jsonWebTokensCreateTokenSignature = new JsonWebTokensCreateTokenSignature( $this->debugger );
        // signature segment
        $segments[] = $jsonWebTokensCreateTokenSignature->createTokenSignature( $segments,  $token, $algorithm );
        // done 
        return array( 
            'tokenId'   =>  $tokenId,
            'token'     => implode( '.', $segments ),
        );
        
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
