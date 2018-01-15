<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\TokenGenerator\TokenGenerator.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles calls to generate a random token
 *     
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
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

namespace MbCommon\Security\Authentification\TokenGenerator;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGeneratorGetToken;

class TokenGenerator
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = 'mbSiteCms';    
    private $config = array( 
        'tokenCodeAlphabet' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()?><|}{[]',
        'resetPasswordEmailTokenCodeAlphabet' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    );
    public function __construct( ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // debug info
        $this->debugger->logInformation( 'TokenGenerator construct' );
        // store debugger
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function getToken( $length ){
        // create data acces
        $getTokenController = new TokenGeneratorGetToken( $this->debugger );
        // iave token
        return $getTokenController->getToken( $this->config['tokenCodeAlphabet'], $length );
    }
    public function getResetPasswordEmailToken( $length ){
        // create data acces
        $getTokenController = new TokenGeneratorGetToken( $this->debugger );
        // iave token
        return $getTokenController->getToken( $this->config['resetPasswordEmailTokenCodeAlphabet'], $length );
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
