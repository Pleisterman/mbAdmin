<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/ReadController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose:  
 *          This controller handles the route MbAdmin\Read
 *          the route is used to read data from the database
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

namespace MbAdmin\Controller;

use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Http\Headers;
use Zend\Http\Response\Stream;
use Common\Service\Debugger;
use MbCommon\Security\Authentification\AuthentificationController;
use MbCommon\Database\Options\ColorSchemes\ColorSchemesDataController;
use MbCommon\Database\Options\Colors\ColorsDataController;
use MbAdmin\Database\Data\Vat\VatDataController;
use MbAdmin\Database\Data\Projects\ProjectsDataController;
use MbAdmin\Database\Data\ProjectContacts\ProjectContactsDataController;
use MbAdmin\Database\Data\Contacts\ContactsDataController;
use MbAdmin\Database\Data\ContactProjects\ContactProjectsDataController;
use MbAdmin\Database\Data\Vehicles\VehiclesDataController;
use MbAdmin\Database\Data\Tasks\TasksDataController;
use MbAdmin\Database\Data\Costs\CostsDataController;
use MbAdmin\Database\Data\Rides\RidesDataController;
use MbAdmin\Database\Data\Documents\DocumentsDataController;

class ReadController extends AbstractActionController
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
        $selection = $postData['selection'];
        $lastUpdated = $postData['lastUpdated'];
        // done get post data

        // user directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $this->workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done user directory ! exists 
        
        // create debuggerId
        $debugfileName = $procesId . '_' . $this->workDirectory;
        if( $subject == 'file' ){
            // add postfix
            $debugfileName .= '_readFile_' . $subject;
        }
        else if ( $subject == 'documents' && $what == 'documentContent' ){
            // add postfix
            $debugfileName .= '_read_' . $subject . '_' . $what;
        }
        else {
            // add postfix
            $debugfileName .= '_read_' . $subject . '_' . $what . '_'. $procesId;
        }
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        // debug info
        $this->debugger->logInformation( ' readController start' );
        

        // create security class
        $this->authentificationController = new AuthentificationController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // check login
        $authentificationResult = $this->authentificationController->validateLogin( $pageToken, $request );
        // done check login
        
        
        // check authentication result
        if( isset( $authentificationResult['criticalError'] ) ){
            // set result
            $result = $authentificationResult;
            // debug info
            $this->debugger->LogInformation(' ReadController login failed' );
        }
        else {
            
            // read data
            $result = $this->readData( $subject, $what, $selection, $lastUpdated );
            // debug info
            $this->debugger->LogInformation( 'read data ok' );

            if( $subject == 'documents' && $what == 'documentContent' ){
                // done return document content
                return $result;
            }

            if( $subject == 'file' ){
                // done return file
                return $result;
            }
            // debug info
            $this->debugger->LogInformation(' ReadController all ok' );
        }
        // done check authentication result
        
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $result ) ) );
        return $response;        
        // done return the response
    }
    private function readData( $subject, $what, $selection, $lastUpdated ) {
        // debug info
        $this->debugger->logInformation( 'ReadController readData subject: ' . $subject );

        // choose subject
        switch ( $subject ) {
            case 'authentification': {
                // done 
                return $this->authentificationController->get( $what, $selection );
            }
            case 'vat': {
                // create controller
                $vatController = new VatDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $vatController->get( $what, $selection, $lastUpdated );
            }
            case 'projects': {
                // create controller
                $projectsController = new ProjectsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $projectsController->get( $what, $selection, $lastUpdated );
            }
            case 'projectContacts': {
                // create controller
                $projectContactsController = new ProjectContactsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $projectContactsController->get( $what, $selection );
            }
            case 'contacts': {
                // create controller
                $contactsController = new ContactsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $contactsController->get( $what, $selection, $lastUpdated );
            }
            case 'contactProjects': {
                // create controller
                $contactProjectsController = new ContactProjectsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $contactProjectsController->get( $what, $selection );
            }
            case 'vehicles': {
                // create controller
                $vehiclesController = new VehiclesDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $vehiclesController->get( $what, $selection, $lastUpdated );
            }
            case 'tasks': {
                // create controller
                $tasksController = new TasksDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $tasksController->get( $what, $selection );
            }
            case 'costs': {
                // create controller
                $costsController = new CostsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $costsController->get( $what, $selection );
            }
            case 'rides': {
                // create controller
                $ridesController = new RidesDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $ridesController->get( $what, $selection );
            }
            case 'documents': {
                // create controller
                $documentsController = new DocumentsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $documentsController->get( $what, $selection );
            }
            case 'colors': {
                // create controller
                $colorsController = new ColorsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $colorsController->get( $what, $selection );
            }
            case 'colorSchemes': {
                // create controller
                $colorSchemesController = new ColorSchemesDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done 
                return $colorSchemesController->get( $what, $selection );
            }
            case 'file': {
                // debug info
                $this->debugger->LogInformation('read file: ' . $what );
                
                // create stream
                $response = new Stream();
                $response->setStream( fopen( $what, 'r' ) );
                $response->setStatusCode( 200 );
                $response->setStreamName( basename( $what ) );
                $headers = new Headers();
                $headers->addHeaders(array(
                    'Content-Disposition' => 'attachment; filename="' . basename( $what ) .'"',
                    'Content-Type' => 'application/octet-stream',
                    'Content-Length' => filesize( $what )
                ));
                $response->setHeaders( $headers );
                // done
                return $response;
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'Error ReadController readData subject not found ' );
                // done with error
                return array( 'error' => 'SubjectNotFound' );
            }
        }        
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