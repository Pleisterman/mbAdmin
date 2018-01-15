/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/contacts/contactDataObjectModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module contains the structure of the dataObject for contacts
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

    // MODULE: contactDataObjectModule( void ) void 
    
    sharesoft.contactDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'contactDataObjectModule';            // string:  MODULE
        self.debugOn = false;                               // boolean: debug
        self.dataObject = [                                 // json: data object
            {                                               // json: id 
                'id'                :    'id',              // string: id
                'type'              :    'noDisplay'        // string: display type: noDisplay
            },                                              // done json: id
            {                                               // json: name    
                'id'                :   'name',             // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'firstLetterCapital'  :   true,         // boolean: first letter is capital
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['name'] // string: label TRANSLATION: name
                    },                                      // done json: label
                    'emptyError'    :   true                // boolean: empty error
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   '',                 // string: default value
                'errorFunction'     :   null,               // CALLBACK: error function
                'defaultFocus'      :   true,               // boolean: default focus
                'isDataHeaderText'  :   true                // boolean: is data header text
            },                                              // done json: name
            {                                               // json: companyName
                'id'                :   'companyName',      // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'firstLetterCapital'  :   true,         // boolean: first letter is capital
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['companyName'] // string: label TRANSLATION: companyName
                    },                                      // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   '',                 // string: default value
            },                                              // done json: companyName
            {                                               // json: description
                'id'                :   'description',      // string: id
                'type'              :   'textarea',         // string: display type: textarea
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['description'] // string: label TRANSLATION: description
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: description
            {                                               // json: contactProjects
                'id'                :   'contactProjects',  // string: id
                'type'              :   'linkList',         // string: display type: linkList
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['contactProjects'] // string: label TRANSLATION: contactProjects
                    }                                       // done json: label
                }                                           // done json: display options
            },                                              // done json: contactProjects
            {                                               // json: email
                'id'                :   'email',            // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'type'          :   'email',            // text type: email
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['email'] // string: label TRANSLATION: email
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: email
            {                                               // json: address
                'id'                :   'address',          // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['address'] // string: label TRANSLATION: address
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: address
            {                                               // json: zipCode
                'id'                :   'zipCode',          // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['zipCode'] // string: label TRANSLATION: zipCode
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value    
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: zipCode
            {                                               // json: place
                'id'                :   'place',            // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['place']  // string: label TRANSLATION: place
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value 
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: place
            {                                               // json: country
                'id'                :   'country',          // string: id
                'type'              :   'text',             /// string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['country'] // string: label TRANSLATION: country
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   '',                 // string: value 
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: country
            {                                               // json: telephone1
                'id'                :   'telephone1',       // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['telephone1'] // string: label TRANSLATION: telephone1
                    },                                      // done json: label
                    'input'         :   {                   // json: input
                        'styleWidth':   '12.0em'            // css size: style width 
                    }                                       // done json: input
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: telephone1
            {                                               // json: telephone2
                'id'                :   'telephone2',       // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['telephone2'] // string: label TRANSLATION: telephone2
                    },                                      // done json: label
                    'input'         :   {                   // json: input
                        'styleWidth':   '12.0em'            // css size: style width 
                    }                                       // done json: input
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: telephone2
            {                                               // json: mobile
                'id'                :   'mobile',           // string: id
                'type'              :   'text',             // string: display type: text
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['mobile'] // string: label TRANSLATION: mobile
                    },                                      // done json: label
                    'input'         :   {                   // json: input
                        'styleWidth':   '12.0em'            // css size: style width 
                    }                                       // done json: input
                },                                          // done json: display options
                'value'             :   '',                 // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: mobile
            {                                               // json: isCustomer
                'id'                :   'isCustomer',       // string: id
                'type'              :   'checkbox',         // string: display type: checkbox
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['isCustomer'] // string: label TRANSLATION: isCustomer
                    }                                       // done json: label
                },                                          // done json: display options
                'value'             :   false,              // string: value
                'defaultValue'      :   ''                  // string: default value
            },                                              // done json: isCustomer
            {                                               // json: opened
                'id'                :   'opened',           // string: id
                'type'              :   'date',             // string: display type: date
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['opened'] // string: label TRANSLATION: opened
                    }                                       // done json: label
                },                                          // done json: display options
                'optional'          :   false,              // boolean: optional
                'value'             :   ''                  // string: value
            },                                              // done json: opened
            {                                               // json: closed
                'id'                :   'closed',           // string: id
                'type'              :   'date',             // string: display type: date
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   sharesoft.translations['closed'] // string: label TRANSLATION: closed
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
                        'text'          :   sharesoft.translations['documents'] // string: label TRANSLATION: documents
                    }                                       // done json: label
                },                                          // done json: display options
                'selectModule'      :   null,               // module: select module
                'selectImageId'     :   'documents',        // SELECT IMAGE: documents
                'selectSubject'     :   'contacts',         // string: select subject
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
            // set documents id
            documentsObject['value'] = id;

            // show busy screen
            sharesoft.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'    :   sharesoft.workDirectory,
                'subject'          :   'contacts',
                'what'             :   'rowById',
                'selection'        :   id 
            };
            // done construct data object
             
            // AJAX: /sharesoft/read
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.getDataCallback );

        // DONE FUNCTION: getData( callback, string: id ) void
        };
        self.getDataCallback = function( result ){
        // FUNCTION: getDataCallback( json: result ) ajax callback json
            
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
                    // result id = data object id
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
            
            // reset data error
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
            
            // create id 
            var id = 0;
            // set values from dataObject
            $.each( self.dataObject, function( index, value ) {
                // not id and not contactProjects
                if( value['id'] !== 'id' && value['id'] !== 'contactProjects' ){
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
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'contacts',
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
                // not id and not contact projects
                if( value['id'] !== 'id' && value['id'] !== 'contactProjects' ){
                    // set value
                    values[value['id']] = value['value'];
                }
                // done not id and not contact projects
            });
            // done set values from dataObject

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'contacts',
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
            
            // done 
            return false;

        // DONE FUNCTION: hasDataErrors( void ) boolean
        };
        self.hasCallbackErrors = function( result ){
        // FUNCTION: hasCallbackErrors( json: result ) boolean
            
            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
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
                    sharesoft.showOutOfDateDialog( self.callerOptions['reloadCallback'] );
                    // done with out of date
                    return true;
                }
                // done dataOutOfDate

                // contact name empty
                if( result['error'] === 'nameEmpty' ){
                    // get name object from data object
                    var nameObject = jsProject.getJsonValue( self.dataObject, ['id=name'] );  
                    // get error with name object errorfunction
                    sharesoft.getError( 'nameEmpty', nameObject['errorFunction'] );
                    // done with error
                    return true;
                }
                // done contact name empty

                // contact name exists
                if( result['error'] === 'nameExists' ){
                    // get name object from data object
                    var nameObject = jsProject.getJsonValue( self.dataObject, ['id=name'] );  
                    // get error with name object errorfunction
                    sharesoft.getError( 'nameExists', nameObject['errorFunction'] );                    
                    // done with error
                    return true;
                }
                // done contact name exists
                
                 // closed before opened
                if( result['error'] === 'ClosedBeforeOpened' ){
                    // get closed object from data object
                    var closedObject = jsProject.getJsonValue( self.dataObject, ['id=closed'] );  
                    // get error with closed object errorfunction
                    sharesoft.getError( 'ClosedBeforeOpened', closedObject['errorFunction'] );                                   
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
            // FUNCTION: getDataObject( void ) json 
            getDataObject : function(){
                // return dataObject
                return self.dataObject;
            },
            // FUNCTION: setDefaultData( void ) void 
            setDefaultData : function(){
                // call internal
                self.setDefaultData( );
            },
            // FUNCTION: getData( function: callback, string: id ) void 
            getData : function( callback, id ){
                // call internal
                self.getData( callback, id );
            },
            // FUNCTION: update( function: updateCallback, function: reloadCallback ) void 
            update : function( updateCallback, reloadCallback ){
                // call internal
                self.update( updateCallback, reloadCallback );
            },
            // FUNCTION: insert( function: callback ) return void 
            insert : function( callback ){
                // call internal
                self.insert( callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: contactDataObjectModule( void ) void 
})( sharesoft );
// done create module function
