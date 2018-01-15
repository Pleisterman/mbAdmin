/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get json value function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
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

( function( jsProject ){
    jsProject.getJsonValueFunction = function( ) {

        // getJsonValueFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getJsonValueFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getJsonValue = self.getJsonValue;
        };
        self.getJsonValue = function( jsonObject, indexArray ){
            // debug info
            self.debug( 'get json value' );
            
            // create depth
            var depth = 0;
            // get current object
            var currentObject = jsonObject;
            
            for( var i = 0; i < indexArray.length; i++ ){
            
                if( $.isArray( currentObject ) ){
                    self.debug( 'found array' + indexArray[depth] );
                    var indexValues = indexArray[depth].split( '=' );
                    var index = indexValues[0];
                    var value = indexValues[1];
                    // loop over jsonArray
                    $.each( currentObject, function( objectIndex, object ) {
                        if( object[index] === value ){
                            currentObject = object;
                            depth++;
                        }                        
                    }); 
                }
                else {
                    self.debug( 'found object' + indexArray[depth] );
                    currentObject = currentObject[indexArray[depth]];
                    depth++;
                }
            }
            
            // found the correct object
            if( depth === indexArray.length ){
                self.debug( 'value found: ' + currentObject );
                return currentObject;
            }
            // done found the correct object
            else {
                // not found
                console.log( 'error getJsonValue object not found ' );
                console.log( 'object' +  JSON.stringify( jsonObject ) );
                console.log( 'search array' + JSON.stringify( indexArray ) );
                
                return undefined;
            }
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );