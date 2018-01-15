<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\PublicTokens\PublicTokensValidate.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class validates the existance of a token in the public tokens database
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

class PublicTokensValidate
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function validate( $dataController, $token ){
        
        // debug info
        $this->debugger->logInformation( 'PublicTokensValidate' );
        
        // get selection    
        $selection = $this->getSelection( $token );
        
        // select
        $result = $dataController->select( $selection );        

        // public token exists
        if( $result && isset( $result[0] ) ){
            if( $result[0]['count'] > 0 ){
                // done return valid
                return true;
            }
        }
        // done public token exists

        // debug info
        $this->debugger->logInformation( 'PublicTokensValidate invalid token: '. $token );

        // done invalid
        return false;
    }
    private function getSelection( $token ) {
        // create date time
        $now = new \DateTime( 'now' );
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'publicTokens' => 'a'
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