<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsGetLastUsed.php
 * 
 *  Last Revision:  05-04-2017
 * 
 *  Purpose: 
 *          this class gets a list of documents from the documents table
 *          with a limited size and ordered according to the used field
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
use MbAdmin\Database\Data\Documents\DocumentsCreateListText;

class DocumentsGetLastUsed
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLastUsed( $dataController ){
        // debug info
        $this->debugger->logInformation( 'DocumentsGetLastUsed' );
        
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
            // add rows to result
            $result['rows'] = $rows;
        }
        // done check rows exists

        // done     
        return $result;
    }
    private function getSelection( ) {
        
        // create selection 
        $selection = array(
            'tables'        => array( 
                'documents' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.subject', 
                'a.subjectId', 
                'a.name', 
                'a.fileName'
            ),
            'limit' => '5',
            'order' => ' used DESC'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}