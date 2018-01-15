/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/rides/ridesModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module creates the data object for rides
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

    // MODULE: ridesModule( void ) void
    
    pleisterman.ridesModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'ridesModule';                // string: MODULE
        self.debugOn = false;                       // boolean: debug
        self.id = 'rides';                          // string: id
        self.ridesList = null;                      // module: ridesList
        self.list = null;                           // module: list
        self.listOptions = {                        // json: list options
            'id'                    :   self.id,    // string: id    
            'hasHeaderSelection'    :   true,       // boolean: has header selection
            'hasHeaderNew'          :   true,       // boolen: has header new
            'hasDayList'            :   true        // boolean: has day list
        };                                          // done json: list options
        self.listSelectionsOptions = {              // json: list selections options
            'id'                    :   self.id,    // string: id
            'currentSelection'      :   pleisterman.options['ridesListSelection']['value'], // integer: OPTION: ridesListSelection
            'selections'            :   [           // json array{ string, string,..]: selections
                'lastUsed',                         // string: lastUsed
                'dayList'                           // string: dayList
            ],                                      // json array{ string, string,..]: selections
            'date'                  :   jsProject.getTodayDbDate()    // dbDate: date
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
            
            // create dataObjectModule
            self.dataObjectModule = new pleisterman.rideDataObjectModule();
            // get dataObject
            self.dataObject = self.dataObjectModule.getDataObject();

            // add project select module
            self.addVehicleSelect();
            
            // add project select module
            self.addProjectSelect();
            
            // add date change callback
            self.addDateChangeCallback();

            // create the ridesList module
            self.ridesList = new pleisterman.ridesListSelectModule();
            // create the list
            self.list = new pleisterman.listModule( self.listOptions, self.listCallback );
            
            // add documents select module
            self.addDocumentsSelect();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addVehicleSelect = function(){
        // FUNCTION addVehicleSelect( void ) void

            // get the select module
            var vehicleSelectModule = jsProject.getValue( 'vehiclesSelectModule', 'select' );
            // get vehicleId object from dataObject
            var vehicleIdObject = jsProject.getJsonValue( self.dataObject, ['id=vehicleId'] );            
            // add vehicleId module
            vehicleIdObject['selectModule'] = vehicleSelectModule;      
            
        // DONE FUNCTION addVehicleSelect( void ) void
        };
        self.addProjectSelect = function(){
        // FUNCTION addProjectSelect( void ) void
        
            // get the select module
            var projectSelectModule = jsProject.getValue( 'projectsSelectModule', 'select' );
            // get projectId object from dataObject
            var projectIdObject = jsProject.getJsonValue( self.dataObject, ['id=projectId'] );            
            // add projectId module
            projectIdObject['selectModule'] = projectSelectModule;      

        // DONE FUNCTION addProjectSelect( void ) void
        };
        self.addDocumentsSelect = function(){
        // FUNCTION addDocumentsSelect( void ) void
            
            // get the select module
            var documentsSelectModule = jsProject.getValue( 'documentsSelectModule', 'select' );
            // get documents object from dataObject
            var documentsObject = jsProject.getJsonValue( self.dataObject, ['id=documents'] );            
            // add documents module
            documentsObject['selectModule'] =  documentsSelectModule;           
            
        // DONE FUNCTION addDocumentsSelect( void ) void
        };
        self.addDateChangeCallback = function(){
        // FUNCTION addDateChangeCallback( void ) void
        
            // get date object from dataObject
            var dateObject = jsProject.getJsonValue( self.dataObject, ['id=date'] );            
            // add documents module
            dateObject['changeCallback'] = self.refreshDayList;           

        // DONE FUNCTION addDateChangeCallback( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION addEventSubscriptions( void ) void

            // subscribe to open initial selection
            jsProject.subscribeToEvent( 'openInitialSelection', self.openInitialSelection );

        // DONE FUNCTION addEventSubscriptions( void ) void
        };
        self.load = function( callback ){
        // FUNCTION load( function: callback ) void

            // debug info
            self.debug( 'load' );
            
            // header is open
            if( pleisterman.options['ridesHeaderOpen']['value'] === 'true' ){
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

                // create json options
                var options = {
                    'date'  : self.listSelectionsOptions['date']
                };
                // create json options
                
                // load the list data
                self.ridesList.loadList( self.listSelectionsOptions['currentSelection'], options, self.fillList );
            }
            // done header open
            
            // call the callback 
            callback();
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.listCallback = function( action, selection ){
        // FUNCTION listCallback( string: action, string: id ) void

            // debug info
            self.debug( 'self.listCallback action:' + action + ' selection: ' + selection );
            
            // witch action
            switch( action ){
                // action: open list selection 
                case 'openListSelection' : {
                    // add current selection    
                    self.listSelectionsOptions['currentSelection'] = pleisterman.options['ridesListSelection']['value'];
                    // show selections  
                    pleisterman.showListSelections( selection, self.listSelectionsOptions, self.listSelectionsCallback ); 
                    // done
                    break;
                }
                // action: header 
                case 'header' : {
                    // header is open / closed    
                    if( pleisterman.options['ridesHeaderOpen']['value'] === 'true' ){
                        // was open now closed
                        pleisterman.setOption( 'ridesHeaderOpen', 'false' );
                    }
                    else {
                        // open the selection list
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
                    // select day    
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
            if( pleisterman.options['ridesHeaderOpen']['value'] !== 'true' ){
                // was closed now open
                pleisterman.setOption( 'ridesHeaderOpen', 'true' );
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

                // create options
                var options = {
                    'date'  : self.listSelectionsOptions['date']
                };
                // done create options
                
                // load the list data
                self.ridesList.loadList( self.listSelectionsOptions['currentSelection'], options, self.fillList );
            }
            // done header was not open
        
        // DONE FUNCTION openList( void ) void 
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void
            
            // open subject is rides
            if( pleisterman.options['openSubject']['value'] === 'rides' ){
                // subject row id exists
                if( pleisterman.options['openSubjectRowId']['value'] !== undefined && pleisterman.options['openSubjectRowId']['value'] ){
                     
                    // get selected row
                    self.getRow( pleisterman.options['openSubjectRowId']['value'] );
                }
                // done subject row id exists
            }
            // done open subject is rides
            
        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.listSelectionsCallback = function( selection ){
        // FUNCTION: listSelectionsCallback( string ) void
            
            // debug info
            self.debug( 'returned selection: ' + selection );
            
            // remember selection
            pleisterman.setOption( 'ridesListSelection', selection );
            // set list selection
            self.listSelectionsOptions['currentSelection'] = selection;
            // remember header open
            pleisterman.setOption( 'ridesHeaderOpen', 'true' );
            
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
                    self.listSelectionsOptions['date'] = jsProject.getTodayDbDate();
                }
                // done value is not empty
            }
            // done selection = day list
            
            // create json options 
            var options = {
                'date'  : self.listSelectionsOptions['date']
            };
            // done create json options 
            
            // fill the list with current selection
            self.ridesList.loadList( self.listSelectionsOptions['currentSelection'],  options, self.fillList );
            
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
            
            // create json options
            var options = {
                'date'  : self.listSelectionsOptions['date']
            };
            // done create json options
            
            // fill the list with current selection
            self.ridesList.loadList( self.listSelectionsOptions['currentSelection'],  options, self.fillList );

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

            // create json options
            var options = {
                'date'  : self.listSelectionsOptions['date']
            };
            // done create json options
            
            // fill the list with current selection
            self.ridesList.loadList( self.listSelectionsOptions['currentSelection'],  options, self.fillList );
        };
        self.selectDay = function( selection ){
        // FUNCTION: selectDay( string )
            
            // set list selection
            self.listSelectionsOptions['date'] = selection;

            // create json options
            var options = {
                'date'  : self.listSelectionsOptions['date']
            };
            // done create json options

            // fill the list with current selection
            self.ridesList.loadList( self.listSelectionsOptions['currentSelection'],  options, self.fillList );

        // DONE FUNCTION: selectDay( string )
        };
        self.fillList = function( rows ){
        // FUNCTION: fillList( array: rows ) void
            
            // debug info
            self.debug( 'fillList: ' + rows.length );
            
            // header open show data 
            if( pleisterman.options['ridesHeaderOpen']['value'] ){
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
            pleisterman.setOption( 'openSubject', 'rides' );
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
                    'isYesNo' : true,
                    'okCallback' : self.newRow,
                    'okCallbackParameters' : null
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
            
            // update
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
            pleisterman.setOption( 'openSubject', 'rides' );
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
            pleisterman.setOption( 'ridesListSelection', 'dayList' );
            // set list select seleciton
            self.listSelectionsOptions['currentSelection'] = 'dayList';
            // set llist selections date value
            self.listSelectionsOptions['date'] = date;

            // create json options
            var options = {
                'date'      : date,
                'vehicleId' : null
            };
            // done create json options

            // mode is insert
            if( self.editMode === 'insert' ){
                // set vehicle id
                options['vehicleId'] = pleisterman.options['vehiclesLastSelection']['value'];
            }
            else {
                // get vehicleId from data object
                var vehicleIdObject = jsProject.getJsonValue( self.dataObject, ['id=vehicleId'] );  
                // set vehicle id is vehicle id from dataObject
                options['vehicleId'] = vehicleIdObject['value'];
            }
            // done mode is insert

            // refresh list
            self.ridesList.loadList( self.listSelectionsOptions['currentSelection'], options, self.fillList );
            
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
            // FUNCTION: fillList( void ) void
                self.getRides();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: ridesModule( void ) void
})( pleisterman );
// done create module function
