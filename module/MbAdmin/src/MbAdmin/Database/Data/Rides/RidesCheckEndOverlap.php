<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesCheckEndOverlap.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class checks if the odometer end value of a ride overlaps with
 *          another ride of the same vehicle on update or insert of data in the rides table
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

class RidesCheckEndOverlap
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkEndOverlap( $dataController, $id, $values, $isUpdate ){

         // get selection    
        $selection = $this->getSelection( $id, $values, $isUpdate );
        
        // create result
        $result = [];
        
        // select
        $row = $dataController->select( $selection );        
        
        // check row
        if( $row && isset( $row[0] ) ){
            // found records
            if( $row[0]['count'] > 0 ){
                // add error to result
                $result['error'] = 'odometerConflict'; 
            }
            // done found records
        }
        // done check row
        
        // done
        return $result;
    }
    private function getSelection( $id, $values, $isUpdate ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'rides' => 'a'
            ),
            'columns'       => array( 
                'count() as count'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.vehicleId',
                    'value' => $values['vehicleId'],
                    'compare' => '='
                ),
                array(
                    'link'      => true,
                    'compare'   => 'AND',
                    'selection' => array(
                        array(   
                            'what' => 'a.odometerEnd',
                            'value' => $values['odometerStart'],
                            'compare' => '>'
                        ),
                        array(   
                            'what' => 'a.odometerEnd',
                            'value' => $values['odometerEnd'],
                            'compare' => '<='
                        )
                    )
                )
            )
        );       
        // done create selection
        
        // is update
        if( $isUpdate ){
            // create update clause
            $idClause = array(   
                'what' => 'a.id',
                'value' => $id,
                'compare' => '<>'
            );
            // done create update clause
            
            // add clause to selection
            array_push( $selection['whereClauses'], $idClause );
        }
        // done is update

        // done 
        return $selection;
    }
}