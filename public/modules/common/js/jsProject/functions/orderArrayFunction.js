/* 
 *  Project: jsProject 
 * 
 *  File: mbCommon/js/data/orderArrayFunction.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *          this module ordering data by given text field
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
( function( jsProject ){

    // FUNCTION: orderArrayFunction( void ) void
    
    jsProject.orderArrayFunction = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.FUNCTION = 'orderArrayFunction';               // string: FUNCTION
        self.debugOn = false;                               // boolean: debug
        
        // functions
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function( ){
        // FUNCTION: addApplicationsExtensions( void ) void
        
            // add pad function
            jsProject.orderArray = self.orderArray;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.orderArray = function( textA, textB, textFieldId ) {
        // FUNCTION: orderArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
        
            if ( textA[textFieldId] < textB[textFieldId] ){
              return 1;
            }
            if ( textA[textFieldId] > textB[textFieldId] ){
              return -1;
            }
            return 0;
            
        // DONE FUNCTION: orderArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.FUNCTION + ' ' + message );
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
    // DONE FUNCTION: orderTextArrayFunction( void ) void 
})( jsProject );
//// done create module function

