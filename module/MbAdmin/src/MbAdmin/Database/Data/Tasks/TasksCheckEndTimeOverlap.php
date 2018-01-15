<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tasks/TasksCheckEndTimeOverlap.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class checks if the end time of a task overlaps with
 *          another task on update or insert of data in the task table
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

namespace MbAdmin\Database\Data\Tasks;

use Common\Service\Debugger;

class TasksCheckEndTimeOverlap
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkEndTimeOverlap( $dataController, $id, $values, $isUpdate ){
        // create result
        $result = [];

         // get selection    
        $selection = $this->getSelection( $id, $values, $isUpdate );

        // select
        $row = $dataController->select( $selection );        

        // check row
        if( $row && isset( $row[0] ) ){
            // debug info
            $this->debugger->LogInformation( 'TasksCheckEndTimeOverlap count: ' . $row[0]['count'] );
            // found records
            if( $row[0]['count'] > 0 ){
                // add error to result
                $result['error'] = 'timeExists'; 
            }
            // done found records
        }
        // done check row
        
        // done
        return $result;
    }
    private function getSelection( $id, $values, $isUpdate ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'tasks' => 'a'
            ),
            'columns'       => array( 
                'count() as count'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.date',
                    'value' => $values['date'],
                    'compare' => '='
                ),
                array(
                    'link'      => true,
                    'compare'   => 'AND',
                    'selection' => array(
                        array(   
                            'what' => 'a.endTime',
                            'value' => $values['startTime'],
                            'compare' => '>'
                        ),
                        array(   
                            'what' => 'a.endTime',
                            'value' => $values['endTime'],
                            'compare' => '<='
                        )
                    )
                )
            )
        );       
        // done create selection
        
        // is update
        if( $isUpdate ){
            // create update clause
            $idClause = array(   
                'what' => 'a.id',
                'value' => $id,
                'compare' => '<>'
            );
            // done create update clause
            
            // add clause to selection
            array_push( $selection['whereClauses'], $idClause );
        }
        // done is update

        // done 
        return $selection;
    }
}