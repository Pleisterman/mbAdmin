<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Costs/CostsExportAddTotals.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class adds totals to the costs export
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

class CostsExportAddTotals
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function addTotals( $selection, &$rows ){
        // no rows
        if( count( $rows ) == 0 ){
            return;
        }
        // done no rows
        
        // which totals
        switch ( $selection ) {
            case 'noTotals': {
                // done nothing to do
                break;
            }
            case 'weekTotals': {
                // not implemented
                array_push( $rows, array( 'week' ) );
                // done
                break;
            }
            case 'monthTotals': {
                // not implemented
                array_push( $rows, array( 'month' ) );
                // done
                break;
            }
            case 'endTotal': {
                // add end totals
                $this->addEndTotal( $rows );
                // done
                break;
            }
            default: {
                $this->debugger->logInformation( 'error CostsExportAddTotals, selection not found selection: ' . $selection );
            }
        }        
        // done which totals
    }        
    private function addEndTotal( &$rows ){
        // create total
        $total = 0;
        
        // loop over rows
        for( $i = 0; $i < count( $rows ); $i++ ){
            // add row total
            $total += $rows[$i]['endTime'] - $rows[$i]['startTime'];
        }
        // done loop over rows
        
        // create new empty row
        $emptyRow = array_fill( 0, count( $rows[0] ), null );
        // add empty row to rows
        array_push( $rows, $emptyRow );
        // create totals rows
        $totalRow = array_fill( 0, count( $rows[0] ), null );
        
        // set row values
        $totalRow[0] = 'Total:';
        $hours = floor( $total / 100 );
        $minutes = sprintf( '%0.2d', $total % 100 );
        $totalRow[1] = $hours . ':' . $minutes;
        $totalRow[2] = 'uur';
        // done set row values
        
        // add total row to rows
        array_push( $rows, $totalRow );
    }
}