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
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: infoDialogModule( function: getTextCallback ) void 
    
    pleisterman.infoDialogModule = function( getTextCallback ) {
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
            'backgroundColor'       :   pleisterman.colors['overlayBackgroundColor']['color'],    // css color: background color    
            'zIndex'                :   pleisterman.getSetting( 'zIndexMessageLayer' ).toString() // css z-index
        };                                                              // done json: help layer options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   self.MODULE + 'Dialog',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'hidden',                       // css overflow
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '44em',                         // relative size
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
            'text'                  :   pleisterman.translations['infoHeader'],               // string: text
            'fontSize'              :   pleisterman.getSetting( 'dialogHeaderFontSize' ),     // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogHeaderFontWeight' ),   // css font weight
            'color'                 :   pleisterman.colors['errorDialogHighlightColor']['color'],  // css color: color
            'marginLeft'            :   pleisterman.getSetting( 'dialogHeaderMarginLeft' ),   // css margin left
            'marginBottom'          :   pleisterman.getSetting( 'dialogHeaderMarginBottom' ), // css margin right
            'padding'               :   pleisterman.getSetting( 'dialogHeaderPadding' )       // css padding
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
            'fontSize'              :   pleisterman.getSetting( 'dialogTextFontSize' ),           // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogTextFontWeight' ),         // css font weight
            'marginLeft'            :   pleisterman.getSetting( 'dialogTextMarginLeft' ),         // css margin left
            'paddingLeft'           :   pleisterman.getSetting( 'dialogTextPaddingLeft' ),        // css padding left
            'paddingRight'          :   pleisterman.getSetting( 'dialogTextPaddingRight' )        // css margin right
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
            'text'                  :   pleisterman.translations['close'],                    // string: text
            'color'                 :   pleisterman.colors['buttonColor']['color'],           // css color: color 
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'buttonFontSize' ),           // css font size
            'fontWeight'            :   pleisterman.getSetting( 'buttonFontWeight' ),         // css font weight
            'padding'               :   pleisterman.getSetting( 'dialogButtonPadding' ),      // css padding   
            'marginTop'             :   pleisterman.getSetting( 'dialogButtonMarginTop' ),    // css margin top   
            'marginBottom'          :   pleisterman.getSetting( 'dialogButtonMarginBottom' ), // css margin bottom
            'minimumWidth'          :   '6.0em',                        // css minimum width
            'marginLeft'            :   '4em',                          // css margin left
            'marginRight'           :   '4em',                          // css margin right
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),       // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],    // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),       // css border style
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),      // css border radius
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
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.close
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['enter'],
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
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( void ) void
        };
        self.buttonMouseOut = function( ){
        // FUNCTION: buttonMouseOut( void ) void
        
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonContainerOptions['id'] ){
                // done keep selected
                return;
            }
            
            // mouse out -> background color default
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
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
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
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
})( pleisterman );
// done create module function
