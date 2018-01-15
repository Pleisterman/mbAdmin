<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\ColorSchemes\ColorSchemesUpdateColors.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles calls to colors table in the options database
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

namespace MbCommon\Database\Options\ColorSchemes;

use Common\Service\Debugger;

class ColorSchemesUpdateColors
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function updateColors( $dataController, $colorSchemaId, $colors ){
        $result = array();
        // debug info
        $this->debugger->logInformation( 'updateColors colorSchemes ' );
        
        foreach ( $colors as $color ){
            // create selection values
            $selection = array(
                'table'        =>  'colorSchemeColors',
                'columns'       => array( 
                    'color'
                ),
                'whereClauses' => array(
                    array( 
                        'what' => 'colorId',
                        'compare' => '='
                    ),
                    array( 
                        'what' => 'colorSchemeId',
                        'compare' => '='
                    )
                ),
                'values'    =>  array(
                    $color['value'],
                    $color['id'],
                    $colorSchemaId
                )
            );
            // done create selection 
            
            // update
            if( !$dataController->update( $selection ) ){
                $result['criticalError'] = 'updateFailed';
                return $result;
            }
        }
        return $result;
    }
}