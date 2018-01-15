<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tasks/TasksCreateListText.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class adds a text for lists to a list of tasks
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

namespace MbAdmin\Database\Data\Tasks;

use Common\Service\Debugger;

class TasksCreateListText
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function createListText( &$row ){
        // debug info
        $this->debugger->logInformation( 'TasksCreateListText ' );

        // create text
        $text = substr( $row['date'], 6, 2 );
        $text .= '-';
        $text .= substr( $row['date'], 4, 2 );
        $text .= '-';
        $text .= substr( $row['date'], 2, 2 );
        $text .= ' ';
        $text .= substr( $row['startTime'], 0, 2 );
        $text .= ':';
        $text .= substr( $row['startTime'], 2, 2 );
        $text .= ' ';
        $text .= substr( $row['endTime'], 0, 2 );
        $text .= ':';
        $text .= substr( $row['endTime'], 2, 2 );
        $text .= ' ';
        $text .= $row['description'];
        // done create text

        // add to row
        $row['text'] = $text;
    }
}