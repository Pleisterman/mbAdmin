/* 
 *  Project: MbSiteCms 
 * 
 *  File: /mbSiteCms/js/info/infoModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          this module handles communication for the about info
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

    // MODULE: infoModule( void ) void 
    
    sharesoft.infoModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'infoModule';                                 // string:  MODULE
        self.debugOn = false;                                       // boolean: debug on
        self.infoDialogModule = null;                               // module: info dialog module
        self.callback = null;                                       // function: callback
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
            if( !self.infoDialogModule ){
                // create module
                self.infoDialogModule = new sharesoft.infoDialogModule( self.getText );
            }
            // done module !exists
            
            // show module
            self.infoDialogModule.show();
            
        // DONE FUNCTION: show( void ) void
        };
        self.getText = function( callback ){
        // FUNCTION: getText( function: callback ) void
            
            // remember callback
            self.callback = callback;
            
            // create ajax data
            var data = { 
                'userDirectory'     :   sharesoft.userDirectory,
                'type'              :   'info',    
                'infoId'            :   'applicationInfoText',
                'languageId'        :   sharesoft.selectedLanguageId 
            };
            // done create ajax data

            // ajax
            jsProject.post( '/' + sharesoft.baseDirectory + '/getString', data, self.getTextCallback );
            
            
        // DONE FUNCTION: getText( function: callback ) void
        };
        self.getTextCallback = function( result ){
        // FUNCTION: getTextCallback( json: result ) void
            
            // debug info
            self.debug( 'getTextCallback string: ' + result['string'] );

            // call callback
            self.callback( result['string'] );
            
        // DONE FUNCTION: getTextCallback( json: result ) void
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
    // DONE MODULE: infoModule( void ) void 
})( sharesoft );
// done create module function
