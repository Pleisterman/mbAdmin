/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditButtonModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *      Displays a button
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

    // MODULE: dataEditButtonModule( string: contentId, json: values, boolean: isEdit ) void 
    
    pleisterman.dataEditButtonModule = function( contentId, values, isEdit  ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditButtonModule';                           // string:  MODULE
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
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'textAlign'             :   'center',                       // css text align
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'padding'               :   '0.4em',                        // css padding
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),    // css font size
            'lineHeight'            :   pleisterman.getSetting( 'dataEditInputFontSize' ),    // css font line height
            'fontWeight'            :   pleisterman.getSetting( 'dataEditbuttonFontWeight' ), // css font weight
            'color'                 :   pleisterman.colors['buttonColor']['color'],           // css colro: color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),    // css border width    
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'], // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),    // css border style
            'borderRadius'          :   pleisterman.getSetting( 'dataEditBorderRadius' ), // css border radius
            'hasFocus'              :   false,                          // boolean: has focus
            'selectActive'          :   true,                           // boolean: select active    
            'mouseOver'             :   false,                          // boolean: mouse over
            'cursor'                :   'pointer'                       // css cursor            
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
            
            // update colors
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
            
            // input mouse in -> color highlight
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
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
            self.inputOptions['text'] = self.values['value'];
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void
            
            // add item events
            self.addItemEvents();
            // add button events
            self.addButtonEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };    
        self.addItemEvents = function( ){
        // FUNCTION: addItemEvents( void ) void
            
            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.itemMouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.itemMouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ){ self.itemClick( ); });
            // done item events
            
        // DONE FUNCTION: addItemEvents( void ) void
        };    
        self.addButtonEvents = function( ){
        // FUNCTION: addButtonEvents( void ) void
            
            // input button events
            $( '#' + self.inputOptions['id'] ).mouseenter( function( event ){ self.inputMouseIn( ); });
            $( '#' + self.inputOptions['id'] ).mouseleave( function( event ){ self.inputMouseOut( ); });
            $( '#' + self.inputOptions['id'] ).click( function( event ){ self.buttonClick( ); });
            // done input button events
            
        // DONE FUNCTION: addButtonEvents( void ) void
        };
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void
            
            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();
            // remove item events
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
                        'function'  :   self.buttonClick
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.itemMouseIn = function( ){
        // FUNCTION: itemMouseIn( void ) void
            
            // remmeber mouse over 
            self.itemContainerOptions['mouseOver'] = true;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseIn( void ) void
        };        
        self.itemMouseOut = function( id ){
        // FUNCTION: itemMouseOut( void ) void
            
            // rememeber mouse out
            self.itemContainerOptions['mouseOver'] = false;
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseOut( void ) void
        };        
        self.itemClick = function( ){
        // FUNCTION: itemClick( void ) void
            
            // debug info
           self.debug( 'itemClick' );
           // set tabstop on input
           jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );
            
        // DONE FUNCTION: itemClick( void ) void
        };
        self.buttonClick = function( ){
        // FUNCTION: buttonClick( void ) void
            
            // set tabstop on button
            jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );

            // call the callback function
            self.values['callback']( self.inputOptions['id'] );
            
        // DONE FUNCTION: buttonClick( void ) void
        };
        self.inputMouseIn = function(){
        // FUNCTION: inputMouseIn( void ) void
            
            // remember mouse over
            self.inputOptions['mouseOver'] = true;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: inputMouseIn( void ) void
        };
        self.inputMouseOut = function(){
        // FUNCTION: inputMouseOut( void ) void
            
            // unset mouse over
            self.inputOptions['mouseOver'] = false;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: inputMouseOut( void ) void
        };
        self.focusIn = function( ){
        // FUNCTION: focusIn( void ) void
            
            // debug info
            self.debug( 'focusIn' );
            
            // rememeber focus in
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
            
            // rememeber focus out
            self.inputOptions['hasFocus'] = false;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusOut( void ) void
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
            if( self.inputOptions['hasFocus'] || self.itemContainerOptions['mouseOver'] || self.inputOptions['mouseOver'] ){
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
            
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: updateDisplay( void ) void
        };
        self.updateButtonsDisplay = function(  ){
        // FUNCTION: updateButtonsDisplay( void ) void
            
            // input mouse over or has focus
            if( self.inputOptions['mouseOver'] || self.inputOptions['hasFocus'] ){
                // mouse out -> background color, color default
                $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                // mouse out -> color, color default
                $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            }
            else {
                // mouse out -> background color, color default
                $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                // mouse out -> color, color default
                $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            }
            // done input mouse over or has focus
            
        // DONE FUNCTION: updateButtonsDisplay( void ) void
        };
        self.setData = function( ) {
        // FUNCTION: setData( void ) void
            
            // no action
            
        // DONE FUNCTION: setData( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            // set background color
            $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // set color
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
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
    // DONE MODULE: dataEditButtonModule( string: contentId, json: values, boolean: isEdit ) void 
})( pleisterman );
// done create module function
