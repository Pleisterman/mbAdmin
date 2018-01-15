<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class handles communication with a Sqlite database
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

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Database\DataController;
use Common\Service\Database\Sqlite\SqliteDataBaseAdapter;
use Common\Service\Database\Sqlite\SqliteParser;
use Common\Service\Debugger;

class SqliteDataController extends DataController 
{
    public function __construct( $configId, $options, ServiceLocatorInterface $serviceLocator, Debugger $debugger )
    {
        // debug info
        //$debugger->logInformation( 'SqliteDataController construct configId: ' . $configId );
        
        // parent handles construct
        parent::__construct( $configId, $options, $serviceLocator, $debugger );
        
        // create the database adapter
        $this->databaseAdapter = new SqliteDataBaseAdapter( $configId, $options, $serviceLocator, $debugger );
        
    }        
    public function select( $selection ){
        // create the parser
        $parser = new SqliteParser( $this->debugger );
        // create statement
        $statement = $parser->getSelectStatement( $selection );
        // create statement values
        $statementValues = $parser->getSelectStatementValues( $selection );    
        // execute query
        $result = $this->databaseAdapter->executeSelect( $statement, $statementValues );
        // done 
        return $result;
    }
    public function update( $selection ){
        // create the parser
        $parser = new SqliteParser( $this->debugger );
        // get statement
        $statement = $parser->getUpdateStatement( $selection );
        // execute query
        $result = $this->databaseAdapter->executeUpdate( $statement, $selection['values'] );
        // done 
        return $result;
    }
    public function insert( $selection ){
        // create the parser
        $parser = new SqliteParser( $this->debugger );
        // get statement
        $statement = $parser->getInsertStatement( $selection );
        // execute query
        $result = $this->databaseAdapter->executeInsert( $statement, $selection['values'] );
        // done 
        return $result;
    }
    public function delete( $selection ){
        // create the parser
        $parser = new SqliteParser( $this->debugger );
        // get statement
        $statement = $parser->getDeleteStatement( $selection );
        // execute query
        $result = $this->databaseAdapter->executeDelete( $statement, $selection['values'] );
        // done 
        return $result;
    }
}