<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\MbCommonDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 * Purpose: 
 *      this dataController class is an extension of the SqlLiteDatabase class
 *      it controls:
 * 
 *      construction of the SqliteDataController,
 *      getRowById,
 *      updateUsed
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

namespace MbCommon\Database;

use Common\Service\Debugger;
use Common\Service\Database\Sqlite\SqliteDataController;
use MbCommon\Database\MbCommonGetRowById;
use MbCommon\Database\MbCommonUpdateUsed;

class MbCommonDataController extends SqliteDataController  
{
    public function __construct( $configId, $options, $serviceLocator, Debugger $debugger  )
    {
        // parent handles construct
        parent::__construct( $configId, $options, $serviceLocator, $debugger );
    }        
    public function getRowById( $table, $id ){
        // debug info
        $this->debugger->logInformation( 'MbCommonDataController getRowById table: ' . $table . ' id: ' . $id );

        // create get row by id controller
        $controller = new MbCommonGetRowById( $this->debugger );
        // done call get row by id
        return $controller->getRowById( $this, $table, $id );
    }
    public function updateUsed( $table, $id ){
        // create update used controller
        $controller = new MbCommonUpdateUsed( $this->debugger );
        // done call update used
        return $controller->updateUsed( $this, $table, $id );
    }    
}