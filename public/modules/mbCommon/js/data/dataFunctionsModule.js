/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/data/dataFunctionsModule.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *       this module controls common data funtions
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
    
    // MODULE: dataFunctionsModule( void ) 
    
    pleisterman.dataFunctionsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataFunctionsModule';                            // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addFunctions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addFunctions = function( result ) {
        // FUNCTION: addFunctions( json: result ) void
            
            // add has ajax result errors
            self.hasAjaxResultErrorsFunction = new pleisterman.hasAjaxResultErrorsFunction();
            // add prepare show
            self.prepareDataShowFunction = new pleisterman.prepareDataShowFunction();
            
        // DONE FUNCTION: addFunctions( json: result ) void
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
    // DONE MODULE: dataFunctionsModule( void ) void 
})( pleisterman );
// done create module function
