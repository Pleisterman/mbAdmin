<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Projects/ProjectsGetLastUsed.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class gets a list of projects from the projects table
 *          with a limited size and ordered according to the used field
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

namespace MbAdmin\Database\Data\Projects;

use Common\Service\Debugger;

class ProjectsGetLastUsed
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLastUsed( $dataController ){
        // debug info
        $this->debugger->logInformation( 'ProjectsGetLastUsed getLastUsed' );
        
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
            // set result rows
            $result['rows'] = $rows;
        }
        // done check rows exists

        // done     
        return $result;
    }
    private function getSelection( ) {
        
        // create selection 
        $selection = array(
            'tables'        => array( 
                'projects' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name as text', 
                'a.opened', 
                'a.closed', 
                'a.used', 
                'a.updated'
            ),
            'limit' => '5',
            'order' => ' used DESC'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}