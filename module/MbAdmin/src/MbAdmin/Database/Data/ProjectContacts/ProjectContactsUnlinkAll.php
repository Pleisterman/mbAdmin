<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ProjectContacts/ProjectContactsUnlinkAll.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class unlinks all contacts from a project in the table
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

class ProjectContactsUnlinkAll
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function unlinkAll( $dataController, $projectId ){
      
        // get selection    
        $selection = $this->getSelection( $projectId );

        // call delete
        $dataController->delete( $selection );        
        
    }
    private function getSelection( $projectId ) {
        
        // create selection
        $selection = array(
            'table'        =>   'projectContacts',
            'whereClauses' => array(
                array( 
                    'what' => 'projectId',
                    'compare' => '= ? '
                )
            ),
            'values'    => array( 
                $projectId
            )
        );
        // done create selection

        // done
        return $selection;
    }
}