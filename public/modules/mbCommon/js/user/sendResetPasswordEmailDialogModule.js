/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/user/sendResetPasswordEmailDialogModule.js
 *  
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
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

    // MODULE: sendResetPasswordEmailDialogModule( function: callback ) void
    
    sharesoft.sendResetPasswordEmailDialogModule = function( callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'sendResetPasswordEmailDialogModule';             // string: MODULE
        self.debugOn = true;                                            // boolean: debug on
        self.callback = callback;                                       // function: callback
        self.visible = false;                                           // boolean: visible
        self.layerOptions = {                                           // json: layer options
            'id'                    :   self.MODULE + 'Layer',          // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'top'                   :   0,                              // css top
            'left'                  :   0,                              // css left
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%',                         // css style width
            'backgroundColor'       :   sharesoft.colors['overlayBackgroundColor']['color'], 
            'zIndex'                :   sharesoft.getSetting( 'zIndexMessageLayer' ).toString()
        };                                                              // done json: layer options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   self.MODULE + 'Dialog',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'hidden',                       // css overflow
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '54em',                         // css style width
            'border'                :   sharesoft.getSetting( 'dialogBorder' ),                 // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'dialogBorderWidth' ),            // css border width
            'borderColor'           :   sharesoft.colors['dialogBorderColor']['color'],         // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'dialogBorderStyle' ),            // css border style
            'borderRadius'          :   sharesoft.getSetting( 'dialogBorderRadius' ),           // css border radius
            'backgroundColor'       :   sharesoft.colors['dialogBackgroundColor']['color']      // css color: background color
        };                                                              // done json: dialog options
        self.scrollContainerOptions = {                                 // json: scroll container options                     
            'id'                    :   self.MODULE + 'DialogScollContainer', // string: element id
            'element'               :   'div',                          // string: html element type  
            'margin'                :   20,                             // css margin
            'overflowY'             :   'auto',                         // css overflow-y
            'styleHeight'           :   '15.5em',                       // css style height
            'maximumMargin'         :   50                              // integer: maximum margin
        };                                                              // done json: scroll container options 
        self.headerContainerOptions = {                                 // json: header container options
            'id'                    :   self.MODULE + 'DialogHeaderContainer',  // string
            'element'               :   'div'                           // string html element type 
        };                                                              // done json: header container options  
        self.headerOptions = {                                          // json: header options  
            'id'                    :   self.MODULE + 'DialogHeader',   // string: element id
            'element'               :   'div',                          // string html element type 
            'text'                  :   sharesoft.translations['sendResetPasswordEmailHeader'], // string: text
            'fontSize'              :   sharesoft.getSetting( 'dialogHeaderFontSize' ),         // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogHeaderFontWeight' ),       // css font weight
            'color'                 :   sharesoft.colors['dialogHighlightColor']['color'],      // css color: color
            'marginLeft'            :   sharesoft.getSetting( 'dialogHeaderMarginLeft' ),       // css margin left
            'marginBottom'          :   sharesoft.getSetting( 'dialogHeaderMarginBottom' ),     // css margin top
            'padding'               :   sharesoft.getSetting( 'dialogHeaderPadding' )           // css padding
        };                                                              // done json: header options  
        self.messageContainerOptions = {                                // json: message container options  
            'id'                    :   self.MODULE + 'DialogMessageContainer',   // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginTop'             :   '1.2em',                        // css margin bottom
            'marginBottom'          :   '1.2em',                        // css margin bottom
            'minimumHeight'         :   '4.9em'                         // css style height
        };                                                              // done json: message container options              
        self.messageOptions = {                                         // json: message options        
            'id'                    :   self.MODULE + 'DialogMessage',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'fontSize'              :   sharesoft.getSetting( 'dialogMessageFontSize' ),        // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogMessageFontWeight' ),      // css font weight 
            'marginLeft'            :   sharesoft.getSetting( 'dialogMessageMarginLeft' ),      // css margin left
            'paddingLeft'           :   sharesoft.getSetting( 'dialogMessagePaddingLeft' ),     // css padding left
            'paddingRight'          :   sharesoft.getSetting( 'dialogMessagePaddingRight' )     // css padding right
        };                                                              // done json: message options                    
        self.contentOptions = {                                         // json: content options  
            'id'                    :   self.MODULE + 'Content',        // string: element id
            'element'               :   'div',                          // string: html element type 
            'styleHeight'           :   '2.5em'                         // css style height
        };                                                              // done json: content options  
        self.itemOptions = {                                            // json: item options  
            'id'                    :   self.MODULE + 'ItemEmail',       // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'block',                        // css display
            'padding'               :   sharesoft.getSetting( 'dataEditItemPadding' ),          // css padding
            'marginTop'             :   sharesoft.getSetting( 'dataEditItemMarginTop' ),        // css margin top
            'marginLeft'            :   sharesoft.getSetting( 'dataEditItemMarginLeft' ),       // css margin left
            'marginRight'           :   '2.1em',                        // css margin right
            'backgroundColor'       :   sharesoft.colors['dataItemBackgroundColor']['color'], // css color: background color
            'borderRadius'          :   sharesoft.getSetting( 'dataEditBorderRadius' ),       // css border radius
            'cursor'                :   'pointer',                      // css cursor
            'marginBottom'          :   '0.4em'                         // css margin bottom
        };                                                              // done json: item options  
        self.labelOptions = {                                           // json: label options  
            'id'                    :   self.MODULE + 'LabelEmail',     // string: element id
            'text'                  :   sharesoft.translations['email'],// string: text
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css vertical align
            'fontSize'              :   '1.1em',                        // css font size
            'fontWeight'            :   'normal',                       // css font weight    
            'marginRight'           :   '0.6em',                        // css margin rigth
            'styleWidth'            :   '9em',                          // css style width
            'paddingLeft'           :   '2.2em',                        // css padding left
            'marginTop'             :   '0.6em',                        // css margin top
            'marginBottom'          :   '0.6em'                         // css margin bottom
        };                                                              // done json: label options  
        self.inputOptions = {                                           // json: input options  
            'id'                    :   self.MODULE + 'InputEmail',     // string: element id
            'element'               :   'input',                        // string: input type 
            'maxlength'             :   32,                             // integer: html input max length
            'type'                  :   'text',                         // string: input type 
            'paddingLeft'           :   '0.2em',                        // css padding left
            'styleWidth'            :   '25em',                         // css style width
            'display'               :   'inline-block',                 // css display
            'marginLeft'            :   '0.6em',                        // css margin left
            'marginTop'             :   '0.6em',                        // css margin top
            'fontSize'              :   sharesoft.getSetting( 'dataEditInputFontSize' ),      // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataEditInputFontWeight' ),    // css font weight
            'color'                 :   sharesoft.colors['editColor']['color']                // css color: color
        };                                                              // done json: input options  
        self.buttonContainerOptions = {                                 // json: button container options 
            'id'                    :   self.MODULE + 'DialogButtonContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button container options     
        self.buttonOptions = {                                          // json: button options   
            'id'                    :   self.MODULE + 'ok',             // string: element id 
            'text'                  :   sharesoft.translations['refresh'],  // string: text      
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display 
            'minimumWidth'          :   '6.0em',                        // css minimum width
            'color'                 :   sharesoft.colors['buttonColor']['color'],           // css color: color
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'],     // css color: background color    
            'fontSize'              :   sharesoft.getSetting( 'buttonFontSize' ),               // css font size
            'fontWeight'            :   sharesoft.getSetting( 'buttonFontWeight' ),             // css font weight
            'padding'               :   sharesoft.getSetting( 'dialogButtonPadding' ),          // css padding   
            'marginTop'             :   sharesoft.getSetting( 'dialogButtonMarginTop' ),        // css margin top
            'marginBottom'          :   sharesoft.getSetting( 'dialogButtonMarginBottom' ),     // css margin bottom    
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'buttonBorderWidth' ),            // css border width
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'],         // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'buttonBorderStyle' ),            // css border style
            'borderRadius'          :   sharesoft.getSetting( 'buttonBorderRadius' ),           // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: button options     
        self.buttonSpacingOptions = {                                   // json: button spacing options
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'styleWidth'            :   '2.0em'                         // css style width
        };                                                              // done json: button spacing options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
            // add events
            self.addEvents();
            
            // add the extensions to sharesoft
            self.addApplicationsExtensions();

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show message
            sharesoft.showSendResetPasswordEmailDialog = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add message layer
            $( document.body ).append( jsProject.jsonToElementHtml( self.layerOptions ) );

            // add the dialog
            $( '#' + self.layerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dialogOptions ) );

            // add the scroll container
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.scrollContainerOptions ) );
            
            // add header container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerContainerOptions ) );

            // add header 
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // add content
            self.addContent();

            // add message container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageContainerOptions ) );

            // add message 
            $( '#' + self.messageContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageOptions ) );

            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );

            // add buttons
            self.addButtons();

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addContent = function(){
        // FUNCTION: addContent( void ) void
            
            // add content
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.contentOptions ) );
            
            // add email
            self.addEmail();
            
        // DONE FUNCTION: addContent( void ) void
        };
        self.addEmail = function(){
        // FUNCTION: addEmail( void ) void
        
            // add item to content
            $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.itemOptions ) );
            // add label to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
            // add input to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );
            // done add label to item

        // DONE FUNCTION: addEmail( void ) void
        };    
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // add cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'Ok';
            self.buttonOptions['text'] =  sharesoft.translations['ok'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // add button spacing
            self.buttonSpacingOptions['id'] = self.dialogOptions['id'] + 'SpacingCancel';
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonSpacingOptions ) );
            // done add cancel button

            // add cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'Cancel';
            self.buttonOptions['text'] =  sharesoft.translations['cancel'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
                        
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void

            // add events
            $( '#' + self.itemOptions['id'] ).mouseover( function( event ){ self.itemMouseOver( self.itemOptions['id'] ); }); 
            $( '#' + self.itemOptions['id'] ).mouseout( function( event ){ self.itemMouseOut( self.itemOptions['id'] ); }); 
            $( '#' + self.itemOptions['id'] ).click( function( event ){ self.emailClick(); }); 
            // done add events
            
            // add ok button events
            var idOk = self.dialogOptions['id'] + 'Ok';
            $( '#' + idOk ).mouseover( function( event ){ self.buttonMouseOver( idOk ); }); 
            $( '#' + idOk ).mouseout( function( event ){ self.buttonMouseOut( idOk ); }); 
            $( '#' + idOk ).click( function( event ){ self.ok(); }); 
            // done add ok button events
            
            // add cancel button events
            var idCancel = self.dialogOptions['id'] + 'Cancel';
            $( '#' + idCancel ).mouseover( function( event ){ self.buttonMouseOver( idCancel ); }); 
            $( '#' + idCancel ).mouseout( function( event ){ self.buttonMouseOut( idCancel ); }); 
            $( '#' + idCancel ).click( function( event ){ self.cancel(); }); 
            // done add cancel button events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.show = function( ){
        // FUNCTION: show( function: callback ) void
            
            // get message
            sharesoft.getMessage( 'sendResetPasswordEmailMessage', self.getMessageCallback );  
            
        // DONE FUNCTION: show( function: callback ) void
        };
        self.getMessageCallback = function( message ){
        // FUNCTION: getMessageCallback( string: message ) void
            
            // show message
            $( '#' + self.messageOptions['id'] ).html( message );
            // show dialog
            $( '#' + self.layerOptions['id'] ).show( );
            
            // add tab stop
            self.addTabStops();
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'message' );
            
            // set visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: getMessageCallback( string: message ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add email input tabstops
            self.addEmailTabStop();
            // add ok button tabstops
            self.addOkTabStop();
            // add cancel button tabstops
            self.addCancelTabStop();
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.addEmailTabStop = function(){
        // FUNCTION: addEmailTabStop( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.itemOptions['id'],
                'layer'     :   'message',
                'select'    :   self.itemMouseOver,
                'deSelect'  :   self.itemMouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.inputOptions['id']
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addEmailTabStop( void ) void
        };
        self.addOkTabStop = function(){
        // FUNCTION: addOkTabStop( void ) void
            
            // create id
            var id = self.dialogOptions['id'] + 'Ok';
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'message',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.ok
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addOkTabStop( void ) void
        };
        self.addCancelTabStop = function(){
        // FUNCTION: addCancelTabStop( void ) void
            
            // create id
            var id = self.dialogOptions['id'] + 'Cancel';
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'message',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.cancel
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addCancelTabStop( void ) void
        };
        self.itemMouseOver = function( id ){
        // FUNCTION: itemMouseOver( string: element id ) void
            
            // background color highlight
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // color highlight
            $( '#' + id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: itemMouseOver( string: element id ) void
        };
        self.itemMouseOut = function( id ){
        // FUNCTION: itemMouseOut( string: element id ) void
            
            if( jsProject.getValue( 'selected', 'tabStops' ) === id ){
                return;
            }
            
            // background color default
            $( '#' + id ).css( 'background-color', sharesoft.colors['dataItemBackgroundColor']['color'] );
            // color default
            $( '#' + id ).css( 'color', sharesoft.colors['commonColor']['color'] );
            
        // DONE FUNCTION: itemMouseOut( string: element id ) void
        };
        self.buttonMouseOver = function(  id ){ 
        // FUNCTION: buttonMouseOver( void ) void
            
            // debug info
            self.debug( 'buttonMouseOver: ' + id );
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( void ) void
        };
        self.buttonMouseOut = function( id ){
        // FUNCTION: buttonMouseOut( void ) void
            
            // debug info
            self.debug( 'buttonMouseOut: ' + id );
                    self.debug( 'selected: ' + jsProject.getValue( 'selected', 'tabStops' ) );

            // is selected
            if( jsProject.getValue( 'selected', 'tabStops' ) === id ){
                // done keep selected
                return;
            }
            // is selected
            
            // mouse out -> background color default
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( void ) void
        };
        self.emailClick = function( ){ 
        // FUNCTION: emailClick( void ) void
            
            // set tabstop on email input
            jsProject.callEvent( 'selectTabStop', self.itemOptions['id'] );
            
        // DONE FUNCTION: emailClick( void ) void
        };
        self.ok = function( ){ 
        // FUNCTION: ok( void ) void
            
            // debug info
            self.debug( 'ok' );
            
            // set tabstop on email input
            jsProject.callEvent( 'selectTabStop', self.itemOptions['id'] );

            // get email
            var email = $( '#' + self.inputOptions['id'] ).val();
            
            // not validate email syntax
            if( !jsProject.checkEmailSyntax( email ) ){
               
                // show error
                sharesoft.showError( 'invalidEmailAdres' );
            }
            // not validate email syntax
            
            // close dialog
            self.close();
            
            // call callback
            self.callback( email );            
            
        // DONE FUNCTION: ok( void ) void
        };
        self.cancel = function( ){ 
        // FUNCTION: cancel( void ) void
            
            // debug info
            self.debug( 'cancel' );
            
            // close dialog
            self.close();
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.close = function( ){ 
        // FUNCTION: close( void ) void

            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'message' );
            // hide layer
            $( '#' + self.layerOptions['id'] ).hide();
            
        // DONE FUNCTION: close( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // !visible
            if( !self.visible ){
                return;
            }
            // done !visible

            // set dimensions for dialog
            $( '#' + self.dialogOptions['id'] ).css( 'max-width', $( '#layout' ).width() );
            $( '#' + self.dialogOptions['id'] ).css( 'max-height', $( '#layout' ).height() );
            // done set dimensions for dialog
            
            // calculate and set height off the scrollcontainer
            var height = $( '#layout' ).height();
            height -= self.scrollContainerOptions['margin'] * 2;
            height -= self.scrollContainerOptions['maximumMargin']; 
            $( '#' + self.scrollContainerOptions['id'] ).css( 'height', self.scrollContainerOptions['styleHeight'] );
            var totalContainerHeight = $( '#' + self.scrollContainerOptions['id'] ).height();
            totalContainerHeight += $( '#' + self.messageContainerOptions['id'] ).height();
            if(  totalContainerHeight > height ){
                $( '#' + self.scrollContainerOptions['id'] ).height( height );
            }
            else {
                $( '#' + self.scrollContainerOptions['id'] ).height( totalContainerHeight );
            }
            // done calculate and set height off the scrollcontainer

            // calculate and set button positions
            var totalWidth = 0;
            totalWidth += $( '#' + self.dialogOptions['id'] + 'Cancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'SpacingCancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'Ok' ).outerWidth();
            var margin = ( $( '#' + self.scrollContainerOptions['id'] ).width() - totalWidth ) / 2;
            $( '#' + self.dialogOptions['id'] + 'Ok' ).css( 'marginLeft', margin + 'px' );
            // done calculate and set button positions
            
            // set position for messageDialog
            var top = ( $( '#layout' ).height() - $( '#' + self.dialogOptions['id'] ).height() ) / 2;
            var left = ( $( '#layout' ).width() - $( '#' + self.dialogOptions['id'] ).width() ) / 2;
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );
            // done set position for messageDialog
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update dialog colors
            $( '#' + self.dialogOptions['id'] ).css( 'background-color', sharesoft.colors['dialogBackgroundColor']['color'] );
            self.dialogOptions['backgroundColor'] = sharesoft.colors['dialogBackgroundColor']['color'];
            $( '#' + self.dialogOptions['id'] ).css( 'border-color', sharesoft.colors['dialogBorderColor']['color'] );
            self.dialogOptions['borderColor'] = sharesoft.colors['dialogBorderColor']['color'];
            // done update dialog colors

            // update header colors
            $( '#' + self.headerOptions['id'] ).css( 'color', sharesoft.colors['dialogHighlightColor']['color'] );
            self.headerOptions['color'] = sharesoft.colors['dialogHighlightColor']['color'];
            // done update header colors
            
            // update button colors
            self.buttonOptions['color'] = sharesoft.colors['buttonColor']['color'];
            self.buttonOptions['backgroundColor'] = sharesoft.colors['buttonBackgroundColor']['color'];
            self.buttonOptions['borderColor'] = sharesoft.colors['buttonBorderColor']['color'];
            $( '#' + self.buttonOptions['id'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
            // done update button colors
            
        // DONE FUNCTION: updateColors( void ) void
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
        };
        // DONE PUBLIC
    };
    // DONE MODULE: sendResetPasswordEmailDialogModule( function: callback ) void 
})( sharesoft );
// done create module function
