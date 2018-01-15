<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationGetPrefferedAlgorithm.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 * Purpose: this class gets the preffered algorithm list and
 *          compares it to the existing algorithms and returns 
 *          the first match if any exist
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

namespace MbCommon\Security\Authentification;

use Common\Service\Debugger;


class AuthentificationGetPrefferedAlgorithm
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function getPrefferedAlgorithm( $preferedAlgorithms ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationGetPrefferedAlgorithm' );
        // debug info
        $this->debugger->logInformation( 'checking algorithms' );
        // get the installed algorithms
        $detectedAlgorithms = hash_algos( );

        // check al the preffered algorithms against the installed algorithms
        foreach( $preferedAlgorithms as $prefferedAlgorithm ){
            if( in_array( $prefferedAlgorithm, $detectedAlgorithms ) ){
                // debug info
                $this->debugger->logInformation( 'AuthentificationGetPrefferedAlgorithm found prefered Algorithm: ' . $prefferedAlgorithm );
                // done
                return $prefferedAlgorithm;
            }
            else {
                // debug info
                $this->debugger->logInformation( 'AuthentificationGetPrefferedAlgorithm prefered Algorithm: ' . $prefferedAlgorithm . ' not detected.' );
            }
        }
        // done check al the preffered algorithms against the installed algorithms
        
        // debug info0
        $this->debugger->logInformation( 'AuthentificationGetPrefferedAlgorithm error prefered Algorithm: no algorithm found.' );
        
        // done with error
        return false;
    }
}
