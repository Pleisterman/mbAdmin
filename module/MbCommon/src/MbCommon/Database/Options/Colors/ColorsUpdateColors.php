<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\Colors\ColorsUpdateColors.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates the colorValue of a list of colors in the colors table
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

namespace MbCommon\Database\Options\Colors;

use Common\Service\Debugger;

class ColorsUpdateColors
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function updateColors( $dataController, $colors ){
        
        // debug info
        $this->debugger->logInformation( 'ColorsUpdateColors' );

        // create result
        $result = [];

        // loop over colors
        foreach ( $colors as $color ){
            // get selection
            $selection = $this->getSelection( $color['id'], $color['value'] );
            
            // update
            if( !$dataController->update( $selection ) ){
                $result['criticalError'] = 'updateFailed';
                return $result;
            }
            // done update
        }        
        // done loop over colors
        
        // done 
        return $result;
    }
    private function getSelection( $id, $value ) {
        
        // create selection
        $selection = array(
            'table'        =>  'colors',
            'columns'       => array( 
                'color'
            ),
            'whereClauses' => array(
                array( 
                    'what' => 'id',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $value,
                $id
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}