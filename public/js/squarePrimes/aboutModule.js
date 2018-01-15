/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this file controls the aboutModule for the application SquarePrimes
 * 
 *       functions:
 *           private:
 *               construct               called internal
 *               setEvent                called from the construct function
 *               show                    called from the menu event and the public function
 *               hide                    called from the close button event and the public function
 *               translate               called from the event subscription and rhe construct function
 *               translateCallback       callback for the translate function
 *               debug                   
 *           public:
 *               show
 *               hide
 *       event subscriptions:
 *               languageChange          called from the languageModule          
 *           
 * 
 * Last revision: 21-08-2015
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
    squarePrimes.aboutModule = function( ) {


    /*
     *  aboutModule 
     *   
     */
    
        // private
        var self = this;
        self.MODULE = 'aboutModule';
        self.debugOn = true;
        self.visible = false;                                                           // visibility
        self.panelPositions = { "width" : 40,                                       // percentage of window width
                                "maxWidth" : 420,                                   // px
                                "offsetTop" : 20 };                                 // percentage of window height
        self.menuText = {   "id" :                          "squarePrimesAboutMenu",    // translation for menu text
                            "translation" :                 null };
        self.htmlItems = {  "squarePrimesAboutHeader" :     { "translation" : null },   // translations for html elements
                            "squarePrimesAboutSubHeader" :  { "translation" : null },
                            "squarePrimesAboutText" :       { "translation" : null } };
        // functions
        self.construct = function() {
            self.debug( 'construct' );

            // set event on menu
            self.setEvent();
            
            // subscribe to events
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            jsProject.subscribeToEvent( 'languageChange', self.translate );

            // translate 
            self.translate();
            
        };
        self.setEvent = function(){
            // add event to the menu entry
            $('#aboutMenu' ).click( function(){
                self.show();
            } );   
        };
        self.show = function(){
            self.debug( 'show' );

            self.visible = true;
            
            // create html
            var html = '';
            html += '<div id="aboutPanel" class="panel panel-default"';
                html += ' style="position:absolute;"';
            html += '>';
                html += '<div class="panel-heading">';
                        html += self.htmlItems["squarePrimesAboutHeader"]["translation"];
                    html += '</div>'; 
                    html += '<div class="panel-body">';
                        html += '<b>';
                        html += self.htmlItems["squarePrimesAboutSubHeader"]["translation"];
                        html += '</b><br>';
                        html += self.htmlItems["squarePrimesAboutText"]["translation"];
                        html += '<div id="aboutClose" style="float:right;margin-top:30px;" class="btn btn-success">';
                            html += 'ok';
                        html += '</div>'; 
                    html += '</div>'; 
                html += '</div>'; 
            html += '</div>';
            // done create html
            
            // add the html to the overlay div
            $( '#overlay' ).html( html );
            $( '#overlay' ).show( );
            self.layoutChange();
            
            // change navigation
            jsProject.setValue( "menu", "navigation", "aboutMenu" );
            jsProject.setValue( "menuName", "navigation", self.menuText['translation'] );
            jsProject.callEvent( "navigationChange" );
            // done change navigation
            
            // set event on close function
            $( '#aboutClose' ).click( function(){
                self.hide();
            } );   
            
        };
        self.hide = function(){
            self.visible = false;
            
            // remove event from close button
            $( '#aboutClose' ).click = null;
            // remove content from overlay
            $( '#overlay' ).html( "" );
            $( '#overlay' ).hide( );
            
            // change navigation
            jsProject.setValue( "menu", "navigation", "" );
            jsProject.setValue( "menuName", "navigation", "" );
            jsProject.callEvent( "navigationChange" );
            // done change navigation
            
        };
        self.layoutChange = function() {
            if( !self.visible ){
                return;
            }
            //self.debug( 'layoutChange' );
            var width = ( $( '#overlay' ).width() / 100 ) * self.panelPositions['width'];
            if( width > self.panelPositions['maxWidth'] ){
                width = self.panelPositions['maxWidth'];
            }
            var offsetX = ( $( '#overlay' ).width() - width ) / 2;
            var height = $( '#aboutPanel').height();
            //self.debug( 'height: ' + height );
            
            var offsetY = ( $( '#overlay' ).height() - height ) / 2;
            $( '#aboutPanel' ).css( 'top', offsetY );
            $( '#aboutPanel' ).css(  'left', offsetX );
            $( '#aboutPanel' ).width( width );
            
        };
        self.translate = function(){
            self.debug( 'translate' );
            
            // create array with translation ids
            var translationIds = [];
            translationIds.push( self.menuText["id"] );
            
            $.each( self.htmlItems, function( index, value ) {
                translationIds.push( index );
            });
            // done create array with translation ids
            
            // translate
            squarePrimes.translate( 'about', translationIds, self.translateCallback );
        };
        self.translateCallback = function( result ){
            self.debug( 'translateCallback' );
            // loop over values
            $.each( result, function( index, value ) {
                //self.debug( 'index: ' + index + ' value: '+ value );
                switch( index ) {
                    case 'squarePrimesAboutMenu' : {
                        // set translation of menu
                        var translation = "";    
                        translation += '';
                        translation += value;
                        translation += '';
                        $('#' + index ).html( translation );
                        self.menuText["translation"] = translation;
                        break;
                    }
                    default : {
                        // set html element translations    
                        self.htmlItems[index]["translation"] = value;
                    }
                }
            });
            // done loop over values
            
            // show if visible to update content
            if( self.visible ){
                self.show(); 
            }
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
            show : function( visible ){
                if( visible ) {
                    self.show();
                }
                else {
                    self.hide();
                }
            }
        };
    };
})( squarePrimes );