<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tax/TaxDataController.php
 * 
 *  Last Revision:  26-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the tax table
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

namespace MbAdmin\Database\Data\Tax;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\Tax\TaxGetLastUsed;
use MbAdmin\Database\Data\Tax\TaxGetList;
use MbAdmin\Database\Data\Tax\TaxGetSelectData;
use MbAdmin\Database\Data\Tax\TaxInsertRow;
use MbAdmin\Database\Data\Tax\TaxUpdateRow;

class TaxDataController extends MbCommonDataController
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
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }        
    public function get( $what, $selection = null, $lastUpdated = null ){
        // debug info
        $this->debugger->logInformation( 'TaxDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // update vehicle used
                $this->updateUsed( 'tax', $selection );

                // parent handles get row by id
                return $this->getRowById( 'tax', $selection );
            }
            case 'lastUsed': {
                // create get last used controller
                $controller = new TaxGetLastUsed( $this->debugger );
                // done call get last used
                return $controller->getLastUsed( $this );
            }
            case 'list': {
                // create get list controller
                $controller = new TaxGetList( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call get list
                return $controller->getList( $this, $lastUpdated );
            }
            case 'selectData': {
                // create get select data controller
                $controller = new TaxGetSelectData( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call get select data
                return $controller->getSelectData( $this, $selection, $lastUpdated );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error TaxDataController get, what not found: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
    }
    public function insertData( $values ){
        // create insert row controller
        $controller = new TaxInsertRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done call insert row
        return $controller->insertRow( $this, $values );
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'TaxDataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'rowById': {
                // create update row controller
                $controller = new TaxUpdateRow( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done call update row
                return $controller->updateRow( $this, $id, $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'TaxDataController update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
}