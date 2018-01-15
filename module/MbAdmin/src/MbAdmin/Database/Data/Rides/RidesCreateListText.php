<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Rides/RidesCreateListText.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class adds a text for lists to a list of rides
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
namespace MbAdmin\Database\Data\Rides;

use Common\Service\Debugger;

class RidesCreateListText
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function createListText( &$row ){
        // debug info
        $this->debugger->logInformation( 'createInfoText ' );

        // create text
        $text = substr( $row['date'], 6, 2 );
        $text .= '-';
        $text .= substr( $row['date'], 4, 2 );
        $text .= '-';
        $text .= substr( $row['date'], 2, 2 );
        $text .= ' ';
        $text .= $row['odometerStart'];
        $text .= '-'; 
        $text .= $row['odometerEnd'];
        $text .= '<br>'; 
        $text .= $row['description'];
        $text .= ' ';
        $text .= $row['fromDescription'];
        $text .= ' ';
        $text .= $row['toDescription'];
        $text .= '<br>';
        $text .= $row['name'];
        $text .= ' ';
        $text .= $row['identification'];
        // done create text

        // add to row
       $row['text'] = $text;
    }
}