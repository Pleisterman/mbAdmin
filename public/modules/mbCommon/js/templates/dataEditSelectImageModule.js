/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditSelectImageModule.js
 * 
 *  Last revision: 10-01-2017
 * 
 *  Purpose: 
 *          Displays a single select droppdown in the data content.
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

    // MODULE: dataEditSelectImageModule( string: contentId, json: values, boolean: isEdit  ) void 
    
    pleisterman.dataEditSelectImageModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditSelectImageModule';                      // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.isEdit = isEdit;                                           // boolean: isEdit    
        self.values = values;                                           // json: values
        self.contentId = contentId;                                     // string: element id
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image dir
        self.imageUploadUrl = pleisterman.getSetting( 'imageUploadUrl' ); // string: image upload dir
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
        self.inputInfoContainerOptions = {                              // json: input info container options
            'id'                    :   'inputInfoContainer' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css verical align
            'marginBottom'          :   '1.2em',                        // css margin bottom
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: input info container options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'img',                          // string html element type 
            'display'               :   'inline-block',                 // css display
            'styleWidth'            :   '80px',                         // style width
            'styleHeight'           :   '80px',                         // style height
            'verticalAlign'         :   'middle',                       // css verical align
            'marginTop'             :   pleisterman.getSetting( 'dataEditLabelMarginTop' ),   // css margin top
            'marginLeft'            :   '1.5em',                        // css margin left
            'backgroundColor'       :   'transparent',                  // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),    // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'color'                 :   pleisterman.colors['editColor']['color'],             // css color: color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width    
            'borderColor'           :   pleisterman.colors['commonBorderColor']['color'], // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'hasFocus'              :   false,                          // boolean: has focus
            'mouseOver'             :   false,                          // boolean: mouse over
            'selectedId'            :   null,                           // null / string: selected id
            'selectedFileName'      :   null                            // null / string: selected file Name
        };                                                              // done json: input options
        self.inputInfoOptions = {                                       // json: preview info options
            'id'                    :   'inputInfo' + self.values['id'],  // string: element id
            'element'               :   'textArea',                     // string: html element type 
            'readOnly'              :   true,                           // boolean: readonly
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'padding'               :   '0.4em',                        // css padding
            'styleHeight'           :   '12.0em',                       // css style height
            'styleWidth'            :   '16.0em',                       // css style width
            'marginLeft'            :   '1.5em',                        // css margin left
            'backgroundColor'       :   'transparent',                  // css color: background color
        };                                                              // done json: preview info options
        self.selectListLayerOptions =   {                               // json: selected list layer options
            'id'                    :   'mainOverlay'                   // string: element id
        };                                                              // done json: selected list layer options
        self.listContainerOptions = {                                   // json: list container options
            'id'                    :   'selectImageList' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'marginTop'             :   '3.5em',                        // css margin left
            'maximumWidth'          :   '90%',                          // css maximum width
            'marginLeft'            :   '5%',                           // css maximum width
            'overflowY'             :   'auto',                         // css overflow-y
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'], // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],      // css color: color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.2em',                        // css border radius
            'padding'               :   '0.2em',                        // css padding
            'open'                  :   false                           // boolean: open
        };                                                              // done json: list container options
        self.listHeaderOptions = {                                      // json: list header options
            'id'                    :   'selectImageListHeader' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block',                        // css display
            'text'                  :   pleisterman.translations['images'], // string: text
            'textAlign'             :   'center',                       // css text align
            'minimumHeight'         :   '1.1em',                        // css minimum height
            'marginTop'             :   '0.1em',                        // css margin top
            'color'                 :   pleisterman.colors['panelHighlightColor']['color'], // css color: color
            'fontSize'              :   '1.0em',                        // css font size
            'fontWeight'            :   'normal',                       // css font weight
            'marginBottom'          :   '0.2em',                        // css margin bottom
            'padding'               :   '0.2em',                        // css padding 
            'paddingBottom'         :   '0.4em',                        // css padding bottom
            'paddingTop'            :   '0.4em',                        // css padding bottom
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'] // css color: background color
        };                                                              // done json: list header options
        self.rowOptions = {                                             // json: row options
            'idPrefix'              :   self.MODULE + 'Row',            // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'backgroundColor'       :   pleisterman.colors['panelBackgroundColor']['color'],  // css color: background color
            'color'                 :   pleisterman.colors['panelColor']['color'],            // css color: color
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '4px center',                   // css background position
            'border'                :   true,                           // boolean: has border bottom
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // relative size
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.0em',                        // css border width
            'padding'               :   '0.4em',                        // css padding
            'marginLeft'            :   '1.2em',                        // css margin left
            'cursor'                :   'pointer',                      // css cursor   
            'mouseOverId'           :   null,                           // null / string row id
            'tabStopSelectedId'     :   null                            // null / string row id
        };                                                              // done json: row options
        self.rowImageOptions = {                                        // json: row image options
            'idPrefix'              :   self.MODULE + 'RowImage',       // string: element id
            'element'               :   'img',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css verical align
            'backgroundColor'       :   'transparent',                  // css color: background color
            'styleWidth'            :   '80px',                         // style width
            'styleHeight'           :   '80px',                         // style height
            'height'                :   '80px',                         // html height
            'width'                 :   '80px',                         // html width
            'paddingTop'            :   '0.1em',                        // css padding top
            'color'                 :   pleisterman.colors['editColor']['color'],         // css color: color
            'fontSize'              :   pleisterman.getSetting( 'listRowFontSize' ),      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'listRowFontWeight' ),    // css font weight    
            'paddingLeft'           :   '3.4em'                         // css padding left
        };                                                              // done json: row image options
        self.rowImageInfoOptions = {                                    // json: row image options
            'element'               :   'textArea',                     // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css verical align
            'readOnly'              :   true,                           // boolean: readonly
            'backgroundColor'       :   'transparent',                  // css color: background color
            'styleWidth'            :   '16.0em',                       // style width
            'styleHeight'           :   '10.0em',                       // style height
            'paddingTop'            :   '0.6em',                        // css padding top
            'color'                 :   pleisterman.colors['editColor']['color'],         // css color: color
            'fontSize'              :   pleisterman.getSetting( 'listRowFontSize' ),      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'listRowFontWeight' ),    // css font weight    
            'marginLeft'            :   '18px'                          // css margin left
        };                                                              // done json: row image options
        self.errorOptions = {                                           // json: error options    
            'id'                    :   'dataError' + self.values['id'],// string: element id
            'element'               :   'div',                          // string: html element type
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'text'                  :   '',                             // string: text
            'zIndex'                :   '2',                            // css z-index
            'backgroundColor'       :   pleisterman.colors['errorDialogBackgroundColor']['color'],    // css color: background color
            'color'                 :   pleisterman.colors['errorColor']['color'],                    // css color: color
            'border'                :   true,                           // boolan: has border
            'borderColor'           :   pleisterman.colors['errorDialogBorderColor']['color'],        // css color: border color
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
            self.values['selectModule'].getSelectData( self.values['value'], self.getSelectDataCallback );

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
  
            // add input html
            self.addInputHtml();
            
            // add error to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addInputHtml = function( ){
        // FUNCTION: addInputHtml( void ) void
            
            // add input info container to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputInfoContainerOptions ) );

            if( self.values['imageFileName'] !== '' ){
                // set file name
                self.inputOptions['selectedFileName'] = self.imageUploadUrl + values['id'] + '/thumbnail/' + values['imageFileName'];
            }
            // add input  to input info container
            $( '#' + self.inputInfoContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );
           
            // add input info input info container
            $( '#' + self.inputInfoContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputInfoOptions ) );

        // DONE FUNCTION: addInputHtml( void ) void
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
                    'name'              : value['name'],
                    'imageFileName'     : value['imageFileName'],
                    'width'             : value['width'],
                    'height'            : value['height']
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
                        'id'                : data['selectedRow']['id'],
                        'name'              : data['selectedRow']['name'],
                        'imageFileName'     : data['selectedRow']['imageFileName'],
                        'width'             : data['selectedRow']['width'],
                        'height'            : data['selectedRow']['height']
                    };
                    // doen cretae row
                    
                    // add selected to rows
                    self.rows.push( row );
                }
                // done selected not found in rows
                
                // show image and info
                self.showImageAndInfo( data['selectedRow']);
                // remember selected id
                self.inputOptions['selectedId'] = data['selectedRow']['id'];
            }
            else if( self.rows.length === 0 ) {
                // debug info
                self.debug( 'select has no rows' );
                // show error
                pleisterman.getError( self.values['selectNoRowsError'], self.showError );
            }
            else{
                // debug info
                self.debug( 'no selection' );
                // show image and info
                self.showImageAndInfo( null );              
            }
            // done data has selected row
            
        // DONE FUNCTION: getSelectDataCallback( json: data ) void
        };
        self.showImageAndInfo = function( selectedRow ){
        // FUNCTION: showImageAndInfo( json: selected row ) void

        // selected row exists
        if( selectedRow ){
            
            // create info
            var imageInfo = '';
            // add image name
            imageInfo += pleisterman.translations['name'] + ': ' + selectedRow['name'];
            imageInfo += '\n';
            
            // image file name !empty
            if( selectedRow['imageFileName'] !== '' ){
                // add file name
                imageInfo += pleisterman.translations['fileName'] + ': ' + selectedRow['imageFileName'];
                imageInfo += '\n';
                // add width
                imageInfo += pleisterman.translations['width'] + ': ' + selectedRow['width'];
                imageInfo += '\n';
                // add height
                imageInfo += pleisterman.translations['height'] + ': ' + selectedRow['height'];
                imageInfo += '\n';
                // done create info
                
                // set input src
                $( '#' + self.inputOptions['id'] ).attr( 'src', self.imageUploadUrl + selectedRow['id'] + '/thumbnail/' + selectedRow['imageFileName'] );
            }
            else {
                // add file name
                imageInfo += pleisterman.translations['noImageUploaded'];
                // set input src
                $( '#' + self.inputOptions['id'] ).attr( 'src', null );
            }
            // done image file name !empty
                
            // set image info
            $( '#' + self.inputInfoOptions['id'] ).val( imageInfo );
            
        }
        else {
            // create info
            var imageInfo = '';
            // add file name
            imageInfo += pleisterman.translations['noImageUploaded'];
            // set image info
            $( '#' + self.inputInfoOptions['id'] ).val( imageInfo );
            
            // set input src
            $( '#' + self.inputOptions['id'] ).attr( 'src', null );
        }
        // done selected row exists
        
            
        // DONE FUNCTION: showImageAndInfo( json: selected row ) void
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
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
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
            
            // add header html
            self.addListHeaderHtml();

            // rows count > 1
            if( self.rows.length > 0 ){
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
        self.addListHeaderHtml = function( ){
        // FUNCTION: addListHeaderHtml( void ) void
        
            // add header
            $( '#' + self.listContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listHeaderOptions ) );
            
        // DONE FUNCTION: addListHeaderHtml( void ) void
        };
        self.addNoRowsHtml = function( ){
        // FUNCTION: addNoRowsHtml( void ) void

            // set no rows row id
            self.rowOptions['id'] = self.rowOptions['idPrefix'] + self.values['id'] + '_noRows';
            // set image
            self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + 'noRowsIcon.png)';
            // add row
            $( '#' + self.listContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
            
            // create row image id
            var id = self.rowImageOptions['idPrefix'] + self.values['id'] + '_noRows';
            // add image 
            $( '#' + id ).html( jsProject.jsonToElementHtml( self.rowImageOptions ) );
            // set src
            $( '#' + self.rowImageOptions['id'] ).attr( 'src', 'url(' + self.imageUrl + 'noRowsIcon.png )' );

            // create row text id
            var id = self.rowImageOptions['idPrefix'] + 'Text' + self.values['id'] + '_noRows';
            // add image info
            $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowImageInfoOptions ) );
            // set text
            $( '#' + self.rowImageInfoOptions['id'] ).val( pleisterman.translations['noRows'] );
            
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
                // set id
                self.rowOptions['id'] = self.rowOptions['idPrefix'] + self.values['id'] + '_' + value['id'];
                
                // is selected 
                if( value['id'] === self.inputOptions['selectedId'] ){
                    // background color button highlight
                    self.rowOptions['backgroundColor'] = pleisterman.colors['panelHighlightBackgroundColor']['color'];
                    // color button highlight
                    self.rowOptions['color'] = pleisterman.colors['panelHighlightColor']['color'];
                }
                else {
                    // background color button highlight
                    self.rowOptions['backgroundColor'] = pleisterman.colors['panelBackgroundColor']['color'];
                    // color button highlight
                    self.rowOptions['color'] = pleisterman.colors['panelColor']['color'];
                }
                // done is selected

                // add row
                $( '#' + self.listContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );

                // create row id
                self.rowImageOptions['id'] = self.rowImageOptions['idPrefix'] + self.values['id'] + value['id'];
                // image file name !empty
                if(  value['imageFileName'] !== '' ){
                    // set src
                    self.rowImageOptions['src'] = self.imageUploadUrl + value['id'] + '/thumbnail/' + value['imageFileName'];
                }
                else {
                    // set src
                    self.rowImageOptions['src'] = null;
                }
                // done image file name !empty
                
                // add image 
                $( '#' + self.rowOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowImageOptions ) );
                // done set text values
                
                // create info
                var imageInfo = '';
                // add file name
                imageInfo += pleisterman.translations['name'] + ': ' + value['name'];
                imageInfo += '\n';
                imageInfo += '\n';
                
                // image file name !empty
                if(  value['imageFileName'] !== '' ){
                    // add file name
                    imageInfo += pleisterman.translations['fileName'] + ': ' + value['imageFileName'];
                    imageInfo += '\n';
                    // add width
                    imageInfo += pleisterman.translations['width'] + ': ' + value['width'];
                    imageInfo += '\n';
                    // add height
                    imageInfo += pleisterman.translations['height'] + ': ' + value['height'];
                    imageInfo += '\n';
                    // done create info
                }
                else {
                    // add file name
                    imageInfo += pleisterman.translations['noImageUploaded'];
                    imageInfo += '\n';
                }
                // image file name !empty
                
                // create row info id
                self.rowImageInfoOptions['id'] = self.rowImageOptions['idPrefix'] + 'Text' + self.values['id'] + '_' + value['id'];
                // add image info
                $( '#' + self.rowOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowImageInfoOptions ) );
                // set text
                $( '#' + self.rowImageInfoOptions['id'] ).val( imageInfo );
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
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['escape'],
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
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'tabStop',
                        'function'  :   self.closeList
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.selectRow
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowUp'],
                        'type'      :   'tabStop',
                        'function'  :   self.selectPreviousRow
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowDown'],
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
                if( row['id'] === self.rowOptions['tabStopSelectedId'] ){
                    // is tabstop selected row keep panel highlight color
                    $( '#' + elementId ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    $( '#' + elementId ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
                    // done mouse is out, row default colors
                }
                else {
                    // is tabstop selected row keep panel highlight color
                    $( '#' + elementId ).css( 'background-color', pleisterman.colors['panelBackgroundColor']['color'] );
                    $( '#' + elementId ).css( 'color', pleisterman.colors['panelColor']['color'] );
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
            pleisterman.setOption( self.values['selectOption'], id );
            
            // loop over rows
            $.each( self.rows, function( index, value ) {
                // found selected row
                if( value['id'] === self.rowOptions['selectedId'] ){
                    // create info
                    var imageInfo = '';
                    // add image name
                    imageInfo += pleisterman.translations['name'] + ': ' + value['name'];
                    imageInfo += '\n';

                    // image file name !empty
                    if( value['imageFileName'] !== '' ){

                        // add file name
                        imageInfo += pleisterman.translations['fileName'] + ': ' + value['imageFileName'];
                        imageInfo += '\n';
                        // add width
                        imageInfo += pleisterman.translations['width'] + ': ' + value['width'];
                        imageInfo += '\n';
                        // add height
                        imageInfo += pleisterman.translations['height'] + ': ' + value['height'];
                        imageInfo += '\n';
                        // done create info
                        
                        // set input src
                        $( '#' + self.inputOptions['id'] ).attr( 'src', self.imageUploadUrl + value['id'] + '/thumbnail/' + value['imageFileName'] );
                    }
                    else { 
                        // add file name
                        imageInfo += pleisterman.translations['noImageUploaded'];
                        // set input src
                        $( '#' + self.inputOptions['id'] ).attr( 'src', null );
                    }
                    // done image file name !empty

                    // set image info
                    $( '#' + self.inputInfoOptions['id'] ).val( imageInfo );

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
            pleisterman.setOption( self.values['selectOption'], self.rowOptions['tabStopSelectedId'] );
            
            // loop over rows
            $.each( self.rows, function( index, value ) {
                // found selected row
                if( value['id'] === self.rowOptions['tabStopSelectedId'] ){
                    // remember selected
                    self.inputOptions['selectedId'] = value['id'];
                    // create info
                    var imageInfo = '';
                    // add image name
                    imageInfo += pleisterman.translations['name'] + ': ' + value['name'];
                    imageInfo += '\n';

                    // image file name !empty
                    if( value['imageFileName'] !== '' ){

                        // add file name
                        imageInfo += pleisterman.translations['fileName'] + ': ' + value['imageFileName'];
                        imageInfo += '\n';
                        // add width
                        imageInfo += pleisterman.translations['width'] + ': ' + value['width'];
                        imageInfo += '\n';
                        // add height
                        imageInfo += pleisterman.translations['height'] + ': ' + value['height'];
                        imageInfo += '\n';
                        // done create info
                        
                        // set input src
                        $( '#' + self.inputOptions['id'] ).attr( 'src', self.imageUploadUrl + value['id'] + '/thumbnail/' + value['imageFileName'] );
                    }
                    // done image file name !empty
                    
                    // display row text
                    $( '#' + self.inputInfoOptions['id'] ).val( imageInfo );
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
    // DONE MODULE: dataEditSelectImageModule( string: contentId, json: values, boolean: isEdit ) void 
})( pleisterman );
// done create module function
