<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /Export/ExcelExport.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
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

namespace MbAdmin\Export;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class HtmlExport
{
    private $debugger = null;
    private $configId = null; 
    private $config = array( 
        'dataDir'              => 'data/mbAdmin/'
    );
    private $exportDir = null;
    private $exportFile = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
        // debug info
        $this->debugger->logInformation( 'HtmlExport construct' );
        // get the configuration
        $this->getConfig( $serviceLocator );
        // add user directory to path
        $this->exportDir = $this->config['dataDir'] . 'data/' . $workDirectory . '/export/';
    }
    public function export( $selection, $data ){
        $this->debugger->logInformation( 'HtmlExport export' );

        $this->exportFile = fopen( $this->exportDir . 'export.html', "wb");
        chmod( $this->exportDir . 'export.html', 0755 );

        $this->addHtml( $selection, $data );
        
        fclose( $this->exportFile );

        $result = [];    
        $result['file'] = $this->exportDir . 'export.html';
        return $result;
    }
    private function addHtml( $selection, $data ){

        fwrite( $this->exportFile, '<html>' . "\r\n" );

        $this->addHtmlHeader();
        
        $this->addBody( $selection, $data );

        fwrite( $this->exportFile, '</html>' . "\r\n" );
        
    }
    private function addHtmlHeader( ) {
        fwrite( $this->exportFile, '<head>' . "\r\n" );
        fwrite( $this->exportFile, '</head>' . "\r\n" );
    }
    private function addBody( $selection, $data ) {
        fwrite( $this->exportFile, '<body>' . "\r\n" );
        
        fwrite( $this->exportFile, '<table>' . "\r\n" );

        if( $selection['addHeaders'] == 'true' ){
            // add data headers
            $this->addDataHeaders( $data );
        }
        
        // add data 
        $this->addData( $data );

        fwrite( $this->exportFile, '</table>' . "\r\n" );

        fwrite( $this->exportFile, '</body>' . "\r\n" );
    }
    private function addDataHeaders( $data ) {
        if( !isset( $data['headers'] ) ){
            return;
        }
        
        fwrite( $this->exportFile, '<tr>' . "\r\n" );
        for( $i = 0; $i < count( $data['headers'] ); $i++ ){
            fwrite( $this->exportFile, '<td style="padding:0.2em;font-weight:bold;">' . "\r\n" );
            fwrite( $this->exportFile, $data['headers'][$i] . "\r\n" );
            fwrite( $this->exportFile, '</td>' . "\r\n" );
        }
        fwrite( $this->exportFile, '</tr>' . "\r\n" );
        
        
    }
    private function addData( $data ) {
        if( !isset( $data['rows'] ) ){
            return;
        }
        
        foreach( $data['rows'] as $row ){
            fwrite( $this->exportFile, '<tr>' . "\r\n" );
            forEach( $row as $id => $value ){
                fwrite( $this->exportFile, '<td style="padding:0.2em;">' . "\r\n" );
                fwrite( $this->exportFile, $value . "\r\n" );
                fwrite( $this->exportFile, '</td>' . "\r\n" );
            }
            fwrite( $this->exportFile, '</tr>' . "\r\n" );
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
