<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserGetUserInfo.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets an array with the user info from 
 *          the user table, fieds name and email
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

class UserGetUserInfo
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getUserInfo( $dataController ){
        
        // debug info
        $this->debugger->logInformation( 'UserGetUserInfo' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $result = $dataController->select( $selection );        
        
        // check result
        if( $result && isset( $result[0] ) ){
            // return name
            return array( 'data' => $result[0] );
        }
        // done check result
        
        // debug info
        $this->debugger->logInformation( 'UserGetUserInfo error info not found' );
        
        // done 
        return array( 'critiacalError' => 'dataNotFound' );
    }
    private function getSelection( ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'user' => 'a'
            ),
            'columns'       => array( 
                'a.name',
                'a.loginName',
                'a.email'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}