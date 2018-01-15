<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Vat/VatInsertRow.php
 * 
 *  Last Revision:  26-01-2017
 * 
 *  Purpose: 
 *          this class inserts a row in the vat table
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

namespace MbAdmin\Database\Data\Vat;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Vat\VatCheckRowValues;
use MbAdmin\Database\Data\TableUpdate\TableUpdateDataController;

class VatInsertRow
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
    public function insertRow( $dataController, $values ){
        
        // create check row values controller
        $rowValuesController = new VatCheckRowValues( $this->debugger );
        // call check row values
        $checkRowValuesResult = $rowValuesController->checkRowValues( $dataController, null, $values, false );
        // check row values result
        if( isset( $checkRowValuesResult['error'] ) || isset( $checkRowValuesResult['criticalError'] ) ){
            // done with row values error
            return $checkRowValuesResult;
        }
        // done check row values

        // get timpStamp
        $timeStamp = $dataController->getTimeStamp();

        // get selection    
        $selection = $this->getSelection( $values, $timeStamp );

        // create result
        $result = [];
        
        $insertResult = $dataController->insert( $selection );
        // insert
        if( !$insertResult ){
            // set critical error
            $result['criticalError'] = 'insertFailed';
            // done error
            return $result;
        }
        // done insert
        
        // add id to result
        $result['id'] = $insertResult['insertId'];
        // add updated to result
        $result['updated'] = $timeStamp;
        // add used to result
        $result['used'] = $timeStamp;

        // create table update controller    
        $tableUpdateController = new TableUpdateDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // update table updated value
        $tableUpdateController->setLastUpdate( 'vat', $timeStamp );
        
        // done
        return $result;
        
    }
    private function getSelection( $values, $timeStamp ) {
        // set update value
        $values['updated'] = $timeStamp;
        // set used value
        $values['used'] = $timeStamp;
        
        // create selection
        $selection = array(
            'table'        =>  'vat', 
            'columns'      => array(),
            'values'       => array() 
        );
        // done create selection 
        
        // set selection columns and values
        foreach( $values as $column => $value ){
            // set column
            array_push( $selection['columns'], $column );
            // set value
            array_push( $selection['values'], $value );
        }        
        // done set selection columns and values
        
        // done return selection
        return $selection;
        
    }
}