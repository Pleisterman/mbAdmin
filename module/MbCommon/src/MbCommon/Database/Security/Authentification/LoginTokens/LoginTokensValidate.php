<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\LoginTokens\LoginTokensValidate.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class validates the existance of a token in the login tokens table
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


namespace MbCommon\Database\Security\Authentification\LoginTokens;

use Common\Service\Debugger;
use Zend\ServiceManager\ServiceLocatorInterface;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;

class LoginTokensValidate
{
    private $debugger = null; 
    private $configId = null;
    private $workDirectory = null;
    private $serviceLocator = null;
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
    public function validate( $dataController, $token, $request ){
        
        // debug info
        $this->debugger->logInformation( 'LoginTokensValidate' );
        
        // get selection    
        $selection = $this->getSelection( $token );
        
        // select
        $result = $dataController->select( $selection );        

        // public token exists
        if( $result && isset( $result[0] ) ){
            if( $result[0]['count'] > 0 ){
                // debug info
                $this->debugger->logInformation( 'LoginTokensValidate token is valid' );
                // done return valid
                return true;
            }
        }
        // done public token exists

        // debug info
        $this->debugger->logInformation( 'LoginTokensValidate invalid token: '. $token );

        // create invalid request data controller    
        $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // handle invalid request
        $invalidRequestsController->handleInvalidRequest( 'LoginTokensValidate', 'invalid token: ' . $token, $request );
        
        // done invalid
        return false;
    }
    private function getSelection( $token ) {
        // create date time
        $now = new \DateTime( 'now' );
        
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'loginTokens' => 'a'
            ),
            'columns'       => array( 
                'COUNT(*) AS count'
            ),
            'whereClauses' => array(
                array (
                    'what' => 'token',
                    'value' => $token,
                    'compare' => '='
                ),
                array (
                    'what' => 'expires',
                    'value' => $now->format( 'YmdHis' ),
                    'compare' => '>='
                )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}