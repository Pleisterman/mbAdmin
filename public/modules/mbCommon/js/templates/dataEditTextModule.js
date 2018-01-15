/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditTextModule.js
 * 
 *  Last revision: 10-01-2017
 * 
 *  Purpose: 
 *          Displays a text input
 *          the text is a time value    
 *          links an error function for error callback
 *          on updates
 *          checks for default focus
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: dataEditTextModule( string: contentId, json: values, boolean: isEdit ) void 
    
    pleisterman.dataEditTextModule = function( contentId, values, isEdit ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditTextModule';                             // string:  MODULE
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
        self.inputOptions = {                                           // json: inputr options
            'id'                    :   'inputData' + self.values['id'],// string: element id
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'display'               :   'inline-block',                 // css display
            'styleWidth'            :   '35em',                         // css style width
            'textAlign'             :   'left',                         // css text align
            'verticalAlign'         :   'middle',                       // css verical align
            'marginTop'             :   pleisterman.getSetting( 'dataEditLabelMarginTop' ),       // css margin top
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
        };                                                              // done json: input options
        self.timeOptions = {                                            // json: time options
            'styleWidth'            :   '3.5em',                        // css style width
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: time options
        self.priceOptions = {                                           // json: price options
            'styleWidth'            :   '8.5em',                        // css style width
            'textAlign'             :   'right'                         // css text align
        };                                                              // done json: price options
        self.errorOptions = {                                           // json: error options
            'id'                    :   'dataError' + self.values['id'],// string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css posistion
            'display'               :   'none',                         // css display
            'text'                  :   '',                             // string: text
            'zIndex'                :   '2',                            // css z-index
            'styleWidth'            :   pleisterman.getSetting( 'dataEditLabelWidth' ),               // css style width
            'backgroundColor'       :   pleisterman.colors['errorDialogBackgroundColor']['color'],    // css color: background color    
            'color'                 :   pleisterman.colors['errorColor']['color'],                    // css color: color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['errorDialogBorderColor']['color'],        // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'padding'               :   '0.2em',                        // css padding
            'borderRadius'          :   '0.1em',                        // css border radius
            'offsetTop'             :   12,                             // integer: offset top
            'offsetLeft'            :   4                               // integer: offset left
        };                                                              // done json: error options
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
                self.values['errorFunction'] = self.showError;
            }
            // done link the error function
            
            // link getId function
            if( self.values['getInputIdFunction'] !== undefined ){
                self.values['getInputIdFunction'] = self.getInputId;
            }
            // done link getId function

        // DONE FUNCTION: addCallbackFunctions( void ) void
        };
        self.removeCallbackFunctions = function(){
        // FUNCTION: removeCallbackFunctions( void ) void
            
            // error function link
            if( self.values['errorFunction'] !== undefined ){
                // remove link 
                self.values['errorFunction'] = null;
            }        
            // done error function link
            
            // getId function link
            if( self.values['getInputIdFunction'] !== undefined ){
                // remove link 
                self.values['getInputIdFunction'] = null;
            }        
            // done getId function link

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
            
            // type
            switch( self.values['displayOptions']['type'] ){
                case 'time' : {
                        jQuery.extend( self.inputOptions, self.timeOptions );
                        break;
                } 
                case 'price' : {
                        jQuery.extend( self.inputOptions, self.priceOptions );
                        break;
                } 
                case 'password' : {
                    self.inputOptions['type'] = 'password';
                } 
            };
            // done type
            
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
            
            // type
            switch( self.values['displayOptions']['type'] ){
                case 'number' : {
                        // set number value
                        $( '#' + self.inputOptions['id'] ).val( self.values['value'] );
                        // set align
                        self.inputOptions['textAlign'] = 'right';
                        // done 
                        break;
                }
                case 'time' : {
                        // create time text
                        var text = '';
                        text += self.values['value'].substring( 0, 2 );
                        text += ':';
                        text += self.values['value'].substring( 2, 4 );
                        // done create time text
                        
                        // set input value
                        $( '#' + self.inputOptions['id'] ).val( text );
                        // done 
                        break;
                }
                case 'price' : {
                        // create time text
                        var text = '';
                        text += self.values['value'].substring( 0, self.values['value'].length - 2 );
                        text += ',';
                        text += self.values['value'].substring( self.values['value'].length - 2, self.values['value'].length );
                        // done create time text
                        
                        // set input value
                        $( '#' + self.inputOptions['id'] ).val( text );
                        // done 
                        break;
                }
                default : {
                        // set input value
                        $( '#' + self.inputOptions['id'] ).val( self.values['value'] );
                }
            };
            // done type

            // add error to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorOptions ) );
                
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void
            
            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.mouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.mouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ) { self.itemClick( ); } ); 
            // done item events
            
            // input events
            $( '#' + self.inputOptions['id'] ).keyup( function( event ){ self.change( ); });
            $( '#' + self.inputOptions['id'] ).change( function( event ){ self.change( ); });
            $( '#' + self.inputOptions['id'] ).focusin( function( event ){ self.focusIn( ); });
            $( '#' + self.inputOptions['id'] ).focusout( function( event ){ self.focusOut( ); });
            $( '#' + self.inputOptions['id'] ).mouseenter( function( event ){ self.mouseIn( ); });
            $( '#' + self.inputOptions['id'] ).mouseleave( function( event ){ self.mouseOut( ); });
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
            
            // rememeber mouse out
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
            // select text
            $( '#' + self.inputOptions['id'] ).select();
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
            
            // remember focus out
            self.inputOptions['hasFocus'] = false;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusOut( void ) void
        };
        self.updateDisplay = function(  ){ 
        // FUNCTION: updateDisplay( void ) void
            
            // cursor
            $( '#' + self.inputOptions['id'] ).css( 'cursor', 'pointer' );
            $( '#' + self.itemContainerOptions['id'] ).css( 'cursor', 'pointer' );
            // done cursor
            
            // selected
            if( self.inputOptions['hasFocus'] || self.inputOptions['mouseOver'] ){
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
            
            // if edit mode
            if( self.isEdit ){
                // remember change event 
                jsProject.setValue( 'changed', 'data', true );    
                // hide error
                self.showError( '' );
            }
            // done if edit mode
            
            if( self.values['changeCallback'] ){
                self.values['changeCallback']( $.trim( $( '#' + self.inputOptions['id'] ).val() ) );
            }
            
        // DONE FUNCTION: change( event: event ) void
        };
        self.checkValue = function(){    
        // FUNCTION: checkValue( void ) void
            
            // trim value
            var value = $.trim( $( '#' + self.inputOptions['id'] ).val() );
            $( '#' + self.inputOptions['id'] ).val( value );
            // done trim value
            
            // check value != ''
            if( self.values['displayOptions']['emptyError'] !== undefined &&
                self.values['displayOptions']['emptyError'] ){
                if( value === '' ){
                    pleisterman.getError( 'inputEmpty', self.showError );
                    return false;
                }
            }
            // done check value != ''

            // type exists    
            if( self.values['displayOptions']['type'] ) {
                // type
                switch( self.values['displayOptions']['type'] ){
                    case 'time' : {
                            // check time
                            return self.checkTimeValue();
                    }
                    case 'price' : {
                            // check time
                            return self.checkPriceValue();
                    }
                    case 'number' : {
                            // check number
                            return self.checkNumberValue();
                    }
                    case 'email' : {
                            // check email
                            return self.checkEmailSyntax();
                    }
                }
                // done type
            }
            // done type exists    
            
            // remove error
            self.showError( '' );
            // done  
            return true;
            
        // DONE FUNCTION: checkValue( void ) void
        };
        self.checkEmailSyntax = function(){  
        // FUNCTION: checkEmailSyntax( void ) void
            
            // get current text
            var value = $( '#' + self.inputOptions['id'] ).val();
            // check value empty
            if( value === '' ){
                // done no error
                return true;
            }
            // check value empty

            // check syntax
            if( !jsProject.checkEmailSyntax( value ) ){
                // show error
                pleisterman.getError( 'invalidEmailAdress', self.showError );
                // set input focus
                $( '#' + self.inputOptions['id'] ).focus();
                // done with error
                return false;
            }
            // done check syntax
            
            // done
            return true;    
            
        // DONE FUNCTION: checkEmailSyntax( void ) void
        };
        self.checkNumberValue = function(){  
        // FUNCTION: checkNumberValue( void ) void
            
            // get current text
            var value = parseInt( $( '#' + self.inputOptions['id'] ).val() );
            // not a number
            if( isNaN( value ) ){
                // show error
                pleisterman.getError( 'notANumber', self.showError );
                // set input focus
                $( '#' + self.inputOptions['id'] ).focus();
                // doen with error
                return false;
            }
            // done not a number
            
            // set value
            $( '#' + self.inputOptions['id'] ).val( value );
            // done
            return true;    
            
        // DONE FUNCTION: checkNumberValue( void ) void
        };  
        self.checkTimeValue = function(){    
        // FUNCTION: checkTimeValue( void ) void
            
            // get current text
            var text = $.trim( $( '#' + self.inputOptions['id'] ).val() );
            // create regalur expression
            var regexSpaces = new RegExp( ' ', 'g');
            // create regex expression
            var regex = new RegExp( '[,.;-]', 'g');
            // remove spaces
            text = text.replace( regexSpaces, '' );
            // replace .,;- with :
            text = text.replace( regex, ':' );
            
            // add zeros
            while( text.length < 4 ){
                text += '0';
            }
            // add zeros
            
            // remove colons after first colon 
            var indexOfColon = text.indexOf( ':' );
            var hoursText = '0';
            var minutesText = '0';
            if( indexOfColon >= 0 ){
                hoursText = text.substring( 0, indexOfColon );
                minutesText = text.substring( indexOfColon + 1, indexOfColon + 3 );
            }
            else {
                hoursText = text.substring( 0, 2 );
                minutesText = text.substring( 2, 4 );
            }
            var hoursInteger = parseInt( hoursText );
            var minutesInteger = parseInt( minutesText );
            
            // check hours and minutes
            if( hoursInteger > 23 || isNaN( hoursInteger ) || minutesInteger > 59 || isNaN( minutesInteger ) ){
                // show error
                pleisterman.getError( 'invalidTime', self.showError );
                // set input focus
                $( '#' + self.inputOptions['id'] ).focus();
                // done with error
                return false;
            }
            // done check hours and minutes

            hoursText = jsProject.pad( hoursInteger, '0', 2 );
            minutesText = jsProject.pad( minutesInteger, '0', 2 );

            // create formatted value
            var value = hoursText;
            value += ':';
            value += minutesText;
            // set input value -> formatted value
            $( '#' + self.inputOptions['id'] ).val( value );
            
            // hide error
            self.showError( );
            // done 
            return true;
            
        // DONE FUNCTION: checkTimeValue( void ) void
        };
        self.checkPriceValue = function(){    
        // FUNCTION: checkPriceValue( void ) void
            
            // get current text
            var text = $.trim( $( '#' + self.inputOptions['id'] ).val() );
            // create regalur expression
            var regexSpaces = new RegExp( ' ', 'g');
            // create regex expression
            var regex = new RegExp( '[,.;-]', 'g');
            // remove spaces
            text = text.replace( regexSpaces, '' );
            // replace .,;- with :
            text = text.replace( regex, ',' );
            // find komma
            if( text.indexOf( ',' ) < 0 ){
                // add komma
                text += ',00';
            }
            // done find komma
            
            if( text.indexOf( ',' ) === 1 ){
                text = '0' + text;
            }
            
            while( text.indexOf( ',' ) > text.length - 2 ){
                text += '0';
            }
            
             // set input value -> formatted value
            $( '#' + self.inputOptions['id'] ).val( text );
            
            // hide error
            self.showError( );
            // done 
            return true;

        // DONE FUNCTION: checkPriceValue( void ) void
        };
        self.setData = function( ) {
        // FUNCTION: setData( void ) void
            
            // check for errors
            if( jsProject.getValue( 'hasError', 'data') ){
                // done with error
                return;
            }
            // done check for errors
            
            // check value
            if( !self.checkValue() ){
                // set data error
                jsProject.setValue( 'hasError', 'data', true );
                // set tabstop
                jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );
                // done with error
                return;
            }
            // done check value

            // capitalize first letter
            if( self.values['displayOptions']['firstLetterCapital'] !== undefined ){
                self.debug( 'capitalize' );
                var value = $( '#' + self.inputOptions['id'] ).val();
                value = value.charAt(0).toUpperCase() + value.slice(1);
                $( '#' + self.inputOptions['id'] ).val( value );
            }
            // done capitalize first letter

            
            // display value -> js value 
            var data = $.trim( $( '#' + self.inputOptions['id'] ).val() );
            // remove : from time value
            if( self.values['displayOptions']['type'] === 'time' ){
                // create regex expression
                var regex = new RegExp( '[:]', 'g');
                // replace .,;- with :
                data = data.replace( regex, '' );
            }
            // done remove : from time value

            // remove : from price value
            if( self.values['displayOptions']['type'] === 'price' ){
                // create regex expression
                var regex = new RegExp( '[,]', 'g');
                // replace .,;- with :
                data = data.replace( regex, '' );
            }
            // done remove : from price value
            
            // set value
            self.values['value'] = data;
            
        // DONE FUNCTION: setData( void ) void
        };
        self.getInputId = function( ){
        // FUNCTION: getInputId( void ) void
            
            // done 
            return self.inputOptions['id'];
            
        // DONE FUNCTION: getInputId( void ) void
        };
        self.showError = function( message ){
        // FUNCTION: showError( string: message ) void
            
            // debug info
            self.debug( 'show error: ' + message );

            // message exists
            if( message ){
                // set message html
                $( '#' + self.errorOptions['id'] ).html( message );
                // show error
                $( '#' + self.errorOptions['id'] ).show();
                // call event
                jsProject.callEvent( 'dataError', true );
                // set focus
                $( '#' + self.inputOptions['id'] ).focus();
                
            }
            else {
                // hide error
                $( '#' + self.errorOptions['id'] ).hide();
                // call event
                jsProject.callEvent( 'dataError', false );
            }
            // done message exists
            
        // DONE FUNCTION: showError(  string: message ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // check if input exists
            if( !$( '#' + self.inputOptions['id'] ).position() ){
                // done
                return;
            }
            // done check if input exists
            
            // set error positon
            var left = self.errorOptions['offsetLeft'];
            var top = $( '#' + self.inputOptions['id'] ).height();
            top += $( '#' + self.inputOptions['id'] ).position().top;
            top += self.errorOptions['offsetTop'];
            $( '#' + self.errorOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.errorOptions['id'] ).css( 'left', left + 'px' );
            // done set error positon
            
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
    // DONE MODULE: dataEditTextModule( string: contentId, json: values, boolean: isEdit ) void 
})( pleisterman );
// done create module function
