<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Vehicles/VehiclesGetList.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with 'open' vehicles or 'closed' vehicles
 *          an updated value is checked against the updated value in the
 *          table tableUpdates if the values are the same no rows are returned
 *          because the existing data is up to date
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

namespace MbAdmin\Database\Data\Vehicles;

use Common\Service\Debugger;
use MbAdmin\Database\Data\TableUpdate\TableUpdateDataController;

class VehiclesGetList
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
        // set member
        $this->debugger = $debugger;
        $this->serviceLocator = $serviceLocator;
    }        
    public function getList( $dataController, $which, $updated ){
        // debug info
        $this->debugger->logInformation( 'VehiclesGetList selection: ' . $which . ' lastUpdated: ' . $updated );
        
        // get is up to date
        $isUptoDateResult = $this->isUpToDate( $updated );

        // check up to date value
        if( $isUptoDateResult['upToDate'] ){
            // done data up to date 
            return $isUptoDateResult;
        }
        // done check up to date value
        
        // get selection
        $selection = $this->getSelection( $which );
        
        // select
        $rows = $dataController->select( $selection );        

        // create result
        $result = array( 
            'updateNeeded'  =>  true,
            'updated'       =>  $updated,
            'rows'          =>  []
        );
        // done create result
        
        // check rows exists
        if( $rows ){
            // set text
            for( $i = 0; $i < count( $rows ); $i++ ){
                $rows[$i]['text'] = $rows[$i]['name'] . ' ( ' . $rows[$i]['identification'] . ' )';
            }
            // done set text
            
            // set result rows
            $result['rows'] = $rows;
        }
        // done check rows exists

        // done 
        return $result;
    }
    private function isUpToDate( $updated ) {
        // create result
        $result = array( 
            'upToDate'  => false
        );
        // done create result
        
        // create get last update controller
        $tableUpdateController = new TableUpdateDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get last update
        $lastUpdate = $tableUpdateController->getLastUpdate( 'vehicles' );
            
        // check result
        if( $lastUpdate ){
            // lastUpdate = updated
            if( $updated == $lastUpdate ){
                // set up to date value
                $result['upToDate'] = true;
            }
            // done lastUpdate = updated
        }
        // done check result
        
        // done data up to date
        return $result;
    }
    private function getSelection( $which ) {
        
        // create selection 
        $selection = array(
            'tables'        => array( 
                'vehicles' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name', 
                'a.identification', 
                'a.opened', 
                'a.closed', 
                'a.used'
            ),
            'order' => 'name'
        );
        // done create selection 
        
        // which = open 
        if( $which == 'open' ){
            // add where clause
            $selection['whereClauses'] = array( 
                array(
                    'what' => 'a.closed',
                    'value' => 'false',
                    'compare' => '='
                )
            );
            // done add where clause
        }
        // done which = open 
        
        // which = closed 
        if( $which == 'closed' ){
            // add where clause
            $selection['whereClauses'] = array( 
                array(
                    'what' => 'a.closed',
                    'value' => 'false',
                    'compare' => '<>'
                )
            );
            // done add where clause
        }
        // done which = closed 
        
        // done 
        return $selection;
        
    }
}