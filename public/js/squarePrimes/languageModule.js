/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module controls languages for the application SquarePrimes
 *          handles the language menu in the navigation
 *          handles translation calls through ajax
 * 
 *  functions: 
 *      private:
 *          construct               called internal
 *          createMenu              handles creation of the language menu items
 *          menuItemClick           handles events of the language menu items
 *          translate               called from the function link
 *          debug
 *       function links in squarePrimes module:
 *           translate          
 * 
 * Last revision: 14-08-2015
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

( function( squarePrimes ){
    squarePrimes.languageModule = function( ) {


    /*
     *  languageModule 
     *  
     */
    
        // private
        var self = this;
        self.MODULE = 'languageModule';
        self.debugOn = false;
        self.languages = null;                      // array with all languages
        self.language = squarePrimes.defaultLanguage;   // selected language
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            // done debug info
            
            // get the global values
            self.language = selectedLanguageMenu;
            self.languages = languageMenus;
            // get the global values

            // debug info
            self.debug( 'sel langu=' + self.language );
            for( var i = 0; i < self.languages.length; i++ ){
                self.debug( 'langu=' + self.languages[i] );
            }
            // done debug info
            
            // create menu
            self.createMenu();
            
            // create the function links in squarePrimes
            squarePrimes.translate = self.translate;
            squarePrimes.getLanguage = self.getLanguage;
            // done create the function links in squarePrimes
            
        };
        self.createMenu = function() {
            // create header html
            var html = ''; 
            html += self.language.charAt(0).toUpperCase();
            html += self.language.charAt(1);
            // done create header html
            
            // add header
            $( '#languageMenusHeader' ).html( html );
            html = ''; 
            
            // create menus html
            for( var i = 0; i < self.languages.length; i++ ){
                html += '<li class="languageMenuItem" id="languageMenuItem_' + i + '">';
                html += self.languages[i].charAt(0).toUpperCase();
                html += self.languages[i].charAt(1);
                html += '</li>';
            }
            // done create menus html
            
            // add menus
            $( '#languageMenus' ).html( html );
            
            // set the events and show selectable menus
            for( var i = 0; i < self.languages.length; i++ ){
                if( self.languages[i] === self.language ){
                    $( '#languageMenuItem_' + i ).hide();
                }
                $( '#languageMenuItem_' + i ).click( function(){ self.menuItemClick( this ); });
            }
            // done set the events and show selectable menus
            
            // add toggle event 
            $( '#languageDropdown' ).click( function(){ $( '#languageMenus' ).toggle(); });
        };
        
        self.menuItemClick = function( element ){
            // get selection
            var arr = element.id.split( '_' );
            var selection = parseInt( arr[1] );
            // done get selection
            
            // debug info
            self.debug( 'menuItemClick:' + self.languages[arr[1]] );
            // done debug info
            
            // loop over menus, show selectable menus and set header 
            for( var i = 0; i < self.languages.length; i++ ){
                if( i === selection ){
                    // hide current selected
                    $( '#languageMenuItem_' + i ).hide();
                    // set the language
                    self.language = self.languages[i];
                    // set the header
                    $( '#languageMenusHeader' ).html( $( '#languageMenuItem_' + i ).html() );
                }
                else {
                    // show selectable menu
                    $('#languageMenuItem_' + i ).show();
                }
            }
            // loop over menus, show selectable menus and set header 
            
            // global event call 
            jsProject.callEvent( 'languageChange' );
        };
        self.getLanguage = function( ){
            return self.language;
        };
        self.translate = function( subject, ids, callback ){
            // debug info
            self.debug( 'translate ' + subject );
            // done debug info
            
            // construct data object
            var data = { 'subject'  : subject,
                         'ids'  : ids.join(),
                         'language' : self.language   };
            // done construct data object
            
            // make the ajax call
            jsProject.post( '/squarePrimes/translate', data, callback );
        };
        // debug 
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ' ' + string );
            }
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( squarePrimes );