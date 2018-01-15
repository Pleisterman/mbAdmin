/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditLinkListModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          Displays a linked list
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

    // MODULE: dataEditLinkListModule( string: contentId, json: values ) void 
    
    pleisterman.dataEditLinkListModule = function( contentId, values ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditLinkListModule';                         // string:  MODULE
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
            'text'                  :   '',                             // string: text
            'hasFocus'              :   false,                          // boolean: has focus
            'mouseOver'             :   false,                          // boolean: moue over
        };                                                              // done json: input options
        self.linkedListContainerOptions = {                             // json: linked list container options
            'id'                    :   'dataLinkedListContainer' + self.values['id'],// string: element id
            'element'               :   'div',                          // string: html element type
            'overflow'              :   'hidden',                       // css overflow
            'display'               :   'inline-block',                 // css display
            'text'                  :   '',                             // string: text
            'styleWidth'            :   '14.2em',                       // css style width
            'styleHeight'           :   '10.0em',                       // css style height
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'] // css color: background color
        };                                                              // done json: link list container options
        self.unLinkedListContainerOptions = {                           // json: unlinked list container options
            'id'                    :   'dataUnLinkedListContainer' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type
            'overflow'              :   'hidden',                       // css overflow
            'display'               :   'inline-block',                 // css display
            'text'                  :   '',                             // string: text    
            'styleWidth'            :   '14.2em',                       // css style width
            'styleHeight'           :   '10.0em',                       // css style height
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'] // css color: background color
        };                                                              // done json: unlinked list container options
        self.listHeaderOptions = {                                      // json: list header options
            'element'               :   'div',                          // string: html element type 
            'text'                  :   'header',                       // string: text
            'minimumHeight'         :   '1.1em',                        // css minimum height
            'marginTop'             :   '0.1em',                        // css margin top
            'color'                 :   pleisterman.colors['panelHighlightColor']['color'], // css color: color
            'fontSize'              :   '0.9em',                        // css font size
            'marginBottom'          :   '0.2em',                        // css margin bottom
            'paddingLeft'           :   '1.2em',                        // css padding left
            'padding'               :   '0.2em',                        // css padding 
            'paddingBottom'         :   '0.4em',                        // css padding bottom
            'borderBottom'          :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],              // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'] // css color: background color
        };                                                              // done json: list header options
        self.listContentOptions = {                                     // json: list content options
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '',                             // string: text
            'overflowX'             :   'hidden',                       // css overflow-x
            'overflowY'             :   'auto',                         // css overflow-y
            'styleWidth'            :   '16,0em',                       // css style width
            'styleHeight'           :   '8.0em',                        // css style height
        };                                                              // done json: list content options
        self.rowOptions = {                                             // json: row options
            'idPrefixLinked'        :   self.MODULE + 'LinkedRow',      // string: id prefix linked rows
            'idPrefixunLinked'      :   self.MODULE + 'UnLinkedRow',    // string: id prefix unlinked rows
            'element'               :   'div',                          // string: html element type 
            'marginBottom'          :   2,                              // css margin bottom
            'marginTop'             :   2,                              // css margin top
            'borderTop'             :   true,                           // boolean: has border top
            'borderBottom'          :   true,                           // boolean: has border bottom
            'borderWidth'           :   '1px',                          // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],     // css color: border color
            'borderStyle'           :   'groove',                       // css border style
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'],   // css color: background color
            'padding'               :   4,                              // css padding
            'paddingBottom'         :   6,                              // css padding bottom
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '4px center',                   // css background position
            'cursor'                :   'pointer',                      // css cursor           
            'unLinkedSelected'      :   [],                             // json: unlinked selected
            'linkedSelected'        :   []                              // json: linked selected
        };                                                              // done json: row options
        self.rowTextOptions = {                                         // json: row text options
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'backgroundColor'       :   'transparent',                  // css background color
            'size'                  :   '60',                           // string: size
            'readOnly'              :   true,                           // boolean: readonly
            'overflow'              :   'hidden',                       // css overflow
            'paddingTop'            :   2,                              // css padding top
            'color'                 :   pleisterman.colors['editColor']['color'],         // css color: color
            'fontSize'              :   pleisterman.getSetting( 'listRowFontSize' ),      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'listRowFontWeight' ),    // css font weight
            'paddingLeft'           :   34,                             // css padding left
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: row text options    
        self.listsButtonsContainerOptions = {                           // json: list button container options
            'id'                    :   'dataLinkedListButtonContainer' + self.values['id'], //string: element id 
            'element'               :   'div',                          // string: html element type
            'overflow'              :   'hidden',                       // css overflow
            'display'               :   'inline-block',                 // css display 
            'text'                  :   '',                             // string: text
            'styleWidth'            :   '6.0em',                        // css style width
            'styleHeight'           :   '8.0em',                        // css style height
            'marginLeft'            :   '0.4em',                        // css margin left
            'marginRight'           :   '0.4em'                         // css margin right
        };                                                              // done json: list button container options
        self.listsButtonsLinkButtonOptions = {                          // json: lists button link button options
            'id'                    :   'dataLinkedListButtonsLinkButton' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type
            'text'                  :   '&lt;&lt;',                     // string: text
            'fontSize'              :   pleisterman.getSetting( 'fontSize' ), // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],             // css color: border color
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),                // css border width
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),                // css border style
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),               // css border radius
            'backgroundColor'       :   pleisterman.colors['buttonDisabledBackgroundColor']['color'], // css color: background color
            'color'                 :   pleisterman.colors['buttonDisabledColor']['color'],           // css color: color
            'textAlign'             :   'center',                       // css text align
            'padding'               :   pleisterman.getSetting( 'buttonPadding' ),    // css padding
            'marginTop'             :   '1.5em'                         // css margin top
        };                                                              // done json: lists button link button options
        self.listsButtonsUnLinkButtonOptions = {                        // json: lists button unlink button options
            'id'                    :   'dataLinkedListButtonsUnLinkButton' + self.values['id'], // string: element id
            'element'               :   'div',                          // string element type
            'fontSize'              :   pleisterman.getSetting( 'fontSize' ), // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'text'                  :   '&gt;&gt;',                     // string: text
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],             // css color: border color    
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),                // css border width
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),                // css border style
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),               // css border radius     
            'backgroundColor'       :   pleisterman.colors['buttonDisabledBackgroundColor']['color'], // css color: background color    
            'color'                 :   pleisterman.colors['buttonDisabledColor']['color'],           // css color: color    
            'textAlign'             :   'center',                       // css text align    
            'padding'               :   pleisterman.getSetting( 'buttonPadding' ), // css padding
            'marginTop'             :   '0.4em'                         // css margin top
        };                                                              // done json: lists button link button options
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
            switch( self.values['displayOptions']['type'] ){
                case 'time' : {
                        jQuery.extend( self.inputOptions, self.timeOptions );
                        break;
                } 
            };
            
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
  
            // lists container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );
            
            
            self.addLinkedListHtml();
            self.addListButtonsHtml();
            self.addUnLinkedListHtml();
            
            self.values['module'].getRows( self.refreshRows );

            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addLinkedListHtml = function(){
        // FUNCTION: addLinkedListHtml( void ) void
        
            // linked list container
            $( '#' + self.inputOptions['id'] ).append( jsProject.jsonToElementHtml( self.linkedListContainerOptions ) );
            
            // list header
            self.listHeaderOptions['id'] = self.linkedListContainerOptions['id'] + 'header';
            self.listHeaderOptions['text'] = pleisterman.translations['linked' + self.values['id']]; 
            $( '#' + self.linkedListContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listHeaderOptions ) );
            
            // list content
            self.listContentOptions['id'] = self.linkedListContainerOptions['id'] + 'content';
            $( '#' + self.linkedListContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listContentOptions ) );
            
        // DONE FUNCTION: addLinkedListHtml( void ) void
        };
        self.addUnLinkedListHtml = function(){
        // FUNCTION: addUnLinkedListHtml( void ) void
        
            // unlinked list container
            $( '#' + self.inputOptions['id'] ).append( jsProject.jsonToElementHtml( self.unLinkedListContainerOptions ) );

            // list header
            self.listHeaderOptions['id'] = self.unLinkedListContainerOptions['id'] + 'header';
            self.listHeaderOptions['text'] = pleisterman.translations['unLinked' + self.values['id']]; 
            $( '#' + self.unLinkedListContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listHeaderOptions ) );
            
            // list content
            self.listContentOptions['id'] = self.unLinkedListContainerOptions['id'] + 'content';
            $( '#' + self.unLinkedListContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listContentOptions ) );
            
        // DONE FUNCTION: addUnLinkedListHtml( void ) void
        };
        self.addListButtonsHtml = function(){
        // FUNCTION: addListButtonsHtml( void ) void
        
            // list buttons container
            $( '#' + self.inputOptions['id'] ).append( jsProject.jsonToElementHtml( self.listsButtonsContainerOptions ) );
            // link button
            $( '#' + self.listsButtonsContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listsButtonsLinkButtonOptions ) );
            // unlink button
            $( '#' + self.listsButtonsContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.listsButtonsUnLinkButtonOptions ) );
            
        // DONE FUNCTION: addListButtonsHtml( void ) void
        };
        self.refreshRows = function( rows ){
        // FUNCTION: refreshRows( void ) void
        
            // debug info
            self.debug( 'refreshRows' );
            
            // reset 
            self.rowOptions['unLinkedSelected'] = [];
            self.rowOptions['linkedSelected'] = [];
            $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
            $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonDisabledColor']['color'] );
            $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
            $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonDisabledColor']['color'] );
            // reset 

            // delete existing rows
            self.deleteRows();
            
            // set rows 
            self.rows = rows;
            
            // add row html
            self.addRowHtml();
            // add events
            self.addRowEvents();
            
        // DONE FUNCTION: refreshRows( void ) void
        };
        self.deleteRows = function(){
        // FUNCTION: deleteRows( void ) void
        
            // delete events
            self.deleteRowEvents();
            
            // delete linked html
            var contentId = self.linkedListContainerOptions['id'] + 'content'; 
            $( '#' + contentId ).html( '' );
            // delete unlinked html
            var contentId = self.unLinkedListContainerOptions['id'] + 'content'; 
            $( '#' + contentId ).html( '' );
            
        // DONE FUNCTION: deleteRows( void ) void
        };
        self.addRowHtml = function(){
        // FUNCTION: addRowHtml( void ) void
        
            // add linked row html
            self.addLinkedRowHtml();
            // add unlinked row html
            self.addUnLinkedRowHtml();
            
        // DONE FUNCTION: addRowHtml( void ) void
        };
        self.addLinkedRowHtml = function(){
        // FUNCTION: addLinkedRowHtml( void ) void
        
            // add no rows row
            self.addLinkedNoRowsRow();
            // add linked rows
            self.addLinkedRows();
            
        // DONE FUNCTION: addLinkedRowHtml( void ) void
        };
        self.addLinkedNoRowsRow = function(){
        // FUNCTION: addLinkedNoRowsRow( void ) void
        
            // set no rows row id
            self.rowOptions['id'] = self.rowOptions['idPrefixLinked'] + self.values['id'] + '_noRows';;
            // set image
            self.rowOptions['imageUrl'] = 'url( ' + self.imageUrl + 'noRowsIcon.png )';
            // create content id
            var contentId = self.linkedListContainerOptions['id'] + 'content'; 
            // add row
            $( '#' + contentId ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
            
            // set id 
            self.rowTextOptions['id'] = self.rowOptions['idPrefixLinked'] + 'Text' + self.values['id'] + '_noRows';
            // add text 
            $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
            // set text
            $( '#' + self.rowTextOptions['id'] ).val( pleisterman.translations['noRows'] );

            // has linked rows
            if( self.rows['linkedRows'].length > 0 ){
                // hide no rows row
                $( '#' + self.rowOptions['id'] ).hide();
            }
            // done has linked rows
            
        // DONE FUNCTION: addLinkedNoRowsRow( void ) void
        };
        self.addLinkedRows = function(){
        // FUNCTION: addLinkedRows( void ) void
        
            // create content id
            var contentId = self.linkedListContainerOptions['id'] + 'content'; 
            // loop over rows
            $.each( self.rows['linkedRows'], function( index, value ) {

                // set row id
                self.rowOptions['id'] = self.rowOptions['idPrefixLinked'] + self.values['id'] + '_' + value['id'];
                // set row image
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + self.values['id'] + 'RowIcon.png )';
                // add row
                $( '#' + contentId ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
                
                // set text id 
                self.rowTextOptions['id'] = self.rowOptions['idPrefixLinked'] + 'Text' + self.values['id'] + value['id'];            
                // add text 
                $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( value['text'] );
                
            });
            // done loop over rows
            
        // DONE FUNCTION: addLinkedRows( void ) void
        };
        self.addUnLinkedRowHtml = function(){
        // FUNCTION: addUnLinkedRowHtml( void ) void
        
            // add no rows row
            self.addUnLinkedNoRowsRow();
            // add unlinked rows
            self.addUnLinkedRows();
            
        // DONE FUNCTION: addUnLinkedRowHtml( void ) void
        };
        self.addUnLinkedNoRowsRow = function(){
        // FUNCTION: addUnLinkedNoRowsRow( void ) void
        
            // set no rows row id
            self.rowOptions['id'] = self.rowOptions['idPrefixUnLinked'] + self.values['id'] + '_noRows';;
            // set image
            self.rowOptions['imageUrl'] = 'url( ' + self.imageUrl + 'noRowsIcon.png )';
            // create content id
            var contentId = self.unLinkedListContainerOptions['id'] + 'content'; 
            // add row
            $( '#' + contentId ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
            
            // set id 
            self.rowTextOptions['id'] = self.rowOptions['idPrefixUnLinked'] + 'Text' + self.values['id'] + '_noRows';
            // add text 
            $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
            // set text
            $( '#' + self.rowTextOptions['id'] ).val( pleisterman.translations['noRows'] );

            // has unlinked rows
            if( self.rows['unLinkedRows'].length > 0 ){
                // hide no rows row
                $( '#' + self.rowOptions['id'] ).hide();
            }
            // done has unlinked rows
            
        // DONE FUNCTION: addUnLinkedNoRowsRow( void ) void
        };
        self.addUnLinkedRows = function(){
        // FUNCTION: addUnLinkedRows( void ) void
        
            // create content id
            var contentId = self.unLinkedListContainerOptions['id'] + 'content'; 
            // loop over rows
            $.each( self.rows['unLinkedRows'], function( index, value ) {

                // set row id
                self.rowOptions['id'] = self.rowOptions['idPrefixUnLinked'] + self.values['id'] + '_' + value['id'];
                // set row image
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + self.values['id'] + 'RowIcon.png )';
                // add row
                $( '#' + contentId ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
                
                // set text id 
                self.rowTextOptions['id'] = self.rowOptions['idPrefixUnLinked'] + 'Text' + self.values['id'] + value['id'];            
                // add text 
                $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( value['text'] );
                
            });
            // done loop over rows
            
        // DONE FUNCTION: addUnLinkedRows( void ) void
        };
        self.addRowEvents = function(){
        // FUNCTION: addRowEvents( void ) void
            
            // add linked row events
            self.addLinkedRowEvents();
            // add unLinked row events
            self.addUnLinkedRowEvents();
            
        // DONE FUNCTION: addRowEvents( void ) void
        };
        self.addLinkedRowEvents = function(){
        // FUNCTION: addLinkedRowEvents( void ) void
            
            // loop over rows
            $.each( self.rows['linkedRows'], function( index, value ) {
                var id = self.rowOptions['idPrefixLinked'] + self.values['id'] + '_' + value['id'];
                // row events
                $( '#' + id ).mouseleave( function( event ){ self.linkedRowMouseOut( event, this ); });
                $( '#' + id ).mouseenter( function( event ){ self.linkedRowMouseIn( event, this ); });
                $( '#' + id ).click( function( event ){ self.linkedRowClick( event, this ); });
                // done row events
                
            });
            
        // DONE FUNCTION: addLinkedRowEvents( void ) void
        };
        self.linkedRowMouseOut = function( event, element ){
        // FUNCTION: linkedRowMouseOut( event: event, html element: element ) void
            
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            var idIndex = self.rowOptions['linkedSelected'].indexOf( id );
            if(  idIndex >= 0 ){
                return;
            }

            // mouse over -> background, color
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['editColor']['color'] );
            
        // DONE FUNCTION: linkedRowMouseOut( event: event, html element: element ) void
        };
        self.linkedRowMouseIn = function( event, element ){
        // FUNCTION: linkedRowMouseIn( event: event, html element: element ) void
            
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            var idIndex = self.rowOptions['linkedSelected'].indexOf( id );
            if(  idIndex >= 0 ){
                return;
            }
                
            // mouse over -> background color, color highlight
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: linkedRowMouseIn( event: event, html element: element ) void
        };
        self.linkedRowClick = function( event, element ){
        // FUNCTION: linkedRowClick( event: event, html element: element ) void
            
            event.preventDefault();
            event.stopPropagation(); 
            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id 

            var idIndex = self.rowOptions['linkedSelected'].indexOf( id );
            if(  idIndex >= 0 ){
                self.rowOptions['linkedSelected'].splice( idIndex, 1 );
                $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                $( '#' + element.id ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            }
            else {
                self.rowOptions['linkedSelected'].push( id );
                $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelSelectedBackgroundColor']['color'] );
                $( '#' + element.id ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            }
            
            if(  self.rowOptions['linkedSelected'].length > 0 ){
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            } 
            else {
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonDisabledColor']['color'] );
            }
            
        // DONE FUNCTION: linkedRowClick( event: event, html element: element ) void
        };
        self.addUnLinkedRowEvents = function(){
        // FUNCTION: addUnLinkedRowEvents( void ) void
            
            // loop over rows
            $.each( self.rows['unLinkedRows'], function( index, value ) {
                var id = self.rowOptions['idPrefixUnLinked'] + self.values['id'] + '_' + value['id'];
                // row events
                $( '#' + id ).mouseleave( function( event ){ self.unLinkedRowMouseOut( event, this ); });
                $( '#' + id ).mouseenter( function( event ){ self.unLinkedRowMouseIn( event, this ); });
                $( '#' + id ).click( function( event ){ self.unLinkedRowClick( event, this ); });
                // done row events
                
            });
            
        // DONE FUNCTION: addUnLinkedRowEvents( void ) void
        };
        self.unLinkedRowMouseOut = function( event, element ){
        // FUNCTION: unLinkedRowMouseOut( event: event, html element: element ) void
            
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            var idIndex = self.rowOptions['unLinkedSelected'].indexOf( id );
            if(  idIndex >= 0 ){
                return;
            }

            // mouse over -> background, color
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['editColor']['color'] );
            
        // DONE FUNCTION: unLinkedRowMouseOut( event: event, html element: element ) void
        };
        self.unLinkedRowMouseIn = function( event, element ){
        // FUNCTION: unLinkedRowMouseIn( event: event, html element: element ) void
            
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            var idIndex = self.rowOptions['unLinkedSelected'].indexOf( id );
            if(  idIndex >= 0 ){
                return;
            }

            // mouse over -> background color, color highlight
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: unLinkedRowMouseIn( event: event, html element: element ) void
        };
        self.unLinkedRowClick = function( event, element ){
        // FUNCTION: unLinkedRowClick( event: event, html element: element ) void
            
            event.preventDefault();
            event.stopPropagation(); 
            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id 
            
            var idIndex = self.rowOptions['unLinkedSelected'].indexOf( id );
            if(  idIndex >= 0 ){
                self.rowOptions['unLinkedSelected'].splice( idIndex, 1 );
                $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                $( '#' + element.id ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            }
            else {
                self.rowOptions['unLinkedSelected'].push( id );
                $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelSelectedBackgroundColor']['color'] );
                $( '#' + element.id ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            }
            
            if(  self.rowOptions['unLinkedSelected'].length > 0 ){
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            } 
            else {
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonDisabledColor']['color'] );
            }
            
        // DONE FUNCTION: unLinkedRowClick( event: event, html element: element ) void
        };
        self.deleteRowEvents = function(){
        // FUNCTION: deleteRowEvents( void ) void
            
            // not initialized
            if( !self.rows ){
                return;
            }
            // done not initialized
            
            // loop over linked rows
            $.each( self.rows['linkedRows'], function( index, value ) {
                var id = 'linkedListRow' + self.values['id'] + '_' + value['id'];
                // remove events
                $( '#' + id ).off();
                
            });
            // done loop over linked rows

            // loop over unlinked rows
            $.each( self.rows['unLinkedRows'], function( index, value ) {
                var id = 'unLinkedListRow' + self.values['id'] + '_' + value['id'];
                // remove events
                $( '#' + id ).off();
                
            });
            // done loop over unlinked rows
            
        // DONE FUNCTION: deleteRowEvents( void ) void
        };
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void
            
            // list button link events
            $( '#' + self.listsButtonsLinkButtonOptions['id'] ).mouseenter( function( event ){ self.listButtonMouseIn( event, true ); });
            $( '#' + self.listsButtonsLinkButtonOptions['id'] ).mouseleave( function( event ){ self.listButtonMouseOut( event, true ); });
            $( '#' + self.listsButtonsLinkButtonOptions['id'] ).click( function( event ) { self.listButtonClick( event, true ); } ); 
            // done list button link events

            // list button unlink events
            $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).mouseenter( function( event ){ self.listButtonMouseIn( event, false ); });
            $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).mouseleave( function( event ){ self.listButtonMouseOut( event, false ); });
            $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).click( function( event ) { self.listButtonClick( event, false ); } ); 
            // done list button unlink events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.listButtonMouseIn = function( event, isLinkButton ){
        // FUNCTION: listButtonMouseIn( event: event, boolean: isLinkButton ) void
            
            if( isLinkButton ){
                if(  self.rowOptions['unLinkedSelected'].length === 0 ){
                    return;
                }
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            }
            else {
                if(  self.rowOptions['linkedSelected'].length === 0 ){
                    
                    return;
                }
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            }
            
        // DONE FUNCTION: listButtonMouseIn( event: event, boolean: isLinkButton ) void
        };
        self.listButtonMouseOut = function( event, isLinkButton ){
        // FUNCTION: listButtonMouseOut( event: event, boolean: isLinkButton ) void
            
            if( isLinkButton ){
                if(  self.rowOptions['unLinkedSelected'].length === 0 ){
                    return;
                }
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + self.listsButtonsLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            }
            else {
                if(  self.rowOptions['linkedSelected'].length === 0 ){
                    return;
                }
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + self.listsButtonsUnLinkButtonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            }
            
        // DONE FUNCTION: listButtonMouseOut( event: event, boolean: isLinkButton ) void
        };
        self.listButtonClick = function( event, isLinkButton){
        // FUNCTION: listButtonClick( event: event, boolean: isLinkButton ) void
            
            self.debug( 'listButonClick link: ' + isLinkButton );
            // prevent default
            event.preventDefault();
            // stop propagation
            event.stopPropagation();
            
            var rows = [];
            
            if( isLinkButton ){
                if(  self.rowOptions['unLinkedSelected'].length === 0 ){
                    return;
                }
                // loop over linked rows
                $.each( self.rows['linkedRows'], function( index, value ) {
                    rows.push( value['id'] );
                });
                $.each( self.rowOptions['unLinkedSelected'], function( index, value ) {
                    rows.push( value );
                });
                // done loop over linked rows
                self.values['module'].linkRows( rows, self.refreshRows );
            }
            else {
                if(  self.rowOptions['linkedSelected'].length === 0 ){
                    return;
                }
                // loop over linked rows
                $.each( self.rows['linkedRows'], function( index, value ) {
                    var selectedRowFound = false;
                    $.each( self.rowOptions['linkedSelected'], function( selectedIndex, selectedValue ) {
                        if( selectedValue === value['id'] ){
                            selectedRowFound = true;
                        }
                    });
                    if( !selectedRowFound ){
                        rows.push( value['id'] );
                    }
                });

                $.each( rows, function( index, value ) {
                   self.debug( 'row id: ' + value ); 
                });
                
                self.values['module'].linkRows( rows, self.refreshRows );
            }
            
        // DONE FUNCTION: listButtonClick( event: event, boolean: isLinkButton ) void
        };
        self.focusIn = function( ){
        // FUNCTION: focusIn( void ) void
            
            // debug info
            self.debug( 'focusIn' );
            
            // rememeber focus in
            self.inputOptions['hasFocus'] = true;
            
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
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void
            
            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();
            
        // DONE FUNCTION: removeEvents( void ) void
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
        self.setData = function(){
        // FUNCTION: setData( void ) void
            
            // no action
            
        // DONE FUNCTION: setData( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            
            return;

            // get font width
            var fontWidth = pleisterman.options['fontSize']['value']; 
            
            // calculate and set labelWidth
            $( '#' + self.labelOptions['id'] ).width( self.labelOptions['widthInLetters']  * fontWidth );
            // done calculate and set labelWidth

            // calculate and set linked  width
            $( '#' + self.inputOptions['id'] ).width( self.inputOptions['widthInLetters'] * fontWidth );
            // done calculate and set text width
            
            // calculate and set linked list width
            $( '#' + self.linkedListContainerOptions['id'] ).width( self.linkedListContainerOptions['widthInLetters'] * fontWidth );
            // done calculate and set linked list width
            
            // calculate and set linked list margin
            $( '#' + self.linkedListContainerOptions['id'] ).css( 'margin-left', self.linkedListContainerOptions['marginWidthInLetters'] * fontWidth + 'px' );
            // done calculate and set linked list margin
            
            // calculate and unlinked list width
            $( '#' + self.unLinkedListContainerOptions['id'] ).width( self.unLinkedListContainerOptions['widthInLetters'] * fontWidth );
            // done calculate and set unlinked list width
            
            // calculate and set unlinked list margin
            $( '#' + self.unLinkedListContainerOptions['id'] ).css( 'margin-left', self.unLinkedListContainerOptions['marginWidthInLetters'] * fontWidth + 'px' );
            // done calculate and set unlinked list margin
            
        // DONE FUNCTION: layoutChange( void ) void
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
    // DONE MODULE: dataEditLinkListModule( string: contentId, json: values ) void 
})( pleisterman );
// done create module function
