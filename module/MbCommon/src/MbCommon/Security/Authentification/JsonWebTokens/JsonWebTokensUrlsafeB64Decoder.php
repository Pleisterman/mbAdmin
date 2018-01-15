<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensUrlsafeB64Decoder.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class decodes base 64 data for jsonwebtokens
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

class JsonWebTokensUrlsafeB64Decoder
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function urlsafeB64Decode( $string ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensUrlsafeB64Decode' );

        // string exists
        if( $string ){
            
            // add padding
            $remainder = strlen( $string ) % 4;
            if ( $remainder ) {
                $padlen = 4 - $remainder;
                $string .= str_repeat('=', $padlen );
            }
            // done add padding

            // return decoded string
            return base64_decode( strtr( $string, '-_', '+/' ) );
        }
        // done string exists

        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensUrlsafeB64Decode error string: ' . $string );

        // return with error
        return false;
    }
}
