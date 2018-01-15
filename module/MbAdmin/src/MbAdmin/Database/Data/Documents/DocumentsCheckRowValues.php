<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsCheckRowValues.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class checks row values before updating or inserting data
 *          checks:
 *          data out of date
 *          document already deleted
 *          name unique
 *          name empty
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

namespace MbAdmin\Database\Data\Documents;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Documents\DocumentsCheckNameUnique;

class DocumentsCheckRowValues
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkRowValues( $dataController, $id, $values, $isUpdate ){
        // is update check existing data
        if( $isUpdate ){
            // get current data from database
            $currentRow = $dataController->getRowById( 'documents', $id );
            if( isset( $currentRow['criticalError'] ) || !$currentRow  ){
                $result = [];
                $this->debugger->LogInformation( 'Error DocumentsCheckRowValues no current row. For id: ' . $id );
                $result['criticalError'] = 'dataConnectionFailed';
                return $result;
            }
            // done get current data from database
        
            // check if document is deleted
            if( $isUpdate && $currentRow['data']['deleted'] != 'false' ){
                $result = [];
                $result['error'] = 'documentAlreadyDeleted';
                return $result;
            }
            // done check if document is deleted
            
            // check data out of date
            if( $currentRow['data']['updated'] != $values['updated'] ){
                $result = [];
                $this->debugger->LogInformation( 'DocumentsCheckRowValues update, dataOutOfDate.' );
                $result['error'] = 'dataOutOfDate';
                return $result;
            }
            // done check data out of date
            
        }
        // done is update check existing data

        // check name is empty
        if( $this->nameIsEmpty( $values['name'] ) ){
            // add nameEmpty error
            $result['error'] = 'nameEmpty';
            // done 
            return $result;
            
        }
        // done check name is empty
        
        // create check name unique class
        $checkNameUniqueController = new DocumentsCheckNameUnique( $this->debugger );
        // done
        return $checkNameUniqueController->checkNameUnique( $dataController, $id, $values['name'], $values['subject'], $values['subjectId'], $isUpdate );
        
    }
    private function nameIsEmpty( $name ) {
        // trim name
        $trimmedName = trim( $name );
        
        // check empty
        if( empty( $trimmedName )  ){
            // done 
            return true;
        }
        
        // done 
        return false;
    }
}