<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ProjectContacts/ProjectContactsLink.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class links a contact to a given project in the projectContacts table
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

class ProjectContactsLink
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function link( $dataController, $projectId, $contactId ){

        // get selection    
        $selection = $this->getSelection( $projectId, $contactId );
        
        // call insert
        $result = $dataController->insert( $selection );

        // check insert result
        if( !$result ){
            // set critical error
            $result['criticalError'] = 'insertFailed';
            // done with error
            return $result;
        }
        // done check insert result
        
        // done 
        return [];
    }
    private function getSelection( $projectId, $contactId ) {
        
        // create selection
        $selection = array(
            'table'        =>  'projectContacts', 
            'columns'      => array(
                'contactId',
                'projectId'
            ),
            'values'       => array(
                $contactId,
                $projectId
            ) 
        );
        // done create selection

        // done
        return $selection;
    }
}