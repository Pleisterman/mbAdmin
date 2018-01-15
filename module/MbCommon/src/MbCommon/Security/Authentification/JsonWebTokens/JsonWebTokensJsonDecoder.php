<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensJsonDecoder.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          deoodes the json for a jsonwebtoken
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


class JsonWebTokensJsonDecoder
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function jsonDecode( $encodedJson ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensJsonDecode' );

        // decode
        if ( version_compare( PHP_VERSION, '5.4.0', '>=' ) && !( defined( 'JSON_C_VERSION' ) && PHP_INT_SIZE > 4 ) ) {
            // decode
            $decodedJson = json_decode( $encodedJson, false, 512, JSON_BIGINT_AS_STRING );
        } 
        else {
            // get max int length
            $max_int_length = strlen( ( string ) PHP_INT_MAX ) - 1;
            // modify ints
            $json_without_bigints = preg_replace( '/:\s*(-?\d{'.$max_int_length.',})/', ': "$1"', $encodedJson );
            // decode
            $decodedJson = json_decode( $json_without_bigints );
        }
        // done decode
        
        // handle errors
        if ( function_exists( 'json_last_error' ) && $error = json_last_error() ) {
            // debug info
            $this->debugger->LogError( 'JsonWebTokensJsonDecode error: '  . $error );
            // done with error
            return false;
        } 
        elseif ( $decodedJson === null && $encodedJson !== 'null' ) {
            // debug info
            $this->debugger->LogError( 'JsonWebTokensJsonDecode error encoded json: ' . $encodedJson );
            // done with error
            return false;
        }
        // done handle errors

        // done
        return $decodedJson;
    }
}
