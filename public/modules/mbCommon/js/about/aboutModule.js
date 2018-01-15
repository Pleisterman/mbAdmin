/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/about/aboutModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          this module handles the functions
 *          for the about screens
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

    // MODULE: aboutModule( void ) void 
    
    pleisterman.aboutModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'aboutModule';                                // string:  MODULE
        self.debugOn = false;                                       // boolean: debug on
        self.menu = null;                                           // module: menu      
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add menu
            self.addMenu();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addMenu = function(){
        // FUNCTION: construct( void ) void
            
            // create menu module
            self.menu = new pleisterman.aboutMenuModule();
            
        // DONE FUNCTION: construct( void ) void
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
    // DONE MODULE: aboutModule( void ) void 
})( pleisterman );
// done create module function
