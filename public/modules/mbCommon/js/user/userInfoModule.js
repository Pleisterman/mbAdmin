/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/user/userInfoModule.js
 *  
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *      this module controls the user info
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( sharesoft ){

        // MODULE: userInfoModule( string: menuButtonId ) void

    sharesoft.userInfoModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'userInfoModule';                             // string: MODULE
        self.debugOn = false;                                       // boolean: debug
        self.id = 'userInfo';                                       // string: id
        self.dataObject = [                                         // json: dataObject
            {                                                       // json: name
                'id'                :   'name',                     // string: id
                'type'              :   'text',                     // string: type
                'displayOptions'    :   {                           // json: display options
                    'label'         :   {                           // json: label
                        'text'          :   sharesoft.translations['name'] // string: text
                    },                                              // done json: label
                    'emptyError'    :   true,                       // boolean: empty error
                },                                                  // done json: display options
                'value'             :   '',                         // string: value
                'defaultValue'      :   '',                         // string: default value
                'errorFunction'     :   null,                       // function: errorFunction
                'defaultFocus'      :   true,                       // boolean: default focus
                'minimumLength'     :   3                           // integer: minimumLength
           },                                                       // done json: name
           // loginName
            {  
                'id'                :   'loginName',
                'type'              :   'text',
                'displayOptions'    :   {
                    'label'         :   {
                        'text'          :   sharesoft.translations['loginName']
                    },
                    'emptyError'    :   true,
                    'input'         :   {
                        'widthInLetters':   '25'
                    }
                },
                'value'             :   '',
                'defaultValue'      :   '',
                'errorFunction'     :   null,
                'minimumLength'     :   10
           },
           // email
            {  
                'id'                :   'email',
                'type'              :   'text',
                'displayOptions'    :   {
                    'type'          :   'email',
                    'label'         :   {
                        'text'          :   sharesoft.translations['email']
                    },
                    'emptyError'    :   true,
                    'input'         :   {
                        'widthInLetters':   '25'
                    }
                },
                'value'             :   '',
                'defaultValue'      :   '',
                'errorFunction'     :   null
           }
        ];
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add open initial selection
            jsProject.subscribeToEvent( 'openInitialSelection', self.openInitialSelection );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void
            
            // open subject = userinfo
            if( sharesoft.options['openSubject']['value'] === 'userInfo' ){
                // show data
                self.getData(); 
            }
            // done open subject = userinfo
            
        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.prepareShow = function() {
        // FUNCTION: prepareShow( void ) void
            
            // debug info
            self.debug( 'prepareShow' );  
            
            // check data changed
            if( jsProject.getValue( 'changed', 'data' ) ){
                // debug info
                self.debug( 'dataChanged' );
                
                // create message options
                var options = {
                    'isYesNo' : true,
                    'okCallback' : self.getData,
                    'okCallbackParameters' : null
                };
                // create message options
                
                // show the message
                sharesoft.showMessage( 'dataChanged', options );
            }
            // done check data changed
            else {
                // data unchanged
                self.getData( );
            }
            // done check data changed
        };
        self.getData = function( ){
        // FUNCTION: construct( void ) void
            
            // cancel events
            jsProject.callEvent( 'cancel' );
            
            // remember open subject
            sharesoft.setOption( 'openSubject', self.id );

            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'authentification',
                'what'              :   'userInfo'
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, data, self.show );
            
        };
        self.show = function( result ){
        // FUNCTION: construct( void ) void
            
            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                sharesoft.endBusyProcess();
                return;
            }
            // done check critical errors
            
            // find id object in result    
            var id = '';
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
            
            // set data values
            jsProject.setValue( 'changed', 'data', false );    
            jsProject.setValue( 'dataObject', 'data', self.dataObject );    
            jsProject.setValue( 'id', 'data', self.id );    
            // set data values
            
            // subscribe to events
            jsProject.subscribeToEvent( 'update', self.update );
            jsProject.subscribeToEvent( 'cancel', self.cancelEdit );
            // done subscribe to events
            
            // call the edit event
            jsProject.callEvent( 'editOpen' );
            
        };
        self.update = function( ){
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'update' );

            // show busy screen
            sharesoft.startBusyProcess();

            // reset data error
            jsProject.setValue( 'hasError', 'data', false );

            // set data from dataEdit controls to data object 
            jsProject.callEvent( 'editSetData' );
            
            // check data error
            if( jsProject.getValue( 'hasError', 'data' )  ){
                // end busy
                sharesoft.endBusyProcess();
                // done with error 
                return;
            }
            // done check data error
            
            // check values
            if( !self.checkValues() ){
                // end busy
                sharesoft.endBusyProcess();
                // done with error 
                return;
            }
            // done check values
            
            // create values object
            var values = {
            };

            // set values from dataObject
            $.each( self.dataObject, function( index, value ) {
                // set value
                values[value['id']] = value['value'];
            });
            // done set values from dataObject
            
            // construct data object
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'authentification',
                'what'              :   'userInfo',
                'values'            :   values 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/update', sharesoft.token, data, self.updateCallback );
            
        };
        self.updateCallback = function( result ){
        // FUNCTION: construct( void ) void
            
            // check for errors
            if( self.hasErrors( result ) ){
                // end busy
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors
            
            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );
            
            // set data !changed 
            jsProject.setValue( 'changed', 'data', false );    

            // get name value
            var userName = '';
            $.each( self.dataObject, function( index, value ) {
                if( value['id'] === 'name' ){
                    userName = value['value'];
                }
            });
            // get name value
            
            // call user name change
            jsProject.callEvent( 'userNameChange', userName );
            
            // end busy
            sharesoft.endBusyProcess();

            // call after update
            jsProject.callEvent( 'afterUpdate' );
            
        };
        self.checkValues = function( ){
            var hasError = false;
            
            // loop over data
            $.each( self.dataObject, function( index, value ) {
                if( value['id'] === 'name' ){
                    if( value['value'].length < value['minimumLength'] ){
                        sharesoft.getError( 'textToShort', self.showNameLengthError );
                        hasError = true;
                    }
                }
                if( value['id'] === 'loginName' ){
                    if( value['value'].length < value['minimumLength'] ){
                        sharesoft.getError( 'textToShort', self.showLoginNameLengthError );
                        hasError = true;
                    }
                }
            });
            // loop over data
            
            return !hasError;
        };
        self.showNameLengthError = function( text ){
            // loop over data
            $.each( self.dataObject, function( index, value ) {
                if( value['id'] === 'name' ){
                    if( value['value'].length < value['minimumLength'] ){
                        text = text.replace( "%s", value['minimumLength'] );
                        value['errorFunction']( text );
                        
                    }
                }
            });
            // loop over data
        };
        self.showLoginNameLengthError = function( text ){
            // loop over data
            $.each( self.dataObject, function( index, value ) {
                if( value['id'] === 'loginName' ){
                    if( value['value'].length < value['minimumLength'] ){
                        text = text.replace( "%s", value['minimumLength'] );
                        value['errorFunction']( text );
                        
                    }
                }
            });
            // loop over data
        };
        self.hasErrors = function( result ){
            // check critical errors
            if( result['criticalError'] ){
                sharesoft.showCriticalError( result['criticalError'] );
                return true;
            }
            // done check critical errors
            // check errors
            if( result['error'] ){
                self.debug( result['error'] );
                
                // name empty
                if( result['error'] === 'nameEmpty' ){
                    $.each( self.dataObject, function( index, value ) {
                        if( value['id'] === 'name' ){
                            sharesoft.getError( 'nameEmpty', value['errorFunction'] );
                        }
                    });
                }
                // done name empty

                 
                // show data updated message
                jsProject.callEvent( 'showEditError', result['error'] );
                 
                 
                // done with error
                return true;
            }
            // done check errors
          
            return false;
        };
        self.cancelEdit = function(){
            // debug info
            self.debug( 'cancelEdit ' );
            // remove update event subscription
            jsProject.unSubscribeFromEvent( 'update', self.update );
            // remove cancel event subscription
            jsProject.unSubscribeFromEvent( 'cancel', self.cancelEdit );

            // reset data id
            jsProject.setValue( 'id', 'data', null );    
            // reset data object
            jsProject.setValue( 'dataObject', 'data', null );    
            // reset data changed
            jsProject.setValue( 'changed', 'data', false );
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
            // FUNCTION: show( void ) void
            show : function(){
                // call internal prepare show
                self.prepareShow();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: userInfoModule( void ) void 
})( sharesoft );
// done create module function
