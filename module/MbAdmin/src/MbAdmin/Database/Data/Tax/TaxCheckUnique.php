<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tax/TaxCheckNameUnique.php
 * 
 *  Last Revision:  26-01-2017
 * 
 *  Purpose: 
 *          this class checks if a name is unique before updating or inserting data
 *          into the tax table
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

namespace MbAdmin\Database\Data\Tax;

use Common\Service\Debugger;

class TaxCheckUnique
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function checkUnique( $dataController, $vehicleId, $name, $isUpdate ){
        // get selection    
        $selection = $this->getSelection( $vehicleId, $name, $isUpdate );
        
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
    private function getSelection( $vehicleId, $name, $isUpdate ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'tax' => 'a'
            ),
            'columns'       => array( 
                'count() as count'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.description',
                    'value' => $description,
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
                'value' => $vehicleId,
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