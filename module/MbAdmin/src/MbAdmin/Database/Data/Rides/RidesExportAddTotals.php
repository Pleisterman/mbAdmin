<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesExportAddTotals.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class adds totals to the rides export
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

namespace MbAdmin\Database\Data\Rides;

use Common\Service\Debugger;

class RidesExportAddTotals
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
                return;
            }
            case 'weekTotals': {
                // not implemented
                array_push( $rows, array( 'week' ) );
                // done
                return;
            }
            case 'monthTotals': {
                // not implemented
                array_push( $rows, array( 'month' ) );
                // done
                return;
            }
            case 'endTotal': {
                // add end totals
                $this->addEndTotal( $rows );
                // done
                return;
            }
            default: {
                $this->debugger->logInformation( 'error RidesExportAddTotals, selection not found selection: ' . $selection );
            }
        }        
    }        
    private function addEndTotal( &$rows ){
        // create total
        $total = 0;
        
        // loop over rows
        for( $i = 0; $i < count( $rows ); $i++ ){
            // add row total
            $total += $rows[$i]['odometerEnd'] - $rows[$i]['odometerStart'];
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
        $totalRow[1] = $total;
        // done set row values
        
        // add total row to rows
        array_push( $rows, $totalRow );
    }
}