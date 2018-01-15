<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserGetLoginData.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this class gets an array with the login data from 
 *          the user table
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

namespace MbCommon\Database\Security\User;

use Common\Service\Debugger;

class UserGetLoginData
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getLoginData( $dataController ){
        
        // debug info
        $this->debugger->logInformation( 'UserGetLoginData' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $loginKeys = $dataController->select( $selection );        
        
        // check result
        if( $loginKeys && isset( $loginKeys[0] ) ){
            // done
            return $loginKeys[0];
        }
        // done check result
        
        // debug info
        $this->debugger->logInformation( 'error UserGetLoginData no result.' );
        // done with error
        return array( 'criticalError' => 'dataNotFound' );
    }
    private function getSelection( ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'user' => 'a'
            ),
            'columns'       => array( 
                'a.loginName', 
                'a.password', 
                'a.passwordToken', 
                'a.cookieToken'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}