/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/user/reLoginDialogModule.js
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

    // MODULE: reLoginDialogModule( void ) void
    
    sharesoft.reLoginDialogModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'reLoginDialogModule';                            // string: MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.options = null;                                            // json: options
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
            'styleWidth'            :   '44em',                         // css style width
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
            'styleHeight'           :   '11.5em',                       // css style height
            'maximumMargin'         :   50                              // integer: maximum margin
        };                                                              // done json: scroll container options 
        self.headerContainerOptions = {                                 // json: header container options
            'id'                    :   self.MODULE + 'DialogHeaderContainer',  // string
            'element'               :   'div'                           // string html element type 
        };                                                              // done json: header container options  
        self.headerOptions = {                                          // json: header options  
            'id'                    :   self.MODULE + 'DialogHeader',   // string: element id
            'element'               :   'div',                          // string html element type 
            'text'                  :   sharesoft.translations['reLoginHeader'],                // string: text
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
            'marginBottom'          :   '2.9em',                        // css margin bottom
            'minimumHeight'         :   '9.9em'                         // css style height
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
            'color'                 :   sharesoft.colors['buttonColor']['color'],               // css color: color
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
            sharesoft.showReLoginDialog = self.showReLoginDialog;
            
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

            // add message container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageContainerOptions ) );

            // add message 
            $( '#' + self.messageContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageOptions ) );
            
            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );

            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add ok button events
            $( '#' + self.buttonOptions['id'] ).mouseover( function( event ){ self.buttonMouseOver( ); }); 
            $( '#' + self.buttonOptions['id'] ).mouseout( function( event ){ self.buttonMouseOut( ); }); 
            $( '#' + self.buttonOptions['id'] ).click( function( event ){ self.ok(); }); 
            // done add ok button events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
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
        self.buttonMouseOut = function(){
        // FUNCTION: buttonMouseOut( void ) void
            
            // is selected
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonOptions['id'] ){
                // done keep selected
                return;
            }
            // is selected
            
            // mouse out -> background color default
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + self.buttonOptions['id'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( void ) void
        };
        self.ok = function( ){ 
        // FUNCTION: ok( void ) void
            
            // debug info
            self.debug( 'ok' );
            // reload application
            open( '/' + sharesoft.baseDirectory + '/' + sharesoft.workDirectory, '_self' );
            
        // DONE FUNCTION: ok( void ) void
        };
        self.showReLoginDialog = function( ){
        // FUNCTION: showReLoginDialog( void ) void
            
            // add tab stop
            self.addTabStops();
            
            // get message
            sharesoft.getMessage( 'reLoginMessage', self.show );  
            
        // DONE FUNCTION: showReLoginDialog( void ) void
        };
        self.show = function( message ){
        // FUNCTION: show( string: message ) void
            
            // debug info
            //self.debug( 'showMessage: ' + message );
            
            // show message
            $( '#' + self.messageOptions['id'] ).html( message );
            // show dialog
            $( '#' + self.layerOptions['id'] ).show( );
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'message' );
            
            // set visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( string: message ) void
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
            var totalWidth = $( '#' + self.buttonOptions['id'] ).outerWidth();
            var margin = ( $( '#' + self.scrollContainerOptions['id'] ).width() - totalWidth ) / 2;
            $( '#' + self.buttonOptions['id'] ).css( 'marginLeft', margin + 'px' );
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
    // DONE MODULE: reLoginDialogModule( void ) void 
})( sharesoft );
// done create module function
