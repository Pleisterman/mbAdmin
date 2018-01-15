<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationLoginFailed.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles login failure
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

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Database\Security\Settings\SettingsDataController;

class AuthentificationLoginFailed
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store service locator
        $this->serviceLocator = $serviceLocator;
    }
    public function loginFailed( $delay, $maximumUndelayedLogins, $reason ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationLoginFailed ' );
        // create settings controller
        $settingsController = new SettingsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get current number of undelayed logins
        $undelayedLogins = intval( $settingsController->getSetting( 'undelayedLogins' ) );
        // check for max
        if( $undelayedLogins <= intval( $maximumUndelayedLogins ) ){
            $undelayedLogins++;
            $settingsController->setSetting( 'undelayedLogins', $undelayedLogins, $reason );
            return 'loginError';
        }
        else {
            $now = new \DateTime( 'now' );
            $nextLogin = $now->add( new \DateInterval( 'PT' . $delay . 'S' ) );
            $settingsController->setSetting( 'nextLogin', $nextLogin->format( 'Y-m-dTH:i:s' ), $reason );
            $settingsController->setSetting( 'loginDelayed', true, $reason );
            return 'loginDelayed';
        }
        // done check max
    }
}
