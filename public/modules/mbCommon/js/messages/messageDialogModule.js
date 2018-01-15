/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/messages/messageDialogModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          this file controls the dialog for showing
 *          messages for the application pleisterman
 *          a message dialog is displayed with the message
 *          the dialog can have a close button or
 *          an ok and cancel button
 *          on ok a provided callback is called
 *          on close a provided callback is called
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
( function( pleisterman ){

    // MODULE: messageDialogModule( void ) void 
    
    pleisterman.messageDialogModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'messageDialogModule';                            // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.options = null;                                            // json: options
        self.visible = false;                                           // boolean: visible
        self.messageLayerOptions = {                                    // json: message layer options
            'id'                    :   self.MODULE + 'Layer',          // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'top'                   :   0,                              // css top
            'left'                  :   0,                              // css left
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%',                         // css style width
            'backgroundColor'       :   pleisterman.colors['overlayBackgroundColor']['color'],    // css color: background color
            'zIndex'                :   pleisterman.getSetting( 'zIndexMessageLayer' ).toString() // css z-index
        };                                                              // done json: message layer options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   self.MODULE + 'Dialog',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'hidden',                       // css overflow
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '44em',                         // css style width
            'border'                :   pleisterman.getSetting( 'dialogBorder' ),             // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'dialogBorderWidth' ),        // css border width
            'borderColor'           :   pleisterman.colors['dialogBorderColor']['color'],     // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'dialogBorderStyle' ),        // css border style
            'borderRadius'          :   pleisterman.getSetting( 'dialogBorderRadius' ),       // css border radius
            'backgroundColor'       :   pleisterman.colors['dialogBackgroundColor']['color']  // css color: background color
        };                                                              // done json: dialog options
        self.scrollContainerOptions = {                                 // json: scoll container options
            'id'                    :   self.MODULE + 'DialogScollContainer', // string: element id
            'element'               :   'div',                          // string: html element type 
            'margin'                :   20,                             // css margin
            'overflowY'             :   'auto',                         // css overflow style
            'styleHeight'           :   '11.5em',                       // css style height
            'maximumMargin'         :   50                              // integer: maximum margin
        };                                                              // done json: scoll container options
        self.headerContainerOptions = {                                 // json: header container options
            'id'                    :   self.MODULE + 'DialogHeaderContainer',  // string: element id
            'element'               :   'div'                           // string: html element type 
        };                                                              // done json: header container options    
        self.headerOptions = {                                          // json: header options
            'id'                    :   self.MODULE + 'DialogHeader',   // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   pleisterman.translations['messageHeader'],            // string: text
            'fontSize'              :   pleisterman.getSetting( 'dialogHeaderFontSize' ),     // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogHeaderFontWeight' ),   // css font weight
            'color'                 :   pleisterman.colors['dialogHighlightColor']['color'],  // css color: color
            'marginLeft'            :   pleisterman.getSetting( 'dialogHeaderMarginLeft' ),   // css margin left
            'marginBottom'          :   pleisterman.getSetting( 'dialogHeaderMarginBottom' ), // css margin right
            'padding'               :   pleisterman.getSetting( 'dialogHeaderPadding' )       // css padding
        };                                                              // done json: header options
        self.messageContainerOptions = {                                // json: message container options
            'id'                    :   self.MODULE + 'DialogMessageContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginBottom'          :   '2.9em',                        // css margin bottom
            'minimumHeight'         :   '9.9em'                         // css minimum height
        };                                                              // done json: message container options
        self.messageOptions = {                                         // json: message options
            'id'                    :   self.MODULE + 'DialogMessage',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'fontSize'              :   pleisterman.getSetting( 'dialogMessageFontSize' ),    // css font size       
            'fontWeight'            :   pleisterman.getSetting( 'dialogMessageFontWeight' ),  // css font weight
            'marginLeft'            :   pleisterman.getSetting( 'dialogMessageMarginLeft' ),  // css margin left
            'paddingLeft'           :   pleisterman.getSetting( 'dialogMessagePaddingLeft' ), // css padding left
            'paddingRight'          :   pleisterman.getSetting( 'dialogMessagePaddingRight' ) // css margin right
        };                                                              // done json: message options
        self.buttonContainerOptions = {                                 // json: button contianer options
            'id'                    :   self.MODULE + 'DialogButtonContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button contianer options
        self.buttonOptions = {                                          // json: button options
            'element'               :   'div',                          // string html element type 
            'display'               :   'inline-block',                 // css display 
            'minimumWidth'          :   '6.0em',                        // relative size
            'color'                 :   pleisterman.colors['buttonColor']['color'],           // css color: color
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'buttonFontSize' ),           // css font size
            'fontWeight'            :   pleisterman.getSetting( 'buttonFontWeight' ),         // css font weight
            'padding'               :   pleisterman.getSetting( 'dialogButtonPadding' ),      // css padding
            'marginTop'             :   pleisterman.getSetting( 'dialogButtonMarginTop' ),    // css margin top
            'marginBottom'          :   pleisterman.getSetting( 'dialogButtonMarginBottom' ), // css margin bottom
            'border'                :   true,                                               // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),        // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],     // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),        // css border style    
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),       // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: button options
        self.buttonSpacingOptions = {                                   // json: button spacing options
            'element'               :   'div',                          // string html element type 
            'display'               :   'inline-block',                 // css display 
            'styleWidth'            :   '4.0em'                         // css style width
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
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show message
            pleisterman.showMessage = self.showMessage;
            
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
            $( document.body ).append( jsProject.jsonToElementHtml( self.messageLayerOptions ) );

            // add the dialog
            $( '#' + self.messageLayerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dialogOptions ) );

            // add the scroll container
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.scrollContainerOptions ) );
            
            // add header container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerContainerOptions ) );

            // add header 
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // add message container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageContainerOptions ) );

            // add message 
            $( '#' + self.messageContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageOptions ) );
            
            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );

            self.addButtons();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // add ok button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'ok';
            self.buttonOptions['text'] =  pleisterman.translations['ok'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // add button spacing
            self.buttonSpacingOptions['id'] = self.dialogOptions['id'] + 'spacingok';
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonSpacingOptions ) );
            // done add ok button

            // add cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'cancel';
            self.buttonOptions['text'] =  pleisterman.translations['cancel'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // done add cancel button
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add ok button events
            var okId = self.dialogOptions['id'] + 'ok';
            $( '#' + okId ).mouseover( function( event ){ self.buttonMouseOver( okId ); }); 
            $( '#' + okId ).mouseout( function( event ){ self.buttonMouseOut( okId ); }); 
            $( '#' + okId ).click( function( event ){ self.ok(); }); 
            // done add ok button events
            
            // add cancel button events
            var cancelId = self.dialogOptions['id'] + 'cancel';
            $( '#' + cancelId ).mouseover( function( event ){ self.buttonMouseOver( cancelId ); }); 
            $( '#' + cancelId ).mouseout( function( event ){ self.buttonMouseOut( cancelId ); }); 
            $( '#' + cancelId ).click( function( event ){ self.cancel(); }); 
            // done add cancel button events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add cancel button tabstops
            self.addCancelTabStop();
            // add ok button tabstops
            self.addOkTabStop();
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.addOkTabStop = function(){
        // FUNCTION: addOkTabStop( void ) void
            
            // create id
            var id = self.dialogOptions['id'] + 'ok';
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'message',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
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
            var id = self.dialogOptions['id'] + 'cancel';
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'message',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
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
        self.buttonMouseOver = function(  id ){ 
        // FUNCTION: buttonMouseOver( string: element id ) void
            
            // debug info
            self.debug( 'buttonMouseOver: ' + id );
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( string: element id ) void
        };
        self.buttonMouseOut = function( id ){
        // FUNCTION: buttonMouseOut( string: element id ) void
            
            // is selected
            if( jsProject.getValue( 'selected', 'tabStops' ) === id ){
                self.debug( 'isSelected: ' + id );
                // done keep selected
                return;
            }
            // is selected
            
            // mouse out -> background color default
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( string: element id ) void
        };
        self.ok = function( ){ 
        // FUNCTION: ok( void ) void
            
            // debug info
            self.debug( 'ok' );

            // hide the dialog
            self.hide( );

            // call callback
            if( self.options && self.options['okCallback'] ){
                self.options['okCallback']( self.options['okCallbackParameters'] );
            }
            // done call callback
            
        // DONE FUNCTION: ok( void ) void
        };
        self.cancel = function( ){ 
        // FUNCTION: cancel( void ) void
            
            // debug info
            self.debug( 'cancel' );

            // hide the dialog
            self.hide( );

            // call callback
            if( self.options && self.options['cancelCallback'] ){
                self.options['cancelCallback']( );
            }
            // done call callback
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.showMessage = function( messageId, options ){
        // FUNCTION: showMessage( string: messageId, json: options ) void
            
            // save options
            self.options = options;
            // done save options
            

            // hide / show close button
            if( options['isYesNo'] ){
                self.addTabStops();
                $( '#' + self.dialogOptions['id'] + 'spacingok' ).show();
                $( '#' + self.dialogOptions['id'] + 'cancel' ).show();
                $( '#' + self.dialogOptions['id'] + 'spacingcancel' ).show();
            }
            else {
                self.addOkTabStop();
                $( '#' + self.dialogOptions['id'] + 'cancel' ).hide();
                $( '#' + self.dialogOptions['id'] + 'spacingok' ).hide();
                $( '#' + self.dialogOptions['id'] + 'spacingcancel' ).hide();
            }
            // done hide / show close button
            
            // get message
            pleisterman.getMessage( messageId, self.show );  
            
        // DONE FUNCTION: showMessage( string: messageId, json: options ) void
        };
        self.show = function( message ){
        // FUNCTION: show( string: message ) void
            
            // debug info
            //self.debug( 'showMessage: ' + message );
            
            // show message
            $( '#' + self.messageOptions['id'] ).html( message );
            // show dialog
            $( '#' + self.messageLayerOptions['id'] ).show( );
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'message' );
            
            // set visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( string: message ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // debug info
            self.debug( 'hide' );

            // unregeister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'message' );
            // hide overlay
            $( '#' + self.messageLayerOptions['id'] ).hide( );
            // remember visibility
            self.visible = false;
            
        // DONE FUNCTION: hide( void ) void
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
            if( self.options['isYesNo'] ){
                totalWidth += $( '#' + self.dialogOptions['id'] + 'ok' ).outerWidth();
                totalWidth += $( '#' + self.dialogOptions['id'] + 'spacingok' ).outerWidth();
                totalWidth += $( '#' + self.dialogOptions['id'] + 'cancel' ).outerWidth();
            }
            else {
                totalWidth += $( '#' + self.dialogOptions['id'] + 'ok' ).outerWidth();
            }
            var margin = ( $( '#' + self.scrollContainerOptions['id'] ).width() - totalWidth ) / 2;
            $( '#' + self.dialogOptions['id'] + 'ok' ).css( 'marginLeft', margin + 'px' );
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
            $( '#' + self.dialogOptions['id'] ).css( 'background-color', pleisterman.colors['dialogBackgroundColor']['color'] );
            self.dialogOptions['backgroundColor'] = pleisterman.colors['dialogBackgroundColor']['color'];
            $( '#' + self.dialogOptions['id'] ).css( 'border-color', pleisterman.colors['dialogBorderColor']['color'] );
            self.dialogOptions['borderColor'] = pleisterman.colors['dialogBorderColor']['color'];
            // done update dialog colors

            // update header colors
            $( '#' + self.headerOptions['id'] ).css( 'color', pleisterman.colors['dialogHighlightColor']['color'] );
            self.headerOptions['color'] = pleisterman.colors['dialogHighlightColor']['color'];
            // done update header colors
            
            // update button colors
            self.buttonOptions['color'] = pleisterman.colors['buttonColor']['color'];
            self.buttonOptions['backgroundColor'] = pleisterman.colors['buttonBackgroundColor']['color'];
            self.buttonOptions['borderColor'] = pleisterman.colors['buttonBorderColor']['color'];
            var buttonId = self.dialogOptions['id'] + 'ok';
            $( '#' + buttonId ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            $( '#' + buttonId ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + buttonId ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            buttonId = self.dialogOptions['id'] + 'cancel';
            $( '#' + buttonId ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            $( '#' + buttonId ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + buttonId ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
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
    // DONE MODULE: messageDialogModule( void ) void 
})( pleisterman );
// done create module function
