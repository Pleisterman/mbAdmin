/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get element position function to the
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
    jsProject.getElementPositionFunction = function( ) {

        // getElementPositionFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getElementPositionFunction';
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
            jsProject.getElementPosition = self.getElementPosition;
        };
        self.getElementPosition = function( elementId ){

            // create position
            var position = {
                'top'     :   0,
                'left'     :   0
            };        
            // done create position
            
            // get first element
            var element = document.getElementById( elementId ); 

            // loop over element.offsetParent
            while ( element ) {
                // add top and offset
                position['top'] += ( element.offsetTop + element.clientTop );
                // add left and offset
                position['left'] += ( element.offsetLeft + element.clientLeft );

                // get offset parent
                element = element.offsetParent;
            }
            // done loop over element.offsetParent

            // get first element        
            element = document.getElementById( elementId ); 
            // loop over element.parent
            while ( element ) {
                if ( element.tagName !== "BODY" ) {
                    // add scroll top
                    position['top'] -=  element.scrollTop || 0;
                    // add scroll left
                    position['left'] -=  element.scrollLeft || 0;
                }
                element = element.parentNode;
            }
            // done loop over element.parent
            
            return position;            
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