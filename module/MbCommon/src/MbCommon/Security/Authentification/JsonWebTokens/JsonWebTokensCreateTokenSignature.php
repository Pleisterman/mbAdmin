<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateTokenSignature.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class creates the signature of a jsonwebtoken
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

use Common\Service\Debugger;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensUrlsafeB64Encoder;

class JsonWebTokensCreateTokenSignature
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function createTokenSignature( $segments, $token, $algorithm ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensCreateTokenSignature' );
        // create sign input
        $signInput = implode( '.', $segments );
        // create signature
        $signature = hash_hmac( $algorithm, $signInput, $token, true );
        // create b64 encoder
        $b64Encoder = new JsonWebTokensUrlsafeB64Encoder( $this->debugger );
        // encode signature
        return $b64Encoder->urlsafeB64Encode( $signature );
        
    }
}
