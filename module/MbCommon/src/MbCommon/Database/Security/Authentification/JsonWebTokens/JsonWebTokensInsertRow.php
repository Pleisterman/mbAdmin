<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\JsonWebTokens\JsonWebTokensInsertRow.php
 * 
 *  Last Revision:  24-11-2016
 * 
 *  Purpose: 
 *          this class inserts a row in the JsonWebTokens table
 *                      
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 * 
 *  Zend Framework (http://framework.zend.com/)
 *
 *  @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 *  @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace MbCommon\Database\Security\Authentification\JsonWebTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class JsonWebTokensInsertRow
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $configId = null; 
    private $config = array( 
        'jsonWebTokenExpirationPeriod'   => 259200, // 3600 * 24 * 3
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
        
        // calculate expiration
        $expires = new \DateTime( 'now' );
        // remember me expiration period
        $expires->add( new \DateInterval( 'PT' . $this->config['jsonWebTokenExpirationPeriod'] . 'S' ) );
        
        // get selection    
        $selection = $this->getSelection( $token, $expires );
        
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
    private function getSelection( $token, $expires ) {
        
        // create selection
        $selection = array(
            'table' =>  'JsonWebTokens',
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