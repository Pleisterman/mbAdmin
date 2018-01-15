/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/data/prepareDataShowFunction.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *       this module controls preparation for showing data
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
    
    // FUNCTION: prepareDataShow( void ) void
    
    pleisterman.prepareDataShowFunction = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.FUNCTION = 'prepareDataShowFunction';                            // string: MODULE
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
            
            // add the prepare data show to pleisterman
            pleisterman.prepareDataShow = self.prepareDataShow;
            
        // DONE FUNCTION: construct( void ) void
        };
        self.prepareDataShow = function( okCallback, okCallbackParameters ) {
        // FUNCTION: prepareDataShow( function: callback ) void
            
            // debug info
            self.debug( 'prepareShow' );  
            
            // check data changed
            if( jsProject.getValue( 'changed', 'data' ) ){
                // debug info
                self.debug( 'dataChanged' );
                
                // create message options
                var options = {
                    'isYesNo' : true,
                    'okCallback' : okCallback,
                    'okCallbackParameters' : okCallbackParameters
                };
                // create message options
                // show the message
                pleisterman.showMessage( 'dataChanged', options );
            }
            // done check data changed
            else {
                // data unchanged
                okCallback( okCallbackParameters );
            }
            // done check data changed
            
        // DONE FUNCTION: prepareDataShow( function: callback ) void
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
    // DONE FUNCTION: prepareDataShowFunction( void ) void 
})( pleisterman );
// done create module function
