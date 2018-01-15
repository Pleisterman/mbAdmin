/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/errors/errorDialogModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          this module creates an error dialog.
 *          an error can be displayed with a close button
 *          a critical error can be displayed, this dialog can not be closed
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

    // MODULE: errorDialogModule( void ) void 
    
    pleisterman.errorDialogModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'errorDialogModule';                              // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.visible = false;                                           // boolean: visible
        self.errorLayerOptions = {                                      // json: error layer options
            'id'                    :   self.MODULE + 'Layer',          // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'top'                   :   0,                              // css top
            'left'                  :   0,                              // css left
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%',                         // css style width
            'backgroundColor'       :   pleisterman.colors['errorOverlayBackgroundColor']['color'], // css color: background color    
            'zIndex'                :   pleisterman.getSetting( 'zIndexErrorLayer' ).toString()     // css z-index
        };                                                              // done json: error layer options
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
            'text'                  :   pleisterman.translations['errorHeader'],              // string: text
            'fontSize'              :   pleisterman.getSetting( 'dialogHeaderFontSize' ),     // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogHeaderFontWeight' ),   // css font weight
            'color'                 :   pleisterman.colors['errorDialogHighlightColor']['color'],  // css color: color
            'marginLeft'            :   pleisterman.getSetting( 'dialogHeaderMarginLeft' ),   // css margin left
            'marginBottom'          :   pleisterman.getSetting( 'dialogHeaderMarginBottom' ), // css margin right
            'padding'               :   pleisterman.getSetting( 'dialogHeaderPadding' )       // css padding
        };                                                              // done json: header options
        self.errorContainerOptions = {                                  // json: error container options
            'id'                    :   self.MODULE + 'DialogMessageContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
        };                                                              // done json: error container options    
        self.errorOptions = {                                           // json: error options
            'id'                    :   self.MODULE + 'DialogMessage',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'color'                 :   pleisterman.colors['errorDialogColor']['color'],        // css color: color 
            'fontSize'              :   pleisterman.getSetting( 'dialogMessageFontSize' ),    // css font size       
            'fontWeight'            :   pleisterman.getSetting( 'dialogMessageFontWeight' ),  // css font weight
            'marginLeft'            :   pleisterman.getSetting( 'dialogMessageMarginLeft' ),  // css margin left
            'paddingLeft'           :   pleisterman.getSetting( 'dialogMessagePaddingLeft' ), // css padding left
            'paddingRight'          :   pleisterman.getSetting( 'dialogMessagePaddingRight' ), // css margin right
            'marginBottom'          :   '2.3em'                         // css margin bottom
        };                                                              // done json: error options
        self.buttonContainerOptions = {                                 // json: button contianer options
            'id'                    :   self.MODULE + 'DialogButtonContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'block',                        // css display
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button contianer options
        self.buttonOptions = {                                          // json: button options
            'id'                    :   self.MODULE + 'CloseButton',    // string: element id
            'element'               :   'div',                          // string html element type 
            'text'                  :   pleisterman.translations['ok'],     // string: text
            'color'                 :   pleisterman.colors['errorDialogButtonColor']['color'],           // css color: color 
            'backgroundColor'       :   pleisterman.colors['errorDialogButtonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'buttonFontSize' ),                      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'buttonFontWeight' ),                    // css font weight
            'padding'               :   pleisterman.getSetting( 'dialogButtonPadding' ),                 // css padding   
            'marginTop'             :   pleisterman.getSetting( 'dialogButtonMarginTop' ),               // css margin top   
            'marginBottom'          :   pleisterman.getSetting( 'dialogButtonMarginBottom' ),            // css margin bottom
            'marginLeft'            :   '4em',                          // css margin left
            'marginRight'           :   '4em',                          // css margin right
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),                  // css border width
            'borderColor'           :   pleisterman.colors['errorDialogButtonBorderColor']['color'],    // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),                  // css border style
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),                 // css border radius
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

            // add the extensions to pleisterman
            self.addApplicationsExtensions();

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show error
            pleisterman.showError = self.showError;
            // add show criticalk error
            pleisterman.showCriticalError = self.showCriticalError;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add error layer
            $( document.body ).append( jsProject.jsonToElementHtml( self.errorLayerOptions ) );

            // add the dialog
            $( '#' + self.errorLayerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dialogOptions ) );
            
            // add the scroll container
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.scrollContainerOptions ) );

            // add header container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerContainerOptions ) );

            // add header 
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // add message container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorContainerOptions ) );
            
            // add message 
            $( '#' + self.errorContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorOptions ) );
                
            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );

            // add close button
            $( '#'  + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add button events
            $( '#' + self.buttonOptions['id'] ).mouseover( function( event ){ self.buttonMouseOver( this ); }); 
            $( '#' + self.buttonOptions['id'] ).mouseout( function( event ){ self.buttonMouseOut( this ); }); 
            $( '#' + self.buttonOptions['id'] ).click( function( event ){ self.close( ); }); 
            // done add button events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.buttonMouseOver = function(  ){ 
        // FUNCTION: buttonMouseOver( void ) void
            
            // mouse over -> background color highlight
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['errorDialogButtonBackgroundHighlightColor']['color'] );
            // mouse over -> color highlight
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['errorDialogButtonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( void ) void
        };
        self.buttonMouseOut = function( ){
        // FUNCTION: buttonMouseOut( void ) void
        
            // is selected
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonOptions['id'] ){
                // keep selected
                return;
            }
            // done is selected
            
            // mouse out -> background color default
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['errorDialogButtonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['errorDialogButtonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( string: element id ) void
        };
        self.addOkTabStop = function(){
        // FUNCTION: addOkTabStop( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['id'],
                'layer'     :   'error',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.close
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addOkTabStop( void ) void
        };
        self.close = function( ){
        // FUNCTION: close( void ) void
            
            // hide the dialog
            self.hide( );
            
            // has callback
            if( self.options && self.options['closeCallback'] ){
                // call callback
                self.options['closeCallback']( );
                self.options = null;
            }
            // done has callback
            
        // DONE FUNCTION: close( void ) void
        };
        self.showError = function( errorId ){
        // FUNCTION: showError( string: errorId ) void
        
            // set header text
            $( '#' + self.headerOptions['id'] ).html( pleisterman.translations['errorHeader'] );
            // show close button
            $( '#' + self.buttonOptions['id'] ).show();
            
            // add ok button tabstop
            self.addOkTabStop();
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'error' );

            // get the error message
            pleisterman.getError( errorId, self.show );  
            
        // DONE FUNCTION: showError( string: errorId, json: optiond ) void
        };
        self.showCriticalError = function( errorId ){
        // FUNCTION: showCriticalError( string: errorId ) void
        
            // set header text
            $( '#' + self.headerOptions['id'] ).html( pleisterman.translations['criticalErrorHeader'] );
            // hide close button
            $( '#' + self.buttonOptions['id'] ).hide();
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'error' );

            // get the error message
            pleisterman.getError( errorId, self.show );  
            
        // DONE FUNCTION: showCriticalError( string: errorId ) void
        };
        self.show = function( error ){
        // FUNCTION: show( string: error ) void
        
            // debug info
            self.debug( 'show error: ' + error );
            
            // show error
            $( '#' + self.errorOptions['id'] ).html( error );
            // show dialog
            $( '#' + self.errorLayerOptions['id'] ).show( );
            // set visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( string: error ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // hide overlay
            $( '#' + self.errorLayerOptions['id'] ).hide( );
            $( '#' + self.errorOptions['id'] ).html( '' );
            // remember visibility
            self.visible = false;
            // unregeister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'error' );
            
        // DONE FUNCTION: hide( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // !visible
            if( !self.visible ){
                return;
            }
            // done !visible
            
            // set dimensions for loginDialog
            $( '#' + self.dialogOptions['id'] ).css( 'max-width', $( '#layout' ).width() );
            $( '#' + self.dialogOptions['id'] ).css( 'max-height', $( '#layout' ).height() );
            // done set dimensions for loginDialog

            // calculate and set height off the scrollcontainer
            var height = $( '#layout' ).height();
            height -= self.scrollContainerOptions['margin'] * 2;
            height -= self.scrollContainerOptions['maximumMargin']; 
            $( '#' + self.scrollContainerOptions['id'] ).css( 'height', self.scrollContainerOptions['styleHeight'] );
            var totalContainerHeight = $( '#' + self.scrollContainerOptions['id'] ).height();
            totalContainerHeight += $( '#' + self.errorContainerOptions['id'] ).height();
            if(  totalContainerHeight > height ){
                $( '#' + self.scrollContainerOptions['id'] ).height( height );
            }
            else {
                $( '#' + self.scrollContainerOptions['id'] ).height( totalContainerHeight );
            }
            // done calculate and set height off the scrollcontainer
            
            // set position for dialog
            var top = ( $( '#layout' ).height() - $( '#' + self.dialogOptions['id'] ).height() ) / 2;
            var left = ( $( '#layout' ).width() - $( '#' + self.dialogOptions['id'] ).width() ) / 2;
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );
            // done set position for dialog
            
        // DONE FUNCTION: layoutChange( void ) void
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
    // DONE MODULE: errorDialogModule( void ) void 
})( pleisterman );
// done create module function
