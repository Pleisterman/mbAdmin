<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Projects/ProjectsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the projects table
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
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\Projects\ProjectsGetLastUsed;
use MbAdmin\Database\Data\Projects\ProjectsGetList;
use MbAdmin\Database\Data\Projects\ProjectsGetSelectData;
use MbAdmin\Database\Data\Projects\ProjectsInsertRow;
use MbAdmin\Database\Data\Projects\ProjectsUpdateRow;

class ProjectsDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'data/data.db'
    ); 
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store user directory
        $this->workDirectory = $workDirectory;
        // add user directory to path
        $this->fileOptions['fileName'] = 'data/' . $this->workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }        
    public function get( $what, $selection = null, $lastUpdated = null ){
        // debug info
        $this->debugger->logInformation( 'ProjectsDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // update project used
                $this->updateUsed( 'projects', $selection );

                // parent handles get row by id
                return $this->getRowById( 'projects', $selection );
            }
            case 'lastUsed': {
                // create get last used controller
                $controller = new ProjectsGetLastUsed( $this->debugger );
                // done call get last used
                return $controller->getLastUsed( $this );
            }
            case 'list': {
                // create get list controller
                $controller = new ProjectsGetList( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call get list
                return $controller->getList( $this, $selection, $lastUpdated );
            }
            case 'selectData': {
                // create get select data controller
                $controller = new ProjectsGetSelectData( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call get select data
                return $controller->getSelectData( $this, $selection, $lastUpdated );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error ProjectsDataController get, what not found: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
    }
    public function insertData( $values ){
        // create insert row controller
        $controller = new ProjectsInsertRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done call insert row
        return $controller->insertRow( $this, $values );
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'ProjectsDataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // create update row controller
                $controller = new ProjectsUpdateRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call update row
                return $controller->updateRow( $this, $id, $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'ProjectsDataController update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
}