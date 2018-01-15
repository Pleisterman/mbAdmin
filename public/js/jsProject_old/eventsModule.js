/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:  this module controls the events for the application 
*           applcation objects can subscribe to an event with a callback 
*           applcation objects can call events and subscibed objects callbacks will be called
*           applcation objects can unsubscribe from events
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
    jsProject.eventsModule = function( ) {
        /*
        *  module eventsModule 
        *  purpose:
        *           applcation objects can subscribe to an event with a callback 
        *           applcation objects can call events and subscibed objects callbacks will be called
        *           applcation objects can unsubscribe from events
        *   
        *   functions: 
        *       private:
        *           construct:          parameters: ( void ) return: void
        *                               called by the module for initialization of the module
        *           subscribe:          parameters: ( string eventID, call ) 
        *                               create a subscription to eventId 
        *           unSubscribe:        parameters: ( string eventID, call ) 
        *                               remove a subscription from eventId 
        *           callEvent:          parameters: ( string eventID ) 
        *                               call event subscription(s) associated with the eventId 
        *           debug:              parameters: ( string string ) return: void
        *                               calls the jsProject.debug( string ) when self.debugOn
        *      
        *  The module will add the function subscribeToEvent to the application
        *  The module will add the function unSubscribeFromEvent to the application
        *  The module will add the function callEvent to the application    
        *  
        */
       
        // private
        var self = this;
        self.debugOn = false;
        self.MODULE = 'eventsModule';
        
        // the event object to store the events
        self.events = {};

        // functions                              
        self.construct = function() {
            // no debugger yet the eventsModule is constructed before the debuggerModule
             
            // create the application calls
            jsProject.subscribeToEvent = self.subscribe;
            jsProject.unSubscribeFromEvent = self.unSubscribe;
            jsProject.callEvent = self.call;

        };
        self.subscribe = function( eventId, callback ) {
            self.debug( 'subscribe: '  + eventId );
            // check if the eventId exists
            if( !self.events[eventId] ){
                // no event so create a new callback list
                self.events[eventId] = new Array();
            }
            // add the callback to the list
            self.events[eventId].push( callback );
        };
        self.unSubscribe = function( eventId, callback ) {
            self.debug( 'unSubscribe: ' + eventId );
            // check if the eventId exists
            if( self.events[eventId] ){
                for( var i = 0; i < self.events[eventId].length; i++ ) {
                    // check if the callback matches
                    if( self.events[eventId][i] === callback ) {
                        // remove the callback from the list 
                        self.events[eventId].splice( i, 1 );
                    }
                }
            }
        };
        self.call = function( eventId ) {
            self.debug( 'call: ' + eventId );
            // check if the eventId exists
            if( self.events[eventId] ){
                // call the callbacks
                for( var i = 0; i < self.events[eventId].length; i++ ) {
                    self.events[eventId][i]();
                }
            }
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ' ' + string );
            }
        };
        // initialize the module 
        self.construct();
        
    };
    
})( jsProject );


