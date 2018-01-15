/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditSpinnerModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          diplays a number field with an up and a down button
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

    // MODULE: dataEditSpinnerModule( string: contentId, json: values, boolean: isEdit  ) void 
    
    pleisterman.dataEditSpinnerModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditSpinnerModule';                          // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.isEdit = isEdit;                                           // boolean: isEdit    
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
            'marginBottom'          :   '0.4em',                        // css margin bottom
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputAndButtonContainerOptions = {                         // json: input and button container options
            'id'                    :   'inputAndButtonContainer' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle'                        // css verical align
        };                                                              // done json: input and button container options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'input',                        // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'value'                 :   self.values['value'],           // json: values
            'readOnly'              :   true,                           // boolean: read only
            'type'                  :   'text',                         // string: html element type 
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'],       // css color: background color
            'color'                 :   pleisterman.colors['editColor']['color'],                 // css color: color
            'fontFamily'            :   pleisterman.options['fontFamily']['value'],               // css font family
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),        // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),      // css font weight
            'styleHeight'           :   '1.4em',                        // css style height
            'styleWidth'            :   '3.0em',                        // css style width
            'textAlign'             :   'center',                       // css text align
            'marginTop'             :   pleisterman.getSetting( 'dataEditLabelMarginTop' ),       // css margin top
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   pleisterman.getSetting( 'dataEditBorderRadius' ),         // css border radius
            'cursor'                :   'pointer',                      // css cursor
            'hasFocus'              :   false,                          // boolean: has focus
            'mouseOver'             :   false                           // boolean: mouse over
        };                                                              // done json: input options
        self.buttonOptions = {                                          // json: button options
            'downId'                :   'inputDataDownButton' + self.values['id'],  // string: down element id
            'downImage'             :   'buttonDown.png',               // string: image file name
            'downRepeatModule'      :   null,                           // module: down repeat module
            'downHasFocus'          :   false,                          // boolean: down has focus
            'downMouseOver'         :   false,                          // boolean: down mouse oer
            'upId'                  :   'inputDataUpButton' + self.values['id'],  // string: up element id
            'upImage'               :   'buttonUp.png',                 // string: image file name
            'upRepeatModule'        :   null,                           // module: up repeat module
            'upHasFocus'            :   false,                          // boolean: up has focus
            'upMouseOver'           :   false,                          // boolean: up mouse over
            'repeatSpeedSlow'       :   120,                            // miliseconds: repeat slow
            'repeatSpeedFast'       :   60,                             // miliseconds: repeat fast
            'element'               :   'span',                         // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'styleWidth'            :   '1.5em',                        // css style width
            'styleHeight'           :   '1.5em',                        // css margin left
            'marginLeft'            :   '0.8em',                        // relative size
            'marginTop'             :   pleisterman.getSetting( 'dataEditLabelMarginTop' ), // css margin top
            'marginRight'           :   '0.8em',                        // css margi right
            'backgroundSize'        :   '1.5em 1.5em',                  // css bacvkground size
            'backgroundColor'       :   pleisterman.colors['commonBackgroundColor']['color'],
            'backgroundPosition'    :   'center center',                // css background positiob
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style 
            'cursor'                :   'pointer'                       // css cursor            
        };                                                              // done json: button options
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
            
            // add font change
            jsProject.subscribeToEvent( 'fontChange', self.fontChange );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove font change
            jsProject.unSubscribeFromEvent( 'fontChange', self.fontChange );

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

            // add buttons and input
            self.addButtonsAndInput();
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addButtonsAndInput = function( ){
        // FUNCTION: addButtonsAndInput( void ) void

            // add buttonAndInputContainer to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputAndButtonContainerOptions ) );
            
            // add down button
            self.addDownButton();
            // add input
            self.addInput();
            // add up button
            self.addUpButton();
            
        // DONE FUNCTION: addButtonsAndInput( void ) void
        };    
        self.addDownButton = function( ){
        // FUNCTION: addDownButton( void ) void

            // set button down values
            self.buttonOptions['id'] = self.buttonOptions['downId'];
            self.buttonOptions['imageUrl'] = 'url(' + self.imageUrl + self.buttonOptions['downImage'] + ')';
            // done set button down values
            
            // add button down to buttonAndInputContainer
            $( '#' + self.inputAndButtonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
        // DONE FUNCTION: addDownButton( void ) void
        };    
        self.addInput = function( ){
        // FUNCTION: addInput( void ) void

            // add input to buttonAndInputContainer
            $( '#' + self.inputAndButtonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );
            
        // DONE FUNCTION: addInput( void ) void
        };    
        self.addUpButton = function( ){
        // FUNCTION: addUpButton( void ) void

            // set button up values
            self.buttonOptions['id'] = self.buttonOptions['upId'];
            self.buttonOptions['imageUrl'] = 'url(' + self.imageUrl + self.buttonOptions['upImage'] + ')';
            // done set button up values

            // add button up to buttonAndInputContainer
            $( '#' + self.inputAndButtonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
        // DONE FUNCTION: addUpButton( void ) void
        };    
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void

            // add item events
            self.addItemEvents();
            // add down button events
            self.addDownButtonEvents();
            // add up button events
            self.addUpButtonEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };    
        self.addItemEvents = function( ){
        // FUNCTION: addItemEvents( void ) void

            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.itemMouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.itemMouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.itemClick( ); } ); 
            // done item events
            
        // DONE FUNCTION: addItemEvents( void ) void
        };    
        self.addDownButtonEvents = function( ){
        // FUNCTION: addDownButtonEvents( void ) void

            // add events for down button
            $( '#' + self.buttonOptions['downId'] ).mouseenter( function( event ){ self.buttonDownMouseIn( ); } );
            $( '#' + self.buttonOptions['downId'] ).mouseleave( function( event ){ self.buttonDownMouseOut( ); } );
            $( '#' + self.buttonOptions['downId'] ).click( function( event ){ self.buttonClick( event ); } );
            // done add events for down button

            // create repeat module
            self.buttonOptions['downRepeatModule'] = new pleisterman.repeatButtonModule( self.buttonOptions['downId'], 
                                                                                                self.buttonOptions['repeatSpeedSlow'], 
                                                                                                self.buttonOptions['repeatSpeedFast'], 
                                                                                                self.buttonDownClick );
            // done create repeat module
            
        // DONE FUNCTION: addDownButtonEvents( void ) void
        };    
        self.addUpButtonEvents = function( ){
        // FUNCTION: addUpButtonEvents( void ) void

            // add events for up button
            $( '#' + self.buttonOptions['upId'] ).mouseenter( function( event ){ self.buttonUpMouseIn( ); } );
            $( '#' + self.buttonOptions['upId'] ).mouseleave( function( event ){ self.buttonUpMouseOut( ); } );
            $( '#' + self.buttonOptions['upId'] ).click( function( event ){ self.buttonClick( event ); } );
            // done add events for up button
            
            // create repeat module
            self.buttonOptions['upRepeatModule'] = new pleisterman.repeatButtonModule( self.buttonOptions['upId'], 
                                                                                              self.buttonOptions['repeatSpeedSlow'], 
                                                                                              self.buttonOptions['repeatSpeedFast'], 
                                                                                              self.buttonUpClick );
            // done create repeat module
            
        // DONE FUNCTION: addUpButtonEvents( void ) void
        };
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void

            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();
            // remove down button events
            self.removeDownButtonEvents();
            // remove up button events
            self.removeUpButtonEvents();
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.removeDownButtonEvents = function( ){
        // FUNCTION: removeDownButtonEvents( void ) void

            // remove down button events
            $( '#' + self.buttonOptions['downId'] ).off();

            // destruct down repeat module
            if( self.buttonOptions['downRepeatModule'] ){
                self.buttonOptions['downRepeatModule'].destruct();
                // remove module link
                self.buttonOptions['downRepeatModule'] = null;
            }
            // done destruct down repeat module
            
        // DONE FUNCTION: removeDownButtonEvents( void ) void
        };
        self.removeUpButtonEvents = function( ){
        // FUNCTION: removeUpButtonEvents( void ) void

            // remove up button events
            $( '#' + self.buttonOptions['upId'] ).off();
            
            // destruct up repeat module
            if( self.buttonOptions['upRepeatModule'] ){
                self.buttonOptions['upRepeatModule'].destruct();
                // remove module link
                self.buttonOptions['upRepeatModule'] = null;
            }
            // done destruct up repeat module
            
        // DONE FUNCTION: removeUpButtonEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void

            // add down button tab
            self.addDownButtonTabStop();
            // add up button tab
            self.addUpButtonTabStop();
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.addDownButtonTabStop = function(){
        // FUNCTION: addDownButtonTabStop( void ) void

            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['downId'],
                'layer'     :   'data',
                'select'    :   self.focusDownIn,
                'deSelect'  :   self.focusDownOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.buttonDownClick
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addDownButtonTabStop( void ) void
        };
        self.addUpButtonTabStop = function(){
        // FUNCTION: addUpButtonTabStop( void ) void

            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['upId'],
                'layer'     :   'data',
                'select'    :   self.focusUpIn,
                'deSelect'  :   self.focusUpOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.buttonUpClick
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addUpButtonTabStop( void ) void
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
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseOut( void ) void
        };
        self.itemClick = function( ){
        // FUNCTION: itemClick( void ) void

            // debug info
            self.debug( 'itemClick' );

            // get value
            var value = parseInt( $( '#' + self.inputOptions['id'] ).val() );
            // value = mimimum
            if( value <= self.values['minimum'] ){
                // set tabstop on up button
                jsProject.callEvent( 'selectTabStop',  self.buttonOptions['upId'] );
            }
            else {
                // set tabstop on down button
                jsProject.callEvent( 'selectTabStop', self.buttonOptions['downId'] );
            }        
            // done value = mimimum
            
        // DONE FUNCTION: itemClick( void ) void
        };
        self.buttonClick = function( event ){
        // FUNCTION: buttonClick( event: event ) void

            // stop propagation
            event.stopPropagation();
            
        // DONE FUNCTION: buttonClick( event: event ) void
        };
        self.buttonDownMouseIn = function( ){
        // FUNCTION: buttonDownMouseIn( void ) void

            // remember mouse over
            self.buttonOptions['downMouseOver'] = true;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: buttonDownMouseIn( void ) void
        };
        self.buttonDownMouseOut = function( ){
        // FUNCTION: buttonDownMouseOut( void ) void

            // unset mouse over
            self.buttonOptions['downMouseOver'] = false;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: buttonDownMouseOut( void ) void
        };
        self.buttonDownClick = function( ){
        // FUNCTION: buttonDownClick( void ) void

            // get value
            var value = parseInt( $( '#' + self.inputOptions['id'] ).val() );
            // value > mimimum
            if( value > self.values['minimum'] ){
                // value -= 1
                value--;
                
                // set input value
                $( '#' + self.inputOptions['id'] ).val( value );
                
                // set tabstop on button down
                jsProject.callEvent( 'selectTabStop', self.buttonOptions['downId'] );
                
                // update button display
                self.updateButtonsDisplay();
                
                // remember change
                self.change();
            }
            // done value > 1
            
        // DONE FUNCTION: buttonDownClick( void ) void
        };
        self.buttonUpMouseIn = function( ){
        // FUNCTION: buttonUpMouseIn( void ) void

            // remember mouse over
            self.buttonOptions['upMouseOver'] = true;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: buttonUpMouseIn( void ) void
        };
        self.buttonUpMouseOut = function( ){
        // FUNCTION: buttonUpMouseOut( void ) void

            // unset mouse over
            self.buttonOptions['upMouseOver'] = false;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: buttonUpMouseOut( void ) void
        };
        self.buttonUpClick = function( ){
        // FUNCTION: buttonUpClick( void ) void

            // get value
            var value = parseInt( $( '#' + self.inputOptions['id'] ).val() );
            // value < maximum
            if( value < self.values['maximum'] ){
                // value += 1
                value++;
                // set input value
                $( '#' + self.inputOptions['id'] ).val( value );

                // set tabstop on button down
                jsProject.callEvent( 'selectTabStop', self.buttonOptions['upId'] );
                
                // update button display
                self.updateButtonsDisplay();

                // remember change
                self.change();
            }
            // done value < maximum
            
        // DONE FUNCTION: buttonUpClick( void ) void
        };
        self.focusDownIn = function( buttonId ){
        // FUNCTION: focusDownIn( string: buttonId ) void

            // debug info
            self.debug( 'focusDownIn' );
            // remember input focus in
            self.inputOptions['hasFocus'] = true;
            // remember button focus in
            self.buttonOptions['downHasFocus'] = true;
            
            // show input
            jsProject.scrollElement( buttonId, self.contentId );

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusDownIn( string: buttonId ) void
        };
        self.focusDownOut = function( ){
        // FUNCTION: focusDownOut( void ) void

            // rememeber focus out
            self.inputOptions['hasFocus'] = false;
            // remember button focus in
            self.buttonOptions['downHasFocus'] = false;
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusDownOut( void ) void
        };
        self.focusUpIn = function( buttonId ){
        // FUNCTION: focusUpIn( string: buttonId ) void

            // debug info
            self.debug( 'focusUpIn' );
            // remember input focus in
            self.inputOptions['hasFocus'] = true;
            // remember button focus in
            self.buttonOptions['upHasFocus'] = true;
            
            // show input
            jsProject.scrollElement( buttonId, self.contentId );

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusUpIn(  string: buttonId ) void
        };
        self.focusUpOut = function( ){
        // FUNCTION: focusUpOut( void ) void

            // rememeber focus out
            self.inputOptions['hasFocus'] = false;
            // remember button focus in
            self.buttonOptions['upHasFocus'] = false;
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusUpOut( void ) void
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

            // set data 
            self.values['value'] = $( '#' + self.inputOptions['id'] ).val();
            
        // DONE FUNCTION: setData( void ) void
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
            
            // update buttons display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: updateDisplay( void ) void
        };
        self.updateButtonsDisplay = function(  ){
        // FUNCTION: updateButtonsDisplay( void ) void

            // get current value
            var value = parseInt( $( '#' + self.inputOptions['id'] ).val() );
            // update down button
            self.updateDownButtonDisplay( value );
            // update up button
            self.updateUpButtonDisplay( value );
            
        // DONE FUNCTION: updateButtonsDisplay( void ) void
        };
        self.updateDownButtonDisplay = function( value ){
        // FUNCTION: updateDownButtonDisplay( integer: value ) void

            // value = minimum
            if( value === self.values['minimum'] ){
                // background error color
                $( '#' + self.buttonOptions['downId'] ).css( 'background-color', pleisterman.colors['errorBackgroundColor']['color'] );
                // error color
                $( '#' + self.buttonOptions['downId'] ).css( 'color', pleisterman.colors['errorColor']['color'] );
                // pointer default
                $( '#' + self.buttonOptions['downId'] ).css( 'cursor', 'default' );
            }
            else {
                // has focus or mouse over
                if( self.buttonOptions['downHasFocus'] || self.buttonOptions['downMouseOver'] ){
                    // background highlight
                    $( '#' + self.buttonOptions['downId'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                }
                else {
                    // background default
                    $( '#' + self.buttonOptions['downId'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                }
                // done has focus or mouse over
                
                // cursor pointer
                $( '#' + self.buttonOptions['downId'] ).css( 'cursor', 'pointer' );
            }
            // done value = minimum
            
        // DONE FUNCTION: updateDownButtonDisplay( integer: value ) void
        };
        self.updateUpButtonDisplay = function( value ){
        // FUNCTION: updateUpButtonDisplay( integer: value ) void

            // value = maximum
            if( value === self.values['maximum'] ){
                // background error color
                $( '#' + self.buttonOptions['upId'] ).css( 'background-color', pleisterman.colors['errorBackgroundColor']['color'] );
                // error color
                $( '#' + self.buttonOptions['upId'] ).css( 'color', pleisterman.colors['errorColor']['color'] );
                // pointer default
                $( '#' + self.buttonOptions['upId'] ).css( 'cursor', 'default' );
            }
            else {
                // has focus or mouse over
                if( self.buttonOptions['upHasFocus'] || self.buttonOptions['upMouseOver'] ){
                    // background highlight
                    $( '#' + self.buttonOptions['upId'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                }
                else {
                    // background default
                    $( '#' + self.buttonOptions['upId'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                }
                // done has focus or mouse over
                
                // cursor pointer
                $( '#' + self.buttonOptions['upId'] ).css( 'cursor', 'pointer' );
            }
            // done value <= minimum
            
        // DONE FUNCTION: updateUpButtonDisplay( integer: value ) void
        }; 
        self.fontChange = function() {
        // FUNCTION: fontChange( void ) void

            // refresh font
            $( '#' + self.inputOptions['id'] ).css( 'font-family', pleisterman.options['fontFamily']['value'] );
            
        // DONE FUNCTION: fontChange( void ) void
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
    // DONE MODULE: dataEditSpinnerModule( string: contentId, json: values, boolean: isEdit ) void 
})( pleisterman );
// done create module function
