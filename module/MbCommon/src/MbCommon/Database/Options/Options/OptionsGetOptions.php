<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\Options\OptionsGetOptions.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets a list off options from the options table
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

class OptionsGetOptions
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getOptions( $dataController ){
        
        // debug info
        $this->debugger->logInformation( 'OptionsGetOptions' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $options = $dataController->select( $selection );        
        
        // check result
        if( !$options ){
            // debug info
            $this->debugger->logInformation( 'error OptionsGetOptions no result.' );
            // done with error
            return array( 'criticalError' => 'dataNotFound' );
        }
        // done check result

        
        // done
        return $options;
    }
    private function getSelection( ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'options' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name', 
                'a.value'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}