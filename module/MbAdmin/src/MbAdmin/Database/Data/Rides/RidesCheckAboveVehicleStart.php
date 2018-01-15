<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesCheckAboveVehicleStart.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class checks if the odometer start value of a ride is above the 
 *          odometer start value of the vehicle
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

namespace MbAdmin\Database\Data\Rides;

use Common\Service\Debugger;

class RidesCheckAboveVehicleStart
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkAboveVehicleStart( $dataController, $values ){
         // get selection    
        $selection = $this->getSelection( $values['vehicleId'] );

        // select
        $row = $dataController->select( $selection );        

        // set int values
        $vehicleStart = intval( $row[0]['odometerStart'] );
        $rideStart = intval( $values['odometerStart'] );
        // done set int values

        // create result
        $result = [];

        // error vahicle start < rideStart
        if( $vehicleStart > $rideStart ){
            // debug info
            $this->debugger->LogInformation( 'ride odometerStartBeforeVehicleOdometerStart' );
            // add error to result
            $result['error'] = 'odometerStartBeforeVehicleOdometerStart';
        }
        // done error vahicle start < rideStart
        
        // done 
        return $result;
    }
    private function getSelection( $vehicleId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'vehicles' => 'a'
            ),
            'columns'       => array( 
                'a.odometerStart'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.id',
                    'value' => $vehicleId,
                    'compare' => '='
                )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}