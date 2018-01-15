<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class handles debug calls 
 *          currently implemented:
 * 
 *          Distinguish info, warning, error critical error per subject
 *          Warnings and info are written in the debug dir and are appended
 *          Errors are written in the error dir and are appended
 *          Directories are set in config
 *          Debug on / off is set in config
 *          phpDebug ( apache server debug ) on / off is set in config
 * 
 *          clear the debug files: config debugger->clearLog
 
 * *                  variables:
 *                      config            handles debug calls
 *                      loggers           stores the configuration values
 *                      detector          stores the device detector class MobileDetect
 *                  functions:
 *                      getConfig         read the configuration values
 *                      createLogger      create a new logger   
 *                      getLogger         get existing logger  
 *                      clearLog          clear the log files  
 *                      logCriticalError  log a critical error  
 *                      logError          log an error    
 *                      logWarning        log a warning    
 *                      LogInformation    log information
 *                      
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

use Zend\Log\Writer\Stream;
use Zend\Log\Logger;
use Zend\ServiceManager\ServiceLocatorInterface;

class Debugger
{
    // default configuration values
    // can be set in the global config config['debugger']
    private $appName = 'site';
    private $fileName = null;
    private $config = array( 'on' => false,
                             'debugDir' => 'debug/debug/',
                             'errorDir' => 'debug/error/',
                             'phpDebugOn' => false,
                             'defaultSubject' => 'site' );
    // array with the loggers
    // array( 'subject' => string, 'logger'  =>  Zend\Log\Logger );
    private $loggers = array( );

    public function __construct( $appName, ServiceLocatorInterface $serviceLocator, $fileName = null )
    {
        $this->appName = $appName;
        $this->fileName = $fileName;
        // get the configuration
        $this->getConfig( $serviceLocator );
        // set error reporting of apache server 
        if( $this->config['phpDebugOn'] ) {
            error_reporting(E_ALL);
            @ini_set('display_errors', 1 );
        }
        else {
            @ini_set('display_errors', 0 );
        }
        // done set error reporting of apache server 
    }
    private function getConfig( ServiceLocatorInterface $serviceLocator ) {
        // read config
        $config = $serviceLocator->get( 'config' )[$this->appName]['debugger'];
        if(  $config ) {
            forEach( $config as $key => $value ) {
                // set values
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
        }
    }
    private function createLogger( $subject, $errorLogger ) {
        // create the stream
        if( $errorLogger ) {
            $writer  = new Stream( array( 'stream' => $this->config['errorDir'] . $subject . '.log', 'mode' => "a+"  ));
        }
        else {
            $writer  = new Stream( array( 'stream' => $this->config['debugDir'] . $subject . '.log', 'mode' => "a+"  ));
        }
        $logger = new Logger();
        $logger->addWriter( $writer );
        chmod( $this->config['debugDir'] . $subject . '.log', 0755 );
        array_push( $this->loggers, array( 'subject' => $subject,
                                           'logger' => $logger,
                                           'errorlogger' => $errorLogger  ) );
        return $logger; 
        
    }
    private function getLogger( $subject = null, $errorLogger = false ) {
        if( !$subject || $subject === '' ) {
            $subject = $this->config['defaultSubject'];
        }
        if( $this->fileName ) {
            $subject = $this->fileName;
        }
        // see if the logger was already created 
        forEach( $this->loggers as $logger ) {
            if( $logger['subject'] === $subject && $logger['errorlogger'] === $errorLogger ) {
                // found the logger 
                return $logger['logger'];
            }
        }
        // the logger has not been found so create a new logger 
        return $this->createLogger( $subject, $errorLogger );
    }
    public function clearLog( ) {
        if( !$this->config['on'] ) {
            return;
        }
//        return;
        
        // get all file names
        $files = glob( $this->config['debugDir'] . '*.log*'); 
        foreach( $files as $file ) { 
            if( is_file( $file ) ) {
                // delete file
                unlink( $file ); 
            }
        }
    }
    public function logCriticalError( $message, $subject = null ) {
        if( !$this->config['on'] ) {
            return;
        }
        $logger = $this->getLogger( $subject, true );
        $logger->crit( $message );
    }
    public function logError( $message, $subject = null ) {
        if( !$this->config['on'] ) {
            return;
        }
        $logger = $this->getLogger( $subject, true );
        $logger->err( $message );
    }
    public function logWarning( $message, $subject = null ) {
        if( !$this->config['on'] ) {
            return;
        }
        $logger = $this->getLogger( $subject );
        $logger->warn( $message );
    }
    public function LogInformation( $message, $subject = null ) {
        if( !$this->config['on'] ) {
            return;
        }
        $logger = $this->getLogger( $subject );
        $logger->info( $message );
    }
}