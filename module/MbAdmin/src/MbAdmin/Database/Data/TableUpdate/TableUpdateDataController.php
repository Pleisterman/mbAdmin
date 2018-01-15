<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/TableUpdate/TableUpdateDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the tableUpdate table
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

namespace MbAdmin\Database\Data\TableUpdate;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\TableUpdate\TableUpdateGetLastUpdate;
use MbAdmin\Database\Data\TableUpdate\TableUpdateSetLastUpdate;

class TableUpdateDataController extends MbCommonDataController
{
    private $fileOptions = array(
        'fileName'  =>  'data/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // add user directory to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }        
    public function getLastUpdate( $selection ){
        // create get last update controller
        $tableUpdateGetLastUpdate = new TableUpdateGetLastUpdate( $this->debugger );
        // done 
        return  $tableUpdateGetLastUpdate->getLastUpdate( $this, $selection );
    }
    public function setLastUpdate( $tableName, $updated ){
        // create set last update controller
        $tableUpdateSetLastUpdate = new TableUpdateSetLastUpdate( $this->debugger );
        // done 
        return  $tableUpdateSetLastUpdate->setLastUpdate( $this, $tableName, $updated );
    }
}