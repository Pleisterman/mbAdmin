<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ContactProjects/ContactProjectsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class links a list of projects to a contact in the table
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
use MbAdmin\Database\Data\ContactProjects\ContactProjectsUnlinkAll;
use MbAdmin\Database\Data\ContactProjects\ContactProjectsLink;
use MbAdmin\Database\Data\ContactProjects\ContactProjectsGetList;

class ContactProjectsLinkList
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function link( $dataController, $contactId, $values ){
        // debug info
        $this->debugger->logInformation( 'contact projects link contactid: ' . $contactId );
        
        // create unlink controller
        $unlinkAllController = new ContactProjectsUnlinkAll($this->debugger );
        // delete all links
        $unlinkAllController->unlinkAll( $dataController, $contactId );
        
        // create the link controller
        $linkController = new ContactProjectsLink( $this->debugger );
        
        // loop over project values
        for( $i = 0; $i < count( $values ); $i++ ){
            // debug info
            $this->debugger->logInformation( 'contact projects link project: ' . $values[$i] );
            // call the link function
            $linkResult = $linkController->link( $dataController, $contactId, $values[$i] );
            // check the link result
            if( isset( $linkResult['criticalError'] ) ){
                // done with error
                return $linkResult;
            }
            // done check the link result
        }
        // done loop over project values
        
        // create get list controller 
        $getListController = new ContactProjectsGetList( $this->debugger );
        // done 
        return $getListController->getList( $dataController, $contactId );
    }
}