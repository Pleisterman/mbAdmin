<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class handles construction of a Sqlite databaseAdapter
 *          
 * Last revision: 06-09-2016
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

namespace Common\Service\Database\Sqlite;

use Zend\Db\Adapter\Adapter as DatabaseAdapter;
use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class SqliteDataBaseAdapter
{
    private $debugger = null;
    private $options = null;
    private $config = array( 
        'id'         =>  null,
        'dataDir'    =>  null
    );
    public function __construct( $configId, $options, ServiceLocatorInterface $serviceLocator, Debugger $debugger )
    {
        // store members
        $this->config['id'] = $configId;
        $this->options = $options;
        $this->debugger = $debugger;
        // done store members
        
        // get the configuration
        $this->getConfig( $serviceLocator );

        // create the adapter
        $this->createAdapter();
        
        // create the adapter
        $this->connect();

        // done
        return $this->databaseAdapter;
    }        
    private function getConfig( ServiceLocatorInterface $serviceLocator ) {
        // read the configuration
        $config = $serviceLocator->get( 'config' )[$this->config['id']];
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
    }
    private function createAdapter( ) {
        // debug info
        // $this->debugger->logInformation( 'SqliteDataBaseAdapter createAdapter' );
        // $this->debugger->logInformation( 'dataDir: "' . $this->config['dataDir'] . '"' );
        // $this->debugger->logInformation( 'dataFile: "' . $this->options['fileName'] . '"' );
        // done debug info
        
        // create a SQLite database connection
        $this->databaseAdapter = new DatabaseAdapter( array(
            'driver'    =>  'Pdo_Sqlite',
            'database'  =>  $this->config['dataDir'] . $this->options['fileName']
        ));
        // done create a SQLite database connection
        
        // debug info
        // $this->debugger->logInformation( 'SqliteDataBaseAdapter created' );
    }
    private function connect( ) {
        // debug info
        //$this->debugger->logInformation( 'SqliteDataBaseAdapter connect' );
        
        try {
            //$this->debugger->logInformation( 'connect');
            $this->databaseAdapter->getDriver()->getConnection()->connect();
            //$this->debugger->logInformation( 'query');
        }
        catch( \Exception $e ){
            // handle error
            $this->debugger->logInformation( 'PDO -start- EXCEPTION' );
            $this->debugger->logInformation( $e->getMessage() );
            $this->debugger->logInformation( 'PDO -end- EXCEPTION' );
            // done handle error
        }
        //$this->debugger->logInformation( 'SqliteDataBaseAdapter connected');

    }
    public function executeSelect( $statement, $statementValues  ) {

        // execute select
        $result = $this->executeStatement( $statement, $statementValues );
        
        // create result
        $resultArray = [];
        $rowsFound = 0;
        $row = $result->current();
        while( $row ) {
            array_push( $resultArray, $row );
            $row = $result->next();
            $rowsFound++;
        }
        // done create result

        // debug info
        $this->debugger->LogInformation( 'rows found: ' . $rowsFound );
        
        return $resultArray;
    }
    public function executeUpdate( $statement, $values ){
        // execute update
        return $this->executeStatement( $statement, $values );
    }
    public function executeInsert( $statement, $values ){
        // execute insert
        $insertResult = $this->executeStatement( $statement, $values );
        // get insert id
        $lastGeneratedValue = $this->databaseAdapter->driver->getLastGeneratedValue();
        // check insert id
        if( $lastGeneratedValue ){
            // debug info
            $this->debugger->logInformation( 'getLastGeneratedValue succes. l: ' . $lastGeneratedValue );
            // done 
            return array( 'insertId' => $lastGeneratedValue );
        }
        // done with error 
        return array( 'criticalError' => 'insertFailed' );
    }
    public function executeDelete( $statement, $values ){
        // execute delete
        return $this->executeStatement( $statement, $values );
    }
    private function executeStatement( $statement, $statementValues ){
        // execute statement
        $this->debugger->logInformation( ' ' );
        //$this->debugger->logInformation( 'query ' );
        $this->debugger->logInformation( 'Sqlite execute Statetement ' );
        $this->debugger->logInformation( 'statement: ' . $statement );
        $this->debugger->logInformation( 'statement values: ' );
        $this->debugger->logInformation( $statementValues );
        try {
            $query = $this->databaseAdapter->createStatement( $statement, $statementValues );
            $result = $query->execute();
            $this->debugger->logInformation( 'query succes.' );
            $this->debugger->logInformation( ' ' );
            return $result;
        }
        catch( \PDOException $e ){
            // handle error
            $this->debugger->logInformation( 'PDO -start- EXCEPTION' );
            $this->debugger->logInformation( $e->getMessage() );
            $this->debugger->logInformation( 'PDO -end- EXCEPTION' );
            // done handle error
        }
        // done execute statement
        
        // return error
        return false;
    }
            
}