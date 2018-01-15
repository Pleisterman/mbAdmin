<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class detects device the user is using to browse 
 *          currently implemented:
 * 
 *          distinguish between mobile and desktop
 *          
 *                  variables:
 *                      debugger            handles debug calls
 *                      debugOn             stores the configuration values
 *                      detector            stores the device detector class MobileDetect
 *                  functions:
 *                      isMobile            check if the user is using a mobile device
 *                      debug               log debug information
 *          
 * Last revision: 13-08-2015
 * 
 * NOTICE OF LICENSE
 *
 * Copyright (C) 2015  Pleisterman
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

namespace Common\Service;
use Common\Service\Debugger;
use Common\Service\MobileDetect;


class DeviceDetector
{
    private $debugger = null;
    private $debugOn = true;
    private $detector = null;

    public function __construct( Debugger $debugger )
    {
        // log info to debugger 
        $this->debugger = $debugger;
        $this->debug( 'deviceDetector construct' );
        // create the detector class
        $this->detector = new MobileDetect();
        $this->debug( 'deviceDetector mobile detect is constructed' );
        
 
    }
    public function isMobile(){
        if( $this->detector->isMobile() ) {
            $this->debug( "Mobile" );
            return true;
        }
        else {
            $this->debug( "not Mobile" );
            return false;
        }
    }
    private function debug( $message, $error = false ){
        if( !$this->debugger ){
            return;
        }
        if( $error ){
            $this->debugger->logError( $message, 'DeviceDetector' );
        }
        else {
            if( $this->debugOn ){
                $this->debugger->LogInformation( $message );
            }
        }
    }
}