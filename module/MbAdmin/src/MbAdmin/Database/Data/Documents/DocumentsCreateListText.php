<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsCreateListText.php
 * 
 *  Last Revision:  05-04-2017
 * 
 *  Purpose: 
 *          this class adds a text for lists to a list of documents
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

namespace MbAdmin\Database\Data\Documents;

use Common\Service\Debugger;

class DocumentsCreateListText
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function createListText( &$row ){
        // debug info
        $this->debugger->logInformation( 'DocumentsCreateListText ' );

        // create text
        $text = $row['subject'];
        $text .= ' ';
        $text .= $row['subjectId'];
        $text .= ' ';
        $text .= $row['name'];
        $text .= ' ';
        $text .= $row['fileName'];
        // done create text

        // add to row
        $row['text'] = $text;
    }
}