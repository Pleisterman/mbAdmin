/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/help/helpDialogModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          this module controls the dialog for showing
 *          help information 
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

    // MODULE: helpDialogModule( void ) void 
    
    sharesoft.helpDialogModule = function( getSubject ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'helpDialogModule';                               // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.getSubject = getSubject;                                   // function: getSubject
        self.subjectListModule = null;                                  // module: subjects list module
        self.textModule = null;                                         // module: text module
        self.visible = false;                                           // boolean: visible
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
            'styleWidth'            :   '64em',                         // relative size
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
            'styleHeight'           :   '34.5em',                       // css style height
            'maximumMargin'         :   50                              // integer: maximum margin
        };                                                              // done json: scoll container options
        self.headerContainerOptions = {                                 // json: header container options
            'id'                    :   self.MODULE + 'DialogHeaderContainer',  // string: element id
            'element'               :   'div'                           // string: html element type 
        };                                                              // done json: header container options    
        self.headerOptions = {                                          // json: header options
            'id'                    :   self.MODULE + 'DialogHeader',   // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   sharesoft.translations['errorHeader'],              // string: text
            'fontSize'              :   sharesoft.getSetting( 'dialogHeaderFontSize' ),     // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogHeaderFontWeight' ),   // css font weight
            'color'                 :   sharesoft.colors['errorDialogHighlightColor']['color'],  // css color: color
            'marginLeft'            :   sharesoft.getSetting( 'dialogHeaderMarginLeft' ),   // css margin left
            'marginBottom'          :   sharesoft.getSetting( 'dialogHeaderMarginBottom' ), // css margin right
            'padding'               :   sharesoft.getSetting( 'dialogHeaderPadding' )       // css padding
        };                                                              // done json: header options
        self.helpContainerOptions = {                                   // json: help container options
            'id'                    :   self.MODULE + 'HelpContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginBottom'          :   '2.9em',                        // css margin bottom
            'minimumHeight'         :   '22.5em'                        // css minimum height
        };                                                              // done json: help container options
        self.helpSubjectsContainerOptions = {                           // json help subject container options
            'id'                    :   self.MODULE + 'HelpSubjectsContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display 
            'overflow'              :   'auto',                         // css overflow
            'styleWidth'            :   '15.0em',                       // css style width
            'minimumHeight'         :   '22.5em',                       // css minimum height
            'marginRight'           :   '1.2em',                        // css margin rigth
            'border'                :   true,                           // boolean: has border option
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.0em'                         // css border radius
        };                                                              // done json help subject container options
        self.helpTextContainerOptions = {                               // json help text container options
            'id'                    :   self.MODULE + 'HelpTextContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'minimumWidth'          :   '35.9em',                       // css minimum width
            'verticalAlign'         :   'top',                          // css vertical align
            'styleHeight'           :   '22.5em',                       // css style height
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.0em'                         // css border radius
        };                                                              // done json help text container options
        self.buttonContainerOptions = {                                 // json: button contianer options
            'id'                    :   self.MODULE + 'DialogButtonContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button contianer options
        self.buttonOptions = {                                          // json: button options
            'id'                    :   self.MODULE + 'CloseButton',    // string: element id
            'element'               :   'div',                          // string html element type 
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
            
            // create subjects list 
            self.subjectListModule = new sharesoft.helpDialogSubjectListModule( self.helpSubjectsContainerOptions['id'], self.subjectListCallback );
            
            // create subjects list 
            self.textModule = new sharesoft.helpDialogTextModule( self.helpTextContainerOptions['id'] );
            
            // set header text
            self.getSubject( 'overview', self.textModule.setText  );
            
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

            // add help container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.helpContainerOptions ) );

            // add help subjects container
            $( '#' + self.helpContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.helpSubjectsContainerOptions ) );
            
            // add help text container
            $( '#' + self.helpContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.helpTextContainerOptions ) );

            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );
                
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add events
            $( '#' + self.buttonOptions['id'] ).mouseover( function( event ){ self.buttonMouseOver( ); }); 
            $( '#' + self.buttonOptions['id'] ).mouseout( function( event ){ self.buttonMouseOut( ); }); 
            $( '#' + self.buttonOptions['id'] ).click( function( event ){ self.close(); }); 
            // done add events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add subject list tabstops
            self.subjectListModule.addTabstops();

            // add text tabstops
            self.textModule.addTabstops();

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
        
            // is selected
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonContainerOptions['id'] ){
                // done keep selected
                return;
            }
            // done is selected
            
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

            // show dialog
            $( '#' + self.layerOptions['id'] ).show( );
            
            // set visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( void ) void
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
        self.subjectListCallback = function( subjectId ) {
        // FUNCTION: subjectListCallback( string: subjectId ) void
            
            // debug info
            self.debug( 'subjectListCallback subjectId: ' + subjectId );
            
            // set header text
            self.getSubject( subjectId, self.textModule.setText  ); 
            
        // DONE FUNCTION: subjectListCallback( string: subjectId ) void
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
            
            // update subjects contianer colors
            $( '#' + self.helpSubjectsContainerOptions['id'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            self.helpSubjectsContainerOptions['borderColor'] = sharesoft.colors['panelBorderColor']['color'];
            // done update subjects contianer colors
            
            // update text contianer colors
            $( '#' + self.helpTextContainerOptions['id'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            self.helpTextContainerOptions['borderColor'] = sharesoft.colors['panelBorderColor']['color'];
            // done update text contianer colors
            
            // update button colors
            $( '#' + self.buttonOptions['id'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
            self.buttonOptions['borderColor'] = sharesoft.colors['buttonBorderColor']['color'];
            $( '#' + self.buttonOptions['id'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            self.buttonOptions['color'] = sharesoft.colors['buttonColor']['color'];
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            self.buttonOptions['backgroundColor'] = sharesoft.colors['buttonBackgroundColor']['color'];
            // done button contianer colors
            
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
    // DONE MODULE: helpDialogModule( void ) void 
})( sharesoft );
// done create module function
