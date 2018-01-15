<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesCheckOverlap.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class checks if the odometer values of a ride overlaps with
 *          another ride of the same vehicle on update or insert of data in the rides table
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

namespace MbAdmin\Database\Data\Rides;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Rides\RidesCheckStartOverlap;
use MbAdmin\Database\Data\Rides\RidesCheckEndOverlap;
use MbAdmin\Database\Data\Rides\RidesCheckStartAndEndOverlap;

class RidesCheckOverlap
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkOverlap( $dataController, $id, $values, $isUpdate ){
        // create odometer start overlap controller
        $checkStartOverlapController = new RidesCheckStartOverlap( $this->debugger );
        // check odometer start overlap
        $startOverlapResult = $checkStartOverlapController->checkStartOverlap( $dataController, $id, $values, $isUpdate );
        
        // check result
        if( isset( $startOverlapResult['error'] ) || isset( $startOverlapResult['criticalError'] ) ){
            // done with error
            return $startOverlapResult;
        }
        // done check result
        
        // create odometer end overlap controller
        $checkEndOverlapController = new RidesCheckEndOverlap( $this->debugger );
        // check odometer end overlap
        $endOverlapResult = $checkEndOverlapController->checkEndOverlap( $dataController, $id, $values, $isUpdate );
        
        // check result
        if( isset( $endOverlapResult['error'] ) || isset( $endOverlapResult['criticalError'] ) ){
            // done with error
            return $endOverlapResult;
        }
        // done check result
        
        // create odometer check start and end overlap controller
        $checkStartAndEndOverlapController = new RidesCheckStartAndEndOverlap( $this->debugger );
        // check odometer start and end overlap
        $startAndEndOverlapResult = $checkStartAndEndOverlapController->checkStartAndEndOverlap( $dataController, $id, $values, $isUpdate );
        
        // check result
        if( isset( $startAndEndOverlapResult['error'] ) || isset( $startAndEndOverlapResult['criticalError'] ) ){
            // done with error
            return $startAndEndOverlapResult;
        }
        // done check result
        
        // done 
        return [];
    }
}