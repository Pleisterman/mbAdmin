/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module controls the navigation for the textTool application
 *          selection of menus
 *          setting document title
 *          translation of the document title 
 *           
 *  functions: 
 *      private:
 *          construct               called internal
 *          navigationChange        called from event navigationChange
 *          setDocumentTitle        called from navigationChange, tranlateCallback
 *          translate               called from event languageChange, construct
 *          translateCallback       callback for the translate function
 *          debug
 *       event subscriptions:
 *           languageChange          called from the languageModule   
 *           navigationChange        called from aboutModdule       
 *          
 * Last revision: 14-08-2015
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

( function( textTool ){
    textTool.navigationModule = function( ) {


    /*
     *      navigationModule 
     *      
     */
    
        // private
        var self = this;
        self.MODULE = 'navigationModule';
        self.debugOn = false;
        self.selectedMenu = "";                                 
        self.documentTitle = { "id" :           "textToolDocumentTitle", // document title translation
                               "translation" :  null };

        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            // set event for the navbar toggle button
            $( '#navbarToggle' ).click( function(){
                $( '#navbarCollapse' ).toggle();
            } );   
            // set event for the navbar toggle button

            // event subscriptions
            jsProject.subscribeToEvent( 'languageChange', self.translate );
            jsProject.subscribeToEvent( 'navigationChange', self.navigationChange );
            // done event subscriptions
            
            // translate
            self.translate();
            
        };
        self.navigationChange = function(){
            // get the menu from global values
            var menu = jsProject.getValue( "menu", "navigation" );
            // get the menu from global values

            // debug info
            self.debug( 'navigationChange: ' + menu );
            // done debug info

            // selected menu class -> unSelected
            if( self.selectedMenu !== '' ){
                $('#' + self.selectedMenu ).attr( "class", "navigationMenuItem" );
            }
            // done selected menu class -> unSelected
            
            // set menu
            self.selectedMenu = menu;
            
            // selected menu class -> selected
            if( self.selectedMenu !== '' ){
                $('#' + menu ).attr( "class", "navigationMenuItemSelected" );
            }
            // done selected menu class -> selected
            
            // change document title
            self.setDocumentTitle();
            
            // hide the collapse navbar 
            $( '#navbarCollapse' ).hide();
        };
        self.setDocumentTitle = function(){
            // documemt title = title ( - menu )
            // get menu
            var menuName = jsProject.getValue( "menuName", "navigation" );
            if( menuName === '' ){
                document.title = self.documentTitle["translation"];
            }
            else {
                document.title = self.documentTitle["translation"] + ' - ' + menuName;
            }
        };
        self.translate = function(){
            self.debug( 'translate' );
            // create trnalation id array
            var translationIds = [];
            translationIds.push( self.documentTitle["id"] );
            // done create trnalation id array
            
            // call the ajax function
            textTool.translate( 'navigation', translationIds, self.translateCallback );
        };
        self.translateCallback = function( result ){
            self.debug( 'translateCallback' );
            
            // loop over values
            $.each( result, function( index, value ) {
                // debug info
                self.debug( 'index: ' + index + ' value: '+ value );
                // done debug info
                switch( index ) {
                    case self.documentTitle["id"] : {
                        self.documentTitle["translation"] = value;
                        break;
                    }
                    default : {
                        // error
                        self.debug( 'error unknown translation id' );
                    }
                }
            });
            // done loop over values
            
            // set document title
            self.setDocumentTitle();
            
            // hide navbar collapse
            $( '#navbarCollapse' ).hide();
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
})( textTool );