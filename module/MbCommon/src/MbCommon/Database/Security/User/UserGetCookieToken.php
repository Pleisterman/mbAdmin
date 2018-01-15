<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserGetCookieToken.php
 * 
 *  Last Revision:  20-01-2017
 * 
 *  Purpose: 
 *          this class gets the cookieToken from 
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

class UserGetCookieToken
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getCookieToken( $dataController ){
        
        // debug info
        $this->debugger->logInformation( 'UserGetCookieToken' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $result = $dataController->select( $selection );        
        
        // check result
        if( $result && isset( $result[0] ) ){
            // return name
            return $result[0]['cookieToken'];
        }
        // done check result
        
        // debug info
        $this->debugger->logInformation( 'UserGetCookieToken error cookieToken not found' );
        
        // done 
        return '';
    }
    private function getSelection( ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'user' => 'a'
            ),
            'columns'       => array( 
                'a.cookieToken'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}