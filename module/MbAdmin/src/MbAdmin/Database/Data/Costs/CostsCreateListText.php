<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Costs/CostsCreateListText.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class adds a text for lists to a list of costs
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

namespace MbAdmin\Database\Data\Costs;

use Common\Service\Debugger;

class CostsCreateListText
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function createListText( &$row ){
        // debug info
        $this->debugger->logInformation( 'CostsCreateListText ' );

        // create text
        $text = substr( $row['date'], 6, 2 );
        $text .= '-';
        $text .= substr( $row['date'], 4, 2 );
        $text .= '-';
        $text .= substr( $row['date'], 2, 2 );
        $text .= ' ';
        $text .= $row['description'];
        // done create text

        // add to row
        $row['text'] = $text;
    }
}