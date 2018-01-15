/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/projects/projectContactsModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *      handles data for contact projects
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){

    // MODULE: projectContactsModule( void ) void 
    
    pleisterman.projectContactsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'projectContactsModule';              // string:  MODULE
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
            pleisterman.startBusyProcess();
            
            // remember callback
            self.callback = callback;
            
            var dataObject = jsProject.getValue( 'dataObject', 'data' ); 
            var projectId = null;
            $.each( dataObject, function( index, values ) {
                if( values['id'] === 'id' ){
                    projectId = values['value'];
                }
            });
            
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'projectContacts',
                'what'              :   'list',
                'selection'         :   projectId
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.getRowsCallback );
            
        // DONE FUNCTION: getRows( function: callback ) void
        };
        self.getRowsCallback = function( result ){
        // FUNCTION: getRowsCallback( json: result ) void
            
            // debug info
            self.debug( 'getRowsCallback' );

            // check critical errors
            if( result['criticalError'] ){
                pleisterman.showCriticalError( result['criticalError'] );
                pleisterman.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // end busy 
            pleisterman.endBusyProcess();
            
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
            var projectId = null;
            $.each( dataObject, function( index, values ) {
                // found id
                if( values['id'] === 'id' ){
                    projectId = values['value'];
                }
                // done found id
            });
            // done get projectId

            // show busy screen
            pleisterman.startBusyProcess();
            
            // remember callback
            self.callback = callback;
            
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'projectContacts',
                'what'              :   'link',
                'id'                :   projectId,
                'values'            :   idArray 
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.linkRowsCallback );
            
        // DONE FUNCTION: linkRows( json: idArray, function: callback ) void
        };
        self.linkRowsCallback = function( result ){
        // FUNCTION: linkRowsCallback( json: result ) void
            
            self.debug( 'linkRowsCallback' );
            // check critical errors
            if( result['criticalError'] ){
                pleisterman.showCriticalError( result['criticalError'] );
                pleisterman.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );

            
            // end busy 
            pleisterman.endBusyProcess();

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
    // DONE MODULE: projectContactsModule( void ) void 
})( pleisterman );
// done create module function
