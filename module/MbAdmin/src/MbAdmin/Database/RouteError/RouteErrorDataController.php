<?php
/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: 
 *      this dataController class is an extension of the timeAdministrationDataController class
 *      it controls the calls for options 
 *                      
 * Last revision: 11-10-2017
 * 
 * NOTICE OF LICENSE
 *
 * Copyright (C) 2017  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

namespace MbAdmin\Database\RouteError;

use Common\Service\Debugger;
use MbAdmin\Database\MbAdminDataController;
use MbAdmin\Database\RouteError\RouteErrorGetPageInfo;
use MbAdmin\Database\RouteError\RouteErrorGetPageHtml;

class RouteErrorDataController extends MbAdminDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'language/data.db'
    ); 
    public function __construct( $serviceLocator, Debugger $debugger  )
    {
        // parent handles construct
        parent::__construct( $this->fileOptions, $serviceLocator, $debugger );
    }     
    public function getPageInfo( $subject, $languageId ){
        // create get options controller
        $controller = new RouteErrorGetPageInfo( $this->debugger );
        // done 
        return $controller->getPageInfo( $this, $subject, $languageId );
    }
    public function getPageHtml( $languageId, $languageCameFromRoute ){
        // create get options controller
        $controller = new RouteErrorGetPageHtml( $this->debugger );
        // done 
        return $controller->getPageHtml( $this, $languageId, $languageCameFromRoute );
    }
}