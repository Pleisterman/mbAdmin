<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\JsonWebTokens\JsonWebTokensDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the MbCommonDataController class
 *          it controls the calls for json web tokens 
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

namespace MbCommon\Database\Security\Authentification\JsonWebTokens;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\Authentification\JsonWebTokens\JsonWebTokensDeleteRowById;
use MbCommon\Database\Security\Authentification\JsonWebTokens\JsonWebTokensInsertRow;
use MbCommon\Database\Security\Authentification\JsonWebTokens\JsonWebTokensClean;

class JsonWebTokensDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'authorisation/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // add user to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );

    }   
    public function getTokenById( $id ){
        // create clean controller
        $cleanController = new JsonWebTokensClean( $this->debugger );
        // clean
        $cleanController->clean( $this );

        // get row
        $result = $this->getRowById( 'JsonWebTokens', $id );
        
        // check result
        if( !$result || isset( $result['criticalError'] ) ){
            $this->debugger->LogInformation( 'JsonWebTokensDataController getTokenById row not found id: ' . $id );
            // done with error
            return array( 'criticalError' => 'dataConnectionFailed' );
        }
        // check result
        
        // done
        return $result['data']['token'];
    }
    public function deleteById( $id ){
        // create delete row by id controller
        $controller = new JsonWebTokensDeleteRowById( $this->debugger );
        // done 
        return $controller->deleteRow( $this, $id );
    }
    public function insertToken( $token ){

        // create insert row controller
        $insertController = new JsonWebTokensInsertRow( $this->configId, $this->serviceLocator, $this->debugger );
        // done 
        return $insertController->insertRow( $this, $token );
    }
}