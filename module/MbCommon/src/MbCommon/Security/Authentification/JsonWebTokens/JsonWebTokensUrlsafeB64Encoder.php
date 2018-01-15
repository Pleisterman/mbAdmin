<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensUrlsafeB64Encoder.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class encodes base 64 data for jsonwebtokens
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


class JsonWebTokensUrlsafeB64Encoder
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function urlsafeB64Encode( $string ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensUrlsafeB64Encode' );

        // string exists
        if( $string ){
            // return encoded string
            return str_replace( '=', '', strtr( base64_encode( $string ), '+/', '-_' ) );
        }
        // done string exists

        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensUrlsafeB64Encode error string: ' . $string );

        // return with error
        return false;
    }
}
