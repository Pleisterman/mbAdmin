<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/ProjectContacts/ProjectContactsDataController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the timeAdministrationDataController class
 *          it controls the calls to the projects table
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

namespace MbAdmin\Database\Data\ProjectContacts;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsGetList;
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsLinkList;

class ProjectContactsDataController extends MbCommonDataController   
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
        $this->debugger->logInformation( 'ProjectContactsDataController get: ' . $what . ' select: ' . isset( $selection ) ? $selection : 'null' );
        // choose what
        switch ( $what ) {
            case 'list': {
                // create the get list controller
                $controller = new ProjectContactsGetList( $this->debugger );
                // done call get list
                return $controller->getList( $this, $selection );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'error ProjectContactsDataController get, what not found: ' . $what );
                // done with error
                return array( 'criticalError' => 'whatNotFound' );
            }
        }        
        // done choose what
    }
    public function updateData( $what, $id, $values ){
        // debug info
        $this->debugger->logInformation( 'ProjectContactsDataController update: ' . $what . ' id: ' . $id );
        // choose what
        switch ( $what ) {
            case 'link': {
                // create the link list controller
                $controller = new ProjectContactsLinkList( $this->debugger );
                // done call link list
                return $controller->link( $this, $id, $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'ProjectContactsDataController table update, what not found: ' . $what . ' id: ' . $id );
                // done with error
                return array( 'error' => 'whatNotFound' );
            }
        }        
    }
}