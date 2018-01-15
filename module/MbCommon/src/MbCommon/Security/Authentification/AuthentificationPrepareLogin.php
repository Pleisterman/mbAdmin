<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationPrepareLogin.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles creating the tokens for the login
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

namespace MbCommon\Security\Authentification;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\PublicTokens\PublicTokensController;
use MbCommon\Security\Authentification\LoginTokens\LoginTokensController;
use MbCommon\Security\Authentification\AuthentificationLoginDelayController;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Security\Authentification\Algorithms\AlgorithmsController;
use MbCommon\Security\Authentification\Cookies\AuthentificationCookieController;
use MbCommon\Database\Security\User\UserDataController;

class AuthentificationPrepareLogin
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'nameKeyLength'                 => 32,
        'passwordKeyLength'             => 32,
        'cookiePath'                    => '/',
        'loginTokenLength'               => 32
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function prepareLogin( $loginDelayed, $nextLogin, $algorithm, $publicToken, $request ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationPrepareLogin ' );

        // create algorithm controller
        $loginDelayController = new AuthentificationLoginDelayController( $this->configId, $this->serviceLocator, $this->debugger );

        if( $loginDelayController->hasLoginDelay( $loginDelayed, $nextLogin ) ){
            // set error
            $result['error'] = 'loginDelayed';
            // done with delay
            return $result;        
        }
        // done check delay
        
        // create algorithm controller
        $algorithmsController = new AlgorithmsController( $this->debugger );
        // check if algoritm exists
        if( !$algorithmsController->algorithmExists( $algorithm ) ){
            // done with error
            return array( 'criticalError' => 'algoritmNotFound' );
        }
        // done check if algoritm exists

        // create public tokens controller
        $publicTokensController = new PublicTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        
        // validate public token
        if( !$publicTokensController->validate( $publicToken, $request ) ){
            // done 
            return array( 'token' => $publicTokensController->getPublicToken() );
        }
        // done validate public token
        
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        
        // create login token controller
        $loginTokensController = new LoginTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );

        // create the keys
        $result = [];
        $result['keys'] = array( 
            'nameKey'       => $tokenGenerator->getToken( $this->config['nameKeyLength'] ),
            'passwordKey'   => $tokenGenerator->getToken( $this->config['passwordKeyLength'] )
        );
        $result['token'] = $loginTokensController->getLoginToken( );
        // done create keys
        
        // create cookie token
        $cookieToken = $tokenGenerator->getToken( $this->config['loginTokenLength'] );
        // create cookie controller
        $cookieController = new AuthentificationCookieController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // set login cookie
        $cookieController->setLoginCookie( $cookieToken );

        // create controller
        $userController = new UserDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // safe keys
        $userController->setLoginValues( $result['keys']['nameKey'], 
                                         $result['keys']['passwordKey'], 
                                         $result['token'],
                                         $cookieToken );
        
        // done
        return $result;
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
