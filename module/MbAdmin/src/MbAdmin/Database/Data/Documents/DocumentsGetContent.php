<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Documents/DocumentsGetContent.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this class gets the content of a document and returns it as an
 *          attachment
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

namespace MbAdmin\Database\Data\Documents;

use Zend\Http\Headers;
use Zend\Http\Response\Stream;
use Common\Service\Debugger;

class DocumentsGetContent
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $workDirectory = null;
    private $configId = null; 
    private $config = array( 
        'dataDir'              => 'data/mbAdmin/'
    );
    
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store user directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;

        // get config values
        $this->getConfig();
    }        
    public function getContent( $dataController, $id ){
        
        // get selection    
        $selection = $this->getSelection( $id );
        // select
        $rows = $dataController->select( $selection );        
        if( !$rows || isset( $rows['criticalError'] ) ){
            return array( 'error', 'documentNotFound' );
        }

        $documentsDir = $this->config['dataDir'] . 'data/' . $this->workDirectory . '/documents/';
        // get file dir and file name
        $file = $documentsDir . $rows[0]['fileName'];
        // debug info
        $this->debugger->logInformation( 'filename: ' . $file );
        
        // create stream
        $response = new Stream();
        $response->setStream( fopen( $file, 'r' ) );
        $response->setStatusCode( 200 );
        $response->setStreamName( basename( $file ) );
        // done create stream

        // create headers
        $headers = new Headers();
        $headers->addHeaders(array(
            'Content-Disposition'   =>  'attachment; filename="' . basename( $file ) .'"',
            'Content-Type'          =>  'application/octet-stream',
            'Content-Length'        =>  filesize( $file )
        ));
        // done create headers

        // set response headers
        $response->setHeaders( $headers );
        
        // done 
        return $response;
    }
    private function getSelection( $id ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'documents' => 'a'
            ),
            'columns'       => array( 
                'a.fileName'
            ),
            'whereClauses' => array( 
                array(
                    'what' => 'a.id',
                    'value' => $id,
                    'compare' => '='
                )
            ),
            'limit' => '1'
        );
        // done create selection 
        
        // done 
        return $selection;
    }
    private function getConfig( ){
        // read the configuration
        $config = $this->serviceLocator->get( 'config' )[$this->configId];
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