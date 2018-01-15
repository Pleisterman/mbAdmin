<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles construction, saving, encoding, decoding, 
 *          signing and verification of a Json Web Token used to verify user
 *          login and remember me
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

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensGetTokenFromCookie;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensGetPayloadTokenId;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensGetDatabaseToken;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensValidate;
use MbCommon\Database\Security\Authentification\JsonWebTokens\JsonWebTokensDataController;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensCreateToken;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensSetTokenInCookie;

class JsonWebTokensController
{
    private $configId = null;
    private $workDirectory = null;
    private $debugger = null;
    private $serviceLocator = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // debug info
        $this->debugger->logInformation( 'JsonWebTokensController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function validate( $algorithm, $request, $refresh = false ){

        // debug info
        $this->debugger->logInformation( 'JsonWebTokensController validate' );
        // create get token from cookie controller
        $jsonWebTokensGetTokenFromCookieController = new JsonWebTokensGetTokenFromCookie( $this->workDirectory, $this->debugger );
        // get token from cookie
        $jsonWebToken = $jsonWebTokensGetTokenFromCookieController->getTokenFromCookie( );
        // check jsonWebToken token
        if( !$jsonWebToken ){
            // done no token found
            return false;
        }
        // done check jsonWebToken token

        // create jsonWebToken data controller
        $jsonWebTokensDataController = new JsonWebTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );

        // create get payload token id controller
        $jsonWebTokensGetPayloadTokenIdController = new JsonWebTokensGetPayloadTokenId( $this->configId, $this->workDirectory, $this->debugger );
        // get payload tokenid
        $jsonWebTokenPayloadTokenId = $jsonWebTokensGetPayloadTokenIdController->getPayloadTokenId( $jsonWebToken );
        // check database token
        if( !$jsonWebTokenPayloadTokenId ){
            // done not valid
            return false;
        }
        // done check database token

        // create get database token controller
        $jsonWebTokensGetDatabaseTokenController = new JsonWebTokensGetDatabaseToken( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get database token
        $databaseToken = $jsonWebTokensGetDatabaseTokenController->getDatabaseToken( $jsonWebTokensDataController, $jsonWebTokenPayloadTokenId );
        // check database token
        if( !$databaseToken ){
            // done not valid
            return false;
        }
        // done check database token
        
        // create jsonWebtoken validate controller
        $jsonWebTokensValidateController = new JsonWebTokensValidate( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        
        // validate jsonWebToken
        if( !$jsonWebTokensValidateController->validate( $jsonWebToken, $databaseToken, $algorithm, $request ) ){
            // done invalid
            return false;
        }
        // done validate jsonWebToken
        
        if( $refresh ){
            return $this->refreshToken( $jsonWebTokensDataController, $jsonWebTokenPayloadTokenId, $algorithm );
        }
        
        // done 
        return  array( 
                    'tokenId'   =>  $jsonWebTokenPayloadTokenId
                );
    }
    public function createToken( $algorithm ){
        // create jsonWebToken data controller
        $jsonWebTokensDataController = new JsonWebTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create jsonWebtoken create token controller
        $jsonWebTokensCreateTokenController = new JsonWebTokensCreateToken(  $this->configId, $this->serviceLocator, $this->debugger );
        // create token
        $createTokenResult = $jsonWebTokensCreateTokenController->createToken( $jsonWebTokensDataController, $algorithm );
        // check token
        if( !$createTokenResult ){
            // done with error
            return false;
        }
        // done check token
        
        // create set token in cookie controller
        $jsonWebTokensSetTokenInCookie = new JsonWebTokensSetTokenInCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // set token in cookie
        $jsonWebTokensSetTokenInCookie->setTokenInCookie( $createTokenResult['token'] );
        
        // done
        return  array( 
                    'tokenId'   =>  $createTokenResult['tokenId']
                );
    }
    private function refreshToken( JsonWebTokensDataController $jsonWebTokensDataController, $tokenId, $algorithm ){
        // delete existing token
        $jsonWebTokensDataController->deleteById( $tokenId );
        // create jsonWebtoken create token controller
        $jsonWebTokensCreateTokenController = new JsonWebTokensCreateToken( $this->configId, $this->serviceLocator, $this->debugger );
        // create token
        $createTokenResult = $jsonWebTokensCreateTokenController->createToken( $jsonWebTokensDataController, $algorithm );
        // check token
        if( !$createTokenResult ){
            // done with error
            return false;
        }
        // done check token
        
        // create set token in cookie controller
        $jsonWebTokensSetTokenInCookie = new JsonWebTokensSetTokenInCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // set token in cookie
        $jsonWebTokensSetTokenInCookie->setTokenInCookie( $createTokenResult['token'] );
        
        // done
        return  array( 
                    'tokenId'   =>  $createTokenResult['tokenId']
                );
    }
    public function deleteToken(){
        // create delete token from cookie controller
        $jsonWebTokensDeleteTokenFromCookie = new JsonWebTokensDeleteTokenFromCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // delete token from cookie
        $jsonWebTokensDeleteTokenFromCookie->deleteTokenFromCookie( );
        
    }
}
