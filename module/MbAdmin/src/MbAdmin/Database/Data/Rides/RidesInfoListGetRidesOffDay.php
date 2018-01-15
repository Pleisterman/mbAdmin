<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesInfoListGetRidesOffDay.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class returns a list of rides of the given day
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

class RidesInfoListGetRidesOffDay
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $configId = 'timeAdministration'; 
    private $fileName = 'data/data.db'; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getRidesOffDay( $dataController, $date, $vehicleId ){
        // debug info
        $this->debugger->logInformation( 'RidesInfoListGetRidesOffDay date: ' . $date );

        // get selection    
        $selection = $this->getSelection( $date, $vehicleId );
        
        // select
        $rows = $dataController->select( $selection );        
        
        // create result
        $result = array( 
            'rows' => []
        );
        // done create result
       
        // if rows
        if( $rows ){
            // set result rows
            $result['rows'] = $rows;
        }
        // if rows
        
        // done
        return $result;
    }
    private function getSelection( $date, $vehicleId ) {
        
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
                ),
                array(
                    'what' => 'a.vehicleId',
                    'value' => $vehicleId,
                    'compare' => '='
                )
            ),
            'order' =>  'odometerEnd ASC'
        );
        // done create selection 
    
        // done 
        return $selection;
    }
}