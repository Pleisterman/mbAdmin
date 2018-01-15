<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\Colors\ColorSchemesDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls for colors 
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

namespace MbCommon\Database\Options\Colors;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Options\Colors\ColorsGetColors;
use MbCommon\Database\Options\Colors\ColorsUpdateColors;

class ColorsDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'options/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;

        // add work directory to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }     
    public function get( $what, $selection = null ){
        // debug info
        $this->debugger->logInformation( 'ColorsDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'colors': {
                // create get default languageId controller
                $controller = new ColorsGetColors( $this->configId, $this->serviceLocator, $this->debugger );
                // done 
                return $controller->getColors( $this, $selection );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error ColorsDataController get, what not found: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'ColorsDataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'list': {
                // create update row controller
                $controller = new ColorsUpdateColors( $this->debugger );
                // done call update row
                return $controller->updateColors( $this, $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'ColorsDataController update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
    public function getColors( $languageId ){
        
        // create get default languageId controller
        $controller = new ColorsGetColors( $this->configId, $this->serviceLocator, $this->debugger );
        // done 
        return $controller->getColors( $this, $languageId );
    }
}