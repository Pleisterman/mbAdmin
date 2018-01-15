/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
*   
* Purpose:  this module handles access to browser settings for the application 
*           the browser can be tested for capabilities, version, language
*           
*  ... Under development ...         
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
    jsProject.browserModule = function( ) {
        
        // browserModule
        
        // private
        var self = this;
        self.MODULE = 'browserModule';
        self.debugOn = false;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            

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