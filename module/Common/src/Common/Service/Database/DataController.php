<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this main dataController class 
 *          all datacontroller classes are children of this class
 *          
 * Last revision: 07-09-2016
 * 
 * NOTICE OF LICENSE
 *
 * Copyright (C) 2016  Pleisterman
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

namespace Common\Service\Database;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class DataController
{
    protected $configId = null;
    protected $options = null;
    protected $debugger = null; 
    protected $serviceLocator = null;
    protected $databaseAdapter = null;
    public function __construct( $configId, $options, ServiceLocatorInterface $serviceLocator, Debugger $debugger )
    {
        // store members
        $this->configId = $configId;
        $this->options = $options;
        $this->serviceLocator = $serviceLocator;
        $this->debugger = $debugger;
        // done store members
    }        
    public function getTimeStamp(){
        // create date time 
        $now = new \DateTime( 'now' );
        // return formatted string
        return $now->format( 'YmdHis' );        
    }
}