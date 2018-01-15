<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationLoginSucces.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles login succes
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

namespace MbCommon\Security\Authentification;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Database\Security\Settings\SettingsDataController;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensController;
use MbCommon\Security\Authentification\PageTokens\PageTokensController;
use MbCommon\Database\Security\User\UserDataController;

class AuthentificationLoginSucces
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
        // store service locator
        $this->serviceLocator = $serviceLocator;
    }
    public function loginSucces( $algorithm, $rememberMe = null ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationLoginSucces ' );
        // create settings controller
        $settingsController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        
        // set login delayed false
        $settingsController->setSetting( 'loginDelayed', false, 'Login succes ' );
        // set undelayed logins - 0
        $settingsController->setSetting( 'undelayedLogins', 0, 'Login succes' );
        // set rememeber me blocked false
        $settingsController->setSetting( 'rememberMeBlocked', false, 'Login succes' );
        
        // check if remember me exists
        if( $rememberMe != null ){
            // set rememeber me
            $settingsController->setSetting( 'rememberMe', $rememberMe, 'Set during login' );
        }
        // done check if remember me exists
        
        // create jsonWebtoken controller
        $jsonWebTokensController = new JsonWebTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create token jsonWebToken
        $createTokenResult = $jsonWebTokensController->createToken( $algorithm );
        if( !$createTokenResult ){
            // done with error
            return array( 'criticalError' =>  'dataconnectionFailed' );        
        }
        // done create token jsonWebToken

        // create page tokens controller
        $pageTokensController = new PageTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create page token
        $pageTokenResult = $pageTokensController->getPageToken();
        // check get page token result
        if( isset( $pageTokenResult['criticalError'] ) ){
            // done with error
            return $pageTokenResult;
        }
        // done check get page token result
        
        // create user data controller
        $userDataController = new UserDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        
        // done 
        return array( 'token'       => $pageTokenResult,
                      'userName'    => $userDataController->getUserName()  );
    }
}
