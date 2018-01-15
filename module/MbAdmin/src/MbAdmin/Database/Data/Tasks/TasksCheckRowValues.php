<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tasks/TasksCheckRowValues.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class checks row values before updating or inserting data
 *          checks:
 *          data out of date
 *          name empty
 *          time values
 *          time overlap with existing tasks
 *          time within project open period
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
use MbAdmin\Database\Data\Tasks\TasksCheckTime;

class TasksCheckRowValues
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkRowValues( $dataController, $id, $values, $isUpdate ){
        // is update check existing data
        if( $isUpdate ){
            // get current data from database
            $currentRow = $dataController->getRowById( 'tasks', $id );
            if( isset( $currentRow['criticalError'] ) || !$currentRow  ){
                $result = [];
                $this->debugger->LogInformation( 'Error TasksCheckRowValues no current row. For id: ' . $id );
                $result['criticalError'] = 'dataConnectionFailed';
                return $result;
            }
            // done get current data from database
        
            // check data out of date
            if( $currentRow['data']['updated'] != $values['updated'] ){
                $result = [];
                $this->debugger->LogInformation( 'TasksCheckRowValues row, dataOutOfDate.' );
                $result['error'] = 'dataOutOfDate';
                return $result;
            }
            // done check data out of date
        }
        // done is update check existing data

        // create check time class
        $checkTimeController = new TasksCheckTime( $this->debugger );
        // done
        return $checkTimeController->checkTime( $dataController, $id, $values, $isUpdate );
        
    }
}