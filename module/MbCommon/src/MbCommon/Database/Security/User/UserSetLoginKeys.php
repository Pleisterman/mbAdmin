<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Security\User\UserSetLoginKeys.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates the loginKeys of the user in the user table
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

class UserSetLoginKeys
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function setLoginKeys( $dataController, $nameKey, $passwordKey, $token, $cookieKey  ){
        
        // debug info
        $this->debugger->logInformation( 'UserSaveLoginKeys' );

        // get selection
        $selection = $this->getSelection( $nameKey, $passwordKey, $token, $cookieKey );
            
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
    private function getSelection( $nameKey, $passwordKey, $token, $cookieKey ) {
        
        // create selection
        $selection = array(
            'table'        =>  'user',
            'columns'       => array( 
                'nameKey',
                'passwordKey'
            ),
            'values'    =>  array(
                $nameKey,
                $passwordKey
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}