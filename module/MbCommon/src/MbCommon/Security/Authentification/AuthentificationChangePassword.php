<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationChangePassword.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 * Purpose: this class handles changing the password and pasword token
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
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Security\Authentification\AuthentificationXorDecoder;
use MbCommon\Database\Security\User\UserDataController;

class AuthentificationChangePassword
{
    private $debugger = null;
    private $serviceLocator = null;
    private $authorisationKeyDir = null; 
    private $config = array( 
        'applicationKeyLength'          => 128,
        'passwordTokenLength'           => 128,
        'dataDir'                       => '/',
        'applicationKeyFile'            =>  'applicationKey.json'
    );
    private $workDirectory = null;
    private $configId = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
        // add user to dataDir path
        $this->authorisationKeyDir = $this->config['dataDir'] . 'data/' . $workDirectory . '/authorisation/key/';
    }
    public function changePassword( $algorithm, $password ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationChangePassword ' );
        
        // create user datacontroller
        $userController = new UserDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get password key
        $passwordKey = $userController->getPasswordKey();
        // create decoder
        $xorDecoder = new AuthentificationXorDecoder( $this->debugger );
        // decode password
        $decodedPassword = $xorDecoder->decodeXor( $password, $passwordKey );

        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );

        // get application key
        $dirName = $this->authorisationKeyDir;
        $fileName = $this->config['applicationKeyFile'];
        $applicationKey = array(
            'applicationKey'    =>  $tokenGenerator->getToken( $this->config['applicationKeyLength'] )
            
        );
        $applicationKeyJson = file_put_contents( $dirName . $fileName, json_encode( $applicationKey ) ); 
        // done get application key

        // create new password token
        $passwordToken = $tokenGenerator->getToken( $this->config['passwordTokenLength'] );
        
        // create enooded password
        $encodedPassword = hash_hmac( $algorithm, 
                                      $decodedPassword . $passwordToken, 
                                      $applicationKey['applicationKey'] );
        // done create enooded password
        
        // create update values
        $values = array(
            'password'      => $encodedPassword,
            'passwordToken' => $passwordToken
        );
        // done create update values
        
        // done
        return $userController->changePassword( $values );
        
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
