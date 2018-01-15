/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/costs/costDataObjectModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module contains the structure of the dataObject for costs
 *      it defines the display of the data
 *      it handles getting, updating and inserting data
 *      it sets default data before insert
 *      it handles the data checks before updates and inserts
 *      it handles the callback errors
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

    // MODULE: costDataObjectModule( void ) void
    
    pleisterman.costDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'costDataObjectModule';               // string: MODULE
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
                        'text'          :   pleisterman.translations['description'] // string: label TRANSLATION: description
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
                        'text'          :   pleisterman.translations['longDescription'] // string: label TRANSLATION: longDescription
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
                        'text'          :   pleisterman.translations['project'] // string: label TRANSLATION: project
                    }                                       // done json: label
                },                                          // done json: display options
                'value'                 :   null,                       // integer: projectid
                'selectModule'          :   null,                       // select module: project select
                'selectNoRowsError'     :   'projectSelectNoRows',      // ERROR: projectSelectNoRows 
                'selectImageId'         :   'projects',                 // ERROR: projectSelectNoRows
                'selectOption'          :   'projectsLastSelection',    // SELECTOPTION: projectsLastSelection    
                'errorFunction'         :   null                        // function: errorFunction
            },                                              // done json: longDescription
            {                                               // json: vatId
                'id'                    :   'vatId',        // string: id
                'type'                  :   'select',       // string: display type: select
                'displayOptions'        :   {               // json: display options
                    'label'             :   {               // json: label
                        'text'          :   pleisterman.translations['vat'] // string: label TRANSLATION: vat
                    }                                       // done json: label
                },                                          // done json: display options
                'value'                 :   null,                       // integer: vatId
                'selectModule'          :   null,                       // select module: vat select
                'selectNoRowsError'     :   'vatSelectNoRows',          // ERROR: vatSelectNoRows 
                'selectImageId'         :   'vat',                      // ERROR: vatSelectNoRows
                'selectOption'          :   'vatLastSelection',         // SELECTOPTION: vatLastSelection    
                'errorFunction'         :   null                        // function: errorFunction
            },                                              // done json: vatId
            {                                               // json: date
                'id'                    :   'date',         // string: id
                'type'                  :   'date',         // string: display type: date
                'displayOptions'        :   {               // json: display options
                    'label'             :   {               // json: label
                        'text'          :   pleisterman.translations['date'] // string: label TRANSLATION: date
                    }                                       // done json: label
                },                                          // done json: display options
                'optional'              :   false,          // boolean: optional
                'value'                 :   '',             // string: value    
                'defaultValue'          :   '',             // string: default value
                'changeCallback'        :    null           // function: changeCallback
            },                                              // done json: date
            {                                               // json: price
                'id'            :   'price',                // string: id
                'type'          :   'text',                 // string: display type: text 
                'displayOptions'    :   {                   // json: display options
                    'type'              :   'price',        // display type: number
                    'label'             :   {               // json: label
                        'text'          :   pleisterman.translations['price'] // string: label TRANSLATION: odometerStart
                    },                                      // done json: label
                    'emptyError'    :   true                // boolean empty error
                },                                          // done json: display options
                'value'         :   '',                     // string: value
                'defaultValue'  :    '0',                   // string: default value
                'errorFunction' :   null                    // function callback, error function
            },                                              // done json: price
            {                                               // json: documents
                'id'                :   'documents',        // string: id
                'type'              :   'documents',        // string: display type: documents 
                'displayOptions'    :   {                   // json: display options
                    'label'             :   {               // json: label
                        'text'          :   pleisterman.translations['documents'] // string: label TRANSLATION: documents
                    }                                       // done json: label
                },                                          // done json: display options
                'selectModule'      :   null,               // module: select module
                'selectImageId'     :   'documents',        // SELECT IMAGE: documents
                'selectSubject'     :   'costs',            // string: select subject
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
            pleisterman.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'costs',
                'what'              :   'rowById',
                'selection'         :   id 
            };
            // done construct data object
             
            // AJAX: /pleisterman/read
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.getDataCallback );

        // DONE FUNCTION: getData( callback, string: id ) void
        };
        self.getDataCallback = function( result ){
        // FUNCTION: getDataCallback( json: result ) AJAX CALLBACK

            // check result
            if( self.hasCallbackErrors( result ) ){
                // hide busy screen
                pleisterman.endBusyProcess();
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
            pleisterman.endBusyProcess();
            
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
            pleisterman.startBusyProcess();

            // unset data error
            jsProject.setValue( 'hasError', 'data', false );
            
            // set data from data edit controls to data object 
            jsProject.callEvent( 'editSetData' );
            
            // check data
            if( self.hasDataErrors() ){
                // hide busy screen
                pleisterman.endBusyProcess();
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
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'costs',
                'what'              :   'rowById',
                'id'                :   id,
                'values'            :   values 
            };
            // done construct data object
             
            // AJAX: /pleisterman/update
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.updateCallback );

        // DONE FUNCTION: update( function: updateCallback, function: reloadCallback ) void
        };
        self.updateCallback = function( result ){
        // FUNCTION: updateCallback( json: result ) AJAX CALLBACK
            
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                // end busy
                pleisterman.endBusyProcess();
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
            pleisterman.endBusyProcess();
            
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
            pleisterman.startBusyProcess();
            
            // unset data error
            jsProject.setValue( 'hasError', 'data', false );

            // set data from dataEdit controls to data object 
            jsProject.callEvent( 'editSetData' );

            // check data
            if( self.hasDataErrors() ){
                // hide busy screen
                pleisterman.endBusyProcess();
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
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'costs',
                'what'              :   'row',
                'values'            :   values 
            };  
            // done construct data object
             
            // AJAX: /pleisterman/insert
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/insert', pleisterman.token, data, self.insertCallback );
            
        // DONE FUNCTION: insert( function: callback ) void
        };
        self.insertCallback = function( result ){
        // FUNCTION: insertCallback( json: result ) AJAX CALLBACK
            
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                // end busy
                pleisterman.endBusyProcess();
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
            pleisterman.endBusyProcess();

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

            // done 
            return false;
            
        // DONE FUNCTION: hasDataErrors( void ) boolean
        };
        self.hasCallbackErrors = function( result ){
        // FUNCTION: hasCallbackErrors( json: result ) boolean

            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
            // check errors
            if( result['error'] ){
                // debug info
                self.debug( result['error'] );
                
                // dataOutOfDate
                if( result['error'] === 'dataOutOfDate' ){
                    // show out of date dialog
                    pleisterman.showOutOfDateDialog( self.callerOptions['reloadCallback'] );
                    // done with error
                    return true;
                }
                // done dataOutOfDate
                
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
    // DONE MODULE: costDataObjectModule( void ) void
})( pleisterman );
// done create module function
