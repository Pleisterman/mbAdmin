<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationValidateLogin.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles validation that the user is logged in
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

use Common\Service\Debugger;
use Zend\ServiceManager\ServiceLocatorInterface;
use MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensController;
use MbCommon\Security\Authentification\PageTokens\PageTokensController;
use MbCommon\Security\Authentification\Algorithms\AlgorithmsController;

class AuthentificationValidateLogin
{
    private $debugger = null;
    private $configId = null;
    private $workDirectory = null;
    private $serviceLocator = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function validateLogin( $algorithm, $pageToken, $request ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationValidateLogin ' );
        
        // create algorithm controller
        $algorithmsController = new AlgorithmsController( $this->debugger );
        // check if algoritm exists
        if( !$algorithmsController->algorithmExists( $algorithm ) ){
            // done with error
            return array( 'criticalError' => 'algoritmNotFound' );
        }
        // done check if algoritm exists

        // create jsonWebtoken controller
        $jsonWebTokensController = new JsonWebTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );

        // validate jsonWebToken
        $jsonWebTokenValidateResult = $jsonWebTokensController->validate( $algorithm, $request );
        // check validate result
        if( !$jsonWebTokenValidateResult ){
            // done with error
            return array( 'criticalError' => 'notLoggedIn' );
        }
        // done check validate result
        
        // create page token controller
        $pageTokensController = new PageTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // validate pageToken
        if( !$pageTokensController->validate( $pageToken, $request ) ){
            // done with error
            return array( 'criticalError' => 'notLoggedIn' );
        }
        // validate pageToken
        
        return [];
    }
}
