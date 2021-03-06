<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Vat/VatGetList.php
 * 
 *  Last Revision:  26-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with 'open' vat or 'closed' vat
 *          an updated value is checked against the updated value in the
 *          table tableUpdates if the values are the same no rows are returned
 *          because the existing data is up to date
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

namespace MbAdmin\Database\Data\Vat;

use Common\Service\Debugger;
use MbAdmin\Database\Data\TableUpdate\TableUpdateDataController;

class VatGetList
{
    private $debugger = null; 
    private $serviceLocator = null; 
    private $workDirectory = null;
    private $configId = null;
    public function __construct( $configId, $workDirectory, $serviceLocator, Debugger $debugger  )
    {
        // store configId
        $this->configId = $configId;
        // store user directory
        $this->workDirectory = $workDirectory;
        // set member
        $this->debugger = $debugger;
        $this->serviceLocator = $serviceLocator;
    }        
    public function getList( $dataController, $updated ){
        // debug info
        $this->debugger->logInformation( 'VatGetList lastUpdated: ' . $updated );
        
        // get is up to date
        $isUptoDateResult = $this->isUpToDate( $updated );

        // check up to date value
        if( $isUptoDateResult['upToDate'] ){
            // done data up to date 
            return $isUptoDateResult;
        }
        // done check up to date value
        
        // get selection
        $selection = $this->getSelection( );
        
        // select
        $rows = $dataController->select( $selection );        

        // create result
        $result = array( 
            'updateNeeded'  =>  true,
            'updated'       =>  $updated,
            'rows'          =>  []
        );
        // done create result
        
        // check rows exists
        if( $rows ){
            // set text
            for( $i = 0; $i < count( $rows ); $i++ ){
                $rows[$i]['text'] = $rows[$i]['description'] . ' ( ' . $rows[$i]['percentage'] . '% )';
            }
            // done set text
            
            // set result rows
            $result['rows'] = $rows;
        }
        // done check rows exists

        // done 
        return $result;
    }
    private function isUpToDate( $updated ) {
        // create result
        $result = array( 
            'upToDate'  => false
        );
        // done create result
        
        // create get last update controller
        $tableUpdateController = new TableUpdateDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get last update
        $lastUpdate = $tableUpdateController->getLastUpdate( 'vat' );
            
        // check result
        if( $lastUpdate ){
            // lastUpdate = updated
            if( $updated == $lastUpdate ){
                // set up to date value
                $result['upToDate'] = true;
            }
            // done lastUpdate = updated
        }
        // done check result
        
        // done data up to date
        return $result;
    }
    private function getSelection( ) {
        
        // create selection 
        $selection = array(
            'tables'        => array( 
                'vat' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.description', 
                'a.longDescription', 
                'a.identification', 
                'a.percentage', 
                'a.opened', 
                'a.closed', 
                'a.used'
            ),
            'order' => 'percentage'
        );
        // done create selection 
        
        // done 
        return $selection;
        
    }
}