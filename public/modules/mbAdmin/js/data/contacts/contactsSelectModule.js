/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/contacts/contactsSelectModule.js
 *  
 *  Last Revision: 16-01-2017
 * 
 * Purpose: 
 *      this module controls selection of contacts. It controls the loads for open and
 *      closed contact lists
 *      An open contacts list wil always be loaded and cashed 
 *      Closed contacts wil be loaded and cashed when needed
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Purpose:  
 *      contains the basic html code for the header
 *      of the website
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( sharesoft ){

    // MODULE: contactsSelectModule( json: options ) void
    
    sharesoft.contactsSelectModule = function( options ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'contactsSelectModule';               // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.options = options;                             // json: options
        self.openData = {                                   // json: openData
            'updated'   :       null,                       // dateTime: updated   
            'rows'      :       null                        // json array[ json, json,..]: rows
        };                                                  // done json: openData
        self.closedData = {                                 // json: closedData
            'updated'   :       null,                       // dateTime: updated
            'rows'      :       null                        // json array[ json, json,..]: rows
        };                                                  // done json: closedData
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
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void
            
            // debug info
            self.debug( 'load' );
            // rememeber callback
            self.callback = callback;
            // load open contacts
            self.loadOpen();
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadOpen = function( ){
        // FUNCTION: loadOpen( void ) void
            
            // debug info
            self.debug( 'loadOpen' );

            // show busy screen
            sharesoft.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'contacts',
                'what'              :   'list',
                'selection'         :   'open',
                'lastUpdated'       :   self.openData['updated']
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.loadOpenCallback );
            
        // DONE FUNCTION: loadOpen( void ) void
        };
        self.loadOpenCallback = function( result ){
        // FUNCTION: loadOpenCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                sharesoft.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // data changed
            if( !result['upToDate'] ){
                // set contacts rows
                self.openData['rows'] = result['rows'];
                // set updated
                self.openData['updated'] = result['updated'];
                // debug info
                self.debug( 'updated:' + self.openData['updated'] );
            }
            else {
                // debug info
                self.debug( 'data up to date:' + self.openData['updated'] );
            }
            // data changed
            
            // end busy 
            sharesoft.endBusyProcess();

            // call the callback    
            self.callback();
            
        // DONE FUNCTION: loadOpenCallback( json: result ) void
        };
        self.loadClosed = function( ){
        // FUNCTION: loadClosed( void ) void
            
            // debug info
            self.debug( 'load closed' );
            
            // show busy screen
            sharesoft.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'contacts',
                'what'              :   'list',
                'selection'         :   'closed',
                'lastUpdated'       :   self.closedData['updated']
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.loadClosedCallback );
            
        // DONE FUNCTION: loadClosed( void ) void
        };
        self.loadClosedCallback = function( result ){
        // FUNCTION: loadClosedCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                sharesoft.endBusyProcess();
                // error return
                return;
            }
            // done check critical errors

            // data changed
            if( !result['upToDate'] ){
                // set contacts rows
                self.closedData['rows'] = result['rows'];
                // set updated
                self.closedData['updated'] = result['updated'];
                // debug info
                self.debug( 'updated:' + self.closedData['updated'] );
            }
            else {
                // debug info
                self.debug( 'data up to date:' + self.closedData['updated'] );
            }
            // data changed
            
            // end busy 
            sharesoft.endBusyProcess();

            self.callback();
            
        // DONE FUNCTION: loadClosedCallback( json: result ) void
        };
        self.showListSelector = function( elementId ) {
        // FUNCTION: showListSelector( string: elementId ) void
            
            // debug info
            self.debug( 'showListSelector' );
            
            // remember calling element
            self.callerOptions['elementId'] = elementId;
            // set callback
            self.callback = self.lisSelectorLoadCallback;
            // load open contacts
            self.loadOpen();
            
        // DONE FUNCTION: showListSelector( string: elementId ) void
        };
        self.lisSelectorLoadCallback = function(){
        // FUNCTION: lisSelectorLoadCallback( void ) void
            
            // sort contacts
            self.openData['rows'].sort( sharesoft.orderByText );

            // create selector options
            var options = {
                'id'                    :   'contacts',
                'elementId'             :   self.callerOptions['elementId'],
                'headerText'            :   sharesoft.translations['contacts'],
                'rows'                  :   self.openData['rows'],
                'filterChangeCallback'  :   self.listFilterChangeCallback,
                'selectCallback'        :   self.listSelectCallback
            };
            // done create selector options
            
            // open selector
            sharesoft.showListSelector( options );
            
        // DONE FUNCTION: lisSelectorLoadCallback( void ) void
        };
        self.listFilterChangeCallback = function( filter, callback ){
        // FUNCTION: listFilterChangeCallback( string: filter, function: callback ) void
            
            // debug info
            self.debug( 'returned filter: ' + filter );
            if( filter === 'open' ){
                // set callback
                self.callerOptions['callback'] = callback;
                self.callback = self.listSelectionOpenRefresh;
                // load open contacts
                self.loadOpen();

            }
            else {
                // set callback
                self.callerOptions['callback'] = callback;
                self.callback = self.listSelectionClosedRefresh;
                // load open contacts
                self.loadClosed();
                
            }
            
        // DONE FUNCTION: listFilterChangeCallback( string: filter, function: callback ) void
        };
        self.listSelectionOpenRefresh = function( ){
        // FUNCTION: listSelectionOpenRefresh( void ) void
            
             self.callerOptions['callback']( self.openData['rows'] );
            
        // DONE FUNCTION: listSelectionOpenRefresh( void ) void
        };
        self.listSelectionClosedRefresh = function( ){
        // FUNCTION: listSelectionClosedRefresh( void ) void
            
             self.callerOptions['callback']( self.closedData['rows'] );
            
        // DONE FUNCTION: listSelectionClosedRefresh( void ) void
        };
        self.listSelectCallback = function( selection ){
        // FUNCTION: listSelectCallback( json: selection ) void
            
            // debug info
            self.debug( 'returned selection: ' + selection );
            // call parent callback
            self.options['selectCallback']( selection );
            
        // DONE FUNCTION: listSelectCallback( json: selection ) void
        };
        self.getSelectData = function( id, callback ){
        // FUNCTION: getSelectData( integer: id, function: callback ) void
            
            // debug info
            self.debug( 'getSelectData id: ' + id );
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            sharesoft.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'contacts',
                'what'              :   'selectData',
                'selection'         :   id,
                'lastUpdated'       :   self.openData['updated'] 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.getSelectDataCallback );
            
        // DONE FUNCTION: getSelectData( integer: id, function: callback ) void
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

            // data changed
            if( !result['open']['upToDate'] ){
                // set contacts rows
                self.openData['rows'] = result['open']['rows'];
                // set updated
                self.openData['updated'] = result['open']['updated'];
                // debug info
                self.debug( 'updated:' + self.openData['updated'] );
            }
            else {
                result['open']['rows'] = self.openData['rows'];
                // debug info
                self.debug( 'data up to date:' + self.openData['updated'] );
            }
            // data changed
            
            // hide busy screen
            sharesoft.endBusyProcess();
            
            // call the callback
            self.callerOptions['callback']( result );
            
        // DONE FUNCTION: getSelectDataCallback( json: result ) void
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
            // FUNCTION: load( function: callback ) void
            load :  function( callback ){
                // call internal
                self.load( callback );
            },
            // FUNCTION: showListSelector( string: elementId ) void
            showListSelector :  function( elementId ){
                // call internal
                self.showListSelector( elementId );
            },
            // FUNCTION: getSelectData( string: elementId, function: callback ) void
            getSelectData :  function( id, callback ){
                // call internal
                self.getSelectData( id, callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: contactsSelectModule( json: options ) void
})( sharesoft );
// done create module function
