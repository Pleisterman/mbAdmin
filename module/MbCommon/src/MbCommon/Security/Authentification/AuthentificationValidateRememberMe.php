<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationValidateRememberMe.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this class handles validation of the remember me
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
use Zend\ServiceManager\ServiceLocatorInterface;
use MbCommon\Database\Security\Settings\SettingsDataController;
use MbCommon\Security\Authentification\Algorithms\AlgorithmsController;
use MbCommon\Security\Authentification\RememberMeTokens\RememberMeTokensController;
use MbCommon\Security\Authentification\PublicTokens\PublicTokensController;
use MbCommon\Security\Authentification\PageTokens\PageTokensController;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensController;
use MbCommon\Database\Security\User\UserDataController;

class AuthentificationValidateRememberMe
{
    private $debugger = null;
    private $configId = null;
    private $workDirectory = null;
    private $serviceLocator = null;
    private $settingsController = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // create settingsController
        $this->settingsController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
    }
    public function validateRememberMe( $algorithm, $rememberMe, $rememberMeToken, $rememberMeBlocked, $request ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationValidateRememberMe ' );
        
        // create public tokens controller
        $publicTokensController = new PublicTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );

        // check rememberMe settting
        if( !$rememberMe ){
            // done rememberMe option is false
            return array( 'token' => $publicTokensController->getPublicToken() );
        }
        // done check rememberMe settting
        
        // create algorithm controller
        $algorithmsController = new AlgorithmsController( $this->debugger );
        // check if algoritm exists
        if( !$algorithmsController->algorithmExists( $algorithm ) ){
            // done rememberMe failed
            return array( 'token' => $publicTokensController->getPublicToken() );
        }
        // done check if algoritm exists

        // check rememberMe blocked setting
        if( $rememberMeBlocked == 'true' ){
            // debug info
            $this->debugger->logInformation( 'AuthentificationValidateRememberMe rememberMeBlocked is true' );
            // done 
            return array( 'token' => $publicTokensController->getPublicToken() );
        }
        // done check rememberMe blocked setting
        
        // create rememberMe tokens controller
        $rememberMeTokensController = new RememberMeTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate remember me token
        if( !$rememberMeTokensController->validate( $rememberMeToken, $request ) ){
            // done rememberMe failed
            return array( 'token' => $publicTokensController->getPublicToken() );
        }
        // done validate public token
        
        // create jsonWebtoken controller
        $jsonWebTokensController = new JsonWebTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate jsonWebToken
        $jsonWebTokenValidateResult = $jsonWebTokensController->validate( $algorithm, $request, true );
        // check jsonwebtoken validate result
        if( $jsonWebTokenValidateResult ){
            
            // create page tokens controller
            $pageTokensController = new PageTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            
            // get page token
            $pageTokenResult = $pageTokensController->getPageToken( );
            // check get page token result
            if( isset( $pageTokenResult['criticalError'] ) ){
                // done with error
                return $pageTokenResult;
            }
            // done check get page token result

            // create user data controller
            $userDataController = new UserDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            
            // done rememeber me succes
            return  array( 
                        'token'         => $pageTokenResult, 
                        'rememberMe'    =>  true,
                        'userName'    => $userDataController->getUserName()
                    );
        }
        // done check jsonwebtoken validate result
        
        // done 
        return array( 'token' => $publicTokensController->getPublicToken( ) );
    }
}
