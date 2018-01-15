<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\Algorithms\AlgorithmsController.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          this class checks if a given algorithm exists within the
 *          existing hash algorithms on the server
 *          
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
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

namespace MbCommon\Security\Authentification\Algorithms;

use Common\Service\Debugger;

class AlgorithmsController
{
    private $debugger = null;
    public function __construct( Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
    }
    public function algorithmExists( $algorithm ){
        // debug info
        $this->debugger->logInformation( 'AlgorithmsController algorithmExists' );
        // get the installed algorithms
        $detectedAlgorithms = hash_algos( );
        // check al the preffered algorithms against the installed algorithms
        if( in_array( $algorithm, $detectedAlgorithms ) ){
            $this->debugger->logInformation( 'AlgorithmsController algorithm: ' . $algorithm . ' exists' );
            return true;
        }
        else {
            $this->debugger->logInformation( 'AlgorithmsController algorithm: ' . $algorithm . ' not detected.' );
        }
        return false;
    }        
}
