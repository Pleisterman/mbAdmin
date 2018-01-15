<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \Database\Security\User\UserSetCookieToken.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates the info of the user in the user table
 *          fields: name, email
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

class UserSetCookieToken
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function setCookieToken( $dataController, $cookieToken  ){
        
        // debug info
        $this->debugger->logInformation( 'UserSetCookieToken' );

        // get selection
        $selection = $this->getSelection( $cookieToken );
            
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
    private function getSelection( $cookieToken ) {
        
        // create selection
        $selection = array(
            'table'        =>  'user',
            'columns'       => array( 
                'cookieToken'
            ),
            'values'    =>  array(
                $cookieToken
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}