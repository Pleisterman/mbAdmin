<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the documents table
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
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\Documents\DocumentsGetLastUsed;
use MbAdmin\Database\Data\Documents\DocumentsGetSelectData;
use MbAdmin\Database\Data\Documents\DocumentsGetContent;
use MbAdmin\Database\Data\Documents\DocumentsUpdateName;
use MbAdmin\Database\Data\Documents\DocumentsUpdateFileValues;
use MbAdmin\Database\Data\Documents\DocumentsInsertRow;
use MbAdmin\Database\Data\Documents\DocumentsDeleteDocument;

class DocumentsDataController extends MbCommonDataController   
{
    private $fileOptions = array(
        'fileName'  =>  'data/data.db'
    ); 
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store user directory
        $this->workDirectory = $workDirectory;
        // add user directory to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }        
    public function get( $what, $selection = null, $lastUpdated = null ){
        // debug info
        $this->debugger->logInformation( 'DocumentsDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // update vehicle used
                $this->updateUsed( 'documents', $selection );

                // parent handles get row by id
                return $this->getRowById( 'documents', $selection );
            }
            case 'lastUsed': {
                // create get last used controller
                $controller = new DocumentsGetLastUsed( $this->debugger );
                // done call get last used
                return $controller->getLastUsed( $this );
            }
            case 'selectData': {
                // create get select data controller
                $controller = new DocumentsGetSelectData( $this->debugger );
                // done call get select data
                return $controller->getSelectData( $this, $selection );
            }
            case 'documentContent': {
                // create document get content controller
                $controller = new DocumentsGetContent( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call get content
                return $controller->getContent( $this, $selection );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error DocumentsDataController get, what not found: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
    public function insertData( $values ){
        // create insert row controller
        $controller = new DocumentsInsertRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done call insert row
        return $controller->insertRow( $this, $values );
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'DocumentsDataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'name': {
                // create update name controller
                $controller = new DocumentsUpdateName( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call update name
                return $controller->updateName( $this, $id, $values );
            }
            case 'delete': {
                // create delete controller
                $controller = new DocumentsDeleteDocument( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call delete
                return $controller->deleteDocument( $this, $id );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'DocumentsDataController update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
    public function updateFileValues( $id, $values ){
        // create update file values controller
        $controller = new DocumentsUpdateFileValues( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done call update file values
        return $controller->updateFileValues( $this, $id, $values );
    }
}