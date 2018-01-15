<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class controls loggin of sessions
 *          
 *                  variables:
 *                      debugger            handles debug calls
 *                      debugOn             boolean, log debug?
 *                      config              stores the configuration values
 *                  functions:
 *                      getConfig           read the configuration values
 *                      getIndexFileName    rcreate the name for the index file according to the current date
 *                      indexSession        write index info for the session
 *                      getUpdateFileName   create the file name for the udate file according to session-id
 *                      updateData          write the request data to the update file 
 *                      createIndexData     create the data for the index entry
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
 * 
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonWebsite for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 * 
 */

namespace Common\Service;


use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;



class SessionController {
    // default configuration values
    // can be set in the global config config['sessions']
    private $config = array( 'on' => true,
                             'dir' => 'sessions/',
                             'name' => '' );
    private $debugger = null;
    private $debugOn = true;
    
    public function __construct( ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        $this->debugger = $debugger;
        $this->debug( 'SessionController __construct' );
        
        // get the configuration
        $this->getConfig( $serviceLocator );
        
        // if sessions are saved
        if( $this->config['on'] ){
        if( $this->config['name'] != '' ){
                session_name( $this->config['name'] );
            }
            session_start();
            
            // session is indexed for the day? 
            if( !isset( $_SESSION['indexed'] ) || $_SESSION['indexed'] !== date('Ymd' ) ) {
                // index session
                $this->indexSession(); 
            }
            else {
                // update data
                $this->updateData();
            }
        }
    }
    private function getConfig( ServiceLocatorInterface $serviceLocator ) {
        // get configuration values 
        $config = $serviceLocator->get( 'config' )["site"]['sessions'];
        // config vakues exist
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    // set value if index exists
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
    }
    private function getIndexFileName(){
        // create a string for the file name
        $dir = $this->config['dir'];
        $date = date("Ymd");
        return $dir . $date . "_index.txt";
    } 
    private function indexSession(){
        // get the file name
        $indexFileName = $this->getIndexFileName();
        // open the file in append mode 
        $indexFile = fopen( $indexFileName, "a+" );
        if( $indexFile ) {
            // write data
            fwrite( $indexFile, $this->createIndexData() );
            // close the file
            fclose( $indexFile );
        }
        // update session value indexed
        $_SESSION['indexed'] = date('Ymd' );
    }
    private function getUpdateFileName(){
        // create a string for the update file name
        $dir = $this->config['dir'];
        $date = date("Ymd");
        return $dir . $date . "_"  . session_id() . ".txt";
    } 
    private function updateData(){
        // get the file name
        $updateFileName = $this->getUpdateFileName();
        // open the file in append mode
        $file = fopen( $updateFileName, "a+" );
        if( $file ) {
            // create data
            $data = date( "H:i:s", time() ) . " => ";
            if( isset( $_SERVER['REQUEST_URI'] ) ) {
                 $data .= 'REQUEST_URI="' . $_SERVER['REQUEST_URI'] . '"';
            }
            $data .=  "\n";
            // done create data
            
            // write data
            fwrite( $file, $data );
            // close the file
            fclose( $file );
        }
    }
    private function createIndexData() {
        
        $indexData = date( "H:i:s", time() );

        if( isset( $_SERVER ) ) {
           
            // client
            if( isset( $_SERVER['argv'] ) ) {
                $indexData .= ' PATH' . $_SERVER['argv'];
            }
            
            if( isset( $_SERVER['REMOTE_ADDR'] ) ) {
                $indexData .= ' REMOTE_ADDR: ' . $_SERVER['REMOTE_ADDR'] . " ";
            }
            
            if( isset( $_SERVER['REQUEST_URI'] ) ) {
                $indexData .= ' REQUEST_URI: ' . $_SERVER['REQUEST_URI'] . " ";
            }
            
            if( isset( $_SERVER['HTTP_USER_AGENT'] ) ) {
                $indexData .= ' HTTP_USER_AGENT: ' . $_SERVER['HTTP_USER_AGENT'] . " ";
            }
            
            // server
            if( isset( $_SERVER['SERVER_SOFTWARE'] ) ) {
                $indexData .= ' SERVER_SOFTWARE: ' . $_SERVER['SERVER_SOFTWARE'] . " ";
            }
            
        }
        $indexData .= ' session:' . session_id() . " ";
        $indexData .=  "\n";
        
        return $indexData;
    }
    private function debug( $message, $error = false ){
        if( !$this->debugger ){
            return;
        }
        if( $error ){
            $this->debugger->logError( $message, 'SessionController' );
        }
        else {
            if( $this->debugOn ){
                $this->debugger->LogInformation( $message );
            }
        }
    }
}
