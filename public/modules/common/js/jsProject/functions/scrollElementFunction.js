/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds element is visible function to the
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
    jsProject.scrollElementFunction = function( ) {

        // scrollElementFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'scrollElementFunction';
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
            jsProject.scrollElement = self.scrollElement;
        };
        self.scrollElement = function( elementId, parentId ) {
            var elementTop = $( '#' + elementId ).offset().top;
            var parentTop = $( '#' + parentId ).offset().top;
            var screenHeight = $( '#' + parentId ).height();
            self.debug( 'elementTop: ' + elementTop );
            self.debug( 'parentTop: ' + parentTop );
            self.debug( 'screenHeight: ' + screenHeight );
            
            if( elementTop > screenHeight ){
                // debug info
                self.debug( 'item not visible' );

                // get element
                var element = document.getElementById( elementId );
                // make shure object is visible
                element.scrollIntoView( false );

                // done 
                return;
            }
            if( elementTop < parentTop ){ 
                // debug info
                self.debug( 'item not visible' );
                
                // get element
                var element = document.getElementById( elementId );
                // make shure object is visible
                element.scrollIntoView( true );

                // done 
                return;
            }
            // debug info
            self.debug( 'item visible' );
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