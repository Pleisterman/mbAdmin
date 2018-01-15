/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditDocumentsModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          Displays a documents list linked to the subject and id
 *          dispays buttons to show, add, update and delete documents
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

    // MODULE: dataEditDocumentsModule( string: contentId, json: values ) void 
    
    pleisterman.dataEditDocumentsModule = function( contentId, values ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditDocumentsModule';                        // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.values = values;                                           // json: values
        self.contentId = contentId;                                     // string: element id
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image dir
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
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display 
            'verticalAlign'         :   'top',                          // css verical align
            'styleWidth'            :   '35.0em',                       // css style width
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],         // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'hasFocus'              :   false,                          // boolean: has focus
            'mouseOver'             :   false,                          // boolean: moue over
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'], // css color: background color
            'padding'               :   '0.2em'                         // css padding
        };                                                              // done json: input options
        self.listContainerOptions = {                                   // json: list container options
            'id'                    :   'dataListContainer' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type
            'overflow'              :   'hidden',                       // css overflow
            'display'               :   'inline-block',                 // css display
            'styleWidth'            :   '34.9em',                       // css style height
            'styleHeight'           :   '12.0em',                       // css style width
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'] // css color: background color
        };                                                              // done json: list container options
        self.listContentOptions = {                                     // json: list content options
            'id'                    :   'dataListContent' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '',                             // string: text
            'overflowX'             :   'hidden',                       // css overflow-x
            'overflowY'             :   'auto',                         // css overflow-y
            'styleWidth'            :   '28,0em',                       // css style width
            'styleHeight'           :   '8.0em',                        // css style height
            'border'                :   true,                           // boolean, show border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: color
            'borderWidth'           :   '0.1em',                        // css border width 
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'],  // css color: background color
        };                                                              // done json: list content options
        self.rowOptions = {                                             // json: row options
            'idPrefix'              :   self.MODULE + 'Row',            // string: element id
            'element'               :   'div',                          // string: html element type 
            'overflow-x'            :   'hidden',                       // css overflow
            'marginBottom'          :   '0.2em',                        // css margin bottom
            'marginTop'             :   '0.2em',                        // css margin top
            'borderTop'             :   true,                           // boolean: has border top
            'borderBottom'          :   true,                           // boolean: has borderr bottom
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],  // css color: color
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'], // css color: background color
            'padding'               :   '0.4em',                        // css padding
            'paddingBottom'         :   '0.6em',                        // css padding bottom
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '0.4em center',                 // css background position
            'cursor'                :   'pointer',                      // css cursor           
            'selectedId'            :   null                            // string: selected id
        };                                                              // json: row options
        self.rowTextOptions = {                                         // json: row text options    
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'backgroundColor'       :   'transparent',                  // css background color
            'size'                  :   '60',                           // string: size
            'readOnly'              :   true,                           // boolean: readonly
            'paddingTop'            :   '0.2em',                        // css padding top
            'color'                 :   pleisterman.colors['editColor']['color'],         // css color: color
            'fontSize'              :   pleisterman.getSetting( 'listRowFontSize' ),      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'listRowFontWeight' ),    // css font weight 
            'paddingLeft'           :   '3.2em',                        // css padding left
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: row text options
        self.listButtonsContainerOptions = {                            // json: button container options    
            'id'                    :   'dataListButtonContainer' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type
            'text'                  :   '',                             // string: text
            'styleWidth'            :   '50.0em',                       // css style width
            'styleHeight'           :   '2.5em',                        // css style height
            'marginLeft'            :   '0.4em',                        // css margin left
            'marginRight'           :   '0.4em',                        // css margin right
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'], // css color: background color
            'marginTop'             :   '0.6em',                        // css margin top
            'spacing'               :   12                              // integer: spacing
        };                                                              // done json: button container options
        self.buttonOptions = {                                          // json: button options
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '&nbsp;',                       // string: element id
            'display'               :   'inline-block',                 // css display
            'marginTop'             :   '0.1em',                        // css margin top
            'marginLeft'            :   '0.3em',                        // css margin left
            'backgroundSize'        :   '1.8em 1.8em',                  // css background size
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'buttonFontSize' ),           // css font size
            'fontWeight'            :   pleisterman.getSetting( 'buttonFontWeight' ),         // css font weight    
            'padding'               :   pleisterman.getSetting( 'buttonPadding' ),            // css padding
            'marginBottom'          :   '0.4em',                        // css margin bottom
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),        // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],     // css color border color
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),        // css border style
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),       // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center',                       // css text align
            'focusId'               :   null                            // string: focusId
        };                                                              // done json: 
        self.buttonIds = [                                              // json: button id's
            'open',                                                     // string id for the button
            'insert',                                                   // string id for the button
            'update',                                                   // string id for the button
            'delete'                                                    // string id for the button
        ];                                                              // done json: button id's
        self.rows = null;                                               // json: rows
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

            // add list Container options
            if( self.values['displayOptions']['listContainer'] ){
                jQuery.extend( self.listContainerOptions, self.values['displayOptions']['listContainer'] );
            }
            // done add list container options
        
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
  
            // lists container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );

            // list container
            $( '#' + self.inputOptions['id'] ).append( jsProject.jsonToElementHtml( self.listContainerOptions ) );
            
            // list content
            $( '#' + self.listContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listContentOptions ) );
            
            // list buttons container
            $( '#' + self.listContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listButtonsContainerOptions ) );

            // loop over buttons
            $.each( self.buttonIds, function( index, buttonId ) {
                // add button
                self.buttonOptions['id'] = self.MODULE + self.values['id'] + '_' + buttonId;
                self.buttonOptions['text'] = pleisterman.translations[buttonId];;

                // add button html
                $( '#' + self.listButtonsContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
                // done add button
            });
            // done loop over buttons
            
            // create selection
            var selection = {
                'subject'       :   self.values['selectSubject'],
                'subjectId'     :   self.values['value']
            };
            // done create selection
            
            // get data
            self.values['selectModule'].getSelectData(  selection, self.refreshRows );

            // refresh layout
            self.layoutChange();
            
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
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.itemClick( event ); } ); 
            // done item events
            
        // DONE FUNCTION: addItemEvents( void ) void
        };    
        self.addButtonEvents = function( ){
        // FUNCTION: addButtonEvents( void ) void
            
            // create id
            var id = '';
            // loop over buttons
            $.each( self.buttonIds, function( index, buttonId ) {
                // create id 
                id = self.MODULE + self.values['id'] + '_' + buttonId;

                // set events
                $( '#' + id ).mouseleave( function( ){ self.buttonMouseOut( this.id ); });
                $( '#' + id ).mouseenter( function( ){ self.buttonMouseIn( this.id ); });
                $( '#' + id ).click( function( event ){ self.buttonClick( event, this.id ); });
                // done set events
            });
            // done loop over buttons
            
        // DONE FUNCTION: addButtonEvents( void ) void
        };    
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void
            
            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();

            // create id
            var id = '';            
            // loop over buttons
            for( var i = 0; i < self.buttonIds.length; i++ ) {
                // create id 
                id = self.MODULE + self.values['id'] + '_' + self.buttonIds[i];
                // remove input events
                $( '#' + id ).off();
            }
            // done loop over buttons
            
        // DONE FUNCTION: removeEvents( void ) void
        };    
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // create id
            var id = '';            
            // loop over buttons
            for( var i = 0; i < self.buttonIds.length; i++ ) {
                // create id 
                id = self.MODULE + self.values['id'] + '_' + self.buttonIds[i];
                // create tabstop options
                var tabStopOptions = {
                    'id'        :   id,
                    'layer'     :   'data',
                    'select'    :   self.buttonFocusIn,
                    'deSelect'  :   self.buttonFocusOut,
                    'canFocus'  :   false,
                    'keys'      :   [
                        {
                            'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                            'type'      :   'tabStop',
                            'function'  :   self.buttonPress
                        },
                        {
                            'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowUp'],
                            'type'      :   'tabStop',
                            'function'  :   self.listSelectPrevious
                        },
                        {
                            'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowDown'],
                            'type'      :   'tabStop',
                            'function'  :   self.listSelectNext
                        }
                    ]
                };
                // done create tabstop options
                
                // add tabstop
                jsProject.callEvent( 'registerTabStop', tabStopOptions );
            }
            // done loop over buttons
            
            // update tabstop enabled / disabled
            self.updateTabStops();     
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.updateTabStops = function(){
        // FUNCTION: updateTabStops( void ) void
            
            // create options
            var tabstopOptions = {
                'layer' :   'data',
                'id'    :   ''
            };
            // done create options

            // no rows
            if( !self.rows || self.rows.length === 0 ){
                
                // create id
                tabstopOptions['id'] = self.MODULE + self.values['id'] + '_open';
                // disable tab stop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
                
                // create id
                tabstopOptions['id'] = self.MODULE + self.values['id'] + '_delete';
                // disable tab stop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
                
                // create id
                tabstopOptions['id'] = self.MODULE + self.values['id'] + '_update';
                // disable tab stop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
                
            }
            else {

                // create id
                tabstopOptions['id'] = self.MODULE + self.values['id'] + '_open';
                // enable tab stop
                jsProject.callEvent( 'enableTabStop', tabstopOptions );
                
                // create id
                tabstopOptions['id'] = self.MODULE + self.values['id'] + '_delete';
                // enable tab stop
                jsProject.callEvent( 'enableTabStop', tabstopOptions );
                
                // create id
                tabstopOptions['id'] = self.MODULE + self.values['id'] + '_update';
                // enable tab stop
                jsProject.callEvent( 'enableTabStop', tabstopOptions );
                
            }
            // done no rows
            
        // DONE FUNCTION: updateTabStops( void ) void
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
            
            // remember mouse over 
            self.inputOptions['mouseOver'] = false;
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseOut( void ) void
        };       
        self.itemClick = function( event  ){
        // FUNCTION: itemClick( event: event ) void
            
            // stop propagation
            event.stopPropagation();

            // no rows
            if( !self.rows || self.rows.length === 0 ){
                // create id
                var id = self.MODULE + self.values['id'] + '_insert';
                // set tabstop on input
                jsProject.callEvent( 'selectTabStop', id );
                
            }
            else {
                // create id
                var id = self.MODULE + self.values['id'] + '_open';
                // set tabstop on input
                jsProject.callEvent( 'selectTabStop', id );
            }
            // done no rows
            
        // DONE FUNCTION: itemClick( event: event ) void
        };       
        self.buttonMouseIn = function( id ){
        // FUNCTION: buttonMouseIn( string: element id ) void
            
            // get id
            var idArray = id.split( '_' );  
            var buttonId = idArray[idArray.length - 1];
            // done get id

            // no rows
            if( !self.rows || self.rows.length === 0 ){
                // id = open, update, delete
                if( buttonId === 'open' ||
                    buttonId === 'update' ||
                    buttonId === 'delete' ){
                    // done 
                    return;
                }
                // done id = open, update, delete
            }
            // done no rows
            
            // mouse over -> background color, color highlight
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color, color highlight
            $( '#' + id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );

        // DONE FUNCTION: buttonMouseIn( string: element id ) void
        };
        self.buttonMouseOut = function( id ){
        // FUNCTION: buttonMouseOut( string: element id ) void
            
            // get id
            var idArray = id.split( '_' );  
            var buttonId = idArray[idArray.length - 1];
            // done get id

            // no rows
            if( !self.rows || self.rows.length === 0 ){
                // is open update or delete
                if( buttonId === 'open' ||
                    buttonId === 'update' ||
                    buttonId === 'delete' ){
                    // done
                    return;
                }
                // done is open update or delete
            }
            // done no rows

            // mouse over -> background color, color default
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color, color default
            $( '#' + id ).css( 'color', pleisterman.colors['buttonColor']['color'] );

        // DONE FUNCTION: buttonMouseOut( string: element id ) void
        };
        self.buttonClick = function( event, id ){
        // FUNCTION: buttonClick( event: event, string: element id ) void
            
            // stop propagation
            event.stopPropagation();
            // call click
            self.buttonPress( id );

        // DONE FUNCTION: buttonClick( event: event, string: element id ) void
        };
        self.buttonPress = function( id ){
        // FUNCTION: buttonPress( element id ) void
            
            // get id
            var idArray = id.split( '_' );  
            var buttonId = idArray[idArray.length - 1];
            // done get id
            
            // no rows
            if( !self.rows || self.rows.length === 0 ){
                // is open update or delete
                if( buttonId === 'open' ||
                    buttonId === 'update' ||
                    buttonId === 'delete' ){
                    // done
                    return;
                }
                // done is open update or delete
            }
            // done no rows
            
            // set tabstop on input
            jsProject.callEvent( 'selectTabStop', id );
            
            // which id
            switch( buttonId ){
                case 'open' :   {
                    // open
                    self.open();
                    // done
                    break;
                }
                case 'insert' :   {
                    // create document screen options    
                    var options = {
                        'elementId'     :   self.listContentOptions['id'],
                        'callback'      :   self.uploadDocumentCallback,
                        'workDirectory' :   pleisterman.workDirectory,
                        'subject'       :   self.values['selectSubject'],
                        'subjectId'     :   self.values['value'],
                        'mode'          :   'insert'
                    };
                    // done create document screen options    

                    // show document upload screen.
                    pleisterman.showDocumentUpload( options );
                    // done
                    break;
                }
                case 'update' :   {
                    // create document screen options    
                    var options = {
                        'elementId'     :   self.listContentOptions['id'],
                        'callback'      :   self.uploadDocumentCallback,
                        'workDirectory' :   pleisterman.workDirectory,
                        'subject'       :   self.values['selectSubject'],
                        'subjectId'     :   self.values['value'],
                        'documentId'    :   self.rowOptions['selectedId'],
                        'mode'          :   'update'
                    };
                    // done create document screen options    
                    
                    // show document upload screen.
                    pleisterman.showDocumentUpload( options );
                    // done
                    break;
                }
                case 'delete' :   {
                    // delete     
                    self.deleteButtonClick();
                    // done
                    break;
                }
            }
            // which id

        // DONE FUNCTION: buttonPress( element id ) void
        };
        self.buttonFocusIn = function( id ){
        // FUNCTION: buttonFocusIn( string: id ) void
            
            // remember focus in
            self.inputOptions['hasFocus'] = true;
            // remember focus id
            self.buttonOptions['focusId'] = id;

            self.debug( 'testink focus id: ' + id );
            // show input
            jsProject.scrollElement( id, self.contentId );

            // refresh display
            self.updateDisplay();

        // DONE FUNCTION: buttonFocusIn( string: id ) void
        };
        self.buttonFocusOut = function( id ){
        // FUNCTION: buttonFocusOut( string: id ) void
            
            // debug info
            self.debug( 'focusOut' );
            
            // remember focus out
            self.inputOptions['hasFocus'] = false;
            // unset focus id
            self.buttonOptions['focusId'] = null;

            // refresh display
            self.updateDisplay();

        // DONE FUNCTION: buttonFocusOut( string: id ) void
        };
        self.listFocusIn = function(){
        // FUNCTION: listFocusIn( void ) void
            
            // remember focus out
            self.inputOptions['hasFocus'] = true;
            // refresh display
            self.updateDisplay();

        // DONE FUNCTION: listFocusIn( void ) void
        };
        self.listFocusOut = function(){
        // FUNCTION: listFocusOut( void ) void
            
            // remember focus out
            self.inputOptions['hasFocus'] = false;
            
            // refresh display
            self.updateDisplay();

        // DONE FUNCTION: listFocusOut( void ) void
        };
        self.listSelectPrevious = function(){
        // FUNCTION: listSelectPrevious( void ) void
            
            // debug info
            self.debug( 'listSelectPrevious' );
            // no rows or only 1 row
            if( !self.rows || self.rows.length <= 1 ){
                // done
                return;
            }
            // done no rows or only 1 row
            
            // create index
            var selectedIndex = null;
            
            // loop over rows
            var i = 0;
            $.each( self.rows, function( index, row ) {
                // creeate id
                var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];
                // is selected id 
                if( self.rowOptions['selectedId'] === row['id'] ){
                    $( '#' + id ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
                    selectedIndex = i;
                }
                i++;
            });
            // done loop over rows
            
            // index < rows length
            if( selectedIndex > 0 ){
                // next index
                selectedIndex--;
            }
            // done index < rows length
            
            // loop over rows
            var i = 0;
            $.each( self.rows, function( index, row ) {
                // is selected id 
                if( i === selectedIndex ){
                    // creeate id
                    var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];
                    $( '#' + id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    self.rowOptions['selectedId'] = row['id'];
                }
                i++;
            });
            // done loop over rows

        // DONE FUNCTION: listSelectPrevious( void ) void
        };
        self.listSelectNext = function(){
        // FUNCTION: listSelectNext( void ) void
            
            // debug info
            self.debug( 'listSelectNext' );
            
            // no rows or only 1 row
            if( !self.rows || self.rows.length <= 1 ){
                // done
                return;
            }
            // done no rows or only 1 row
            
            // create index
            var selectedIndex = null;
            
            // loop over rows
            var i = 0;
            $.each( self.rows, function( index, row ) {
                // creeate id
                var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];
                // is selected id 
                if( self.rowOptions['selectedId'] === row['id'] ){
                    $( '#' + id ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
                    selectedIndex = i;
                }
                i++;
            });
            // done loop over rows
            
            // index < rows length
            if( selectedIndex < self.rows.length - 1 ){
                // next index
                selectedIndex++;
            }
            // done index < rows length
            
            // loop over rows
            var i = 0;
            $.each( self.rows, function( index, row ) {
                // is selected id 
                if( i === selectedIndex ){
                    // creeate id
                    var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];
                    $( '#' + id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    self.rowOptions['selectedId'] = row['id'];
                }
                i++;
            });
            // done loop over rows

        // DONE FUNCTION: listSelectNext( void ) void
        };
        self.uploadDocumentCallback = function( id ){
        // FUNCTION: uploadDocumentCallback( integer: id ) void
            
            // debug info
            self.debug( 'self.uploadDocumentCallback  id: ' + id );

            // remember selected
            self.rowOptions['selectedId'] = id;
                
            // create row selection options    
            var selection = {
                'subject'       :   self.values['selectSubject'],
                'subjectId'     :   self.values['value']
            };
            // done create row selection options    
            
            // get rows
            self.values['selectModule'].getSelectData(  selection, self.refreshRows );

        // DONE FUNCTION: uploadDocumentCallback( integer: id ) void
        };
        self.open = function(){
        // FUNCTION: open( void ) void
            
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'documents',
                'what'              :   'documentContent',
                'selection'         :   self.rowOptions['selectedId'] 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.secureDownload( '/' + pleisterman.baseDirectory + '/read', pleisterman.token, data );

        // DONE FUNCTION: open( void ) void
        };
        self.deleteButtonClick = function(){
        // FUNCTION: deleteButtonClick( void ) void
            
            // create delete message options
            var messageOptions = {
                'isYesNo' : true,
                'okCallback' : self.delete,
                'okCallbackParameters' : null
            };
            // done create delete message options
            
            // show delete ok message
            pleisterman.showMessage( 'documentDeleteOk', messageOptions );

        // DONE FUNCTION: deleteButtonClick( void ) void
        };
        self.delete = function(){
        // FUNCTION: delete( void ) void
            
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'documents',
                'what'              :   'delete',
                'id'                :   self.rowOptions['selectedId'] 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.deleteCallback );

        // DONE FUNCTION: delete( void ) void
        };
        self.deleteCallback = function( result ){
        // FUNCTION: deleteCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                pleisterman.showCriticalError( result['criticalError'] );
                return;
            }
            // done check critical errors
            
            // has error
            if( result['error'] ){
                self.debug( result['error'] );
                if( result['error'] === 'documentAlreadyDeleted' ){
                    // show error message
                    pleisterman.getError( result['error'], pleisterman.showError( 'documentAlreadyDeleted' ) );
                }
            }            
            // done has error
            
            // unset selected
            self.rowOptions['selectedId'] = null;
            
            // create rows selection options
            var selection = {
                'subject'       :   self.values['selectSubject'],
                'subjectId'     :   self.values['value']
            };
            // done create rows selection options

            // get rows
            self.values['selectModule'].getSelectData( selection, self.refreshRows );

        // DONE FUNCTION: deleteCallback( json: result ) void
        };
        self.buttonsDisplayChange = function(){
        // FUNCTION: buttonsDisplayChange( void ) void
            
            // create id
            var id = '';
            
            // has rows
            if( !self.rows || self.rows.length === 0 ){
                // loop over buttons
                for( var i = 0; i < self.buttonIds.length; i++ ){
                    // create id
                    id = self.MODULE + self.values['id'] + '_' + self.buttonIds[i];
                    if( self.buttonIds[i] === 'open' ||
                        self.buttonIds[i] === 'update' ||
                        self.buttonIds[i] === 'delete' ){
                        // set background color
                        $( '#' + id ).css( 'background-color', pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                        // set color
                        $( '#' + id ).css( 'color', pleisterman.colors['buttonDisabledColor']['color'] );
                        // set cursor
                        $( '#' + id ).css( 'cursor', 'default' );
                    }
                    else if( self.buttonOptions['focusId'] === self.MODULE + self.values['id'] + '_' + 'insert' ){
                        // set background color
                        $( '#' + id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                        // set color
                        $( '#' + id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
                        // set cursor
                        $( '#' + id ).css( 'cursor', 'pointer' );
                    }
                    else {
                        // set background color
                        $( '#' + id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                        // set color
                        $( '#' + id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
                        // set cursor
                        $( '#' + id ).css( 'cursor', 'pointer' );
                    }
                }
                // done loop over buttons
                
            }
            else {
                // loop over buttons
                for( var i = 0; i < self.buttonIds.length; i++ ){
                    // create id
                    id = self.MODULE + self.values['id'] + '_' + self.buttonIds[i];
                    // is focusId
                    if(  self.buttonOptions['focusId'] === id ){
                        // set background color
                        $( '#' + id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                        // set color
                        $( '#' + id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
                        // set cursor
                        $( '#' + id ).css( 'cursor', 'pointer' );
                    }
                    else {
                        // set background color
                        $( '#' + id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                        // set color
                        $( '#' + id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
                        // set cursor
                        $( '#' + id ).css( 'cursor', 'pointer' );
                    }
                    // done is focusId
                }
                // done loop over buttons
            }
            // done has rows

        // DONE FUNCTION: buttonsDisplayChange( void ) void
        };
        self.refreshRows = function( result ){
        // FUNCTION: refreshRows( json: result ) void
            
            // debug info
            self.debug( 'refreshRows rows length: ' + result['rows'].length );
            
            // delete existing rows
            self.deleteRows();
            // set rows 
            self.rows = result['rows'];
            // add row html
            self.addRowsHtml();
            // add events
            self.addRowsEvents();
            
            if( self.inputOptions['hasFocus'] ){
                if( !self.rows || self.rows.length <= 1 ){
                    jsProject.callEvent( 'selectTabStop', self.MODULE + self.values['id'] + '_insert' );
                }
            }
                
            // display change Buttons
            self.buttonsDisplayChange();
            // change tabstops enabled / disabled
            self.updateTabStops();

        // DONE FUNCTION: refreshRows( void ) void
        };        
        self.deleteRows = function(){
        // FUNCTION: deleteRows( void ) void
            
            // delete events
            self.deleteRowEvents();
            
            // delete rows html
            $( '#' + self.listContentOptions['id'] ).html( '' );

        // DONE FUNCTION: deleteRows( void ) void
        };
        self.addRowsHtml = function(){
        // FUNCTION: addRowsHtml( void ) void
            
            // has rows
            if( self.rows.length === 0 ){
                // add no rows row html
                self.addNoRowsRow();
                // create delete button id
                var id = self.MODULE + self.values['id'] + '_delete';
                // set delete button background color disabled
                $( '#' + id ).css( 'background-color', pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                // set delete button color disabled
                $( '#' + id ).css( 'color', pleisterman.colors['buttonDisabledColor']['color'] );

                // create open button id
                var id = self.MODULE + self.values['id'] + '_open';
                // set open background color disabled
                $( '#' + id ).css( 'background-color', pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                // set open button color disabled
                $( '#' + id ).css( 'color', pleisterman.colors['buttonDisabledColor']['color'] );
            }
            else {
                // add rows 
                self.addRows();
                // add row events
                self.addRowsEvents();
                // select row
                self.selectRow();
            }
            // done has rows

        // DONE FUNCTION: addRowsHtml( void ) void
        };
        self.addNoRowsRow = function(){
        // FUNCTION: addNoRowsRow( void ) void
            
            // create id
            var id = self.MODULE + self.values['id'] + '_noRows';
            // set id
            self.rowOptions['id'] = id;
            // set image
            self.rowOptions['imageUrl'] = 'url( ' + self.imageUrl + 'noRowsIcon.png )';
            // add row
            $( '#' + self.listContentOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowOptions ) );
            
            // set id 
            self.rowTextOptions['id'] = self.rowOptions['idPrefix'] + 'Text' + self.values['id'] + '_noRows';
            // add text 
            $( '#' + id ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
            // set text
            $( '#' + self.rowTextOptions['id'] ).val( pleisterman.translations['noRows'] );

        // DONE FUNCTION: addNoRowsRow( void ) void
        };
        self.addRows = function(){
        // FUNCTION: addRows( void ) void
            
            // loop over rows
            $.each( self.rows, function( index, row ) {
                // create id
                var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];
                // set id 
                self.rowOptions['id'] = id;
                // set image
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + self.values['id'] + 'DataRowIcon.png )';
                // add row
                $( '#' + self.listContentOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
                
                // set id 
                self.rowTextOptions['id'] = self.rowOptions['idPrefix'] + 'Text' + self.values['id'] + '_' + row['id'];
                // add text 
                $( '#' + id ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( row['text'] );
            });
            // done loop over rows

        // DONE FUNCTION: addRows( void ) void
        };
        self.addRowsEvents = function(){
        // FUNCTION: addRowsEvents( void ) void
            
            // loop over rows
            $.each( self.rows, function( index, row ) {
                var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + row['id'];
                // row events
                $( '#' + id ).mouseleave( function( event ){ self.rowMouseOut( this ); });
                $( '#' + id ).mouseenter( function( event ){ self.rowMouseIn( this ); });
                $( '#' + id ).click( function( event ){ self.rowClick( this ); });
                // done row events
            });

        // DONE FUNCTION: addRowsEvents( void ) void
        };
        self.rowMouseIn = function( element ){
        // FUNCTION: rowMouseIn( html element: element ) void
            
            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id
            
            // is selected
            if( id === self.rowOptions['selectedId'] ){
                // done
                return;
            }
            // done is selected
            
            // change colors
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            // done change colors

        // DONE FUNCTION: rowMouseIn( html element: element ) void
        };
        self.rowMouseOut = function( element ){
        // FUNCTION: rowMouseOut( html element: element ) void
            
            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id
            
            // is selected
            if( id === self.rowOptions['selectedId'] ){
                // done
                return;
            }
            // done is selected
            
            // change colors
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            // done change colors

        // DONE FUNCTION: rowMouseOut( html element: element ) void
        };
        self.rowClick = function( element ){
        // FUNCTION: rowClick( html element: element ) void
            
            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id 

            // already selected
            if( id === self.rowOptions['selectedId'] ){
                // done 
                return;
            }
            // done already selected

            // get selected id
            var selectedId = self.rowOptions['idPrefix'] + self.values['id'] + '_' + self.rowOptions['selectedId'];
            // set background color
            $( '#' + selectedId ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            // set cursor
            $( '#' + selectedId ).css( 'cursor', 'pointer' );
            // done deselect selected

            // set background color
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            // set cursor
            $( '#' + element.id ).css( 'cursor', 'default' );
            // remember selection 
            self.rowOptions['selectedId'] = id;
            // done select

        // DONE FUNCTION: rowClick( html element: element ) void
        };
        self.deleteRowEvents = function(){
        // FUNCTION: deleteRowEvents( void ) void
            
            // not initialized
            if( !self.rows ){
                // done 
                return;
            }
            // done not initialized
            
            // loop over linked rows
            $.each( self.rows, function( index, value ) {
                // create id 
                var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + value['id'];
                // remove events
                $( '#' + id ).off();
                
            });
            // done loop over linked rows

        // DONE FUNCTION: deleteRowEvents( void ) void
        };
        self.selectRow = function(){
        // FUNCTION: selectRow( void ) void
            
            // has selection
            if( self.rowOptions['selectedId'] ){
                    // create id 
                    var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + self.rowOptions['selectedId'];
                    // show row
                    $( '#' + id )[0].scrollIntoView( false );
                    // set background color
                    $( '#' + id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    // set cursor
                    $( '#' + id ).css( 'cursor', 'default' );
            }
            else{
                // has rows
                if( self.rows.length > 0 ){
                    // create id 
                    var id = self.rowOptions['idPrefix'] + self.values['id'] + '_' + self.rows[0]['id'];
                    // show row
                    $( '#' + id )[0].scrollIntoView( false );
                    // set background color
                    $( '#' + id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    // set cursor
                    $( '#' + id ).css( 'cursor', 'default' );
                    // remember selection 
                    self.rowOptions['selectedId'] = self.rows[0]['id'];
                }
                // done has rows
            }
            // done has selection

        // DONE FUNCTION: selectRow( void ) void
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
            
            // update button displaay
            self.buttonsDisplayChange();

        // DONE FUNCTION: updateDisplay( void ) void
        };
        self.setData = function(){
        // FUNCTION: setData( void ) void
            
            // no action

        // DONE FUNCTION: setData( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // calculate height of content
            var height = $( '#' + self.listContainerOptions['id'] ).height( );
            height -= $( '#' + self.listButtonsContainerOptions['id'] ).outerHeight( );
            height -= self.listButtonsContainerOptions['spacing'];
            // done calculate height of content
            
            // set height of content
            $( '#' + self.listContentOptions['id'] ).height( height );

        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove events
            self.removeEvents();

            // remove event subscriptions
            self.removeEventSubscriptions();

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
    // DONE MODULE: dataEditDocumentsModule( string: contentId, json: values ) void 
})( pleisterman );
// done create module function
