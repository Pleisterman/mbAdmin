<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\PageTokens\PageTokensController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles construction, saving and verification of a 
 *          page token used in login validate after login or rememberMe
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

namespace MbCommon\Security\Authentification\PageTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\TokenGenerator\TokenGenerator;
use MbCommon\Database\Security\Authentification\PageTokens\PageTokensDataController;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;

class PageTokensController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    private $config = array( 
        'pageTokenLength'             => 32
    );
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store workDirectory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // debug info
        $this->debugger->logInformation( 'PageTokensController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
        // get the configuration
        $this->getConfig( $serviceLocator );
    }
    public function getPageToken( ){
        // create token generator
        $tokenGenerator = new TokenGenerator( $this->serviceLocator, $this->debugger );
        // create new token
        $token = $tokenGenerator->getToken( $this->config['pageTokenLength'] );
        // create data acces
        $pageTokensController = new PageTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // insert token
        $insertResult = $pageTokensController->insertToken( $token );
        // check insert result
        if( isset( $insertResult['critcalError'] ) ){
            // done with error
            return $insertResult;
        }
        // done check insert result
        
        // done
        return $token;
    }    
    public function validate( $pageToken, $request ){
        // create data acces
        $pageTokensController = new PageTokensDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate token
        if( !$pageTokensController->validate( $pageToken, $request ) ){
            // debug info
            $this->debugger->LogInformation( 'PageTokensController validate invalid page token pageToken: ' . $pageToken );
            // create invalid request controller
            $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestsController->handleInvalidRequest( 'PageTokensController validate', 'invalid page token', 
                                                              'pageToken: ' . $pageToken );
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
