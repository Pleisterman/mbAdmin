/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/options/colorSchemeSelectModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this module creates the select for colorschemes 
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: colorSchemeSelectModule( void ) void 
    
    pleisterman.colorSchemeSelectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'colorSchemeSelectModule';                    // string:  MODULE
        self.debugOn = false;                                       // boolean: debug
        self.options = {                                            // json: options
            'selectCallback'  :   null                              // functionL select callback
        };                                                          // done json: options
        self.data = {};                                             // json: data
        self.callback = null;                                       // function: callback
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void
            
            // debug info
            self.debug( 'load' );
            // rememeber callback
            
            // !has rows
            if( !self.options['rows'] ){
                // remember callback
                self.callback = callback;
                // load color schemes
                self.loadColorSchemes( );
            }
            else {
                // call callback
                callback();
            }
            // done !has rows
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadColorSchemes = function( ){
        // FUNCTION: loadColorSchemes( void ) void
            
            // debug info
            self.debug( 'loadColorSchemes' );

            // show busy screen
            pleisterman.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'colorSchemes',
                'what'              :   'list'
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.loadColorSchemesCallback );
            
        // DONE FUNCTION: loadColorSchemes( void ) void
        };
        self.loadColorSchemesCallback = function( result ){
        // FUNCTION: loadColorSchemesCallback( json: result ) void
            
            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // end busy proces
                pleisterman.endBusyProcess();
                // done with error
                return;
            }
            // done global check result
            
            // remember rows
            self.data['rows'] = result['rows'];
            
            // end busy 
            pleisterman.endBusyProcess();
            
            // callback exists
            if( self.callback ){
                // call callback
                self.callback();
                // unset callback
                self.callback = null;
            }
            // done callback exists
            
        // DONE FUNCTION: loadColorSchemesCallback( json: result ) void
        };
        self.getSelectData = function( id, callback ){
        // FUNCTION: getSelectData( string: id, function: callback ) void
            
            // debug info
            self.debug( 'getSelectData id: ' + id );

            // create result
            var result = { 
                'open' : {
                    'rows'  :  self.data['rows'] 
                }
            };
            // done create result
            
            // call the callback
            callback( result );
            
        // DONE FUNCTION: getSelectData( string: id, function: callback ) void
        };
        self.getSchemeColors = function( id, callback ){
        // FUNCTION: getSchemeColors( string: color scheme id, function: callback ) void
            
            // debug info
            self.debug( 'getSchemeColors id: ' + id );

            // remember callback
            self.callback = callback;

            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'colorSchemes',
                'what'              :   'colors',
                'selection'         :   id
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.loadColorSchemeColorsCallback );
            
        // DONE FUNCTION: getSchemeColors( string: color scheme id, function: callback ) void
        };
        self.loadColorSchemeColorsCallback = function( result ){
        // FUNCTION: loadColorSchemeColorsCallback( json: result ) void
            
            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // end busy proces
                pleisterman.endBusyProcess();
                // done with error
                return;
            }
            // done global check result
            
            // call callback
            self.callback( result['rows'] );
            
            // unset callback
            self.callback = null;
            
        // DONE FUNCTION: loadColorSchemeColorsCallback( json: result ) void
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
            // FUNCTION: load( funcion: callback ) void
            load :  function( callback ){
                // call internal
                self.load( callback );
            },
            // FUNCTION: getSelectData( string: id, funcion: callback ) void
            getSelectData :  function( id, callback ){
                // call internal
                self.getSelectData( id, callback );
            },
            // FUNCTION: getSchemeColors( string: id, funcion: callback ) void
            getSchemeColors : function( id, callback ){
                // call internal
                self.getSchemeColors( id, callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: colorSchemeSelectModule( void ) void 
})( pleisterman );
// done create module function
