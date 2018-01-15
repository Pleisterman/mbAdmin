/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds hex json object to rgb string function to the
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
    jsProject.hexStringToRgbFunction = function( ) {

        // hexStringToRgbFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'hexStringToRgbFunction';
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
            jsProject.hexStringToRgb = self.hexStringToRgb;
        };
        self.hexStringToRgb = function( hexString ){
            var r = parseInt( hexString.substring( 0, 2 ), 16 );
            if( isNaN( r ) ){
                r = 0;
            }
            var g = parseInt( hexString.substring( 2, 4 ), 16 );
            if( isNaN( g ) ){
                g = 0;
            }
            
            var b = parseInt( hexString.substring( 4, 6 ), 16 );
            if( isNaN( b) ){
                b = 0;
            }
            
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