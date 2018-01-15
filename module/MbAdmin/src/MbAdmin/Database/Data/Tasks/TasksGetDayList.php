<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tasks/TasksGetDayList.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with the a list of tasks on a given 
 *          date from the tasks table
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

namespace MbAdmin\Database\Data\Tasks;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Tasks\TasksCreateListText;

class TasksGetDayList
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getDayList( $dataController, $date ){
        // debug info
        $this->debugger->logInformation( 'TasksGetDayList date: ' . $date );
        
        // create selection
        $selection = $this->getSelection( $date );

        // create result
        $result = array(
          'rows'    => []  
        );
        // done create result

        // select
        $rows = $dataController->select( $selection );        
        // check rows result
        if( $rows ){
            // add rows to result
            for( $i = 0; $i < count( $rows ); $i++ ){
                array_push( $result['rows'], $rows[$i] );
            }
            // done add rows to result

            // create add text controller
            $textController = new TasksCreateListText( $this->debugger );
            // loop over rows
            for( $i = 0; $i < count( $result['rows'] ); $i++ ){
                // add text to result rows
                $textController->createListText( $result['rows'][$i] );
            }   
            // doen loop over rows
        }
        // done check rows result

        // done 
        return $result;
    }
    private function getSelection( $date ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'tasks' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.date', 
                'a.startTime', 
                'a.endTime', 
                'a.description'
            ),
            'whereClauses'  =>  array(
                array( 
                    'what' => 'a.date',
                    'value' => $date,
                    'compare' => '='
                )
            ),
            'order' => ' date, startTime'
        );
        // done create selection 
        
        // done
        return $selection;
    }
}