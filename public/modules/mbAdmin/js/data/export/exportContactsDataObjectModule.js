/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/export/exportContactsDataObjectModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *      this module controls dataObject for contacts for the export
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

    // MODULE: exportContactsDataObjectModule( void ) void
    
    sharesoft.exportContactsDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'exportContactsDataObjectModule';     // string: MODULE
        self.debugOn = true;                                // boolean: debug
        self.dataObject = {                                 // json: dataObject
            'id'                :   'contacts',             // string: id
            'type'              :   'noDisplay'             // string: display type
        };                                                  // done json: dataObject
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
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
            getDataObject : function(){
            // FUNCTION: getDataObject( void ) json: dataObject
                return self.dataObject;
            }        
        };
        // DONE PUBLIC
    };
    // DONE MODULE: exportContactsDataObjectModule( void ) void
})( sharesoft );
// done create module function
