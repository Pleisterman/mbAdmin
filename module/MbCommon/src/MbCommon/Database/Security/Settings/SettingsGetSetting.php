<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\settings\SettingsGetSetting.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets a setting from the table settings according to
 *          a given setting name
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

namespace MbCommon\Database\Security\Settings;

use Common\Service\Debugger;

class SettingsGetSetting
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function getSetting( $dataController, $name ){
        
        // debug info
        $this->debugger->logInformation( 'SettingsGetSetting' );
        
        // get selection    
        $selection = $this->getSelection( $name );
        
        // call select
        $setting = $dataController->select( $selection );        
        
        // check result
        if( $setting && isset( $setting[0] ) ){
            // done
            return $setting[0]['value'];
        }
        // done check result
        
        // debug info
        $this->debugger->logInformation( 'error SettingsGetSetting no result.' );
        // done with error
        return array( 'criticalError' => 'dataNotFound' );
    }
    private function getSelection( $name ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'settings' => 'a'
            ),
            'columns'       => array( 
                'a.value'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'a.name',
                    'value' => $name,
                    'compare' => '='
                )
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}