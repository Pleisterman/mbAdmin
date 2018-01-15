<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/TableUpdate/TableUpdateGetLastUpdate.php
 * 
 *  Last Revision:   16-01-2017
 * 
 *  Purpose: 
 *          this class gets the last update dateTime from the table
 *          tableUpdate for a given table name 
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

namespace MbAdmin\Database\Data\TableUpdate;

use Common\Service\Debugger;

class TableUpdateGetLastUpdate
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLastUpdate( $dataController, $tableName ){
        
        // get selection    
        $selection = $this->getSelection( $tableName );

        // select
        $row = $dataController->select( $selection );  
        
        // create updated return value
        $updated = null;

        // check result
        if( $row && isset( $row[0] ) ){
            $updated = $row[0]['updated'];
        }
        else {
            $this->debugger->LogInformation( 'Error TableUpdateGetLastUpdate row not found tableName: ' . $tableName );
        }
        // done check result

        // done 
        return $updated;
    }
    private function getSelection( $tableName ) {
    
        // create selection
        $selection = array(
            'tables'        => array( 
                'tableUpdates' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.updated'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'tableName',
                    'value' => $tableName,
                    'compare' => '='
                )
            ),
        );
        // done create selection 
    
        // done
        return $selection;
    }
}