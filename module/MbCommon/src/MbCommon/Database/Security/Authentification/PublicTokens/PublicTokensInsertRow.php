<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\PublicTokens\PublicTokensInsertRow.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class inserts a row in the publicTokens table
 *          the expiration for remember me tokens is set according to
 *          the config var rememberMeTokenExpirationPeriod
 *          the standard public tokens expiration period is set according to
 *          the config var publicTokenExpirationPeriod
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


namespace MbCommon\Database\Security\Authentification\PublicTokens;

use Common\Service\Debugger;

class PublicTokensInsertRow
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $configId = null; 
    private $config = array( 
        'publicTokenExpirationPeriod'   => 28800        // 8 * 3600 seconds
    );
    public function __construct( $configId, $serviceLocator, Debugger $debugger  )
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
        // calculate expiration
        $expires = new \DateTime( 'now' );
        // public token expiration period
        $expires->add( new \DateInterval( 'PT' . $this->config['publicTokenExpirationPeriod'] . 'S' ) );
        
        // create selection
        $selection = array(
            'table' =>  'publicTokens',
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