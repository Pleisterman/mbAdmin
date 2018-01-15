<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\Options\OptionsSetOption.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates a row of a given option name in the options table
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

namespace MbCommon\Database\Options\Options;

use Common\Service\Debugger;

class OptionsSetOption
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function setOption( $dataController, $name, $values ){
        // debug info
        $this->debugger->logInformation( 'OptionsSetOption name: ' . $name );
    
        // get selection    
        $selection = $this->getSelection( $name, $values );
        
        // create result
        $result = [];

        // update
        if( !$dataController->update( $selection ) ){
            // set critical error
            $result['criticalError'] = 'updateFailed';
            // done error
            return $result;
        }
        // done update

        // done 
        return $result;
    }
    private function getSelection( $name, $values ) {
        
        // create selection values
        $selection = array(
            'table'        =>  'options',
            'columns'       => array( 
                'value'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'name',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $values['value'],
                $name
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}