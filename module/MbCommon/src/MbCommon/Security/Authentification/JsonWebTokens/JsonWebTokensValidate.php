<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensValidate.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class validates a jsonwebtoken
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
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensVerifySignature;

class JsonWebTokensValidate
{
    private $debugger = null;
    private $configId = null;
    private $workDirectory = null;
    private $serviceLocator = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function validate( $jsonWebToken, $databaseToken, $algorithm, $request ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensValidate' );

        // create get database token controller
        $jsonWebTokensSplitSegmentsController = new JsonWebTokensSplitSegments( $this->debugger );
        // get segments
        $segmentArray = $jsonWebTokensSplitSegmentsController->splitSegments( $jsonWebToken );
        // check segments
        if( !$segmentArray ){
            // done not valid
            return false;
        }
        // done check segments
        
        // create signature hash with header and payload
        $hash = hash_hmac( $algorithm, $segmentArray['header'] . '.' . $segmentArray['payload'], $databaseToken, true );
        
        // check if signature and hash were created succesfully
        if( !$segmentArray['signature'] || !$hash ){
            return false;
        }
        // done check if signature and hash were created succesfully

        
        // create get database token controller
        $jsonWebTokensVerifySignatureController = new JsonWebTokensVerifySignature( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $jsonWebTokensVerifySignatureController->verifySignature( $segmentArray['signature'], $hash, $request );
        
    }
}
