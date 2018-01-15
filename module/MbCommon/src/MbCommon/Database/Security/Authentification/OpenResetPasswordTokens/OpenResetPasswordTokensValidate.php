<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\OpenResetPasswordTokens\OpenResetPasswordTokensValidate.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class validates the existance of a token in the page tokens table
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

namespace MbCommon\Database\Security\Authentification\OpenResetPasswordTokens;

use Common\Service\Debugger;
use MbCommon\Security\InvalidRequests\InvalidRequestsController;

class OpenResetPasswordTokensValidate
{
    private $debugger = null; 
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configid
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
        $this->debugger->logInformation( 'OpenResetPasswordTokensValidate' );
        
        // get selection    
        $selection = $this->getSelection( $token );
        
        // select
        $result = $dataController->select( $selection );        

        // public token exists
        if( $result && isset( $result[0] ) ){
            if( $result[0]['count'] > 0 ){
                // debug info
                $this->debugger->logInformation( 'OpenResetPasswordTokensValidate token is valid' );
                // done return valid
                return true;
            }
        }
        // done public token exists

        // debug info
        $this->debugger->logInformation( 'OpenResetPasswordTokensValidate invalid token: '. $token );

        // create invalid request data controller    
        $invalidRequestsController = new InvalidRequestsController( $this->configId, $this->userDirectory, $this->serviceLocator, $this->debugger );
        // handle invalid request
        $invalidRequestsController->handleInvalidRequest( 'OpenResetPasswordTokensValidate', 'invalid token: ' . $token, $request );
        
        // done invalid
        return false;
    }
    private function getSelection( $token ) {
        // create date time
        $now = new \DateTime( 'now' );
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'openResetPasswordTokens' => 'a'
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