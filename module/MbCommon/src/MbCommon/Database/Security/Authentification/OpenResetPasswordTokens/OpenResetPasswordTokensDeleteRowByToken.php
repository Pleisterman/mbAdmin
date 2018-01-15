<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensDeleteRowByToken.php
 * 
 *  Last Revision:  22-01-2017
 * 
 *  Purpose: 
 *          this class deletes a row according to a given id from the openResetPasswordTokens table
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

namespace MbCommon\Database\Security\Authentification\OpenResetPasswordTokens;

use Common\Service\Debugger;

class OpenResetPasswordTokensDeleteRowByToken
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members

    }        
    public function deleteRow( $dataController, $token ){
        // debug info
        $this->debugger->LogInformation( 'OpenResetPasswordTokensDeleteRowByToken token: ' . $token );
        
        // get selection
        $selection = $this->getSelection( $token );
        
        // delete
        if( !$dataController->delete( $selection ) ){
            // done with error
            return array( 'criticalError' => 'deleteFailed' );
        }
        // done delete
        
        // done 
        return [];
    }
    private function getSelection( $token ) {

        // create selection
        $selection = array(
            'table'        =>   'openResetPasswordTokens',
            'whereClauses' => array(
                array (
                    'what' => 'token',
                    'value' => '?',
                    'compare' => '='
                )
            ),
            'values'    => array(
                $token
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}