/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/tasks/taskDataObjectModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module contains the structure of the dataObject for tasks
 *      it defines the display of the data
 *      it handles getting, updating and inserting data
 *      it sets default data before insert
 *      it handles the data checks before updates and inserts
 *      it handles the callback errors
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

    // MODULE: taskDataObjectModule( void ) void
    
    sharesoft.taskDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'taskDataObjectModule';               // string: MODULE
        self.debugOn = false;                               // boolean: debugOn
        self.dataObject = [                                 // json: data object
            {                                               // json: id 
                'id'                :    'id',              // string: id
                'type'              :    'noDisplay'        // string: display type: noDisplay
            },                                              // done json: id
            {                                               // json: description    
                'id'                :   'description',      // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'firstLetterCapital'  :   true,         // boolean: first letter is capital
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['description'] // string: label TRANSLATION: description
                    },                                      // done json: label
                    'emptyError'    :   true                // boolean empty error
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   '',                 // string: default value
                'errorFunction'     :   null,               // CALLBACK: error function
                'defaultFocus'      :   true,               // boolean: default focus
                'isDataHeaderText'  :   true                // boolean, is data header text
            },                                              // done json: description
            {                                               // json: longDescription
                'id'            :    'longDescription',     // string: id
                'type'          :    'textarea',            // string: display type: textarea
                'displayOptions'    :   {                   // json: display options
                    'label'             :   {               // json: label
                        'text'          :   sharesoft.translations['longDescription'] // string: label TRANSLATION: longDescription
                    }                                       // done json: label
                },                                          // done json: display options
                'value'                 :    '',            // string: value
                'defaultValue'          :    ''             // string: default value
            },                                              // done json: longDescription
            {                                               // json: projectId
                'id'                    :   'projectId',    // string: id
                'type'                  :   'select',       // string: display type: select
                'displayOptions'        :   {               // json: display options
                    'label'             :   {               // json: label
                        'text'          :   sharesoft.translations['project'] // string: label TRANSLATION: project
                    }                                       // done json: label
                },                                          // done json: display options
                'value'                 :   null,                       // integer: projectid
                'selectModule'          :   null,                       // select module: project select
                'selectNoRowsError'     :   'projectSelectNoRows',      // ERROR: projectSelectNoRows 
                'selectImageId'         :   'projects',                 // ERROR: projectSelectNoRows
                'selectOption'          :   'projectsLastSelection',    // SELECTOPTION: projectsLastSelection    
                'errorFunction'         :   null                        // function: errorFunction
            },                                              // done json: projectId
            {                                               // json: date
                'id'                    :   'date',         // string: id
                'type'                  :   'date',         // string: display type: date
                'displayOptions'        :   {               // json: display options
                    'label'             :   {               // json: label
                        'text'          :   sharesoft.translations['date'] // string: label TRANSLATION: date
                    }                                       // done json: label
                },                                          // done json: display options
                'optional'              :   false,          // boolean: optional
                'value'                 :   '',             // string: value    
                'defaultValue'          :   '',             // string: default value
                'changeCallback'        :    null           // function: changeCallback
            },                                              // done json: date
            {                                               // json: start time
                'id'                    :   'startTime',    // string: id
                'type'                  :   'text',         // string: display type: text
                'displayOptions'        :   {               // json: display options
                    'type'              :   'time',         // display: time
                    'label'             :   {               // json: label
                        'text'          :   sharesoft.translations['startTime'] // string: label TRANSLATION: startTime
                    }                                       // done json: label
                },                                          // done json: display options
                'value'                 :   '',             // string: value
                'defaultValue'          :    '0000',        // string: default value
                'errorFunction'         :   null            // function: errorFunction
            },                                              // done json: start time
            {                                               // json: end time
                'id'            :   'endTime',              // string: id
                'type'          :   'text',                 // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'type'              :   'time',         // display type: time
                    'label'             :   {               // json: label
                        'text'          :   sharesoft.translations['endTime'] // string: label TRANSLATION: endTime
                    }                                       // done json: label
                },                                          // done json: display options
                'value'         :   '',                     // string: value
                'defaultValue'  :    '0000',                // string: default value
                'errorFunction' :   null                    // function callback, error function
            },                                              // done json: end time
            {                                               // json: documents
                'id'                :   'documents',        // string: id
                'type'              :   'documents',        // string: display type: documents 
                'displayOptions'    :   {                   // json: display options
                    'label'             :   {               // json: label
                        'text'          :   sharesoft.translations['documents'] // string: label TRANSLATION: documents
                    }                                       // done json: label
                },                                          // done json: display options
                'selectModule'      :   null,               // module: select module
                'selectImageId'     :   'documents',        // SELECT IMAGE: documents
                'selectSubject'     :   'tasks',            // string: select subject
                'value'             :   ''                  // integer: documentId
            },                                              // done json: documents
            {                                               // json: used
                'id'            :   'used',                 // string: id
                'type'          :   'noDisplay',            // string: display type: noDisplay
                'value'         :   'false',                // string: dateTime
                'defaultValue'  :   'false'                 // string: default value
            },                                              // done json: used
            {                                               // json: updated
                'id'            :   'updated',              // string: id
                'type'          :   'noDisplay',            // string: display type: noDisplay
                'value'         :   '',                     // string: dateTime
                'defaultValue'  :   false                   // string: default value
           }                                                // done json: updated
        ];                                                  // done json: data object
        self.callerOptions = {                              // json: callerOptions 
            'callback'          :   null,                   // function: callback
            'updateCallback'    :   null,                   // function: updateCallback
            'reloadCallback'    :   null                    // function: reloadCallback
        };                                                  // done json: callerOptions 
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.setDefaultData = function(){
        // FUNCTION: setDefaultData( void ) void
            
            // counter
            var i = 0;
            
            // set dataObject default data
            $.each( self.dataObject, function( index, value ) {
                // which id
                switch( value['id'] ){
                    // case id
                    case 'id' : {
                        // unset id    
                        self.dataObject[i]['value'] = null;    
                        // done     
                        break;        
                    }
                    // case date
                    case 'date' : {
                        // set value = today    
                        self.dataObject[i]['value'] = jsProject.getTodayDbDate();    
                        // done
                        break;        
                    }
                    // case default
                    default : {
                        // set default value    
                        value['value'] = value['defaultValue'];
                    }
                }
                // done which id
                
                // counter +1
                i++;
            });
            // done set dataObject default data
            
        // DONE FUNCTION: setDefaultData( void ) void
        };
        self.getData = function( callback, id ){
        // FUNCTION: getData( callback, string: id ) void
            
            // debug info
            self.debug( 'getData id: ' + id );
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // get documents object from dataObject
            var documentsObject = jsProject.getJsonValue( self.dataObject, ['id=documents'] );            
            // set documents id
            documentsObject['value'] = id;
            
            // show busy screen
            sharesoft.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'tasks',
                'what'              :   'rowById',
                'selection'         :   id 
            };
            // done construct data object
             
            // AJAX: /sharesoft/read
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.getDataCallback );

        // DONE FUNCTION: getData( callback, string: id ) void
        };
        self.getDataCallback = function( result ){
        // FUNCTION: getDataCallback( json: result ) AJAX CALLBACK

            // check result
            if( self.hasCallbackErrors( result ) ){
                // hide busy screen
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check result
            
            // loop through result    
            $.each( result['data'], function( dataIndex, dataValue  ) {
                // loop through data object
                $.each( self.dataObject, function( objectIndex, objectValue ) {
                    // result id = data object id
                    if( dataIndex === objectValue['id'] ){
                        // set data object value 
                        objectValue['value'] = dataValue;
                    }
                    // done result id = data object id
                });
                // done loop through data object
            });
            // done loop through result    

            // hide busy screen
            sharesoft.endBusyProcess();
            
            // call the callback
            self.callerOptions['callback']();
            
        // DONE FUNCTION: getDataCallback( json: result ) AJAX CALLBACK
        };
        self.update = function( updateCallback, reloadCallback ){
        // FUNCTION: update( function: updateCallback, function: reloadCallback ) void

            // debug info
            self.debug( 'update' );
            
            // remember update callback
            self.callerOptions['updateCallback'] = updateCallback;
            // remember reload callback
            self.callerOptions['reloadCallback'] = reloadCallback;
            
            // show busy screen
            sharesoft.startBusyProcess();

            // unset data error
            jsProject.setValue( 'hasError', 'data', false );
            
            // set data from data edit controls to data object 
            jsProject.callEvent( 'editSetData' );
            
            // check data
            if( self.hasDataErrors() ){
                // hide busy screen
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check data
 
            // create values object
            var values = {};
            
            // create id 
            var id = 0;
            // get values from dataObject
            $.each( self.dataObject, function( index, value ) {
                // is id
                if( value['id'] === 'id' ){
                    // remember id
                    id = value['value'];
                }
                else {
                    // set value
                    values[value['id']] = value['value'];
                }
                // done is id
            });
            // done get values from dataObject

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'tasks',
                'what'              :   'rowById',
                'id'                :   id,
                'values'            :   values 
            };
            // done construct data object
             
            // AJAX: /sharesoft/update
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/update', sharesoft.token, data, self.updateCallback );

        // DONE FUNCTION: update( function: updateCallback, function: reloadCallback ) void
        };
        self.updateCallback = function( result ){
        // FUNCTION: updateCallback( json: result ) AJAX CALLBACK
            
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                // end busy
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors
            
            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );

            // result has updated value
            if( result['updated'] ){
                // get updated object from dataObject
                var updatedObject = jsProject.getJsonValue( self.dataObject, ['id=updated'] );            
                // set updated
                updatedObject['value'] = result['updated'];
            }
            // done result has updated value
            
            // result has used value
            if( result['used'] ){
                // get used object from dataObject
                var usedObject = jsProject.getJsonValue( self.dataObject, ['id=used'] );            
                // set used
                usedObject['value'] = result['used'];
            }
            // done result has used value
            
            // call update callback
            self.callerOptions['updateCallback']();
            
            // end busy
            sharesoft.endBusyProcess();
            
            // refresh project list
            jsProject.callEvent( 'refreshList', 'projects' );
            
        // DONE FUNCTION: updateCallback( json: result ) AJAX CALLBACK
        };
        self.insert = function( callback ){
        // FUNCTION: insert( function: callback ) void

            // debug info
            self.debug( 'insert' );
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            sharesoft.startBusyProcess();
            
            // unset data error
            jsProject.setValue( 'hasError', 'data', false );

            // set data from dataEdit controls to data object 
            jsProject.callEvent( 'editSetData' );

            // check data
            if( self.hasDataErrors() ){
                // hide busy screen
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check data
            
            // create values object
            var values = {};
            
            // set values from dataObject
            $.each( self.dataObject, function( index, value ) {
                // not id
                if( value['id'] !== 'id' ){
                    // set value
                    values[value['id']] = value['value'];
                }
                // done not id
            });
            // done set values from dataObject

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'tasks',
                'what'              :   'row',
                'values'            :   values 
            };  
            // done construct data object
             
            // AJAX: /sharesoft/insert
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/insert', sharesoft.token, data, self.insertCallback );
            
        // DONE FUNCTION: insert( function: callback ) void
        };
        self.insertCallback = function( result ){
        // FUNCTION: insertCallback( json: result ) AJAX CALLBACK
            
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                // end busy
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors

            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );
            
            // loop over dataObject
            $.each( self.dataObject, function( objectIndex, objectValue ) {
                // found id 
                if( objectValue['id'] === 'id' ){
                    // set id value
                    objectValue['value'] = result['id'];
                }
                // done found id
                
                // found updated
                if( objectValue['id'] === 'updated' && result['updated'] ){
                    // set updated value
                    objectValue['value'] = result['updated'];
                }
                // done found updated
                
                // found used 
                if( objectValue['id'] === 'used' && result['used'] ){
                    // set used value
                    objectValue['value'] = result['used'];
                }
                // done found used 
            });
            // done loop over dataObject

            // get documents object from dataObject
            var documentsObject = jsProject.getJsonValue( self.dataObject, ['id=documents'] );            
            // set id
            documentsObject['value'] = result['id'];

            // end busy
            sharesoft.endBusyProcess();

            // call update callback
            self.callerOptions['callback']( result['id'] );
            
        // DONE FUNCTION: insertCallback( json: result ) AJAX CALLBACK
        };
        self.hasDataErrors = function( ){
        // FUNCTION: hasDataErrors( void ) boolean
            
            // check data error
            if( jsProject.getValue( 'hasError', 'data' )  ){
                // done with error 
                return true;
            }
            // done check data error

            // get starttime from dataObject
            var startTime = jsProject.getJsonValue( self.dataObject, ['id=startTime', 'value'] );
            // get endtime from dataObject
            var endTime = jsProject.getJsonValue( self.dataObject, ['id=endTime', 'value'] );
            
            // start time = end time
            if( startTime === endTime ){
                // show error message startTimeIsEndTime
                jsProject.callEvent( 'showEditError', 'startTimeIsEndTime' );
                // done with error
                return true;
            }
            // done start time = end time

            // start time > end time
            if( startTime > endTime ){
                // show error message endTimeBeforeStartTime
                jsProject.callEvent( 'showEditError', 'endTimeBeforeStartTime' );
                // done with error
                return true;
            }
            // done start time > end time
            
            // done 
            return false;
            
        // DONE FUNCTION: hasDataErrors( void ) boolean
        };
        self.hasCallbackErrors = function( result ){
        // FUNCTION: hasCallbackErrors( json: result ) boolean

            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return true;
            }
            // done global check result
            
            // check errors
            if( result['error'] ){
                // debug info
                self.debug( result['error'] );
                
                // dataOutOfDate
                if( result['error'] === 'dataOutOfDate' ){
                    // show out of date dialog
                    sharesoft.showOutOfDateDialog( self.callerOptions['reloadCallback'] );
                    // done with error
                    return true;
                }
                // done dataOutOfDate
                
                // task start time invalid
                if( result['error'] === 'startTimeInvalid' ){
                    // get start time object from data object
                    var startTimeObject = jsProject.getJsonValue( self.dataObject, ['id=startTime'] );  
                    // get error with start time object errorfunction
                    sharesoft.getError( 'invalidTime', startTimeObject['errorFunction'] );
                }
                // done task start time invalid

                // task end time invalid
                if( result['error'] === 'endTimeInvalid' ){
                    // get end time object from data object
                    var endTimeObject = jsProject.getJsonValue( self.dataObject, ['id=endTime'] );  
                    // get error with end time object errorfunction
                    sharesoft.getError( 'invalidTime', endTimeObject['errorFunction'] );
                }
                // done task end time invalid
                
                // task time exists
                if( result['error'] === 'timeExists' ){
                    // get start time object from data object
                    var startTimeObject = jsProject.getJsonValue( self.dataObject, ['id=startTime'] );  
                    // get error with start time object errorfunction
                    sharesoft.getError( 'tasksTimeExists', startTimeObject['errorFunction'] );
                }
                // done task time exists

                // show data updated message
                jsProject.callEvent( 'showEditError', result['error'] );

                // done with error
                return true;
            }
            // done check errors
          
            // done 
            return false;
            
        // DONE FUNCTION: hasCallbackErrors( json: result ) boolean
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
            getDataObject : function(){
            // FUNCTION: getDataObject( void ) json 
                return self.dataObject;
            },
            setDefaultData : function(){
            // FUNCTION: setDefaultData( void ) void 
                self.setDefaultData();
            },
            getData : function( callback, id ){
            // FUNCTION: getData( function: callback, string: id ) void 
                self.getData( callback, id );
            },
            update : function( updateCallback, reloadCallback ){
            // FUNCTION: update( function: updateCallback, function: reloadCallback ) void 
                self.update( updateCallback, reloadCallback );
            },
            insert : function( callback ){
            // FUNCTION: insert( function: callback ) return void 
                self.insert( callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: taskDataObjectModule( void ) void
})( sharesoft );
// done create module function
