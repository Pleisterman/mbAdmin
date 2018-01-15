<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Contacts/ContactsGetLastUsed.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class gets a list of contacts from the contacts table
 *          with a limited size and ordered according to the used field
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

class ContactsGetLastUsed 
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLastUsed( $dataController ){
        // debug info
        $this->debugger->logInformation( 'ContactsGetLastUsed getLastUsed' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $rows = $dataController->select( $selection );        

        // create result
        $result = array(
            'rows'  => []
        );
        
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
    private function getSelection( ) {
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
            'limit' => '5',
            'order' => ' used DESC'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}