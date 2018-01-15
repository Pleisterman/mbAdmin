<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ContactProjects/ContactProjectsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class unlinks all projects from a contact in the table
 *          projectContacts
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

namespace MbAdmin\Database\Data\ContactProjects;

use Common\Service\Debugger;

class ContactProjectsUnlinkAll
{
    private $debugger = null; 
    
    public function __construct(  Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function unlinkAll( $dataController, $contactId ){
        
        // get selection    
        $selection = $this->getSelection( $contactId );

        // call delete
        $dataController->delete( $selection );        
        
    }
    private function getSelection( $contactId ) {
        
        // create selection
        $selection = array(
            'table'        =>   'projectContacts',
            'whereClauses' => array(
                array( 
                    'what' => 'contactId',
                    'compare' => '= ? '
                )
            ),
            'values'    => array( 
                $contactId
            )
        );
        // done create selection

        // done
        return $selection;
    }
}