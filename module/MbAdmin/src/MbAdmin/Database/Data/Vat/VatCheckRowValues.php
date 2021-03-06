<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Vat/VatCheckRowValues.php
 * 
 *  Last Revision:  26-01-2017
 * 
 *  Purpose: 
 *          this class checks row values before updating or inserting data
 *          checks:
 *          data out of date
 *          name unique
 *          name empty
 *          closed before opened
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

namespace MbAdmin\Database\Data\Vat;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Vat\VatCheckUnique;

class VatCheckRowValues
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkRowValues( $dataController, $id, $values, $isUpdate ){
        // create result
        $result = [];

        // is update check existing data
        if( $isUpdate ){
            // get current data from database
            $currentRow = $dataController->getRowById( 'vat', $id );
            if( isset( $currentRow['criticalError'] ) || !$currentRow  ){
                $this->debugger->LogInformation( 'Error VatCheckRowValues no current row. For id: ' . $id );
                $result['criticalError'] = 'dataConnectionFailed';
                return $result;
            }
            // done get current data from database
        

            // check data out of date
            if( $currentRow['data']['updated'] != $values['updated'] ){
                $this->debugger->LogInformation( 'VatCheckRowValues dataOutOfDate row update: ' . $currentRow['data']['updated'] . ' values: ' . $values['updated']  );
                // create return array
                $result['error'] = 'dataOutOfDate';
                return $result;
            }
            // done check data out of date
        }
        // done is update check existing data


        // check description is empty
        if( $this->descriptionIsEmpty( $values['description'] ) ){
            // add nameEmpty error
            $result['error'] = 'descriptionEmpty';
            // done 
            return $result;
            
        }
        // done check name is empty
        
        // check closed before opened
        if( $this->closedBeforeOpened( $values['opened'], $values['closed'] ) ){
            // add closed before opened error
            $result['error'] = 'closedBeforeOpened';
            // done 
            return $result;
            
        }
        // done check closed before opened

        // create check name unique class
        $checkUniqueController = new VatCheckUnique($this->debugger );
        // done
        return $checkUniqueController->checkUnique( $dataController, $id, $values, $isUpdate );
        
    }
    private function descriptionIsEmpty( $description ) {
        // trim description
        $trimmedDescription = trim( $description );
        
        // check empty
        if( empty( $trimmedDescription )  ){
            // done 
            return true;
        }
        
        // done 
        return false;
    }
    private function closedBeforeOpened( $opened, $closed ) {
    
        if( $closed != 'false' ){
            if( (int) $closed < (int) $opened ){
                // debug info
                $this->debugger->LogInformation( 'closed<opened:');
                // done 
                return true;
            }
        }
        
        // done 
        return false;
    }    
}