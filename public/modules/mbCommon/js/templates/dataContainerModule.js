/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listsContainerModule.js
 * 
 *  Last revision: 10-01-2017
 * 
 *  Purpose: 
 *          this module controls the data container for the 
 *          data
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( sharesoft ){

    // MODULE: dataContainerModule( void ) void
    
    sharesoft.dataContainerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataContainerModule';                            // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        self.layoutId = 'layout';                                       // string: element id
        self.dataId = '';                                               // string: data id
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );             // string: image directory url
        self.containerOptions = {                                       // json: container options     
            'id'                    :   self.MODULE + 'Container',      // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '',                             // string: text    
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display style
            'backgroundColor'       :   sharesoft.colors['editBackgroundColor']['color'], // css color: COLOR: editBackgroundColor
            'zIndex'                :   sharesoft.getSetting( 'zIndexData' ).toString()   // integer: SETTING: zIndexData    
        };                                                              // done json: container options  
        self.headerOptions = {                                          // json: headerOptions options  
            'id'                    :   self.MODULE + 'Header',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text    
            'overflow-x'            :   'hidden',                       // css overflow
            'backgroundColor'       :   sharesoft.colors['panelHighlightBackgroundColor']['color'],   // css color: COLOR: panelHighlightBackgroundColor
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
            'borderBottom'          :   true,                           // boolean: has border bottom
            'paddingLeft'           :   '3.8em',                        // css padding left
            'paddingTop'            :   '0.7em',                        // css padding top
            'paddingBottom'         :   '0.6em'                         // css padding bottom
        };                                                              // done json: headerOptions options  
        self.headerTextOptions = {                                      // json: headerTextOptions options  
            'id'                    :   self.MODULE + 'HeaderText',     // string: element id
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'size'                  :   '60',                           // string: size 
            'readOnly'              :   true,                           // boolean: readonly 
            'fontSize'              :   '1.1em',                        // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'color'                 :   sharesoft.colors['panelHighlightColor']['color'],             // css color: COLOR: panelHighlightColor
            'backgroundColor'       :   'transparent',                  // css color: background color
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: headerTextOptions options  
        self.contentOptions = {                                         // json: content options
            'id'                    :   'dataContent',                  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent',                  // css color: background color
            'styleWidth'            :   '100%',                         // css width: styleWidth 
            'overflow'              :   'auto'                          // css overflow style
        };                                                              // done json: content options
        self.buttonContainerOptions = {                                 // json: button container options        
            'id'                    :   self.MODULE + 'ButtonContainer',// string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   sharesoft.colors['panelHighlightBackgroundColor']['color'], // css color: COLOR: panelHighlightBackgroundColor
            'marginRight'           :   0,                              // css margin right   
            'marginLeftInLetters'   :   sharesoft.getSetting( 'dataButtonsMarginLeftInLetters' ), // integer: dataButtonsMarginLeftInLetters           
            'minimumWidth'          :   220,                            // css minimum width
            'borderTop'             :   true,                           // boolean: has border top
            'borderBottom'          :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'groove'                        // css border style 
        };                                                              // done json: button container options
        self.buttonOptions = {                                          // json: buttonOptions
            'insertId'              :   self.MODULE + 'insertButton',   // string: insert button id    
            'updateId'              :   self.MODULE + 'updateButton',   // string: update button id    
            'cancelId'              :   self.MODULE + 'cancelButton',   // string: cancel button id    
            'element'               :   'div',                          // string html element type 
            'display'               :   'inline-block',                 // css display style
            'color'                 :   sharesoft.colors['buttonColor']['color'],             // css color: COLOR: buttonColor
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'],   // css color: COLOR: buttonBackgroundColor
            'fontSize'              :   sharesoft.getSetting( 'buttonFontSize' ),             // css font size: SETTING: buttonFontSize 
            'fontWeight'            :   sharesoft.getSetting( 'buttonFontWeight' ),           // css font weight: SETTING: buttonFontWeight
            'padding'               :   sharesoft.getSetting( 'buttonPadding' ),              // css padding: SETTING: buttonPadding
            'minimumWidth'          :   '12.0em',                       // css minimum width
            'marginLeft'            :   12,                             // css margin left
            'marginBottom'          :   4,                              // css margin bottom
            'marginTop'             :   8,                              // css margin top
            'border'                :   true,                           // boolean: has border option
            'borderWidth'           :   sharesoft.getSetting( 'buttonBorderWidth' ),          // css font size: SETTING: buttonBorderWidth
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'],       // css color: COLOR: buttonBorderColor
            'borderStyle'           :   sharesoft.getSetting( 'buttonBorderStyle' ),          // css font size: SETTING: buttonBorderStyle
            'borderRadius'          :   sharesoft.getSetting( 'buttonBorderRadius' ),         // css font size: SETTING: buttonBorderRadius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: button options                
        self.messageOptions = {                                         // json: message options 
            'id'                    :   self.MODULE + 'MessageContainer',// string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '',                             // string: text
            'position'              :   'absolute',                     // css position
            'isVisible'             :   false,                          // boolean: is visible
            'showPeriod'            :   1200,                           // integer: miliseconds
            'containerMinimumWidth' :   120,                            // integer: minimum width
            'color'                 :   sharesoft.colors['commonColor']['color'],                 // css color: COLOR: commonColor
            'backgroundColor'       :   sharesoft.colors['dialogBackgroundColor']['color'],       // css color: COLOR: dialogBackgroundColor
            'errorColor'            :   sharesoft.colors['errorDialogColor']['color'],            // css color: COLOR: errorDialogColor
            'errorBackgroundColor'  :   sharesoft.colors['errorDialogBackgroundColor']['color'],  // css color: COLOR: errorDialogBackgroundColor
            'padding'               :   '0.8em',                        // css padding
            'fontSize'              :   '1.1em',                        // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderColor'           :    sharesoft.colors['errorDialogBorderColor']['color'],     // css color: COLOR: errorDialogBorderColor        
            'borderRadius'          :   '0.1em',                        // css border radius
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: message options 
        self.overlayOptions = {                                         // json: overlay options 
            'id'                    :   'dataEditOverlay',              // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'top'                   :   '0px',                          // css top
            'left'                  :   '0px',                          // css left
            'styleWidth'            :   '100%',                         // css style width
            'styleHeight'           :   '100%',                         // css style height
            'display'               :   'none',                         // css display style
            'overflow'              :   'visible',                      // css overflow
            'zIndex'                :   sharesoft.getSetting( 'zIndexDataEditOverlay' ).toString(),   // css font size: SETTING: zIndexDataEditOverlay
            'backgroundColor'       :   sharesoft.colors['overlayBackgroundColor']['color']           // css color: COLOR: overlayBackgroundColor     
        };                                                              // done json: overlay options 
        self.dataEditModule = null;                                     // module: dataEditModule 
        self.mode = '';                                                 // string: mode
        self.messageTimer = null;                                       // timer object: message timer
        self.mouseOverButtonId = null;                                  // string: html element id                    
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
            // add js events
            self.addEvents();
            
            // subscribe to event layoutChange
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // subscribe to event cancel
            jsProject.subscribeToEvent( 'cancel', self.cancelEdit );
            // subscribe to event editNew
            jsProject.subscribeToEvent( 'editNew', self.new );
            // subscribe to event editOpen
            jsProject.subscribeToEvent( 'editOpen', self.edit );
            // subscribe to event addEditButtonsTabstops
            jsProject.subscribeToEvent( 'addEditButtonsTabstops', self.addEditButtonsTabstops );
            // subscribe to event afterUpdate
            jsProject.subscribeToEvent( 'afterUpdate', self.afterUpdate );
            // subscribe to event showEditMessage
            jsProject.subscribeToEvent( 'showEditMessage', self.getMessage );
            // subscribe to event showEditError
            jsProject.subscribeToEvent( 'showEditError', self.getError );
            // subscribe to event editClose
            jsProject.subscribeToEvent( 'editClose', self.closeEdit );
            // subscribe to event dataError
            jsProject.subscribeToEvent( 'dataError', self.dataError );
            // subscribe to event updateColors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
            // add edit module
            self.dataEditModul = new sharesoft.dataEditModule( self.contentOptions['id'] );

        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // create data container
            $( document.body ).append( jsProject.jsonToElementHtml( self.containerOptions ) );

            // add header
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );
            // add header text
            $( '#' + self.headerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerTextOptions ) );

            // content to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.contentOptions ) );
                
            // add button container to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );

            // create buttons
            self.addButtons();
                
            // message container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageOptions ) );
            
            // add overlay to document
            $( document.body ).append( jsProject.jsonToElementHtml( self.overlayOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addButtons = function(){
        // FUNCTION: addButtons( void ) void
            
            // set insert id 
            self.buttonOptions['id'] = self.buttonOptions['insertId'];
            // set insert text
            self.buttonOptions['text'] = sharesoft.translations['insert'];
            // add insert html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
            // set update id 
            self.buttonOptions['id'] = self.buttonOptions['updateId'];
            // set update text
            self.buttonOptions['text'] = sharesoft.translations['update'];
            // add update html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

            // set cancel id 
            self.buttonOptions['id'] = self.buttonOptions['cancelId'];
            // set cancel text
            self.buttonOptions['text'] = sharesoft.translations['cancel'];
            // add cancel html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add content scroll event
            $( '#' + self.contentOptions['id'] ).scroll( function( event ){ jsProject.callEvent( 'dataContentScroll' ); } );
            
            // add button events
            self.addButtonEvents();

        // DONE FUNCTION: addEvents( void ) void
        };
        self.addButtonEvents = function(){
        // FUNCTION: addButtonEvents( void ) void
            
            // insert button
            $( '#' + self.buttonOptions['insertId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['insertId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['insertId'] ).click( function( event ){ self.buttonClick( 'insert' ); });
            // done insert button

            // update button
            $( '#' + self.buttonOptions['updateId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['updateId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['updateId'] ).click( function( event ){ self.buttonClick( 'update' ); });
            // done update button
            
            // cancel button
            $( '#' + self.buttonOptions['cancelId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['cancelId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['cancelId'] ).click( function( event ){ self.buttonClick( 'cancel' ); });
            // done cancel button

        // DONE FUNCTION: addButtonEvents( void ) void
        };
        self.buttonSelect = function( elementId ){
        // FUNCTION: buttonSelect( string: elementId ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === elementId || self.mouseOverButtonId === elementId ){
                // mouse over -> background color, color highlight
                $( '#' + elementId ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
                $( '#' + elementId ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
                // done mouse over -> background color, color highlight
            }
            else {
                // mouse out -> background color, color default
                $( '#' + elementId ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
                $( '#' + elementId ).css( 'color', sharesoft.colors['buttonColor']['color'] );
                // done mouse out -> background color, color default
            }
            // done is current tabstop
            
        // DONE FUNCTION: buttonSelect( string: elementId ) void
        };
        self.buttonMouseIn = function( elementId ){
        // FUNCTION: buttonMouseIn( string: elementId ) void
            
            // remember mouse over
            self.mouseOverButtonId = elementId;
            
            // mouse over -> background color, color highlight
            $( '#' + elementId ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + elementId ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            // done mouse over -> background color, color highlight
            
        // DONE FUNCTION: buttonMouseIn( string: elementId ) void
        };
        self.buttonMouseOut = function( elementId ){
        // FUNCTION: buttonMouseOut( string: elementId ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === elementId ){
                // keep selected
                return;
            }
            // done is current tabstop

            // unset mouse over id
            self.mouseOverButtonId = elementId;
            
            // mouse out -> background color, color default
            $( '#' + elementId ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + elementId ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            // done mouse out -> background color, color default
            
        // DONE FUNCTION: buttonMouseOut( string: elementId ) void
        };
        self.buttonClick = function( action ){
        // FUNCTION: buttonClick( string: action ) void
            
            // cancel hide container
            if( action === 'cancel' ){
                // close edit 
                self.closeEdit();
            }
            // done cancel hide container

            // call the event buttonId: update, insert and cancel
            jsProject.callEvent( action );
            
        // DONE FUNCTION: buttonClick( string: action ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
        
            // call update event
            jsProject.callEvent( 'update' );
            
        // DONE FUNCTION: update( void ) void
        };
        self.insert = function( ){
        // FUNCTION: insert( void ) void
        
            // call insert event
            jsProject.callEvent( 'insert' );
            
        // DONE FUNCTION: insert( void ) void
        };
        self.cancel = function( ){
        // FUNCTION: cancel( void ) void
        
            // call cancel event
            jsProject.callEvent( 'cancel' );
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.cancelEdit = function( ){
        // FUNCTION: cancelEdit( void ) void
        
            // close edit
            self.closeEdit();
            
        // DONE FUNCTION: cancelEdit( void ) void
        };
        self.new = function() {
        // FUNCTION: new( void ) void
        
            // debug info
            self.debug( 'new' );
            
            // set mode
            self.mode = 'insert';
            
            // get data id
            self.dataId = jsProject.getValue( 'id', 'data' );    
            
            // set the title
            $( '#' + self.headerTextOptions['id'] ).val( sharesoft.translations[self.dataId + 'TitleNew'] );

            // hide update button
            $( '#' + self.buttonOptions['updateId'] ).hide();
            // show insert button
            $( '#' + self.buttonOptions['insertId'] ).show();

            // hide the messages
            $( '#' + self.messageOptions['id'] ).hide();

            // show the containers
            //$( '#dataEditOverlay' ).show();
            $( '#' + self.containerOptions['id'] ).show();
            // show the containers

            // refresh the layout
            self.layoutChange();
            
        // DONE FUNCTION: new( void ) void
        };
        self.edit = function() {
        // FUNCTION: edit( void ) void
        
            // debug info
            self.debug( 'edit' );
            
            // set mode
            self.mode = 'edit';

            // get data object
            var dataObject = jsProject.getValue( 'dataObject', 'data' );    
            // get data id
            self.dataId = jsProject.getValue( 'id', 'data' );    

            var dataHeaderText = '';
            // set data header text
            $.each( dataObject, function( index, value ) {
                // is data text header
                if( value['isDataHeaderText'] ){
                    // set data text
                    dataHeaderText += value['value'] + ' ';
                }
                // done is data text header
            });
            // done set data header text
            
            // set the title
            var title = sharesoft.translations[self.dataId + 'TitleEdit'];
            title += ':   ';
            title += dataHeaderText;
            $( '#' + self.headerTextOptions['id'] ).val( title );
            // done set the title
            
            // show update
            $( '#' + self.buttonOptions['updateId'] ).show();

            // hide insert
            $( '#' + self.buttonOptions['insertId'] ).hide();

            // hide the messages
            $( '#' + self.messageOptions['id'] ).hide();

            // show the containers
            //$( '#dataEditOverlay' ).show();
            $( '#' + self.containerOptions['id'] ).show();
            // show the containers
            
            // refresh the layout
            self.layoutChange();
            
        // DONE FUNCTION: edit( void ) void
        };
        self.addEditButtonsTabstops = function(){
        // FUNCTION: addEditButtonsTabstops( void ) void
        
            // debug info
            self.debug( 'addEditButtonsTabstops' );
            
            // edit mode
            if( self.mode === 'edit' ){
                
                // create tabstop options update button
                var tabStopOptions = {
                    'id'        :    self.buttonOptions['updateId'],
                    'layer'     :   'data',
                    'select'    :   self.buttonSelect,
                    'deSelect'  :   self.buttonMouseOut,
                    'keys'      :   [
                        {
                            'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                            'type'      :   'tabStop',
                            'function'  :   self.update
                        }
                    ]
                };
                // done create tabstop options update button
                
                // add tabstop update button
                jsProject.callEvent( 'registerTabStop', tabStopOptions );
            }
            else {
                // create tabstop options insert button
                var tabStopOptions = {
                    'id'        :   self.buttonOptions['insertId'],
                    'layer'     :   'data',
                    'select'    :   self.buttonSelect,
                    'deSelect'  :   self.buttonMouseOut,
                    'keys'      :   [
                        {
                            'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                            'type'      :   'tabStop',
                            'function'  :   self.insert
                        }
                    ]
                };
                // done create tabstop options insert button
                
                // add tabstop
                jsProject.callEvent( 'registerTabStop', tabStopOptions );
                // done add tabstop
            }
            // done edit mode
            
            // add tabstop insert cancel
            var tabStopOptions = {
                'id'        :   self.buttonOptions['cancelId'],
                'layer'     :   'data',
                'select'    :   self.buttonSelect,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.cancel
                    },
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'default',
                        'function'  :   self.cancel
                    }
                ]
            };
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            // done add tabstop caancel button

            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'data' );
            
        // DONE FUNCTION: addEditButtonsTabstops( void ) void
        };
        self.afterUpdate = function(){
        // FUNCTION: afterUpdate( void ) void
        
            // get data object
            var dataObject = jsProject.getValue( 'dataObject', 'data' );    

            // get data header text
            var dataHeaderText = '';
            $.each( dataObject, function( index, value ) {
                // is data header text
                if( value['isDataHeaderText'] ){
                    // remember text
                    dataHeaderText = value['value'];
                }
                // is data header text
            });
            // done get data header text

            // set the title
            var title = sharesoft.translations[self.dataId + 'TitleEdit'];
            title += ':   ';
                title += dataHeaderText;
            $( '#' + self.headerTextOptions['id'] ).val( title );
            // done set the title
            
        // DONE FUNCTION: afterUpdate( void ) void
        };
        self.getMessage = function( messageId ){
        // FUNCTION: getMessage( string: messageId ) void
        
            // debug info
            self.debug( 'showEditMessage' + messageId );
            // get the message
            sharesoft.getMessage( messageId, self.showMessage );
            
        // DONE FUNCTION: getMessage( string: messageId ) void
        };
        self.showMessage = function( message, duration ){
        // FUNCTION: showMessage( string: message, integer: duration ) void
            
            // debug info
            self.debug( 'showMessage' + message );
            
            // set message background color
            $( '#' + self.messageOptions['id'] ).css( 'background-color', self.messageOptions['backgroundColor'] );
            // set message color
            $( '#' + self.messageOptions['id'] ).css( 'color', self.messageOptions['color'] );
            // set message html
            $( '#' + self.messageOptions['id'] ).html( message );
            // show the message
            $( '#' + self.messageOptions['id'] ).show();
            // refresh the layout
            self.layoutChange();
            
            // delete old timer
            if( self.messageTimer ){
                // clear the timer
                clearTimeout( self.messageTimer );
                // unset timer
                self.messageTimer = null;
            }
            // done delete old timer
            
            // duration not defined
            if( duration === undefined ){
                // set default duration
                duration = self.messageOptions['showPeriod'];
            }
            // done duration not defined
            
            // create new timer
            self.messageTimer = setTimeout( function () { self.hideMessage(); }, duration  );
            
        // DONE FUNCTION: showMessage( string: message, integer: duration ) void
        };
        self.hideMessage = function(){
        // FUNCTION: hideMessage( void ) void
        
            // empty html
            $( '#' + self.messageOptions['id'] ).html( '' );
            // hide message
            $( '#' + self.messageOptions['id'] ).hide();
            
        // DONE FUNCTION: hideMessage( void ) void
        };
        self.getError = function( errorId ){
        // FUNCTION: getError( string: errorId ) void
        
            // debug info
            self.debug( 'showEditError' + errorId );
            // get the message
            sharesoft.getError( errorId, self.showError );
            
        // DONE FUNCTION: getError( string: errorId ) void
        };
        self.showError = function( error, duration ){
        // FUNCTION: showError( string: errorId, integer: duration ) void
        
            // debug info
            self.debug( 'showError' + error );
            
            // set background color error color
            $( '#' + self.messageOptions['id'] ).css( 'background-color', self.messageOptions['errorBackgroundColor'] );
            // set color error color
            $( '#' + self.messageOptions['id'] ).css( 'color', self.messageOptions['errorColor'] );
            // set message html
            $( '#' + self.messageOptions['id'] ).html( error );
            // show the message
            $( '#' + self.messageOptions['id'] ).show();
            // refresh the layuot
            self.layoutChange();
            
            // timer exists
            if( self.messageTimer ){
                // clear  timer
                clearTimeout( self.messageTimer );
                // unset timer
                self.messageTimer = null;
            }
            // done timer exists
      
            // if duration not defined
            if( duration === undefined ){
                // set duration
                duration = self.messageOptions['showPeriod'];
            }
            // if duration not defined
            
            // create new timer
            self.messageTimer = setTimeout( function () { self.hideMessage(); }, duration  );
            
        // DONE FUNCTION: showError( string: errorId, integer: duration ) void
        };
        self.dataError = function( hasError ) {
        // FUNCTION: dataError( boolean: hasError ) void
            
            // create options
            var tabstopOptions = {
                'layer' :   'data',
                'id'    :   ''
            };
            // done create options
            
            // has error
            if( hasError ){
                // mode = insert
                if( self.mode === 'insert' ){
                    // error hide insert button
                    $( '#' + self.buttonOptions['insertId'] ).hide();

                    // set id
                    tabstopOptions['id'] = self.buttonOptions['insertId'];
                    // disable tabstop
                    jsProject.callEvent( 'disableTabStop', tabstopOptions );
                }
                // done mode = insert
                
                // mode = edit
                if( self.mode === 'edit' ){
                    // error hide update button
                    $( '#' + self.buttonOptions['updateId'] ).hide();
                    // set id
                    tabstopOptions['id'] = self.buttonOptions['updateId'];
                    // disable tabstop
                    jsProject.callEvent( 'disableTabStop', tabstopOptions );
                }
                // done mode is edit
            }
            else {
                // mode = insert
                if( self.mode === 'insert' ){
                    // no more error show insert button
                    $( '#' + self.buttonOptions['insertId'] ).show();
                    // set id
                    tabstopOptions['id'] = self.buttonOptions['insertId'];
                    // enable tabstop
                    jsProject.callEvent( 'enableTabStop', tabstopOptions );
                }
                // done mode = insert
                
                // mode = edit
                if( self.mode === 'edit' ){
                    // no more error show update button
                    $( '#' + self.buttonOptions['updateId'] ).show();
                    // set id
                    tabstopOptions['id'] = self.buttonOptions['updateId'];
                    // enable tabstop
                    jsProject.callEvent( 'enableTabStop', tabstopOptions );
                }
                // done mode = edit
            }
            // done has error
            
        // DONE FUNCTION: dataError( boolean: hasError ) void
        };
        self.closeEdit = function( ){
        // FUNCTION: closeEdit( void ) void
        
            // debug info
            self.debug( 'close edit' );
            
            // hide the containers
            $( '#' + self.containerOptions['id'] ).hide();
            // hide the overlay
            $( '#' + self.overlayOptions['id'] ).hide();

            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'data' );
            
            // empty content
            $( '#' + self.contentOptions['id'] ).html( '' );
            
        // DONE FUNCTION: closeEdit( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // get top
            var top = $( '#right' ).position().top + $( '#' + self.layoutId ).position().top;
            // get left
            var left = $( '#right' ).position().left;
            // get width
            var width = $( '#right' ).width();
            // get font width
            var fontWidth = sharesoft.options['fontSize']['value']; 

            // calculate total button width
            var totalButtonWidth = 4;
            totalButtonWidth += 2 * self.buttonOptions['marginLeft'];
            totalButtonWidth += fontWidth * self.buttonContainerOptions['marginLeftInLetters'];
            // done calculate total button width

            // mode = insert
            if( self.mode === 'insert' ){
                // add insert button width
                totalButtonWidth += $( '#' + self.buttonOptions['insertId'] ).outerWidth();
            }
            // done mode = insert
            
            // mode = edit
            if( self.mode === 'edit' ){
                // add update button width
                totalButtonWidth += $( '#' + self.buttonOptions['updateId'] ).outerWidth();
            }
            // done mode = edit
            
            // calculate total button width
            totalButtonWidth += $( '#' + self.buttonOptions['cancelId'] ).outerWidth();
            
            // debug info
            self.debug( 'width: ' + width );
            
            // available width < button container total width
            if( width < totalButtonWidth ){
                // unset button container width
                $( '#' + self.buttonContainerOptions['id'] ).css( 'width', '' );
                
                // mode = insert
                if( self.mode === 'insert' ){
                    // set insert button margin
                    $( '#' + self.buttonOptions['insertId'] ).css( 'margin-left', '0.5em' );
                }
                // done mode = insert
                
                // mode = edit
                if( self.mode === 'edit' ){
                    // set update button margin
                    $( '#' + self.buttonOptions['updateId'] ).css( 'margin-left', '0.5em' );
                }
                // done mode = edit
            }
            else {
                // unset container width
                $( '#' + self.buttonContainerOptions['id'] ).css( 'width', '' );
  
                // mode = insert
                if( self.mode === 'insert' ){
                      // set insert button margin
                  $( '#' + self.buttonOptions['insertId'] ).css( 'margin-left', fontWidth * self.buttonContainerOptions['marginLeftInLetters'] + 'px' );
                }
                // done mode = insert
                
                // mode = edit
                if( self.mode === 'edit' ){
                    // set update button margin left
                    $( '#' + self.buttonOptions['updateId'] ).css( 'margin-left', fontWidth * self.buttonContainerOptions['marginLeftInLetters'] + 'px' );
                }
                // done mode = edit
            }
            // done available width < button container total width
            
            // set container position and dimensions
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            $( '#' + self.containerOptions['id'] ).width( $( '#right' ).width() );
            $( '#' + self.containerOptions['id'] ).height( $( '#right' ).height() );
            // done set container position and dimensions

            // calculate data content height
            var height = $( '#right' ).height();
            height -= $( '#' + self.headerOptions['id'] ).outerHeight();
            height -= $( '#' + self.buttonContainerOptions['id'] ).outerHeight();
            height --;
            // calculate data content height
            
            // calculate message position
            width = ( $( '#' + self.containerOptions['id'] ).width() / 3 ) * 2;
            $( '#' + self.messageOptions['id'] ).width( width );
            left = ( $( '#' + self.containerOptions['id'] ).width() - $( '#' + self.messageOptions['id'] ).width() ) / 2; 
            top = ( $( '#' + self.containerOptions['id'] ).height() - $( '#' + self.messageOptions['id'] ).height() ) / 2; 
            $( '#' + self.messageOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.messageOptions['id'] ).css( 'left', left + 'px' );
            // done calculate message position
            
            // set data content heights
            $( '#' + self.contentOptions['id'] ).height( height );
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
        
            // debug info
            self.debug( 'update colors' );
            // container
            $( '#' + self.containerOptions['id'] ).css( 'background-color', sharesoft.colors['editBackgroundColor']['color'] );
            
            // header
            $( '#' + self.headerOptions['id'] ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.headerOptions['id'] ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
            $( '#' + self.headerOptions['id'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            // done header

            // button container
            $( '#' + self.buttonContainerOptions['id'] ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.buttonContainerOptions['id'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            // done  button container

            // buttons
            self.updateButtonColors();
            
            // message
            $( '#' + self.messageOptions['id'] ).css( 'color', sharesoft.colors['commonColor']['color'] );
            $( '#' + self.messageOptions['id'] ).css( 'background-color', sharesoft.colors['dialogBackgroundColor']['color'] );
            $( '#' + self.messageOptions['id'] ).css( 'border-color', sharesoft.colors['errorDialogBorderColor']['color'] );
            // message

        // DONE FUNCTION: updateColors( void ) void
        };
        self.updateButtonColors = function( ) {
        // FUNCTION: updateButtonColors( void ) void
        
            // mode = insert
            if( self.mode === 'insert' ){
                // insert button
                $( '#' +  self.buttonOptions['insertId'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
                $( '#' +  self.buttonOptions['insertId'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
                $( '#' +  self.buttonOptions['insertId'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
                // done insert button
            }
            // done mode = insert
            
            // mode = edit
            if( self.mode === 'edit' ){
                // update button
                $( '#' +  self.buttonOptions['updateId'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
                $( '#' +  self.buttonOptions['updateId'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
                $( '#' +  self.buttonOptions['updateId'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
                // done update button
            }
            // done mode = insert

            // cancel button
            $( '#' +  self.buttonOptions['cancelId'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' +  self.buttonOptions['cancelId'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
            $( '#' +  self.buttonOptions['cancelId'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            // done cancel button

        // DONE FUNCTION: updateButtonColors( void ) void
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
        };
        // DONE PUBLIC
    };
    // DONE MODULE: dataContainerModule( void ) void
})( sharesoft );
// done create module function
