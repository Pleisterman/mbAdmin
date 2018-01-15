/*
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/tasks/tasksModule.js
 * 
 *  Last Revision: 05-04-2017
 * 
 *  Purpose: 
 *          this module controls the flow for the documents data
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

    // MODULE: documentsModule( void ) void 
    
    pleisterman.documentsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'documentsModule';            // string: MODULE
        self.debugOn = false;                       // boolean: debug
        self.id = 'documents';                      // string: id
        self.listSelect = null;                     // module: listSelect
        self.listOptions = {                        // json: list options
            'id'                    : self.id,      // string: id
            'hasHeaderSelection'    :   true,       // boolean: has header selection
            'hasHeaderNew'          :   false       // boolen: has header new
        };                                          // done json: list options
        self.list = null;                           // module: list
        self.dataObjectModule = null;               // module: dataObjectModule
        self.dataObject = null;                     // json: dataObject
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // create dataObject module
            self.dataObjectModule = new pleisterman.documentDataObjectModule();
            // get data object
            self.dataObject = self.dataObjectModule.getDataObject();
            
            // create the list select module
            self.listSelect = new pleisterman.documentsListSelectModule( self.fillList );
            
            // create the list
            self.list = new pleisterman.listModule( self.listOptions, self.listCallback );
            // done create list
            
            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // subscribe to open initial selection
            jsProject.subscribeToEvent( 'openInitialSelection', self.openInitialSelection );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.setSelectModule = function( module ){
        // FUNCTION setSelectModule( module ) void

            // set select module
            self.selectModule = module;
            // connect get row function to select module
            self.selectModule.setSelectCallback( self.getRow );
            
        // DONE FUNCTION: setSelectModule( module ) void
        };
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void

            // debug info
            self.debug( 'load' );
            
            // header is open
            if( pleisterman.options['documentsHeaderOpen']['value'] === 'true' ){
                // debug info
                self.debug( 'header is open' );
                
                // load the list data
                self.listSelect.loadList( );
            }
            // done header is open

            // done call callback
            callback();
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.listCallback = function( action, selection ){
        // FUNCTION: listCallback( string, string ) void
            
            // debug info
            self.debug( 'self.listCallback action:' + action + ' selection: ' + selection );
            
            // which action
            switch( action ){
                // action: open list selection 
                case 'openListSelection' : {
                    // show selections  
                    self.listSelect.show( selection );
                    // done
                    break;
                }
                // action: header 
                case 'header' : {
                    // header is open OPTION: documentsHeaderOpen    
                    if( pleisterman.options['documentsHeaderOpen']['value'] === 'true' ){
                        // remember close
                        pleisterman.setOption( 'documentsHeaderOpen', 'false' );
                    }
                    else {
                        // open the selection list
                        self.openList();
                        }
                    break;
                }
                // action: select
                case 'select' : {
                    // select row    
                    self.selectRow( selection );    
                    // done
                    break;
                }
                // default: error
                default : {
                    // debug info    
                    self.debug( 'error list callback unknown action ' + action );
                }
            }            
            // done witch action
            
        // DONE FUNCTION listCallback( string: action, string: id ) void
        };
        self.openList = function(){
        // FUNCTION openList( void ) void 
            
            // header was not open
            if( pleisterman.options['documentsHeaderOpen']['value'] !== 'true' ){
                // was closed now open
                pleisterman.setOption( 'documentsHeaderOpen', 'true' );
                                
                // load the list data
                self.listSelect.loadList( );
            }
            // done header was not open
        
        // DONE FUNCTION openList( void ) void 
        };
        self.openInitialSelection = function(){
            // open subject is rides
            if( pleisterman.options['openSubject']['value'] === 'documents' ){
                // subject row id exists
                if( pleisterman.options['openSubjectRowId']['value'] !== undefined &&
                    pleisterman.options['openSubjectRowId']['value'] ){
                     
                    // get selected row
                    self.display( pleisterman.options['openSubjectRowId']['value'] );
                }
                // done subject row id exists
            }
            // done open subject is rides
        };
        self.fillList = function( rows ){
        // FUNCTION: fillList( array: rows ) void
            
            // debug info
            self.debug( 'self.fillList: ' + rows.length );

            // header open show data 
            if( pleisterman.options['documentsHeaderOpen']['value'] === 'true' ){
                // open list content
                self.list.openContent( true );
            
                // create options
                var options = {
                    'headerText'    :   pleisterman.translations['lastUsed'],
                    'rows'          :   rows,
                    'selection'     :   pleisterman.options['documentsListSelection']['value'],
                    'searchText'    :   ''
                };
                // done create options

                // refresh list rows
                self.list.refreshRows( options );
            }
            // done header open show data 

        // DONE FUNCTION: fillList( array: rows ) void
        };
        self.selectRow = function( id ){
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
                pleisterman.showMessage( 'dataChanged', options );
            }
            else {
                // data unchanged get row
                self.display( id );
            }
        };
        self.getRow = function(){
            
        };
        self.cancel = function(){
            // debug info
            self.debug( 'cancelDisplay mode: ' );

            // remove event subscription
            jsProject.unSubscribeFromEvent( 'cancel', self.cancel );

            // reset data id
            jsProject.setValue( 'id', 'data', null );    
            // reset data object
            jsProject.setValue( 'dataObject', 'data', null );    
            // call th open event
            jsProject.callEvent( 'exportClose' );   
        };
        self.display = function( id ){
            // debug info
            self.debug( 'display: ' );
            // call cancel event 
            jsProject.callEvent( 'cancel' );    

            // set open subject
            pleisterman.setOption( 'openSubject', 'documents' );
            // set open id
            pleisterman.setOption( 'openSubjectRowId', id );
            // display
            
            // set data !changed 
            jsProject.setValue( 'changed', 'data', false );    

            
            // set data id
            jsProject.setValue( 'id', 'data', self.id );    

            jsProject.subscribeToEvent( 'cancel', self.cancel );

            // call the open event
            jsProject.callEvent( 'displayOpen' );   
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
            load    :   function( callback ){
                // call internal
                self.load( callback );
            },
            // FUNCTION: setSelectModule( module: module ) void
            setSelectModule  :   function( module ){
                // call internal
                self.setSelectModule( module );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: documentsModule( void ) void
})( pleisterman );
// done create module function
