<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\LoginTokens\LoginTokensInsertRow.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class inserts a row in the loginTokens table
 *          the expiration date is set according to a 
 *          config var loginTokenExpirationPeriod
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


namespace MbCommon\Database\Security\Authentification\LoginTokens;

use Common\Service\Debugger;
use Zend\ServiceManager\ServiceLocatorInterface;

class LoginTokensInsertRow
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $configId = null; 
    private $config = array( 
        'loginTokenExpirationPeriod'   => 120, // 120 seconds
    );
    public function __construct( $configId, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store config id
        $this->configId = $configId;    
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;

        // get config values
        $this->getConfig();
    }        
    public function insertRow( $dataController, $token ){
        
        // get selection    
        $selection = $this->getSelection( $token );
        
        // insert
        $insertResult = $dataController->insert( $selection );
        
        // check result
        if( !$insertResult ){
            // done with error
            return array( 'criticalError' => 'insertFailed' );
        }
        // done check result
        
        // done
        return $insertResult['insertId'];
        
    }
    private function getSelection( $token ) {
        // create date time
        $expires = new \DateTime( 'now' );
        // add expiration period
        $expires->add( new \DateInterval( 'PT' . $this->config['loginTokenExpirationPeriod'] . 'S' ) );
        
        // create selection
        $selection = array(
            'table' =>  'loginTokens',
            'columns' => array( 
                'token',
                'expires'
                
            ),
            'values' => array(
                $token,
                $expires->format( 'YmdHis' )
            )
        );
        // done create selection 
        
        // done return selection
        return $selection;
    }
    private function getConfig( ){
        // read the configuration
        $config = $this->serviceLocator->get( 'config' )[$this->configId];
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