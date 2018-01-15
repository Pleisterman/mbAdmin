<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensSplitSegments.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class splist the segments of a jsonwebtoken
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


class JsonWebTokensSplitSegments
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function splitSegments( $jsonWebToken ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensSplitSegments' );

        // split the segments
        $segments = explode( '.', $jsonWebToken );
        if( $segments < 3 ){
            // debug info
            $this->debugger->LogError( 'JsonWebTokensSplitSegments less then 3 segments. ' );
            // done not valid
            return false;
        }

        // create the 64b decoder
        $b64Decoder = new JsonWebTokensUrlsafeB64Decoder( $this->debugger );
        
        // create segment array
        $segmentArray = array(
            'header'        =>      $segments[0],
            'payload'       =>      $segments[1],
            'signature'     =>      $b64Decoder->urlsafeB64Decode( $segments[2] )
        );
        // done create segment array
        
        // done
        return $segmentArray;
        
    }
}
