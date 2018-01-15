/* 
 *  Project: MbAdmin 
 * 
 *  File: /mbAdmin/data/vat/vatSelectModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this module controls selection of vat. It controls the loads for open and
 *          closed vat lists
 *          An open vat list wil always be loaded and cashed 
 *          Closed vat wil be loaded and cashed when needed
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
    
    // MODULE: vatSelectModule( void ) void
    
    sharesoft.vatSelectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'vatSelectModule';                    // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.options = {                                    // json: options
            'selectCallback'  :   null                      // function: select callback
        };                                                  // done json: options
        self.data = {                                       // json: data
            'updated'   :       null,                       // dateTime: updated     
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
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void
            
            // debug info
            self.debug( 'load' );
            // rememeber callback
            self.callback = callback;
            // load open vat
            self.loadData();
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.loadData = function( ){
        // FUNCTION: load( void ) void
            
            // debug info
            self.debug( 'load' );

            // show busy screen
            sharesoft.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'vat',
                'what'              :   'list',
                'selection'         :   '',
                'lastUpdated'       :   self.data['updated']
            };
            // done construct data object

            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.loadCallback );
            
        // DONE FUNCTION: load( void ) void
        };
        self.loadCallback = function( result ){
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
                // set vat rows
                self.data['rows'] = result['rows'];
                // set updated
                self.data['updated'] = result['updated'];
                // debug info
                self.debug( 'updated:' + self.data['updated'] );
            }
            else {
                // debug info
                self.debug( 'data up to date:' + self.data['updated'] );
            }
            // data changed
            
            // end busy 
            sharesoft.endBusyProcess();

            // call the callback    
            self.callback();
            
        // DONE FUNCTION: loadOpenCallback( json: result ) void
        };
        self.showListSelector = function( elementId ) {
        // FUNCTION: showListSelector( string: elementId ) void
            
            // debug info
            self.debug( 'showListSelector' );
            
            // remember calling element
            self.callerOptions['elementId'] = elementId;
            // set callback
            self.callback = self.lisSelectorLoadCallback;
            // load open vat
            self.load();
            
        // DONE FUNCTION: showListSelector( string: elementId ) void
        };
        self.lisSelectorLoadCallback = function(){
        // FUNCTION: lisSelectorLoadCallback( void ) void
            
            // sort vat
            self.data['rows'].sort( sharesoft.orderByText );

            // create selector options
            var options = {
                'id'                    :   'vat',
                'elementId'             :   self.callerOptions['elementId'],
                'headerText'            :   sharesoft.translations['vat'],
                'rows'                  :   self.data['rows'],
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
                // load open vat
                self.loadOpen();

            }
            else {
                // set callback
                self.callerOptions['callback'] = callback;
                self.callback = self.listSelectionClosedRefresh;
                // load open vat
                self.loadClosed();
                
            }
            
        // DONE FUNCTION: listFilterChangeCallback( string: filter, function: callback ) void
        };
        self.listSelectionOpenRefresh = function( ){
        // FUNCTION: listSelectionOpenRefresh( void ) void
            
             self.callerOptions['callback']( self.data['rows'] );
            
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
                'subject'           :   'vat',
                'what'              :   'selectData',
                'selection'         :   id,
                'lastUpdated'       :   self.data['updated'] 
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
                // set vat rows
                self.data['rows'] = result['rows'];
                // set updated
                self.data['updated'] = result['updated'];
                // debug info
                self.debug( 'updated:' + self.data['updated'] );
            }
            else {
                result['open']['rows'] = self.data['rows'];
                // debug info
                self.debug( 'data up to date:' + self.data['updated'] );
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
            // FUNCTION: setSelectCallback( function: callback ) void
            setSelectCallback :  function( callback ){
                // se callback
                self.options['selectCallback'] = callback;
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
    // DONE MODULE: vatSelectModule( void ) void
})( sharesoft );
// done create module function
