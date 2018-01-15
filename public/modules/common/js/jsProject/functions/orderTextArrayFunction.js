/* 
 *  Project: jsProject 
 * 
 *  File: mbCommon/js/data/orderTextArrayFunction.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *          this module ordering data by given text field
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
( function( jsProject ){

    // FUNCTION: orderTextArrayFunction( void ) void
    
    jsProject.orderTextArrayFunction = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.FUNCTION = 'orderTextArrayFunction';           // string: FUNCTION
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
            jsProject.orderTextArray = self.orderTextArray;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.orderTextArray = function( textA, textB, textFieldId ) {
        // FUNCTION: orderTextArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
        
            if ( textA[textFieldId] < textB[textFieldId] ){
              return 1;
            }
            if ( textA[textFieldId] > textB[textFieldId] ){
              return -1;
            }
            return 0;
            
        // DONE FUNCTION: orderTextArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
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

