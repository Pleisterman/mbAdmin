/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/documents/documentDataObjectModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module contains the structure of the dataObject for documents
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

    // MODULE: contactDataObjectModule( void ) void 
    
    pleisterman.documentDataObjectModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'documentDataObjectModule';           // string:  MODULE
        self.debugOn = false;                               // boolean: debug
        self.dataObject = [                                 // json: data object
            {                                               // json: id
                'id'                :   'id',               // string: id
                'type'              :   'noDisplay'         // string: display type: noDisplay
            },                                              // done json: id
            {                                               // json: name
                'id'                :   'name',             // string: id
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
            },                                              // done json: name
            {                                               // json: description
                'id'                :   'subject',          // string: id
                'type'              :   'noDisplay',        // string: display type: noDisplay
                'value'             :   ''                  // string: value
            },                                              // done json: headerContacts
            {                                               // json: description
                'id'                :   'subjectId',        // string: id
                'type'              :   'noDisplay',        // string: display type: noDisplay
                'value'             :   ''                  // string: value
            },                                              // done json: headerContacts
            {                                               // json: description
                'id'                :   'fileName',         // string: id
                'type'              :   'noDisplay',        // string: display type: noDisplay
                'value'             :   ''                  // string: value
            },                                              // done json: headerContacts
            {                                               // json: description
                'id'                :   'originalFileName', // string: id
                'type'              :   'noDisplay',        // string: display type: noDisplay
                'value'             :   ''                  // string: value
            },                                              // done json: headerContacts
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
        ];                                                  // done json: data object
        self.callerOptions = {                              // json: callerOptions 
            'callback'          :   null                    // function: callback
        };                                                  // done json: callerOptions 
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

        // DONE FUNCTION: construct( void ) void
        };
        self.getData = function( callback, id ){
        // FUNCTION: getData( function: callback, string: id ) void

            // debug info
            self.debug( 'getData id: ' + id );
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            pleisterman.startBusyProcess();

            // construct data object
            var data = { 
                'workDirectory'    :   pleisterman.workDirectory,
                'subject'           :   'documents',
                'what'              :   'rowById',
                'selection'         :   id };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.getDataCallback );

        // DONE FUNCTION: getData( function: callback, string: id ) void
        };
        self.getDataCallback = function( result ){
        // FUNCTION: getDataCallback( json: result ) void

            // check critical errors
            if( result['criticalError'] ){
                pleisterman.showCriticalError( result['criticalError'] );
                pleisterman.endBusyProcess();
                return;
            }
            // done check critical errors

            if( result['idNotFound'] ){
                self.debug( 'id not found' );
                pleisterman.endBusyProcess();
                return;
            }
            
            // find id object in result    
            $.each( result['data'], function( dataIndex, dataValue  ) {
                // find id object in data object
                $.each( self.dataObject, function( objectIndex, objectValue ) {
                    // id object found
                    if( dataIndex === objectValue['id'] ){
                        // set data objet id value 
                        objectValue['value'] = dataValue;
                    }
                    // done id object found
                });
                // done find id object in data object
            });
            // done find id object in result   

            // hide busy screen
            pleisterman.endBusyProcess();
            
            // call the callback
            self.callerOptions['callback']( );

        // DONE FUNCTION: getDataCallback( json: result  ) void
        };
        self.updateName = function( name, callback ){
        // FUNCTION: updateName( string: name, function: callback ) void

            // debug info
            self.debug( 'updateName' );
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            pleisterman.startBusyProcess();
            
            // create values object
            var values = {
                'name'      :   name
            };
            // done create values object
            
            var id = 0;
            // set values from dataObject
            $.each( self.dataObject, function( index, value ) {
                if( value['id'] ){
                    if( value['id'] === 'id' ){
                        // set id
                        id = value['value'];
                    }
                    if( value['id'] !== 'name' ){
                        // set id
                        values[value['id']] = value['value'];
                    }
                }
            });
            // done set values from dataObject


            // construct data object
            var data = { 
                'workDirectory'    :   pleisterman.workDirectory,
                'subject'           :   'documents',
                'what'              :   'name',
                'id'                :   id,
                'values'            :   values 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.updateNameCallback );

        // DONE FUNCTION: updateName( string: name, function: callback ) void
        };
        self.updateNameCallback = function( result ){
        // FUNCTION: updateNameCallback( json: result ) void

            // check for errors
            if( !self.hasResultErrors( result ) ){
                // set dataObject values 
                $.each( self.dataObject, function( objectIndex, objectValue ) {
                    if( objectValue['id'] === 'updated' && result['updated'] ){
                        objectValue['value'] = result['updated'];
                    }
                    // found used 
                    if( objectValue['id'] === 'used' && result['used'] ){
                        // update updated value
                        objectValue['value'] = result['used'];
                    }
                    // done found used 
                });
                // done set dataObject values 

            }
            // done check for errors

            // end busy
            pleisterman.endBusyProcess();

            // call update callback
            self.callerOptions['callback']( result );

        // DONE FUNCTION: updateNameCallback( json: result ) void
        };
        self.insert = function( callback ){
        // FUNCTION: insert( function: callback ) void

            // debug info
            self.debug( 'insert' );
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            pleisterman.startBusyProcess();
            
            // create values object
            var values = {
            };
            
            // set values from dataObject
            $.each( self.dataObject, function( index, value ) {
                if( value['id'] !== 'id' ){
                    // set value
                    values[value['id']] = value['value'];
                }
            });
            // done set values from dataObject

            // construct data object
            var data = { 
                'workDirectory'    :   pleisterman.workDirectory,
                'subject'           :   'documents',
                'what'              :   'row',
                'values'            :   values 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/insert', pleisterman.token, data, self.insertCallback );

        // DONE FUNCTION: insert( function: callback ) void
        };
        self.insertCallback = function( result ){
        // FUNCTION: insertCallback( json: result ) void

            // check for errors
            if( !self.hasResultErrors( result ) ){
                // set dataObject values 
                var id = result['id'];
                $.each( self.dataObject, function( objectIndex, objectValue ) {
                    if( objectValue['id'] === 'id' ){
                        objectValue['value'] = id;
                    }
                    if( objectValue['id'] === 'updated' && result['updated'] ){
                        objectValue['value'] = result['updated'];
                    }
                    // found used 
                    if( objectValue['id'] === 'used' && result['used'] ){
                        // update updated value
                        objectValue['value'] = result['used'];
                    }
                    // done found used 
                });
                // done set dataObject values 

            }
            // done check for errors

            // end busy
            pleisterman.endBusyProcess();

            // call update callback
            self.callerOptions['callback']( result );

        // DONE FUNCTION: insertCallback( json: result ) void
        };
        self.hasResultErrors = function( result ){
        // FUNCTION: hasResultErrors( json: result ) void

            // check critical errors
            if( result['criticalError'] || result['error'] ){
                // done with error
                return true;
            }
            // done check errors
          
            // done no error
            return false;

        // DONE FUNCTION: hasResultErrors( json: result ) void
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
                self.setDefaultData();
            },
            // FUNCTION: getData( function: callback, string: id ) void 
            getData : function( callback, id ){
                // call internal
                self.getData( callback, id );
            },
            // FUNCTION: updateName( string: name, function: callback ) void 
            updateName : function( name, callback ){
                // call internal
                self.updateName( name, callback );
            },
            // FUNCTION: insert( function: callback ) return void 
            insert : function( callback ){
                // call internal
                self.insert( callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: documentDataObjectModule( void ) void 
})( pleisterman );
// done create module function
