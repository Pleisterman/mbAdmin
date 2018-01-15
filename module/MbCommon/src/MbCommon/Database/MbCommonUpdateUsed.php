<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\MbCommonUpdateUsed.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates the used field of a specified row in the specified table
 *                      
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 * 
 *  Zend Framework (http://framework.zend.com/)
 *
 *  @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 *  @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace MbCommon\Database;

use Common\Service\Debugger;

class MbCommonUpdateUsed
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function updateUsed( $dataController, $table, $id ){
        
        // get timeStamp
        $timeStamp = $dataController->getTimeStamp();
        
        // create selection
        $selection = $this->getSelection( $table, $id, $timeStamp );
        
        // done call update
        return $dataController->update( $selection );
    }
    private function getSelection( $table, $id, $timeStamp ){
    
        // create selection
        $selection = array(
            'table'        =>  $table,
            'columns'       => array( 
                'used'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'id',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $timeStamp,
                $id
            )
        );
        // done create selection 
        
        // done
        return $selection;
    }
}