<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\Options\OptionsGetOption.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets a list off options from the options table
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

namespace MbCommon\Database\Options\Options;

use Common\Service\Debugger;

class OptionsGetOption
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getOption( $dataController, $name ){
        
        // debug info
        $this->debugger->logInformation( 'OptionsGetOption' );
        
        // get selection    
        $selection = $this->getSelection( $name );
        
        // call select
        $option = $dataController->select( $selection );        
        
        // check result
        if( !$option ){
            // debug info
            $this->debugger->logInformation( 'error OptionsGetOption no result.' );
            // done with error
            return array( 'criticalError' => 'dataNotFound' );
        }
        // done check result

        
        // done
        return $option[0]['value'];
    }
    private function getSelection( $name ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'options' => 'a'
            ),
            'whereClauses' => array(
                array( 
                    'what'      =>  'name',
                    'compare'   =>  '=',
                    'value'     =>  $name
                )
            ),
            'columns'       => array( 
                'a.id', 
                'a.value'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}