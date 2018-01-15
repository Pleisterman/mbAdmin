<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: \Database\RouteError\RouteErrorGetPageInfo.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 * Purpose: 
 *      this class gets the page information for the route error page
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

class RouteErrorGetPageInfo
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getPageInfo( $dataController, $subject, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'RouteErrorGetPageInfo' );
        
        // get selection    
        $selection = $this->getSelection( $subject, $languageId );
        
        // call select
        $info = $dataController->select( $selection );        
        
        // check result
        if( !$info ){
            // debug info
            $this->debugger->logInformation( 'error RouteErrorGetPageInfo no result.' );
            // done with error
            return array( 'criticalError' => 'dataNotFound' );
        }
        // done check result
        
        // done
        return $info[0]['translation'];
    }
    private function getSelection( $subject, $languageId ) {
        
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
                    'value' => $subject,
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