<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ContactProjects/ContactProjectsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the projectContacts table
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

namespace MbAdmin\Database\Data\ContactProjects;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\ContactProjects\ContactProjectsGetList;
use MbAdmin\Database\Data\ContactProjects\ContactProjectsLinkList;

class ContactProjectsDataController extends MbCommonDataController
{
    private $fileOptions = array(
        'fileName'  =>  'data/data.db'
    ); 
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // add user directory to path
        $this->fileOptions['fileName'] = 'data/' . $workDirectory . '/' . $this->fileOptions['fileName'];

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }        
    public function get( $what, $selection = null ){
        // debug info
        $this->debugger->logInformation( 'ContactProjectsDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'list': {
                // create the get list controller
                $controller = new ContactProjectsGetList( $this->debugger );
                // done call get list
                return $controller->getList( $this, $selection );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error ContactProjectsDataController get, what not found: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'ContactProjectsDataController updateData: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'link': {
                // create link controller
                $controller = new ContactProjectsLinkList( $this->debugger );
                // done call link
                return $controller->link( $this, $id, $values );
            }
            default: {
                // debug info 
                $this->debugger->logInformation( 'error ContactProjectsDataController update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
}