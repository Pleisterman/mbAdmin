<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\ColorSchemes\ColorSchemesDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls for colorSchemes 
 *     
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
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

namespace MbCommon\Database\Options\ColorSchemes;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Options\ColorSchemes\ColorSchemesGetList;
use MbCommon\Database\Options\ColorSchemes\ColorSchemesUpdateColors;

class ColorSchemesDataController extends MbCommonDataController   
{
    private $fileOptions = array(
        'fileName'  =>  'options/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // add work directory to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }        
    public function get( $what, $selection = null ){
        // debug info
        $this->debugger->logInformation( 'colorSchemes dataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'list': {
                $controller = new ColorSchemesGetList( $this->debugger );
                // row by id
                return $controller->getList( $this );
            }
            case 'colors': {
                $controller = new ColorSchemeGetColors( $this->debugger );
                // row by id
                return $controller->getColors( $this, $selection );
            }
            default: {
                $this->debugger->logInformation( 'error colorSchemes dataController get, what not found: ' . $what );
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'colorSchemes dataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'colors': {
                $controller = new ColorSchemesUpdateColors( $this->debugger );
                // row by id
                return $controller->updateColors( $this, $id, $values );
            }
            default: {
                $this->debugger->logInformation( 'colorSchemes dataController update, what not found: ' . $what . ' id: ' . $id );
                return array( 'error' => 'whatNotFound' );
            }
        }        
    }
    
}