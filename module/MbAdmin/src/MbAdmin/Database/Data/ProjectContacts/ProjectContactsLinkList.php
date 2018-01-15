<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ProjectContacts/ProjectContactsLinkList.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class links a list of contacts to a project in the table
 *          projectContacts
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
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsUnlinkAll;
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsLink;
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsGetList;

class ProjectContactsLinkList
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function link( $dataController, $projectId, $values ){
        // debug info
        $this->debugger->logInformation( 'project contacts link projectid: ' . $projectId );
        
        // create unlink controller
        $unlinkAllController = new ProjectContactsUnlinkAll( $this->debugger );
        // delete all links
        $unlinkAllController->unlinkAll( $dataController, $projectId );

        // create the link controller
        $linkController = new ProjectContactsLink( $this->debugger );
        
        // loop over contact values
        for( $i = 0; $i < count( $values ); $i++ ){
            // debug info
            $this->debugger->logInformation( 'add project contacts link value: ' . $values[$i] );
            // call the link function
            $linkResult = $linkController->link( $dataController, $projectId, $values[$i] );
            // check the link result
            if( isset( $linkResult['criticalError'] ) ){
                // done with error
                return $linkResult;
            }
            // done check the link result
        }
        // done loop over contact values
        
        // create get list controller 
        $getListController = new ProjectContactsGetList( $this->debugger );
        // done 
        return $getListController->getList( $dataController, $projectId );
    }
}