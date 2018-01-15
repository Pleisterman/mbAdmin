/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/vehicles/vehiclesListModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls selection of projecs. It controls the loads for open and
 *          closed vehicle lists
 *          An open vehicles list wil always be loaded and cashed 
 *          Closed vehicles wil be loaded and cashed when needed
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( sharesoft ){

    // MODULE: vehiclesListModule( void ) void 
    
    sharesoft.vehiclesListModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'vehiclesListModule';                 // string:  MODULE
        self.debugOn = false;                               // boolean: debug
        self.callback = null;                               // function: callback
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void
            
            // debug info
            //self.debug( 'load' );
            
            // remember callback
            self.callback = callback;
            
            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'vehicles',
                'what'              :   'lastUsed'
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.loadCallback );
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) void
            
            //self.debug( 'loadcallback result: row count: ' + result['rows'].length );
            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                sharesoft.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // has callback
            if( self.callback ){
                // set vehicles rows
                self.callback( result['rows'] );
                self.callback = null;
            }
            // done has callback
            
        // DONE FUNCTION: loadCallback( json: result ) void
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
            // FUNCTION: load( function: callback ) void
            load :  function( callback ){
                // call internal
                self.load( callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: vehiclesListModule( void ) void 
})( sharesoft );
// done create module function
