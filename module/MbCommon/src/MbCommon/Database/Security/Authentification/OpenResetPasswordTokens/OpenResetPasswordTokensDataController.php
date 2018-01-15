<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensDataController.php
 * 
 *  Last Revision:  22-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the MbCommonDataController class
 *          it controls the calls for openResetPasswordTokens
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

namespace MbCommon\Database\Security\Authentification\OpenResetPasswordTokens;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensValidate;
use MbCommon\Database\Security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensClean;
use MbCommon\Database\Security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensInsertRow;
use MbCommon\Database\Security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensDeleteRowByToken;

class OpenResetPasswordTokensDataController extends MbCommonDataController 
{
    private $workDirectory = null;
    private $fileOptions = array(
        'fileName'  =>  'authorisation/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store workDirectory
        $this->workDirectory = $workDirectory;
        // add work directory to path
        $this->fileOptions['fileName'] = 'data/' . $this->workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }   
    public function validate( $token, $request ){
        // create clean controller
        $cleanController = new OpenResetPasswordTokensClean( $this->debugger );
        // clean  
        $cleanController->clean( $this );
        // create validate controller
        $controller = new OpenResetPasswordTokensValidate( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // done 
        return $controller->validate( $this, $token, $request );
    }
    public function deleteToken( $token ){
        // create delete controller
        $controller = new OpenResetPasswordTokensDeleteRowByToken( $this->debugger );
        // done 
        return $controller->deleteRowByToken( $this, $token );
    }
    public function insertToken( $token ){
        
        // create insert controller
        $insertController = new OpenResetPasswordTokensInsertRow( $this->configId, $this->serviceLocator, $this->debugger );
        // done 
        return $insertController->insertRow( $this, $token );
        
    }
}