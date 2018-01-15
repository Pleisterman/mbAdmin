<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tasks/TasksCheckTime.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class checks the time values of a task on update or insert
 *          checks:
 *          provided value is valid time value
 *          start < end
 *          overlap with existing tasks
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
use MbAdmin\Database\Data\Tasks\TasksCheckStartTimeOverlap;
use MbAdmin\Database\Data\Tasks\TasksCheckEndTimeOverlap;

class TasksCheckTime
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkTime( $dataController, $id, $values, $isUpdate ){
        
        // check time value
        $checkTimeValueResult = $this->checkTimeValue( $values );
        
        // check time value result
        if( isset( $checkTimeValueResult['error'] ) ){
            // done with error
            return $checkTimeValueResult;
        } 
        // done check time value result
        
        // done call check overlap
        return $this->checkOverlap( $dataController, $id, $values, $isUpdate );
    }
    private function checkTimeValue( $values ){
        $result = [];

        // create time values
        $startHours = (int) substr ( $values['startTime'], 0 , 2 ); 
        $startMinutes = (int) substr ( $values['startTime'], 2 , 2 ); 
        $endHours = (int) substr ( $values['endTime'], 0 , 2 ); 
        $endMinutes = (int) substr ( $values['endTime'], 2 , 2 ); 
        // done create time values
        
        // check values
        if( $startHours < 0 || $startHours > 23 ){
            // add error
            $result['error'] = 'startTimeInvalid';
            // done with error
            return $result;
        }
        if( $startMinutes < 0 || $startMinutes > 59 ){
            // add error
            $result['error'] = 'startTimeInvalid';
            // done with error
            return $result;
        }
        if( $endHours < 0 || $endHours > 23 ){
            // add error
            $result['error'] = 'endTimeInvalid';
            // done with error
            return $result;
        }
        if( $endMinutes < 0 || $endMinutes > 59 ){
            // add error
            $result['error'] = 'endTimeInvalid';
            // done with error
            return $result;
        }
        // done check values

        // done 
        return $result;
    }
    private function checkOverlap( $dataController, $id, $values, $isUpdate ){
        // create check start time overlap controller
        $checkStartTimeOverlapController = new TasksCheckStartTimeOverlap( $this->debugger );
        // check overlap
        $result = $checkStartTimeOverlapController->checkStartTimeOverlap( $dataController, $id, $values, $isUpdate );
        // check result
        if( isset( $result['error'] ) || isset( $result['criticalError'] ) ){
            // done with error
            return $result;
        }
        // done check result
        
        // create check start time overlap controller
        $checkEndTimeOverlapController = new TasksCheckEndTimeOverlap( $this->debugger );
        // done call check start time overlap controller
        return $checkEndTimeOverlapController->checkEndTimeOverlap( $dataController, $id, $values, $isUpdate );
    }
}