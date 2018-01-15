/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this module controls the values for the application
*          the values are mutable declarations which have global scope for the application    
*          values are stored within a group
* Last revision: 29-10-2014
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2014  Pleisterman
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
        /*
        *  module valuesModule 
        *  purpose:
        *           this module controls values for the application.
        *           values are mutable declarations which have global scope for the application    
        *           values are stored within a group
        *   
        *  functions: 
        *       private:
        *           construct:      parameters: ( void ) return: void
        *                           called by the module for initialization of the module
        *           addValue:       parameters: ( string id, string group, mixed value) return: void
        *                           call to add a value associated with the id  within the group
        *                           will call an error message when value exists
        *           addValueList:   parameters: ( json{id, string group, mixed  value}) return: void
        *                           call to add values associated with the ids within the group  
        *                           will call an error message when value exists
        *           getValue:       parameters: ( string id, string group ) return: mixed / false
        *                           call to get a value associated with the id within the group 
        *           setValue:       parameters: ( string id, string group, mixed  value ) return: void 
        *                           call to set a value associated with the id  within the group
        *           debug:          parameters: ( string string ) return: void
        *                           calls the jsProject.debug( string ) when self.debugOn
        *       
        *  public: 
        *  The module will add the function addValue to the application    
        *  The module will add the function addValueList to the application    
        *  The module will add the function getValue to the application    
        *  The module will add the function setValue to the application    
        */
       
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


