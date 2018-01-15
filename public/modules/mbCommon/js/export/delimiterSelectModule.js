/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/data/export/delimiterSelectModule.js
 * 
 * Purpose: 
 *          this module controls selection of the delimiter for the export
 * 
 * Last revision: 01-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){

    // MODULE: delimiterSelectModule( json: options ) void
    
    pleisterman.delimiterSelectModule = function( options ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                        // object: self
        self.MODULE = 'delimiterSelectModule';                  // string: MODULE
        self.debugOn = false;                                   // boolean: debug
        self.options = options;                                 // json: options
        self.delimiters = [                                     // json: delimiters
            {                                                   // json: id
                'id'            :   'comma',                    // string: id
                'delimiter'     :   ',',                        // string: delimiter
                'text'          :   pleisterman.translations['comma'] // string: TRANSLATION: comma
            },                                                  // done json: id
            {                                                   // json: tab
                'id'            :   'tab',                      // string: id
                'delimiter'     :   '   ',                      // string: delimiter
                'text'          :   pleisterman.translations['tab'] // string: TRANSLATION: tab
            },                                                  // done json: tab
            {                                                   // json: semicolon
                'id'            :   'semicolon',                // string: id
                'delimiter'     :   ';',                        // string: delimiter
                'text'          :   pleisterman.translations['semicolon'] // string: TRANSLATION: semicolon
            }                                                   // done json: semicolon
        ];                                                      // done json: delimiters
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.getSelectData = function( id, callback ){
        // FUNCTION: getSelectData( string: id, function: callback ) void
        
            // debug info
            self.debug( 'getSelectData id: ' + id );
            
            // create json result
            var result = {
                'open' :    {
                    'rows'  :    self.delimiters
                }
            };
            // create json result
            
            // call callback
            callback( result );   

        // DONE FUNCTION: getSelectData( string: id, function: callback ) void
        };
        self.getValue = function( id ){
        // FUNCTION: getValue( string: id ) string: delimiter
            
            // create default delimiter
            var delimiter = ';';
            
            // search id
            $.each( self.delimiters, function( index, value ) {
                // id found
                if( value['id'] === id ){
                    // set delimiter
                    delimiter = value['delimiter'];
                }
                // done id found
            });
            // done search id
            
            // done 
            return delimiter;
            
        // DONE FUNCTION: getValue( string: id ) string: delimiter
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
            getSelectData :  function( id, callback ){
            // FUNCTION: load( string: id, function: callback ) void
                self.getSelectData( id, callback );
            },
            getValue :  function( id ){
            // FUNCTION: load( string: id ) string: delimiter
                return self.getValue( id );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: delimiterSelectModule( json: options ) void
})( pleisterman );
// done create module function
