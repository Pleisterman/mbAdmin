<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateTokenHeader.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this creates the token header segment of a jsonwebtoken
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
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensUrlsafeB64Encoder;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensJsonEncoder;

class JsonWebTokensCreateTokenHeader
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function createTokenHeader( $algorithm ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensCreateTokenHeader' );
        
        // create the header
        $header = array(
            'typ' => 'JWT', 
            'alg' => $algorithm
        );
        // done create header
        
        // create json encoder
        $jsonEncoder = new JsonWebTokensJsonEncoder( $this->debugger );
        // encode json
        $json = $jsonEncoder->encodeJson( $header );
        // create b64 encoder
        $b64Encoder = new JsonWebTokensUrlsafeB64Encoder( $this->debugger );
        // encode json
        return $b64Encoder->urlsafeB64Encode( $json );
        
    }
}
