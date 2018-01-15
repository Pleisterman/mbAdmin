<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensGetDatabaseToken.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          gets the tatabase token linked to a given jsonwebtoken id
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

namespace MbCommon\Security\Authentification\JsonWebTokens;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Database\Security\Authentification\JsonWebTokens\JsonWebTokensDataController;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;


class JsonWebTokensGetDatabaseToken
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function getDatabaseToken( JsonWebTokensDataController $jsonWebTokenDataController, $tokenId ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensGetDatabaseToken' );
        // get token by id
        $result = $jsonWebTokenDataController->getTokenById( $tokenId );
        
        if( isset( $result['criticalError'] ) ){
            // create invalid requests controller
            $invalidRequestController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
            // handle invalid request
            $invalidRequestController->handleInvalidRequest( 'JsonWebTokensValidate', 'database token not found', '' );
            // done with error
            return false;
        }
        return $result;
    }
}
