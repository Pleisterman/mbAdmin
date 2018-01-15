/*
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/tasks/tasksModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls the flow for the task data
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){
    
    // MODULE: tasksModule( void ) void
    
    pleisterman.tasksModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'tasksModule';                // string: MODULE
        self.debugOn = false;                       // boolean: debug
        self.id = 'tasks';                          // string: id
        self.tasksListSelect = null;                      // module: tasksList
        self.list = null;                           // module: list
        self.listOptions = {                        // json: list options
            'id'                    : self.id,      // string: id 
            'hasHeaderSelection'    :   true,       // boolean: has header selection
            'hasHeaderNew'          :   true,       // boolen: has header new
            'hasDayList'            :   true        // boolen: has day list
        };                                          // done json: list options
        self.listSelectionsOptions = {              // json: list selections options
            'id'                    :   self.id,    // string: id
            'currentSelection'      :   pleisterman.options['tasksListSelection']['value'],
            'selections'            :   [           // json array{ string, string,..]: selections
                'lastUsed',                         // string: lastUsed
                'dayList'                           // string: dayList
            ],                                      // json array{ string, string,..]: selections
            'date'                  :   jsProject.getTodayDbDate() // dbDate: date
        };                                          // done json: list selections options
        self.dataObjectModule = null;               // module: dataObjectModule
        self.dataObject = null;                     // json: dataObject
        self.editMode = 'select';                   // string: mode
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create dataObject module
            self.dataObjectModule = new pleisterman.taskDataObjectModule();
            // get data object
            self.dataObject = self.dataObjectModule.getDataObject();
            
            // add project select module
            self.addProjectSelect();
            
            // add date change callback
            self.addDateChangeCallback();

            // create the tasks list select module
            self.tasksListSelect = new pleisterman.tasksListSelectModule();
            
            // create the list
            self.list = new pleisterman.listModule( self.listOptions, self.listCallback );
            
            // add documents select module
            self.addDocumentsSelect();

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
        self.addProjectSelect = function(){
        // FUNCTION: addProjectSelect( void ) void
            
            // get the select module
            var projectSelectModule = jsProject.getValue( 'projectsSelectModule', 'select' );
            // get projectId object from data object
            var projectIdObject = jsProject.getJsonValue( self.dataObject, ['id=projectId'] );  
            // set select module value 
            projectIdObject['selectModule'] = projectSelectModule;

        // DONE FUNCTION: addProjectSelect( void ) void
        };
        self.addDateChangeCallback = function(){
        // FUNCTION: addDateChangeCallback( void ) void

            // get date object from data object
            var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );  
            // set change callback function 
            dateObject['changeCallback'] = self.refreshDayList;

        // DONE FUNCTION: addDateChangeCallback( void ) void
        };
        self.addDocumentsSelect = function(){
        // FUNCTION: addDocumentsSelect( void ) void
            
            // get the select module
            var documentsSelectModule = jsProject.getValue( 'documentsSelectModule', 'select' );
            // get documents object from data object
            var documentsObject = jsProject.getJsonValue( self.dataObject, ['id=documents'] );  
            // set select module value 
            documentsObject['selectModule'] = documentsSelectModule;

        // DONE FUNCTION: addDocumentsSelect( void ) void
        };
        self.load = function( callback ){
        // FUNCTION: load( function: callback ) void

            // debug info
            self.debug( 'load' );
            
            // header is open
            if( pleisterman.options['tasksHeaderOpen']['value'] === 'true' ){
                // debug info
                self.debug( 'header is open' );
                
                // selection = day list
                if( self.listSelectionsOptions['currentSelection'] === 'dayList' ){
                    // get date object from dataObject
                    var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );            
                    // date empty
                    if( dateObject['value'] === '' ){
                        // set list select today date value
                        self.listSelectionsOptions['date'] = jsProject.getTodayDbDate();
                    }
                    else {
                        // set list select date value
                        self.listSelectionsOptions['date'] = dateObject['value'];
                    }
                    // done date empty
                }
                // done selection = day list
                
                // load the list data
                self.tasksListSelect.loadList( self.listSelectionsOptions['currentSelection'], self.listSelectionsOptions['date'], self.fillList );
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
                    // add current selection    
                    self.listSelectionsOptions['currentSelection'] = pleisterman.options['tasksListSelection']['value'];
                    // show selections  
                    pleisterman.showListSelections( selection, self.listSelectionsOptions, self.listSelectionsCallback ); 
                    // done
                    break;
                }
                // action: header 
                case 'header' : {
                    // header is open OPTION: tasksHeaderOpen    
                    if( pleisterman.options['tasksHeaderOpen']['value'] === 'true' ){
                        // remember close
                        pleisterman.setOption( 'tasksHeaderOpen', 'false' );
                    }
                    else {
                        // open the selection list
                        self.openList();
                    }
                    // done header is open    
                    break;
                }
                // action: new
                case 'new' : {
                    // prepare new row    
                    self.prepareNewRow();
                    // done
                    break;
                }
                // action: previous day
                case 'previousDay' : {
                    // select previous day
                    self.selectPreviousDay();
                    // done
                    break;
                }
                // action: next day
                case 'nextDay' : {
                    // select next day    
                    self.selectNextDay();
                    // done
                    break;
                }
                // action: select day
                case 'selectDay' : {
                    self.selectDay( selection );
                    // done
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
            if( pleisterman.options['tasksHeaderOpen']['value'] !== 'true' ){
                // was closed now open
                pleisterman.setOption( 'tasksHeaderOpen', 'true' );
                // current selection = daylist
                if( self.listSelectionsOptions['currentSelection'] === 'dayList' ){
                    // get date object from dataObject
                    var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );            
                    // dataObejct date = empty
                    if( dateObject['value'] === '' ){
                        // set list select today date value
                        self.listSelectionsOptions['date'] = jsProject.getTodayDbDate();
                    }
                    else {
                        // set list select date value
                        self.listSelectionsOptions['date'] = dateObject['value'];
                    }
                    // done dataObejct date = empty
                }
                // done current selection = daylist
                                
                // load the list data
                self.tasksListSelect.loadList( self.listSelectionsOptions['currentSelection'], self.listSelectionsOptions['date'], self.fillList );
            }
            // done header was not open
        
        // DONE FUNCTION openList( void ) void 
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void
            
            // open subject is tasks
            if( pleisterman.options['openSubject']['value'] === 'tasks' ){
                // subject row id exists
                if( pleisterman.options['openSubjectRowId']['value'] !== undefined && pleisterman.options['openSubjectRowId']['value'] ){

                    // get selected row
                    self.getRow( pleisterman.options['openSubjectRowId']['value'] );
                }
                // done subject row id exists
            }
            // done open subject is tasks

        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.listSelectionsCallback = function( selection ){
        // FUNCTION: listSelectionsCallback( string ) void
            
            // debug info
            self.debug( 'returned selection: ' + selection );
            
            // remember selection
            pleisterman.setOption( 'tasksListSelection', selection );
            // set list selection
            self.listSelectionsOptions['currentSelection'] = selection;
            // remember header open
            pleisterman.setOption( 'tasksHeaderOpen', 'true' );

            // selection = day list
            if( selection === 'dayList' ){
                // get date object from dataObject
                var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );            

                // value is not empty
                if( dateObject['value'] !== '' ){
                    // set date 
                    self.listSelectionsOptions['date'] = dateObject['value'];
                }
                else {
                    // set date today
                    self.listSelectionsOptions['date'] = pleisterman.getTodayDbDate();
                }
                // done value is not empty
            }
            // done selection = day list

            // fill the list with current selection
            self.tasksListSelect.loadList( self.listSelectionsOptions['currentSelection'],  self.listSelectionsOptions['date'], self.fillList );
            
        // DONE FUNCTION: listSelectionsCallback( string ) void
        };
        self.selectPreviousDay = function( ){
        // FUNCTION: selectPreviousDay( void ) void
            
            // get date
            var dateObject = jsProject.dbDateToDateObject( self.listSelectionsOptions['date'] );
            // get previous day
            dateObject = jsProject.getPreviousDay( dateObject );
            // set selection
            self.listSelectionsOptions['date'] = jsProject.dateObjectToDbDate( dateObject );
            // fill the list with current selection
            self.tasksListSelect.loadList( self.listSelectionsOptions['currentSelection'],  self.listSelectionsOptions['date'], self.fillList );

        // DONE FUNCTION: selectPreviousDay( void ) void
        };
        self.selectNextDay = function( ){
        // FUNCTION: selectNextDay( void ) void
            
            // get date
            var dateObject = jsProject.dbDateToDateObject( self.listSelectionsOptions['date'] );
            // get next day
            dateObject = jsProject.getNextDay( dateObject );
            // set selection
            self.listSelectionsOptions['date'] = jsProject.dateObjectToDbDate( dateObject );
            // fill the list with current selection
            self.tasksListSelect.loadList( self.listSelectionsOptions['currentSelection'],  self.listSelectionsOptions['date'], self.fillList );

        // DONE FUNCTION: selectNextDay( void ) void
        };
        self.selectDay = function( selection ){
        // FUNCTION: selectDay( string )
            
            // set list selection
            self.listSelectionsOptions['date'] = selection;
            // fill the list with current selection
            self.tasksListSelect.loadList( self.listSelectionsOptions['currentSelection'],  self.listSelectionsOptions['date'], self.fillList );

        // DONE FUNCTION: selectDay( string )
        };
        self.fillList = function( rows ){
        // FUNCTION: fillList( array: rows ) void
            
            // debug info
            self.debug( 'self.fillList: ' + rows.length );

            // header open show data 
            if( pleisterman.options['tasksHeaderOpen']['value'] === 'true' ){
                // open list content
                self.list.openContent( true );
            
                // create options
                var options = {
                    'headerText'    :   pleisterman.translations[self.listSelectionsOptions['currentSelection']],
                    'rows'          :   rows,
                    'selection'     :   self.listSelectionsOptions['currentSelection'],
                    'date'          :   self.listSelectionsOptions['date']
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
            
            // data changed
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
                self.getRow( id );
            }
                // done data changed

        // DONE FUNCTION: selectRow( string: id ) void
        };
        self.reloadRow = function(){
        // FUNCTION: reloadRow( void ) void
            
            // debug info
            self.debug( 'reload' );
            // reload 
            self.getRow( pleisterman.options['openSubjectRowId']['value'] );

        // DONE FUNCTION: reloadRow( void ) void
        };
        self.cancelEdit = function(){
        // FUNCTION: cancelEdit( void )
            
            // debug info
            self.debug( 'cancelEdit mode: ' + self.editMode );
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
            pleisterman.setOption( 'openSubject', null );            
            // call cancel event
            jsProject.callEvent( 'cancel' );
        
        // DONE FUNCTION: cancelEdit( void )
        };
        self.getRow = function( id ){
        // FUNCTION: getRow( string: id ) void
            
            // call cancel event 
            jsProject.callEvent( 'cancel' );    

            // open the selection list
            self.openList();

            // set open subject
            pleisterman.setOption( 'openSubject', 'tasks' );
            // set open id
            pleisterman.setOption( 'openSubjectRowId', id );
            // get data
            self.dataObjectModule.getData( self.showData, id );
        
        // DONE FUNCTION: getRow( string: id ) void
        };
        self.prepareNewRow = function(){
        // FUNCTION: prepareNewRow( void ) void
            
            // data changed
            if( jsProject.getValue( 'changed', 'data' ) ){

                // create message options
                var options = {
                    'isYesNo'               : true,
                    'okCallback'            : self.newRow,
                    'okCallbackParameters'  : null
                };
                // done create message options
                
                // show the message
                pleisterman.showMessage( 'dataChanged', options );
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
            
            // create date value
            var date = null;
            
            // get date object from data object
            var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );  

            // selection ! daylist or date selection empty
            if( self.listSelectionsOptions['currentSelection'] !== 'dayList' || self.listSelectionsOptions['date'] === '' ){
                // set date today value
                dateObject['value'] = jsProject.getTodayDbDate();
            }
            else {
                // set date value
                dateObject['value'] = self.listSelectionsOptions['date'];
            }
            // done selection ! daylist or date value empty
            
            // remember date
            date = dateObject['value'];
            
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
            
            // refresh list
            self.refreshDayList( date );
            
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
            
            // get date object from dataObject
            var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );            
            // refresh list
            self.refreshDayList( dateObject['value'] );
            
        // DONE FUNCTION: showData( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
            
            // call dataObject update
            self.dataObjectModule.update( self.updateCallback, self.reloadRow );
            // set data !changed 
            jsProject.setValue( 'changed', 'data', false );    

        // DONE FUNCTION: update( void ) void
        };
        self.updateCallback = function( ){
        // FUNCTION: updateCallback( void ) void
            
            // get date object from data object
            var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );  
            // refresh list 
            self.refreshDayList( dateObject['value'] );
            
            // call after update event
            jsProject.callEvent( 'afterUpdate' );
            
        // DONE FUNCTION: updateCallback( void ) void
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
            pleisterman.setOption( 'openSubject', 'tasks' );
            // set open id
            pleisterman.setOption( 'openSubjectRowId', id );
            // refresh data display
            self.showData();
            
        // DONE FUNCTION: insertCallback( string: id ) void
        };
        self.refreshDayList = function( date ){
        // FUNCTION: refreshDayList( string: date ) void
            
            // debug info
            self.debug( 'refreshDayList' + date );
            // remember selection
            pleisterman.setOption( 'tasksListSelection', 'dayList' );
            // set list select seleciton
            self.listSelectionsOptions['currentSelection'] = 'dayList';
            // set llist selections date value
            self.listSelectionsOptions['date'] = date;
            // refresh list
            self.tasksListSelect.loadList( self.listSelectionsOptions['currentSelection'],  date, self.fillList );
            
        // DONE FUNCTION: refreshDayList( string: date ) void
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
            fillList : function(){
            // FUNCTION: fillList void ) void
                self.getTasks();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: tasksModule( void ) void
})( pleisterman );
// done create module function
