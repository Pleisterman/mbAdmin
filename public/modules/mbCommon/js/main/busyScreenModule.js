/* 
 *  Project: MbSiteCms 
 * 
 *  File: /mbCommon/js/main/busyScreenModule.js
 * 
 *  Last revision: 31-12-2016
 * 
 *  Purpose: 
 *          this module controls the busyScreen for the application
 *          the busy screen is shown when the application is
 *          processing and user interaction is disabled
 *          the module keeps track of the number of processes called
 *          and will only clear when all processes are done
 *           
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: busyScreenModule( void ) void 
    
    pleisterman.busyScreenModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'busyScreenModule';                           // string:  MODULE
        self.debugOn = false;                                       // boolean: debug
        self.screenOptions = {                                      // json: screen options
            'id'                :   'busyDiv',                      // string: element id
            'element'           :   'div',                          // string: html element type 
            'text'              :   '',                             // string: text
            'display'           :   'none',                         // css display style
            'position'          :   'absolute',                     // css position
            'top'               :   0,                              // css top
            'left'              :   0,                              // css left
            'styleWidth'        :   '100%',                         // css style width 
            'styleHeight'       :   '100%',                         // css style height 
            'backgroundColor'   :   pleisterman.colors['busyBackgroundColor']['color'],   // css color: background color
            'zIndex'            :   pleisterman.getSetting( 'zIndexBusyDiv' ).toString()  // css z-index
        };                                                          // done json: screen options
        self.textOptions = {                                        // json: text options
            'id'                :   'busyText',                     // string: element id
            'element'           :   'div',                          // string: html element type   
            'text'              :   pleisterman.translations['busy'], // string: text
            'position'          :   'absolute',                     // css position
            'color'             :   pleisterman.colors['busyColor']['color'], // css color: color
            'fontSize'          :   '1.6em',                        // css font size
            'lineHeight'        :   '1.6em',                        // css line height
            'letterSpacing'     :   10,                             // css letter spacing
            'fontWeight'        :   'bold'                          // css font weight
        };                                                          // done json: text options
        self.layout = {                                             // json: layout
            'fontSize'      :   '1.6em',                            // css font size
            'fontWeight'    :   'bold'                              // css font weight
        };                                                          // done json: layout    
        self.processes = 0;                                         // integer: processes
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();

            // subscribe to events
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
        
            // add start busy screen
            pleisterman.startBusyProcess = self.startBusyProcess;
            // add is busy
            pleisterman.isBusy = self.isBusy;
            // add end busy screen
            pleisterman.endBusyProcess = self.endBusyProcess;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
        
            // create busy screen 
            var html = jsProject.jsonToElementHtml( self.screenOptions );
            
            // add the screen 
            $( document.body ).append(  html );
            
            // add text
            $( '#busyDiv' ).html( jsProject.jsonToElementHtml( self.textOptions ) );
            
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.startBusyProcess = function(){
        // FUNCTION: startBusyProcess( void ) void
        
            // debug info
            self.debug( 'start proces' );
            // add process
            self.processes++;
            // show screen
            $( '#busyDiv' ).show();
            
        // DONE FUNCTION: startBusyProcess( void ) void
        };
        self.isBusy = function(){
        // FUNCTION: isBusy( void ) boolean
        
            // processes > 0
            if( self.processes > 0 ){
                // return busy
                return true;
            }
            // done processes > 0
            
            // return not busy
            return false;
            
        // DONE FUNCTION: isBusy( void ) boolean
        };
        self.endBusyProcess = function(){
        // FUNCTION: endBusyProcess( void ) void
        
            // debug info
            self.debug( 'end proces' );
            // remove process
            self.processes--;
            // debug info
            self.debug( 'processes left: ' + self.processes );
            
            // no processes left
            if( self.processes === 0 ){
                $( '#busyDiv' ).hide();
            }
            // done no processes left
            
            // error info
            if( self.processes < 0 ){
                self.debug( 'number of processes less then 0' );
            }
            // done error info
            
        // DONE FUNCTION: endBusyProcess( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // calculate height and width and position of the text
            var height = $( '#busyDiv' ).height();
            var top = height / 2;
            var width = $( '#layout' ).width();
            var left = ( width - $( '#busyText' ).width() ) / 2;
            // done calculate height and width and position of the text

            // set position of text
            $( '#busyText' ).css( 'left',  left + 'px' );
            $( '#busyText' ).css( 'top',  top + 'px' );
            // set position of text
            
        // DONE FUNCTION: layoutChange( void ) void
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
        };
        // DONE PUBLIC
    };
    // DONE MODULE: busyScreenModule( void ) void 
})( pleisterman );
// done create module function
