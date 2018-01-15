<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateTokenPayload.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class creates the payload segment of a jsonwebtoken
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

namespace MbCommon\Security\Authentification\JsonWebTokens;

use Common\Service\Debugger;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensUrlsafeB64Encoder;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensJsonEncoder;

class JsonWebTokensCreateTokenPayload
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function createTokenPayload( $id ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensCreateTokenPayload' );
        
        // create the payload
        $payload = array(
            'kid' => $id
        );
        // done create payload
        
        // create json encoder
        $jsonEncoder = new JsonWebTokensJsonEncoder( $this->debugger );
        // encode json
        $json = $jsonEncoder->encodeJson( $payload );
        // create b64 encoder
        $b64Encoder = new JsonWebTokensUrlsafeB64Encoder( $this->debugger );
        // encode json
        return $b64Encoder->urlsafeB64Encode( $json );
        
    }
}
