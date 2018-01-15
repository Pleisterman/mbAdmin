/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/info/infoDialogModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          this module controls the dialog for showing
 *          about information 
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

    // MODULE: infoDialogModule( function: getTextCallback ) void 
    
    sharesoft.infoDialogModule = function( getTextCallback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'infoDialogModule';                               // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.getTextCallback = getTextCallback;                         // function: getTextCallback  
        self.options = null;                                            // object
        self.visible = false;                                           // boolean
        self.layerOptions = {                                           // json: help layer options
            'id'                    :   self.MODULE + 'Layer',          // string: element id
            'element'               :   'div',                          // string: html element type
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'top'                   :   0,                              // css top
            'left'                  :   0,                              // css left
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%',                         // css style width
            'backgroundColor'       :   sharesoft.colors['overlayBackgroundColor']['color'],    // css color: background color    
            'zIndex'                :   sharesoft.getSetting( 'zIndexMessageLayer' ).toString() // css z-index
        };                                                              // done json: help layer options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   self.MODULE + 'Dialog',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'hidden',                       // css overflow
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '44em',                         // relative size
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
            'text'                  :   sharesoft.translations['infoHeader'],               // string: text
            'fontSize'              :   sharesoft.getSetting( 'dialogHeaderFontSize' ),     // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogHeaderFontWeight' ),   // css font weight
            'color'                 :   sharesoft.colors['errorDialogHighlightColor']['color'],  // css color: color
            'marginLeft'            :   sharesoft.getSetting( 'dialogHeaderMarginLeft' ),   // css margin left
            'marginBottom'          :   sharesoft.getSetting( 'dialogHeaderMarginBottom' ), // css margin right
            'padding'               :   sharesoft.getSetting( 'dialogHeaderPadding' )       // css padding
        };                                                              // done json: header options
        self.textContainerOptions = {                                   // json: text container options
            'id'                    :   self.MODULE + 'TextContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginBottom'          :   '2.9em',                        // css margin bottom
            'minimumHeight'         :   '9.9em'                         // css minimum height
        };                                                              // done json: text container options
        self.textOptions = {                                            // json: text options
            'id'                        :   self.MODULE + 'Text',       // string: element id
            'element'                   :   'div',                      // string: html element type
            'fontSize'              :   sharesoft.getSetting( 'dialogTextFontSize' ),           // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogTextFontWeight' ),         // css font weight
            'marginLeft'            :   sharesoft.getSetting( 'dialogTextMarginLeft' ),         // css margin left
            'paddingLeft'           :   sharesoft.getSetting( 'dialogTextPaddingLeft' ),        // css padding left
            'paddingRight'          :   sharesoft.getSetting( 'dialogTextPaddingRight' )        // css margin right
        };                                                              // done json: text options
        self.buttonContainerOptions = {                                 // json: button contianer options
            'id'                    :   self.MODULE + 'DialogButtonContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button contianer options
        self.buttonOptions = {                                          // json: button options
            'id'                    :   self.MODULE + 'CloseButton',    // string: element id
            'element'               :   'div',                          // string html element type 
            'display'               :   'inline-block',                 // css display style
            'text'                  :   sharesoft.translations['close'],                    // string: text
            'color'                 :   sharesoft.colors['buttonColor']['color'],           // css color: color 
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   sharesoft.getSetting( 'buttonFontSize' ),           // css font size
            'fontWeight'            :   sharesoft.getSetting( 'buttonFontWeight' ),         // css font weight
            'padding'               :   sharesoft.getSetting( 'dialogButtonPadding' ),      // css padding   
            'marginTop'             :   sharesoft.getSetting( 'dialogButtonMarginTop' ),    // css margin top   
            'marginBottom'          :   sharesoft.getSetting( 'dialogButtonMarginBottom' ), // css margin bottom
            'minimumWidth'          :   '6.0em',                        // css minimum width
            'marginLeft'            :   '4em',                          // css margin left
            'marginRight'           :   '4em',                          // css margin right
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'buttonBorderWidth' ),       // css border width
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'],    // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'buttonBorderStyle' ),       // css border style
            'borderRadius'          :   sharesoft.getSetting( 'buttonBorderRadius' ),      // css border radius
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
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
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

            // add text container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.textContainerOptions ) );

            // add text 
            $( '#' + self.textContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.textOptions ) );
            
            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );
                
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add button events
            $( '#' + self.buttonOptions['id'] ).mouseover( function( event ){ self.buttonMouseOver( ); }); 
            $( '#' + self.buttonOptions['id'] ).mouseout( function( event ){ self.buttonMouseOut( ); }); 
            $( '#' + self.buttonOptions['id'] ).click( function( event ){ self.close(); }); 
            // done add button events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['id'],
                'layer'     :   'overlay',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.close
                    },
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['enter'],
                        'type'      :   'default',
                        'function'  :   self.close
                    }
                ]
            };
            // done create tabstop options
            
            // register tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'overlay' );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.buttonMouseOver = function( ){ 
        // FUNCTION: buttonMouseOver( void ) void
            
            // mouse over -> background color highlight
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + self.buttonOptions['id'] ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( void ) void
        };
        self.buttonMouseOut = function( ){
        // FUNCTION: buttonMouseOut( void ) void
        
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonContainerOptions['id'] ){
                // done keep selected
                return;
            }
            
            // mouse out -> background color default
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + self.buttonOptions['id'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( string: element id ) void
        };
        self.close = function( ){ 
        // FUNCTION: close( void ) void
            
            // debug info
            self.debug( 'close' );

            // hide the dialog
            self.hide( );
            
        // DONE FUNCTION: close( void ) void
        };
        self.show = function( ){
        // FUNCTION: show( void ) void
        
            // debug info
            self.debug( 'show ' );
            
            // add tabStops
            self.addTabStops();

            // get text
            self.getTextCallback( self.setText );
            
            // show dialog
            $( '#' + self.layerOptions['id'] ).show( );
            
            // set visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( void ) void
        };
        self.setText = function( text ){
        // FUNCTION: setText( string: text ) void
        
            // set text
            $( '#' + self.textOptions['id'] ).html( text );
            
        // DONE FUNCTION: setText( string: text ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // debug info
            self.debug( 'hide' );

            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'overlay' );
            // hide overlay
            $( '#' + self.layerOptions['id'] ).hide( );
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
            totalContainerHeight += $( '#' + self.textContainerOptions['id'] ).height();
            if(  totalContainerHeight > height ){
                $( '#' + self.scrollContainerOptions['id'] ).height( height );
            }
            else {
                $( '#' + self.scrollContainerOptions['id'] ).height( totalContainerHeight );
            }
            // done calculate and set height off the scrollcontainer

            // calculate and set button positions
            var totalWidth = 0;
            totalWidth += $( '#' + self.buttonOptions['id'] ).outerWidth();
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
            // FUNCTION: show( void ) void
            show    :   function(){
                // call internal show
                self.show();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: infoDialogModule( function: getTextCallback ) void 
})( sharesoft );
// done create module function
