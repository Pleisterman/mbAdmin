<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetTranslation.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets the a translation from the table translations 
 *          according to a given tranlationId
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

namespace MbCommon\Database\Language;

use Common\Service\Debugger;

class LanguageGetTranslation
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getTranslation( $dataController, $translationId, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetTranslation' );
        
        // get selection    
        $selection = $this->getSelection( $translationId, $languageId );
        
        // call select
        $result = $dataController->select( $selection );        

        // check result exists
        if( !$result || !isset( $result[0] ) ){
            // debug info
            $this->debugger->logInformation( 'error LanguageGetTranslation no result.' );
            
            // done
            return 'no translation found';
        }
        // done check rows exists

        // done 
        return $result[0]['translation'];

    }
    private function getSelection( $translationId, $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'translations' => 'a'
            ),
            'columns'       => array( 
                'a.translation'
            ),
            'whereClauses'  => array(
                array(
                    'what' => 'a.languageId',
                    'value' => $languageId,
                    'compare' => '='
                ),
                array(
                    'what' => 'a.translationId',
                    'value' => $translationId,
                    'compare' => '='
                )
            ),
            'limit'   =>  1
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}