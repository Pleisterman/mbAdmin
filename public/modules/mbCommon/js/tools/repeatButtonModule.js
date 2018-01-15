/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/tools/repeatButtonModule.js
 * 
 *  Last revision: 11-01-2017
 * 
 *  Purpose: 
 *          this file controls the behavior of repeatbuttons
 *          a repeat button will repeat the calling the provided
 *          callback event as long as the mouse is down
 *          the repeated call ends on the mouseup event
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: repeatButtonModule( string: element id, integer: slowInterval, integer: fastInterval, function: repeatCallback ) void 
    
    pleisterman.repeatButtonModule = function( elementId, slowInterval, fastInterval, repeatCallback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'repeatButtonModule';         // string:  MODULE
        self.debugOn = false;                       // boolean: debug
        self.elementId = elementId;                 // html element id
        self.repeatCallback = repeatCallback;       // callback function
        self.timer = null;                          // store timer object
        self.ticInterval = slowInterval;            // miliseconds
        self.fastTicInterval = fastInterval;        // miliseconds
        self.repeated = 0;                          // integer
        self.speedUpAt = 10;                        // integer, used for count times repeated
        self.on = true;                             // enable / disable repeat function
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the down event
            $( '#' + self.elementId ).mousedown( function(){ self.buttonDown(); } ); 
            
        // DONE FUNCTION: construct( void ) void
        };
        self.buttonDown = function(){
        // FUNCTION: buttonDown( void ) void
            
            // debug info
            self.debug( 'down' );
            
            // already running or off 
            if( self.timer || !self.on ){
                // done 
                return;
            }
            // done already running or off 
            
            // remove down event
            $( '#' + self.elementId ).off( 'mousedown' );
            // set the new up event
            $( document ).mouseup( function(){ self.buttonUp(); } );
            // reset repeated
            self.repeated = 0;
            // call the callback
            self.repeatCallback();
            // start timer
            self.timer = setTimeout( function () { self.tic(); }, self.ticInterval );
            
        // DONE FUNCTION: buttonDown( void ) void
        };
        self.buttonUp = function(){
        // FUNCTION: buttonUp( void ) void
            
            // stop timer
            if( self.timer ){
                // clear timer
                clearTimeout( self.timer );
                // unset timer
                self.timer = null;  
            }
            // done stop timer
            
            // remove the up event
            $( document ).off( 'mouseup' );
            // add the down event
            $( '#' + self.elementId ).mousedown( function(){ self.buttonDown(); } ); 
            
        // DONE FUNCTION: buttonUp( void ) void
        };
        self.tic = function(){
        // FUNCTION: tic( void ) void
            
            // call the callback
            self.repeatCallback();
            
            // check for speedup
            if( self.repeated >= self.speedUpAt ){
                // start timer
                self.timer = setTimeout( function () { self.tic(); }, self.fastTicInterval );
            }
            else {
                // repeat += 1
                self.repeated++;
                // start timer
                self.timer = setTimeout( function () { self.tic(); }, self.ticInterval );
            }
            // done check for speedup
            
        // DONE FUNCTION: tic( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // stop timer
            if( self.timer ){
                // clear the timer
                clearTimeout( self.timer );
                // unset timer
                self.timer = null;  
            }
            // done stop timer
            
            // remove events
            $( '#' + self.elementId ).off();
            // remove events
            $( document ).off( 'mouseup' );
            // done remove events
             
            // remove the callback
            self.repeatCallback = null;
            
        // DONE FUNCTION: destruct( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.MODULE + ' ' + message );
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
            // FUNCTION: getId( boolean: on ) void
            on : function( on ){
                // set self on
                self.on = on;
            },
            // FUNCTION: destruct( void ) void
            destruct : function(){
                // call internal
                self.destruct();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: repeatButtonModule( string: element id, integer: slowInterval, integer: fastInterval, function: repeatCallback ) void  
})( pleisterman );
// done create module function
