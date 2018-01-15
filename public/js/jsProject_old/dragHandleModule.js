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
    jsProject.dragHandleModule = function(  windowDivId, handleDivId, modal, dragStartCallback, dragCallback, dragEndCallback ) {
        /*
        *   module dragHandleModule 
        *   Purpose:    this file controls draggable windows for the application
        *               the dragHandleModule will create the events: mouseenter, mouseout and mousedown, mouseup, mouseclick.
        *               when over the className will be appended by 'Over'
        *               when out the className will be reset
        *               the dragHandleModule subscribes to the userActionChange event
        *               when dragstart the provided dragStartCallback will be called.
        *               while dragging the provided dragCallback will be called, after the window is repositioned
        *               when dragend the provided dragEndCallback will be called.
        *   
        *  functions: 
        *      new:                     parameters: 
        *                                   windowDivId (html element that can be dragged, div element id), 
        *                                   handleDivId (html element that can be is the handle for dragging, div element id), 
        *                                   modal: If true the window will not subscibe 
        *                                          to the UserActionEnabledChange event
        *                                          for use in modal dialogs,
        *                                   dragStartCallback: callback function / null        
        *                                   dragCallback: callback function / null         
        *                                   dragEndCallback: callback function / null         
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
        *          down:                parameters: ( void ) return: void
        *                               called by the mousedown event
        *                               will call the provided dragStartCallback 
        *          up:                  parameters: ( void ) return: void
        *                               called by the mouseup event
        *                               when dragging will call the provided dragEndCallback 
        *          click:               parameters: ( void ) return: void
        *                               called by the click event
        *                               when dragging will call the provided dragEndCallback 
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
        self.MODULE = 'dragHandleModule';
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
        // store the callbacks
        self.dragStartCallback = dragStartCallback;
        self.dragCallback = dragCallback;
        self.dragEndCallback = dragEndCallback;
        self.dragging = false;
        self.container = null;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            // add the events
            $("#" + self.handleDivId ).mouseenter( function( ){ self.enter(); } );
            $("#" + self.handleDivId ).mouseout( function(){ self.out(); } );
            $("#" + self.handleDivId ).mousedown( function( event ){ self.down( event ); } );
        
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
            
            $("#" + self.handleDivId ).attr('class', self.handleClassName + 'Over' ); 
        };
        self.out = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( ' out' );
            
            $("#" + self.handleDivId ).attr('class', self.handleClassName ); 
        };
        self.down = function( event ) {
            if( !self.enabled ) {
                return;
            }
            self.lastPosition = { 'x' : event.pageX, 'y' : event.pageY };
            $(document).on( 'mousemove', function( event ) { self.move( event ); } );
            $(document).on( 'mouseup', function( event ) { self.up( event ); } );
        };
        self.move = function( event ) {
            self.positionChange = { 'x' : 0, 'y' : 0 };
            self.positionChange['y'] = self.lastPosition['y'] - event.pageY;
            self.positionChange['x'] = self.lastPosition['x'] - event.pageX;
            var newTop = parseFloat( $('#' + self.windowDivId ).position().top ) - parseFloat( self.positionChange['y']  ),
                newLeft = parseFloat( $('#' + self.windowDivId ).position().left ) - parseFloat( self.positionChange['x'] ),
                width = parseFloat( $('#' + self.windowDivId ).width() ),
                height = parseFloat( $('#' + self.windowDivId ).height() ),
                screenWidth = parseFloat( $('#jsProjectScene' ).width() ),
                screenHeight = parseFloat( $('#jsProjectScene' ).height() );
            if( newTop < 0 ){
                newTop = 0;
            } 
            if( newTop + height > screenHeight ) {
                newTop = screenHeight - height;
            }
            if( newLeft < 0 ){
                newLeft = 0;
            } 
            if( newLeft + width > screenWidth ) {
                newLeft = screenWidth - width;
            }
            self.debug( 'newTop' + newTop );
            
            $( '#' + self.windowDivId ).css( 'top', newTop );
            $( '#' + self.windowDivId ).css( 'left', newLeft );
            self.lastPosition = { 'x' : event.pageX, 'y' : event.pageY };
        }; 
        self.up = function( event ) {
            $(document).off('mousemove');
            $(document).off('mouseup');
        }; 
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