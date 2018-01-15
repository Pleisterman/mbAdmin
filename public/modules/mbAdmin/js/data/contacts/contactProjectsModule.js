/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/contacts/contactProjectsModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *      handles data for project contacts
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( sharesoft ){

    // MODULE: contactProjectsModule( void ) void 
    
    sharesoft.contactProjectsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'contactProjectsModule';              // string:  MODULE
        self.debugOn = false;                               // boolean: debug
        self.callback = null;                               // function: callback
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.getRows = function( callback ) {
        // FUNCTION: getRows( function: callback ) void
            
            // debug info
            self.debug( 'getRows' );
            
            // show busy screen
            sharesoft.startBusyProcess();
            
            // remember callback
            self.callback = callback;
            
            var dataObject = jsProject.getValue( 'dataObject', 'data' );
            // get documents object from dataObject
            var contactIdObject = jsProject.getJsonValue( dataObject, ['id=id'] );            
            // set documents id
            var contactId = contactIdObject['value'];
            
            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'contactProjects',
                'what'              :   'list',
                'selection'         :   contactId
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.getRowsCallback );
            
        // DONE FUNCTION: getRows( function: callback ) void
        };
        self.getRowsCallback = function( result ){
        // FUNCTION: getRowsCallback( json: result ) void
            
            // debug info
            self.debug( 'getRowsCallback' );

            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                sharesoft.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // end busy 
            sharesoft.endBusyProcess();
            
            // check for callback
            if( self.callback ){
                // call callback
                self.callback( result );
                // reset callback
                self.callback = null;
            }
            // done check for callback
            
        // DONE FUNCTION: getRowsCallback( json: result ) void
        };
        self.linkRows = function( idArray, callback ){
        // FUNCTION: linkRows( json: idArray, function: callback ) void
            
            // get projectId
            var dataObject = jsProject.getValue( 'dataObject', 'data' ); 
            var contactId = null;
            $.each( dataObject, function( index, values ) {
                // found id
                if( values['id'] === 'id' ){
                    contactId = values['value'];
                }
                // done found id
            });
            // done get projectId

            // show busy screen
            sharesoft.startBusyProcess();
            
            // remember callback
            self.callback = callback;
            
            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'contactProjects',
                'what'              :   'link',
                'id'                :   contactId,
                'values'            :   idArray 
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/update', sharesoft.token, data, self.linkRowsCallback );
            
        // DONE FUNCTION: linkRows( json: idArray, function: callback ) void
        };
        self.linkRowsCallback = function( result ){
        // FUNCTION: linkRowsCallback( json: result ) void
            
            self.debug( 'linkRowsCallback' );
            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                sharesoft.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );

            
            // end busy 
            sharesoft.endBusyProcess();

            // check for callback
            if( self.callback ){
                // call callback
                self.callback( result );
                // reset callback
                self.callback = null;
            }
            // done check for callback
            
            // refresh project list
            jsProject.callEvent( 'refreshList', 'projects' );
            
        // DONE FUNCTION: linkRowsCallback( json: result ) void
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
            // FUNCTION: getDataObject( function: callback ) void
            getRows    :   function( callback ){
                // call internal
                self.getRows( callback );
            },
            // FUNCTION: linkRows( json: idArray, function: callback ) void 
            linkRows    :   function( idArray, callback ){
                // call internal
                self.linkRows( idArray, callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: contactProjectsModule( void ) void 
})( sharesoft );
// done create module function
