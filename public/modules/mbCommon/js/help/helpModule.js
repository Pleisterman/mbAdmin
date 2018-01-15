/* 
 *  Project: MbCommon
 * 
 *  File: /MbCommon/help/helpModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module handles the functions
 *          for the help screens
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( sharesoft ){

    // MODULE: helpModule( void ) void 
    
    sharesoft.helpModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'helpModule';                                 // string:  MODULE
        self.debugOn = false;                                       // boolean: debug on
        self.helpDialogModule = null;                               // module: heldDialogModule
        self.callback = null;                                       // function: callback
        self.subjectId = null;                                      // string: callback
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.show = function() {
        // FUNCTION: show( void ) void
            
            // debug info
            self.debug( 'show' );
            
            // module !exists 
            if( !self.helpDialogModule ){
                // create module
                self.helpDialogModule = new sharesoft.helpDialogModule( self.getSubject );
            }
            // done module !exists
            
            // show module
            self.helpDialogModule.show();
            
        // DONE FUNCTION: show( void ) void
        };
        self.getSubject = function( subjectId, callback ){
        // FUNCTION: getSubject( string: seubjectId, string: text ) void

            // remember subjectId
            self.subjectId = subjectId;
            // remember callback
            self.callback = callback;

            // show busy screen
            sharesoft.startBusyProcess();
            
            // create ajax data
            var data = { 
                'type'              :   'help',    
                'subjectId'         :   subjectId,
                'languageId'        :   sharesoft.selectedLanguageId 
            };
            // done create ajax data

            // ajax
            jsProject.post( '/' + sharesoft.baseDirectory + '/getString', data, self.getSubjectCallback );
            
        // DONE FUNCTION: getSubject( string: seubjectId, string: text ) void
        };
        self.getSubjectCallback = function( result ){
        // FUNCTION: getSubjectCallback( json: result ) void
            
            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // end busy
                sharesoft.endBusyProcess();
                // done with error
                return true;
            }
            // done global check result

            // call callback
            self.callback( self.subjectId, result['string'] );
            
            // end busy
            sharesoft.endBusyProcess();
            
        // DONE FUNCTION: getSubjectCallback( json: result ) void
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
            // FUNCTION: show( void ) void
            show    :   function(){
                // call internal show
                self.show();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: helpModule( void ) void 
})( sharesoft );
// done create module function
