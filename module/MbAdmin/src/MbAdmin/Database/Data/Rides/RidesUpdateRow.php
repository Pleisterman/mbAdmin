<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesUpdateRow.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class updates a row in the rides table
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

namespace MbAdmin\Database\Data\Rides;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Rides\RidesCheckRowValues;

class RidesUpdateRow
{
    private $debugger = null; 
    private $serviceLocator = null; 
    
    public function __construct( $serviceLocator, Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        $this->serviceLocator = $serviceLocator;
        // done set members
    }        
    public function updateRow( $dataController, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'RidesUpdateRow update id: ' . $id );
    
        // create check row values controller
        $rowValuesController = new RidesCheckRowValues( $this->debugger );
        // call check row values
        $checkRowValuesResult = $rowValuesController->checkRowValues( $dataController, $id, $values, true );
    
        // check row values result
        if( isset( $checkRowValuesResult['error'] ) || isset( $checkRowValuesResult['criticalError'] ) ){
            // done with error
            return $checkRowValuesResult;
        }
        // done check row values

        // get timpStamp
        $timeStamp = $dataController->getTimeStamp();

        // get selection    
        $selection = $this->getSelection( $id, $values, $timeStamp );
        
        // update
        if( !$dataController->update( $selection ) ){
            // set critical error
            $result['criticalError'] = 'updateFailed';
            // done error
            return $result;
        }
        // done update

        // update project in project table
        $dataController->updateUsed( 'projects', $values['projectId'] );

        // update vehicle in vehicles table
        $dataController->updateUsed( 'vehicles', $values['vehicleId'] );
        
        // add udate and used to result
        $result['updated'] = $timeStamp;
        $result['used'] = $timeStamp;
        // add udate and used to result
        
        return $result;
    }
    private function getSelection( $id, $values, $timeStamp ) {

        // create selection 
        $selection = array(
            'table'        =>  'rides',
            'columns'       => array( 
                'vehicleId', 
                'projectId',
                'description',
                'date',
                'fromDescription',
                'toDescription',
                'odometerStart',
                'odometerEnd',
                'used',
                'updated'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'id',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $values['vehicleId'],
                $values['projectId'],
                $values['description'],
                $values['date'],
                $values['fromDescription'],
                $values['toDescription'],
                $values['odometerStart'],
                $values['odometerEnd'],
                $timeStamp,
                $timeStamp,
                $id
            )
        );
        // done create selection 

        // done 
        return $selection;
    }
}