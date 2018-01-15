/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/user/passwordModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *       this module controls the user password
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: passwordModule( void ) void 
    
    pleisterman.passwordModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'passwordModule';                         // string:  MODULE
        self.debugOn = true;                                       // boolean: debug on
        self.id = 'userPassword';                                   // string: id
        self.dataObject = [                                         // json: dataObject
            {                                                       // json: password
                'id'                :   'password',                 // string: id
                'type'              :   'text',                     // string: type
                'displayOptions'    :   {                           // json: display options
                    'label'         :   {                           // json: label
                        'text'          :   pleisterman.translations['passwordNew'] // string: text
                    },                                              // done json: label
                    'emptyError'    :   true,                       // boolean: empty error
                    'type'              :   'password'              // string: type
                },                                                  // done json: display options
                'value'             :   '',                         // string: value
                'getInputIdFunction':   null,                       // function: get input id
                'defaultFocus'      :   true,                       // boolean: default focus
                'changeCallback'    :   null,                       // function: change callback
                'errorFunction'     :   null                        // function: error function
            },                                                      // done json: password
            {                                                       // json: password repeat
                'id'                :   'passwordRepeat',           // string: id
                'type'              :   'text',                     // string: type
                'displayOptions'    :   {                           // json: display options
                    'label'         :   {                           // json: label
                        'text'          :   pleisterman.translations['passwordRepeat'] // string: text
                    },                                              // done json: label
                    'emptyError'    :   true,                       // boolean: empty error
                    'type'              :   'password',             // string: type
                },                                                  // done json: display options
                'value'             :   '',                         // string: value
                'getInputIdFunction'     :   null                   // function: get input id
            },                                                      // done json: password repeat
            {                                                       // json: password repeat
                'id'                :   'passwordStrength',         // string: id
                'type'              :   'passwordStrength',         // string: type
                'displayOptions'    :   {                           // json: display options
                    'label'         :   {                           // json: label
                        'text'          :   pleisterman.translations['passwordStrength'] // string: text
                    }                                               // done json: label
                },                                                  // done json: display options
                'showStrengthFunction'     :   null                 // function: show password strength function
            },                                                      // done json: password repeat
            {                                                       // json: show password button
                'id'            :   'showPasswordButton',           // string: id
                'type'          :   'button',                       // string: type
                'displayOptions'    :   {                           // json: displayOptions
                },                                                  // done json: displayOptions
                'value'         :  pleisterman.translations['showPassword'], // string: text
                'callback'      :  null                             // function: callback
            }                                                       // done json: show password button
        ];                                                          // done json: dataObject
        self.passwordVisible = false;                               // boolean"password visible
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add password change callbacks
            self.addPasswordChangeCallback();

            // add button callbacks
            self.addButtonCallbacks();

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add open initial selection
            jsProject.subscribeToEvent( 'openInitialSelection', self.openInitialSelection );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addPasswordChangeCallback = function(){
        // FUNCTION: addPasswordChangeCallback( void ) void
            
            // get updated object from dataObject
            var passwordObject = jsProject.getJsonValue( self.dataObject, ['id=password'] );            
            // set callback function 
            passwordObject['changeCallback'] = self.passwordChange;

        // DONE FUNCTION: addPasswordChangeCallback( void ) void
        };
        self.addButtonCallbacks = function(){
        // FUNCTION: addButtonCallbacks( void ) void
            
            // get updated object from dataObject
            var passwordShowButtonObject = jsProject.getJsonValue( self.dataObject, ['id=showPasswordButton'] );            
            // set callback function 
            passwordShowButtonObject['callback'] = self.togglePasswordVisibility;

        // DONE FUNCTION: addButtonCallbacks( void ) void
        };
        self.passwordChange = function( password ){
        // FUNCTION: passwordChange( void ) void
        
            // debug info
            self.debug( 'passwordChange password: ' + password );
            
            // get updated object from dataObject
            var passwordStrengthObject = jsProject.getJsonValue( self.dataObject, ['id=passwordStrength'] );            
            // set callback function 
            passwordStrengthObject['showStrengthFunction']( password );

        // DONE FUNCTION: passwordChange( void ) void
        };
        self.togglePasswordVisibility = function( buttonId ){
        // FUNCTION: togglePasswordVisibility( string: buttonId ) void
            
            // remember visibility
            self.passwordVisible = !self.passwordVisible;
            
            var passwordInputId = '';
            // get updated object from dataObject
            var passwordObject = jsProject.getJsonValue( self.dataObject, ['id=password'] );            
            // get id
            passwordInputId = passwordObject['getInputIdFunction']();

            var passwordRepeatInputId = '';
            // get updated object from dataObject
            var repeatPasswordObject = jsProject.getJsonValue( self.dataObject, ['id=passwordRepeat'] );            
            // get id
            passwordRepeatInputId = repeatPasswordObject['getInputIdFunction']();
            
            // password visible
            if( self.passwordVisible ){
                // chenge button text
                $( '#' + buttonId ).html( pleisterman.translations['hidePassword'] );
                $( '#' + passwordInputId ).attr( 'type', 'text' );
                $( '#' + passwordRepeatInputId ).attr( 'type', 'text' );
            }
            else {
                // chenge button text
                $( '#' + buttonId ).html( pleisterman.translations['showPassword'] );
                $( '#' + passwordInputId ).attr( 'type', 'password' );
                $( '#' + passwordRepeatInputId ).attr( 'type', 'password' );
            }
            // done password visible
            
        // DONE FUNCTION: togglePasswordVisibility( string: buttonId ) void
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void
            
            // open subject = userpassword
            if( pleisterman.options['openSubject']['value'] === self.id ){
                // show data
                self.show(); 
            }
            // done open subject = userpassword
            
        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.prepareShow = function() {
        // FUNCTION: prepareShow( void ) void
            
            // debug info
            self.debug( 'prepareShow' );  
            
            // call global prepare data show
            pleisterman.prepareDataShow( self.show );
            
        // DONE FUNCTION: prepareShow( void ) void
        };
        self.show = function(){
        // FUNCTION: show( void ) void
            
            // cancel events
            jsProject.callEvent( 'cancel' );
            
            // remember open subject
            pleisterman.setOption( 'openSubject', self.id );

            // get password object from dataObject
            var passwordObject = jsProject.getJsonValue( self.dataObject, ['id=password'] );            
            // unset password
            passwordObject['value'] = '';
            // get repeat password object from dataObject
            var repeatPasswordObject = jsProject.getJsonValue( self.dataObject, ['id=passwordRepeat'] );            
            // unset repeat password
            repeatPasswordObject['value'] = '';
            
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
            
        // DONE FUNCTION: show( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
        
            // debug info
            self.debug( 'update' );

            // show busy screen
            pleisterman.startBusyProcess();
            
            // reset data error
            jsProject.setValue( 'hasError', 'data', false );

            // set data from dataEdit controls to data object 
            jsProject.callEvent( 'editSetData' );
            
            // check data error
            if( jsProject.getValue( 'hasError', 'data' )  ){
                // end busy
                pleisterman.endBusyProcess();
                // done with error 
                return;
            }
            // done check data error
            
            // check data
            if( !self.checkData() ){
                // end busy
                pleisterman.endBusyProcess();
                // doen with error
                return;
            }
            // check data
            
            // construct data object for password key
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'authentification',
                'what'              :   'passwordKey'
            };
            // done construct data object for password key
             
            // make the ajax call for password key
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data, self.getPasswordKeyCallback );
            
        // DONE FUNCTION: update( void ) void
        };
        self.getPasswordKeyCallback = function( result ){
        // FUNCTION: getPasswordKeyCallback( json: result ) void
            
            // check for errors
            if( self.hasAjaxResultErrors( result ) ){
                // end busy
                pleisterman.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors
            
            // create values object
            var values = {};

            // get password object from dataObject
            var passwordObject = jsProject.getJsonValue( self.dataObject, ['id=password'] );            
            // unset password
            values['password'] = jsProject.xorString( passwordObject['value'], result['key'] );
            
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'authentification',
                'what'              :   'password',
                'values'            :   values 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.updateCallback );
            
        // DONE FUNCTION: getPasswordKeyCallback( json: result ) void
        };
        self.updateCallback = function( result ){
        // FUNCTION: updateCallback( json: result ) void
            
            // check for errors
            if( self.hasAjaxResultErrors( result ) ){
                // end busy
                pleisterman.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors
            
            self.debug( "result: " + result );
            
            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );
            
            // set data !changed 
            jsProject.setValue( 'changed', 'data', false );    
            
            // end busy
            pleisterman.endBusyProcess();

            // call after update
            jsProject.callEvent( 'afterUpdate' );
            
        // DONE FUNCTION: updateCallback( json: result ) void
        };
        self.checkData = function(){
        // FUNCTION: checkData( void ) boolean

            // get password object from dataObject
            var passwordObject = jsProject.getJsonValue( self.dataObject, ['id=password'] );            
            // get repeat password object from dataObject
            var repeatPasswordObject = jsProject.getJsonValue( self.dataObject, ['id=passwordRepeat'] );            
            
            // get password
            var password =  $.trim( passwordObject['value'] );
            // get repeat password
            var repeatPassword = $.trim( repeatPasswordObject['value'] );
            
            // validate password
            if( pleisterman.validatePassword( password, repeatPassword, passwordObject['errorFunction'] ) ){ 
                // done
                return true;
            }
            else {
                // done with error
                return false;
            }
            // done validate password
            
        // DONE FUNCTION: checkData( void ) boolean
        };
        self.hasAjaxResultErrors = function( result ){
        // FUNCTION: hasAjaxResultErrors( json: result ) boolean
            
            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // done with error
                return true;
            }
            // done global check result
            
            // check errors
            if( result['error'] ){
                // debug info
                self.debug( result['error'] );
                
                // show data updated message
                jsProject.callEvent( 'showEditError', result['error'] );
                 
                // done with error
                return true;
            }
            // done check errors
          
            // done 
            return false;
            
        // DONE FUNCTION: hasAjaxResultErrors( json: result ) boolean
        };
        self.cancelEdit = function(){
        // FUNCTION: cancelEdit( void ) void
            
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
            // unset open subject
            pleisterman.setOption( 'openSubject', null );            
            // call cancel event
            jsProject.callEvent( 'cancel' );
            
        // DONE FUNCTION: cancelEdit( void ) void
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
            // FUNCTION: show
            show : function(){
                // call internal prepare show
                self.prepareShow();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: passwordModule( void ) void 
})( pleisterman );
// done create module function
