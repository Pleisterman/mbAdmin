<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class handles communication with a MySql database
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

use Common\Service\Debugger;

class MySqlParser
{
    private $debugger = null;
    public function __construct( Debugger $debugger )
    {
        // set member
        $this->debugger = $debugger;

        // debug info
        $debugger->logInformation( 'MySqlParser construct. ' );
        
    }        
    public function getSelectStatement( $selection ){
        // create statement
        $statement = '';
        
        // add columns
        $statement .= $this->createSelectColumnsPart( $selection );
        // add tables
        $statement .= $this->createSelectTablesPart( $selection );

        // has relations or where clauses or in part
        if( isset( $selection['whereClauses'] ) && count( $selection['whereClauses'] ) > 0 || 
            isset( $selection['relations'] ) &&   count( $selection['relations'] ) > 0 || 
            isset( $selection['in'] ) )
        {
            // add where
            $statement .= ' WHERE ';
            // add relations
            $statement .= $this->createSelectRelationsPart( $selection );
            // add where clauses
            $statement .= $this->createSelectWherePart( $selection );
            if( isset( $selection['whereClauses'] ) && count( $selection['whereClauses'] ) > 0 && isset( $selection['in'] ) ){
                $statement .= ' AND ';
            }
        }
        // done has relations or where clauses or in part
        
        // has in part 
        if( isset( $selection['in'] ) ){
            // add in part
            $statement .= $this->createSelectInPart( $selection['in'] );
        }
        // done has in part
        
        // add order
        $statement .= $this->createSelectOrderPart( $selection );
        // add limit
        $statement .= $this->createSelectLimitPart( $selection );

        // terminate statement 
        $statement .= ';';

        // return statement
        return $statement;
    }
    public function getSelectStatementValues( $selection ){
        // create result array
        $values = array();
        
        // has where clauses
        if( isset( $selection['whereClauses'] ) ){
            // add where values
            $this->getWhereValues($values, $selection['whereClauses'] );
        }
        // done has where clauses

        // has in selection
        if( isset( $selection['in'] ) ){
            // has in where clauses
            if( isset( $selection['in']['selection']['whereClauses'] ) ){
                // add in where values
                $this->getWhereValues($values, $selection['in']['selection']['whereClauses'] );
            }
            // done has in where clauses
        }
        // done has in selection
       
        // return result array
        return $values;
    }
    private function getUpdateStatement( $selection ){
        // create sql statement
        $statement = 'UPDATE ';
        $statement .= $selection['table'];
        $statement .= ' SET ';
        // add columns
        $i = 0;
        foreach( $selection['columns'] as $column ){
            // add column name
            $statement .= $column . ' = ? ';
            if( $i < count( $selection['columns'] ) - 1 ){
                // add delimiter
                $statement .= ' , ';
            }
            $i++;
        }        
        // done add columns
        // where clause 
        // add the where clause if exists
        if( isset( $selection['whereClauses'] ) ){
            if( count( $selection['whereClauses'] ) > 0 )
            {
                $statement .= ' WHERE ';
            }
            $i = 0;
            foreach( $selection['whereClauses'] as $clause ){
                $statement .= $clause['what'];
                $statement .= ' ' . $clause['compare'] . ' ';
                $statement .= ' ? ';
                if( $i < count( $selection['whereClauses'] ) - 1 ){
                    $statement .= ' AND ';
                }
                $i++;
            }
            // done where clause 
        }
        
        $statement .= ';';
        return $statement;
    }
    private function getInsertStatement( $selection ){
        // create sql statement
        $statement = 'INSERT INTO ';
        $statement .= $selection['table'];
        $statement .= '( ';
        
        // add columns
        $i = 0;
        foreach( $selection['columns'] as $column ){
            // add column name
            $statement .= $column;
            if( $i < count( $selection['columns'] ) - 1 ){
                // add delimiter
                $statement .= ' , ';
            }
            $i++;
        }        
        // done add columns
        $statement .= ' ) ';
        $statement .= ' VALUES ( ';
        $i = 0;
        foreach( $selection['columns'] as $column ){
            // add column name
            $statement .= '?';
            if( $i < count( $selection['columns'] ) - 1 ){
                // add delimiter
                $statement .= ' , ';
            }
            $i++;
        }        
        // done add columns
        $statement .= ') ';
        return $statement;
    }
    private function getDeleteStatement( $selection ){
        // create sql statement
        $statement = 'DELETE FROM ';
        $statement .= $selection['table'];
        if( isset( $selection['whereClauses'] ) ){
            $statement .= ' WHERE ';
            $statement .= $this->createSelectWherePart( $selection );
        }
        if( isset( $selection['in'] ) && !isset( $selection['whereClauses'] ) ){
            $statement .= ' WHERE ';
        }
            // add in part
        if( isset( $selection['in'] ) ){
            $statement .= $this->createSelectInPart( $selection['in'] );
        }
        return $statement;
    }
    private function createSelectInPart( $inPart ){
       
        // add spacing
        $statement = ' ';
        // add what part
        $statement .= $inPart['what'];
        // add compare part
        $statement .= ' ' . $inPart['compare'];
        // open in statement
        $statement .= ' ( ';
        
        // add columns
        $statement .= $this->createSelectColumnsPart( $inPart['selection'] );
        // add tables
        $statement .= $this->createSelectTablesPart( $inPart['selection'] );

        // add relations and where clauses
        if( isset( $inPart['selection']['whereClauses'] ) && count( $inPart['selection']['whereClauses'] ) > 0 || 
            isset( $inPart['selection']['relations'] ) &&   count( $inPart['selection']['relations'] ) > 0 )
        {
            // add where
            $statement .= ' WHERE ';
            // add relations
            $statement .= $this->createSelectRelationsPart( $inPart['selection'] );
            // add where clauses
            $statement .= $this->createSelectWherePart( $inPart['selection'] );
        }
        // done add relations and where clauses
        
        // add order
        $statement .= $this->createSelectOrderPart( $inPart );
        // add limit
        $statement .= $this->createSelectLimitPart( $inPart );
        
        
        // close in statement
        $statement .= ' ) ';
        
        // return statement
        return $statement;
        
    }
    private function createSelectColumnsPart( $selection ){
        // add select
        $statement = ' SELECT ';
        
        // add columns
        $i = 0;
        foreach( $selection['columns'] as $column ){
            // add column name
            $statement .= $column;
            if( $i < count( $selection['columns'] ) - 1 ){
                // add delimiter
                $statement .= ' , ';
            }
            $i++;
        }        
        // done add columns
        
        // return statement
        return $statement;
    }
    private function createSelectTablesPart( $selection ){
        // add from 
        $statement = ' FROM ';
        
        // add tables
        $i = 0;
        foreach( $selection['tables'] as $key => $table ){
            // add table name and alias
            $statement .= $key . ' ' . $table;
            if( $i < count( $selection['tables'] ) - 1 ){
                // add delimiter
                $statement .= ' , ';
            }
            $i++;
        }
        // doen add tables
        return $statement;
    }
    private function createSelectRelationsPart( $selection ){
        // add spacing
        $statement = ' ';
        
        // add relations
        if( isset( $selection['relations'] ) ){
            $i = 0;
            foreach( $selection['relations'] as $relation ){
                $statement .= ' ' . $relation . ' ';
                if( $i < count( $selection['relations'] ) - 1 ){
                    $statement .= ' AND ';
                }
                $i++;
            }
        }
        // done add relations
        
        // has relations or where clauses
        if( isset( $selection['whereClauses'] ) && count( $selection['whereClauses'] ) > 0 && 
            isset( $selection['relations'] ) && count( $selection['relations'] ) > 0 ){
            // add and
            $statement .= ' AND ';
        }
        // done has relations or where clauses
        
        // return statement
        return $statement;
    }        
    private function createSelectWherePart( $selection ){
        // create statement
        $statement = '';
        
        // no where clause
        if( !isset( $selection['whereClauses'] ) ){
            // return statement
            return $statement;
        }
        // done no where clause

        // add where clauses
        $i = 0;
        foreach( $selection['whereClauses'] as $clause ){
            // is linked clause or single clause
            if( isset( $clause['link'] ) ){
                // create linked clause 
                $statement .= $this->createSelectLinkedWherePart( $clause );
            }
            else {
                // create single clause
                $statement .= $this->createSelectSingleWherePart( $clause );
            }
            // done is linked clause or single clause
            
            // not last clause
            if( $i < count( $selection['whereClauses'] ) - 1 ){
                // add and
                $statement .= ' AND ';
            }
            // done not last clause
            $i++;
        }
        // done add where clause 
        
        // return statement
        return $statement;
    }        
    private function createSelectSingleWherePart( $clause ){
        // create statement
        $statement = '';
        // add what part
        $statement .= $clause['what'];
        // add compare part
        $statement .= ' ' . $clause['compare'] . ' ';
        
        // has value
        if( array_key_exists( 'value', $clause ) ){
            // add question mark
            $statement .= ' ? ';
        }
        // done has value
        
        // return statement
        return $statement;
    }
    private function createSelectLinkedWherePart( $clause ){
        // open linked clause
        $statement = '( ';

        // add clauses
        $i = 0;
        foreach( $clause['selection'] as $linkedClause ){
            // add what part
            $statement .= $linkedClause['what'];
            // add value compare part
            $statement .= ' ' . $linkedClause['compare'] . ' ';
            
            // has value
            if( array_key_exists( 'value', $linkedClause ) ){
                // add question mark
                $statement .= ' ? ';
            }
            // done has value
            
            // not last clause
            if( $i < count( $clause['selection'] ) - 1 ){
                // add clause compare part
                $statement .= ' ' . $clause['compare'] . ' ';
            }            
            // done not last clause
            
            $i++;
        }
        // doen add clauses
        
        // close linked clause
        $statement .= ' )';
        
        // return statement
        return $statement;
    }
    private function createSelectOrderPart( $selection ){
        // create statement
        $statement = '';
        
        // has order
        if( isset( $selection['order'] ) ){
            // add order part
            $statement .= ' ORDER BY ' . $selection['order'];
        }
        // done has order

        // return statement
        return $statement;
    }        
    private function createSelectLimitPart( $selection ){
        // create statement
        $statement = '';

        // has limit
        if( isset( $selection['limit'] ) ){
            // add limit
            $statement .= ' LIMIT ' . $selection['limit'];
        }
        // done has limit
        
        // return statement 
        return $statement;
        
    }
    private function getWhereValues( &$values, $whereClauses ){
        // create where values
        foreach( $whereClauses as $whereClause ){
            // has linked where clauses
            if( array_key_exists( 'link', $whereClause ) ){
                // add linked where clause values
                $this->getLinkedWhereValues( $values, $whereClause );
            }
            // done has linked where clauses
            
            // has single where clauses
            if( array_key_exists( 'value', $whereClause ) ){
                // add single where clause values
                $this->getSingleWhereValues( $values, $whereClause );
            }
            // done has single where clauses
        }
        // done create where values
    } 
    private function getSingleWhereValues( &$values, $whereClause ){
        // add value
        array_push( $values, $whereClause['value'] );
    }
    private function getLinkedWhereValues( &$values, $linkedClauses ){
        // loop over clauses
        foreach( $linkedClauses['selection'] as $linkedClause ){
            // has value
            if( array_key_exists( 'value', $linkedClause ) ){
                // add value
                array_push( $values, $linkedClause['value'] );
            }
            // done has value
        }                    
        // done loop over clauses
    }
}