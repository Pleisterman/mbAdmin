<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetLanguages.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets the existing languages from the table languages
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

namespace MbCommon\Database\Language;

use Common\Service\Debugger;

class LanguageGetLanguages
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLanguages( $dataController ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetLanguages' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $result = $dataController->select( $selection );        

        // check result exists
        if( !$result || !isset( $result[0] ) ){
            // debug info
            $this->debugger->logInformation( 'error LanguageGetLanguages no result.' );
            
            // done
            return [];
        }
        // done check rows exists

        // done 
        return $result;

    }
    private function getSelection( ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'languages' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name', 
                'a.route'
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}