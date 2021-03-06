<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\PublicTokens\PublicTokensDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls for public tokens 
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

namespace MbCommon\Database\Security\Authentification\PublicTokens;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\Authentification\PublicTokens\PublicTokensValidate;
use MbCommon\Database\Security\Authentification\PublicTokens\PublicTokensClean;
use MbCommon\Database\Security\Authentification\PublicTokens\PublicTokensInsertRow;
use MbCommon\Database\Security\Authentification\PublicTokens\PublicTokensDeleteRowByToken;

class PublicTokensDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'authorisation/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // add user to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }   
    public function validate( $token ){
        // create clean controller
        $cleanController = new PublicTokensClean( $this->debugger );
        // clean
        $cleanController->clean( $this );

        // create set login keys controller
        $controller = new PublicTokensValidate( $this->debugger );
        // done 
        return $controller->validate( $this, $token );
    }
    public function deleteToken( $token ){
        // create set login keys controller
        $controller = new PublicTokensDeleteRowByToken( $this->debugger );
        // done 
        return $controller->deleteRowByToken( $this, $token );
    }
    public function insertToken( $token ){
        
        // create set insert controller
        $insertController = new PublicTokensInsertRow( $this->configId, $this->serviceLocator, $this->debugger );
        // done 
        return $insertController->insertRow( $this, $token );
    }
}