<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\SendResetPasswordEmailTokens\SendResetPasswordEmailTokensEmailCanRepeat.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class validates the existance of a token in the public tokens database
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

namespace MbCommon\Database\Security\Authentification\SendResetPasswordEmailTokens;

use Common\Service\Debugger;

class SendResetPasswordEmailTokensEmailCanRepeat
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function emailCanRepeat( $dataController, $repeatDelay ){
        
        // debug info
        $this->debugger->logInformation( 'SendResetPasswordEmailTokensEmailCanRepeat' );
        
        // get selection    
        $selection = $this->getSelection( $repeatDelay );
        
        $this->debugger->logInformation( 'repeatDelay: ' . $repeatDelay );
        
        // select
        $result = $dataController->select( $selection );        

        if( !$result || $result[0]['count'] == 0 ){
            // debug info
            $this->debugger->logInformation( 'SendResetPasswordEmailTokensValidate repeat allowed ' );
            // done 
            return true;
        }

        // debug info
        $this->debugger->logInformation( 'SendResetPasswordEmailTokensValidate repeat not allowed  ' );

        // done
        return false;
    }
    private function getSelection( $repeatDelay ) {
        // create date time
        $lastAllowed = new \DateTime( 'now' );
        // minus delay
        $lastAllowed->sub( new \DateInterval( 'PT' . $repeatDelay . 'S' ) );
        
        $this->debugger->logInformation( 'lastAllowed: ' . $lastAllowed->format( 'YmdHis' ) );
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'sendResetPasswordEmailTokens' => 'a'
            ),
            'columns'       => array( 
                'COUNT(*) AS count'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'created',
                    'value' => $lastAllowed->format( 'YmdHis' ),
                    'compare' => '> '
                )
            ),
            'limit' => '1',
            'order' => 'created ASC'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}