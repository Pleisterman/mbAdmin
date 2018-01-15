<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Help\HelpDataController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls for options 
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

namespace MbCommon\Database\Help;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Help\HelpGetSubjects;

class HelpDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'language/data.db'
    ); 
    public function __construct( $configId, $serviceLocator, Debugger $debugger  )
    {
        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }     
    public function getSubjects( $languageId ){
        // create get options controller
        $controller = new HelpGetSubjects( $this->debugger );
        // done 
        return $controller->getSubjects( $this, $languageId );
    }
}