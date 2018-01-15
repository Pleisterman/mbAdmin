<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserDataController.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls for user 
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

namespace MbCommon\Database\Security\User;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\User\UserSetLoginValues;
use MbCommon\Database\Security\User\UserSetPasswordKey;
use MbCommon\Database\Security\User\UserSetCookieToken;
use MbCommon\Database\Security\User\UserGetCookieToken;
use MbCommon\Database\Security\User\UserGetLoginKeys;
use MbCommon\Database\Security\User\UserGetLoginData;
use MbCommon\Database\Security\User\UserGetUserName;
use MbCommon\Database\Security\User\UserGetUserInfo;
use MbCommon\Database\Security\User\UserSetUserInfo;
use MbCommon\Database\Security\User\UserChangePassword;
use MbCommon\Database\Security\User\UserValidateEmail;

class UserDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'authorisation/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // add user to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }   
    public function savePasswordKey( $passwordKey ){
        // create set login keys controller
        $controller = new UserSetPasswordKey( $this->debugger );
        // done 
        return $controller->setPasswordKey( $this, $passwordKey );
    }
    public function getPasswordKey( ){
        // create get login keys controller
        $controller = new UserGetPasswordKey( $this->debugger );
        // done 
        return $controller->getPasswordKey( $this );
    }
    public function setCookieToken( $cookieToken ){
        // create set cookie token controller
        $controller = new UserSetCookieToken( $this->debugger );
        // done 
        return $controller->setCookieToken( $this, $cookieToken );
    }
    public function getCookieToken( ){
        // create get cookie token controller
        $controller = new UserGetCookieToken( $this->debugger );
        // done 
        return $controller->getCookieToken( $this );
    }
    public function setLoginValues( $nameKey, $passwordKey, $token, $cookieToken ){
        // create set login keys controller
        $controller = new UserSetLoginValues( $this->debugger );
        // done 
        return $controller->setLoginValues( $this, $nameKey, $passwordKey, $token, $cookieToken );
    }
    public function getLoginKeys( ){
        // create get login keys controller
        $controller = new UserGetLoginKeys( $this->debugger );
        // done 
        return $controller->getLoginKeys( $this );
    }
    public function getLoginData( ){
        // create controller
        $controller = new UserGetLoginData( $this->debugger );
        // done 
        return $controller->getLoginData( $this );
    }
    public function getUserName( ){
        // create get login keys controller
        $controller = new UserGetUserName( $this->debugger );
        // done 
        return $controller->getUserName( $this );
    }
    public function getUserInfo( ){
        // create get login keys controller
        $controller = new UserGetUserInfo( $this->debugger );
        // done 
        return $controller->getUserInfo( $this );
    }
    public function setUserInfo( $values ){
        // create get login keys controller
        $controller = new UserSetUserInfo( $this->debugger );
        // done 
        return $controller->setUserInfo( $this, $values );
    }
    public function changePassword( $values ){
        // create change password controller
        $controller = new UserChangePassword( $this->debugger );
        // done 
        return $controller->changePassword( $this, $values );
    }
    public function validateEmail( $email ){
        // create validate email controller
        $controller = new UserValidateEmail( $this->debugger );
        // done 
        return $controller->validateEmail( $this, $email );
    }
}