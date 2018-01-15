/* 
 *  Project: MbCommon    
 * 
 *  File: /mbCommon/js/messages/dataOutOfDateDialogModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this file controls the dialog for the data out of date dialog 
 *          for the application sharesoft
 *          the dialog is shown when the user tries to change data that has already
 *          changed in another instance of the application
 *          The dialog present the user a choice between:
 *          close this dialog do nothing
 *          close this dialog open the actual data in the current instance through
 *          the provided callback
 *          close this dialog and open the actual data in a new instance
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

    // MODULE: dataOutOfDateDialogModule( void ) void 
    
    sharesoft.dataOutOfDateDialogModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataOutOfDateDialogModule';                      // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.callback = null;                                           // function: callback
        self.canClose = true;                                           // boolean: can close
        self.visible = false;                                           // boolean: visible
        self.outOfDateLayerOptions = {                                  // json outOfDate layer options
            'id'                    :   self.MODULE + 'Layer',          // string
            'element'               :   'div',                          // string html element type 
            'position'              :   'absolute',                     // css style position
            'display'               :   'none',                         // css display style
            'top'                   :   0,                              // px
            'left'                  :   0,                              // px
            'styleHeight'           :   '100%',                         // css height
            'styleWidth'            :   '100%',                         // css width
            'backgroundColor'       :   sharesoft.colors['overlayBackgroundColor']['color'], 
            'zIndex'                :   sharesoft.getSetting( 'zIndexOutOfDateLayer' ).toString()
        };                                                              // done json outOfDate layer options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   self.MODULE + 'Dialog',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'hidden',                       // css overflow 
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '44em',                         // css style width
            'border'                :   sharesoft.getSetting( 'dialogBorder' ),             // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'dialogBorderWidth' ),        // css border width
            'borderColor'           :   sharesoft.colors['dialogBorderColor']['color'],     // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'dialogBorderStyle' ),        // css border style
            'borderRadius'          :   sharesoft.getSetting( 'dialogBorderRadius' ),       // css border radius
            'backgroundColor'       :   sharesoft.colors['dialogBackgroundColor']['color']  // css color: background color
        };                                                              // done json: dialog options
        self.scrollContainerOptions = {                                 // json: scoll container options
            'id'                    :   self.MODULE + 'DialogScollContainer', // string: element id
            'element'               :   'div',                          // string: html element type 
            'margin'                :   20,                             // css margin
            'overflowY'             :   'auto',                         // css overflow style
            'styleHeight'           :   '14.5em',                       // css style height
            'maximumMargin'         :   50                              // integer: maximum margin
        };                                                              // done json: scoll container options
        self.headerContainerOptions = {                                 // json: header container options
            'id'                    :   self.MODULE + 'DialogHeaderContainer',  // string: element id
            'element'               :   'div'                           // string: html element type 
        };                                                              // done json: header container options    
        self.headerOptions = {                                          // json: header options
            'id'                    :   self.MODULE + 'DialogHeader',   // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   sharesoft.translations['outOfDateHeader'],          // string: text
            'fontSize'              :   sharesoft.getSetting( 'dialogHeaderFontSize' ),     // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogHeaderFontWeight' ),   // css font weight
            'color'                 :   sharesoft.colors['dialogHighlightColor']['color'],  // css color: color
            'marginLeft'            :   sharesoft.getSetting( 'dialogHeaderMarginLeft' ),   // css margin left
            'marginBottom'          :   sharesoft.getSetting( 'dialogHeaderMarginBottom' ), // css margin right
            'padding'               :   sharesoft.getSetting( 'dialogHeaderPadding' )       // css padding
        };                                                              // done json: header options
        self.messageContainerOptions = {                                // json: message container options
            'id'                    :   self.MODULE + 'DialogMessageContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginBottom'          :   '0.8em',                        // css margin bottom
            'minimumHeight'         :   '9.9em'                         // css minimum height
        };                                                              // done json: message container options
        self.messageOptions = {                                         // json: message options
            'id'                    :   self.MODULE + 'DialogMessage',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   sharesoft.translations['outOfDateMessage'],         // string: text
            'fontSize'              :   sharesoft.getSetting( 'dialogMessageFontSize' ),    // css font size    
            'fontWeight'            :   sharesoft.getSetting( 'dialogMessageFontWeight' ),  // css font weight
            'marginLeft'            :   sharesoft.getSetting( 'dialogMessageMarginLeft' ),  // css margin left
            'paddingLeft'           :   sharesoft.getSetting( 'dialogMessagePaddingLeft' ), // css padding left
            'paddingRight'          :   sharesoft.getSetting( 'dialogMessagePaddingRight' ) // css margin right
        };                                                              // done json: message options
        self.buttonContainerOptions = {                                 // json: button contianer options
            'id'                    :   self.MODULE + 'DialogButtonContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button contianer options
        self.buttonOptions = {                                          // json: button options
            'element'               :   'div',                          // string html element type 
            'display'               :   'inline-block',                 // css display style
            'minimumWidth'          :   '4.0em',                        // relative size
            'color'                 :   sharesoft.colors['buttonColor']['color'],           // css color: color
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   sharesoft.getSetting( 'buttonFontSize' ),           // css font size
            'fontWeight'            :   sharesoft.getSetting( 'buttonFontWeight' ),         // css font weight
            'padding'               :   sharesoft.getSetting( 'dialogButtonPadding' ),      // css padding
            'marginTop'             :   sharesoft.getSetting( 'dialogButtonMarginTop' ),    // css margin top
            'marginBottom'          :   sharesoft.getSetting( 'dialogButtonMarginBottom' ), // css margin bottom
            'border'                :   true,                                               // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'buttonBorderWidth' ),        // css border width
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'],     // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'buttonBorderStyle' ),        // css border style
            'borderRadius'          :   sharesoft.getSetting( 'buttonBorderRadius' ),       // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: button options
        self.buttonSpacingOptions = {                                   // json: button spacing options
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'styleWidth'            :   '6.0em'                         // css style width
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
            
            // add show out of date
            sharesoft.showOutOfDateDialog = self.show;
            
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
            
            // add out of date layer
            $( document.body ).append( jsProject.jsonToElementHtml( self.outOfDateLayerOptions ) );

            // add the dialog
            $( '#' + self.outOfDateLayerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dialogOptions ) );
            
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

            // add buttons
            self.addButtons();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // add cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'cancel';
            self.buttonOptions['text'] =  sharesoft.translations['outOfDateCancel'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // add button spacing
            self.buttonSpacingOptions['id'] = self.dialogOptions['id'] + 'spacingcancel';
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonSpacingOptions ) );
            // done add cancel button

            // add cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'openInNewWindow';
            self.buttonOptions['text'] =  sharesoft.translations['outOfDateOpenInNewWindow'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // add button spacing
            self.buttonSpacingOptions['id'] = self.dialogOptions['id'] + 'spacingopenInNewWindow';
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonSpacingOptions ) );
            // done add cancel button

            // add reload button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'reload';
            self.buttonOptions['text'] =  sharesoft.translations['outOfDateReload'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // done add reload button
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add cancel button events
            var idCancel = self.dialogOptions['id'] + 'cancel';
            $( '#' + idCancel ).mouseover( function( event ){ self.buttonMouseOver( idCancel ); }); 
            $( '#' + idCancel ).mouseout( function( event ){ self.buttonMouseOut( idCancel ); }); 
            $( '#' + idCancel ).click( function( event ){ self.cancel(); }); 
            // done add cancel button events

            // add open in new window button events
            var idOpen = self.dialogOptions['id'] + 'openInNewWindow';
            $( '#' + idOpen ).mouseover( function( event ){ self.buttonMouseOver( idOpen ); }); 
            $( '#' + idOpen ).mouseout( function( event ){ self.buttonMouseOut( idOpen ); }); 
            $( '#' + idOpen ).click( function( event ){ self.openInNewWindow(); }); 
            // done add open in new window button events

            // add reload button events
            var id = self.dialogOptions['id'] + 'reload';
            $( '#' + id ).mouseover( function( event ){ self.buttonMouseOver( id ); }); 
            $( '#' + id ).mouseout( function( event ){ self.buttonMouseOut( id ); }); 
            $( '#' + id ).click( function( event ){ self.reload(); }); 
            // done add reload button events
             
        // DONE FUNCTION: addEvents( void ) void
       };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add cancel
            self.addCancelTabStop();
            // add open in new window
            self.addOpenInNewWindowTabStop();
            // add reload
            self.addReloadTabStop();
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.addCancelTabStop = function(){
        // FUNCTION: addCancelTabStop( void ) void
            
            // craete id
            var id = self.dialogOptions['id'] + 'cancel';
            
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
            // create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addCancelTabStop( void ) void
        };
        self.addOpenInNewWindowTabStop = function(){
        // FUNCTION: addOpenInNewWindowTabStop( void ) void
            
            // craete id
            var id = self.dialogOptions['id'] + 'openInNewWindow';
            
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
                        'function'  :   self.openInNewWindow
                    }
                ]
            };
            // create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addOpenInNewWindowTabStop( void ) void
        };
        self.addReloadTabStop = function(){
        // FUNCTION: addReloadTabStop( void ) void
            
            // craete id
            var id = self.dialogOptions['id'] + 'reload';
            
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
                        'function'  :   self.reload
                    }
                ]
            };
            // create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addReloadTabStop( void ) void
        };
        self.buttonMouseOver = function(  id ){ 
        // FUNCTION: buttonMouseOver( string: element id ) void
            
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( string: element id  ) void
        };
        self.buttonMouseOut = function( id ){
        // FUNCTION: buttonMouseOut( string: element id  ) void
            
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
            
        // DONE FUNCTION: buttonMouseOut( string: element id  ) void
        };
        self.cancel = function( ){
        // FUNCTION: cancel( void ) void
            
            // debug info
            self.debug( 'cancel' );
            // hide the dialog
            self.hide( );
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.openInNewWindow = function( ){
        // FUNCTION: openInNewWindow( void ) void
            
            // debug info
            self.debug( 'openInNewWindow' );
            
            // hide the dialog
            self.hide( );
            // open up to date data in new window
            open( '/' + sharesoft.baseDirectory + '/' + sharesoft.workDirectory, '_blank' );
            
        // DONE FUNCTION: openInNewWindow( void ) void
        };
        self.reload = function( ){
         // FUNCTION: reload( void ) void
            
           // debug info
            self.debug( 'reload' );
            // hide the dialog
            self.hide( );
            // open up to date data in this window
            
            // call callback
            if( self.callback ){
                self.callback( );
                self.callback = null;
            }
            // done call callback
            
        // DONE FUNCTION: reload( void ) void
        };
        self.show = function( callback ){
        // FUNCTION: show( function: callback ) void
            
            
            // save callback
            self.callback = callback;
            
            // add tabStops
            self.addTabStops();

            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'message' );

            // show the dialog
            $( '#' + self.outOfDateLayerOptions['id'] ).show( );
            
            // remember visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( function: callback ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // unregeister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'message' );
            // hide layer
            $( '#' + self.outOfDateLayerOptions['id'] ).hide( );
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
            totalWidth += $( '#' + self.dialogOptions['id'] + 'cancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'spacingcancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'openInNewWindow' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'spacingopenInNewWindow' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'reload' ).outerWidth();
            var margin = ( $( '#' + self.scrollContainerOptions['id'] ).width() - totalWidth ) / 2;
            $( '#' + self.dialogOptions['id'] + 'cancel' ).css( 'marginLeft', margin + 'px' );
            // done calculate and set button positions
        
        
            // set position for dialog
            var top = ( $( '#layout' ).height() - $( '#' + self.dialogOptions['id'] ).height() ) / 2;
            var left = ( $( '#layout' ).width() - $( '#' + self.dialogOptions['id'] ).width() ) / 2;
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );
            // done set position for dialog
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update dialog colors
            self.dialogOptions['backgroundColor'] =  sharesoft.colors['dialogBackgroundColor']['color'];
            self.dialogOptions['borderColor'] =  sharesoft.colors['dialogBorderColor']['color'];
            $( '#' + self.dialogOptions['id'] ).css( 'background-color', sharesoft.colors['dialogBackgroundColor']['color'] );
            $( '#' + self.dialogOptions['id'] ).css( 'border-color', sharesoft.colors['dialogBorderColor']['color'] );
            // done update dialog colors

            // update header colors
            self.headerOptions['color'] =  sharesoft.colors['dialogHighlightColor']['color'];
            $( '#' + self.headerOptions['id'] ).css( 'color', sharesoft.colors['dialogHighlightColor']['color'] );
            // done update header colors
            
            // update button colors
            self.buttonOptions['backgroundColor'] =  sharesoft.colors['buttonBackgroundColor']['color'];
            self.buttonOptions['color'] =  sharesoft.colors['buttonColor']['color'];
            self.buttonOptions['borderColor'] =  sharesoft.colors['buttonBorderColor']['color'];
            
            var id = self.dialogOptions['id'] + 'cancel';
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            $( '#' + id ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
            
            id = self.dialogOptions['id'] + 'openInNewWindow';
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            $( '#' + id ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );

            id = self.dialogOptions['id'] + 'reload';
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            $( '#' + id ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
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
    // DONE MODULE: dataOutOfDateDialogModule( void ) void 
})( sharesoft );
// done create module function
