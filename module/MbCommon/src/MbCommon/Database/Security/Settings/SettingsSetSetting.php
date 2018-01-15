<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\settings\SettingsSetSetting.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class updates the valeu of a setting in the settings table
 *          according to a given name
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

class SettingsSetSetting
{
    private $debugger = null; 
    
    public function __construct( Debugger $debugger  )
    {
        // set members
        $this->debugger = $debugger;
        // done set members
    }        
    public function setSetting( $dataController, $name, $value, $reason  ){
        
        // debug info
        $this->debugger->logInformation( 'SettingsSetSetting' );

        // get selection
        $selection = $this->getSelection( $name, $value, $reason );
            
        // update
        if( !$dataController->update( $selection ) ){
            // done with error
            return array( 'criticalError' => 'updateFailed' );
        }
        // done update
        
        // done 
        return [];
    }
    private function getSelection( $name, $value, $reason ) {
        
        // create selection
        $selection = array(
            'table'        =>  'settings',
            'columns'       => array( 
                'value',
                'reason'
            ),
            'whereClauses' => array(
                array(
                    'what' => 'name',
                    'compare' => '='
                )
            ),
            'values'    =>  array(
                $value, 
                $reason,
                $name
            )
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}