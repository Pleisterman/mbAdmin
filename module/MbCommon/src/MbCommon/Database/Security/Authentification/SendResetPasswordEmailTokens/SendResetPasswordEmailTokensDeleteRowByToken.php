<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensDeleteRowByToken.php
 * 
 *  Last Revision:  11-01-2017
 * 
 *  Purpose: 
 *          this class deletes a row from the publicTokens table
 *          according to a given token
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


namespace MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens;

use Common\Service\Debugger;

class SendResetPasswordEmailTokensDeleteRowByToken
{
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members

    }        
    public function deleteRowByToken( $dataController, $token ){
        // debug info
        $this->debugger->LogInformation( 'SendResetPasswordEmailTokensDeleteRowByToken token: ' . $token );
        
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
            'table'        =>   'sendResetPasswordEmailTokens',
            'whereClauses' => array(
                array (
                    'what' => 'token',
                    'compare' => '= ?'
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