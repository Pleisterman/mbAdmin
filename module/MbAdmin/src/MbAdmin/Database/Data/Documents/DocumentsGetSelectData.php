<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsGetSelectData.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with a list of documents
 *          of a given subject and id
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

namespace MbAdmin\Database\Data\Documents;

use Common\Service\Debugger;

class DocumentsGetSelectData
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getSelectData( $dataController, $options ){
        
        if( !isset( $options['subjectId'] ) || !isset( $options['subjectId'] ) ){
            return array( 'rows' => [] );
        }
        
        // debug info
        $this->debugger->logInformation( 'DocumentsGetSelectData subject: ' . $options['subject'] . ' id: ' . $options['subjectId'] );
        
        // create selection
        $selection = $this->getSelection( $options );

        // select
        $rows = $dataController->select( $selection );        
        if( $rows ){
            $result['rows'] = $rows;
            return $result;
        }
        else {
            $result['rows'] = [];
            return $result;
        }
    }
    private function getSelection( $options ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'documents' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name as text'
            ),
            'whereClauses' => array( 
                array(
                    'what' => 'a.subject',
                    'value' => $options['subject'],
                    'compare' => '='
                ),
                array(
                    'what' => 'a.subjectId',
                    'value' => $options['subjectId'],
                    'compare' => '='
                ),
                array(
                    'what' => 'a.deleted',
                    'value' => 'false',
                    'compare' => '='
                )
            ),
            'order' => 'name'
        );
        // done create selection 

        // done
        return $selection;
    }
}