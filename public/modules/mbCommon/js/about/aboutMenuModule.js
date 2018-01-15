/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/options/aboutMenuModule.js
 *  
 *  Purpose:  
 *          this module creates 
 *          a menu button module
 *          a menu layer module
 * 
 *  Last Revision:  04-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( sharesoft ){

    // MODULE: aboutMenuModule( void ) void
    
    sharesoft.aboutMenuModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'aboutMenuModule';                    // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.menuButton = null;                             // module: menu button module
        self.menuLayer = null;                              // module: menu layer module
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add menu button
            self.menuButton = new sharesoft.aboutMenuButtonModule( self.menuButtonCallback );
            
            // add menu layer
            self.menuLayer = new sharesoft.aboutMenuLayerModule( self.menuButton.getId() );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.menuButtonCallback = function( ){
        // FUNCTION: menuButtonCallback( void ) void
            
            // debug info
            self.debug( 'menuButtonCallback' );
            // toggle menu
            self.menuLayer.toggle();
            
        // DONE FUNCTION: menuButtonCallback( void ) void
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
    // DONE MODULE: aboutMenuModule( void ) void 
})( sharesoft );
// done create module function