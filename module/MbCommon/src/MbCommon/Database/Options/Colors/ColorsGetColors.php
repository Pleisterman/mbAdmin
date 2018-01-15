<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Options\Colors\ColorsGetColors.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class gets list of colors from the table colors and
 *          adds the translated names from the colorNames table
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

namespace MbCommon\Database\Options\Colors;

use Common\Service\Debugger;
use MbCommon\Database\Language\LanguageDataController;

class ColorsGetColors
{
    private $debugger = null; 
    private $serviceLocator = null; 
    
    public function __construct( $configId, $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;
        // store debugger
        $this->debugger = $debugger;
        // store service locator
        $this->serviceLocator = $serviceLocator;
    }        
    public function getColors( $dataController, $languageId ){
        
        // debug info
        $this->debugger->logInformation( 'ColorsGetColors' );
        
        // get selection    
        $selection = $this->getSelection( );
        
        // call select
        $colors = $dataController->select( $selection );        
        
        // check result
        if( !$colors ){
            // debug info
            $this->debugger->logInformation( 'error getColors no result.' );
            // done with error
            return array( 'criticalError' => 'dataNotFound' );
        }
        // done check result

        // create translations controller
        $languageDataController = new LanguageDataController( $this->configId, $this->serviceLocator, $this->debugger );
        // get translations
        $translations = $languageDataController->getColorTranslations( $languageId );
        
        // loop over colors
        for( $i = 0; $i < count( $colors ); $i++ ){
            // set found
            $found = false;
            // loop over translations
            for( $j = 0; $j < count( $translations ) && !$found; $j++ ){
                // found color name - translation
                if( $colors[$i]['name'] == $translations[$j]['name'] ){
                    // set found
                    $found = true;
                    // set translation
                    $colors[$i]['translation'] = $translations[$j]['translation'];
                }
                // done found color name - translation
            }
            if( !$found ){
                // set default translation
                $colors[$i]['translation'] = 'no translation';
            }
            // done loop over translations
        }        
        // done loop over colors
        
        // done
        return $colors;
    }
    private function getSelection( ) {
        
        // create selection
        $selection = array(
            'tables'        => array( 
                'colors' => 'a'
            ),
            'columns'       => array( 
                'a.id', 
                'a.name', 
                'a.color', 
                'a.canChange'
            ),
            'order' =>  'a.name ASC'
            
        );
        // done create selection 
        
        // done 
        return $selection;
    }
}