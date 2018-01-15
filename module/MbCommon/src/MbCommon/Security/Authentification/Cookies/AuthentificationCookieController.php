<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\Cookies\AuthentificationCookieController.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this class handles testing, reading and writing cookies
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

namespace MbCommon\Security\Authentification\Cookies;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\Cookies\AuthentificationCookieCheck;
use MbCommon\Security\Authentification\Cookies\AuthentificationLoginCookie;
use MbCommon\Security\Authentification\Cookies\AuthentificationStartPasswordResetCookie;
use MbCommon\Security\Authentification\Cookies\AuthentificationPreparePasswordResetCookie;

class AuthentificationCookieController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
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
    public function createTestCookie( ){
        // create controller
        $cookieCheckController = new AuthentificationCookieCheck( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create test cookie
        $cookieCheckController->createTestCookie();
    }
    public function getCookiesEnabled( ){
        // create controller
        $cookieCheckController = new AuthentificationCookieCheck( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get cookies enabled
        return $cookieCheckController->getCookiesEnabled();
    }
    public function setLoginCookie( $cookieToken ){
        // create controller
        $loginCookieController = new AuthentificationLoginCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create login cookie
        $loginCookieController->setLoginCookie( $cookieToken );
    }
    public function validateLoginCookie( $cookieToken, $request ){
        // create controller
        $loginCookieController = new AuthentificationLoginCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate cookie
        return $loginCookieController->validateLoginCookie( $cookieToken, $request );
    }
    public function setStartPasswordResetCookie( ){
        // create controller
        $preparePasswordResetCookie = new AuthentificationStartPasswordResetCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create start password reset cookie
        $preparePasswordResetCookie->setStartPasswordResetCookie();
    }
    public function validateStartPasswordResetCookie( ){
        // create controller
        $startPasswordResetCookie = new AuthentificationStartPasswordResetCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate cookie
        return $startPasswordResetCookie->validateStartPasswordResetCookie();
    }
    public function setPreparePasswordResetCookie( ){
        // create controller
        $preparePasswordResetCookie = new AuthentificationPreparePasswordResetCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create prepare password reset cookie
        $preparePasswordResetCookie->setPreparePasswordResetCookie();
    }
    public function validatePreparePasswordResetCookie( ){
        // create controller
        $preparePasswordResetCookie = new AuthentificationPreparePasswordResetCookie( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate cookie
        return $preparePasswordResetCookie->validatePreparePasswordResetCookie();
    }
}
