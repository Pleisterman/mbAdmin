<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetDocumentHeaderTranslations.php
 * 
 *  Last Revision:  18-01-2017
 * 
 *  Purpose: 
 *      this class gets the translations for the layout for the index page
 *      from the table translations
 *                      
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2016 Pleisterman 
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

class LanguageGetDocumentHeaderTranslations
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getDocumentHeaderTranslations( $dataController, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetDocumentHeaderTranslations' );
        
        // get selection    
        $selection = $this->getSelection( $languageId );
        
        // call select
        $rows = $dataController->select( $selection );        

        // check rows exists
        if( $rows  ){
            // set result rows
            return $rows;
        }
        // done check rows exists

        // debug info
        $this->debugger->logInformation( 'LanguageGetDefaultLanguageId default language not found' );

        // done not found    
        return array( 'id' => -1 );
    }
    private function getSelection( $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'translations' => 'a'
            ),
            'columns'       => array( 
                'a.translationId', 
                'a.translation'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.languageId',
                    'value' => $languageId,
                    'compare' => '='
                ),
                array(
                    'what' => 'a.isHeaderTranslation',
                    'compare' => '= "true" '
                )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}