<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\JsonWebTokens\JsonWebTokensClean.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class deletes the expired rows from the jsonWebToken table
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

namespace MbCommon\Database\Security\Authentification\JsonWebTokens;

use Common\Service\Debugger;

class JsonWebTokensClean
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
        $this->debugger->LogInformation( 'JsonWebTokensCleanUp ' );
        
        // get selection
        $selection = $this->getSelection( );
        
        // delete
        $dataController->delete( $selection );
    }
    private function getSelection( ) {
        // create selection
        $now = new \DateTime( 'now' );
        // done create selection

        // create selection
        $selection = array(
            'table'        =>   'JsonWebTokens',
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