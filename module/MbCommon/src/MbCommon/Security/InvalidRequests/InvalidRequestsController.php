<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\InvalidRequests\InvalidRequestsController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles registration of invalid requests
 *          a delay is called when the credentials are invalid
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

namespace MbCommon\Security\InvalidRequests;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use MbCommon\Database\Security\InvalidRequests\InvalidRequestsDataController;

class InvalidRequestsController
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // debug info
        $this->debugger->logInformation( 'IllegalRequestsController construct' );
        // store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function handleInvalidRequest( $action, $message, $request ){
        // debug info
        $this->debugger->LogInformation( 'IllegalRequestsController registerInvalidRequest' . 
                                         ' action: ' . $action,
                                         ' message: ' . $message );
        // create data acces
        $invalidRequestsController = new InvalidRequestsDataController( $this->configId,  $this->serviceLocator, $this->debugger );
        // insert request
        $invalidRequestsController->insertRequest( $action, $message, $request );
        
        // create delay
        $delay = rand( 500, 1000 );
        // delay
        usleep( $delay );
        
    }
}
