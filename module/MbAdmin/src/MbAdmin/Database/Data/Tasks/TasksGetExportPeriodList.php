<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tasks/TasksGetExportPeriodList.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class creates a list of tasks that occur within a given period
 *          from the tasks table
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
use MbCommon\Database\Language\LanguageDataController;
use MbAdmin\Database\Data\Tasks\TasksExportAddTotals;

class TasksGetExportPeriodList
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $languageDataController = null;
    private $configId = null;
    public function __construct( $configId, $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;
    }        
    public function getExportPeriodList( $dataController, $values ){
        // debug info
        $this->debugger->logInformation( 'TasksGetExportPeriodList from: ' . $values['from'] . ' to: ' . $values['till'] );
        
        // get selection    
        $selection = $this->getSelection( $values['from'], $values['till'] );

        // create result
        $result = [];
        
        // create headers
        $result['headers'] = array( 
            $this->getTranslation( 'date', $values['languageId'] ), 
            $this->getTranslation( 'startTime', $values['languageId'] ), 
            $this->getTranslation( 'endTime', $values['languageId'] ),
            $this->getTranslation( 'description', $values['languageId'] ), 
            $this->getTranslation( 'project', $values['languageId'] ), 
            $this->getTranslation( 'longDescription', $values['languageId'] ) 
        );
        // done create header
        
        // select
        $result['rows'] = $dataController->select( $selection );        
        
        // create totals controller
        $addTotalsController = new TasksExportAddTotals( $this->debugger );
        // add totals
        $addTotalsController->addTotals( $values['addTotals'], $result['rows'] );
        
        // done
        return $result;
    }
    private function getSelection( $from, $till ) {

        // create selection
        $selection = array(
            'tables'        => array( 
                'tasks' => 'a',
                'projects'  => 'b'
            ),
            'relations' => array(
                'a.projectId = b.id'
            ),
            'columns'       => array( 
                'a.date', 
                'a.startTime', 
                'a.endTime',
                'a.description',
                'b.name as projectName', 
                'a.longDescription'
            ),
            'whereClauses' => array(
                array(
                    'link'      => true,
                    'compare'   => 'AND',
                    'selection' => array(
                        array(   
                            'what' => 'a.date',
                            'value' => $from,
                            'compare' => '>='
                        ),
                        array(   
                            'what' => 'a.date',
                            'value' => $till,
                            'compare' => '<='
                        )
                    )
                )
            ),
            'order' => 'date, startTime ASC'
            
        );
        // done create selection 

        // done return selection
        return $selection;
        
    }
    private function getTranslation( $translationId, $language ) {
        // check if translations controller exists
        if( !$this->languageDataController ){
            // create translations controller
            $this->languageDataController = new LanguageDataController( $this->configId, $this->serviceLocator, $this->debugger );
        }
        // done check if translations controller exists
        
        // done 
        return $this->languageDataController->getTranslation( $translationId, $language );
    }
}