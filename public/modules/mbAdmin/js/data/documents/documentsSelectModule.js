/* 
 *  Project: MbAdmin 
 * 
 *  File: /mbAdmin/data/documents/documentsSelectModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *       this module controls documents select
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){
    
    // MODULE: documentsSelectModule( void ) void
    
    pleisterman.documentsSelectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'documentsSelectModule';              // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.options = {                                    // json: options
            'selectCallback'  :   null                      // function: select callback
        };                                                  // done json: options
        self.data = {                                       // json: data
            'rows'      :       null                        // json: rows
        };                                                  // done json: data
        self.callerOptions = {                              // json: callerOptions
            'callback'          :   null,                   // function: callback
            'elementId'         :   null                    // string: elementId
        };                                                  // done json: callerOptions
        self.callback = null;                               // function: callback
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

        // DONE FUNCTION: construct( void ) void
        };
        self.getSelectData = function( options, callback ){
        // FUNCTION: getSelectData( json: options, function: callback ) void

            // debug info
            self.debug( 'getSelectData subject: ' + options['subject'] + ' subjectId:' + options['subjectId'] );

            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            pleisterman.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'documents',
                'what'              :   'selectData',
                'selection'         :   options
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.getSelectDataCallback );
            
        // DONE FUNCTION: getSelectData( json: options, function: callback ) void
        };
        self.getSelectDataCallback = function( result ){
        // FUNCTION: getSelectDataCallback( json: result ) void

            // check critical errors
            if( result['criticalError'] ){
                pleisterman.showCriticalError( result['criticalError'] );
                pleisterman.endBusyProcess();
                return;
            }
            // done check critical errors

            // hide busy screen
            pleisterman.endBusyProcess();
            
            // call the callback
            self.callerOptions['callback']( result );
            
        // DONE FUNCTION: getSelectDataCallback( json: result ) void
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
            getSelectData :  function( id, callback ){
                self.getSelectData( id, callback );
            },
            setSelectCallback :  function( callback ){
                self.options['selectCallback'] = callback;
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: dataFunctionsModule( void ) void 
})( pleisterman );
// done create module function
