<?php
/* 
 *  Project: MbCommon
 * 
 *  File: /MbCommon/Security/Authentification/OpenResetPassword/OpenResetPasswordTokensController.php
 * 
 *  Last Revision:  20-01-2017
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

namespace MbCommon\Security\Authentification\OpenResetPasswordTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;
use MbCommon\Database\Security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensDataController;

class OpenResetPasswordTokensController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'openResetPasswordTokenLength'      =>  256,       
        'openResetPasswordCookieLength'     =>  256       
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
        $this->debugger->logInformation( 'openResetPasswordController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function getOpenResetPasswordToken(){
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        // create new token
        $openResetPasswordToken = $tokenGenerator->getToken( $this->config['openResetPasswordTokenLength'] );
        // create data acces
        $openResetPasswordTokensController = new OpenResetPasswordTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // insert token
        $openResetPasswordTokensController->insertToken( $openResetPasswordToken );
        // done
        return $openResetPasswordToken;
    }    
    public function validate( $openResetPasswordToken, $request ){
        // create data acces
        $openResetPasswordTokensController = new OpenResetPasswordTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$openResetPasswordTokensController->validate( $openResetPasswordToken, $request ) ){
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'AuthentificationValidatepasswordReset', 'invalid open password reset token: ' . $openResetPasswordToken, $request );
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
