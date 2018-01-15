<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensGetPayloadTokenId.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          gets the token id contained in the payload of a jsonwebtoken
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

use Common\Service\Debugger;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensJsonDecoder;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensUrlsafeB64Decoder;

class JsonWebTokensGetPayloadTokenId
{
    private $debugger = null;
    private $configId = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
    }
    public function getPayloadTokenId( $jsonWebToken ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensGetPayloadTokenId' );

        // split the segments
        $segments = explode( '.', $jsonWebToken );
        
        // check segment count
        if( $segments < 3 ){
            // debug info
            $this->debugger->LogError( 'JsonWebTokensGetPayloadTokenId less then 3 segments. ' );
            // create invalid requests controller
            $invalidRequestController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestController->handleInvalidRequest( 'jsonWebTokens', 'less then 3 segments', '' );
            // done with error
            return false;
        }
        // done check segment count

        // create the 64b decoder
        $b64Decoder = new JsonWebTokensUrlsafeB64Decoder( $this->debugger );
        // create the json decoder
        $jsonDecoder = new JsonWebTokensJsonDecoder( $this->debugger );
        
        // decode b64
        $json = $b64Decoder->urlsafeB64Decode( $segments[1] );
        // decode json
        $payload = $jsonDecoder->jsonDecode( $json );

        if( isset( $payload->kid ) ){
            $this->debugger->LogInformation( 'JsonWebTokensGetPayloadTokenId key found  keyId: ' . $payload->kid );
            // done with tokenId
            return $payload->kid;
        }
        else {
            $this->debugger->LogError( 'JsonWebTokensGetPayloadTokenId no key found in token. ' );
            // create invalid requests controller
            $invalidRequestController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestController->handleInvalidRequest( 'jsonWebTokens', 'no key found in token', '' );
        }
        // done check if the key exists
        
        // done no tokenId
        return false;
        
    }
}
