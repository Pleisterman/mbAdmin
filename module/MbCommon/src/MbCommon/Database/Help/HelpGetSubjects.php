<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Help\HelpGetSubjects.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets a list off options from the options table
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

namespace MbCommon\Database\Help;

use Common\Service\Debugger;

class HelpGetSubjects
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getSubjects( $dataController, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'HelpGetSubjects' );
        
        // get selection    
        $selection = $this->getSelection( $languageId );
        
        // call select
        $subjects = $dataController->select( $selection );        
        
        // check result
        if( !$subjects ){
            // debug info
            $this->debugger->logInformation( 'error HelpGetSubjects no result.' );
            // done with error
            return array( 'criticalError' => 'dataNotFound' );
        }
        // done check result

        
        // done
        return $subjects;
    }
    private function getSelection( $languageId ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'help' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.subjectId', 
                'a.translation'
            ),
            'whereClauses'  => array(
                array(
                    'what' => 'a.languageId',
                    'value' => $languageId,
                    'compare' => '='
                ),
                array(
                    'what' => 'a.isSubject',
                    'value' => 'true',
                    'compare' => '='
                )
            ),
            'order' => 'translation'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}