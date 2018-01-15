<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserGetUserName.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets the name from 
 *          the user table
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

namespace MbCommon\Database\Security\User;

use Common\Service\Debugger;

class UserGetUserName
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getUserName( $dataController ){
        
        // debug info
        $this->debugger->logInformation( 'UserGetUserName' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $result = $dataController->select( $selection );        
        
        // check result
        if( $result && isset( $result[0] ) ){
            // return name
            return $result[0]['name'];
        }
        // done check result
        
        // debug info
        $this->debugger->logInformation( 'UserGetUserName error name not found' );
        
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
                'a.name'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}