/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditCheckboxModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *      Displays a checkbox
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

    // MODULE: dataEditCheckboxModule( string: contentId, json: values, boolean: isEdit ) void 
    
    pleisterman.dataEditCheckboxModule = function( contentId, values, isEdit  ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditCheckboxModule';                         // string:  MODULE
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
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'checked'               :   false,                          // boolean: checked
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: text
            'styleWidth'            :   '1.2em',                        // css style width
            'styleHeight'           :   '1.2em',                        // css style height
            'readOnly'              :   true,                           // boolean: read only
            'textAlign'             :   'center',                       // css text align
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'],     // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'dataEditCheckboxFontSize' ),     // css font size
            'lineHeight'            :   pleisterman.getSetting( 'dataEditCheckboxFontSize' ),     // css font line height
            'fontWeight'            :   pleisterman.getSetting( 'dataEditCheckboxFontWeight' ),   // css font weight
            'color'                 :   pleisterman.colors['buttonColor']['color'],               // css colro: color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'checkboxBorderWidth' ),  // css border width    
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],  // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'checkboxBorderStyle' ),  // css border style
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
            
            // display selection
            if( self.values['value'] === 'true' ){
                // set checked
                self.inputOptions['checked'] = true;
                // add text X
                $( '#' + self.inputOptions['id'] ).val( 'X' );
            }
            else {
                // set checked
                self.inputOptions['checked'] = false;
                // add text space
                $( '#' + self.inputOptions['id'] ).val( '' );
            }
            // done display selection
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void
            
            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.itemMouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.itemMouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ){ self.click( event ); });
            // done item events
            
            // input events
            $( '#' + self.inputOptions['id'] ).mouseenter( function( event ){ self.inputMouseIn( ); });
            $( '#' + self.inputOptions['id'] ).mouseleave( function( event ){ self.inputMouseOut( ); });
            $( '#' + self.inputOptions['id'] ).click( function( event ){ self.click( event ); });
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
                'select'    :   self.focusIn,
                'deSelect'  :   self.focusOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.checkboxToggle
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
            
            
            // remember mouse over 
            self.inputOptions['mouseOver'] = true;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseIn( void ) void
        };        
        self.itemMouseOut = function( ){
        // FUNCTION: itemMouseOut( void ) void
            
            // remember mouse out
            self.inputOptions['mouseOver'] = false;
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseOut( void ) void
        };        
        self.click = function( event ){
        // FUNCTION: click( event: event ) void
        
            // stop propagation
            event.stopPropagation();

            // set tabstop on input
            jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );
           
            // get checked value
            self.inputOptions['checked'] = !self.inputOptions['checked'];
            
            // show checked
            if( self.inputOptions['checked'] ){
                $( '#' + self.inputOptions['id'] ).val( 'X' );
            }
            else {
                $( '#' + self.inputOptions['id'] ).val( '' );
            }
            // done show checked

            // remember change
            self.change();
            
        // DONE FUNCTION: click( event: event ) void
        };
        self.inputMouseIn = function(){
        // FUNCTION: inputMouseIn( void ) void
            
            // highlight backgrond color
            $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // highlight color
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: inputMouseIn( void ) void
        };
        self.inputMouseOut = function(){
        // FUNCTION: inputMouseOut( void ) void
            
            // is selected tab stop
            if( jsProject.getValue( 'selectedId', 'tabStops' ) === self.inputOptions['id'] ){
                // done keep selected
                return; 
            }
            // done is selected tab stop
            
            // default backgrond color
            $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // default color
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: inputMouseOut( void ) void
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
        self.checkboxToggle = function(){
        // FUNCTION: updateDisplay( void ) void
           
            // get checked value
            self.inputOptions['checked'] = !self.inputOptions['checked'];
            
            // show checked
            if( self.inputOptions['checked'] ){
                $( '#' + self.inputOptions['id'] ).val( 'X' );
            }
            else {
                $( '#' + self.inputOptions['id'] ).val( '' );
            }
            // done show checked
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
        self.change = function( event ){
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
            
            // checked 
            if( self.inputOptions['checked'] ){
                // display value -> js value 
                self.values['value'] = 'true';
            }
            else {
                // display value -> js value 
                self.values['value'] = 'false';
            }
            // done checked 
            
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
    // DONE MODULE: dataEditCheckboxModule( string: contentId, json: values, boolean: isEdit ) void 
})( pleisterman );
// done create module function
