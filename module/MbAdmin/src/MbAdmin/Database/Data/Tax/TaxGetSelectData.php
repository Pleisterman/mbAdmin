<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/Database/Data/Tax/TaxGetSelectData.php
 * 
 *  Last Revision:  26-01-2017
 * 
 *  Purpose: 
 *          this class creates an array with a list of 'open' tax
 *          including a selected row even if that row is closed
 *          for dropdown lists
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

namespace MbAdmin\Database\Data\Tax;

use Common\Service\Debugger;
use MbAdmin\Database\Data\Tax\TaxGetList;

class TaxGetSelectData
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
        // set members
        $this->debugger = $debugger;
        $this->serviceLocator = $serviceLocator;
        // done set members
    }        
    public function getSelectData( $dataController, $id, $lastUpdated ){
        // debug info
        $this->debugger->logInformation( 'TaxGetSelectData id: ' . $id );

        // create selected row
        $selectedRow = null;

        // if id exists
        if( $id ){
            // get current row
            $currentRow = $dataController->get( 'rowById', $id );

            // create selected row
            $selectedRow = array(
                'id'    => $currentRow['data']['id'],
                'text'  => $currentRow['data']['description'] . ' ( ' . $currentRow['data']['percentage'] . '% )'
            );
            // done create selected row
        }
        // done if id exists
        
        // create list controller
        $getListController = new TaxGetList( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get list
        $list = $getListController->getList( $dataController, 'open', $lastUpdated );
        
        // create result
        $result = array(
            'open'          =>  $list,
            'selectedRow'   =>  $selectedRow
        );
        // done create result
        
        // done 
        return $result;
    }
}