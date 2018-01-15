<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Vehicles/VehiclesGetLastUsed.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class gets a list of vehicles from the vehicles table
 *          with a limited size and ordered according to the used field
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

namespace MbAdmin\Database\Data\Vehicles;

use Common\Service\Debugger;

class VehiclesGetLastUsed
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLastUsed( $dataController ){
        // debug info
        // debug info
        $this->debugger->logInformation( 'VehiclesGetLastUsed getLastUsed' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $rows = $dataController->select( $selection );        

        // create result
        $result = array(
            'rows'  => []
        );
        
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
    private function getSelection( ) {
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
            'limit' => '5',
            'order' => ' used DESC'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}