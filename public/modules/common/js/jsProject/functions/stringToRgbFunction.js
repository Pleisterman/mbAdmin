/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds rgb string to json rgb object function to the
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
    jsProject.stringToRgbFunction = function( ) {

        // stringToRgbFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'stringToRgbFunction';
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
            jsProject.stringToRgb = self.stringToRgb;
        };
        self.stringToRgb = function( string ){
            // get r
            var current = string.indexOf( "(" );
            current++;
            var next = string.indexOf( "," );
            var r = parseInt( string.slice( current, next ) );
            // get g
            current = next + 1;
            next = string.indexOf( ",", current );
            var g = parseInt( string.slice( current, next ) );
            // get b
            current = next + 1;
            next = string.indexOf( ")", current );
            var b = parseInt( string.slice( current, next ) );
            
            // return rgb object
            return { 
                'r' : r, 
                'g' : g, 
                'b' : b
            };
            // done return rgb object
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