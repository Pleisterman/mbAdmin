<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationCheckUserCredentials.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 * Purpose: this class checks the provided user credentials
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

namespace MbCommon\Security\Authentification;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\AuthentificationXorDecoder;
use MbCommon\Security\Authentification\AuthentificationLoginFailed;

class AuthentificationCheckUserCredentials
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'dataDir'                       =>  'authorisation',
        'applicationKeyFile'            =>  'applicationKey.json',
        'loginDelay'                    =>  30,
        'maximumUndelayedLogins'        =>  3
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
        // add user to dataDir path
        $this->config['dataDir'] .= 'data/' . $workDirectory  . '/authorisation/key/';
    }
    public function checkUserCredentials( $loginData, $loginKeys, $parameterArray ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationCheckUserCredentials ' );

        // create decoder
        $xorDecoder = new AuthentificationXorDecoder( $this->debugger );
        // decode name 
        $decodedName = $xorDecoder->decodeXor( $parameterArray['encryptedName'], $loginKeys['nameKey'] );
        // decode password
        $decodedPassword = $xorDecoder->decodeXor( $parameterArray['encryptedPassword'], $loginKeys['passwordKey'] );
        
        // check login name
        if( $decodedName != $loginData['loginName'] ){
            // debug info
            $this->debugger->LogInformation( 'AuthentificationCheckUserCredentials name invalid.' );
            // create controller
            $loginFailedController = new AuthentificationLoginFailed( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle login failed
            $error = $loginFailedController->loginFailed( $this->config['loginDelay'], $this->config['maximumUndelayedLogins'], 'invalid login name' );
            // done with error
            return false;        
        }
        // done check login name

        // get data dir    
        $dirName = $this->config['dataDir'];
        // get 
        $fileName = $this->config['applicationKeyFile'];
        $applicationKeyJson = json_decode( file_get_contents( $dirName . $fileName ), true ); 
        $applicationKey = $applicationKeyJson['applicationKey'];
        
        // check password
        $encodedPassword = hash_hmac( $parameterArray['algorithm'], 
                                      $decodedPassword . $loginData['passwordToken'], 
                                      $applicationKey );
        
        // debug info
        $this->debugger->LogInformation( '' );
        $this->debugger->LogInformation( 'AuthentificationCheckUserCredentials passwordToken: ' . $loginData['passwordToken'] );
        $this->debugger->LogInformation( '' );
        // debug info
        $this->debugger->LogInformation( '' );
        $this->debugger->LogInformation( 'AuthentificationCheckUserCredentials decodedPassword: ' . $decodedPassword );
        $this->debugger->LogInformation( '' );
        // debug info
        $this->debugger->LogInformation( '' );
        $this->debugger->LogInformation( 'AuthentificationCheckUserCredentials encodedPassword: ' . $encodedPassword );
        $this->debugger->LogInformation( '' );

        // debug info
        $this->debugger->LogInformation( '' );
        $this->debugger->LogInformation( 'AuthentificationCheckUserCredentials user password: ' . $loginData['password'] );
        $this->debugger->LogInformation( '' );

        if( $encodedPassword != $loginData['password'] ){
            // debug info
            $this->debugger->LogInformation( 'AuthentificationCheckUserCredentials password invalid.' );
            // create controller
            $loginFailedController = new AuthentificationLoginFailed( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle login failed
            $error = $loginFailedController->loginFailed( $this->config['loginDelay'], $this->config['maximumUndelayedLogins'], 'invalid password' );
            // done with error
            return false;        
        }        
        
        // done 
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
