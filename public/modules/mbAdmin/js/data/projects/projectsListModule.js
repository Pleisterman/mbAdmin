/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/projects/projectsListModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls selection of projecs. It controls the loads for open and
 *          closed project lists
 *          An open projects list wil always be loaded and cashed 
 *          Closed projects wil be loaded and cashed when needed
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){

    // MODULE: projectsListModule( void ) void 
    
    pleisterman.projectsListModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'projectsListModule';                 // string:  MODULE
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
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'projects',
                'what'              :   'lastUsed'
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.loadCallback );
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) void
            
            //self.debug( 'loadcallback result: row count: ' + result['rows'].length );
            // check critical errors
            if( result['criticalError'] ){
                pleisterman.showCriticalError( result['criticalError'] );
                pleisterman.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // has callback
            if( self.callback ){
                // set projects rows
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
    // DONE MODULE: projectsListModule( void ) void 
})( pleisterman );
// done create module function
