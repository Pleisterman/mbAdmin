<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\ColorSchemes\ColorSchemesGetList.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class handles calls to colors table in the options database
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

namespace MbCommon\Database\Options\ColorSchemes;

use Common\Service\Debugger;

class ColorSchemesGetList
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set member
        $this->debugger = $debugger;
    }        
    public function getList( $dataController ){
        // debug info
        $this->debugger->logInformation( 'get colorSchemes list ' );
        
        // create selection values
        $selectOptions = array(
            'tables'        => array( 
                'colorSchemes' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name as text'
            ),
            'order' => 'name'
        );
        // done create selection 

        // select
        $rows = $dataController->select( $selectOptions );        
        if( $rows ){
            $result['rows'] = $rows;
            return $result;
        }
        else {
            $result['rows'] = [];
            return $result;
        }
    }
}