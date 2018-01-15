/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditListModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          Displays a single select list in the data content.
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

    // MODULE: dataEditListModule( string: contentId, json: values, boolean: isEdit  ) void 
    
    sharesoft.dataEditListModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditListModule';                             // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.isEdit = isEdit;                                           // boolean: isEdit    
        self.values = values;                                           // json: values
        self.contentId = contentId;                                     // string: element id
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );             // string: image dir
        self.itemContainerOptions = {                                   // json: item container options
            'id'                    :   'itemContainer' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'table',                        // css display
            'padding'               :   sharesoft.getSetting( 'dataEditItemPadding' ),          // css padding
            'marginTop'             :   sharesoft.getSetting( 'dataEditItemMarginTop' ),        // css margin top
            'marginLeft'            :   sharesoft.getSetting( 'dataEditItemMarginLeft' ),       // css margin left
            'backgroundColor'       :   sharesoft.colors['dataItemBackgroundColor']['color'],   // css color: background color
            'rememberBackgroundColor':  '',                             // css color: remember background color
            'borderRadius'          :   sharesoft.getSetting( 'dataEditBorderRadius' ),         // css border radius
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
            'fontSize'              :   sharesoft.getSetting( 'dataEditLabelFontSize' ),        // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataEditLabelFontWeight' ),      // css font weight
            'marginTop'             :   sharesoft.getSetting( 'dataEditLabelMarginTop' ),       // css margin top    
            'marginRight'           :   sharesoft.getSetting( 'dataEditLabelMarginRight' ),     // css margin height
            'styleWidth'            :   sharesoft.getSetting( 'dataEditLabelWidth' ),           // css style width
            'rememberColor'         :   '',                             // css color: remember color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'div',                          // string: html element type 
            'maximumWidth'          :   '35em',                         // css maximum width
            'overflowX'             :   'visible',                      // css overflow-x
            'overflowY'             :   'auto',                         // css overflow-y
            'display'               :   'inline-block',                 // css display 
            'verticalAlign'         :   'middle',                       // css verical align
            'textAlign'             :   'left',                         // css text align
            'backgroundColor'       :   sharesoft.colors['editBackgroundColor']['color'],   // css color: background color  
            'fontSize'              :   sharesoft.getSetting( 'dataListFontSize' ),         // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataListFontWeight' ),       // css font weight
            'color'                 :   sharesoft.colors['editColor']['color'],             // css color: color   
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'dataListBorderWidth' ),   // css border width   
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],   // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'dataListBorderStyle' ),   // css border style        
        };                                                              // done json: input options
        self.rowOptions = {                                             // json: row options        
            'idPrefix'              :   self.MODULE + 'Row',            // string: idPrefix
            'element'               :   'div',                          // string: html element type 
            'marginBottom'          :   '0.2em',                        // css margin bottom
            'marginTop'             :   '0.2em',                        // css margin top
            'borderTop'             :   true,                           // boolean: has border top
            'borderBottom'          :   true,                           // boolean: has border bottom
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'backgroundColor'       :   sharesoft.colors['editBackgroundColor']['color'], // css color: background color
            'borderStyle'           :   'groove',                       // css border style
            'padding'               :   '0.4em',                        // css padding
            'paddingBottom'         :   '0.6em',                        // css padding bottom
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '4px center',                   // css background position
            'cursor'                :   'pointer',                      // css cursor            
            'selected'              :   0                               // integer: selected index
        };                                                              // done json: row options
        self.rowTextOptions = {                                         // json: row text options
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'backgroundColor'       :   'transparent',                  // css background color
            'size'                  :   '60',                           // string: size
            'readOnly'              :   true,                           // boolean: readonly
            'overflow'              :   'hidden',                       // css overflow
            'paddingTop'            :   '0.2em',                        // css padding top
            'color'                 :   sharesoft.colors['editColor']['color'],             // css color: color
            'fontSize'              :   sharesoft.getSetting( 'listRowFontSize' ),          // css font size
            'fontWeight'            :   sharesoft.getSetting( 'listRowFontWeight' ),        // css font weight
            'paddingLeft'           :   '3.4em',                        // css padding left
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: row text options       
        self.selectedTabstopRowId = null;                               // string: row id
        self.mouseOverId = null;                                        // string: row id
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
            $( '#' + self.inputOptions['id'] ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            // set item background color selected
            $( '#' + self.itemContainerOptions['id'] ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // set label color selected
            $( '#' + self.labelOptions['id'] ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
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

            // add rows
            self.addRowHtml();
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addRowHtml = function(){
        // FUNCTION: addRowHtml( void ) void

            // reset selected
            self.selected = [];
            
            // add no row html
            self.addNoRowsRow();
            
            // add rows 
            self.addRows();
            
        // DONE FUNCTION: addRowHtml( void ) void
        };
        self.addNoRowsRow = function(){
        // FUNCTION: addNoRowsRow( void ) void

            // set row values
            self.rowOptions['id'] = self.rowOptions['idPrefix'] + self.values['id'] + '_noRows';
            // set image
            self.rowOptions['imageUrl'] = 'url( ' + self.imageUrl + 'noRowsIcon.png )';
            // add row
            $( '#' + self.inputOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowOptions ) );
            
            // set id 
            self.rowTextOptions['id'] = self.rowOptions['idPrefix'] + 'Text' + self.values['id'] + '_noRows';
            // add text 
            $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
            // set text
            $( '#' + self.rowTextOptions['id'] ).val( sharesoft.translations['noRows'] );
            
            // has rows
            if( self.values['rows'].length > 0 ){
                // hide no rows row
                $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_'  + 'noRows' ).hide( );
            }
            else {
                // done has rows
                self.selected.push( 'noRows' );
            }
            // done no rows
            
        // DONE FUNCTION: addNoRowsRow( void ) void
        };
        self.addRows = function(){
        // FUNCTION: addRows( void ) void

            // loop over rows
            $.each( self.values['rows'], function( index, row ) {

                // selected
                if( self.values['value'] === row['id'] ){
                    // remember current tabstop row
                    self.selectedTabstopRowId = parseInt( row['id'] );
                    // add selection
                    self.selected = parseInt( row['id'] );
                }
                // done selected
                
                // set row values
                self.rowOptions['id'] = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];
                // set image
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + self.values['id'] + 'DataRowIcon.png )';
                // add row
                $( '#' + self.inputOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
                
                // set id 
                self.rowTextOptions['id'] = self.rowOptions['idPrefix'] + 'Text' + self.values['id'] + '_' + row['id'];
                // add text 
                $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( row['text'] );            
                
            });
            // done loop over rows

            // update row display
            self.updateRowsDisplay();
            
        // DONE FUNCTION: addRows( void ) void
        };
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void

            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.itemMouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.itemMouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.itemClick( ); } ); 
            // done item events
            
            // add row events
            self.addRowEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void

            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();

            // remove row events
            $.each( self.values['rows'], function( index, row ) {
                $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'] ).off();
            });            
            // done remove row events
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.addRowEvents = function(){
        // FUNCTION: addRowEvents( void ) void

            // loop over rows
            $.each( self.values['rows'], function( index, row ) {
                // row events
                $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'] ).mouseleave( function( event ){ self.rowMouseOut( this ); });
                $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'] ).mouseenter( function( event ){ self.rowMouseIn( this ); });
                $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'] ).click( function( event ){ self.rowClick( this ); });
                // done row events
            });
            // done loop over rows
            
        // DONE FUNCTION: addRowEvents( void ) void
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
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['arrowUp'],
                        'type'      :   'tabStop',
                        'function'  :   self.previousRow
                    },
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['arrowDown'],
                        'type'      :   'tabStop',
                        'function'  :   self.nextRow
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

            // debug info
            self.debug( 'mouseIn' );
            
            // remember mouse over 
            self.inputOptions['mouseOver'] = true;
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseIn( void ) void
        };
        self.itemMouseOut = function( ){
        // FUNCTION: itemMouseOut( void ) void

            // debug info
            self.debug( 'mouseOut' );
            
            // remember mouse out
            self.inputOptions['mouseOver'] = false;
            // remember mouse over id
            self.mouseOverId = 
            
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
        self.focusIn = function( ){
        // FUNCTION: focusIn( void ) void

            // debug info
            self.debug( 'focusIn' );

            // remember focus in
            self.inputOptions['hasFocus'] = true;
            
            // show input
            jsProject.scrollElement( self.inputOptions['id'], self.contentId );

            // set tabstop selection = selected
            self.selectedTabstopRowId = self.selected;

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
            // unset tabstop selection
            self.selectedTabstopRowId = null;
            
            // update row display
            self.updateRowsDisplay();

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusOut( void ) void
        };
        self.rowMouseIn = function( element ){
        // FUNCTION: rowMouseIn( void ) void

            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id
            
            // remember mouse over id
            self.mouseOverId = id;
            // update rows display
            self.updateRowsDisplay();
            
        // DONE FUNCTION: rowMouseIn( void ) void
        };
        self.rowMouseOut = function( ){
        // FUNCTION: rowMouseOut( void ) void

            // remember mouse over id
            self.mouseOverId = null;
            // update rows display
            self.updateRowsDisplay();
            
        // DONE FUNCTION: rowMouseOut( void ) void
        };
        self.rowClick = function( element ){
        // FUNCTION: rowClick( html element: element ) void

            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id

            // not selected
            if( self.selected !== parseInt( id ) ){

                // change selection
                self.selected = parseInt( id );
                // remember tabstop selection
                self.selectedTabstopRowId = parseInt( id );

                // remember change
                self.change();
                // update rows display
                self.updateRowsDisplay();
            }
            // done not selected
            
        // DONE FUNCTION: rowClick( html element: element ) void
        };        
        self.previousRow = function( ){
        // FUNCTION: previousRow( void ) void

            // debug info
            self.debug( 'select previous' );
            
            var i = 0;
            var selectedIndex = 0;
            
            // loop over rows
            $.each( self.values['rows'], function( index, row ) {
                // is selected tabstop row id
                if( self.selectedTabstopRowId === parseInt( row['id'] ) ){
                    // remember index
                    selectedIndex = i;
                }
                // done is selected tabstop row id
                i++;
            });
            // done loop over rows
            
            // selected index > 0
            if( selectedIndex > 0 ){
                // select previous
                selectedIndex--;
            }
            // done selected index > 0

            i = 0;
            // loop over rows
            $.each( self.values['rows'], function( index, row ) {
                // selected index found
                if( i === selectedIndex ){
                    // remember selected tabstop id
                    self.selectedTabstopRowId = parseInt( row['id'] );
                }    
                // done selected index found
                i++;
            });
            // done loop over rows

            // change selection
            self.selected = parseInt( self.selectedTabstopRowId );

            // remember change
            self.change();

            // update row dosplay
            self.updateRowsDisplay();
            
        // DONE FUNCTION: previousRow( void ) void
        };
        self.nextRow = function( ){
        // FUNCTION: nextRow( void ) void

            // debug info
            self.debug( 'select next' );
            
            // create counter
            var i = 0;
            // create selected index
            var selectedIndex = 0;
            
            // loop over rows
            $.each( self.values['rows'], function( index, row ) {
                // is selected tabstop row id
                if( self.selectedTabstopRowId === parseInt( row['id'] ) ){
                    // remember index
                    selectedIndex = i;
                }
                // done is selected tabstop row id
                i++;
            });
            // done loop over rows
            
            // index < rows length
            if( selectedIndex < self.values['rows'].length - 1  ){
                // previous index
                selectedIndex++;
            }
            // index < rows length

            // reset counter
            i = 0;
            // loop over rows
            $.each( self.values['rows'], function( index, row ) {
                // selected index found
                if( i === selectedIndex ){
                    // remember selected tabstop
                    self.selectedTabstopRowId = parseInt( row['id'] );
                }    
                // done selected index found
                
                i++;
            });
            // done loop over rows

            // change selection
            self.selected = parseInt( self.selectedTabstopRowId );

            // remember change
            self.change();

            // update row dosplay
            self.updateRowsDisplay();
            
        // DONE FUNCTION: nextRow( void ) void
        };
        self.updateRowsDisplay = function( ){
        // FUNCTION: updateRowsDisplay( void ) void

            // loop over rows
            $.each( self.values['rows'], function( index, row ) {
                if( parseInt( row['id'] ) === self.selectedTabstopRowId || parseInt( row['id'] ) === self.mouseOverId || parseInt( row['id'] ) === self.selected ){
                    // change selected colors
                    $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_'  + row['id'] ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
                    $( '#' + self.rowOptions['idPrefix']+ self.values['id'] + '_'  + row['id'] ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
                }
                else {
                    // change selected colors
                    $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_'  + row['id'] ).css( 'background-color', sharesoft.colors['editBackgroundColor']['color'] );
                    $( '#' + self.rowOptions['idPrefix'] + self.values['id'] + '_'  + row['id'] ).css( 'color', sharesoft.colors['editColor']['color'] );
                }
            });
            // done loop over rows
            
        // DONE FUNCTION: updateRowsDisplay( void ) void
        };
        self.updateDisplay = function(  ){ 
        // FUNCTION: updateDisplay( void ) void

            // cursor
            $( '#' + self.inputOptions['id'] ).css( 'cursor', 'pointer' );
            $( '#' + self.itemContainerOptions['id'] ).css( 'cursor', 'pointer' );
            // done cursor
            
            // selected
            if( self.inputOptions['hasFocus'] || self.inputOptions['mouseOver'] ){
                // debug info
                //self.debug( 'has focus' );
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
            self.values['value'] = self.selected;
            
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
    // DONE MODULE: dataEditListModule( string: contentId, json: values, boolean: isEdit ) void 
})( sharesoft );
// done create module function
