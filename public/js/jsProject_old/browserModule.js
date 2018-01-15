/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:  this module checks browser settings for the application 
*           the browser can be tested for capabilities, version, language.
*           future broader implementation with php may be developed
* Last revision: 04-11-2014
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
    jsProject.browserModule = function( ) {
        /*
        *  module browserModule 
        *  purpose:
        *           this module checks browser settings for the application
        *           the browser can be tested for capabilities, version, language.
        *           future broader implementation with php may be developed
        *   
        // this module sets the language according to browser detection 
        // in the future extra functionality can be added 
        // to detect browser capabilities
        //jsProject.debug( window.navigator.vendor );
        //jsProject.debug( window.navigator.language );
        //jsProject.debug( window.navigator.appCodeName );
        //jsProject.debug( window.navigator.appVersion );
        //jsProject.debug( window.navigator.buildID );
        *  
        *   functions: 
        *       private:
        *           construct:          parameters: ( void ) return: void 
        *                               called by the module for initialization
        *           setDefaultLanguage: parameters: ( void ) return void
        *                               called by the construct function
        *                               call to set the default language of the application
        *                               the default language will only be set if there is no cookie
        *           debug:              parameters: ( string string ) return: void
        *                               calls the jsProject.debug( string ) when self.debugOn
        */
    
        // private
        var self = this;
        self.MODULE = 'browserModule';
        self.debugOn = false;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            // set the default language
            self.setDefaultLanguage();

        };
        // set the default application language
        self.setDefaultLanguage = function() {
            // check if there is a language set
            if( !jsProject.getValue( 'language', 'jsProject' ) ) {
                // check if the browser language matches a predefined language
                var languageArray = jsProject.getValue( 'languages', 'jsProject' );
                for( var i = 0; i < languageArray.length; i++ ) {
                    if( window.navigator.language.toLowerCase() === languageArray[i] ){
                        self.debug( 'setLanguage: ' + languageArray[i] );
                        // match found set the application language
                        jsProject.setValue(  'language', 'jsProject', languageArray[i] );
                    }
                }
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