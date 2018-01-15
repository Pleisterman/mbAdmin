/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
* 
* Purpose:  this module controls access to global values for the application
*           the values are mutable declarations which have global scope    
*           values are stored within a group
*           the module will add the functions:
*               addValue        create a new global value
*               addValueList    create a list of global values
*               getValue        get a value
*               setValue        set a value
*           to the jsProject Module
* 
* Usage:  
*           jsProject.getValue( string name, string group )
*           jsProject.addValueList( array[string id, misc value,..], string group )
*           jsProject.getValue( string name, string group )
*           jsProject.setValue( string name, string group, misc value )
* 
*          
* Last revision: 24-11-2015
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

( function( jsProject ){
    jsProject.valuesModule = function( ) {

        // valuesModule
        
        // private
        var self = this;
        self.MODULE = 'valuesModule';
        self.debugOn = false;
        
        // the groups object
        self.groups = {};

        // functions
        self.construct = function() {
            self.debug( 'construct' );

            // add functions to application 
            jsProject.addValue = self.addValue;
            jsProject.addValueList = self.addValueList;
            jsProject.getValue = self.getValue;
            jsProject.setValue = self.setValue;
                        
        };
        // add a value according to id
        self.addValue = function( id, group, value ) {
            self.debug( 'addValue: ' + 'id:' + id + ', group, :' + group + ', value:' + value );
            
            // check if the group exists
            if( self.groups[group] === undefined ){
                // create the group
                self.groups[group] = {};
            }    
            // check if the value exists
            if( self.groups[group][id] !== undefined ){
                if( self.debugOn ) {
                    // value exists error
                    self.debug( 'add value warning value already exists id: ' +  id );
                }                
            }
            else {
                // add the value
                self.groups[group][id] = value;
            } 
        };
        // add values according to list json{id,value}
        self.addValueList = function( valueList, group ) {
            self.debug( 'addValueList: group, :' + group );
            for (var key in valueList ) {
                self.addValue( key, group, valueList[key] );
            }                
        };
        // get  a value according to id
        self.getValue = function( id, group ) {
            self.debug( 'getValue: ' + 'id:' + id + ', group, :' + group );
            // check if the id exists
            if( self.groups[group][id] !== undefined ){
                // return the value
                return self.groups[group][id];
            }
            // id not found error
            self.debug( 'get value error value not found id: ' +  id );
            return false;
        };
        // set  a value according to id
        self.setValue = function( id, group, value ) {
            self.debug( 'setValue: ' + 'id:' + id + ', group, :' + group + ', value:' + value );
            // check if the value existst
            if( self.groups[group][id] !== undefined ){
                // set the value
                self.groups[group][id] = value;
            }
            // value not found error
            else if( self.debugOn ) {
                self.debug( 'set value error value not found id: ' +  id );
            }
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };
        
        // initialize the module 
        self.construct();
    };
    
})( jsProject );


