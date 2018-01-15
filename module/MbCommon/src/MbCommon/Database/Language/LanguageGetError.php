<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetError.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets the a specific error according to a given id from the table
 *          errors
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

class LanguageGetError
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getError( $dataController, $errorId, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetError' );
        
        // get selection    
        $selection = $this->getSelection( $errorId, $languageId );
        
        // call select
        $result = $dataController->select( $selection );        

        // check result exists
        if( !$result || !isset( $result[0] ) ){
            // debug info
            $this->debugger->logInformation( 'Error LanguageGetError not found languageId: ' . $languageId . ' errorId:' . $errorId );
            
            // done
            return 'no translation found';
        }
        // done check rows exists

        // done 
        return $result[0]['translation'];

    }
    private function getSelection( $errorId, $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'errors' => 'a'
            ),
            'columns'       => array( 
                'a.translation'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.errorId',
                    'value' => $errorId,
                    'compare' => '='
                ),
                array(
                    'what' => 'a.languageId',
                    'value' => $languageId,
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