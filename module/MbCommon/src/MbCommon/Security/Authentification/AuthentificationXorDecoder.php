<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationXorDecoder.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class decodes an XOR encodeing
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

namespace MbCommon\Security\Authentification;

use Common\Service\Debugger;

class AuthentificationXorDecoder
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function decodeXor( $encodedString, $key ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationDecodeXor ' . 
                                         'encoded string: ' . $encodedString . ' key: ' . $key );
        
        // create result string
        $result = '';
        
        // loop over encoded string
        for( $i = 0; $i < strlen( $encodedString ); $i++ ){
            // decode byte
            $result .= $encodedString[$i] ^ $key[$i];
        }
        // loop over encoded string
         
        // done
        return trim( $result );
        
    }
}
