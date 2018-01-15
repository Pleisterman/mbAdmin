<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensJsonEncoder.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class encodes the json for a jsonwebtoken
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


class JsonWebTokensJsonEncoder
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function encodeJson( $stringArray ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensJsonEncode' );

        // encode string
        $encodedJson = json_encode( $stringArray );
        
        // handle errors
        if ( function_exists( 'json_last_error' ) && $error = json_last_error() ) {
            // debug info
            $this->debugger->LogError( 'JsonWebTokensJsonEncode ' . 'error: '  . $error );
            // done with error
            return false;
        } 
        elseif ( $encodedJson === 'null' && $stringArray !== null ) {
            // debug info
            $this->debugger->LogError( 'JsonWebTokensJsonEncode error' );
            // done with error
            return false;
        }
        // done handle errors

        // done
        return $encodedJson;
    }
}
