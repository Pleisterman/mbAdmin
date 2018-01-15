/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/options/testModule.js
 *  
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module controls the test data in options
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Purpose:  
 *      contains the basic html code for the header
 *      of the website
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( pleisterman ){

    // MODULE: testModule( void ) void
    
    pleisterman.testModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'testModule';                         // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.id = 'test';                                   // string: id
        self.dataObject = [                                 // json: data object
            {                                               // json: messageDialogButton
                'id'            :   'messageDialogButton',  // string: id
                'type'          :   'button',               // string: type
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                    }                                       // done json: label                
                },                                          // done json: display options
                'value'         :  'message Dialog',        // string: value
                'callback'      :  null                     // function: callback
            },                                              // done json: messageDialogButton
            {                                               // json: outOfDateDialogButton
                'id'            :   'outOfDateDialogButton',// string: id
                'type'          :   'button',               // string: type
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                    }                                       // done json: label                
                },                                          // done json: display options
                'value'         :  'outOfDate Dialog',      // string: value
                'callback'      :  null                     // function: callback
            },                                              // done json: outOfDateDialogButton
            {                                               // json: errorDialogButton
                'id'            :   'errorDialogButton',    // string: id
                'type'          :   'button',               // string: type
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                    }                                       // done json: label                
                },                                          // done json: display options
                'value'         :  'error Dialog',          // string: value
                'callback'      :  null                     // function: callback
            },                                              // done json: errorDialogButton     
            {                                               // json: reLoginDialogButton
                'id'            :   'reLoginDialogButton',  // string: id
                'type'          :   'button',               // string: type
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                    }                                       // done json: label                
                },                                          // done json: display options
                'value'         :  'reLogin Dialog',        // string: value
                'callback'      :  null                     // function: callback
            }                                               // done json: reLoginDialogButton
        ];                                                  // json: data object
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add colorSchemeButton callback select module
            self.addButtonCallbacks();
            
            // add event subscriptions
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add open iniitial selection change
            jsProject.subscribeToEvent( 'openInitialSelection', self.openInitialSelection );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addButtonCallbacks = function(){
        // FUNCTION: addButtonCallbacks( void ) void
            
            // find object in data object
            $.each( self.dataObject, function( objectIndex, objectValue ) {
                // messageDialogButton object found
                if( objectValue['id'] === 'messageDialogButton' ){
                    // set select callback function 
                    objectValue['callback'] = self.openMessageDialog;
                }
                // done messageDialogButton object found
                 
                // messageDialogButton object found
                if( objectValue['id'] === 'outOfDateDialogButton' ){
                    // set select callback function 
                    objectValue['callback'] = self.openOutOfDateDialog;
                }
                // done messageDialogButton object found
                
                // messageDialogButton object found
                if( objectValue['id'] === 'errorDialogButton' ){
                    // set select callback function 
                    objectValue['callback'] = self.showErrorDialog;
                }
                // done messageDialogButton object found
                
                // reLoginDialogButton object found
                if( objectValue['id'] === 'reLoginDialogButton' ){
                    // set select callback function 
                    objectValue['callback'] = self.showReLoginDialog;
                }
                // done reLoginDialogButton object found
            });
            // done find object in data object
            
        // DONE FUNCTION: addButtonCallbacks( void ) void
        };
        self.openMessageDialog = function(){
        // FUNCTION: openMessageDialog( void ) void
            
            var options = {
                'isYesNo' : true,
                'okCallback' : self.messageCallback,
                'okCallbackParameters' : 0
            };
            pleisterman.showMessage( 'dataChanged', options );
            
        // DONE FUNCTION: openMessageDialog( void ) void
        };
        self.messageCallback = function(){
        // FUNCTION: messageCallback( void ) void
            
            self.debug( 'messageCallback' );
            
        // DONE FUNCTION: messageCallback( void ) void
        };
        self.openOutOfDateDialog = function(){
        // FUNCTION: openOutOfDateDialog( void ) void
            
            pleisterman.showOutOfDateDialog( null );
            
        // DONE FUNCTION: openOutOfDateDialog( void ) void
        };
        self.showErrorDialog = function(){
        // FUNCTION: showErrorDialog( void ) void
            
            pleisterman.showError( 'documentAlreadyDeleted' );            
            
        // DONE FUNCTION: showErrorDialog( void ) void
        };
        self.showReLoginDialog = function(){
        // FUNCTION: showReLoginDialog( void ) void
            
            pleisterman.showReLoginDialog( );            
            
        // DONE FUNCTION: showReLoginDialog( void ) void
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void
            
            // show font if selected
            if( pleisterman.options['openSubject']['value'] === 'test' ){
                // show
                self.show(); 
            }
            // done show font if selected
            
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
            
            // debug info    
            self.debug( 'open subject=' + self.id );
            // set open subject option
            pleisterman.setOption( 'openSubject', self.id );
            
            // set data values
            jsProject.setValue( 'changed', 'data', false );    
            jsProject.setValue( 'dataObject', 'data', self.dataObject );    
            jsProject.setValue( 'id', 'data', self.id );    
            // set data values
            
            // subscribe to events
            jsProject.subscribeToEvent( 'update', self.update );
            jsProject.subscribeToEvent( 'cancel', self.cancelUpdate );
            // done subscribe to events
            
            // call the edit event
            jsProject.callEvent( 'editOpen' );
            
            //pleisterman.showDataError( 'text1', 'inputEmpty' );
            
        // DONE FUNCTION: show( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
        
            // nothing to do
            
        // DONE FUNCTION: update( void ) void
        };
        self.cancelUpdate = function(){
        // FUNCTION: cancelUpdate( void ) void
            
            // remove event subscriptions
            jsProject.unSubscribeFromEvent( 'update', self.update );
            jsProject.unSubscribeFromEvent( 'cancel', self.cancelUpdate );
            // done remove event subscriptions
            
            // unset data id
            jsProject.setValue( 'id', 'data', null );    
            // unset data object
            jsProject.setValue( 'dataObject', 'data', null );    
            // reset data changed
            jsProject.setValue( 'changed', 'data', false );
            // unset open subject
            pleisterman.setOption( 'openSubject', null );            
            // call cancel event
            jsProject.callEvent( 'cancel' );

        // DONE FUNCTION: cancelUpdate( void ) void
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
    // DONE MODULE: testModule( void ) void 
})( pleisterman );
// done create module function
