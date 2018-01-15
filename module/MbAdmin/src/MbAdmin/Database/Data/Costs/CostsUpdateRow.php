<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Costs/CostsUpdateRow.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates a row in the costs table
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

namespace MbAdmin\Database\Data\Costs;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Costs\CostsCheckRowValues;

class CostsUpdateRow
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
        $this->debugger->logInformation( 'CostsUpdateRow update id: ' . $id );
    
        // create check row values controller
        $rowValuesController = new CostsCheckRowValues( $this->debugger );
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

        // update project table
        $dataController->updateUsed( 'projects', $values['projectId'] );
        
        // add udate and used to result
        $result['updated'] = $timeStamp;
        $result['used'] = $timeStamp;
        // add udate and used to result

        return $result;
    }
    private function getSelection( $id, $values, $timeStamp ) {

        // create selection
        $selection = array(
            'table'        =>  'costs',
            'columns'       => array( 
                'projectId',
                'vatId',
                'description',
                'longDescription',
                'date',
                'price',
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
                $values['projectId'],
                $values['vatId'],
                $values['description'],
                $values['longDescription'],
                $values['date'],
                $values['price'],
                $timeStamp,
                $timeStamp,
                $id
            )
        );
        // done create selection 

        // done return selection
        return $selection;
    }
}