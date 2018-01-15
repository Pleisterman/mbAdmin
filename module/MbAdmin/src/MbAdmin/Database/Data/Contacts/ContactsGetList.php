<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Contacts/ContactsGetList.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with 'open' contacts or 'closed' contacts
 *          an updated value is checked against the updated value in the
 *          table tableUpdates if the values are the same no rows are returned
 *          because the existing data is up to date
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
use MbAdmin\Database\Data\TableUpdate\TableUpdateDataController;

class ContactsGetList
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
    public function getList( $dataController, $which, $updated ){
        // debug info
        $this->debugger->logInformation( 'ContactsGetList which: ' . $which . ' updated: ' . $updated );
        
        // get is up to date
        $isUptoDateResult = $this->isUpToDate( $updated );
        
        // check up to date value
        if( $isUptoDateResult['upToDate'] ){
            // done data up to date 
            return $isUptoDateResult;
        }
        // done check up to date value
        
        // get selection
        $selection = $this->getSelection( $which );
        
        // select
        $rows = $dataController->select( $selection );        

        // create result
        $result = array( 
            'updateNeeded'  =>  true,
            'updated'       =>  $updated,
            'rows'          =>  []
        );
        // done create result
        
        // check rows exists
        if( $rows ){
            // add rows texts
            forEach( $rows as $row ) {
                
                
                // create result row
                $resultRow = array(
                    'id' => $row['id'],
                    'text' => $this->createListText( $row )
                );
                // done create result row
                
                // add result row to result
                array_push( $result['rows'], $resultRow );
            }

        }
        // done check rows exists

        // done 
        return $result;
    }
    public function createListText( &$row ){
        // create text
        if( $row['companyName'] != '' ){
             return $row['text'] . ' ( ' . $row['companyName'] . ')';
        }
        return $row['text'];
    }    
    private function isUpToDate( $updated ) {
        // create result
        $result = array( 
            'upToDate'  => false
        );
        // done create result
        
        // create get last update controller
        $tableUpdateController = new TableUpdateDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get last update
        $lastUpdate = $tableUpdateController->getLastUpdate( 'contacts' );

        // check result
        if( $lastUpdate ){
            // lastUpdate = updated
            if( $updated == $lastUpdate ){
                // set up to date value
                $result['upToDate'] = true;
            }
            // done lastUpdate = updated
        }
        // done check result
        
        // done data up to date
        return $result;
    }
    private function getSelection( $which ) {

        // create selection
        $selection = array(
            'tables'        => array( 
                'contacts' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name as text', 
                'a.companyName', 
                'a.opened', 
                'a.closed', 
                'a.used'
            ),
            'order' => 'name'
        );
        // done create selection 
        
        // which = open 
        if( $which == 'open' ){
            // add where clause
            $selection['whereClauses'] = array( 
                array(
                    'what' => 'a.closed',
                    'value' => 'false',
                    'compare' => '='
                )
            );
            // done add where clause
        }
        // done which = open 
        
        // which = closed 
        if( $which == 'closed' ){
            // add where clause
            $selection['whereClauses'] = array( 
                array(
                    'what' => 'a.closed',
                    'value' => 'false',
                    'compare' => '<>'
                )
            );
            // done add where clause
        }
        // done which = closed 
        
        // done 
        return $selection;
        
    }
}