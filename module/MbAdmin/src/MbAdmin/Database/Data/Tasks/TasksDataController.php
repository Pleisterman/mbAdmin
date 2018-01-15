<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tasks/TasksDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the tasks table
 *                      
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
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

namespace MbAdmin\Database\Data\Tasks;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\Tasks\TasksGetLastUsed;
use MbAdmin\Database\Data\Tasks\TasksGetDayList;
use MbAdmin\Database\Data\Tasks\TasksInsertRow;
use MbAdmin\Database\Data\Tasks\TasksUpdateRow;

class TasksDataController extends MbCommonDataController 
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
    public function get( $what, $selection = null ){
        // debug info
        $this->debugger->logInformation( 'TasksDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // update vehicle used
                $this->updateUsed( 'tasks', $selection );

                // parent handles get row by id
                return $this->getRowById( 'tasks', $selection );
            }
            case 'lastUsed': {
                // create get last used controller
                $controller = new TasksGetLastUsed( $this->debugger );
                // done call get last used
                return $controller->getLastUsed( $this );
            }
            case 'dayList': {
                // create get day list controller
                $controller = new TasksGetDayList( $this->debugger );
                // done call get day list
                return $controller->getDayList( $this, $selection );
            }
            case 'exportPeriodList': {
                // create get export period list controller
                $controller = new TasksGetExportPeriodList( $this->configId, $this->serviceLocator, $this->debugger );
                // done call get export period list controller
                return $controller->getExportPeriodList( $this, $selection );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error TasksDataController get, what not found: ' . $what . ' selection: ' . $selection );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
    }
    public function insertData( $values ){
        // create insert row controller
        $controller = new TasksInsertRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done call insert row
        return $controller->insertRow( $this, $values );
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'TasksDataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // create update row controller
                $controller = new TasksUpdateRow( $this->serviceLocator, $this->debugger );
                // done call update row
                return $controller->updateRow( $this, $id, $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'TasksDataController update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
}