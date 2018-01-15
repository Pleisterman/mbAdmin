<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ProjectContacts/ProjectContactsGetList.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with the a list of contacts linked to
 *          a given project and a list of contacts not linked to that given project
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

namespace MbAdmin\Database\Data\ProjectContacts;

use Common\Service\Debugger;
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsGetLinkedList;


class ProjectContactsGetList
{
    private $debugger = null; 
    
    public function __construct(  Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getList( $dataController, $selection ){
        // debug info
        $this->debugger->logInformation( 'get contact projects list selection: ' . $selection );

        // create result
        $result = [];

        // create linked list controller    
        $linkedListController = new ProjectContactsGetLinkedList( $this->debugger );
        // get the linked list
        $linkedListResult = $linkedListController->getLinkedList( $dataController, $selection, true );
        
        // check get list result
        if( isset( $linkedListResult['criticalError'] ) ){
            // done with error
            return $linkedListResult;
        }
        // done check get list result
        
        // get the unlinked list
        $unLinkedListResult = $linkedListController->getLinkedList( $dataController, $selection, false );

        // check get list result
        if( isset( $unLinkedListResult['criticalError'] ) ){
            // done with error
            return $unLinkedListResult;
        }
        // done check get list result
        
        // set linked list result
        $result['linkedRows'] = $linkedListResult['rows'];
        // set unlinked list result
        $result['unLinkedRows'] = $unLinkedListResult['rows'];
        // done 
        return $result;
    }
}