<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesGetDayList.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with the a list of rides on a given 
 *          date from the rides table
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
use MbAdmin\Database\Data\Rides\RidesCreateListText;

class RidesGetDayList
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getDayList( $dataController, $options ){
        // debug info
        $this->debugger->logInformation( 'RidesGetDayList date: ' . $options['date'] );
        
        // create selection
        $selection = $this->getSelection( $options['date'] );

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
            $textController = new RidesCreateListText( $this->debugger );
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
                'rides' => 'a',
                'vehicles'  => 'b'
            ),
            'columns'       => array( 
                'a.id', 
                'b.name', 
                'b.identification', 
                'a.vehicleId', 
                'a.date', 
                'a.description',
                'a.fromDescription',
                'a.toDescription',
                'a.odometerStart',
                'a.odometerEnd'
            ),
            'relations' => array(
                'a.vehicleId = b.id'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.date',
                    'value' => $date,
                    'compare' => '='
                )
            ),
            'order' =>  'odometerEnd DESC'
        );
        // done create selection 

        // done
        return $selection;
    }
}