<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/UpdateController.php
 * 
 *  Purpose:  
 *          This controller handles the route MbAdmin\Update
 *          the route is used to update data in the database
 *                  
 *  Last Revision:  17-01-2017
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

namespace MbAdmin\Controller;

use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\AuthentificationController;
use MbCommon\Database\Options\Colors\ColorsDataController;
use MbCommon\Database\Options\ColorSchemes\ColorSchemesDataController;
use MbCommon\Database\Options\Options\OptionsDataController;
use MbAdmin\Database\Data\Documents\DocumentsDataController;
use MbAdmin\Database\Data\Vat\VatDataController;
use MbAdmin\Database\Data\Projects\ProjectsDataController;
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsDataController;
use MbAdmin\Database\Data\Contacts\ContactsDataController;
use MbAdmin\Database\Data\ContactProjects\ContactProjectsDataController;
use MbAdmin\Database\Data\Tasks\TasksDataController;
use MbAdmin\Database\Data\Costs\CostsDataController;
use MbAdmin\Database\Data\Vehicles\VehiclesDataController;
use MbAdmin\Database\Data\Rides\RidesDataController;

class UpdateController extends AbstractActionController
{
    // members
    private $debugger = null;
    private $workDirectory = null;
    private $authentificationController = null;
    private $configId = 'mbAdmin';
    private $config = array( 
        'dataDir'                       => ''
    );
    private $routeHome = 'MbAdminRouteHome';
    // done members

    // route actions
    public function indexAction()
    {
        // get the configuration
        $this->getConfig( $this->serviceLocator );

        // get the request
        $request = $this->getRequest();
        
        // validate is post
        if ( !$request->isPost()) {
            // not a post request go to index page
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done validate is post

        // get post data
        $postData = $request->getPost();
        $procesId = $postData['procesId'];
        $this->workDirectory = $postData['workDirectory'];
        $pageToken = $postData['token'];
        $subject = $postData['subject'];
        $what = $postData['what'];
        $id = $postData['id'];
        $name = $postData['name'];
        $values = $postData['values'];
        // done get post data

        // user directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $this->workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done user directory ! exists 

        // create debuggerId
        $debugfileName = $procesId . '_' . $this->workDirectory . '_update';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );

        // create authentification controller
        $this->authentificationController = new AuthentificationController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // check login
        $authentificationResult = $this->authentificationController->validateLogin( $pageToken, $request );
        
        // check authentication result
        if( isset( $authentificationResult['criticalError'] ) ){
            // set result
            $result = $authentificationResult;
            // debug info
            $this->debugger->LogInformation(' UpdateController login failed' );
        }
        else {
            // inert data
            $result = $this->updateData( $subject, $what, $id, $name, $values );
        }
        // done check authentication result

        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $result ) ) );
        // debug info
        $this->debugger->LogInformation(' UpdateController all ok' );
        // done
        return $response;        
    }
    private function updateData( $subject, $what, $id, $name, $values ) {
        // debug info
        $this->debugger->logInformation( 'UpdateController updateData subject: ' . $subject );

        // choose subject
        switch ( $subject ) {
            case 'authentification': {
                // done 
                return $this->authentificationController->updateData( $what, $values );
            }
            case 'options': {
                // create controller
                $optionsController = new OptionsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $optionsController->setOption( $name, $values );
            }
            case 'colors': {
                // create controller
                $colorsController = new ColorsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $colorsController->updateData( $what, $id, $values );
            }
            case 'colorSchemes': {
                // create controller
                $colorSchemesController = new ColorSchemesDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $colorSchemesController->updateData( $what, $id, $values );
            }
            case 'vat': {
                // create controller
                $vatController = new VatDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $vatController->updateData( $what, $id, $values );
            }
            case 'projects': {
                // create controller
                $projectsController = new ProjectsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $projectsController->updateData( $what, $id, $values );
            }
            case 'projectContacts': {
                // create controller
                $projectContactsController = new ProjectContactsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $projectContactsController->updateData( $what, $id, $values );
            }
            case 'contacts': {
                // create controller
                $contactsController = new ContactsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $contactsController->updateData( $what, $id, $values );
            }
            case 'contactProjects': {
                // create controller
                $contactProjectsController = new ContactProjectsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $contactProjectsController->updateData( $what, $id, $values );
            }
            case 'tasks': {
                // create controller
                $tasksController = new TasksDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $tasksController->updateData( $what, $id, $values );
            }
            case 'costs': {
                // create controller
                $costsController = new CostsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $costsController->updateData( $what, $id, $values );
            }
            case 'vehicles': {
                // create controller
                $vehiclesController = new VehiclesDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $vehiclesController->updateData( $what, $id, $values );
            }
            case 'rides': {
                // create controller
                $ridesController = new RidesDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $ridesController->updateData( $what, $id, $values );
            }
            case 'documents': {
                // create controller
                $documentsController = new DocumentsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $documentsController->updateData( $what, $id, $values );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'Error UpdateController updateData subject not found ' );
                // done with error
                return false;
            }
        }
        // done choose subject
    }
    private function getConfig( ServiceLocatorInterface $serviceLocator ) {
        // read the configuration
        $config = $serviceLocator->get( 'config' )[$this->configId];
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
    }
}