<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserChangePassword.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates the password and pasword token of the user in the user table
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

class UserChangePassword
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function changePassword( $dataController, $values  ){
        
        // debug info
        $this->debugger->logInformation( 'UserChangePassword' );

        // get selection
        $selection = $this->getSelection( $values );
            
        // create result
        $result = [];
        
        // update
        if( !$dataController->update( $selection ) ){
            // set critical error
            $result['criticalError'] = 'updateFailed';
        }
        // done update
        
        // done 
        return $result;
    }
    private function getSelection( $values ) {
        
        // create selection
        $selection = array(
            'table'        =>  'user',
            'columns'       => array( 
                'password',
                'passwordToken'
            ),
            'values'    =>  array(
                $values['password'],
                $values['passwordToken']
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}