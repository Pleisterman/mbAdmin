<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the MbCommonDataController class
 *          it controls the calls for public tokens 
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

namespace MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensEmailCanRepeat;
use MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensValidate;
use MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensClean;
use MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensInsertRow;
use MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensDeleteRowByToken;

class SendResetPasswordEmailTokensDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'authorisation/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // add work directory to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );

    }   
    public function emailCanRepeat( $repeatDelay ){
        
        // create set insert controller
        $controller = new SendResetPasswordEmailTokensEmailCanRepeat( $this->debugger );
        // done 
        return $controller->emailCanRepeat( $this, $repeatDelay );
    }
    public function validate( $token ){
        // create clean controller
        $cleanController = new SendResetPasswordEmailTokensClean( $this->debugger );
        // clean
        $cleanController->clean( $this );
        // create set login keys controller
        $controller = new SendResetPasswordEmailTokensValidate( $this->debugger );
        // done 
        return $controller->validate( $this, $token );
    }
    public function deleteToken( $token ){
        // create set login keys controller
        $controller = new SendResetPasswordEmailTokensDeleteRowByToken( $this->debugger );
        // done 
        return $controller->deleteRowByToken( $this, $token );
    }
    public function insertToken( $token ){
        
        // create set insert controller
        $insertController = new SendResetPasswordEmailTokensInsertRow( $this->serviceLocator, $this->debugger );
        // done 
        return $insertController->insertRow( $this, $token );
    }
}