<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationRefreshPageToken.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles refreshing the page token 
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

namespace MbCommon\Security\Authentification;

use Common\Service\Debugger;
use Zend\ServiceManager\ServiceLocatorInterface;
use MbCommon\Security\Authentification\PageTokens\PageTokensController;
use MbCommon\Security\Authentification\Algorithms\AlgorithmsController;

class AuthentificationRefreshPageToken
{
    private $debugger = null;
    private $serviceLocator = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store workDirectory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function refreshPageToken( $algorithm ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationRefreshPageToken ' );
        
        // create algorithm controller
        $algorithmsController = new AlgorithmsController( $this->debugger );
        // check if algoritm exists
        if( !$algorithmsController->algorithmExists( $algorithm ) ){
            // done with error
            return array( 'criticalError' => 'algoritmNotFound' );
        }
        // done check if algoritm exists

        
        // create page token controller
        $pageTokensController = new PageTokensController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // create page token
        $pageTokenResult = $pageTokensController->getPageToken( );
        // check get page token result
        if( isset( $pageTokenResult['criticalError'] ) ){
            // done with error
            return $pageTokenResult;
        }
        // check get page token result
        
        // done
        return array( 'token' => $pageTokenResult );
    }
}
