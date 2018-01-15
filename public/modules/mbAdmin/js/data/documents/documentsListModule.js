/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/documents/documentsListModule.js
 * 
 *  Last Revision:  16-01-2017
 *  
 * Purpose: 
 *      this module controls selection of projecs. It controls the loads for open and
 *      closed project lists
 *      An open projects list wil always be loaded and cashed 
 *      Closed projects wil be loaded and cashed when needed
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

    // MODULE: documentsListModule( void ) void 
    
    pleisterman.documentsListModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'documentsListModule';                // string: MODULE
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
        self.loadList = function( listSelection, selection, callback ){
        // FUNCTION: loadList( string: listSelection, integer, selection, function: callback ) void
        
            // debug info
            self.debug( 'load' );
            
            // remember callback
            self.callback = callback;
            
            // construct data object
            var data = { 
                'userDirectory'     :   pleisterman.userDirectory,
                'subject'           :   'documents',
                'what'              :   listSelection,
                'selection'         :   selection
            };
            // done construct data object

            // AJAX: /pleisterman/read
            jsProject.securePost( '/pleisterman/read', pleisterman.token, data, self.loadCallback );
            
        // DONE FUNCTION: loadList( string: listSelection, integer, selection, function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) AJAX CALLBACK
            
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

        // DONE FUNCTION: loadCallback( json: result ) AJAX CALLBACK
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
            loadList :  function( listSelection, selection, callback ){
            // FUNCTION: loadList( string: listSelection, integer, selection, function: callback ) void 
                self.loadList( listSelection, selection, callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: documentsListModule( void ) void 
})( pleisterman );
// done create module function
