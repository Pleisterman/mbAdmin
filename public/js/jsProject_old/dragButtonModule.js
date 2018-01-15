/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:      this module controls buttons for the application
*               the dragButtonModule will create the events: mouseenter, mouseout and click.
*               when over the className will be appended by 'Over'
*               when out the className will be reset
*               when clicked the provided callback will be called.
*               
* Last revision: 28-10-2014
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
    jsProject.dragButtonModule = function(  buttonDivId, dragStartCallback, dragCallback, dragEndCallback ) {
        /*
        *   module dragButton 
        *   Purpose:    this file controls drag buttons for the application
        *               the dragButtonModule will create the events: mouseenter, mouseout and mousedown, mouseup, mouseclick.
        *               when over the className will be appended by 'Over'
        *               when out the className will be reset
        *               the dragButtonModule subscribes to the userActionChange event
        *               when dragstart the provided dragStartCallback will be called.
        *               when dragend the provided dragEndCallback will be called.
        *   
        *  functions: 
        *      new:                     parameters: 
        *                                   buttonDivId (html div id), 
        *                                   dragstart: callback function         
        *                                   dragend: callback function         
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
        self.MODULE = 'dragButtonModule';
        self.debugOn = true;

        // store the id of the button div element
        self.buttonDivId = buttonDivId;
        // store the className of the button div element
        self.buttonClassName = $("#" + self.buttonDivId ).attr('class');
        // store the modal mode of the button
        self.enabled = true;
        // store the callback
        self.dragStartCallback = dragStartCallback;
        self.dragCallback = dragCallback;
        self.dragEndCallback = dragEndCallback;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            // add the events
            $("#" + self.buttonDivId ).mouseenter( function(){ self.enter(); } );
            $("#" + self.buttonDivId ).mouseout( function(){ self.out(); } );
            $("#" + self.buttonDivId ).click( function(){ self.click(); } );
        
            // add the eventListeners 
            if( !self.modal ){
                jsProject.subscribeToEvent( 'UserActionEnabledChange', self.enableChangeEvent );
            }
        };
        self.enable = function( enable ) {
            self.debug( ' enable ' + enable );
            self.enabled = enable; 
            if( self.enabled ) {
                $("#" + self.buttonDivId ).attr('class', self.buttonClassName ); 
            }
            else {
                $("#" + self.buttonDivId ).attr('class', self.buttonClassName + 'Disabled' ); 
            }
        };
        self.enableChangeEvent = function( ) {
            self.enable( jsProject.getValue( 'userActionsEnabled', 'jsProject' ) ); 
        };
        self.enter = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( 'over ');
            $("#" + self.buttonDivId ).attr('class', self.buttonClassName + 'Over' ); 
        };
        self.out = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( 'out ');
            $("#" + self.buttonDivId ).attr('class', self.buttonClassName ); 
        };
        self.click = function( ) {
            if( !self.enabled ) {
                return;
            }
            self.debug( 'click ');
            self.callback( );
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };

        self.destruct = function() {
            self.debug( 'destruct' );
            
            // remove the events
            $("#" + self.buttonDivId ).off();
            
        };

        // initialize the module 
        self.construct();

        // public
        return {
            enable : function( enable ) {
                self.enable( enable );
            },
            destruct : function( ) {
                self.destruct( );
            }
        };
    };
})( jsProject );