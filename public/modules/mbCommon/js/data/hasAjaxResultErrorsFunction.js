/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/data/hasAjaxResultErrorsFunction.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *       this module controls common ajax result errors
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
( function( pleisterman ){
    
    // FUNCTION: hasAjaxResultErrorsFunction( void ) 
    
    pleisterman.hasAjaxResultErrorsFunction = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.FUNCTION = 'hasAjaxResultErrorsFunction';                            // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            // add application extensions
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: construct( void ) void
            
            // add the check data callback extension to pleisterman
            pleisterman.hasAjaxResultErrors = self.hasAjaxResultErrors;
            
        // DONE FUNCTION: construct( void ) void
        };
        self.hasAjaxResultErrors = function( result ) {
        // FUNCTION: hasAjaxResultErrors( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                // show critical error
                pleisterman.showCriticalError( result['criticalError'] );
                // done with error
                return true;
            }
            // done check critical errors
            
            if( result['idNotFound'] ){
                // show critical error
                pleisterman.showCriticalError( result['idNotFound'] );
                // done with error
                return true;
            }

            // done 
            return false;
            
        // DONE FUNCTION: hasAjaxResultErrors( json: result ) void
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
    // DONE FUNCTION: hasAjaxResultErrorsFunction( void ) void 
})( pleisterman );
// done create module function
