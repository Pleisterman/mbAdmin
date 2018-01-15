/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this module controls the dragable windows for the application
*          dragable windows are html elements with a handle that enables the user to 
*          drag the window to a different position 
* Last revision: 16-12-2014
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
    jsProject.collapseHandleModule = function(  windowDivId, handleDivId, modal, isOpen ) {
        /*
        *   module collapseHandleModule 
        *   Purpose:    this file controls collapsable windows for the application
        *               the collapseHandleModule will create the events: mouseenter, mouseout and mousedown, mouseup, mouseclick.
        *               when over the className will be appended by 'Over'
        *               when out the className will be reset
        *               
        *   
        *  functions: 
        *      new:                     parameters: 
        *                                   windowDivId (html element that can be dragged, div element id), 
        *                                   handleDivId (html element that can be is the handle for dragging, div element id), 
        *                                   modal: If true the window will not subscibe 
        *                                          to the UserActionEnabledChange event
        *                                          for use in modal dialogs,
        *               
        *      private:
        *          construct:           parameters: ( void ) return: void
        *                               called by the module for initialization of the module
        *          enable:              parameters: ( bool enable ) return: void
        *                               mouserEvents will be off when enabled is false
        *                               appends 'Disabled' to css className 
        *                               called by the public function
        *                               and from module function enableChanegEvent
        *          enableChanegEvent:   parameters: ( void ) return: void
        *                               calls the function enable with the application value userActionsEnabled
        *                               called by the event subsciption UserActionEnabledChange 
        *                               Needed for application modal dialogs
        *          enter:               parameters: ( void ) return: void
        *                               called by the mouseenter event
        *                               appends 'Over' to css className 
        *          out:                 parameters: ( void ) return: void
        *                               called by the mouseout event
        *                               resets className 
        *                               when dragging will call the provided dragEndCallback 
        *          close:               parameters: ( void ) return: void
        *                               called by the mousedown event when window is open
        *          open:                parameters: ( void ) return: void
        *                               called by the mousedown event when window is closed
        *          debug:               parameters: ( string string ) return: void
        *                               calls the application.debug( string ) when self.DebugOn
        *          destruct:            parameters: ( void ) return: void
        *                               remove the events
        *                               
        *  event subscriptions:
        *       UserActionsEnabledChange:   to enable / disable userAction in application modal modes
        *       
        *  public: 
        *       enable         
        *       destruct           
        *       
        */
    
        // private
        var self = this;
        self.MODULE = 'collapseHandleModule';
        self.debugOn = true;

        // store the id of the window div element
        self.windowDivId = windowDivId;
        // store the id of the handle div element
        self.handleDivId = handleDivId;
        // store the className of the button div element
        self.handleClassName = $("#" + self.handleDivId ).attr('class');
        // store the modal mode of the button
        self.modal = modal;
        // store enabled mode
        self.enabled = true;
        // store the state
        self.isOpen = isOpen;
        self.height = 0;
        self.overflow = '';
                
                
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            // add the events
            $("#" + self.handleDivId ).mouseenter( function( ){ self.enter(); } );
            $("#" + self.handleDivId ).mouseout( function(){ self.out(); } );
            $("#" + self.handleDivId ).mousedown( function(){ self.close(); } );
        
             if( self.isOpen ){
                $("#" + self.handleDivId ).attr('class', self.handleClassName + 'Close' ); 
            }
            else {
                $("#" + self.handleDivId ).attr('class', self.handleClassName + 'Open' ); 
            }
            
            // add the eventListeners 
            if( !self.modal ){
                jsProject.subscribeToEvent( 'UserActionEnabledChange', self.enableChangeEvent );
            }
        };
        self.setContainer = function( container ) {
            self.container = container;
        };
        self.enable = function( enable ) {
            self.debug( ' enable ' + enable );
            self.enabled = enable; 
            if( self.enabled ) {
                $("#" + self.handleDivId ).attr('class', self.handleClassName ); 
            }
            else {
                $("#" + self.handleDivId ).attr('class', self.handleClassName + 'Disabled' ); 
            }
        };
        self.enableChangeEvent = function( ) {
            self.enable( jsProject.getValue( 'userActionsEnabled', 'jsProject' ) ); 
        };
        self.enter = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( ' over');
            if( self.isOpen ){
                $("#" + self.handleDivId ).attr('class', self.handleClassName + 'CloseOver' ); 
            }
            else {
                $("#" + self.handleDivId ).attr('class', self.handleClassName + 'OpenOver' ); 
            }
        };
        self.out = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( ' out' );
            if( self.isOpen ){
                $("#" + self.handleDivId ).attr('class', self.handleClassName + 'Close' ); 
            }
            else {
                $("#" + self.handleDivId ).attr('class', self.handleClassName + 'Open' ); 
            }
            
        };
        self.open = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( 'open' );
            self.isOpen = true;
            $("#" + self.handleDivId ).off('mousedown');
            $("#" + self.handleDivId ).mousedown( function(){ self.close(); } );
            $("#" + self.handleDivId ).attr('class', self.handleClassName + 'CloseOver' ); 
            $("#" + self.windowDivId ).height( self.height );
            $("#" + self.windowDivId ).css( 'overflow', self.overflow );
        };
        self.close = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( 'close' );
            self.isOpen = false;
            $("#" + self.handleDivId ).off('mousedown');
            $("#" + self.handleDivId ).mousedown( function(){ self.open(); } );
            $("#" + self.handleDivId ).attr('class', self.handleClassName + 'OpenOver' ); 
            self.height = $("#" + self.windowDivId ).height();
            self.overflow = $("#" + self.windowDivId ).css( 'overflow' );
            $("#" + self.windowDivId ).height( 20 );
            $("#" + self.windowDivId ).css( 'overflow', 'hidden' );
        }
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };

        self.destruct = function() {
            self.debug( 'destruct' );
            
            // remove the events
            $("#" + self.handleDivId ).off();
            
        };

        // initialize the module 
        self.construct();

        // public
        return {
            setContainer : function( container ) {
                self.setContainer( container );
            },
            enable : function( enable ) {
                self.enable( enable );
            },
            destruct : function( ) {
                self.destruct( );
            }
        };
    };
})( jsProject );