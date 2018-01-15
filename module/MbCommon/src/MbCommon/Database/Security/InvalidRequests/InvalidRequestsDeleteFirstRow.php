<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\InvalidRequests\InvalidRequestsDeleteFirstRow.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class deletes the first row ( lowest id ) from the requests table
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

namespace MbCommon\Database\Security\InvalidRequests;

use Common\Service\Debugger;

class InvalidRequestsDeleteFirstRow
{
    private $debugger = null; 
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members

    }        
    public function deleteFirstRow( $dataController ){
        // debug info
        $this->debugger->LogInformation( 'InvalidRequestsDeleteFirstRow ' );
        
        // get selection
        $selection = $this->getSelection( $dataController );
        
        // update
        if( !$dataController->delete( $selection ) ){
            // done with error
            return array( 'criticalError' => 'deleteFailed' );
        }
        // done update
        
        // done 
        return [];
    }
    private function getSelection( ) {

        // create selection
        $selection = array(
            'table'        =>   'requests',
            'in' => array( 
                'what' => 'id',
                'compare' => 'in',
                'selection' =>array(
                    'tables'        => array( 
                        'requests'  =>  'a'  
                    ),
                    'columns'       => array( 
                        'a.id'
                    )
                ),
                'order' => 'a.id ASC',
                'limit' =>  1
            ),
            'values'    => array()
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}