<?php
/* 
 *  Project: MbCommon
 * 
 *  File: /MbCommon/Security/Authentification/ResetPassword/ResetPasswordTokensController.php
 * 
 *  Last Revision:  23-01-2017
 * 
 *  Purpose: 
 *          this class handles construction, saving and verification of a 
 *          rememberMe token used to verify remember me
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

namespace MbCommon\Security\Authentification\ResetPasswordTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;
use MbCommon\Database\Security\Authentification\ResetPasswordTokens\ResetPasswordTokensDataController;

class ResetPasswordTokensController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'resetPasswordTokenLength'      =>  256,       
        'resetPasswordCookieLength'     =>  256       
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // debug info
        $this->debugger->logInformation( 'ResetPasswordController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function getResetPasswordToken(){
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        // create new token
        $resetPasswordToken = $tokenGenerator->getToken( $this->config['resetPasswordTokenLength'] );
        // create data acces
        $resetPasswordTokensController = new ResetPasswordTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // insert token
        $resetPasswordTokensController->insertToken( $resetPasswordToken );
        // done
        return $resetPasswordToken;
    }    
    public function validate( $resetPasswordToken, $request ){
        // create data acces
        $resetPasswordTokensController = new ResetPasswordTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$resetPasswordTokensController->validate( $resetPasswordToken, $request ) ){
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'AuthentificationValidatepasswordReset', 'invalid reset password token: ' . $resetPasswordToken, $request );
            // done invalid
            return false;
        }
        return true;
    }
    private function getConfig( ServiceLocatorInterface $serviceLocator ) {
        // read the configuration
        $config = $serviceLocator->get( 'config' )[$this->configId];
        
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
    }
}
