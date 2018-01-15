<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Costs/CostsGetLastUsed.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets a list of costs from the costs table
 *          with a limited size and ordered according to the used field
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

namespace MbAdmin\Database\Data\Costs;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Costs\CostsCreateListText;

class CostsGetLastUsed
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLastUsed( $dataController ){
        // debug info
        $this->debugger->logInformation( 'CostsGetLastUsed' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $rows = $dataController->select( $selection );        

        // create result
        $result = array(
            'rows'  => []
        );
        
        // check rows exists
        if( $rows ){
            // create list text controller
            $textController = new CostsCreateListText( $this->debugger );
            
            // add rows texts
            forEach( $rows as $row ) {
                // add text
                $textController->createListText( $row );
                // create result row
                $resultRow = array(
                    'id' => $row['id'],
                    'text' => $row['text']
                );
                // done create result row
                
                // add result row to result
                array_push( $result['rows'], $resultRow );
            }
            // done add rows texts

        }
        // done check rows exists

        // done     
        return $result;
    }
    private function getSelection( ) {
        
        // create selection 
        $selection = array(
            'tables'        => array( 
                'costs' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.description', 
                'a.date', 
                'a.price'
            ),
            'limit' => '5',
            'order' => ' used DESC'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}