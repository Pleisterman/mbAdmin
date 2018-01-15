/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditDateModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          Displays a date input within the data content.
 *          
 *          Optional display of a checkbox,
 *          when checked the date is displayed
 *          
 *          links an error function for error call
 *          diplays an error
 *          
 *          shows a datepicker to select a date
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

    // MODULE: dataEditDateModule( string: contentId, json: values, boolean: isEdit ) void 
    
    sharesoft.dataEditDateModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditDateModule';                             // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.isEdit = isEdit;                                           // boolean: isEdit    
        self.values = values;                                           // json: values
        self.contentId = contentId;                                     // string: element id
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
            'marginRight'           :   sharesoft.getSetting( 'dataEditLabelMarginRight' ),     // css margin right
            'styleWidth'            :   sharesoft.getSetting( 'dataEditLabelWidth' ),           // css style width
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'input',                        // string: html element type 
            'readOnly'              :   true,                           // boolean: read only
            'type'                  :   'text',                         // string: input type 
            'display'               :   'inline-block',                 // css display 
            'textAlign'             :   'center',                       // css text align
            'verticalAlign'         :   'middle',                       // css verical align
            'backgroundColor'       :   sharesoft.colors['editBackgroundColor']['color'],       // css color background color
            'fontSize'              :   sharesoft.getSetting( 'dataEditCheckboxFontSize' ),     // css font size
            'lineHeight'            :   sharesoft.getSetting( 'dataEditCheckboxFontSize' ),     // css line height
            'fontWeight'            :   sharesoft.getSetting( 'dataEditCheckboxFontWeight' ),   // css font weight
            'color'                 :   sharesoft.colors['editColor']['color'],                 // css color: color
            'styleWidth'            :   '6.0em',                        // css style width
            'borderWidth'           :   '1.0em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   sharesoft.getSetting( 'dataEditBorderRadius' ),         // border radius
            'cursor'                :   'pointer',                      // css cursor
            'hasFocus'              :   false,                          // boolean: has focus
            'selectActive'          :   true,                           // boolean: select active    
            'mouseOver'             :   false,                          // boolean: moue over
            'datePickerOpen'        :   false                           // boolean: datepicker open
        };                                                              // done json: input options
        self.checkboxOptions = {                                        // json: checkbox options
            'id'                    :   'inputCheckbox' + self.values['id'],  // string: element id
            'checked'               :   false,                          // boolean: checked
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '&nbsp;',                       // string: element id    
            'styleWidth'            :   '1.2em',                        // css style width
            'styleHeight'           :   '1.2em',                        // css style height
            'readOnly'              :   true,                           // boolean: read on;y
            'textAlign'             :   'center',                       // css text align
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'],     // css color background color
            'fontSize'              :   sharesoft.getSetting( 'dataEditCheckboxFontSize' ),     // css font size
            'lineHeight'            :   sharesoft.getSetting( 'dataEditCheckboxFontSize' ),     // css line height
            'fontWeight'            :   sharesoft.getSetting( 'dataEditCheckboxFontWeight' ),   // css font weight
            'color'                 :   sharesoft.colors['buttonColor']['color'],               // css color: color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'checkboxBorderWidth' ),          // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],          // css color border color
            'borderStyle'           :   sharesoft.getSetting( 'checkboxBorderStyle' ),          // css border style
            'borderRadius'          :   sharesoft.getSetting('dataEditBorderRadius'),           // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'mouseOver'             :   false                           // boolean: mouse over
        };                                                              // done json: chackbox options
        self.errorOptions = {                                           // json: error options
            'id'                    :   'dataError' + self.values['id'],// string: element id    
            'element'               :   'div',                          // string: html element type
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'text'                  :   '',                             // string: text
            'zIndex'                :   '2',                            // css z-index
            'styleWidth'            :   sharesoft.getSetting( 'dataEditLabelWidth' ),           // css style width
            'backgroundColor'       :   sharesoft.colors['errorDialogBackgroundColor']['color'],// css color: background color    
            'color'                 :   sharesoft.colors['errorColor']['color'],                // css color: color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['errorDialogBorderColor']['color'],    // css color: border color
            'borderWidth'           :   '0.1em',                        // css border style
            'borderStyle'           :   'solid',                        // css border style
            'padding'               :   '0.2em',                        // css padding
            'borderRadius'          :   '0.1em',                        // css border radius
            'offsetTop'             :   12,                             // integer: offset top
            'offsetLeft'            :   4                               // integer: offset left
        };                                                              // json: error options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add callback functions
            self.addCallbackFunctions();

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
        self.addCallbackFunctions = function(){
        // FUNCTION: addCallbackFunctions( void ) void
            
            // link the error function
            if( self.values['errorFunction'] !== undefined ){
                // add function link
                self.values['errorFunction'] = self.showError;
            }
            // done link the error function
            
        // DONE FUNCTION: addCallbackFunctions( void ) void
        };
        self.removeCallbackFunctions = function(){
        // FUNCTION: removeCallbackFunctions( void ) void
            
            // error function link
            if( self.values['errorFunction'] !== undefined ){
                // remove function link 
                self.values['errorFunction'] = null;
            }        
            // done error function link
            
        // DONE FUNCTION: removeCallbackFunctions( void ) void
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
            
            // add checkbox options
            if( self.values['displayOptions']['checkbox'] ){
                jQuery.extend( self.checkboxOptions, self.values['displayOptions']['checkbox'] );
            }
            // done add checkbox options
            
            // has optional checkbox
            if( self.values['displayOptions']['optional'] ){
                // value = false
                if( self.values['value'] === 'false' ){
                    // set checkbox text ' '
                    self.checkboxOptions['text'] = '&nbsp;';
                }
                else {
                    // remember is checked
                    self.checkboxOptions['checked'] = true;
                    // set checkbox text X
                    self.checkboxOptions['text'] = 'X';
                }
                // done value = false
            }
            // done has optional checkbox
            
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
  
            // date is optional
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                // add checkbox to input container
                $(  '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.checkboxOptions ) );
            }
            // done date is optional

            // add input to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );

            // add error to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorOptions ) );

            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: addHtml( void ) void
        };  
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.mouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.mouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.click( event ); } ); 
            // done item events
            
            // input events
            $( '#' + self.inputOptions['id'] ).mouseenter( function( event ){ self.mouseIn(  ); });
            $( '#' + self.inputOptions['id'] ).mouseleave( function( event ){ self.mouseOut( ); });
            $( '#' + self.inputOptions['id'] ).click( function( event ){ self.click( event ); });
            // done input events
            
            // optional
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                // add checkbox events        
                $( '#' + self.checkboxOptions['id'] ).mouseenter( function( event ){ self.checkboxMouseIn( ); });
                $( '#' + self.checkboxOptions['id'] ).mouseleave( function( event ){ self.checkboxMouseOut( ); });
                $( '#' + self.checkboxOptions['id'] ).click( function( event ){ self.checkboxClick( event ); });
                // done add checkbox events        
            }
            // done optional
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void
            
            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();
            // remove input events
            $( '#' + self.inputOptions['id'] ).off();
            
            // has optional checkbox
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                // remove checkbox events
                $( '#' + self.checkboxOptions['id'] ).off();
            }
            // done has optional checkbox
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // has optional checkbox
            if( self.values['displayOptions']['optional'] ){
                // create tabstop options
                var tabStopOptions = {
                    'id'        :   self.checkboxOptions['id'],
                    'layer'     :   'data',
                    'select'    :   self.checkboxFocusIn,
                    'deSelect'  :   self.checkboxFocusOut,
                    'canFocus'  :   true,
                    'focusId'   :   self.checkboxOptions['id'],
                    'keys'      :   [
                        {
                            'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                            'type'      :   'tabStop',
                            'function'  :   self.checkboxToggle
                        }
                    ]
                };
                // done create tabstop options

                // add tabstop
                jsProject.callEvent( 'registerTabStop', tabStopOptions );
            }
            else {
                // create tabstop options
                var tabStopOptions = {
                    'id'        :   self.inputOptions['id'],
                    'layer'     :   'data',
                    'select'    :   self.inputFocusIn,
                    'deSelect'  :   self.inputFocusOut,
                    'canFocus'  :   false,
                    'keys'      :   [
                        {
                            'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                            'type'      :   'tabStop',
                            'function'  :   self.openDatePicker
                        }
                    ]
                };
                // done create tabstop options
                
                // add tabstop
                jsProject.callEvent( 'registerTabStop', tabStopOptions );
            }
            
            
            // has optional checkbox
            if( self.values['displayOptions']['optional'] ){
                // value = false
                if( self.values['value'] === 'false' ){
                    // disable date tabstop
                    // create options
                    var tabstopDisableOptions = {
                        'layer' :   'data',
                        'id'    :   self.inputOptions['id']
                    };
                    // done create options
                    jsProject.callEvent( 'disableTabStop', tabstopDisableOptions );
                    
                }
                // done value = false
            }
            // done has optional checkbox
            
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
            
            // stop propagation
            event.stopPropagation();

            // open date picker
            self.openDatePicker( );
            
        // DONE FUNCTION: click( event: event ) void
        };
        self.openDatePicker = function(){    
        // FUNCTION: openDatePicker( void ) void
            
            // date is optional 
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                // checkbox is checked
                if( !self.checkboxOptions['checked'] ){
                    // set checkbox checked
                    self.checkboxOptions['checked'] = true;
                    // set checkbox text
                    $( '#' + self.checkboxOptions['id'] ).html( 'X' );
                    // enable input tabstop
                    jsProject.callEvent( 'enableTabStop', self.inputOptions['id'] );
                    // refresh date tekst
                    self.displayDate();
                }
                // done checkbox is checked
            }
            // done date is optional 

            // set tabstop on input
            jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );

            // remove error show update / insert
            $( '#' + self.errorOptions['id'] ).html( '' );
            // hide the error
            $( '#' + self.errorOptions['id'] ).hide();
            // unset global value
            jsProject.callEvent( 'dataError', false );

            // remember colorPicker open 
            self.inputOptions['datePickerOpen'] = true;

            // open date picker
            sharesoft.showDataDatePicker( self.values['id'], self.datePickerCallback );
            
        // DONE FUNCTION: openDatePicker( void ) void
        };
        self.inputFocusIn = function( ){
        // FUNCTION: inputFocusIn( void ) void
            
            // debug info
            self.debug( 'focusIn' );
            
            // remember focus in
            self.inputOptions['hasFocus'] = true;
            
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                // show checkbox
                jsProject.scrollElement( self.checkboxOptions['id'], self.contentId );
            }
            else {
                // show input
                jsProject.scrollElement( self.inputOptions['id'], self.contentId );
            }
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: inputFocusIn( void ) void
        };
        self.inputFocusOut = function( ){
        // FUNCTION: inputFocusOut( void ) void
            
            // debug info
            self.debug( 'focusOut' );

            // remember focus out
            self.inputOptions['hasFocus'] = false;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: inputFocusOut( void ) void
        };
        self.updateDisplay = function( ){ 
        // FUNCTION: updateDisplay( void ) void
            
            // cursor
            $( '#' + self.inputOptions['id'] ).css( 'cursor', 'pointer' );
            $( '#' + self.itemContainerOptions['id'] ).css( 'cursor', 'pointer' );
            // done cursor
            
            // selected
            if( self.inputOptions['hasFocus'] || self.inputOptions['mouseOver'] || self.inputOptions['datePickerOpen'] ){
                // display selected
                self.setSelectedDisplay();
            }
            else {
                // reset display unselected
                self.resetRememberedDisplay();
            }
            // selected
            
            // refresh date text
            self.displayDate();
            
        // DONE FUNCTION: updateDisplay( void ) void
        };
        self.checkboxFocusIn = function( ){
        // FUNCTION: checkboxFocusIn( void ) void
            
            // show checkbox
            jsProject.scrollElement( self.checkboxOptions['id'], self.contentId );

            // remember focus in
            self.inputOptions['hasFocus'] = true;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: checkboxFocusIn( void ) void
        };
        self.checkboxFocusOut = function( ){
        // FUNCTION: checkboxFocusOut( void ) void
            
            // debug info
            self.debug( 'focusOut' );
            
            // rememeber focus out
            self.inputOptions['hasFocus'] = false;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: checkboxFocusOut( void ) void
        };
        self.checkboxMouseIn = function( ){
        // FUNCTION: checkboxMouseIn( void ) void
            
            // highlight backgrond color
            $( '#' + self.checkboxOptions['id'] ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // highlight color
            $( '#' + self.checkboxOptions['id'] ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );

            // remember mouse out
            self.inputOptions['mouseOver'] = true;
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: checkboxMouseIn( void ) void
        };        
        self.checkboxMouseOut = function( ){
        // FUNCTION: checkboxMouseOut( void ) void
            
            // default backgrond color
            $( '#' + self.checkboxOptions['id'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // default color
            $( '#' + self.checkboxOptions['id'] ).css( 'color', sharesoft.colors['buttonColor']['color'] );
               
            // remember mouse over
            self.checkboxOptions['mouseOver'] = false;            
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: checkboxMouseOut( void ) void
        };        
        self.checkboxClick = function( event ){
        // FUNCTION: checkboxClick( void ) void
            
            // stop propagation
            event.stopPropagation();
            // debug info
            self.debug( 'checkboxClick' );
            // set tabstop on input
            if( self.values['displayOptions']['optional'] ){
                // st tab stop on checkbox
                jsProject.callEvent( 'selectTabStop', self.checkboxOptions['id'] );
            }
            else {
                // st tab stop on input
                jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );
            }
            // toggle checkbox
            self.checkboxToggle();
            
        // DONE FUNCTION: checkboxClick( void ) void
        };        
        self.checkboxToggle = function(){
        // FUNCTION: checkboxToggle( void ) void
            
            // get checked value
            self.checkboxOptions['checked'] = !self.checkboxOptions['checked'];

            // checkbox is checked
            if( self.checkboxOptions['checked'] ){
                // set checkbox text
                $( '#' + self.checkboxOptions['id'] ).html( 'X' );
                // refresh date text
                self.displayDate();
                // remember colorPicker open 
                self.inputOptions['datePickerOpen'] = true;
                
                // create options
                var tabstopOptions = {
                    'layer' :   'data',
                    'id'    :   self.inputOptions['id']
                };
                // done create options
                
                // enable tabstop
                jsProject.callEvent( 'enableTabStop', tabstopOptions );

                // open date picker
                sharesoft.showDataDatePicker( self.values['id'], self.datePickerCallback );
                
            }
            else {
                // set checkbox text
                $( '#' + self.checkboxOptions['id'] ).html( '&nbsp;' );

                // create options
                var tabstopOptions = {
                    'layer' :   'data',
                    'id'    :   self.inputOptions['id']
                };
                // done create options
                
                // disable tabstop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
                
                // refesh date text
                self.displayDate();
            }
            // done checkbox is checked

            // handle change
            self.change();
            
        // DONE FUNCTION: checkboxToggle( void ) void
        };
        self.displayDate = function(){
        // FUNCTION: displayDate( void ) void
            
            // checked
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                // checkbox is checked
                if( self.checkboxOptions['checked'] ){

                    // initiaze date 
                    if( self.values['value'] === 'false' ){
                        // set input val to today
                        $( '#' + self.inputOptions['id'] ).val( jsProject.getTodayText() );
                    }
                    else {
                        var dateObject = jsProject.dbDateToDateObject( self.values['value'] );
                        $( '#' + self.inputOptions['id'] ).val( jsProject.dateObjectToText( dateObject ) );
                    }
                    // initiaze date 
                    $( '#' + self.inputOptions['id'] ).show();
                }
                else {
                    // hide the input
                    $( '#' + self.inputOptions['id'] ).css( 'display', 'none' );
                }
                // done checkbox is checked
            }            
            else {
                // set input display options
                $( '#' + self.inputOptions['id'] ).css( 'display', 'inline-block' );
                // get date
                var dateObject = jsProject.dbDateToDateObject( self.values['value'] );
                // set input text
                $( '#' + self.inputOptions['id'] ).val( jsProject.dateObjectToText( dateObject ) );
            }
            
        // DONE FUNCTION: displayDate( void ) void
        };
        self.datePickerCallback = function( changed ){
        // FUNCTION: datePickerCallback( boolean: changed ) void
            
            // debug info
            self.debug( 'datePickerCallback' );

            // remember colorPicker close 
            self.inputOptions['datePickerOpen'] = false;
            
            // changed
            if( changed ){

                // set date value
                var dateObject = jsProject.textToDateObject( $( '#' + self.inputOptions['id'] ).val() );
                var dbDate = jsProject.dateObjectToDbDate( dateObject );        
                self.values['value'] = dbDate;
                // done set date value
             
                // if is edit
                if( self.isEdit ){
                    // remember change event 
                    jsProject.setValue( 'changed', 'data', true );    
                }
                // done if is edit
                
                // call change callback
                if( self.values['changeCallback'] !== undefined ){
                    self.values['changeCallback']( dbDate );
                }
                // done call change callback

                // refresh display options
                self.updateDisplay();
            }
            // done changed
            
        // DONE FUNCTION: datePickerCallback( boolean: changed ) void
        };
        self.showError = function( message ){
        // FUNCTION: showError( string: message ) void
            
            // debug info
            self.debug( 'show error: ' + message );

            // show if mesage / hide when empty
            if( message ){
                // display error message 
                $( '#' + self.errorOptions['id'] ).html( message );
                // show error
                $( '#' + self.errorOptions['id'] ).show();
                // set global error
                jsProject.callEvent( 'dataError', true );
            }
            else {
                // hide error
                $( '#' + self.errorOptions['id'] ).hide();
                // set global no error
                jsProject.callEvent( 'dataError', false );
            }
            // done show if mesage / hide when empty
            
        // DONE FUNCTION: showError( string: message ) void
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
            
            var text = $( '#' + self.inputOptions['id'] ).val( );
            var year = text.slice( 6, 10 );
            var month = text.slice(  3, 5 );
            var day = text.slice( 0, 2 );
            
            // optional
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                
                if( self.checkboxOptions['checked'] ){
                    // display value -> js value 
                    self.values['value'] = year + month + day;
                }
                else {
                    // js value = false
                    self.values['value'] = 'false';
                }
            }
            // done optional
            else {
                // display value -> js value 
                self.values['value'] = year + month + day;
            }
            
        // DONE FUNCTION: setData( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            var labelWidth = $( '#' + self.labelOptions['id'] ).outerWidth();

            // set error positon
            var left = self.errorOptions['offsetLeft'];
            var top = $( '#' + self.inputOptions['id'] ).height();
            top += $( '#' + self.inputOptions['id'] ).position().top;
            top += self.errorOptions['offsetTop'];
            $( '#' + self.errorOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.errorOptions['id'] ).css( 'left', left + 'px' );
            // done set error positon

            // has optional checkbox
            if( self.values['displayOptions']['optional'] !== undefined && self.values['displayOptions']['optional'] ){
                // set input margin
                $( '#' + self.inputOptions['id'] ).css( 'margin-left', labelWidth + 'px' );
            }
            // done has optional checkbox
            
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

            // remove callback functions
            self.removeCallbackFunctions();

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
    // DONE MODULE: dataEditDateModule( string: contentId, json: values, boolean: isEdit ) void 
})( sharesoft );
// done create module function
