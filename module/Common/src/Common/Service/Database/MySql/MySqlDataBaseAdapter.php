<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class handles construction of a mySql databaseAdapter
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

namespace Common\Service\Database\MySql;

use Zend\Db\Adapter\Adapter as DatabaseAdapter;
use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;

class MySqlDataBaseAdapter
{
    private $debugger = null;
    private $config = array( 
        'id'         =>  null,
        'mySqlHostName'     =>  null,
        'mySqlDatabaseName' =>  null,
        'mySqlUserName'     =>  null,
        'mySqlPassword'     =>  null,
    );
    public function __construct( $configId, ServiceLocatorInterface $serviceLocator, Debugger $debugger )
    {
        // store members
        $this->config['id'] = $configId;
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
        // has config
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    // set config key = value
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
        // done has config
    }
    private function createAdapter( ) {
        // debug info
        $this->debugger->logInformation( 'MySqlDataBaseAdapter createAdapter' );
        $this->debugger->logInformation( 'hostname: "' . $this->config['mySqlHostName'] . '"' );
        $this->debugger->logInformation( 'database: "' . $this->config['mySqlDatabaseName'] . '"' );
        $this->debugger->logInformation( 'username: "' . $this->config['mySqlUserName'] . '"' );
        $this->debugger->logInformation( 'password: "' . $this->config['mySqlPassword'] . '"' );
        // done debug info
        
        // create a SQLite database connection
        $this->databaseAdapter = new DatabaseAdapter( array(
            'driver'    =>  'Pdo_MySql',
            'hostname'  =>  $this->config['mySqlHostName'],
            'database'  =>  $this->config['mySqlDatabaseName'],
            'username'  =>  $this->config['mySqlUserName'],
            'password'  =>  $this->config['mySqlPassword'],
            'driver_options' => array(
                \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
            )    
        ));
        // done create a SQLite database connection
        
        // debug info
        $this->debugger->logInformation( 'MySqlDataBaseAdapter created' );
    }
    private function connect( ) {
        // debug info
        $this->debugger->logInformation( 'MySqlDataBaseAdapter connect' );
        
        // try
        try {
            // debug info
            $this->debugger->logInformation( 'connect');
            // connect
            $this->databaseAdapter->getDriver()->getConnection()->connect();
        }
        catch( \Exception $e ){
            // handle error
            $this->debugger->logInformation( 'PDO -start- EXCEPTION' );
            $this->debugger->logInformation( $e->getMessage() );
            $this->debugger->logInformation( 'PDO -end- EXCEPTION' );
            // done handle error
        }
        // done try
        
        // debug info
        $this->debugger->logInformation( 'MySqlDataBaseAdapter connected');

    }
    public function executeSelect( $statement, $statementValues  ) {

        // execute query
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
        $this->debugger->logInformation( 'query ' );
        $this->debugger->logInformation( 'mySql execute Statetement ' );
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