/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds hsv json object to rgs json object function to the
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
    jsProject.hsvToRgbFunction = function( ) {

        // hsvToRgbFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'hsvToRgbFunction';
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
            jsProject.hsvToRgb = self.hsvToRgb;
        };
        self.hsvToRgb = function( hsv ){
                // create values
                var hue = hsv['h'];
                var saturation = hsv['s'];
                var value = hsv['v'];
                // done create values
                
                // create rgb
                var rgb = {
                    'r'     :   0,
                    'g'     :   0,
                    'b'     :   0
                };
                // done create rgb
                
                // calculate rgb
                var u = Math.round( 255 * ( value / 100 ) );
                if ( hue === null) {
                    rgb['r'] = u;
                    rgb['g'] = u;
                    rgb['b'] = u;
                    return rgb;
                }

                hue /= 60;
                saturation /= 100;
                var i = Math.floor( hue );
                var f = i % 2 ? hue - i : 1 - ( hue - i );
                var m = Math.round(  u * ( 1 - saturation ) );
                var n = Math.round( u * (1 - saturation * f ) );
                switch ( i ) {
                    case 1  :   {
                        rgb['r'] = n;
                        rgb['g'] = u;
                        rgb['b'] = m;
                        return rgb;
                    }  
                    case 2  :   {
                        rgb['r'] = m;
                        rgb['g'] = u;
                        rgb['b'] = n;
                        return rgb;
                    }  
                    case 3  :   {
                        rgb['r'] = m;
                        rgb['g'] = n;
                        rgb['b'] = u;
                        return rgb;
                    }  
                    case 4  :   {
                        rgb['r'] = n;
                        rgb['g'] = m;
                        rgb['b'] = u;
                        return rgb;
                    }  
                    case 5  :   {
                        rgb['r'] = u;
                        rgb['g'] = m;
                        rgb['b'] = n;
                        return rgb;
                    }  
                    default :   {
                        rgb['r'] = u;
                        rgb['g'] = n;
                        rgb['b'] = m;
                        return rgb;
                    }    
                }
                // done create rgb
                
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