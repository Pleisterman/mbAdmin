<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Vehicles/VehiclesUpdateRow.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 *
 *  Purpose: 
 *          this class updates a row in the vehioles table
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

namespace MbAdmin\Database\Data\Vehicles;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Vehicles\VehiclesCheckRowValues;
use MbAdmin\Database\Data\TableUpdate\TableUpdateDataController;

class VehiclesUpdateRow
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $workDirectory = null;
    private $configId = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store user directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;
    }        
    public function updateRow( $dataController, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'VehiclesUpdateRow update id: ' . $id );
    
        // create check row values controller
        $rowValuesController = new VehiclesCheckRowValues( $this->debugger );
        // call check row values
        $checkRowValuesResult = $rowValuesController->checkRowValues( $dataController, $id, $values, true );
        // check row values result
        if( isset( $checkRowValuesResult['error'] ) || isset( $checkRowValuesResult['criticalError'] ) ){
            // done with row values error
            return $checkRowValuesResult;
        }
        // done check row values
        
        // get timpStamp
        $timeStamp = $dataController->getTimeStamp();

        // get selection    
        $selection = $this->getSelection( $id, $values, $timeStamp );
        
        // create result
        $result = [];

        // update
        if( !$dataController->update( $selection ) ){
            // set critical error
            $result['criticalError'] = 'updateFailed';
            // done error
            return $result;
        }
        // done update

        // add udate and used to result
        $result['updated'] = $timeStamp;
        $result['used'] = $timeStamp;
        // add udate and used to result

        // update update table
        $tableUpdateController = new TableUpdateDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        $tableUpdateController->setLastUpdate( 'vehicles', $timeStamp );
        // done update update table
        
        // done 
        return $result;
    }
    private function getSelection( $id, $values, $timeStamp ) {
        
        // create selection values
        $selection = array(
            'table'        =>  'vehicles',
            'columns'       => array( 
                'contactId', 
                'name', 
                'description', 
                'identification', 
                'odometerStart',
                'opened', 
                'closed', 
                'updated',
                'used'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'id',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $values['contactId'],
                $values['name'],
                $values['description'],
                $values['identification'],
                $values['odometerStart'],
                $values['opened'],
                $values['closed'],
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