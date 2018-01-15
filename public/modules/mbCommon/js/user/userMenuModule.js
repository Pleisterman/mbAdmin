/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/user/userMenuModule.js
 *  
 *  Last Revision:  17-01-2017
 *  
 *  Purpose:  
 *          this module creates 
 *          a menu button module
 *          a menu layer module
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( sharesoft ){

    // MODULE: userMenuModule( void ) void
    
    sharesoft.userMenuModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'userMenuModule';                     // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.menuButton = null;                             // module: menu
        self.menuLayer = null;                              // module: menu layer
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add menu button
            self.menuButton = new sharesoft.userMenuButtonModule( self.menuButtonCallback );
            
            // add menu layer
            self.menuLayer = new sharesoft.userMenuLayerModule( self.menuButton.getId() );
            
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
            // FUNCTION: setUserName( string: username ) void
            setUserName : function( userName ){
                // call menuButton set user name
                self.menuButton.setUserName( userName );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: userMenuModule( void ) void 
})( sharesoft );
// done create module function
