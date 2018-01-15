<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetMessage.php
 * 
 *  Last Revision:  24-11-2016
 * 
 *  Purpose: 
 *          this class gets the a specific message according to a given id from the table
 *          messages
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
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

class LanguageGetMessage
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getMessage( $dataController, $messageId, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetMessage' );
        
        // get selection    
        $selection = $this->getSelection( $messageId, $languageId );
        
        // call select
        $result = $dataController->select( $selection );        

        // check result exists
        if( !$result || !isset( $result[0] ) ){
            // debug info
            $this->debugger->logInformation( 'Error LanguageGetMessage not found languageId: ' . $languageId . ' messageId:' . $messageId );
            
            // done
            return 'no translation found';
        }
        // done check rows exists

        // done 
        return $result[0]['translation'];

    }
    private function getSelection( $messageId, $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'messages' => 'a'
            ),
            'columns'       => array( 
                'a.translation'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.messageId',
                    'value' => $messageId,
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