<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\TokenGenerator\TokenGeneratorGetToken.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles creation of a random token according to a given length
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

namespace MbCommon\Security\Authentification\TokenGenerator;

use Common\Service\Debugger;

class TokenGeneratorGetToken
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function getToken( $codeAlphabet, $length ){
        // debug info
        $this->debugger->LogInformation( 'TokenGeneratorGetToken length: ' . $length );
        
        // create a token empty token
        $token = "";
        
        // loop for length
        for( $i = 0; $i < $length; $i++ ){
            // add byte
            $token .= $codeAlphabet[$this->genereateSecureRandomByte( 0, strlen( $codeAlphabet ) )];
        }
        // done loop for length
        
        // done
        return htmlentities( $token );
        
    }
    private function genereateSecureRandomByte( $minimum, $maximum ){

        // caculate range
        $range = $maximum - $minimum;
        if ( $range < 0 ) {
            return $minimum;
        }
        // done caculate range
        
        // set log
        $log = log( $range, 2 );
        // calculate byte length
        $bytes = ( int ) ( $log / 8 ) + 1;
        // calculate bit length
        $bits = ( int ) $log + 1;
        // create filter to set all lower bits to 1
        $filter = ( int ) ( 1 << $bits ) - 1; 
        $randomByte = $range;
        while( $randomByte >= $range ){
            $randomByte = hexdec( bin2hex( openssl_random_pseudo_bytes( $bytes ) ) );
            // discard irrelevant bits
            $randomByte &= $filter; 
        } 
        // done create filter to set all lower bits to 1

        // done
        return $minimum + $randomByte;
        
    }
}
