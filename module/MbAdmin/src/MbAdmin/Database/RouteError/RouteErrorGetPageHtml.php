<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: \Database\RouteError\RouteErrorGetPageHtml.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 * Purpose: 
 *      this class gets the page html for the route error page
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

namespace MbAdmin\Database\RouteError;

use Common\Service\Debugger;

class RouteErrorGetPageHtml
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getPageHtml( $dataController, $languageId, $languageCameFromRoute ){
        
        // debug info
        $this->debugger->logInformation( 'RouteErrorGetPageHtml' );
        
        // get single language selection    
        $selection = $this->getLanguageSelection( $languageId );
        
        $translations = array();
        
        // call select
        $selectedLanguageResult = $dataController->select( $selection );        
        // check result
        if( !$selectedLanguageResult ){
            // debug info
            $this->debugger->logInformation( 'error RouteErrorGetPageHtml no result.' );
            // done with error
            return array( 'criticalError' => 'dataNotFound' );
        }
        // done check result
        
        // add to translation
        array_push( $translations, $selectedLanguageResult[0]['translation'] );
        
        // language came from route
        if( !$languageCameFromRoute ){
            // get other languages selection    
            $selection = $this->getOtherLanguagesSelection( $languageId );
            // call select
            $otherLanguagesResult = $dataController->select( $selection );        
            // check result
            if( !$otherLanguagesResult ){
                // debug info
                $this->debugger->logInformation( 'error RouteErrorGetPageHtml no result.' );
                // done with error
                return array( 'criticalError' => 'dataNotFound' );
            }
            // done check result
            
            // loop over result
            for( $i = 0; $i < count( $otherLanguagesResult ); $i++ ){
                // add to translation
                array_push( $translations, $otherLanguagesResult[$i]['translation'] );
            }
            // done loop over result
        }
        // done language came from route
        
        // done
        return $translations;
    }
    private function getOtherLanguagesSelection( $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'routeError' => 'a'
            ),
            'whereClauses'  => array(
                array(
                    'what' => 'a.languageId',
                    'value' => $languageId,
                    'compare' => '!='
                ),
                array(
                    'what' => 'a.subject',
                    'value' => 'html',
                    'compare' => '='
                )
            ),
            'columns'       => array( 
                'a.translation'
            )
        );
        // done create selection 
                
        // done 
        return $selection;
    }
    private function getLanguageSelection( $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'routeError' => 'a'
            ),
            'whereClauses'  => array(
                array(
                    'what' => 'a.languageId',
                    'value' => $languageId,
                    'compare' => '='
                ),
                array(
                    'what' => 'a.subject',
                    'value' => 'html',
                    'compare' => '='
                )
            ),
            'columns'       => array( 
                'a.translation'
            )
        );
        // done create selection 
                
        // done 
        return $selection;
    }
}