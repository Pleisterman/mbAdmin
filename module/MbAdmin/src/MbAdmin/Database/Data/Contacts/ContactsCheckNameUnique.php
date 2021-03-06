<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Contacts/ContactsCheckNameUnique.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class checks if a name is unique before updating or inserting data
 *          into the contacts table
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

class ContactsCheckNameUnique
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkNameUnique( $dataController, $id, $name, $isUpdate ){
        
        // get selection    
        $selection = $this->getSelection( $id, $name, $isUpdate );

        // select row
        $row = $dataController->select( $selection );        

        // create result
        $result = [];
        
        // check row exists
        if( $row[0]['count'] != 0 ){
            // add name exists error
            $result['error'] = 'nameExists';
        }
        // done check row exists
        
        // done
        return $result;
    }
    private function getSelection( $id, $name, $isUpdate ) {
        // create selection 
        $selection = array(
            'tables'        => array( 
                'contacts' => 'a'
            ),
            'columns'       => array( 
                'count() as count'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.name',
                    'value' => $name,
                    'compare' => '='
                )
            )
        );
        // done create selection 
        
        // is update
        if( $isUpdate ){
            // create update clause 
            $updateClause  = array(
                'what' => 'a.id',
                'value' => $id,
                'compare' => '<>'
            );
            // done create update clause 
            
            // add update clause
            array_push( $selection['whereClauses'], $updateClause );
        }
        // done is update
    
        // done 
        return $selection;
    }
}