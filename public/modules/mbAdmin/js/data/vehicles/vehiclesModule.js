/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/vehicles/vehiclesModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module creates the data object for vehicles
 *      it has a load function that will load the list data
 *      it connects the documentsModule to the data documents item
 *      it catches the events for: 
 *          openInitialSelection
 *          refresh list
 *      when in update mode:
 *          update
 *          cancel
 *      when in insert mode:
 *          insert
 *          cancel
 *      it connects to the header functions of the list
\ * 
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

    // MODULE: vehiclesModule( void ) void
    
    sharesoft.vehiclesModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'vehiclesModule';             // string: MODULE
        self.debugOn = false;                       // boolean: debug
        self.id = 'vehicles';                       // string: id
        self.vehiclesList = null;                   // module: vehiclesList
        self.list = null;                           // module: list
        self.listOptions = {                        // json: list options
            'id'                    :   self.id,    // string: id    
            'hasHeaderSelection'    :   true,       // boolean: has header selection
            'hasHeaderNew'          :   true        // boolen: has header new
        };                                          // done json: list options
        self.dataObjectModule = null;               // module: dataObjectModule
        self.dataObject = null;                     // json: dataObject
        self.editMode = 'select';                   // string: mode
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create dataObjectModule
            self.dataObjectModule = new sharesoft.vehicleDataObjectModule();
            // get dataObject
            self.dataObject = self.dataObjectModule.getDataObject();
            
            // create the vehiclesList module
            self.vehiclesList = new sharesoft.vehiclesListModule();
            // create the list
            self.list = new sharesoft.listModule( self.listOptions, self.listCallback );
            
            // add documents select module
            self.addDocumentsSelect();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.setSelectModule = function( module ){
        // FUNCTION setSelectModule( module ) void

            // set select module
            self.selectModule = module;
            // connect get row function to select module
            self.selectModule.setSelectCallback( self.getRow );
            
        // DONE FUNCTION: setSelectModule( module ) void
        };
        self.addDocumentsSelect = function(){
        // FUNCTION addDocumentsSelect( void ) void

            // get the select module
            var documentsSelectModule = jsProject.getValue( 'documentsSelectModule', 'select' );
            // get documents object from dataObject
            var documentsObject = jsProject.getJsonValue( self.dataObject, ['id=documents'] );            
            // set documents id
            documentsObject['selectModule'] = documentsSelectModule;
            
        // DONE FUNCTION: addDocumentsSelect( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION addEventSubscriptions( void ) void

            // subscribe to open initial selection
            jsProject.subscribeToEvent( 'openInitialSelection', self.openInitialSelection );
            // subscribe to refreshList
            jsProject.subscribeToEvent( 'refreshList', self.refreshList );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.load = function( callback ){
        // FUNCTION load( function: callback ) void

            // call the select module load function
            self.selectModule.load( callback );
            
            // header open
            if( sharesoft.options['vehiclesHeaderOpen']['value'] === 'true' ){
                // debug info
                self.debug( 'header is open' );
                // load the list data
                self.vehiclesList.load( self.fillList );
            }
            // done header open
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.refreshList = function( listId ){
        // FUNCTION refreshList( string: listId ) void
        
            // debug info
            self.debug( 'refreshList' + listId );
            
            // liestId = self.id
            if( listId === self.id ){
                // header open
                if( sharesoft.options['vehiclesHeaderOpen']['value'] === 'true' ){
                    // debug info
                    self.debug( 'header is open' );
                    // load the list data
                    self.vehiclesList.load( self.fillList );
                }
                // done header open
            }
            // done if id is self.id

        // DONE FUNCTION: refreshList( string: listId ) void
        };
        self.listCallback = function( action, id ){
        // FUNCTION listCallback( string: action, string: id ) void
        
            // debug info
            self.debug( 'self.listCallback action:' + action + ' id: ' + id );
            
            // witch action
            switch( action ){
                // action: open list selection 
                case 'openListSelection' : {
                    // show data selector
                    self.selectModule.showListSelector( id );
                    // done
                    break;
                }
                // action: header 
                case 'header' : {
                    // header is open / closed    
                    if( sharesoft.options['vehiclesHeaderOpen']['value'] === 'true' ){
                        // was open now closed
                        sharesoft.setOption( 'vehiclesHeaderOpen', 'false' );
                    }
                    else {
                        // open the seletion list
                        self.openList();
                    }
                    // done header is open / closed    
                    break;
                }
                // action: new
                case 'new' : {
                    // prepare new row    
                    self.prepareNewRow();
                    // done
                    break;
                }
                // action: select
                case 'select' : {
                    // select row    
                    self.selectRow( id );    
                    // done
                    break;
                }
                // default: error
                default : {
                    // error    
                    self.debug( 'error list callback unknown action ' + action );
                }
            }            
            // done witch action
            
        // DONE FUNCTION listCallback( string: action, string: id ) void
        };
        self.openList = function(){
        // FUNCTION openList( void ) void 
            
            // header was not open
            if( sharesoft.options['vehiclesHeaderOpen']['value'] !== 'true' ){
                // was closed now open
                sharesoft.setOption( 'vehiclesHeaderOpen', 'true' );
                // load the list
                self.vehiclesList.load( self.fillList );
            }
            // done header was not open
        
        // DONE FUNCTION openList( void ) void 
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void

            // open subject is vehicles
            if( sharesoft.options['openSubject']['value'] === 'vehicles' ){
                // subject row id exists
                if( sharesoft.options['openSubjectRowId']['value'] !== undefined && sharesoft.options['openSubjectRowId']['value'] ){
                     
                    // get selected row
                    self.getRow( sharesoft.options['openSubjectRowId']['value'] );
                }
                // done subject row id exists
            }
            // done open subject is vehicles

        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.fillList = function( rows ){
        // FUNCTION: fillList( array: rows ) void
            
            // debug info
            self.debug( 'self.fillList: ');
            
            // header open show data 
            if( sharesoft.options['vehiclesHeaderOpen']['value'] === 'true' ){
                // open list content
                self.list.openContent( true );

                // create options
                var options = {
                    'headerText'    :   sharesoft.translations['lastUsedVehicles'],
                    'rows'          :   rows
                };
                // done create options

                // refresh list rows
                self.list.refreshRows( options );
            }
            // done header open show data 

        // DONE FUNCTION: fillList( array: rows ) void
        };
        self.selectRow = function( id ){
        // FUNCTION: selectRow( string: id ) void
            
            // check for data change
            if( jsProject.getValue( 'changed', 'data' ) ){
                
                // create message options
                var options = {
                    'isYesNo' : true,
                    'okCallback' : self.getRow,
                    'okCallbackParameters' : id
                };
                // done create message options
                
                // show the message
                sharesoft.showMessage( 'dataChanged', options );
            }
            else {
                // data unchanged get row
                self.getRow( id );
            }

        // DONE FUNCTION: selectRow( string: id ) void
        };
        self.reloadRow = function(){
        // FUNCTION: reloadRow( void ) void
        
            // debug info
            self.debug( 'reload' );
            // reload 
            self.getRow( sharesoft.options['openSubjectRowId']['value'] );

        // DONE FUNCTION: reloadRow( void ) void
        };
        self.cancelEdit = function(){
        // FUNCTION: cancelEdit( void )
            
            // mode is select
            if( self.editMode === 'select' ){
                // done 
                return;
            }
            // mode is select

            // mode is update
            if( self.editMode === 'update' ){
                // remove event subscription
                jsProject.unSubscribeFromEvent( 'update', self.update );
            }
            // done mode is update

            // mode is insert
            if( self.editMode === 'insert' ){
                // remove event subscription
                jsProject.unSubscribeFromEvent( 'insert', self.insert );
            }
            // done mode is insert
            
            // remove event subscription
            jsProject.unSubscribeFromEvent( 'cancel', self.cancelEdit );

            // reset data id
            jsProject.setValue( 'id', 'data', null );    
            // reset data object
            jsProject.setValue( 'dataObject', 'data', null );    
            // reset data changed
            jsProject.setValue( 'changed', 'data', false );
            // set edit mode
            self.editMode = 'select';
            // unset open subject
            sharesoft.setOption( 'openSubject', null );            
            // call cancel event
            jsProject.callEvent( 'cancel' );
        
        // DONE FUNCTION: cancelEdit( void )
        };
        self.getRow = function( id ){
        // FUNCTION: getRow( string: id ) void
            
            // call cancel event 
            jsProject.callEvent( 'cancel' );    

            // open the seletion list
            self.openList();

            // set open subject
            sharesoft.setOption( 'openSubject', 'vehicles' );
            // set open id
            sharesoft.setOption( 'openSubjectRowId', id );
            // get data
            self.dataObjectModule.getData( self.showData, id );

        // DONE FUNCTION: getRow( string: id ) void
        };
        self.prepareNewRow = function(){
        // FUNCTION: prepareNewRow( void ) void
            
            // check for data change
            if( jsProject.getValue( 'changed', 'data' ) ){

                // create message options
                var options = {
                    'isYesNo' : true,
                    'okCallback' : self.newRow,
                    'okCallbackParameters' : null
                };
                // done create message options
                
                // show the message
                sharesoft.showMessage( 'dataChanged', options );
            }
            else {
                // new row
                self.newRow( );
            }
            // done data changed
            
        // DONE FUNCTION: prepareNewRow( void ) void
        };
        self.newRow = function( ){
        // FUNCTION: newRow( void ) void
            
            // call cancel event 
            jsProject.callEvent( 'cancel' );    

            // open the selection list
            self.openList();

            // set default data
            self.dataObjectModule.setDefaultData();
            // set edit mode
            self.editMode = 'insert';
            // set data id
            jsProject.setValue( 'id', 'data', self.id );    
            // set data object
            jsProject.setValue( 'dataObject', 'data', self.dataObject );    
            
            // subscribe to insert event
            jsProject.subscribeToEvent( 'insert', self.insert );
            // subscribe to cancel event
            jsProject.subscribeToEvent( 'cancel', self.cancelEdit );
            
            // call the event
            jsProject.callEvent( 'editNew' );    
            
        // DONE FUNCTION: newRow( void ) void
        };
        self.showData = function( ){
        // FUNCTION: showData( void ) void
            
            // set data !changed 
            jsProject.setValue( 'changed', 'data', false );    
            // set data object
            jsProject.setValue( 'dataObject', 'data', self.dataObject );    
            // set data id
            jsProject.setValue( 'id', 'data', self.id );    

            // set edit mode
            self.editMode = 'update';
            
            // subscribe to update event
            jsProject.subscribeToEvent( 'update', self.update );
            // subscribe to cancel event
            jsProject.subscribeToEvent( 'cancel', self.cancelEdit );
            
            // call open event
            jsProject.callEvent( 'editOpen' );   
            
            // refresh list
            self.refreshList( 'vehicles' );
            
        // DONE FUNCTION: showData( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
            
            // update
            self.dataObjectModule.update( self.updateCallback, self.reloadRow );
            // set data !changed 
            jsProject.setValue( 'changed', 'data', false );    

        // DONE FUNCTION: update( void ) void
        };
        self.updateCallback = function( ){
        // FUNCTION: updateCallback( void ) void
            
            // refresh list 
            self.vehiclesList.load( self.fillList );

            // call after update event
            jsProject.callEvent( 'afterUpdate' );
        };
        self.insert = function( ){
        // FUNCTION: insert( void )
            
            // call dataObject insert
            self.dataObjectModule.insert( self.insertCallback );
            
        // DONE FUNCTION: insert( void )
        };
        self.insertCallback = function( id ){
        // FUNCTION: insertCallback( string: id ) void
            
            // cancel edit state
            self.cancelEdit();
            // set open subject
            sharesoft.setOption( 'openSubject', 'vehicles' );
            // set open id
            sharesoft.setOption( 'openSubjectRowId', id );

            // refresh data display
            self.showData();
            
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
            load    :   function( callback ){
            // FUNCTION: load( function: callback ) void
                self.load( callback );
            },
            setSelectModule  :   function( module ){
            // FUNCTION: setSelectModule( module: module ) void
                self.setSelectModule( module );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: vehiclesModule( void ) void
})( sharesoft );
// done create module function
