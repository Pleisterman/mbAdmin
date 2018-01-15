<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetLanguageById.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *      this class gets the a row from the table languages according to a
 *      given name
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

class LanguageGetLanguageById
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getLanguageById( $dataController, $languagId ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetLanguageByName' );
        
        // get selection    
        $selection = $this->getSelection( $languagId );
        
        // call select
        $row = $dataController->select( $selection );        

        // check rows exists
        if( $row && isset( $row[0] ) ){
            // set result rows
            return $row[0];
        }
        // done check rows exists

        // debug info
        $this->debugger->logInformation( 'LanguageGetLanguageByName default language not found' );

        // done not found    
        return array( 'id' => -1 );
    }
    private function getSelection( $languagId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'languages' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name', 
                'a.code'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.id',
                    'value' => $languagId,
                    'compare' => '='
                )
            ),
            'limit'     =>  1
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}