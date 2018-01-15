<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationLoginDelayController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class checks if a delay applies
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

namespace MbCommon\Security\Authentification;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class AuthentificationLoginDelayController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $config = array( 
        'loginDelay'    => 30
    );
    public function __construct( $configId, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function hasLoginDelay( $loginDelayed, $nextLogin ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationCheckLoginDelay' );
        
        // check if login is delayed
        if( !$loginDelayed == 'true' ){
            // done no delay
            return false;
        }
        // done check if login is delayed
        
        // get current time
        $nowDateTime = new \DateTime( 'now' );
        // get date time of next login
        $nextLoginDateTime = new \DateTime( $nextLogin );
        // now is later then nextlogin
        if( $nowDateTime > $nextLoginDateTime ){
            // done no delay
            return false;
        }
        // now is later then nextlogin

        // done with delay
        return true;
    }
    private function getConfig( ServiceLocatorInterface $serviceLocator ) {
        // read the configuration
        $config = $serviceLocator->get( 'config' )[$this->configId];
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
    }
}
