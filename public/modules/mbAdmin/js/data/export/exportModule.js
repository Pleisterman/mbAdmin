/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/export/exportModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this module controls export of data 
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

    // MODULE: exportModule( void ) void
    
    sharesoft.exportModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'exportModule';                       // string: MODULE
        self.debugOn = false;                                // boolean: debug
        self.id = 'export';                                 // string: id
        self.listRows = [                                   // json: listRows
            {                                               // json: tasks
                'id'    :   'tasks',                        // string: id
                'text'  :   sharesoft.translations['tasks'] // string: TRANSLATION: tasks
            },                                              // done json: tasks
            {                                               // json: rides
                'id'    :   'rides',                        // string: id
                'text'  :   sharesoft.translations['rides'] // string: TRANSLATION: rides
            }                                               // done json: rides
        ];                                                  // done json: listRows
        self.listOptions = {                                // json: list options
            'id'                    :   self.id,            // string: id
            'hasHeaderSelection'    :   false,              // boolean: hasHeaderSelection
            'hasHeaderNew'          :   false               // boolean: hasHeaderNew
        };                                                  // done json: list options
        self.delimiterSelectModule = null;                  // module: delimiterSelectModule
        self.exportTasksTotalsSelectModule = null;          // module: exportTasksTotalsSelectModule
        self.projectsDataObjectModule = null;               // module: projectsDataObjectModule
        self.contactsDataObjectModule = null;               // module: contactsDataObjectModule
        self.vehiclesDataObjectModule = null;               // module: vehiclesDataObjectModule
        self.tasksDataObjectModule = null;                  // module: tasksDataObjectModule
        self.exportRidesTotalsSelectModule = null;          // module: exportRidesTotalsSelectModule
        self.ridesDataObjectModule = null;                  // module: ridesDataObjectModule 
        self.dataObject = {                                 // json: dataObject
            'headerText'    :   'export taken'              // string: headerText
        };                                                  // done json: dataObject
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // create list
            self.list = new sharesoft.listModule( self.listOptions, self.listCallback );
            
            // create data objects
            self.addDataObjects();
            
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
        self.addDataObjects = function(){
        // FUNCTION: addDataObjects( void ) void

            // add delimiter module
            self.delimiterSelectModule = new sharesoft.delimiterSelectModule();
            // add projectsDataObject module
            self.projectsDataObjectModule = new sharesoft.exportProjectsDataObjectModule();
            // add contactsDataObject module
            self.contactsDataObjectModule = new sharesoft.exportContactsDataObjectModule( );
            // add vehiclesDataObject module
            self.vehiclesDataObjectModule = new sharesoft.exportVehiclesDataObjectModule( );
            // add exportTasksTotalsSelect module
            self.exportTasksTotalsSelectModule = new sharesoft.exportTasksTotalsSelectModule();
            // add tasksDataObject module
            self.tasksDataObjectModule = new sharesoft.exportTasksDataObjectModule( self.delimiterSelectModule, self.exportTasksTotalsSelectModule );
            // add delimiter exportRideTotalsSelect module
            self.exportRideTotalsSelectModule = new sharesoft.exportRidesTotalsSelectModule();
            // add ridesDataObject module
            self.ridesDataObjectModule = new sharesoft.exportRidesDataObjectModule( self.delimiterSelectModule, self.exportRideTotalsSelectModule );
            
        // DONE FUNCTION: addDataObjects( void ) void
        };
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void

            // debug info
            self.debug( 'load' );
            
            // create list options
            var options = {
                'headerText'    :   sharesoft.translations['subjects'],
                'rows'          :   self.listRows
            };
            // done create list options
            
            // refresh list rows
            self.list.refreshRows( options );
            
            // export header is open
            if( sharesoft.options['exportHeaderOpen']['value'] === 'true' ){
                // show list content
                self.list.openContent( true );
            }
            // done export header is open
            
            // call callback
            callback();
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.listCallback = function( action, id ){
        // FUNCTION: listCallback( string: action, string: id ) void

            // debug info
            self.debug( 'self.listCallback action:' + action + ' id: ' + id );
            
            // switch acion
            switch( action ){
                // case header
                case 'header' : {
                    // export header is open
                    if( sharesoft.options['exportHeaderOpen']['value'] === 'true' ){
                        // set option: OPTION: exportHeaderOpen
                        sharesoft.setOption( 'exportHeaderOpen', 'false' );
                        // hide list content
                        self.list.openContent( false );
                    }
                    else {
                        // set option: OPTION: exportHeaderOpen
                        sharesoft.setOption( 'exportHeaderOpen', 'true' );
                        // show list content
                        self.list.openContent( true );
                    }
                    // done export header is open
                    
                    // done 
                    break;
                }
                // case select
                case 'select' : {
                    // select row    
                    self.selectRow( id );    
                    // done
                    break;
                }
                // case default
                default : {
                    // debug info    
                    self.debug( 'error list callback unknown action ' + action );
                }
            }            
            // done switch acion
            
        // DONE FUNCTION: listCallback( string: action, string: id ) void
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void

            // open subject is export
            if( sharesoft.options['openSubject']['value'] === 'export' ){
                // subject row id exists
                if( sharesoft.options['openSubjectRowId']['value'] !== undefined && sharesoft.options['openSubjectRowId']['value'] ){
                    // get selected row
                    self.display( sharesoft.options['openSubjectRowId']['value'] );
                }
                // done subject row id exists
            }
            // done open subject is export
            
        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.selectRow = function( id ){
        // FUNCTION: selectRow( string: id ) void

            // check for data change
            if( jsProject.getValue( 'changed', 'data' ) ){
                
                // create message options
                var options = {
                    'isYesNo' : true,
                    'okCallback' : self.display,
                    'okCallbackParameters' : id
                };
                // done create message options
                
                // show the message
                sharesoft.showMessage( 'dataChanged', options );
            }
            else {
                // data unchanged get row
                self.display( id );
            }
            // done data changed

        // DONE FUNCTION: selectRow( string: id ) void
        };
        self.cancel = function(){
        // FUNCTION: cancel( void ) void
        
            // debug info
            self.debug( 'cancelDisplay mode: ' );

            // remove event subscription export
            jsProject.unSubscribeFromEvent( 'export', self.export );
            // remove event subscription cancel
            jsProject.unSubscribeFromEvent( 'cancel', self.cancel );

            // reset data id
            jsProject.setValue( 'id', 'data', null );    
            // reset data object
            jsProject.setValue( 'dataObject', 'data', null );    
            // reset data changed
            jsProject.setValue( 'changed', 'data', false );
            // call th open event
            jsProject.callEvent( 'exportClose' );   
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.display = function( id ){
        // FUNCTION: display( string: id ) void
            
            // debug info
            self.debug( 'display ' );

            // call cancel event 
            jsProject.callEvent( 'cancel' );    

            // set open subject
            sharesoft.setOption( 'openSubject', 'export' );
            // set open id
            sharesoft.setOption( 'openSubjectRowId', id );
            // display
            
            // set data !changed 
            jsProject.setValue( 'changed', 'data', false );    

            // select data
            self.selectData( id );
            
            // set data id
            jsProject.setValue( 'id', 'data', self.id );    

            jsProject.subscribeToEvent( 'export', self.export );
            jsProject.subscribeToEvent( 'cancel', self.cancel );

            // call open event
            jsProject.callEvent( 'exportOpen' );   
            
        // DONE FUNCTION: display( string: id ) void
        };
        self.selectData = function( id ){
        // FUNCTION: selectData( string: id ) void
            
            // switch: id
            switch( id ){
                // case: default
                case 'projects' :  {
                    // set data object
                    jsProject.setValue( 'dataObject', 'data', self.projectsDataObjectModule.getDataObject() );    
                    // set header text TRANSLATION: exportProjectsHeader
                    jsProject.setValue( 'headerText', 'data', sharesoft.translations['exportProjectsHeader'] );    
                    // done 
                    break;   
                }
                // case: contacts
                case 'contacts' :  {
                    // set data object
                    jsProject.setValue( 'dataObject', 'data', self.contactsDataObjectModule.getDataObject() );    
                    // set header text TRANSLATION: exportContactsHeader
                    jsProject.setValue( 'headerText', 'data', sharesoft.translations['exportContactsHeader'] );    
                    // done 
                    break;   
                }
                // case: vehicles
                case 'vehicles' :  {
                    // set data object
                    jsProject.setValue( 'dataObject', 'data', self.vehiclesDataObjectModule.getDataObject() );    
                    // set header text TRANSLATION: exportVehiclesHeader
                    jsProject.setValue( 'headerText', 'data', sharesoft.translations['exportVehiclesHeader'] );    
                    // done 
                    break;   
                }
                // case: tasks
                case 'tasks' :  {
                    // set data object
                    jsProject.setValue( 'dataObject', 'data', self.tasksDataObjectModule.getDataObject() );    
                    // set header text TRANSLATION: exportTasksHeader
                    jsProject.setValue( 'headerText', 'data', sharesoft.translations['exportTasksHeader'] );    
                    // done 
                    break;   
                }
                // case: rides
                case 'rides' :  {
                    // set data object
                    jsProject.setValue( 'dataObject', 'data', self.ridesDataObjectModule.getDataObject() );    
                    // set header text TRANSLATION: exportRidesHeader
                    jsProject.setValue( 'headerText', 'data', sharesoft.translations['exportRidesHeader'] );    
                    // done 
                    break;   
                }
                // case: default
                default : {
                    // debug info
                    self.debug( 'select data unknown data id: ' + id );
                }
            }
            // done switch: id
            
        // DONE FUNCTION: selectData( string: id ) void
        };
        self.export = function( exportType ) {
        // FUNCTION: export( string: exportType ) void
            
            // debug info
            self.debug( 'export type: ' + exportType );
            
            // set open id
            var id = sharesoft.options['openSubjectRowId']['value'];
            switch( id ){
                case 'tasks' :  {
                    self.tasksDataObjectModule.export( exportType, self.exportCallback );
                    break;
                    
                }
                case 'rides' :  {
                    self.ridesDataObjectModule.export( exportType, self.exportCallback );
                    break;
                    
                }
                default : {
                    self.debug( 'select data unknown data id: ' + id );
                }
            }
            
        // DONE FUNCTION: export( string: exportType ) void
        };
        self.exportCallback = function( result ) {
        // FUNCTION: exportCallback( json: result ) void
        
            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'file',
                'what'              :   result['file'] 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.secureDownload( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data );
            
        // DONE FUNCTION: exportCallback( json: result ) void
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
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: exportModule( void ) void
})( sharesoft );
// done create module function
