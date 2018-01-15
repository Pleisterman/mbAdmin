/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/upload/valuesModule.js
 * 
 *  Last revision: 01-01-2017
 * 
 *  Purpose: 
 *          this module is the container class for the upload application
 *          all upload modules are linked to this module and can be accessed through the functions
 *          linked to this module.
 *          this module requires the jsProject modules  
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function() {
        
    // MODULE: pleisterman( void ) void 
        
    // create the pleisterman object
    window.pleisterman = new function(){};

    // PRIVATE 
    var self = window.pleisterman;
    self.MODULE = 'pleisterman';
    
    self.debugOn = false;                                           // boolean: debugOn
    self.debuggerOptions = {                                        // json: debugger options
        'zIndex'    : 8000,                                         // css z-index
        'top'       : 240,                                          // integer: top
        'left'      : 10,                                           // integer: left
        'width'     : 450,                                          // integer: width
        'height'    : 80                                            // integer: height
    };                                                              // done json: debugger options
    self.documentCssOptions = {                                     // json: document css options
        'font-size'                 :   parent.pleisterman.options['fontSize']['value'] + 'px',   // css font size
        'font-family'               :   parent.pleisterman.options['fontFamily']['value'],        // css font fmily
        'color'                     :   parent.pleisterman.colors['commonColor']['color']         // css color: color
    };                                                              // done json: document css options
    self.errorOptions = {                                           // json: error options
        'parentId'              :   'errorContainer',               // string: parent element id
        'id'                    :   'error',                        // string: element id 
        'element'               :   'div',                          // string: html element type
        'minimumHeight'         :   '1.0em',                        // css minimum width
        'backgroundColor'       :   'transparent',                  // css color: background color
        'color'                 :   parent.pleisterman.colors['errorColor']['color'], // css color: color
        'marginTop'             :   '0.6em',                        // css margin top
        'marginBottom'          :   '0.6em',                        // css margin bottom
        'marginLeft'            :   '2.0em',                        // css margin left
        'marginRight'           :   '3.0em',                        // css margin right
        'padding'               :   '0.2em'                         // css padding
    };                                                              // done json: error options
    self.messageOptions = {                                         // json: message options
        'parentId'              :   'messageContainer',             // string: parent element id   
        'id'                    :   'message',                      // string: element id 
        'element'               :   'div',                          // string: html element type
        'minimumHeight'         :   '1.0em',                        // css minimum height
        'backgroundColor'       :   'transparent',                  // css color: background color
        'color'                 :   parent.pleisterman.colors['editColor']['color'], // css color: color
        'marginTop'             :   '0.6em',                        // css margin top
        'marginBottom'          :   '0.6em',                        // css margin bottom
        'marginLeft'            :   '2.0em',                        // css margin left
        'marginRight'           :   '3.0em',                        // css margin right
        'padding'               :   '0.2em'                         // css padding
    };                                                              // done json: message options
    self.callerOptions = null;                                      // json: caller options  
    self.dataModule = null;                                         // module: data module  
    self.documentDataObjectModule = null;                           // module: document data object module 
    self.documentDataObject = null;                                 // json: document data object 
    self.valuesModule = null;                                       // module: valuesModule 
    self.tabStopsModule = null;                                     // module: tabStopsModule
    // DONE MEMBERS     

    // FUNCTIONS
    self.start = function() {
    // FUNCTION: start( void ) void
            
        // create the jsProject module
        jsProject.construct();
        // add debug functions
        jsProject.debugOn( self.debugOn, self.debuggerOptions );
        
        // create settings module
        self.settingsModule = new pleisterman.settingsModule( );
        // create values module
        self.valuesModule = new pleisterman.valuesModule( );
        // create tab stops module
        self.tabStopsModule = new pleisterman.tabStopsModule( );
        
        // set document css
        self.setDocumentCss();
        
        // get caller options
        self.callerOptions = parent.pleisterman.getDocumentUploadOptions();

        // upload succes
        if( $( '#resultSucces' ).val() ){
            if( self.callerOptions['mode'] === 'insert' ){
                parent.pleisterman.getMessage( 'documentInserted', self.messageCallback ); 
            }
            if( self.callerOptions['mode'] === 'update' ){
                parent.pleisterman.getMessage( 'documentUpdated', self.messageCallback ); 
            }
            
            self.callerOptions['callback']( self.callerOptions['documentId'] );
            
            // set mode is update
            self.callerOptions['mode'] = 'update';
            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );
        }
        // done succes

        //debug info
        self.debug( 'documentId: ' + self.callerOptions['documentId'] );

        // create dataModule
        self.createDataModule();
        
        // create document data object
        self.createDocumentDataObject();

        // add message
        self.addMessage();

        // add error
        self.addError();

        // check upload
        self.afterUpload();
        
        // all is well
        self.debug( 'upload ok');
        
    // DONE FUNCTION: start( void ) void
    };
    self.setDocumentCss = function() {
    // FUNCTION: setDocumentCss( void ) void
            
        // loop over document css options
        $.each( self.documentCssOptions, function( index, value ) {
            // set css value
            $( document.body ).css( index, value );
        } );            
        // done loop over document css options
        
    // DONE FUNCTION: setDocumentCss( void ) void
    };
    self.createDataModule = function() {
    // FUNCTION: createDataModule( void ) void
            
        // create data module options
        var options = {
            'insertCallback'        :   self.insert,
            'updateNameCallback'    :   self.updateName,
            'updateFileCallback'    :   self.updateFile,
            'errorCallback'         :   self.errorCallback,
            'closeCallback'         :   self.close,
            'callerOptions'         :   self.callerOptions
        };
        // done create data module options
        
        // create data module
        self.dataModule = new pleisterman.dataModule( options );
        
    // DONE FUNCTION: createDataModule( void ) void
    };
    self.createDocumentDataObject = function() {
    // FUNCTION: createDocumentDataObject( void ) void
            
        // create document data object module 
        self.documentDataObjectModule = new parent.pleisterman.documentDataObjectModule();
        // get data object
        self.documentDataObject = self.documentDataObjectModule.getDataObject();
        
    // DONE FUNCTION: createDocumentDataObject( void ) void
    };
    self.addMessage = function() {
    // FUNCTION: addMessage( void ) void
            
        // add error html
        $( '#' + self.messageOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.messageOptions ) );
        
    // DONE FUNCTION: addMessage( void ) void
    };
    self.addError = function() {
    // FUNCTION: addError( void ) void
            
        // add error html
        $( '#' + self.errorOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.errorOptions ) );
        // hide error
        $( '#' + self.errorOptions['parentId'] ).hide();
        
    // DONE FUNCTION: addError( void ) void
    };
    self.afterUpload = function() {
    // FUNCTION: afterUpload( void ) void
            
        // is update
        if( self.callerOptions['mode'] === 'update' ){
            // get data
            self.getData();
        }
        // done is update

        // show errors
        self.showError();
        
    // DONE FUNCTION: afterUpload( void ) void
    };
    self.getData = function() {
    // FUNCTION: getData( void ) void
            
        // info debug
        self.debug( 'getData' );
        // set document id
        self.documentDataObjectModule.getData( self.getDataCallback, self.callerOptions['documentId'] );
        
    // DONE FUNCTION: getData( void ) void
    };
    self.getDataCallback = function( ) {
    // FUNCTION: getDataCallback( void ) void
            
        // debug info
        self.debug( 'getDataCallback' );
        
        // get name and origina name
        var name = '';
        var originalFileName = '';
        $.each( self.documentDataObject, function( index, data ) {
            if( data['id'] === 'name' ){
                name = data['value'];
            }
            if( data['id'] === 'originalFileName' ){
                originalFileName = data['value'];
            }
        });
        // get name and origina name
        
        // set name
        self.dataModule.setName( name );
        // set original name
        self.dataModule.setOriginalFileName( originalFileName );
        
    // DONE FUNCTION: getDataCallback( void ) void
    };
    self.showError = function() {
    // FUNCTION: showError( void ) void
            
        // has error
        if( $( '#resultError' ).val() ){
            // get error
            parent.pleisterman.getError(  $( '#resultError' ).val(), self.errorCallback );
            // show error
            $( '#' + self.errorOptions['parentId'] ).show();
            
            // hide messgae
            $( '#' + self.messageOptions['parentId'] ).hide();
            // document is deleted
            if( $( '#resultError' ).val() === 'documentAlreadyDeleted' ){
                // done close upload screen
                self.callerOptions['callback']( null );
                
            }
            // document is deleted
        }
        // done has error
        
    // DONE FUNCTION: showError( void ) void
    };
    self.insert = function( ){
    // FUNCTION: insert( void ) void
            
        // debug info
        jsProject.debug( 'insert' );

        // error empty
        $( '#' + self.errorOptions['id'] ).html( '&nbsp;' );
        // hide error
        $( '#' + self.errorOptions['parentId'] ).hide();
        // message empty
        $( '#' + self.messageOptions['id'] ).html( '&nbsp;' );
        // show message
        $( '#' + self.messageOptions['parentId'] ).show();
        
        // get name
        var name = self.dataModule.getName();
        // name error
        if( !name ){
            // disable insert
            self.dataModule.enableInsert( false );
            // return with error
            return;
        }
        // done name error
        
        // set values from dataObject
        $.each( self.documentDataObject, function( index, value ) {
            // is workDirectory
            if( value['id'] === 'workDirectory' ){
                // set value
                value['value'] = self.callerOptions['workDirectory'];
            }
            // done is workDirectory
            
            // is name
            if( value['id'] === 'name' ){
                // set value
                value['value'] = name;
            }
            // done is name
            
            // is subject
            if( value['id'] === 'subject' ){
                // set value
                value['value'] = self.callerOptions['subject'];
            }
            // done is subject
            
            // is subjectId
            if( value['id'] === 'subjectId' ){
                // set value
                value['value'] = self.callerOptions['subjectId'];
            }
            // done is subjectId
            
        });
        // done set values from dataObject
        
        // call dataObjectModule insert function
        self.documentDataObjectModule.insert( self.insertCallback );
        
    // DONE FUNCTION: insert( void ) void
    };
    self.insertCallback = function( result ){
    // FUNCTION: insertCallback( json: result ) void
            
        // check errors
        if( self.hasAjaxResultErrors( result ) ){
            // doen with error
            return;
        }
        // done check errors

        // set submit mode
        $( '#mode' ).val( 'insert' );
        // set document id
        $( '#documentId' ).val( result['id'] );
        
        // set documentId
        self.callerOptions['documentId'] = result['id'];
        
        // submit upload form
        self.submitForm();
        
    // DONE FUNCTION: insertCallback( json: result ) void
    };
    self.updateName = function( ){
    // FUNCTION: updateName( void ) void
            
        // debug info
        jsProject.debug( 'update name' );
        
        // empty error
        $( '#' + self.errorOptions['id'] ).html( '&nbsp;' );
        // hide error
        $( '#' + self.errorOptions['parentId'] ).hide();
        // message empty
        $( '#' + self.messageOptions['id'] ).html( '&nbsp;' );
        // hide message
        $( '#' + self.messageOptions['parentId'] ).show();

        // get name
        var name = self.dataModule.getName();
        // name error
        if( !name ){
            // disable insert
            self.dataModule.enableInsert( false );
            // return with error
            return;
        }
        // done name error

        // call dataObjectModule update name function
        self.documentDataObjectModule.updateName( name, self.updateNameCallback );
        
    // DONE FUNCTION: updateName( void ) void
    };
    self.updateNameCallback = function( result ){
    // FUNCTION: updateNameCallback( json: result ) void
            
        if( self.hasAjaxResultErrors( result ) ){
            // done with error
            return;
        }
        self.callerOptions['callback']( self.callerOptions['documentId'] );
            
        parent.pleisterman.getMessage( 'dataUpdated', self.messageCallback );    
        
    // DONE FUNCTION: updateNameCallback( json: result ) void
    };
    self.updateFile = function( ){
    // FUNCTION: updateFile( void ) void
            
        // debug info
        jsProject.debug( 'updateFile' );

        // set submit mode
        $( '#mode' ).val( 'update' );
        // set document id
        $( '#documentId' ).val( self.callerOptions['documentId'] );
        
        // submit upload form
        self.submitForm();
        
    // DONE FUNCTION: updateFile( void ) void
    };
    self.submitForm = function( ){
    // FUNCTION: submitForm( void ) void
            
        // debug info
        jsProject.debug( 'submitForm' );

        // set submit values
        $( '#workDirectory' ).val( self.callerOptions['workDirectory'] );
        $( '#subject' ).val( self.callerOptions['subject'] );
        $( '#subjectId' ).val( self.callerOptions['subjectId'] );
        $( '#token' ).val( parent.pleisterman.token );
        // done set submit values
    
        // submit
        $( '#uploadForm' ).submit();

    // DONE FUNCTION: submitForm( void ) void
    };
    self.errorCallback = function( error ){
    // FUNCTION: errorCallback( string: error ) void
            
        // debug info
        self.debug( 'errorCallback error: ' + error );

        // no error
        if( error === '' ){
            // set backgroundColor
            $( '#' + self.messageOptions['id'] ).css( 'background-color', 'transparent' );
            // set message html
            $( '#' + self.messageOptions['id'] ).html( '&nbsp;' );
            // show message 
            $( '#' + self.messageOptions['parentId'] ).show( );
            // hide error 
            $( '#' + self.errorOptions['parentId'] ).hide( );
            // done
            return;
        }
        // done no error
        
        // set backgroundColor
        $( '#' + self.errorOptions['id'] ).css( 'background-color', parent.pleisterman.colors['errorDialogBackgroundColor']['color'] );
        // set error html
        $( '#' + self.errorOptions['id'] ).html( error );
        // show error 
        $( '#' + self.errorOptions['parentId'] ).show( );
        // hide message 
        $( '#' + self.messageOptions['parentId'] ).hide( );

    // DONE FUNCTION: errorCallback( string: error ) void
    };
    self.messageCallback = function( message ){
    // FUNCTION: messageCallback( string: message ) void
            
        // debug info
        self.debug( 'messageCallback message: ' + message );
        // set backgroundColor
        $( '#' + self.messageOptions['id'] ).css( 'background-color', parent.pleisterman.colors['messageBackgroundColor']['color'] );
        // set message html
        $( '#' + self.messageOptions['id'] ).html( message );
        // show message 
        $( '#' + self.messageOptions['parentId'] ).show( );
        // hide error 
        $( '#' + self.errorOptions['parentId'] ).hide( );

    // DONE FUNCTION: messageCallback( string: message ) void
    };
    self.hasAjaxResultErrors = function( result ){
    // FUNCTION: hasAjaxResultErrors( json: result ) void
            
        // check critical errors
        if( result['criticalError'] ){
            // show critical error
            parent.pleisterman.showCriticalError( result['criticalError'] );
            // done with error
            return true;
        }
        // done check critical errors

        // check errors
        if( result['error'] ){
            // debug info
            self.debug( result['error'] );

            // out of date error
            if( result['error'] === 'dataOutOfDate' ){
                // refresh data
                self.getData();
            }
            // done out of date error

            // name exists error
            if( result['error'] === 'nameExists' ){
                // disable update name
                self.dataModule.enableNameUpdate( false );
            }
            // done name exists error

            // name empty
            if( result['error'] === 'nameEmpty' ){
                // disable update name
                self.dataModule.enableNameUpdate( false );
                // set focus on name
                self.dataModule.nameSetFocus( );
            }
            // done name empty
            
            // document already deleted
            if( result['error'] === 'documentAlreadyDeleted' ){
                // call callback
                self.callerOptions['callback']( null );
                
            }
            // done document already deleted
            
            // show error message
            parent.pleisterman.getError( result['error'], self.errorCallback );

            // done with error
            return true;
        }
        // done check errors

        // done 
        return false;

    // DONE FUNCTION: hasAjaxResultErrors( json: result ) void
    };
    self.close = function( ){
    // FUNCTION: close( void ) void
            
        // hide upload
        parent.pleisterman.hideDocumentUpload( );

    // DONE FUNCTION: close( void ) void
    };
    self.debug = function( message ){
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
    // DONE PRIVATE

    // PUBLIC
    return {
        // FUNCTION: start( void ) void
        start :function(){
            // call internal
            self.start();
        }
    };
    // DONE PUBLIC
})();
// done create module function
 
