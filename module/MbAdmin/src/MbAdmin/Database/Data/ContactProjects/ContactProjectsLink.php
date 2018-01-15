<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ContactProjects/ContactProjectsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class links a project to a given contact in the projectContacts table
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

namespace MbAdmin\Database\Data\ContactProjects;

use Common\Service\Debugger;

class ContactProjectsLink
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function link( $dataController, $contactId, $projectId ){
        
        // get selection    
        $selection = $this->getSelection( $contactId, $projectId );

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
    private function getSelection( $contactId, $projectId ) {
        
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