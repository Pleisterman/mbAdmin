/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/messages/messageModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this module handles cashing and ajax calls to get messages
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

    // MODULE: messageModule( void ) void 
    
    pleisterman.messageModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'messageModule';                              // string:  MODULE
        self.debugOn = false;                                       // boolean: debug on
        self.callback = null;                                       // function: callback
        self.messageId = '';                                        // string: message id
        self.messageCash = {};                                      // json: message cash
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add the extensions to pleisterman
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add the get message extension to pleisterman
            pleisterman.getMessage = self.getMessage;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getMessage = function( messageId, callback ) {
        // FUNCTION: getMessage( string: messageId, function: callback ) void
            
            // debug info
            self.debug( 'getMessage messageId: ' + messageId );
            // save messageId
            self.messageId = messageId;
            // save callback
            self.callback = callback;
            
            // check if message is cashed
            if( self.messageCash[messageId] !== undefined ){
                // debug info
                self.debug( 'message cashed' );
                if( self.callback ){
                    // call the callback with the cashed message
                    self.callback( self.messageCash[messageId] );
                    // remove callback
                    self.callback = null;
                }
            }
            else {
                // not cashed
                
                // create ajax data
                var data = { 
                    'workDirectory'     :   pleisterman.workDirectory,
                    'type'              :   'message',    
                    'messageId'         :   messageId,
                    'languageId'        :   pleisterman.selectedLanguageId 
                };
                // done create ajax data
                
                // ajax
                jsProject.post( '/' + pleisterman.baseDirectory + '/getString', data, self.getStringCallback );
            }
            
        // DONE FUNCTION: getMessage( string: messageId, function: callback ) void
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
            self.debug( 'getStringCallback string: ' + result['string'] );
            
            // has callback
            if( self.callback ){
                // create callback var
                var callback = self.callback;
                // remove callback
                self.callback = null;
                // cash the string
                self.messageCash[self.messageId] = result['string'];
                // call the callback with the string
                callback( result['string'] );
            }
            // done has callback
            
        // DONE FUNCTION: getStringCallback( json: result ) void
        };
        self.hasAjaxResultErrors = function( result ){
        // FUNCTION: hasAjaxResultErrors( json: result ) boolean
        
            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
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
    // DONE MODULE: messageModule( void ) void 
})( pleisterman );
// done create module function
