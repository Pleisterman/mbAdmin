/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/errors/errorModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this module handles cashing and ajax calls to get errors
 *          for the application sharesoft
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

    // MODULE: errorModule( void ) void 
    
    sharesoft.errorModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'errorModule';                                // string:  MODULE
        self.debugOn = false;                                       // boolean: debug on
        self.nextProcesId = 0;                                      // integer: next process id
        self.processes = {};                                        // json: processes
        self.errorCash = {};                                        // json: error cash 
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add the extensions to sharesoft
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add the get error extension to sharesoft
            sharesoft.getError = self.getError;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getError = function( errorId, callback ) {
        // FUNCTION: getError( string: errorId, function: callback ) void
            
            // debug info
            self.debug( 'getError errorId: ' + errorId );
            
            // check if error is cashed
            if( self.errorCash[errorId] ){
                // call callback with cashed error
                callback( self.errorCash[errorId] );
                // done
                return;
            }
            // done check if error is cashed
            
            // create a process
            var proces = {  
                'id'   : self.nextProcesId++,
                'callback' : callback 
            };
            // done create a process
            
            // add the proces to the list
            self.processes[proces['id']] = proces;
            
            // create ajax data
            var data = { 
                'type'              :   'error',    
                'errorId'           :   errorId,
                'callId'            :   proces['id'],
                'languageId'        :   sharesoft.selectedLanguageId 
            };
            // done create ajax data

            // ajax
            jsProject.post( '/' + sharesoft.baseDirectory + '/getString', data, self.getStringCallback );
            
        // DONE FUNCTION: getError( string: errorId, function: callback ) void
        };
        self.getStringCallback = function( result ){
        // FUNCTION: getStringCallback( json: result ) void
            
            // check for errors
            if( self.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done check for errors
            
            // debug info
            self.debug( 'getStringCallback error: ' + result['string'] );

            // check result
            if( result['callId'] === null ){
                // show console error
                console.log( 'procesId = null error ' );
                // loop over result
                $.each( result, function( index, value ) {
                    // show result in console
                    console.log( index + ": " + value );
                } );
                // done loop over result
            }
            else {
                // cash the error
                self.errorCash[result['errorId']] = result['string'];
                // make callback call
                if( self.processes[result['callId']]['callback'] ){
                    self.processes[result['callId']]['callback']( result['string'] );
                }
                // remove proces
                delete self.processes[result['procesId']];
            }
            // done check result
            
        // DONE FUNCTION: getStringCallback( json: result ) void
        };
        self.hasAjaxResultErrors = function( result ){
        // FUNCTION: hasAjaxResultErrors( json: result ) boolean
        
            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return true;
            }
            // done global check result
            
            // check errors
            if( result['error'] ){
                // debug info
                self.debug( result['error'] );
                // show error message
                jsProject.callEvent( 'showEditError', result['error'] );
                // done with error
                return true;
           }
            // done check errors
            
            // done 
            return false;
            
        // DONE FUNCTION: hasAjaxResultErrors( json: result ) boolean
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
    // DONE MODULE: errorModule( void ) void 
})( sharesoft );
// done create module function
