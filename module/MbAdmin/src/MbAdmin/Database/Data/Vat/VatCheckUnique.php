<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Vat/VatCheckNameUnique.php
 * 
 *  Last Revision:  26-01-2017
 * 
 *  Purpose: 
 *          this class checks if a name is unique before updating or inserting data
 *          into the vat table
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

namespace MbAdmin\Database\Data\Vat;

use Common\Service\Debugger;

class VatCheckUnique
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkUnique( $dataController, $id, $values, $isUpdate ){
        // get selection    
        $selection = $this->getSelection( $id, $values, $isUpdate );
        
        // select row
        $row = $dataController->select( $selection );        

        // create result
        $result = [];

        // check row exists
        if( $row[0]['count'] != 0 ){
            // add name exists error
            $result['error'] = 'descriptionExists';
        }
        // done check row exists
        
        // done
        return $result;
        
    }
    private function getSelection( $id, $values, $isUpdate ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'vat' => 'a'
            ),
            'columns'       => array( 
                'count() as count'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.description',
                    'value' => $values['description'],
                    'compare' => '='
                )
            )
        );
        // done create selection 
        
        // is update
        if( $isUpdate ){
            // create update clause 
            $updateClause  = array(
                'what' => 'a.id',
                'value' => $id,
                'compare' => '<>'
            );
            // done create update clause 
            
            // add update clause
            array_push( $selection['whereClauses'], $updateClause );
        }
        // done is update
    
        // done 
        return $selection;
    }
}