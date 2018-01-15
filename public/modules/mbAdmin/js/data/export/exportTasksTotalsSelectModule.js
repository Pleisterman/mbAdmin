/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/export/exportTasksTotalsSelectModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls select for totals for tasks for the export
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

    // MODULE: exportTasksTotalsSelectModule( json: options ) void
    
    sharesoft.exportTasksTotalsSelectModule = function( options ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'exportTasksTotalsSelectModule';                  // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        self.options = options;                                         // json: options
        self.totals = [                                                 // json: totals
            {                                                           // json: noTotals
                'id'            :   'noTotals',                         // string: id
                'text'          :   sharesoft.translations['noTotals']    // string: TRANSLATION: noTotals
            },                                                          // done json: noTotals
            {                                                           // json: endTotal
                'id'            :   'endTotal',                         // string: id
                'text'          :   sharesoft.translations['endTotal']    // string: TRANSLATION: endTotal
            }                                                           // done json: endTotal
        ];                                                              // json: totals
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
            
            // create json: result
            var result = {
                'open' : {
                    'rows' : self.totals
                }
            };
            // done create json: result
            
            // call callback
            callback( result );   
            
        // END FUNCTION: getSelectData( string: id, function: callback ) void
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
    // DONE MODULE: exportTasksTotalsSelectModule( json: options ) void
})( sharesoft );
// done create module function
