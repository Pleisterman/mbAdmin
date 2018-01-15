/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditColorModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *      displays a color
 *      calls the data color picker 
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

    // MODULE: dataEditColorModule( string: contentId, json: values, boolean: isEdit ) void 
    
    pleisterman.dataEditColorModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditColorModule';                            // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.isEdit = isEdit;                                           // boolean: isEdit    
        self.values = values;                                           // json: values
        self.contentId = contentId;                                     // string: element id
        self.itemContainerOptions = {                                   // json: item container options
            'id'                    :   'itemContainer' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'table',                        // css display
            'padding'               :   pleisterman.getSetting( 'dataEditItemPadding' ),          // css padding
            'marginTop'             :   pleisterman.getSetting( 'dataEditItemMarginTop' ),        // css margin top
            'marginLeft'            :   pleisterman.getSetting( 'dataEditItemMarginLeft' ),       // css margin left
            'backgroundColor'       :   pleisterman.colors['dataItemBackgroundColor']['color'],   // css color: background color
            'rememberBackgroundColor':  '',                             // css color: remember background color
            'borderRadius'          :   pleisterman.getSetting( 'dataEditBorderRadius' ),         // css border radius
            'mouseOver'             :   false,                          // boolean: mouse over
            'cursor'                :   'pointer'                       // css cursor
        };                                                              // done json: item container options
        self.inputContainerOptions = {                                  // json: input container options
            'id'                    :   'inputContainer' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block'                         // css display
        };                                                              // done json: input container options
        self.labelOptions = {                                           // json: label options
            'id'                    :   'dataLabel' + self.values['id'],// string: element id    
            'element'               :   'div',                          // string: html element type
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css vertical align
            'fontSize'              :   pleisterman.getSetting( 'dataEditLabelFontSize' ),        // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditLabelFontWeight' ),      // css font weight
            'marginTop'             :   pleisterman.getSetting( 'dataEditLabelMarginTop' ),       // css margin top    
            'marginRight'           :   pleisterman.getSetting( 'dataEditLabelMarginRight' ),     // css margin height
            'styleWidth'            :   pleisterman.getSetting( 'dataEditLabelWidth' ),           // css style width
            'marginBottom'          :   '0.4em',                        // css margin bottom
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'input',                        // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'readOnly'              :   true,                           // boolean: read only
            'type'                  :   'text',                         // string: text
            'backgroundColor'       :   self.values['value'],           // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'dataEditCheckboxFontSize' ),     // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditCheckboxFontWeight' ),   // css font weight
            'styleWidth'            :   '8.0em',                        // css style width
            'marginTop'             :   pleisterman.getSetting( 'dataEditLabelMarginTop' ),   // css margin top
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   pleisterman.getSetting( 'dataEditBorderRadius' ),
            'cursor'                :   'pointer',                      // css cursor
            'hasFocus'              :   false,                          // boolean: has focus
            'mouseOver'             :   false                           // boolean: mouse over
        };                                                              // done json: input options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // set display options
            self.setDisplayOptions();

            // add html
            self.addHtml();
            
            // remember current display settings
            self.rememberUnselectedDisplay();

            // add events
            self.addEvents();
            
            // add tabstops
            self.addTabStops();

            // event subscriptiona
            self.addEventSubscriptions();
            
            // update display
            self.updateDisplay();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove update colors
            jsProject.unSubscribeFromEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.setDisplayOptions = function( ){
        // FUNCTION: setDisplayOptions( void ) void
            
            // add item options
            if( self.values['displayOptions']['item'] ){
                jQuery.extend( self.itemContainerOptions, self.values['displayOptions']['item'] );
            }
            // done add item options
            
            // add label options
            if( self.values['displayOptions']['label'] ){
                jQuery.extend( self.labelOptions, self.values['displayOptions']['label'] );
            }
            // done label options
            
            // add input options
            if( self.values['displayOptions']['input'] ){
                jQuery.extend( self.inputOptions, self.values['displayOptions']['input'] );
            }
            // done add input options
            
        // DONE FUNCTION: setDisplayOptions( void ) void
        };    
        self.rememberUnselectedDisplay = function(){
        // FUNCTION: rememberUnselectedDisplay( void ) void
            
            // remember item background color
            self.itemContainerOptions['rememberBackgroundColor'] = $( '#' + self.itemContainerOptions['id'] ).css( 'background-color' );
            // remember label color
            self.labelOptions['rememberColor'] = $( '#' + self.labelOptions['id'] ).css( 'color' );
            // remember label font weight
            self.labelOptions['rememberFontWeight'] = $( '#' + self.labelOptions['id'] ).css( 'font-weight' );
            
        // DONE FUNCTION: rememberUnselectedDisplay( void ) void
        };
        self.setSelectedDisplay = function(){
        // FUNCTION: setSelectedDisplay( void ) void
            
            // mouse in -> color highlight
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            // set item background color selected
            $( '#' + self.itemContainerOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // set label color selected
            $( '#' + self.labelOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            // set label font weight selected
            $( '#' + self.labelOptions['id'] ).css( 'font-weight', 'bold' );
            
        // DONE FUNCTION: setSelectedDisplay( void ) void
        };
        self.resetRememberedDisplay = function(){
        // FUNCTION: resetRememberedDisplay( void ) void
            
            // reset item background color
            $( '#' + self.itemContainerOptions['id'] ).css( 'background-color', self.itemContainerOptions['rememberBackgroundColor'] );  
            // reset label color
            $( '#' + self.labelOptions['id'] ).css( 'color', self.labelOptions['rememberColor'] );  
            // reset label font weight
            $( '#' + self.labelOptions['id'] ).css( 'font-weight', self.labelOptions['rememberFontWeight'] );  
            
        // DONE FUNCTION: resetRememberedDisplay( void ) void
        };
        self.addHtml = function( ){
        // FUNCTION: addHtml( void ) void
            
            // add item container to content
            $( '#' + self.contentId ).append( jsProject.jsonToElementHtml( self.itemContainerOptions ) );

            // add input container to item container
            $( '#' + self.itemContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputContainerOptions ) );

            // label
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
  
            // add input to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void
            
            // add item events
            self.additemEvents();
            // add button events
            self.addButtonEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };    
        self.additemEvents = function( ){
        // FUNCTION: addItemEvents( void ) void
            
            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.mouseIn( event ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.mouseOut( event ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.click( event ); } ); 
            // done item events
            
        // DONE FUNCTION: addItemEvents( void ) void
        };    
        self.addButtonEvents = function( ){
        // FUNCTION: addButtonEvents( void ) void
            
            // input events
            $( '#' + self.inputOptions['id'] ).mouseenter( function( event ){ self.mouseIn( ); });
            $( '#' + self.inputOptions['id'] ).mouseleave( function( event ){ self.mouseOut( ); });
            $( '#' + self.inputOptions['id'] ).click( function( event ){ self.click( event ); });
            // done input events
            
        // DONE FUNCTION: addButtonEvents( void ) void
        };
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void
            
            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();
            // remove input events
            $( '#' + self.inputOptions['id'] ).off();
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.inputOptions['id'],
                'layer'     :   'data',
                'select'    :   self.focusIn,
                'deSelect'  :   self.focusOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.openColorPicker
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.mouseIn = function( ){
        // FUNCTION: mouseIn( void ) void
            
            // remember mouse over 
            self.inputOptions['mouseOver'] = true;
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: mouseIn( void ) void
        };        
        self.mouseOut = function( ){
        // FUNCTION: mouseOut( void ) void
            
            // remember mouse out
            self.inputOptions['mouseOver'] = false;
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: mouseOut( void ) void
        };        
        self.click = function( event ){
        // FUNCTION: click( event: event ) void
            
            // debug info
            self.debug( 'click' );
            
            // stop propagation
            event.stopPropagation();
            // set tabstop on input
            jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );
            // open color picker
            self.openColorPicker();
            
        // DONE FUNCTION: click( event: event ) void
        };
        self.focusIn = function( ){
        // FUNCTION: focusIn( void ) void
            
            // debug info
            self.debug( 'focusIn' );
            
            // remember focus in
            self.inputOptions['hasFocus'] = true;
            // show input
            jsProject.scrollElement( self.inputOptions['id'], self.contentId );
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusIn( void ) void
        };
        self.focusOut = function( ){
        // FUNCTION: focusOut( void ) void
            
            // debug info
            self.debug( 'focusOut' );
            
            // remember focus out
            self.inputOptions['hasFocus'] = false;
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusOut( void ) void
        };
        self.openColorPicker = function(){
        // FUNCTION: openColorPicker( void ) void
            
            // color picker is open
            if( self.inputOptions['colorPickerOpen'] ){
                // done already open
                return;
            }
            // done color picker is open
            
            // remember colorPicker open 
            self.inputOptions['colorPickerOpen'] = true;

            // get color
            var color = $( '#' + self.inputOptions['id'] ).css( 'background-color' );  
            // open colorPicker
            pleisterman.showDataColorPicker( self.values['id'], color, self.setColor );
            
        // DONE FUNCTION: openColorPicker( void ) void
        };
        self.updateDisplay = function(  ){ 
        // FUNCTION: updateDisplay( void ) void
            
            // debug info
            self.debug( 'updateDisplay' );
            
            // cursor
            $( '#' + self.inputOptions['id'] ).css( 'cursor', 'pointer' );
            $( '#' + self.itemContainerOptions['id'] ).css( 'cursor', 'pointer' );
            // done cursor
            
            // selected
            if( self.inputOptions['hasFocus'] || self.inputOptions['mouseOver'] || self.inputOptions['colorPickerOpen'] ){
                // debug info
                self.debug( 'has focus' );
                // display selected
                self.setSelectedDisplay();
            }
            else {
                // reset display unselected
                self.resetRememberedDisplay();
            }
            // selected
            
        // DONE FUNCTION: updateDisplay( void ) void
        };
        self.setColor = function( colorChanged ){
        // FUNCTION: setColor( boolean: colorChanged ) void
            
            // color changed
            if( colorChanged ){
                // remember change
                self.change();
            }
            else {
                // reset original color
                $( '#' + self.inputOptions['id'] ).css( 'background-color', self.values['value'] );
            }
            // done color changed
            
            // remember colorPicker close 
            self.inputOptions['colorPickerOpen'] = false;
            
        // DONE FUNCTION: setColor( boolean: colorChanged ) void
        };
        self.change = function( ){
        // FUNCTION: change( void ) void
            
            // if is edit
            if( self.isEdit ){
                // remember change event 
                jsProject.setValue( 'changed', 'data', true );    
            }
            // done if is edit
            
        // DONE FUNCTION: change( void ) void
        };
        self.setData = function( ) {
        // FUNCTION: setData( void ) void
            
            // check for errors
            if( jsProject.getValue( 'hasError', 'data') ){
                // done with error
                return;
            }
            // done check for errors
            
            // get color
            var color = $( '#' + self.inputOptions['id'] ).css( 'background-color' );  
            
            // set data 
            self.values['value'] = color;
            
        // DONE FUNCTION: setData( void ) void
        };
        self.updateColors = function() {
        // FUNCTION: updateColors( void ) void
            
            // item container colors
            $( '#' + self.itemContainerOptions['id'] ).css( 'background-color', pleisterman.colors['dataItemBackgroundColor']['color'] );
            
        // DONE FUNCTION: updateColors( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove event subscription
            self.removeEventSubscriptions();
            
            // remove events
            self.removeEvents();
            
            // remove values link
            self.values = null;
            
        // DONE FUNCTION: destruct( void ) void
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
            // FUNCTION: setData( void ) void
            setData : function(){
                // call internal setData
                self.setData();
            },
            // FUNCTION: destruct( void ) void
            destruct : function(){
                // call internal destruct
                self.destruct();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: dataEditColorModule( string: contentId, json: values, boolean: isEdit ) void 
})( pleisterman );
// done create module function
