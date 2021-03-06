/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/export/exportProjectsDataObjectModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls dataObject for projects for the export
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

    // MODULE: exportProjectsDataObjectModule( void ) void
    
    pleisterman.exportProjectsDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                // object: self
        self.MODULE = 'exportProjectsDataObjectModule'; // string: MODULE
        self.debugOn = false;                           // boolean: debug
        self.dataObject = {                             // json: dataObject
            'id'                :   'projects',         // string: id
            'type'              :   'noDisplay'         // string: display type
        };                                              // done json: dataObject
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
    // DONE MODULE: exportProjectsDataObjectModule( void ) void
})( pleisterman );
// done create module function
