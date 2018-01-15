<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\JsonWebTokens\JsonWebTokensDeleteRowById.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class deletes a row from the requests table
 *          according to a given id 
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

namespace MbCommon\Database\Security\Authentification\JsonWebTokens;

use Common\Service\Debugger;

class JsonWebTokensDeleteRowById
{
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members

    }        
    public function deleteRow( $dataController, $id ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensDeleteRow id: ' . $id );
        
        // get selection
        $selection = $this->getSelection( $id );
        
        // delete
        if( !$dataController->delete( $selection ) ){
            // done with error
            return array( 'criticalError' => 'deleteFailed' );
        }
        // done delete
        
        // done 
        return [];
    }
    private function getSelection( $id ) {

        // create selection
        $selection = array(
            'table'        =>   'JsonWebTokens',
            'whereClauses' => array(
                array (
                    'what' => 'id',
                    'value' => '?',
                    'compare' => '='
                )
            ),
            'values'    => array(
                $id
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}