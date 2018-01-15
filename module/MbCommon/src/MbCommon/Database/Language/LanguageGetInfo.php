<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageGetInfo.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets the a about message of the application
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

class LanguageGetInfo
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getInfo( $dataController, $infoId, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'LanguageGetInfo' );
        
        // get selection    
        $selection = $this->getSelection( $infoId, $languageId );
        
        // call select
        $result = $dataController->select( $selection );        

        // check result exists
        if( !$result || !isset( $result[0] ) ){
            // debug info
            $this->debugger->logInformation( 'Error LanguageGetInfo not found languageId: ' . $languageId . ' infoId:' . $infoId );
            
            // done
            return 'no translation found';
        }
        // done check rows exists

        // done 
        return $result[0]['translation'];

    }
    private function getSelection( $infoId, $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'info' => 'a'
            ),
            'columns'       => array( 
                'a.translation'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.infoId',
                    'value' => $infoId,
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