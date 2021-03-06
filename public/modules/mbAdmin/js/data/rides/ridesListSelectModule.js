/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/rides/ridesListSelectModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module controls selection of rides.
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){
    
    // MODULE: ridesListSelectModule( void ) void
    
    pleisterman.ridesListSelectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'ridesListModule';            // string: MODULE
        self.debugOn = false;                       // boolean: debug
        self.callback = null;                       // function: callback
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.loadList = function( listSelection, selection, callback ){
        // FUNCTION: loadList( string: listSelection, json: selection, function: callback ) void
        
           // debug info
            self.debug( 'load' );
            
            // remember callback
            self.callback = callback;
            
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'rides',
                'what'              :   listSelection,
                'selection'         :   selection
            };
            // done construct data object

            // AJAX: /pleisterman/read
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.loadCallback );
            
        // DONE FUNCTION: loadList( string: listSelection, json: selection, function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) AJAX CALLBACK
            
            // check result
            if( self.hasCallbackErrors( result ) ){
                // done with error
                return;
            }
            // done check result

            // has callback
            if( self.callback ){
                // call the callback
                self.callback( result['rows'] );
                // unset callback
                self.callback = null;
            }
            // done has callback

        // DONE FUNCTION: loadCallback( json: result ) AJAX CALLBACK
        };
        self.hasCallbackErrors = function( result ){
        // FUNCTION: hasCallbackErrors( json: result ) boolean

            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
            // done 
            return false;
            
        // DONE FUNCTION: hasCallbackErrors( json: result ) boolean
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
            // FUNCTION: loadList( string: listSelection, json: selection, function: callback ) void
                self.loadList( listSelection, selection, callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: ridesListSelectModule( void ) void
})( pleisterman );
// done create module function
