<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\Authentification\PublicTokens\PublicTokensClean.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class deletes the expired tokens from the publicTokens table
 *          the expiration is calculated with the confiug var publicTokenExpirationPeriod 
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


namespace MbCommon\Database\Security\Authentification\PublicTokens;

use Common\Service\Debugger;

class PublicTokensClean
{
    private $debugger = null; 
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members

    }        
    public function clean( $dataController ){
        // debug info
        $this->debugger->LogInformation( 'PublicTokensCleanUp' );

        // get selection
        $selection = $this->getSelection( );
        
        // delete
        $dataController->delete( $selection );
    }
    private function getSelection( ) {
        // create date time
        $now = new \DateTime( 'now' );

        // create selection
        $selection = array(
            'table'        =>   'publicTokens',
            'whereClauses' => array(
                array( 
                    'what' => 'expires',
                    'compare' => '< ? '
                )
            ),
            'values'    => array( 
                $now->format( 'YmdHis' )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}