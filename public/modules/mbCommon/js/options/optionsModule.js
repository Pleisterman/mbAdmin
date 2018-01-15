/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/options/optionsModule.js
 *  
 *  Purpose: 
 *      this module controls the test data in options
 * 
 *  Last Revision:  16-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Purpose:  
 *          this module controls the options for the application
 *          the function set opton is added to the application
 *          an option menu is created
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( pleisterman ){

    // MODULE: optionsModule( void ) void
    
    pleisterman.optionsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'optionsModule';                      // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.menu = null;                                   // module: menu      
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add menu
            self.addMenu();
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: construct( void ) void
            
            // add set option function to application
            pleisterman.setOption = self.setOption;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addMenu = function(){
        // FUNCTION: addMenu( void ) void
            
            // add menu
            self.menu = new pleisterman.optionsMenuModule();
            
        // DONE FUNCTION: addMenu( void ) void
        };
        self.setOption = function( name, value ) {
        // FUNCTION: setOption( string: namem var: value ) void
            
            // debug info
            self.debug( 'setOption: ' + name + ' value: ' + value );
            
            // set the js value
            pleisterman.options[name]['value'] = value;
            
            // construct data object
            var values = { 'value' : value };
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'options',
                'name'              :   name,
                'values'            :   values 
            };
            // done construct data object
            
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.setOptionCallback );
            
        // DONE FUNCTION: etOption( string: namem var: value ) void
        };
        self.setOptionCallback = function( result ){
        // FUNCTION: setOptionCallback( json: result ) void
            
            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
        // DONE FUNCTION: setOptionCallback( json: result ) void
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
    // DONE MODULE: optionsModule( void ) void 
})( pleisterman );
// done create module function
