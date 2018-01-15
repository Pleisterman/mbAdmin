<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsUpdateFileValues.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class updates a file values of a document in the documents table
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

namespace MbAdmin\Database\Data\Documents;

use Common\Service\Debugger;
use MbAdmin\Database\Data\TableUpdate\TableUpdateDataController;

class DocumentsUpdateFileValues
{
    private $debugger = null; 
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
    public function updateFileValues( $dataController, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'DocumentsUpdateFileValues update id: ' . $id );

        // get selection    
        $selection = $this->getSelection( $id, $values );

        // create result
        $result = [];

        // update
        if( !$dataController->update( $selection ) ){
            // set critical error
            $result['criticalError'] = 'updateFailed';
            // done error
            return $result;
        }
        // done update
        
        // update update table
        $tableUpdateController = new TableUpdateDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        $tableUpdateController->setLastUpdate( 'documents', $id );
        // done update update table

        // done 
        return $result;
    }
    private function getSelection( $id, $values ) {
        
        // create selection values
        $selection = array(
            'table'        =>  'documents',
            'columns'       => array( 
                'fileName',
                'originalFileName'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'id',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $values['fileName'],
                $values['originalFileName'],
                $id
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}