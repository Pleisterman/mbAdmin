<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ProjectContacts/ProjectContactsGetLinkedList.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates the sql and return a list of contacts the linked to 
 *          a given project in the table projectContacts
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
namespace MbAdmin\Database\Data\ProjectContacts;

use Common\Service\Debugger;

class ProjectContactsGetLinkedList
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLinkedList( $dataController, $projectId, $linked ){
        // debug info
        $this->debugger->logInformation( 'get linklist' );
   
        // get selection    
        $selection = $this->getSelection( $projectId, $linked );
        
        // create result
        $result = [];
        
        // get list
        $linkedRows = $dataController->select( $selection );
         
        // check result
        if( isset( $linkedRows['criticalError'] ) || isset( $linkedRows['error'] ) ){
            // done with error
            return $linkedRows;
        }
        // done check result
        
        // set result rows
        $result['rows'] = $linkedRows;        
        
        // done 
        return $result;
    }
    private function getSelection( $projectId, $linked ) {

        // create selection 
        $selection = array(
            'tables'        => array( 
                'contacts' => 'a'
            ),
            'columns'       => array( 
                'a.id',
                'a.name as text'
            ),
            'in' => array( 
                'what' => 'a.id',
                'compare' => 'in',
                'selection' =>array(
                    'tables'        => array( 
                        'projectContacts'  =>  'a'  
                    ),
                    'columns'       => array( 
                        'a.contactId'
                    ),
                    'whereClauses' => array(
                        array(
                            'what' => 'a.projectId',
                            'value' => $projectId,
                            'compare' => '='
                        )
                    )
                )
            ),
            'order' =>  'text'
        );
        // done create selection 
        
        // if linked list
        if( $linked ){
            // set compsre is IN
            $selection['in']['compare'] = 'in';
        }
        else {
            // set compsre is NOT IN
            $selection['in']['compare'] = 'not in';
            
            // add not closed clause
            $selection['whereClauses'] = array(
                array(
                    'what' => 'a.closed',
                    'value' => 'false',
                    'compare' => '='
                )
            );
            // done add not closed clause
        }
        // done if linked list

        // done
        return $selection;
    }
}