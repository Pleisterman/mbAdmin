/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/export/exportRidesTotalsSelectModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls user select add rides headers export of data 
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

    // MODULE: exportRidesTotalsSelectModule( json: options ) void
    
    pleisterman.exportRidesTotalsSelectModule = function( options ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'exportRidesTotalsSelectModule'; // string: MODULE
        self.debugOn = true;                       // boolean: debug
        self.options = options;                     // json: options
        self.totals = [                             // json: totals
            {                                       // json: noTotals
                'id'            :   'noTotals',     // string: id
                'text'          :   pleisterman.translations['noTotals'] // string: TRANSLATION: noTotals
            },                                      // done json: noTotals
            {                                       // json: endTotals
                'id'            :   'endTotal',     // string: id
                'text'          :   pleisterman.translations['endTotal'] // string: TRANSLATION: endTotal
            }                                       // done json: endTotals
        ];                                          // done json: totals
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.getSelectData = function( id, callback ){
        // FUNCTION: getSelectData( string: id, function: callback ) void
            
            // debug info
            self.debug( 'getSelectData id: ' + id );
            
            // create json result
            var result = {
                'open' : {
                    'rows' : self.totals
                }
            };
            // create json result
            
            // call callback
            callback( result );   
            
        // DONE FUNCTION: getSelectData( string: id, function: callback ) void
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
            getSelectData :  function( id, callback ){
            // FUNCTION: getSelectData( string: id, function: callback ) void
                self.getSelectData( id, callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: exportRidesTotalsSelectModule( json: options ) void
})( pleisterman );
// done create module function
