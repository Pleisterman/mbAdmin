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
    
    // MODULE: documentsSelectModule( void ) void
    
    sharesoft.documentsSelectModule = function( ) {
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
            sharesoft.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'documents',
                'what'              :   'selectData',
                'selection'         :   options
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.getSelectDataCallback );
            
        // DONE FUNCTION: getSelectData( json: options, function: callback ) void
        };
        self.getSelectDataCallback = function( result ){
        // FUNCTION: getSelectDataCallback( json: result ) void

            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                sharesoft.endBusyProcess();
                return;
            }
            // done check critical errors

            // hide busy screen
            sharesoft.endBusyProcess();
            
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
})( sharesoft );
// done create module function
