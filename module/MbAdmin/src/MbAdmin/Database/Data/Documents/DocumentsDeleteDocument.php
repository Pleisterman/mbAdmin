<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsDeleteDocument.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class sets the delete field of a document in the documents table
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

namespace MbAdmin\Database\Data\Documents;

use Common\Service\Debugger;
use MbAdmin\Database\Data\TableUpdate\TableUpdateDataController;

class DocumentsDeleteDocument
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $workDirectory = null;
    private $configId = null;
    private $config = array( 
        'dataDir'              => 'data/mbAdmin/'
    );
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

        // get config values
        $this->getConfig();

        $this->config['documentsDir'] = $this->config['dataDir'] . 'data/' . $this->workDirectory . '/documents/';

    }        
    public function deleteDocument( $dataController, $id ){
        // debug info
        $this->debugger->LogInformation( 'DocumentsDeleteDocument delete id: ' . $id );
        
        // check and get current row
        $currentRow = $this->checkAndGetCurrentRow( $dataController, $id );
        
        // check currentRow
        if( isset( $currentRow['criticalError'] ) || isset( $currentRow['error'] ) ){
            // done with error
            return $currentRow;
        } 
        // done currentRow
        
        // delete row
        $deleteResult = $this->deleteRow( $dataController, $id );
        // check deleteResult
        if( isset( $deleteResult['criticalError'] ) || isset( $deleteResult['error'] ) ){
            // done with error
            return $deleteResult;
        } 
        // done check deleteResult

        // delete file
        $file = $this->config['documentsDir'] . $currentRow['data']['fileName'];
        unlink( $file );
        // done delete file
        
        // update documents used
        $tableUpdateController = new TableUpdateDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        $tableUpdateController->setLastUpdate( 'documents', $dataController->getTimeStamp() );
        // update documents used

        // done 
        return [];
    }
    private function checkAndGetCurrentRow( $dataController, $id ){
        
        // create result
        $result = [];

        // call get current row
        $currentRow = $dataController->getRowById( 'documents', $id );

        // no row
        if( !$currentRow  ){
            // debug info
            $this->debugger->LogInformation( 'Error DocumentsDeleteDocument no current row. For id: ' . $id );
            // add error
            $result['criticalError'] = 'dataConnectionFailed';
            // done with error
            return $result;
        }
        // done no row
     
        // already deleted
        if( $currentRow['data']['deleted'] != 'false' ){
            // add error
            $result['error'] = 'documentAlreadyDeleted';
            // done with error
            return $result;
        }
        // done already deleted
        
        // done
        return $currentRow;
    }
    private function deleteRow( $dataController, $id ) {
        
        // get selection
        $selection = $this->getSelection( $dataController, $id );
        
        // create result
        $result = [];
        
        // update
        if( !$dataController->update( $selection ) ){
            // set critical error
            $result['criticalError'] = 'updateFailed';
            // done with error
            return $result;
        }
        // done update
        
        // done 
        return $result;
    }
    private function getSelection( $dataController, $id ) {
        // create time stamp
        $timeStamp = $dataController->getTimeStamp();

        // create selection
        $selection = array(
            'table'        =>  'documents',
            'columns'       => array( 
                'deleted'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'id',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $timeStamp,
                $id
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
    private function getConfig( ){
        // read the configuration
        $config = $this->serviceLocator->get( 'config' )[$this->configId];
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
    }
}