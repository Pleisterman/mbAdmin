<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationChangeUserInfo.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 * Purpose: this class changes user info data in the 
 *          user table
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
use MbCommon\Database\Security\User\UserDataController;

class AuthentificationChangeUserInfo
{
    private $debugger = null;
    private $serviceLocator = null;
    private $workDirectory = null;
    private $configId = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function changeUserInfo( $values ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationChangeUserInfo ' );

        // create controller
        $userController = new UserDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // safe key
        return $userController->setUserInfo(  $values  );
    }
}
