<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/TableUpdate/TableUpdateSetLastUpdate.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class sets the last update dateTime from the table
 *          tableUpdate for a given table name 
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

namespace MbAdmin\Database\Data\TableUpdate;

use Common\Service\Debugger;

class TableUpdateSetLastUpdate
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function setLastUpdate( $dataController, $tableName, $updated ){
        
        // get selection    
        $selection = $this->getSelection( $tableName, $updated );

        // update
        $dataController->update( $selection );
    }
    private function getSelection( $tableName, $updated ) {

        // create selection
        $selection = array(
            'table'        =>  'tableUpdates',
            'columns'       => array( 
                'updated'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'tableName',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $updated,
                $tableName
            )
        );
        // done create selection 
    
        // done 
        return $selection;
    }
}