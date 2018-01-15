<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetDefaultLanguage.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets the default language row from the table languages
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

namespace MbCommon\Database\Language;

use Common\Service\Debugger;

class LanguageGetDefaultLanguage
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getDefaultLanguage( $dataController ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetDefaultLanguage' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $row = $dataController->select( $selection );        

        // check rows exists
        if( $row && isset( $row[0] ) ){
            // set result rows
            return $row[0];
        }
        // done check rows exists

        // debug info
        $this->debugger->logInformation( 'LanguageGetDefaultLanguage default language not found' );

        // done not found    
        return array( 'id' => -1 );
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
                'a.code',
                'a.isDefault'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.isDefault',
                    'compare' => '= "true" '
                )
            ),
            'limit'     =>  1
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}