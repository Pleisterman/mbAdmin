<?php
/* 
 *  Project: MbCommon
 * 
 *  File: /MbCommon/Security/Authentification/SendResetPasswordEmailTokens/SendResetPasswordEmailTokensController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class handles construction, saving and verification 
 *          of a public Token used to verify user before prepare login
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

namespace MbCommon\Security\Authentification\SendResetPasswordEmailTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensDataController;

use MbCommon\Security\InvalidRequests\InvalidRequestsController;

class SendResetPasswordEmailTokensController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'sendResetPasswordEmailRepeatDelay'    => 600,
        'sendResetPasswordEmailTokenLength'    => 512
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
        $this->debugger->logInformation( 'SendResetPasswordEmailTokensController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function getSendResetPasswordEmailToken(){

        // create data acces
        $sendResetPasswordEmailTokensController = new SendResetPasswordEmailTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        
        // can repeat reset password email 
        if( $sendResetPasswordEmailTokensController->emailCanRepeat( $this->config['sendResetPasswordEmailRepeatDelay'] ) ){
            // create token generator
            $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
            // create new token
            $token = $tokenGenerator->getResetPasswordEmailToken( $this->config['sendResetPasswordEmailTokenLength'] );
            // insert token
            $sendResetPasswordEmailTokensController->insertToken( $token );
            // done
            return $token;
        }
        // done can repeat reset password email 
            
        // done with error
        return false;
    }    
    public function validate( $sendResetPasswordEmailToken, $request ){
        // create data acces
        $sendResetPasswordEmailTokensController = new SendResetPasswordEmailTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$sendResetPasswordEmailTokensController->validate( $sendResetPasswordEmailToken ) ){
            // debug info
            $this->debugger->LogInformation( 'SendResetPasswordEmailTokensController validate invalid password reset email token passwordResetEmailToken: ' . $sendResetPasswordEmailToken );
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'ResetPasswordEmailTokensDataController validate',  
                                                              'password reset email token invalid, passwordResetEmailToken: ' . $sendResetPasswordEmailToken, $request );
            // done invalid
            return false;
        }
        // done valid
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
