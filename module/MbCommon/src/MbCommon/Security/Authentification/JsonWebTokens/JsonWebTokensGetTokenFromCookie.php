<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\JsonWebTokens\JsonWebTokensGetTokenFromCookie.php
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Purpose: 
 *          reads the JWT from the cookie
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

namespace MbCommon\Security\Authentification\JsonWebTokens;

use Common\Service\Debugger;


class JsonWebTokensGetTokenFromCookie
{
    private $debugger = null;
    private $workDirectory = null;
    public function __construct( $workDirectory, Debugger $debugger  )
    {
        // store work directory
        $this->workDirectory = $workDirectory;
        // store debugger
        $this->debugger = $debugger;
    }
    public function getTokenFromCookie( ){
        // debug info
        $this->debugger->LogInformation( 'JsonWebTokensGetTokenFromCookie workDirectory: '  . $this->workDirectory );

        // JWT ! set
        if( !isset( $_COOKIE['JWT_' . $this->workDirectory] ) ){
            // done no jwt
            return false;
        }
        // done JWT ! set

        // done 
        return $_COOKIE['JWT_' . $this->workDirectory];        
    }
}
