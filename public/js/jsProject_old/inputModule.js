/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:      this module controls buttons for the application
*               the inputModule will create the events: mouseenter, mouseout and click.
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
    jsProject.inputModule = function(  inputDivId, modal, enterCallback, changeCallback, exitCallback ) {
        /*
        *   module inputModule 
        *   Purpose:    this file controls inputs for the application
        *               the inputModule will create the events: getFocus, looseFocus, keyup.
        *               the inputModule subscribes to userActionChange event for application non Modal Dialogs 
        *               when the input gets focus, looses focus or the when the content changes the provided callback will be called.
        *   
        *  functions: 
        *      new:                     parameters: 
        *                                   buttonDivId (html div id), 
        *                                   modal: If true the button will not subscibe 
        *                                          to the UserActionEnabledChange event
        *                                          for use in modal dialogs,
        *                                   enterCallback: callback function for when the input gets focus / null       
        *                                   changeCallback: callback function for when the input content changes / null        
        *                                   exitCallback: callback function for when the input looses focus / null        
        *            
        *      private:
        *          construct:           parameters: ( void ) return: void
        *                               called by the module for initialization of the module
        *          enable:              parameters: ( bool enable ) return: void
        *                               mouserEvents will be off when enabled is false
        *                               appends 'Disabled' to css className 
        *                               called by the public function
        *                               and from module function enableChanegEvent
        *          enableChangeEvent:   parameters: ( void ) return: void
        *                               calls the function enable with the application value userActionsEnabled
        *                               called by the event subsciption UserActionEnabledChange 
        *                               Needed for application modal dialogs
        *          enter:               parameters: ( void ) return: void
        *                               called by the getfocus event
        *                               calls the provided callback 
        *          out:                 parameters: ( void ) return: void
        *                               called by the loosefocus event
        *                               calls the provided callback 
        *          change:              parameters: ( void ) return: void
        *                               called by the keyup event
        *                               calls the provided callback 
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
        self.MODULE = 'inputModule';
        self.debugOn = true;

        // store the id of the input div element
        self.inputDivId = inputDivId;
        // store the className of the input div element
        self.inputClassName = $("#" + self.inputDivId ).attr('class');
        // store the modal mode of the input
        self.modal = modal;
        // store enabled mode
        self.enabled = true;
        // store the callback
        self.enterCallback = enterCallback;
        self.changeCallback = changeCallback;
        self.exitCallback = exitCallback;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            // add the events
            $("#" + self.inputDivId ).focus( function(){ self.enter(); } );
            $("#" + self.inputDivId ).focusout( function(){ self.exit(); } );
            $("#" + self.inputDivId ).keyup( function(){ self.change(); } );
        
            // add the eventListeners 
            if( !self.modal ){
                jsProject.subscribeToEvent( 'UserActionEnabledChange', self.enableChangeEvent );
            }
        };
        self.enable = function( enable ) {
            self.debug( ' enable ' + enable );
            self.enabled = enable; 
            if( self.enabled ) {
                $("#" + self.inputDivId ).attr('class', self.inputClassName ); 
            }
            else {
                $("#" + self.inputDivId ).attr('class', self.inputClassName + 'Disabled' ); 
            }
        };
        self.enableChangeEvent = function( ) {
            self.enable( jsProject.getValue( 'userActionsEnabled', 'jsProject' ) ); 
        };
        self.enter = function( ) {
            if( !self.enabled ) {
                return;
            }
            if( self.debugOn ) {
                jsProject.debug( ' enter');
            }
            if( self.enterCallback ) {
                self.enterCallback();
            }
        };
        self.exit = function( ) {
            if( !self.enabled ) {
                return;
            }
            if( self.debugOn ) {
                jsProject.debug( ' exit' );
            }
            if( self.exitCallback ) {
                self.exitCallback();
            }
        };
        self.change = function( ) {
            if( !self.enabled ) {
                return;
            }
            if( self.debugOn ) {
                jsProject.debug( ' change');
            }
            if( self.changeCallback ) {
                self.changeCallback();
            }
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };

        self.destruct = function() {
            self.debug( 'destruct' );
            
            // remove the events
            $("#" + self.inputDivId ).off();
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