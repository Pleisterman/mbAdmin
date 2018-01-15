<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /Export/CsvExport.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 * Purpose: this class creates an csv file according to a provided
 *          dataArray
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

namespace MbAdmin\Export;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class CsvExport
{
    private $debugger = null;
    private $configId = 'MbAdmin'; 
    private $config = array( 
        'dataDir'              => 'data/MbAdmin/'
    );
    private $exportDir = null;
    private $exportFile = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store user directory
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

        $this->exportFile = fopen( $this->exportDir . 'export.txt', "wb");
        chmod( $this->exportDir . 'export.txt', 0755 );

        if( $selection['addHeaders'] == 'true' ){
            $this->addDataHeaders( $selection, $data );
        }
        $this->addData( $selection, $data );
        
        fclose( $this->exportFile );

        $result = [];    
        $result['file'] = $this->exportDir . 'export.txt';
        return $result;
    }
    private function addDataHeaders( $selection, $data ) {
        if( !isset( $data['headers'] ) ){
            return;
        }
        
        for( $i = 0; $i < count( $data['headers'] ); $i++ ){
            fwrite( $this->exportFile, $data['headers'][$i] );
            if( $i < count( $data['headers'] ) - 1 ){
                fwrite( $this->exportFile, $selection['delimiter'] );
            }
        }
        fwrite( $this->exportFile, "\r\n" );
        
        
    }
    private function addData( $selection, $data ) {
        if( !isset( $data['rows'] ) ){
            return;
        }
        
        foreach( $data['rows'] as $row ){
            $i = 0;
            forEach( $row as $id => $value ){
                fwrite( $this->exportFile, $value );
                if( $i < count( $row ) - 1 ){
                    fwrite( $this->exportFile, $selection['delimiter'] );
                }
                $i++;
            }
            fwrite( $this->exportFile, "\r\n" );
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
