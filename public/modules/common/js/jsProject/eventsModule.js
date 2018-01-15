/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:  this module controls custom events for the application 
*           application objects can subscribe to an event with a callback 
*           application objects can call events and subscribed object's callbacks will be called
*           events are called synchronious in order of addition
*           application objects can unsubscribe from events
*           
* Usage:    call jsProject.subscribeToEvent( eventId, callback );
*               to add an event subscription
*           call jsProject.unSubscribeFromEvent( eventId, callback );
*               to remove an added event subscription
*           call jsProject.callEvent( eventId );
*               call all subscribed events 
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
    jsProject.eventsModule = function( ) {

        // eventsModule
        
        // private
        var self = this;
        self.debugOn = false;
        self.MODULE = 'eventsModule';
        
        // the event object to store the events
        self.events = {};

        // functions                              
        self.construct = function() {
            self.debug( 'construct ' );
             
            // add the functions to jsProject
            jsProject.subscribeToEvent = self.subscribe;
            jsProject.unSubscribeFromEvent = self.unSubscribe;
            jsProject.callEvent = self.call;
            // done add the functions to jsProject

        };
        self.subscribe = function( eventId, callback ) {
            self.debug( 'subscribe: '  + eventId );
            // check if the eventId exists
            if( !self.events[eventId] ){
                // no event so create a new callback list
                self.events[eventId] = new Array();
            }
            // add the callback to the list
            var eventObject = {
                'callback'  :   callback
            };
            self.events[eventId].push( eventObject );
        };
        self.unSubscribe = function( eventId, callback ) {
            self.debug( 'unSubscribe: ' + eventId );
            // check if the eventId exists
            if( self.events[eventId] ){
                for( var i = self.events[eventId].length - 1; i >= 0 ; i-- ) {
                    // check if the callback matches
                    if( self.events[eventId][i]['callback'] === callback ) {
                        // remove the callback from the list 
                        self.events[eventId].splice( i, 1 );
                    }
                }
            }
        };
        self.call = function( eventId, options ) {
            self.debug( 'call: ' + eventId );
            // check if the eventId exists
            if( self.events[eventId] ){
                var callbacks = [];
                // call the callbacks
                for( var i = 0; i < self.events[eventId].length; i++ ) {
                    callbacks.push( self.events[eventId][i]['callback'] );
                }
                for( var i = 0; i < callbacks.length; i++ ) {
                    callbacks[i]( options );
                }
            }
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };
        // initialize the module 
        self.construct();
        
    };
    
})( jsProject );


