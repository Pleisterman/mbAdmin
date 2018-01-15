<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\LoginTokens\LoginTokensDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the MbCommonDataController class
 *          it controls the calls for login tokens 
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

namespace MbCommon\Database\Security\Authentification\LoginTokens;
    
use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\Authentification\LoginTokens\LoginTokensValidate;
use MbCommon\Database\Security\Authentification\LoginTokens\LoginTokensClean;
use MbCommon\Database\Security\Authentification\LoginTokens\LoginTokensInsertRow;
use MbCommon\Database\Security\Authentification\LoginTokens\LoginTokensDeleteRowByToken;

class LoginTokensDataController extends MbCommonDataController 
{
    private $workDirectory = null;
    private $fileOptions = array(
        'fileName'  =>  'authorisation/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store workDirectory
        $this->workDirectory = $workDirectory;
        // add user to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
        
    }   
    public function validate( $token, $request ){
        // create clean controller
        $cleanController = new LoginTokensClean( $this->debugger );
        // clean 
        $cleanController->clean( $this );
        
        // create validate controller
        $controller = new LoginTokensValidate( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $controller->validate( $this, $token, $request );
    }
    public function deleteToken( $token ){
        // create delete controller
        $controller = new LoginTokensDeleteRowByToken( $this->debugger );
        // done 
        return $controller->deleteRowByToken( $this, $token );
    }
    public function insertToken( $token ){
        // create insert controller
        $insertController = new LoginTokensInsertRow( $this->configId, $this->serviceLocator, $this->debugger );
        // done 
        return $insertController->insertRow( $this, $token );
        
    }
}