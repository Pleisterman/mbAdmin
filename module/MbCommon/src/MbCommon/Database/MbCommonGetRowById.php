<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\MbCommonGetRowById.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class returns the row according to a specified id from a speicified table.
 *                      
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 * 
 *  Zend Framework (http://framework.zend.com/)
 *
 *  @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 *  @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace MbCommon\Database;

use Common\Service\Debugger;

class MbCommonGetRowById
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getRowById( $dataController, $table, $id ){
        // debug info
        $this->debugger->logInformation( 'MbCommonGetRowById table: ' . $table . ' id: ' . $id );

        // create selection
        $selection = $this->getSelection( $table, $id );

        // select
        $row = $dataController->select( $selection );        

        // create result
        $result = [];

        // check row exists
        if( $row && isset( $row[0] ) ){
            // set data
            $result['data'] = $row[0];
        }
        // done check rows exists

        // done 
        return $result;
    }
    private function getSelection( $table, $id ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                $table => 'a'
            ),
            'columns'       => array( 
                'a.*'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.id',
                    'value' => $id,
                    'compare' => '='
                )
            ),
            'limit' => '1'
        );
        // done create selection 

        // done
        return $selection;
    }    
}