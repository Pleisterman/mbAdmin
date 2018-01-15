/*
 *  Project: MbAdmin
 *  
 *  File: /mbAdmin/js/data/costs/costsListSelectModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls selection of costs for the list. 
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( sharesoft ){
    
    // MODULE: costsListSelectModule( void ) 
    
    sharesoft.costsListSelectModule = function( ) {
    
        // PRIVATE:
        var self = this;                                    // object: self
        self.MODULE = 'costsListSelectModule';              // string: MODULE
        self.debugOn = false;                                // boolean: debug
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
        // FUNCTION: loadList( string: listSelection, string: selection, function: callback ) void
            
            // debug info
            self.debug( 'load list selection: ' +  listSelection + ' selection: ' + selection );
            
            // remember callback
            self.callback = callback;
            
            // construct options object
            var options = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'costs',
                'what'              :   listSelection,
                'selection'         :   selection
            };
            // done construct options object

            // AJAX: /sharesoft/read
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, options, self.loadCallback );
        
        // FUNCTION: FUNCTION: loadList( string: listSelection, string: selection, function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) AJAX CALLBACK
            
            // check critical errors
            if( result['criticalError'] ){
                // show error
                sharesoft.showCriticalError( result['criticalError'] ); // ERROR: criticalError
                // end busy proces
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check critical errors

            // has callback
            if( self.callback ){
                // set projects rows
                self.callback( result['rows'] );
                // unset callback
                self.callback = null;
            }
            // done has callback

        // DONE FUNCTION: loadCallback( json: result ) AJAX CALLBACK
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug is on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.MODULE + ' ' + message );
            }
            // done debug is on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
            loadList :  function( listSelection, selection, callback ){
            // FUNCTION: loadList( string id, selection array, callback ) void
                self.loadList( listSelection, selection, callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: costsListSelectModule( void ) 
})( sharesoft );
// done create module function
