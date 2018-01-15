<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /Export/ExcelExport.php
 * 
 *  Last Revision:  17-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 * Purpose: this class creates an excel file according to a provided
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

class ExcelExport
{
    private $debugger = null;
    private $configId = null; 
    private $config = array( 
        'dataDir'              => 'data/mbAdmin/'
    );
    private $exportDir = null;
    private $exportFile = null;
    private $styles = array(
        '@page' =>  array(
            'margin:1.0in .75in 1.0in .75in',
            'mso-header-margin:.5in',
            'mso-footer-margin:.5in'
        ),
        'table' => array(
            'mso-displayed-decimal-separator:"\."',
            'mso-displayed-thousand-separator:"\,"',
        ),
        '.style0' => array(
            'mso-number-format:General',
            'text-align:left',
            'vertical-align:bottom',
            'white-space:nowrap',
            'mso-rotate:0',
            'mso-background-source:auto',
            'mso-pattern:auto',
            'color:windowtext',
            'font-size:10.0pt',
            'font-weight:400',
            'font-style:normal',
            'text-decoration:none',
            'font-family:Arial',
            'mso-generic-font-family:auto',
            'mso-font-charset:0',
            'border:0.5pt solid',
            'mso-protection:locked visible',
            'mso-style-name:Normal',
            'mso-style-id:0'
        ),
        'td'  => array(
            'mso-style-parent:style0',
            'padding-top:1px',
            'padding-right:1px',
            'padding-left:1px',
            'mso-ignore:padding',
            'color:windowtext',
            'font-family:Arial'
        )
    );
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

        $this->exportFile = fopen( $this->exportDir . 'export.xls', "wb");
        chmod( $this->exportDir . 'export.xls', 0755 );

        $this->addHeader();
        
        fwrite( $this->exportFile, '<body link=blue vlink=purple>' );
        fwrite( $this->exportFile, '<table x:str border=0 cellpadding=0 cellspacing=0 style="border-collapse: collapse;table-layout:fixed;">' );

        if( $selection['addHeaders'] == 'true' ){
            $this->addDataHeaders( $data );
        }
        $this->addData( $data );
        
        fwrite( $this->exportFile, '</table>' );
        fwrite( $this->exportFile, '</body>' );
        fwrite( $this->exportFile, '</html>' );
        
        fclose( $this->exportFile );

        $result = [];    
        $result['file'] = $this->exportDir . 'export.xls';
        return $result;
    }
    private function addHeader( ) {
        
        fwrite( $this->exportFile, '<html xmlns:o="urn:schemas-microsoft-com:office:office' );
        fwrite( $this->exportFile, 'xmlns:x="urn:schemas-microsoft-com:office:excel' );
        fwrite( $this->exportFile, 'xmlns="http://www.w3.org/TR/REC-html40">' . "\r\n" );
        
        fwrite( $this->exportFile, '<head>' . "\r\n" );
        fwrite( $this->exportFile, '<meta http-equiv=Content-Type content="text/html; charset=us-ascii">' . "\r\n" );
        fwrite( $this->exportFile, '<meta name=ProgId content=Excel.Sheet>' . "\r\n" );
        fwrite( $this->exportFile, '<!--[if gte mso 9]><xml>' . "\r\n" );
        fwrite( $this->exportFile, '<o:DocumentProperties>' . "\r\n" );
        fwrite( $this->exportFile, '<o:LastAuthor>Pleisterman UrenAdministratie</o:LastAuthor>' . "\r\n" );
        fwrite( $this->exportFile, '<o:LastSaved>' . $this->getTimeStamp() . '</o:LastSaved>' . "\r\n" );
        fwrite( $this->exportFile, '<o:Version>1.0</o:Version>' . "\r\n" );
        fwrite( $this->exportFile, '</o:DocumentProperties>' . "\r\n" );
        fwrite( $this->exportFile, '<o:OfficeDocumentSettings>' . "\r\n" );
        fwrite( $this->exportFile, '<o:DownloadComponents/>' . "\r\n" );
        fwrite( $this->exportFile, '</o:OfficeDocumentSettings>' . "\r\n" );
        fwrite( $this->exportFile, '</xml><![endif]-->' . "\r\n" );
        
        $this->addStyles();
        
        fwrite( $this->exportFile, '<!--[if gte mso 9]><xml>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ExcelWorkbook>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ExcelWorksheets>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ExcelWorksheet>' . "\r\n" );
        fwrite( $this->exportFile, '<x:Name>Pleisterman</x:Name>' . "\r\n" );
        fwrite( $this->exportFile, '<x:WorksheetOptions>' . "\r\n" );
        fwrite( $this->exportFile, '<x:Selected/>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ProtectContents>False</x:ProtectContents>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ProtectObjects>False</x:ProtectObjects>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ProtectScenarios>False</x:ProtectScenarios>' . "\r\n" );
        fwrite( $this->exportFile, '</x:WorksheetOptions>' . "\r\n" );
        fwrite( $this->exportFile, '</x:ExcelWorksheet>' . "\r\n" );
        fwrite( $this->exportFile, '</x:ExcelWorksheets>' . "\r\n" );
        fwrite( $this->exportFile, '<x:WindowHeight>10005</x:WindowHeight>' . "\r\n" );
        fwrite( $this->exportFile, '<x:WindowWidth>10005</x:WindowWidth>' . "\r\n" );
        fwrite( $this->exportFile, '<x:WindowTopX>120</x:WindowTopX>' . "\r\n" );
        fwrite( $this->exportFile, '<x:WindowTopY>135</x:WindowTopY>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ProtectStructure>False</x:ProtectStructure>' . "\r\n" );
        fwrite( $this->exportFile, '<x:ProtectWindows>False</x:ProtectWindows>' . "\r\n" );
        fwrite( $this->exportFile, '</x:ExcelWorkbook>' . "\r\n" );
        fwrite( $this->exportFile, '</xml><![endif]-->' . "\r\n" );
        fwrite( $this->exportFile, '</head>' . "\r\n" );
        
    }
    private function addStyles(){
        fwrite( $this->exportFile, '<style>' . "\r\n" );
        fwrite( $this->exportFile, '<!--' . "\r\n" );
        fwrite( $this->exportFile,  "\r\n" );

        foreach( $this->styles as $index => $values ){
            fwrite( $this->exportFile, $index . '{' . "\r\n" );
            foreach( $values as $value ){
                fwrite( $this->exportFile, $value . ';' . "\r\n" );
            }
            fwrite( $this->exportFile, '}' . "\r\n" );
            fwrite( $this->exportFile, "\r\n" );
        }    
        fwrite( $this->exportFile, '-->' . "\r\n" );
        fwrite( $this->exportFile, '</style>' . "\r\n" );
    }
    private function addDataHeaders( $data ) {
        if( !isset( $data['headers'] ) ){
            return;
        }
        
        fwrite( $this->exportFile, '<tr>' . "\r\n" );
        for( $i = 0; $i < count( $data['headers'] ); $i++ ){
            fwrite( $this->exportFile, '<td style="font-weight:bold;">' . "\r\n" );
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
                fwrite( $this->exportFile, '<td>' . "\r\n" );
                fwrite( $this->exportFile, $value . "\r\n" );
                fwrite( $this->exportFile, '</td>' . "\r\n" );
            }
            fwrite( $this->exportFile, '</tr>' . "\r\n" );
        }
    }
    private function getTimeStamp(){
        $now = new \DateTime( 'now' );
        return $now->format( 'YmdHis' );        
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
