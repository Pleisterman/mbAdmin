<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\security\settings\SettingsDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls for settings 
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
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Security\Settings\SettingsSetSetting;
use MbCommon\Database\Security\Settings\SettingsGetSetting;

class SettingsDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'authorisation/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // add user to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];
        
        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }   
    public function getSetting( $name ){
        // create set login keys controller
        $controller = new SettingsGetSetting( $this->debugger );
        // done 
        return $controller->getSetting( $this, $name );
    }
    public function setSetting( $name, $value, $reason){
        // create get login keys controller
        $controller = new SettingsSetSetting( $this->debugger );
        // done 
        return $controller->setSetting( $this, $name, $value, $reason );
    }
}