<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Contacts/ContactsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the contacts table
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

namespace MbAdmin\Database\Data\Contacts;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\Contacts\ContactsGetLastUsed;
use MbAdmin\Database\Data\Contacts\ContactsGetList;
use MbAdmin\Database\Data\Contacts\ContactsGetSelectData;
use MbAdmin\Database\Data\Contacts\ContactsInsertRow;
use MbAdmin\Database\Data\Contacts\ContactsUpdateRow;

class ContactsDataController extends MbCommonDataController  
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
        $this->debugger->logInformation( 'ContactsDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // update contact used
                $this->updateUsed( 'contacts', $selection );

                // parent handles get row by id
                return $this->getRowById( 'contacts', $selection );
            }
            case 'lastUsed': {
                // create get last used controller
                $controller = new ContactsGetLastUsed( $this->debugger );
                // done call get last used
                return $controller->getLastUsed( $this );
            }
            case 'list': {
                // create get list controller
                $controller = new ContactsGetList( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call get list
                return $controller->getList( $this, $selection, $lastUpdated );
            }
            case 'selectData': {
                // create get select data controller
                $controller = new ContactsGetSelectData( $this->configId, $this->serviceLocator, $this->debugger );
                // done call get select data
                return $controller->getSelectData( $this, $selection, $lastUpdated );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error ContactsDataController get, what not found: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
    public function insertData( $values ){
        // create insert row controller
        $controller = new ContactsInsertRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done call insert row
        return $controller->insertRow( $this, $values );
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'ContactsDataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // create update row controller
                $controller = new ContactsUpdateRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call update row
                return $controller->updateRow( $this, $id, $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'ContactsDataController update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
}