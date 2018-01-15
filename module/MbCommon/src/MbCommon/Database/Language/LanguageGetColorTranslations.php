<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetColorTranslations.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets the translations for the colornames from the table 
 *          colorNames
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

class LanguageGetColorTranslations
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getColorTranslations( $dataController, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetColorTranslations' );
        
        // get selection    
        $selection = $this->getSelection( $languageId );
        
        // call select
        $result = $dataController->select( $selection );        

        // check result exists
        if( !$result || !isset( $result[0] ) ){
            // debug info
            $this->debugger->logInformation( 'error LanguageGetColorTranslations no result.' );
            
            // done
            return [];
        }
        // done check rows exists

        // done 
        return $result;

    }
    private function getSelection( $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'colorNames' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name', 
                'a.translation'
            ),
            'whereClauses'  => array(
                array(
                    'what' => 'a.languageId',
                    'value' => $languageId,
                    'compare' => '='
                )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}