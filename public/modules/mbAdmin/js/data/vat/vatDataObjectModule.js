/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/vat/vatDataObjectModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module contains the structure of the dataObject for vat
 *      it defines the display of the data
 *      it handles getting, updating and inserting data
 *      it sets default data before insert
 *      it handles the data checks before updates and inserts
 *      it handles the callback errors
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

    // MODULE: vatDataObjectModule( void ) void 
    
    pleisterman.vatDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'vatDataObjectModule';            // string:  MODULE
        self.debugOn = false;                               // boolean: debug
        self.dataObject = [                                 // json: data object
            {                                               // json: id    
                'id'                :    'id',              // string: id
                'type'              :    'noDisplay'        // string: display type: noDisplay
            },                                              // done json: contactId, currently unused
            {                                               // json: description
                'id'                :   'description',      // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'firstLetterCapital'  :   true,         // boolean: first letter is capital
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['name'] // string: label TRANSLATION: name
                    },                                      // done json: label
                    'emptyError'    :   true                // boolean: empty error
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   '',                 // string: default value
                'errorFunction'     :   null,               // CALLBACK: error function
                'defaultFocus'      :   true,               // boolean: default focus
                'isDataHeaderText'  :   true                // boolean: is data header text
            },                                              // done json: description
            {                                               // json: long description
                'id'                :   'longDescription',  // string: id
                'type'              :   'textarea',         // string: display type: textarea
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['description'] // string: label TRANSLATION: description
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done long description
            {                                               // json: identification
                'id'                :   'identification',   // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['identification'] // string: label TRANSLATION: identification
                    },                                      // done json: label
                    'emptyError'    :   true,               // boolean: empty error
                    'input'         :   {                   // json: input
                        'styleWidth':   '12.0em'            // css style width
                    }                                       // done json: input
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done identification
            {                                               // json: percentage
                'id'            :   'percentage',           // string: id
                'type'          :   'text',                 // string: display type: text 
                'displayOptions'    :   {                   // json: display options
                    'type'              :   'percentage',   // display type: number
                    'label'             :   {               // json: label
                        'text'          :   pleisterman.translations['odometerStart'] // string: label TRANSLATION: odometerStart
                    },                                      // done json: label
                    'emptyError'    :   true,               // boolean empty error
                    'input'         :   {                   // json: input
                        'styleWidth'    :   '4.5em'         // css width
                    }                                       // done json: input
                },                                          // done json: display options
                'value'         :   '',                     // string: value
                'defaultValue'  :    '0',                   // string: default value
                'errorFunction' :   null                    // function callback, error function
            },                                              // done json: percentage
            {                                               // json: opened
                'id'                :   'opened',           // string: id
                'type'              :   'date',             // string: display type: date
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['opened'] // string: label TRANSLATION: opened
                    }                                       // done json: label
                },                                          // done json: display options
                'optional'          :   false,              // boolean: optional
                'value'             :   ''                  // string: date 
            },                                              // done json: opened
            {                                               // json: closed
                'id'                :   'closed',           // string: id
                'type'              :   'date',             // string: display type: date
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['closed'] // string: label TRANSLATION: closed
                    },                                      // done json: label
                    'optional'          :   true            // boolean: optional
                },                                          // done json: display options
                'errorFunction'     :   null,               // function: errorFunction
                'value'             :   '',                 // string: value
                'defaultValue'      :   'false'             // string: default value    
            },                                              // done json: closed
            {                                               // json: documents
                'id'                :   'documents',        // string: id
                'type'              :   'documents',        // string: display type: documents
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['documents'] // string: label TRANSLATION: documents
                    }                                       // done json: label
                },                                          // done json: display options
                'selectModule'      :   null,               // module: select module
                'selectImageId'     :   'documents',        // SELECT IMAGE: documents
                'selectSubject'     :   'projects',         // string: select subject
                'value'             :   ''                  // integer: documentId
            },                                              // done json: documents
            {                                               // json: used
                'id'              : 'used',                 // string: id
                'type'            : 'noDisplay',            // string: display type: noDisplay 
                'value'           : '',                     // string: dateTime
                'defaultValue'    : false                   // string: default value
            },                                              // done json: used
            {                                               // json: updated
                'id'              : 'updated',              // string: id
                'type'            : 'noDisplay',            // string: display type: noDisplay 
                'value'           : '',                     // string: dateTime
                'defaultValue'    : false                   // string: default value
            }                                               // done json: updated
        ];                                                  // done json:data object
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
        // FUNCTION setDefaultData( void ) void
        
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
                    // case opened
                    case 'opened' : {
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
            // set id
            documentsObject['value'] = id;
            
            // show busy screen
            pleisterman.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'vat',
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
                    // result id = data object id
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
            
            // reset data error
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
            
            // create id 
            var id = 0;
            // set values from dataObject
            $.each( self.dataObject, function( index, value ) {
                // not id and not projectContacts
                if( value['id'] !== 'id' && value['id'] !== 'vatProjects' ){
                    // set value
                    values[value['id']] = value['value'];
                }
                // done not id and not contactProjects
                
                // id
                if( value['id'] === 'id' ){
                    // remember id
                    id = value['value'];
                }
                // done id
            });
            // done set values from dataObject

            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'vat',
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
                // not id and not project contacts
                if( value['id'] !== 'id' && value['id'] !== 'vatProjects' ){
                    // set value
                    values[value['id']] = value['value'];
                }
                // done not id and not project contacts
            });
            // done set values from dataObject

            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'vat',
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
                    // done with out of date
                    return true;
                }
                // done dataOutOfDate

                // vat name empty
                if( result['error'] === 'nameEmpty' ){
                    // get name object from data object
                    var nameObject = jsProject.getJsonValue( self.dataObject, ['id=name'] );  
                    // get error with name object errorfunction
                    pleisterman.getError( 'nameEmpty', nameObject['errorFunction'] );
                    // done with error
                    return true;
                }
                // done vat name empty

                // closed before opened
                if( result['error'] === 'ClosedBeforeOpened' ){
                    // get closed object from data object
                    var closedObject = jsProject.getJsonValue( self.dataObject, ['id=closed'] );  
                    // get error with closed object errorfunction
                    pleisterman.getError( 'ClosedBeforeOpened', closedObject['errorFunction'] );                                   
                }
                // done closed before opened
                 
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
                self.setDefaultData( );
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
    // DONE MODULE: vatDataObjectModule( void ) void 
})( pleisterman );
// done create module function
