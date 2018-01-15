<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\Options\OptionsDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls for options 
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


namespace MbCommon\Database\Options\Options;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Options\Options\OptionsGetOptions;
use MbCommon\Database\Options\Options\OptionsGetOption;
use MbCommon\Database\Options\Options\OptionsSetOption;

class OptionsDataController extends MbCommonDataController 
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
    public function getOptions( ){
        // create get options controller
        $controller = new OptionsGetOptions( $this->debugger );
        // done 
        return $controller->getOptions( $this );
    }
    public function getOption( $name ){
        // create set option controller
        $controller = new OptionsGetOption( $this->debugger );
        // done 
        return $controller->getOption( $this, $name );
    }
    public function setOption( $name, $values ){
        // create set option controller
        $controller = new OptionsSetOption( $this->debugger );
        // done 
        return $controller->setOption( $this, $name, $values );
    }
}