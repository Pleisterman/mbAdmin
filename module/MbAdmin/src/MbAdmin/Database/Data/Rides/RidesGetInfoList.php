<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesGetInfoList.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with the a list of rides for a given 
 *          date from the rides table.
 *          The list contains:
 *          the ride directly before the rides of the given day
 *          the rides of the given day
 *          the ride directly after the rides of the given day
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
use MbAdmin\Database\Data\Rides\RidesCreateListText;
use MbAdmin\Database\Data\Rides\RidesInfoListGetPrevious;
use MbAdmin\Database\Data\Rides\RidesInfoListGetRidesOffDay;
use MbAdmin\Database\Data\Rides\RidesInfoListGetNext;

class RidesGetInfoList
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getInfoList( $dataController, $options ){
        // debug info
        $this->debugger->logInformation( 'RidesGetInfoList date: ' . $options['date'] . ' vehicle: ' . $options['vehicleId'] );
        
        // create result
        $result = array(
          'rows'    => []  
        );
        // done create result
        
        // create get previous controller
        $previousController = new RidesInfoListGetPrevious( $this->debugger );
        // call get previous
        $previousResult = $previousController->getPrevious( $dataController, $options['date'], $options['vehicleId'] );
        
        // check result
        if( $previousResult ){
            array_push( $result['rows'], $previousResult );
        }
        // done check result
        
        // create get day list controller
        $ridesOffDayController = new RidesInfoListGetRidesOffDay( $this->debugger );
        // get day list
        $dayResult = $ridesOffDayController->getRidesOffDay( $dataController, $options['date'], $options['vehicleId'] );
        // check result
        for( $i = 0; $i < count( $dayResult['rows'] ); $i++ ){
            // add rows to result
            array_push( $result['rows'], $dayResult['rows'][$i] );
        }
        // done check result
        
        // create get next controller
        $nextController = new RidesInfoListGetNext( $this->debugger );
        // get next
        $nextResult = $nextController->getNext( $dataController, $options['date'], $options['vehicleId'] );
        // check result
        if( $nextResult ){
            // add rows to result
            array_push( $result['rows'], $nextResult );
        }
        // done check result

        // create text controller
        $textController = new RidesCreateListText( $this->debugger );
        
        // loop over result rows
        for( $i = 0; $i < count( $result['rows'] ); $i++ ){
            // add rows to result
            $textController->createListText( $result['rows'][$i] );
        }   
        // done loop over result rows
        
        // done
        return $result;
    }
}