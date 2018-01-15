<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Projects/ProjectsGetSelectData.php
 * 
 *  Last Revision:  17-01-2017
 *
 *  Purpose: 
 *          this class creates an array with a list of 'open' projects
 *          including a selected row even if that row is closed
 *          for dropdown lists
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

namespace MbAdmin\Database\Data\Projects;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Projects\ProjectsGetList;

class ProjectsGetSelectData
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $workDirectory = null;
    private $configId = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store user directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;
    }        
    public function getSelectData( $dataController, $id, $lastUpdated ){
        // debug info
        $this->debugger->logInformation( 'ProjectsGetSelectData id: ' . $id );

        // create selected row
        $selectedRow = null;

        // if id exists
        if( $id ){
            // get current row
            $currentRow = $dataController->get( 'rowById', $id );
            
            // create selected row
            $selectedRow = array(
                'id'    => $currentRow['data']['id'],
                'text'  => $currentRow['data']['name']
            );
            // done create selected row
        }
        // done if id exists
        
        // create list controller
        $getListController = new ProjectsGetList( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get list
        $list = $getListController->getList( $dataController, 'open', $lastUpdated );
        
        // create result
        $result = array(
            'open'          =>  $list,
            'selectedRow'   =>  $selectedRow
        );
        // done create result
        
        // done 
        return $result;
    }
}