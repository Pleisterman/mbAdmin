/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds rgb json object to hsv object function to the
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
    jsProject.rgbToHsvFunction = function( ) {

        // rgbToHsvFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'rgbToHsvFunction';
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
            jsProject.rgbToHsv = self.rgbToHsv;
        };
        self.rgbToHsv = function( rgbToConvert ){
            // r: 0-255
            // g: 0-255
            // b: 0-255
            //
            // returns: [ 0-360, 0-100, 0-100 ]
            //
            
            // create hsv
            var hsv = {
                'h'     : 0,
                's'     : 0,
                'v'     : 0
            };
            // create hsv

            // copy rgbConvert
            var rgb = JSON.parse( JSON.stringify( rgbToConvert ) );
            
            rgb['r'] /= 255;
            rgb['g'] /= 255;
            rgb['b'] /= 255;
            
            // calculate hsv
            var n = Math.min( Math.min( rgb['r'], rgb['g'] ), rgb['b'] );
            var v = Math.max( Math.max( rgb['r'], rgb['g'] ), rgb['b'] );
            var m = v - n;
            if ( m === 0 ) { 
                hsv['h'] = null;
                hsv['s'] = 0;
                hsv['v'] = 100 * v;
                return hsv;
            }
            var h = rgb['r'] === n ? 3 + ( rgb['b'] - rgb['g'] ) / m : ( rgb['g'] === n ? 5 + ( rgb['r'] - rgb['b'] ) / m : 1 + ( rgb['g'] - rgb['r'] ) / m );
            hsv['h'] = 60 * ( h === 6 ? 0 : h );
            hsv['s'] = 100 * ( m / v );
            hsv['v'] = 100 * v;
            // done calculate hsv
            
            return hsv;
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