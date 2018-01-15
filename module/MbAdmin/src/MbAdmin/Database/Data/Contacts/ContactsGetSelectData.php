<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Contacts/ContactsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with a list of 'open' contacts
 *          including a selected row even if that row is closed
 *          for dropdown lists
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

namespace MbAdmin\Database\Data\Contacts;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Contacts\ContactsGetRowById;
use MbAdmin\Database\Data\Contacts\ContactsGetList;

class ContactsGetSelectData
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
        // set members
        $this->debugger = $debugger;
        $this->serviceLocator = $serviceLocator;
        // done set members
    }        
    public function getSelectData( $dataController, $id, $lastUpdated ){
        // debug info
        $this->debugger->logInformation( 'ContactsGetSelectData id: ' . $id );
        
        // create get list ontroller
        $getListController = new ContactsGetList( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );

        // create result
        $result = array(
            'open'          =>  $getListController->getList( $dataController, 'open', $lastUpdated ),
            'selectedRow'   =>  $this->getCurrentRow( $dataController, $id )
        );
        // done create result
        
        // done
        return $result;
    }
    private function getCurrentRow( $dataController, $id ) {

        // id exists
        if( $id ){
            // create get row controller
            $rowByIdController = new ContactsGetRowById( $this->debugger );
            // call get row 
            $currentRow = $rowByIdController->getRowById( $dataController, $id );
            
            // create result
            $result['selectedRow'] = array(
                'id'    => $currentRow['data']['id'],
                'text'  => $currentRow['data']['name']
            );
            // done create result
            
            // done 
            return $result;
        }
        // done id exists
        
        // done
        return null;
    }
}