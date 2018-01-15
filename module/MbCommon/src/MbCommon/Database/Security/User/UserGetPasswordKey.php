<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserGetPasswordKey.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates the passwordKey of the user in the user table
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

class UserGetPasswordKey
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getPasswordKey( $dataController  ){
        
        // debug info
        $this->debugger->logInformation( 'UserGetPasswordKey' );

        // get selection    
        $selection = $this->getSelection( );
            
        // call select
        $passwordKey = $dataController->select( $selection );        
        
        // check result
        if( $passwordKey && isset( $passwordKey[0] ) ){
            // done
            return $passwordKey[0]['passwordKey'];
        }
        // done check result
        
        // debug info
        $this->debugger->logInformation( 'error UserGetPasswordKey no result.' );
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
                'a.passwordKey'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}