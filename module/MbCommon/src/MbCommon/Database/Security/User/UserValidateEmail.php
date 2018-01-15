<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserValidateEmail.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class gets an array with the user info from 
 *          the user table, fieds name and email
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

namespace MbCommon\Database\Security\User;

use Common\Service\Debugger;

class UserValidateEmail
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function validateEmail( $dataController, $email ){
        
        // debug info
        $this->debugger->logInformation( 'validateEmailAdres' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $result = $dataController->select( $selection );        
        
        // check result
        if( $result && isset( $result[0] ) ){
            
            // compare strings
            if( $result[0]['email'] == $email ){
                // debug info
                $this->debugger->logInformation( 'validateEmailAdres email is valid' );
                // email is valid
                return true;
            }
            else {
                // debug info
                $this->debugger->logInformation( 'validateEmailAdres email is invalid' );
            }
        }
        else {
            // debug info
            $this->debugger->logInformation( 'validateEmailAdres error email not found' );
        }
        // done check result
        
        
        // email is in valid
        return false;
    }
    private function getSelection( ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'user' => 'a'
            ),
            'columns'       => array( 
                'a.email'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}