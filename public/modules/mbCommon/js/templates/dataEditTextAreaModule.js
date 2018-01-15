/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditTextAreaModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          Displays a text area field
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: dataEditTextAreaModule( string: contentId, json: values, boolean: isEdit ) void 
    
    pleisterman.dataEditTextAreaModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditTextAreaModule';                         // string:  MODULE
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
            'marginRight'           :   pleisterman.getSetting( 'dataEditLabelMarginRight' ),     // css margin right
            'styleWidth'            :   pleisterman.getSetting( 'dataEditLabelWidth' ),           // css style width
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'textarea',                     // string: html element type 
            'styleHeight'           :   '5.0em',                        // css style height
            'styleWidth'            :   '35em',                         // css style width
            'display'               :   'inline-block',                 // css display style
            'verticalAlign'         :   'middle',                       // css verical align
            'textAlign'             :   'left',                         // css text align
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'],       // css color: background color
            'fontFamily'            :   pleisterman.options['fontFamily']['value'],               // css font family
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),        // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),      // css font weight
            'color'                 :   pleisterman.colors['editColor']['color'],                 // css color: color
            'border'                :   true,                           // boolean: has border    
            'borderStyle'           :   'solid',                        // css border style
            'borderWidth'           :   '0.1em',                        // css border width
            'borderRadius'          :   '0.0em',                        // css border radius
            'hasFocus'              :   false,                          // boolean: has focus
            'mouseOver'             :   false                           // boolean: mouse over
        };
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

            // update display
            self.updateDisplay();

        // DONE FUNCTION: construct( void ) void
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
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            // done input mouse in -> color highlight

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
            // set input value
            $( '#' + self.inputOptions['id'] ).val( self.values['value'] );

            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void
            
            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.mouseIn( event ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.mouseOut( event ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.itemClick( event ); } ); 
            // done item events
            
            // input events
            $( '#' + self.inputOptions['id'] ).keyup( function( event ){ self.change( ); });
            $( '#' + self.inputOptions['id'] ).change( function( event ){ self.change( ); });
            $( '#' + self.inputOptions['id'] ).focusin( function( event ){ self.focusIn( ); });
            $( '#' + self.inputOptions['id'] ).focusout( function( event ){ self.focusOut( ); });
            $( '#' + self.inputOptions['id'] ).mouseenter( function( event ){ self.mouseIn( event ); });
            $( '#' + self.inputOptions['id'] ).mouseleave( function( event ){ self.mouseOut( event ); });
            // done input events
            
        // DONE FUNCTION: addEvents( void ) void
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
                'select'    :   self.mouseIn,
                'deSelect'  :   self.mouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.inputOptions['id']
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.mouseIn = function( ){
        // FUNCTION: mouseIn( void ) void
            
            // debug info
            self.debug( 'mouseIn' );

            // remmeber mouse over 
            self.inputOptions['mouseOver'] = true;
            
            // refresh display
            self.updateDisplay();

        // DONE FUNCTION: mouseIn( void ) void
        };
        self.mouseOut = function( ){
        // FUNCTION: mouseOut( void ) void
            
            // debug info
            self.debug( 'mouseOut' );
            
            // remember mouse out
            self.inputOptions['mouseOver'] = false;
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: mouseOut( void ) void
        };
        self.itemClick = function( ){
        // FUNCTION: itemClick( void ) void
            
            // debug info
           self.debug( 'itemClick' );
           // set tabstop on input
           jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );
            
        // DONE FUNCTION: itemClick( void ) void
        };
        self.focusIn = function( ){
        // FUNCTION: focusIn( void ) void
            
            // debug info
            self.debug( 'focusIn' );
            
            // show input
            jsProject.scrollElement( self.inputOptions['id'], self.contentId );
            // remember focus in
            self.inputOptions['hasFocus'] = true;
            // select text
            $( '#' + self.inputOptions['id'] ).select();
            
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
        self.updateDisplay = function(  ){ 
        // FUNCTION: updateDisplay( void ) void
            
            // debug info
            self.debug( 'updateDisplay' );

            $( '#' + self.inputOptions['id'] ).css( 'cursor', 'pointer' );
            $( '#' + self.itemContainerOptions['id'] ).css( 'cursor', 'pointer' );
            // done cursor
            
            // selected
            if( self.inputOptions['hasFocus'] || self.inputOptions['mouseOver'] ){
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
        self.change = function( ){
        // FUNCTION: change( event: event ) void
            
            // if is edit
            if( self.isEdit ){
                // remember change event 
                jsProject.setValue( 'changed', 'data', true );    
            }
            // done if is edit
            
        // DONE FUNCTION: change( event: event ) void
        };
        self.setData = function( ) {
        // FUNCTION: setData( void ) void
            
            // display value -> js value 
            self.values['value'] = $( '#' + self.inputOptions['id'] ).val();
            
        // DONE FUNCTION: setData( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
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
    // DONE MODULE: dataEditTextAreaModule( string: contentId, json: values, boolean: isEdit ) void 
})( pleisterman );
// done create module function
