<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \Database\Security\User\UserSetUserInfo.php
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

class UserSetUserInfo
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function setUserInfo( $dataController, $values  ){
        
        // debug info
        $this->debugger->logInformation( 'UserSetUserInfo' );

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
                'name',
                'loginName',
                'email'
            ),
            'values'    =>  array(
                $values['name'],
                $values['loginName'],
                $values['email']
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}