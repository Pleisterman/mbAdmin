<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\InvalidRequests\InvalidRequestsDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the MbCommonDataController class
 *          it controls the calls for invalid requests
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

namespace MbCommon\Database\Security\InvalidRequests;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\InvalidRequests\InvalidRequestsInsertRow;
use MbCommon\Database\Security\InvalidRequests\InvalidRequestsDeleteFirstRow;

class InvalidRequestsDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'invalidRequests/data.db'
    ); 
    public function __construct( $configId  , $serviceLocator, Debugger $debugger  )
    {
        // add user to path
        $this->fileOptions['fileName'] = $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }   
    public function insertRequest( $actionInfo, $errorInfo, $request ){
        // create insert row controller
        $insertController = new InvalidRequestsInsertRow( $this->debugger );
        // insert 
        $insertResult = $insertController->insertRow( $this, $actionInfo, $errorInfo, $request );
        
        // check insert result
        if( isset( $insertResult['criticalError'] ) ){
            // done with insert error
            return $insertResult;
        }
        // done check insert result
        
        // create delete first row controller
        $deleteController = new InvalidRequestsDeleteFirstRow( $this->debugger );
        // done 
        return $deleteController->deleteFirstRow( $this );
        
    }
}