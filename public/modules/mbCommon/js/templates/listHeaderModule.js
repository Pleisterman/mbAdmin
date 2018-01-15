/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listHeaderModule.js
 * 
 *  Last revision: 04-01-2017
 * 
 *  Purpose: 
 *          this module is a template that creates 
 *          the header for the listModule
 *          the header displays a html div with: 
 *              listOrder button,
 *              search button,
 *              new button, 
 *              text    
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

    // MODULE: listHeaderModule( json: options, function: callback ) void 
    
    sharesoft.listHeaderModule = function( options, callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listHeaderModule';                               // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.options = options;                                         // json: options
        self.callback = callback;                                       // function: callback
        self.headerOptions = {                                          // json: header options
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'visible',                      // css overflow
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'], // css color: background color
            'borderTop'             :   true,                           // boolean: has border top
            'borderBottom'          :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],  // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'padding'               :   '0.0em',                        // css padding
            'paddingTop'            :   '0.2em',                        // css padding top
            'paddingBottom'         :   '0.2em',                        // css padding bottom
            'marginTop'             :   '0.1em',                        // css margin top
            'marginLeft'            :   '0.1em',                        // css margin left
            'cursor'                :   'pointer'                       // css cursor            
        };                                                              // done json: header options
        self.headerTextOptions = {                                      // json: header text options
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css vertical align
            'color'                 :   sharesoft.colors['panelColor']['color'],    // css color: color
            'fontSize'              :   '1.2em',                        // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'textAlign'             :   'left',                         // css text align
            'paddingLeft'           :   '0.6em',                        // css padding left
            'buttonMargin'          :   1.8                             // float: button margin
        };                                                              // done json: header text options
        self.orderModule = null;                                        // module: order module
        self.newModule = null;                                          // module: new module
        self.selectionModule = null;                                    // module: selection module    
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: listHeader: ' + self.options['id'] );
            
            // add the header html
            self.createHeader();
            
            // add the events
            self.addEvents();
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to order up
            jsProject.subscribeToEvent( 'listOrderUp', self.listOrderUp );
            // subscribe update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.createHeader = function(){
        // FUNCTION: createHeader( void ) void
            
            // create header
            self.headerOptions['id'] = 'listHeader' + self.options['id'];
            $( '#list' + self.options['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );


            var textMargin = 0;
            
            // add the Modules
            self.orderModule = new sharesoft.listHeaderOrderModule( self.options['id'] );
            if( self.options['hasHeaderSelection'] ){
                self.selectionModule = new sharesoft.listHeaderSelectionModule( self.options['id'], self.selectionsCallback );
            }
            else {
                textMargin += self.headerTextOptions['buttonMargin'];
            }
            
            if( self.options['hasHeaderNew'] ){
                self.newModule = new sharesoft.listHeaderNewModule( self.options['id'], self.listNewCallback );
            }
            else {
                textMargin += self.headerTextOptions['buttonMargin'];
            }
            // add the Modules

            // add text
            self.headerTextOptions['id'] = 'listHeaderText' + self.options['id']; 
            self.headerTextOptions['text'] = sharesoft.translations[self.options['id']];
            self.headerTextOptions['marginLeft'] = textMargin + 'em';
            $( '#listHeader' + self.options['id'] ).append( jsProject.jsonToElementHtml( self.headerTextOptions ) );
            // done add text
            
        // DONE FUNCTION: createHeader( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            var id = self.headerOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.mouseover( this ); }); 
            $( '#' + id ).mouseout( function( event ){ self.mouseOut( this ); }); 
            $( '#' + id ).click( function( event ){ self.click( this ); }); 
            
        // DONE FUNCTION: addEvents( void ) void
        };
        // header events
        self.mouseover = function( element ){
        // FUNCTION: mouseover( html element: element ) void
            
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + element.id ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: mouseover( html element: element ) void
        };
        ////    double ebtries ////
        self.click = function( element ){
        // FUNCTION: click( html element: element ) void
            
            // get scroll top of the container
            var containerScroll = parseInt( $( '#listsContainer' ).scrollTop() );
            // get top of the container
            var containerTop = parseInt( $( '#listsContainer' ).offset().top  - containerScroll );
            // get height of the container
            var containerHeight = parseInt( $( '#listsContainer' ).innerHeight() );
            // get top of the element
            var top = parseInt( $( '#' + element.id ).offset().top );
            // get bottom of the element
            var bottom = parseInt( top + $( '#' + element.id ).outerHeight() );

            // element to high
            if( top < 0 ){
                // scoll into view
                $( '#listsContainer' ).scrollTop( top );
            }
            // done element to high
            
            // element to low
            if( containerTop + containerHeight < bottom ){
                // calculate difference
                var difference = bottom - ( containerTop + containerHeight );
                // scoll into view
                $( '#listsContainer' ).scrollTop( difference );
            }
            // done element to low
            
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + element.id ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: click( html element: element ) void
        };
        self.click = function( ){
        // FUNCTION: click( void ) void
            
            self.callback( 'header' );
            
        // DONE FUNCTION: click( void ) void
        };
        self.click = function( ){
        // FUNCTION: click( void ) void
            

            // call the callback
            self.callback( 'header' );
            
        // DONE FUNCTION: click( void ) void
        };
        ////    double entries ////
        self.mouseOut = function( element ){
        // FUNCTION: mouseOut( html element: element ) void
            
            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', sharesoft.colors['panelColor']['color'] );
            
        // DONE FUNCTION: mouseOut( html element: element ) void
        };
        self.arrowUp = function(){
        // FUNCTION: arrowUp( void ) void
            
            // de select buttons
            self.orderModule.setSelected( false );
            self.selectionModule.setSelected( false );
            self.newModule.setSelected( false );
            // done de select buttons
            
            // remember deselect
            self.selectedButton = null;

            // call the callback
            self.callback( 'arrowUp' );
            
        // DONE FUNCTION: arrowUp( void ) void
        };
        self.arrowDown = function(){
        // FUNCTION: arrowDown( void ) void
            
            // de select buttons
            self.orderModule.setSelected( false );
            self.selectionModule.setSelected( false );
            self.newModule.setSelected( false );
            // done de select buttons
            
            // remember deselect
            self.selectedButton = null;

            // call callback
            self.callback( 'arrowDown' );
            
        // DONE FUNCTION: arrowDown( void ) void
        };
        self.spacePressed = function( ){
        // FUNCTION: spacePressed( void ) void
            
            // no button selected
            if( !self.selectedButton ){ 
                // call the callback
                self.callback( 'header' );
            }
            // done no button selected
            
            // button selected
            if( self.selectedButton === 'order' ){
                self.orderModule.click();
            }
            if( self.selectedButton === 'selection' ){
                self.selectionModule.click();
            }
            if( self.selectedButton === 'new' ){
                self.newModule.click();
                
            }
            // done button selected
            
        // DONE FUNCTION: spacePressed( void ) void
        };
        self.selectNextButton = function( ){
        // FUNCTION: selectNextButton( void ) void
            
            self.debug( 'selectNextButton' );  
            if( !self.selectedButton ){
                // no selected button
                if( self.orderModule.canbeSelected() ){
                    self.orderModule.setSelected( true );
                    self.selectedButton = 'order';
                }
                else {
                    self.selectionModule.setSelected( true );
                    self.selectedButton = 'selection';
                }
                // done no selected button
            }
            else {
                // already has selected button
                if( self.selectedButton === 'order' ){
                    self.orderModule.setSelected( false );
                    self.selectionModule.setSelected( true );
                    self.selectedButton = 'selection';
                }
                else if( self.selectedButton === 'selection' ){
                    self.selectionModule.setSelected( false );
                    self.newModule.setSelected( true );
                    self.selectedButton = 'new';
                }
                else {
                    self.newModule.setSelected( false );
                    self.selectedButton = null;
                }
                // done already has selected button
            }
            if( self.selectedButton ){
                self.debug( self.selectedButton );
            }
            else {
                self.debug( 'not selected' );
            }
            
        // DONE FUNCTION: selectNextButton( void ) void
        };
        self.selectPreviousButton = function( ){
        // FUNCTION: selectPreviousButton( void ) void
            
            self.debug( 'selectPreviousButton' );  
            if( !self.selectedButton ){
                // no selected button
                self.selectedButton = 'new';
                self.newModule.setSelected( true );
                // done no selected button
            }
            else {
                // already has selected button
                if( self.selectedButton === 'new' ){
                    self.newModule.setSelected( false );
                    self.selectedButton = 'selection';
                    self.selectionModule.setSelected( true );
                }
                else if( self.selectedButton === 'selection' ){
                    self.selectionModule.setSelected( false );
                    if( self.orderModule.canbeSelected() ){
                        self.orderModule.setSelected( true );
                        self.selectedButton = 'order';
                    }
                    else {
                        self.selectedButton = null;
                    }
                }
                else {
                    self.orderModule.setSelected( false );
                    // unset selected
                    self.selectedButton = null;
                }
                // done already has selected button
            }
            if( self.selectedButton ){
                // debug info
                self.debug( self.selectedButton );
            }
            else {
                // debug info
                self.debug( 'not selected' );
            }
            
        // DONE FUNCTION: selectPreviousButton( void ) void
        };
        self.listOrderUp = function(){
        // FUNCTION: listOrderUp( void ) void
            
            if( self.selectedButton === 'order' ){
                if( !self.orderModule.canbeSelected() ){
                    self.selectedButton = null;
                }
            }            
            
        // DONE FUNCTION: listOrderUp( void ) void
        };
        self.listNewCallback = function() {
        // FUNCTION: listNewCallback( void ) void
            
            self.debug( 'listNewCallback' );  
            self.callback( 'new' );
            
        // DONE FUNCTION: listNewCallback( void ) void
        };
        self.selectionsCallback = function( buttonId ){
        // FUNCTION: selectionsCallback( void ) void
            
            self.debug( 'selectionsCallback' + buttonId );  
            // call the callback
            self.callback( 'openListSelection', buttonId );
            
        // DONE FUNCTION: selectionsCallback( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            self.debug( 'update colors' );
            $( '#' + self.headerOptions['id'] ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
            $( '#' + self.headerOptions['id'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            $( '#' + self.headerTextOptions['id'] ).css( 'color', sharesoft.colors['panelColor']['color'] );
            
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
    // DONE MODULE: listHeaderModule( json: options, function: callback  ) void 
})( sharesoft );
// done create module function
