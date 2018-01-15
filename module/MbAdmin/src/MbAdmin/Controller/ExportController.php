<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Controller/ExportController.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          This controller handles the route MbAdmin\Export
 *          The result is a html, txt or excel file with data 
 *          according to a given subject        
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
use MbAdmin\Database\Data\Tasks\TasksDataController;
use MbAdmin\Database\Data\Rides\RidesDataController;
use MbAdmin\Export\HtmlExport;
use MbAdmin\Export\CsvExport;
use MbAdmin\Export\ExcelExport;

class ExportController extends AbstractActionController
{
    // members
    private $debugger = null;
    private $workDirectory = null;
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
        // done get post data

        // user directory ! exists 
        if( !is_dir( $this->config['dataDir'] . 'data/' . $this->workDirectory ) ){
            // redirect to home
            return $this->redirect()->toRoute( $this->routeHome );
        }
        // done user directory ! exists 

        // create debuggerId
        $debugfileName = $procesId . '_' . $this->workDirectory . '_export';
        // create debugger
        $this->debugger = new Debugger( $this->configId, $this->serviceLocator, $debugfileName );
        
        // create authentification controller
        $authentificationController = new AuthentificationController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // check login
        $authentificationResult = $authentificationController->validateLogin( $pageToken, $request );
        // done check login
        

        // check authentication result
        if( isset( $authentificationResult['criticalError'] ) ){
            // set result
            $result = $authentificationResult;
            // debug info
            $this->debugger->LogInformation(' ExportController login failed' );
        }
        else {
            // inert data
            $result = $this->export( );
            // debug info
            $this->debugger->LogInformation(' ExportController all ok' );
        }
        // done check authentication result
        
        
        // create a response
        $response = $this->getResponse();
        // return the response
        $response->setContent(\Zend\Json\Json::encode( array( 'response' => true, 'procesId' => $procesId, 'result' => $result ) ) );
        // done 
        return $response;        
        
    }        
    private function export( ){
        // get the request
        $request = $this->getRequest();
        
        // get post data
        $postData = $request->getPost();
        $subject = $postData['subject'];
        $exportType = $postData['exportType'];
        $what = $postData['what'];
        $selection = $postData['selection'];
        // done get post data
        
        // create result
        $data = [];
        
        // choose subject
        switch ( $subject ) {
            case 'tasks': {
                // debug info
                $this->debugger->logInformation( 'ExportController tasks data' );
                // create tasks data controller
                $tasksController = new TasksDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // get tasks data
                $data = $tasksController->get( $what, $selection );
                // done
                break;
            }
            case 'rides': {
                // debug info
                $this->debugger->logInformation( 'ExportController rides data' );
                // create rides data controller
                $ridesController = new RidesDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // get rides data
                $data = $ridesController->get( $what, $selection );
                // done
                break;
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'ExportController error unknown subject: ' . $subject );
                // done with error
                return array( 'criticalError' => 'exportFailed' );
            }
        }
        // done choose subject
        
        // done
        return $this->createExport( $exportType, $selection, $data );
        
    }
    private function createExport( $exportType, $selection, $data ) {
        // check no data
        if( !$data || !$data['rows'] || count( $data['rows'] ) == 0 ){
            // done with error
            return array( 'error' => 'noData' );
        }
        // done check no data
        
        switch ( $exportType ) {
            case 'exportHtml': {
                // debug info
                $this->debugger->logInformation( 'ExportController export html' );
                // create controller
                $htmlExport = new HtmlExport( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done
                return $htmlExport->export( $selection, $data );
            }
            case 'exportCsv': {
                // debug info
                $this->debugger->logInformation( 'ExportController export text' );
                // create controller
                $csvExport = new CsvExport( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done
                return $csvExport->export( $selection, $data );
            }
            case 'exportExcel': {
                // debug info
                $this->debugger->logInformation( 'ExportController export text' );
                // create controller
                $excelExport = new ExcelExport( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
                // done
                return $excelExport->export( $selection, $data );
            }
            default: {
                // debug info
                $this->debugger->logInformation( 'ExportController error unknown export type: ' . $exportType );
                // done with error
                return array( 'error' => 'exportFailed' );
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
