<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\PageTokens\PageTokensValidate.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class validates the existance of a token in the page tokens table
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

namespace MbCommon\Database\Security\Authentification\PageTokens;

use Common\Service\Debugger;

class PageTokensValidate
{
    private $debugger = null; 
    private $serviceLocator = null;
    public function __construct( $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }        
    public function validate( $dataController, $token ){
        
        // debug info
        $this->debugger->logInformation( 'PageTokensValidate' );
        
        // get selection    
        $selection = $this->getSelection( $token );
        
        // select
        $result = $dataController->select( $selection );        

        // public token exists
        if( $result && isset( $result[0] ) ){
            if( $result[0]['count'] > 0 ){
                // debug info
                $this->debugger->logInformation( 'PageTokensValidate token is valid' );
                // done return valid
                return true;
            }
        }
        // done public token exists

        // debug info
        $this->debugger->logInformation( 'PageTokensValidate invalid token: '. $token );
        
        // done invalid
        return false;
    }
    private function getSelection( $token ) {
        // create date time
        $now = new \DateTime( 'now' );
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'pageTokens' => 'a'
            ),
            'columns'       => array( 
                'COUNT(*) AS count'
            ),
            'whereClauses' => array(
                array (
                    'what' => 'token',
                    'value' => $token,
                    'compare' => '='
                ),
                array (
                    'what' => 'expires',
                    'value' => $now->format( 'YmdHis' ),
                    'compare' => '>='
                )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}