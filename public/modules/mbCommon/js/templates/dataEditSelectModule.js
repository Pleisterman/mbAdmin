/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditSelectModule.js
 * 
 *  Last revision: 12-01-2017
 * 
 *  Purpose: 
 *          Displays a single select droppdown in the data content.
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

    // MODULE: dataEditSelectModule( string: contentId, json: values, boolean: isEdit  ) void 
    
    sharesoft.dataEditSelectModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditSelectModule';                           // string:  MODULE
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
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'input',                        // string html element type 
            'readOnly'              :   true,                           // boolean: read on;y
            'type'                  :   'text',                         // string: input type
            'display'               :   'inline-block',                 // css display style
            'styleWidth'            :   '35.0em',                       // rellative style
            'verticalAlign'         :   'middle',                       // css verical align
            'marginTop'             :   sharesoft.getSetting( 'dataEditLabelMarginTop' ),   // css margin top
            'backgroundColor'       :   sharesoft.colors['editBackgroundColor']['color'],   // css color: background color
            'fontSize'              :   sharesoft.getSetting( 'dataEditInputFontSize' ),    // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'color'                 :   sharesoft.colors['editColor']['color'],             // css color: color
            'border'                :   true,                           // boolean: has border   
            'borderStyle'           :   'solid',                        // css border style
            'borderWidth'           :   '0.1em',                        // css border width
            'borderRadius'          :   '0.0em',                        // css border radius
            'hasFocus'              :   false,                          // boolean: has focus
            'mouseOver'             :   false,                          // boolean: mouse over
            'selectedId'            :   null                            // null / string: selected id
        };                                                              // done json: input options
        self.selectListLayerOptions =   {                               // json: selected list layer options
            'id'                    :   'dataEditOverlay'               // string: element id
        };                                                              // done json: selected list layer options
        self.listContainerOptions = {                                   // json: list container options
            'id'                    :   'selectList' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'maximumHeight'         :   '10.0em',                       // css maximum height
            'styleWidth'            :   '35.0em',                       // css style width
            'overflowX'             :   'hidden',                       // css overflow-x
            'overflowY'             :   'auto',                         // css overflow-y
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'],  // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],      // css color: color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.2em',                        // css border radius
            'padding'               :   '0.2em',                        // css padding
            'open'                  :   false                           // boolean: open
        };                                                              // done json: list container options
        self.listDisplayOptions = {                                     // json: list display options
            'visible'               :   false,                          // boolean: visible
            'above' :   {                                               // json: above
                'marginBottom'      :   25                              // integer: margin bottom
            },                                                          // done json: above
            'under' :   {                                               // json: under
                'marginTop'         :   25                              // integer: margin top
            }                                                           // done json: under
        };                                                              // done json: list display options
        self.rowOptions = {                                             // json: row options
            'idPrefix'              :   self.MODULE + 'Row',            // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'],  // css color: background color
            'color'                 :   sharesoft.colors['panelColor']['color'],            // css color: color
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '4px center',                   // css background position
            'borderBottom'          :   true,                           // boolean: has border bottom
            'borderTop'             :   true,                           // boolean: has border top
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // relative size
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.0em',                        // css border width
            'padding'               :   '0.4em',                        // css padding
            'paddingLeft'           :   '1.2em',                        // css padding left
            'cursor'                :   'pointer',                      // css cursor   
            'mouseOverId'           :   null,                           // null / string row id
            'tabStopSelectedId'     :   null                            // null / string row id
        };                                                              // done json: row options
        self.rowTextOptions = {                                         // json: row text options
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'backgroundColor'       :   'transparent',                  // css background color
            'size'                  :   '60',                           // string: size
            'readOnly'              :   true,                           // boolean: readonly
            'overflow'              :   'hidden',                       // css overflow
            'paddingTop'            :   '0.2em',                        // css padding top
            'color'                 :   sharesoft.colors['editColor']['color'],         // css color: color
            'fontSize'              :   sharesoft.getSetting( 'listRowFontSize' ),      // css font size
            'fontWeight'            :   sharesoft.getSetting( 'listRowFontWeight' ),    // css font weight 
            'paddingLeft'           :   '3.2em',                        // css padding left
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: row text options
        self.errorOptions = {                                           // json: error options    
            'id'                    :   'dataError' + self.values['id'],// string: element id
            'element'               :   'div',                          // string: html element type
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'text'                  :   '',                             // string: text
            'zIndex'                :   '2',                            // css z-index
            'backgroundColor'       :   sharesoft.colors['errorDialogBackgroundColor']['color'],    // css color: background color
            'color'                 :   sharesoft.colors['errorColor']['color'],                    // css color: color
            'border'                :   true,                           // boolan: has border
            'borderColor'           :   sharesoft.colors['errorDialogBorderColor']['color'],        // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'padding'               :   '0.6em',                        // css padding
            'borderRadius'          :   '0.5em',                        // css border radius
            'offsetTop'             :   12,                             // integer: offset top
            'offsetLeft'            :   12                              // integer: offset left
        };                                                              // done json: error options
        self.rows = null;                                               // json: rows
        self.rowsOptions = {                                            // json: row options
            'selectedId'            : null                              // null / integer: selectedId
        };                                                              // done json: row options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // link the error function
            if( self.values['errorFunction'] !== undefined ){
                // set function
                self.values['errorFunction'] = self.showError;
            }
            // done link the error function
            
            // link the error function
            if( self.values['getSelectionFunction'] !== undefined ){
                // set function
                self.values['getSelectionFunction'] = self.getSelection;
            }
            // done link the error function

            // set display options
            self.setDisplayOptions();

            // add html
            self.addHtml();
            
            // get rows
            self.values['selectModule'].getSelectData(  self.values['value'], self.getSelectDataCallback );

            // remember current display settings
            self.rememberUnselectedDisplay();

            // add events
            self.addEvents();
            
            // add tabstops
            self.addTabStops();

            // event subscriptiona
            self.addEventSubscriptions();
            
            // refresh layout
            self.layoutChange();

            // update display
            self.updateDisplay();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove layout change
            jsProject.unSubscribeFromEvent( 'layoutChange', self.layoutChange );

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
            
            // add error to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.getSelectDataCallback = function( data ){
        // FUNCTION: getSelectDataCallback( json: data ) void

            // debug info
            self.debug( 'rows: ' + data['open']['rows'].length );    
            
            // create empty rows array
            self.rows = [];
            
            // loop over data rows
            $.each( data['open']['rows'], function( index, value ) {
                // create row object
                var row = {
                    'id' : value['id'],
                    'text' : value['text']
                };
                // done create row object
                
                // add to rows
                self.rows.push( row );
            });            
            // done loop over data rows
            
            // data has selected row
            if( data['selectedRow'] ){
                // debug info
                self.debug( 'getSelectDataCallback id: ' + data['selectedRow']['id'] );
                // set displayed text
                $( '#' + self.inputOptions['id'] ).val( data['selectedRow']['text'] );
                // remember selected id
                self.inputOptions['selectedId'] = data['selectedRow']['id'];
                
                // create bool found
                var selectedRowFound = false;
                // loop over rows
                $.each( data['open']['rows'], function( index, value ) {
                    // selected row found
                    if( value['id'] === data['selectedRow']['id'] ){
                        // remember found
                        selectedRowFound = true;
                    }
                    // done selected row found
                });            
                // done loop over rows
                
                // selected not found in rows
                if( !selectedRowFound ){
                    // create row
                    var row = {
                        'id' : data['selectedRow']['id'],
                        'text' : data['selectedRow']['text']
                    };
                    // doen cretae row
                    
                    // add selected to rows
                    self.rows.push( row );
                }
                // done selected not found in rows
            }
            else {
                // open rows length > 0 
                if( data['open']['rows'].length > 0 ){
                    // get last selected id
                    var lastSelectedId = sharesoft.options[self.values['selectOption']]['value'];
                    // create bool last selected found
                    var lastSelectedFound = false;
                    
                    // loop over open rows
                    $.each( data['open']['rows'], function( index, value ) {
                        // row id = last selected id 
                        if( value['id'] === lastSelectedId ){
                            // remeber found
                            lastSelectedFound = true;
                            // display row text
                            $( '#' + self.inputOptions['id'] ).val( value['text'] );
                            // remember selected
                            self.inputOptions['selectedId'] = value['id'];
                        }
                        // done row id = last selected id 
                    });            
                    // done loop over open rows
                    
                    // last selected not found
                    if( !lastSelectedFound ){
                        // display row text
                        $( '#' + self.inputOptions['id'] ).val( data['open']['rows'][0]['text'] );                        
                        // remember selected id
                        self.inputOptions['selectedId'] = data['open']['rows'][0]['id'];
                    }
                    // done last selected not found
                }
                else {
                    // debug info
                    self.debug( 'select has no rows' );
                    // show error
                    sharesoft.getError( self.values['selectNoRowsError'], self.showError );
                    
                }
                // done open rows length > 0 
            }
            // done data has selected row
            
        // DONE FUNCTION: getSelectDataCallback( json: data ) void
        };
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void

            // add item events
            self.addItemEvents();
            // add input events
            self.addInputEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };    
        self.addItemEvents = function( ){
        // FUNCTION: addItemEvents( void ) void

            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.mouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.mouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.click( event ); } ); 
            // done item events
            
        // DONE FUNCTION: addItemEvents( void ) void
        };    
        self.addInputEvents = function( ){
        // FUNCTION: addInputEvents( void ) void

            // input events
            $( '#' + self.inputOptions['id'] ).click( function( event ){ self.click( event ); });
            
        // DONE FUNCTION: addInputEvents( void ) void
        };
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void

            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();
            // remove input events
            $( '#' + self.inputOptions['id'] ).off();
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.addTabStops = function( ){
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
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.openSelect
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.focusIn = function( ){
        // FUNCTION: focusIn( void ) void

            // debug info
            self.debug( 'focusIn' );
            // remember input focus in
            self.inputOptions['hasFocus'] = true;
            // show input
            jsProject.scrollElement( self.itemContainerOptions['id'], self.contentId );
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusIn( void ) void
        };        
        self.focusOut = function( ){
        // FUNCTION: focusOut( void ) void

            // debug info
            self.debug( 'focusOut' );
            // remember input focus in
            self.inputOptions['hasFocus'] = false;
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusOut( void ) void
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

            // stop propagation
            event.stopPropagation();
            
            // open the select
            self.openSelect(); 
            
        // DONE FUNCTION: click( event: event ) void
        };
        self.openSelect = function( ){
        // FUNCTION: openSelect( void ) void

             // set tabstop on input
            jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );
 
            // select is open
            if( self.listContainerOptions['open'] ){
                // done already open
                return;
            }
            // done select is open
            
            // add list container to overlay
            $( '#' + self.selectListLayerOptions['id'] ).html( jsProject.jsonToElementHtml( self.listContainerOptions ) );
            // remember open
            self.listContainerOptions['open'] = true;
            // show the select
            self.showSelect();
            
        // DONE FUNCTION: openSelect( void ) void
        };
        self.showSelect = function(  ){
        // FUNCTION: showSelect( void ) void

            // debug info
            self.debug( 'show select ' );
            
            // rows count > 1
            if( self.rows.length > 1 ){
                // add rows html
                self.addListRowsHtml();
                // add events    
                self.addListEvents();
                // add tab stops
                self.addListTabStops();
            }
            else {
                // add no rows html
                self.addNoRowsHtml();
                // add no rows events
                self.addNoRowsEvents();
                // add tab stops
                self.addNoRowsTabStops();
            }
            // done rows count > 1
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'overlay' );
            
            // show layer
            $( '#' + self.selectListLayerOptions['id'] ).show();
            
            // selected exists
            if( self.inputOptions['selectedId'] !== null ){
                // create id
                var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + self.inputOptions['selectedId'];
                // show row
                jsProject.scrollElement( id, self.listContainerOptions['id'] );
                // remember selected tabstop row
                self.rowOptions['tabStopSelectedId'] = self.inputOptions['selectedId'];
            }
            // done selected exists
            
            // update layout
            self.layoutChange();
            
        // DONE FUNCTION: showSelect( void ) void
        };
        self.addNoRowsHtml = function( ){
        // FUNCTION: addNoRowsHtml( void ) void

            // create row id
            var id = self.rowOptions['idPrefix'] + self.values['id'] + '_noRows';
            // set row values
            self.rowOptions['id'] = id;
            self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + 'noRowsIcon.png)';
            // done set row values
            
            // add row
            $( '#' + self.listContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
            
            // set id 
            self.rowTextOptions['id'] = self.rowOptions['idPrefix'] + 'Text' + self.values['id'] + '_noRows';
            // add text 
            $( '#' + id ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
            // set text
            $( '#' + self.rowTextOptions['id'] ).val( sharesoft.translations['noRows'] );
            
        // DONE FUNCTION: addNoRowsHtml( void ) void
        };
        self.addNoRowsEvents = function( ){
        // FUNCTION: addNoRowsEvents( void ) void

            // document click, to close
            $( document.body ).click( function( event ){ self.closeList( ); } );
            
        // DONE FUNCTION: addNoRowsEvents( void ) void
        };
        self.addListRowsHtml = function( ){
        // FUNCTION: addListRowsHtml( void ) void

            // loop over rows
            $.each( self.rows, function( index, value ) {
                self.rowOptions['id'] = self.rowOptions['idPrefix'] + self.values['id'] + '_' + value['id'];
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + self.values['selectImageId'] + 'RowIcon.png )';
                // is selected 
                if( value['id'] === self.inputOptions['selectedId'] ){
                    // background color button highlight
                    self.rowOptions['backgroundColor'] = sharesoft.colors['panelHighlightBackgroundColor']['color'];
                    // color button highlight
                    self.rowOptions['color'] = sharesoft.colors['panelHighlightColor']['color'];
                }
                else {
                    // background color button highlight
                    self.rowOptions['backgroundColor'] = sharesoft.colors['panelBackgroundColor']['color'];
                    // color button highlight
                    self.rowOptions['color'] = sharesoft.colors['panelColor']['color'];
                }
                // done is selected

                // add row
                $( '#' + self.listContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );

                // set id 
                self.rowTextOptions['id'] = self.rowOptions['idPrefix'] + 'Text' + self.values['id'] + '_' + value['id'];
                // add text 
                $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( value['text'] );

            });
            // done loop over rows
            
        // DONE FUNCTION: addListRowsHtml( void ) void
        };
        self.addListEvents = function( ){
        // FUNCTION: addListEvents( void ) void

            // add document event click, to close
            $( document.body ).click( function( event ){ self.closeList( ); } );

            // loop over rows
            $.each( self.rows, function( index, value ) {
                // create id
                var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + value['id'];
                
                // not selected
                if( value['id'] !== self.inputOptions['selectedId'] ){
                    // add row mouse in
                    $( '#' + id ).mouseover( function( event ){ self.listRowMouseOver( this ); });
                    // add row mouse out
                    $( '#' + id ).mouseout( function( event ){ self.listRowMouseOut( this ); });
                }
                // done not selected

                // add row click
                $( '#' + id ).click( function( event ){ self.listRowClick( event, this.id ); });
            });
            // done loop over rows
            
        // DONE FUNCTION: addListEvents( void ) void
        };
        self.removeListEvents = function(  ){
        // FUNCTION: removeListEvents( void ) void

            // document events
            $( document.body ).off( 'click' );
            
            // loop over rows
            $.each( self.rows, function( index, value ) {
                // not selected
                if( value['id'] !== self.inputOptions['selectedId'] ){
                    // create id
                    var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + value['id'];
                    // remove events
                    $( '#' + id ).off( );
                }
                // done not selected
            });
            // done loop over rows
            
        // DONE FUNCTION: removeListEvents( void ) void
        };
        self.addNoRowsTabStops = function( ){
        // FUNCTION: addNoRowsTabStops( void ) void

            // document click, to close
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.listContainerOptions['id'],
                'layer'     :   'overlay',
                'select'    :   self.listContainerFocusIn,
                'deSelect'  :   self.listContainerFocusOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'tabStop',
                        'function'  :   self.closeList
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addNoRowsTabStops( void ) void
        };
        self.addListTabStops = function( ){
        // FUNCTION: addListTabStops( void ) void

            // document click, to close
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.listContainerOptions['id'],
                'layer'     :   'overlay',
                'select'    :   self.listContainerFocusIn,
                'deSelect'  :   self.listContainerFocusOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'tabStop',
                        'function'  :   self.closeList
                    },
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.selectRow
                    },
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['arrowUp'],
                        'type'      :   'tabStop',
                        'function'  :   self.selectPreviousRow
                    },
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['arrowDown'],
                        'type'      :   'tabStop',
                        'function'  :   self.selectNextRow
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addListTabStops( void ) void
        };
        self.removeListTabStops = function( ){
        // FUNCTION: removeListTabStops( void ) void

            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'overlay' );
            
        // DONE FUNCTION: removeListTabStops( void ) void
        };
        self.listContainerFocusIn = function( ){
        // FUNCTION: listContainerFocusIn( void ) void

            // no action
            
        // DONE FUNCTION: listContainerFocusIn( void ) void
        };
        self.listContainerFocusOut = function( ){
        // FUNCTION: listContainerFocusOut( void ) void

            // no action
            
        // DONE FUNCTION: listContainerFocusOut( void ) void
        };
        self.listRowMouseOver = function( element ){
        // FUNCTION: listRowMouseOver( html element: element ) void

            // get row id
            var idArray = element.id.split( '_' );
            var id = idArray[idArray.length-1];            
            // done get row id
            
            // remember mouse over id
            self.rowOptions['mouseOverId'] = id;
            
            // update row display
            self.updateRowsDisplay();
            
        // DONE FUNCTION: listRowMouseOver( html element: element ) void
        };
        self.listRowMouseOut = function( ){
        // FUNCTION: listRowMouseOut( void ) void

            // unset mouse over id
            self.rowOptions['mouseOverId'] =  null;
            
            // update row display
            self.updateRowsDisplay();
            
        // DONE FUNCTION: listRowMouseOut( void ) void
        };
        self.selectPreviousRow = function( ){
        // FUNCTION: selectPreviousRow( void ) void

            // debug info
            self.debug( 'selectPreviousRow' );

            // create counter
            var i = 0;
            // create selected index
            var selectedIndex = 0;
            
            // loop over rows
            $.each( self.rows, function( index, row ) {
                // is selected tabstop row id
                if( self.rowOptions['tabStopSelectedId'] === row['id'] ){
                    // remmeber index
                    selectedIndex = i;
                }
                // done is selected tabstop row id
                i++;
            });
            // done loop over rows
            self.debug( 'selectedIndex: ' + selectedIndex );
            
            // index > 0
            if( selectedIndex > 0  ){
                // previous index
                selectedIndex--;
            }
            // done index > 0
            
            // reset counter
            i = 0;
            
            // loop over rows
            $.each( self.rows, function( index, row ) {
                // selected index found
                if( i === selectedIndex ){
                    // remember selected tabstop
                    self.rowOptions['tabStopSelectedId'] = row['id'];
                }    
                // done selected index found
                
                i++;
            });
            // done loop over rows

            // create element id
            var elementId = self.rowOptions['idPrefix'] + self.values['id'] + '_' + self.rowOptions['tabStopSelectedId'];
            // show row
            jsProject.scrollElement( elementId, self.listContainerOptions['id'] );
            
            // update row display
            self.updateRowsDisplay();
            
        // DONE FUNCTION: selectPreviousRow( void ) void
        };
        self.selectNextRow = function( ){
        // FUNCTION: selectNextRow( void ) void

            // debug info
            self.debug( 'selectNextRow' );
            
            var i = 0;
            var selectedIndex = 0;
            
            // loop over rows
            $.each( self.rows, function( index, row ) {
                // is selected tabstop row id
                if( self.rowOptions['tabStopSelectedId'] === row['id'] ){
                    // remmeber index
                    selectedIndex = i;
                }
                // done is selected tabstop row id
                i++;
            });
            // done loop over rows
            self.debug( 'selectedIndex: ' + selectedIndex );
            
            // if index < length
            if( selectedIndex < self.rows.length - 1 ){
                // next index
                selectedIndex++;
            }
            i = 0;
            // done if index < length
            
            // loop over rows
            $.each( self.rows, function( index, row ) {
                // selected index found
                if( i === selectedIndex ){
                    // remember selected tabstop
                    self.rowOptions['tabStopSelectedId'] = row['id'];
                }    
                // done selected index found
                
                i++;
            });
            // done loop over rows
        
            // create element id
            var elementId = self.rowOptions['idPrefix'] + self.values['id'] + '_' + self.rowOptions['tabStopSelectedId'];
            // show row
            jsProject.scrollElement( elementId, self.listContainerOptions['id'] );

            // update row display
            self.updateRowsDisplay();
            
        // DONE FUNCTION: selectNextRow( void ) void
        };
        self.updateRowsDisplay = function( ){
        // FUNCTION: updateRowsDisplay( void ) void

            // loop over rows
            $.each( self.rows, function( index, row ) {
                // create element id
                var elementId = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];

                //  is tabstop selected row / selected / mouseover
                if( row['id'] === self.rowOptions['tabStopSelectedId'] || row['id'] === self.rowOptions['mouseOverId'] ){
                    // is tabstop selected row keep panel highlight color
                    $( '#' + elementId ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
                    $( '#' + elementId ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
                    // done mouse is out, row default colors
                }
                else {
                    // is tabstop selected row keep panel highlight color
                    $( '#' + elementId ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
                    $( '#' + elementId ).css( 'color', sharesoft.colors['panelColor']['color'] );
                    // done mouse is out, row default colors
                }
                
            });
            // done loop over rows
            
        // DONE FUNCTION: updateRowsDisplay( void ) void
        };
        self.listRowClick = function( event, elementId ){
        // FUNCTION: listRowClick( event: event, html element: element ) void

            // stop propagation
            event.stopPropagation();
            
            // get row id
            var idArray = elementId.split( '_' );
            var id = idArray[idArray.length-1];            
            // done get row id
            
            // remember selected
            self.rowOptions['selectedId'] = id;
            // set last selected id
            sharesoft.setOption( self.values['selectOption'], id );
            
            // loop over rows
            $.each( self.rows, function( index, value ) {
                // found selected row
                if( value['id'] === self.rowOptions['selectedId'] ){
                    // remember selected
                    self.inputOptions['selectedId'] = value['id'];
                    // display row text
                    $( '#' + self.inputOptions['id'] ).val( value['text'] );
                }
                // done found selected row
            });            
            // done loop over rows
            
            // remember change
            self.change();

            // close  list
            self.closeList( event );
            
        // DONE FUNCTION: listRowClick( event: event, html element: element ) void
        };
        self.selectRow = function( ){
        // FUNCTION: selectRow( void ) void

            // set last selected id
            sharesoft.setOption( self.values['selectOption'], self.rowOptions['tabStopSelectedId'] );
            
            // loop over rows
            $.each( self.rows, function( index, value ) {
                // found selected row
                if( value['id'] === self.rowOptions['tabStopSelectedId'] ){
                    // remember selected
                    self.inputOptions['selectedId'] = value['id'];
                    // display row text
                    $( '#' + self.inputOptions['id'] ).val( value['text'] );
                }
                // done found selected row
            });            
            // done loop over rows
            
            // remember change
            self.change();
            
            // close list
            self.closeList();
            
        // DONE FUNCTION: selectRow( void ) void
        };
        self.closeList = function( ){
        // FUNCTION: closeList( void ) void

            // remove events
            self.removeListEvents();
            // remove events
            self.removeListTabStops();
            // empty layer
            $( '#' + self.selectListLayerOptions['id'] ).html( '' );
            // hide layer
            $( '#' + self.selectListLayerOptions['id'] ).hide();
            // remember list is closed
            self.listContainerOptions['open'] = false;
            
        // DONE FUNCTION: closeList( void ) void
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
            if( self.inputOptions['hasFocus'] || self.inputOptions['mouseOver'] || self.listContainerOptions['open'] ){
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

            // set selected
            self.values['value'] = self.inputOptions['selectedId'];
            
        // DONE FUNCTION: setData( void ) void
        };
        self.getSelection = function( ) {
        // FUNCTION: getSelection( void ) void

            // return current selection
            return self.inputOptions['selectedId'];
            
        // DONE FUNCTION: getSelection( void ) void
        };
        self.showError = function( message ){
        // FUNCTION: showError( void ) void

            // debug info
            self.debug( 'show error: ' + message );
            
            // message exists
            if( message ){
                // set message
                $( '#' + self.errorOptions['id'] ).html( message );
                // show message
                $( '#' + self.errorOptions['id'] ).show();
                // set global data error
                jsProject.callEvent( 'dataError', true );

            }
            else {
                // hide error
                $( '#' + self.errorOptions['id'] ).hide();
                // unset global data error
                jsProject.callEvent( 'dataError', false );
            }
            // message exists
            
        // DONE FUNCTION: showError( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // set error positon
            var left = $( '#' + self.labelOptions['id'] ).width( );
            left += self.errorOptions['offsetLeft'];
            var top = $( '#' + self.inputOptions['id'] ).height();
            top += $( '#' + self.inputOptions['id'] ).position().top;
            top += self.errorOptions['offsetTop'];
            $( '#' + self.errorOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.errorOptions['id'] ).css( 'left', left + 'px' );
            // done set error positon

            // update list layout
            self.listLayoutChange();
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.listLayoutChange = function() {
        // FUNCTION: listLayoutChange( void ) void

            // list is closed
            if( !self.listContainerOptions['open'] ){
                // done 
                return;
            }
            // done list is closed
            
            // get position
            var position = jsProject.getElementPosition( self.inputOptions['id'] );
            // get date picker height
            var listHeight = $( '#' + self.listContainerOptions['id'] ).height();
            // get date picker width
            var listWidth = $( '#' + self.listContainerOptions['id'] ).width();
            // get layuot height
            var layoutHeight =  $( '#layout' ).height();
            
            // caller position > layout height / 2
            if( position['top'] > ( layoutHeight / 2 ) ){
                position['top'] -= listHeight;
                position['top'] -= self.listDisplayOptions['above']['marginBottom'];
            }
            // caller position < layout height / 2
            else {
                position['top'] += self.listDisplayOptions['under']['marginTop'];
            }
            // done caller position < layout height / 2
            
            // top maximum layout height - date picker height or top 
            position['top'] = Math.min( position['top'], layoutHeight - listHeight );
            // top minimum 0
            position['top'] = Math.max( position['top'], 0 );
            
            // move position left when caller position is 3 / 4 to the right            
            if( position['left'] > ( $( '#layout').width() / 4 ) * 3 ){
                position['left'] -= listWidth / 2;
            }
            // done move position left when caller position is 3 / 4 to the right            

            // set position
            $( '#' + self.listContainerOptions['id'] ).css( 'top', position['top'] + 'px' );
            $( '#' + self.listContainerOptions['id'] ).css( 'left', position['left'] + 'px' );
            // set position
            
        // DONE FUNCTION: listLayoutChange( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove event subscription
            self.removeEventSubscriptions();
            
            // remove events
            self.removeEvents();
            
            // error function link
            if( self.values['errorFunction'] !== undefined ){
                // remove link 
                self.values['errorFunction'] = null;
            }        
            // error function link
            
            // error function link
            if( self.values['getSelectionFunction'] !== undefined ){
                // remove link 
                self.values['getSelectionFunction'] = null;
            }        
            // error function link
            
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
    // DONE MODULE: dataEditSelectModule( string: contentId, json: values, boolean: isEdit ) void 
})( sharesoft );
// done create module function
