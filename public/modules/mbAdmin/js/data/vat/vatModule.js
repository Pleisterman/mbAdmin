/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/vat/vatModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module creates the data object for vat
 *      it has a load function that will load the list data
 *      it connects the documentsModule to the data documents item
 *      it catches the events for: 
 *          openInitialSelection
 *          refresh list
 *      when in update mode:
 *          update
 *          cancel
 *      when in insert mode:
 *          insert
 *          cancel
 *      it connects to the header functions of the list
\ * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){

    // MODULE: vatModule( void ) void
    
    pleisterman.vatModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'vatModule';                  // string: MODULE
        self.debugOn = false;                       // boolean: debug
        self.id = 'vat';                            // string: id
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.setSelectModule = function( module ){
        // FUNCTION setSelectModule( module ) void

            // set select module
            self.selectModule = module;
            
        // DONE FUNCTION: setSelectModule( module ) void
        };
        self.load = function( callback ){
        // FUNCTION load( function: callback ) void

            // call the select module load function
            self.selectModule.load( callback );
            
        // DONE FUNCTION: load( function: callback ) void
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
            load    :   function( callback ){
            // FUNCTION: load( function: callback ) void
                self.load( callback );
            },
            setSelectModule  :   function( module ){
            // FUNCTION: setSelectModule( module: module ) void
                self.setSelectModule( module );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: vatModule( void ) void
})( pleisterman );
// done create module function
