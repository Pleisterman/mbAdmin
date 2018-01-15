<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\InvalidRequests\InvalidRequestsInsertRow.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class inserts a row in the requests table
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

namespace MbCommon\Database\Security\InvalidRequests;

use Common\Service\Debugger;

class InvalidRequestsInsertRow
{
    private $debugger = null; 
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function insertRow( $dataController, $actionInfo, $errorInfo, $request ){
        
        // get timpStamp
        $timeStamp = $dataController->getTimeStamp();

        // get selection    
        $selection = $this->getSelection( $actionInfo, $errorInfo, $request, $timeStamp );
        
        // insert
        $insertResult = $dataController->insert( $selection );
        
        // insert
        if( !$insertResult ){
            // done with error
            return array( 'criticalError' => 'insertFailed' );
        }
        // done insert
        
        // done
        return [];
        
    }
    private function getSelection( $actionInfo, $errorInfo, $request, $timeStamp ) {
        
        $requestInfo = '';
        if( !is_string( $request )  ){
            $requestInfo = $request->getHeaders()->toString();
        }
        
        // create selection
        $selection = array(
            'table' =>  'requests',
            'columns' => array( 
                'timeStamp',
                'actionInfo',
                'errorInfo',
                'requestInfo'
                
            ),
            'values' => array(
                $timeStamp,
                $actionInfo,
                $errorInfo,
                $requestInfo
            )
        );
        // done create selection 
        
        // done return selection
        return $selection;
    }
}