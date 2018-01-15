/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/upload/valuesModule.js
 * 
 *  Last revision: 01-01-2017
 * 
 *  Purpose: 
 *          this module adds the global values for the application
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: valuesModule( void ) void 
    
    pleisterman.valuesModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'valuesModule';                                   // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.values = [                                                 // json: values
            {                                                           // json: tabStops
                "groupName" :   "tabStops",                             // string: groupname
                "valueName" :   "selected",                             // string: valueName
                "value"     :   null                                    // var: value
            }                                                           // done json: tabStops            
        ];                                                              // done json: values
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            self.debug( 'construct' );
            // add values
            self.addValues();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addValues = function() {
        // FUNCTION: addValues( void ) void
            
            self.debug( 'addValues' );
            // add the values for the app to the project
            for( var i = 0; i < self.values.length; i++ ) {
                jsProject.addValue( self.values[i]["valueName"], self.values[i]["groupName"], self.values[i]["value"] );
            }
            
        // DONE FUNCTION: addValues( void ) void
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
    // DONE MODULE: valuesModule( void ) void 
})( pleisterman );
// done create module function
