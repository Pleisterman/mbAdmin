<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensVerifySignature.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class verifie the signature of a jsonwebtoken
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
use MbCommon\Security\InvalidRequests\InvalidRequestsController;

class JsonWebTokensVerifySignature
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
    public function verifySignature( $signature, $hash, $request ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensVerifySignature' );
        // function has equals exists
        if ( function_exists( 'hash_equals' ) ) {
            // done
            return $this->verifyUseHashEqual( $signature, $hash, $request );
        }
        else {
            // done
            return $this->verifyWithoutHashEqual( $signature, $hash, $request );
        }
        // done function has equals exists
    }
    private function verifyUseHashEqual( $signature, $hash, $request ){
        // debug info
        $this->debugger->logInformation( 'JsonWebTokensVerifySignature validate through hash_equals.' );
        // done
        if( hash_equals( $signature, $hash ) ){
            // debug info
            $this->debugger->logInformation( 'JsonWebTokensVerifySignature hash is equal.' );
            // done verified
            return true;
        }
        else {
            $this->debugger->logInformation( 'JsonWebTokensVerifySignature hash is not equal.' );
            // create invalid requests controller
            $invalidRequestController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            //register invalid request
            $invalidRequestController->handleInvalidRequest( 'JsonWebTokensVerifySignature', 'signature hash not equal', $request );
            // done not verified
            return false;
        }
    }
    private function verifyWithoutHashEqual( $signature, $hash, $request ){
        // get minimum string length
        $stringLength = min( $this->stringLength( $signature ), $this->stringLength( $hash ) );
        // create status
        $status = 0;
        // loop for minimum string length
        for ( $i = 0; $i < $stringLength; $i++ ) {
            // set status
            $status |= ( ord( $signature[$i] ) ^ ord( $hash[$i] ) );
        }
        // done loop for minimum string length

        // modify status
        $status |= ( $this->stringLength( $signature ) ^ $this->stringLength( $hash ) );
        
        // check status
        if( $status === 0 ){
            // debug info
            $this->debugger->logInformation( 'JsonWebTokensValidate hash is equal.' );
            // done valid
            return true;
        }
        else { 
            // debug info
            $this->debugger->logInformation( 'JsonWebTokensValidate hash is not equal.' );
            // create invalid requests controller
            $invalidRequestController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            //register invalid request
            $invalidRequestController->handleInvalidRequest( 'JsonWebTokensVerifySignature', 'signature hash not equal', $request );
            // done not verified
            // done invalid
            return false;
        }
        // done check status
        
    }
    private function stringLength( $string ){

        // mb_strlen exists
        if ( function_exists( 'mb_strlen' ) ) {
            // done
            return mb_strlen( $string, '8bit' );
        }
        // done mb_strlen exists
        
        // done
        return strlen( $string );
        
    }
}
