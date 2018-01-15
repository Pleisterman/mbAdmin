<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\LoginTokens\LoginTokensClean.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class deletes the expired tokens from the loginTokens table
 *          the expiration is the current date time 
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

namespace MbCommon\Database\Security\Authentification\LoginTokens;

use Common\Service\Debugger;

class LoginTokensClean
{
    private $debugger = null; 
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members

    }        
    public function clean( $dataController ){
        // debug info
        $this->debugger->LogInformation( 'LoginTokensCleanUp  ' );
        
        // get selection
        $selection = $this->getSelection( );
        
        // create result
        $result = [];
        
        // update
        if( !$dataController->delete( $selection ) ){
            // set critical error
            $result['criticalError'] = 'deleteFailed';
            // done with error
            return $result;
        }
        // done update
        
        // done 
        return $result;
    }
    private function getSelection( ) {
        // create date time
        $now = new \DateTime( 'now' );

        // create selection
        $selection = array(
            'table'        =>   'loginTokens',
            'whereClauses' => array(
                array( 
                    'what' => 'expires',
                    'compare' => '< ? '
                )
            ),
            'values'    => array( 
                $now->format( 'YmdHis' )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}