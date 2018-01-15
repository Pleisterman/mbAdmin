/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataDatePickerModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          displays a datepicker for a dataEditDateModule
 *          sets caller date and calls a callback on return
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

    // MODULE: dataDatePickerModule( void ) void 
    
    pleisterman.dataDatePickerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataDatePickerModule';                           // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image dir
        self.overlayOptions = {                                         // json: overlay options 
            'id'                    :   'dataEditOverlay'               // string: element id
        };                                                              // done json: overlay options
        self.containerOptions = {                                       // json: container options
            'id'                    :   self.MODULE + 'Container',      // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   pleisterman.colors['panelBackgroundColor']['color'],  // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],      // css color: border color
            'borderWidth'           :   '0.1em',                        // css bordser width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'padding'               :   '0.4em',                        // css padding
            'open'                  :   false                           // boolean: open    
        };                                                              // done json: container options    
        self.buttonOptions = {                                          // json: button options
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text    
            'styleWidth'            :   '2.0em',                        // css style width
            'padding'               :   '0.2em',                        // css padding
            'marginTop'             :   '0.2em',                        // css margin top 
            'marginLeft'            :   '0.2em',                        // css margin left
            'marginRight'           :   '0.2em',                        // css margin right 
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'],  // css color: background color
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   'center center',                // css background position        
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'], // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'cursor'                :   'pointer'                       // css cursor
        };                                                              // done json: button options
        self.headerOptions = {                                          // json: header options
            'id'                    :   self.MODULE + 'Header',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   'testink',                      // string: text
            'left'                  :   '2.0em',                        // css left
            'textAlign'             :   'center',                       // css text align
            'padding'               :   '0.5em',                        // css padding 
            'paddingLeft'           :   '5.5em',                        // css padding left
            'paddingRight'          :   '5.5em',                        // css padding rigth
            'fontSize'              :   '1.0em',                        // css font size
            'fontWeight'            :   'bold',                         // css font weigth
            'backgroundColor'       :   'transparent',                  // css color: background color
            'color'                 :   pleisterman.colors['panelHighlightColor']['color']    // css color: color
        };                                                              // done json: header options
        self.selectionOptions = {                                       // json: selection options
            'id'                    :   self.MODULE + 'Selection',      // string: element id
            'element'               :   'table'                         // string: html element type 
        };                                                              // done json: selection options
        self.weekHeaderOptions = {                                      // json: week header options
            'element'               :   'td',                           // string html element type 
            'text'                  :   pleisterman.translations['weekText'],                 // string: text
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),    // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'padding'               :   '0.3em',                        // css padding 
            'textAlign'             :   'center',                       // css text align  
            'color'                 :   pleisterman.colors['panelColor']['color'], // css color: color
        };                                                              // done json: week header options
        self.dayNamesOptions = {                                        // json: day names options
            'element'               :   'td',                           // string html element type 
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),   // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ), // css font weight
            'minimumWidth'          :   '3.5em',                        // css minimum width
            'textAlign'             :   'center',                       // css text align
            'padding'               :   '0.3em',                        // relative size
            'color'                 :   pleisterman.colors['panelColor']['color'],  // css color: color
        };                                                              // done json: day names options
        self.weekNumberOptions = {                                      // json: week number options
            'element'               :   'td',                           // string: html element type
            'text'                  :   '&nbsp;',                       // string: text
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),    // css font size   
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'minimumWidth'          :   '2.5em',                        // css minimum width 
            'textAlign'             :   'center',                       // css text align
            'padding'               :   '0.3em',                        // css padding 
            'color'                 :   pleisterman.colors['panelColor']['color'],    // css color: color
        };                                                              // done json: week number options         
        self.dayOptions = {                                             // json: day options
            'element'               :   'td',                           // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),    // css font size   
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'minimumWidth'          :   '3.5em',                        // css minimum width
            'textAlign'             :   'center',                       // css text align
            'padding'               :   '0.3em',                        // css padding 
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'color'                 :   pleisterman.colors['buttonColor']['color'],           // css color: color    
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width 
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],  // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.1em'                         // css border radius
        };                                                              // done json: day options
        self.displayOptions = {                                         // json: display options
            'visible'               :   false,                          // boolean: visible
            'above' :   {                                               // json: above
                'marginBottom'      :   25                              // integer: margin bottom
            },                                                          // done json: above
            'under' :   {                                               // json: under
                'marginTop'         :   25                              // integer: margin top
            }                                                           // done json: under
        };                                                              // done json: display options
        self.callerOptions = {                                          // json: caller options
            'id'                    :   '',                             // string: element id 
            'callback'              :    null                           // functiom: callback
        };                                                              // done json: caller options
        self.datePickerDate = {                                         // json: datepicker date
            'year'  :   0,                                              // integer: year
            'month' :   0,                                              // integer: month
            'day'   :   0                                               // integer: day
        };                                                              // done json: datepicker date
        self.tabStopDay = 0;                                            // integer: tabstop day
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show data datepicker
            pleisterman.showDataDatePicker = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // event subscription
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.show = function( id, callback ) {
        // FUNCTION: show( string: element id, function: callback ) void
            
            // debug info
            self.debug( 'show' );
            
            // already open
            if( self.containerOptions['open'] ){
                // done 
                return;
            }
            // already open
            
            // remember open
            self.containerOptions['open'] = true;
            
            // remember caller
            self.callerOptions['id'] = id;
            self.callerOptions['callback'] = callback;
            // done remember caller

            // get caller date
            var text = $( '#inputData' + self.callerOptions['id'] ).val( );
            // create date object
            var dateObject = jsProject.textToDateObject( text ); 
            
            // set date picker date
            self.datePickerDate['year'] = dateObject['year'];
            self.datePickerDate['month'] = dateObject['month'];
            self.datePickerDate['day'] = dateObject['day'];
            // done set date picker date
            
            // create the html
            self.createDatePicker();
            
            // add events
            self.addEvents();
            
            // add tabstops
            self.addTabStops();

            // set tabstop day
            self.setTabStopDay();
            
            // refresh
            self.refreshDatePicker();
            
            // show overlay
            $( '#' + self.overlayOptions['id'] ).show();
            // remember visibility
            self.displayOptions['visible'] = true;
            
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( string: element id, function: callback ) void
        };
        self.setTabStopDay = function(){
        // FUNCTION: setTabStopDay( void ) void
            
            // remember selection for tabstops
            // get date from caller
            var text = $( '#inputData' + self.callerOptions['id'] ).val( );
            // create date object
            var dateObject = jsProject.textToDateObject( text ); 
            // done create caller date
            self.tabStopDay = dateObject['day'];
            
        // DONE FUNCTION: setTabStopDay( void ) void
        };
        self.createDatePicker = function(){
        // FUNCTION: createDatePicker( void ) void
            
            // add item container to content
            $( '#' + self.overlayOptions['id'] ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
            
            // add header
            self.addHeader();
            
            // add selection
            self.addSelection();
            
        // DONE FUNCTION: createDatePicker( void ) void
        };
        self.addHeader = function(){
        // FUNCTION: addHeader( void ) void
            
            // set down button values
            self.buttonOptions['id'] = self.MODULE + 'Down';
            self.buttonOptions['float'] = 'left';
            self.buttonOptions['imageUrl'] = 'url( ' + self.imageUrl + 'datePickerDown.png )';
            // done set down button values
            
            // add down button to datePicker container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
            // set up button values
            self.buttonOptions['id'] = self.MODULE + 'Up';
            self.buttonOptions['float'] = 'right';
            self.buttonOptions['imageUrl'] = 'url( ' + self.imageUrl + 'datePickerUp.png )';
            // done set up button values
            
            // add up button to datePicker container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

            // add header
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );
            
        // DONE FUNCTION: addHeader( void ) void
        };
        self.addSelection = function(){
        // FUNCTION: addSelection( void ) void
            
            // create selection
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.selectionOptions ) );
            // add header
            self.addSelectionHeader();
            // add body
            self.addSelectionBody();
            
        // DONE FUNCTION: addSelection( void ) void
        };
        self.addSelectionHeader = function(){
        // FUNCTION: addSelectionHeader( void ) void
            
            // start row
            var headerHtml = '<tr>';
            
            // add week header
            headerHtml += jsProject.jsonToElementHtml( self.weekHeaderOptions );
            // get day names
            var dayNames = pleisterman.translations['dayNamesShort'].split( ',' );
            // fill day headers
            for( i = 0; i < dayNames.length; i++ ){
                // set day header text
                self.dayNamesOptions['text'] = dayNames[i];
                // add day header
                headerHtml += jsProject.jsonToElementHtml( self.dayNamesOptions );
            }
            // done fill day headers
            
            // close row
            headerHtml += '</tr>';
            
            // add header to selection
            $( '#' + self.selectionOptions['id'] ).append( headerHtml );
            
        // DONE FUNCTION: addSelectionHeader( void ) void
        };
        self.addSelectionBody = function(){
        // FUNCTION: addSelectionBody( void ) void
            
            // create html
            var bodyHtml = '';

            // loop over rows
            for( var i = 0; i < 6; i++ ){
                // open row
                bodyHtml += '<tr';
                    bodyHtml += ' id="' + self.MODULE + 'Row' + i + '" ';
                bodyHtml += '>';
                // done open row
                
                // set id
                self.weekNumberOptions['id'] = self.MODULE + 'Week' + i;
                // add week to body
                bodyHtml += jsProject.jsonToElementHtml( self.weekNumberOptions );
                
                // add day places
                for( var j = 0; j < 7; j++ ){
                    // set id
                    self.dayOptions['id'] = self.MODULE + 'Day' + i + '_' + j;
                    // add day to body
                    bodyHtml += jsProject.jsonToElementHtml( self.dayOptions );
                }                
                // done add day places
                 
                // close row
                bodyHtml += '</tr>';
            }
            // done loop over rows

            // add body
            $( '#' + self.selectionOptions['id'] ).append( bodyHtml );
            
        // DONE FUNCTION: addSelectionBody( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // document click, to close
            $( document.body ).click( function( event ){ self.documentClick( event ); } );
            
            // conainer click, prevent close
            $( '#' + self.containerOptions['id'] ).click( function( event ){ self.containerMouseClick( event ); } );
            
            // down button
            $( '#' + self.MODULE + 'Down' ).click( function( event ){ self.monthDownClick( event ); });
            $( '#' + self.MODULE + 'Down' ).mouseover( function( event ){ self.monthDownOver( event ); });
            $( '#' + self.MODULE + 'Down' ).mouseout( function( event ){ self.monthDownOut( event ); });
            // done down button
            
            // up button
            $( '#' + self.MODULE + 'Up' ).click( function( event ){ self.monthUpClick( event ); });
            $( '#' + self.MODULE + 'Up' ).mouseover( function( event ){ self.monthUpOver( event ); });
            $( '#' + self.MODULE + 'Up' ).mouseout( function( event ){ self.monthUpOut( event ); });
            // done up button
            
            // day buttons
            for( var i = 0; i < 6; i++ ){
                for( var j = 0; j < 7; j++ ){
                    // get element
                    var dayElement = $( '#' + self.MODULE + 'Day' + i + '_' + j );
                    // add day events
                    dayElement.mouseover( function( event ){ self.dayOver( event, this ); });
                    dayElement.mouseout( function( event ){ self.dayOut( event, this ); });
                    dayElement.click( function( event ){ self.dayClick( event, this ); });
                    // done add day events
                }
            }
            // done day buttons
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function(){
        // FUNCTION: removeEvents( void ) void
            
            // document
            $( document.body ).off( 'click' );
            // container
            $( '#' + self.containerOptions['id'] ).off();
            // button down
            $( '#' + self.MODULE + 'Down' ).off();
            // button up
            $( '#' + self.MODULE + 'Up' ).off();
            // loop over days
            for( var i = 0; i < 6; i++ ){
                for( var j = 0; j < 7; j++ ){
                    // day events
                    $( '#' + self.MODULE + 'Day' + i + '_' + j ).off( );
                }
            }
            // done loop over days
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add tabstop down
            var tabStopOptions = {
                'id'        :   self.MODULE + 'Down',
                'layer'     :   'overlay',
                'select'    :   self.monthDownOver,
                'deSelect'  :   self.monthDownOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.monthDown
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'default',
                        'function'  :   self.closeDatePicker
                    }
                ]
            };
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            // done add down tabstop

            // add tabstop down
            var tabStopOptions = {
                'id'        :   self.MODULE + 'Up',
                'layer'     :   'overlay',
                'select'    :   self.monthUpOver,
                'deSelect'  :   self.monthUpOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.monthUp
                    }
                ]
            };
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            // done add down tabstop
            
            // add tabstop for days
            var tabStopOptions = {
                'id'        :   self.MODULE + 'Day',
                'layer'     :   'overlay',
                'select'    :   self.datePickerDateFocusIn,
                'deSelect'  :   self.datePickerDateFocusOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.datePickerDateSelect
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['enter'],
                        'type'      :   'default',
                        'function'  :   self.datePickerDateSelect
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowLeft'],
                        'type'      :   'default',
                        'function'  :   self.datePickerDateLeft
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowRight'],
                        'type'      :   'default',
                        'function'  :   self.datePickerDateRight
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowUp'],
                        'type'      :   'default',
                        'function'  :   self.datePickerDateUp
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowDown'],
                        'type'      :   'default',
                        'function'  :   self.datePickerDateDown
                    }
                ]
            };
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            // done add tabstop for days 
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'overlay' );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.removeTabStops = function(){
        // FUNCTION: removeTabStops( void ) void
            
            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'overlay' );
            
        // DONE FUNCTION: removeTabStops( void ) void
        };
        self.monthDownOver = function( event ){
        // FUNCTION: monthDownOver( event: event, ) void
            
            // mouse in -> color and background color highlight
            $( '#' + self.MODULE + 'Down' ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'Down' ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            // done mouse in -> color and background color highlight
            
        // DONE FUNCTION: monthDownOver( event: event, ) void
        };
        self.monthDownOut = function( event ){
        // FUNCTION: monthDownOut( event: event, ) void
            
            // mouse out -> color and background color default
            $( '#' + self.MODULE + 'Down' ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'Down' ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done mouse out -> color and background color default
            
        // DONE FUNCTION: monthDownOut( event: event, ) void
        };
        self.monthDownClick = function( event ){
        // FUNCTION: monthDownClick( event: event, ) void
            
            // debug info
            self.debug( 'down' );
            // stop event propagation
            event.stopPropagation();
            // cal month donw
            self.monthDown();
            
        // DONE FUNCTION: monthDownClick( event: event, ) void
        };
        self.monthDown = function( ){
        // FUNCTION: monthDown( void ) void
            
            // create date with month - 1 
            var date = new Date( self.datePickerDate['year'], self.datePickerDate['month'] - 2, 1 );
            // get new date 
            self.datePickerDate['year'] = date.getFullYear();
            self.datePickerDate['month'] = date.getMonth() + 1;
            // done get new date 
            // refresh datepicker data
            self.refreshDatePicker();
            
        // DONE FUNCTION: monthDown( void ) void
        };
        self.monthUpOver = function( event ){
        // FUNCTION: monthUpOver( event: event, ) void
            
            // mouse ib -> color and background color highlight
            $( '#' + self.MODULE + 'Up' ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'Up' ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            // done mouse in -> color and background color highlight
            
        // DONE FUNCTION: monthUpOver( event: event, ) void
        };
        self.monthUpOut = function( event ){
        // FUNCTION: monthUpOut( event: event, ) void
            
            // mouse out -> color and background color default
            $( '#' + self.MODULE + 'Up' ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'Up' ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done mouse out -> color and background color default
            
        // DONE FUNCTION: monthUpOut( event: event, ) void
        };
        self.monthUpClick = function( event ){
        // FUNCTION: monthUpClick( event: event, ) void
            
            // debug info
            self.debug( 'up' );
            // stop event propagation
            event.stopPropagation();
            // month up
            self.monthUp();
            
        // DONE FUNCTION: monthUpClick( event: event, ) void
        };
        self.monthUp = function( ){
        // FUNCTION: monthUp( void ) void
            
            // create date with month + 1 
            var date = new Date( self.datePickerDate['year'], self.datePickerDate['month'], 1 );
            // get new date 
            self.datePickerDate['year'] = date.getFullYear();
            self.datePickerDate['month'] = date.getMonth() + 1;
            // done get new date 
            // refresh datepicker data
            self.refreshDatePicker();
            
        // DONE FUNCTION: monthUp( void ) void
        };
        self.dayOver = function( event, element ){
        // FUNCTION: dayOver( event: event, html element: element ) void
            
            // today or not a day
            if( $( '#' + element.id ).attr( 'isCurrentDate' ) === 'true' ||
                $( '#' + element.id ).attr( 'isEmpty' ) === 'true'  ){
                return;
            }
            // done today or not a day
            
            // mouse in -> color and background color highlight
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            // done mouse in -> color and background color highlight
            
        // DONE FUNCTION: dayOver( event: event, html element: element ) void
        };
        self.dayOut = function( event, element ){
        // FUNCTION: dayOut( event: event, html element: element ) void
            
            // today or not a day
            if( $( '#' + element.id ).attr( 'isCurrentDate' ) === 'true' ||
                $( '#' + element.id ).attr( 'isEmpty' ) === 'true' ||
                $( '#' + element.id ).attr( 'isTabStopDay' ) === 'true'  ){
                return;
            }
            // done today or not a day
            
            // mouse out -> color and background color default
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done mouse out -> color and background color default
            
        // DONE FUNCTION: dayOut( event: event, html element: element ) void
        };
        self.dayClick = function( event, element ){
        // FUNCTION: dayClick(  event: event, html element: element ) void
            
            // stop event propagation
            event.stopPropagation();
            
            // not a day
            if( $( '#' + element.id ).attr( 'isEmpty' ) === 'true'  ){
                return;
            }
            // done not a day
             
            // get the clicked day
            self.datePickerDate['day'] = parseInt( $( '#' + element.id ).html() );
            
            // create text
            var text = jsProject.dateObjectToText( self.datePickerDate );
            // set caller text
            $( '#inputData' + self.callerOptions['id'] ).val( text );
            
            // remove events
            self.removeEvents();
            
            // hide
            // remember open
            self.containerOptions['open'] = false;
            self.displayOptions['visible'] = false;
            $( '#' + self.overlayOptions['id'] ).html( '' );
            $( '#' + self.overlayOptions['id'] ).hide( );
            // done hide
            
            // has callback
            if( self.callerOptions['callback'] ){
                // call
                self.callerOptions['callback']( true );
                // remove callback
                self.callerOptions['callback'] = null;
            } 
            // done has callback
            
            // unregister tabstops
            self.removeTabStops();
            
        // DONE FUNCTION: dayClick( event: event, html element: element ) void
        };
        self.datePickerDateFocusIn = function( id ){
        // FUNCTION: datePickerDateFocusIn( string: id ) void
            
            // debug info
            self.debug( 'datePickerDateFocusIn id: ' + id );
            // done no action
            
        // DONE FUNCTION: datePickerDateFocusIn( string: id ) void
        };
        self.datePickerDateFocusOut = function( id ){
        // FUNCTION: datePickerDateFocusOut( string: id ) void
            
            // debug info
            self.debug( 'datePickerDateFocusOut id: ' + id );
            // done no action
            
        // DONE FUNCTION: datePickerDateFocusOut( string: id ) void
        };
        self.datePickerDateSelect = function( id ){
        // FUNCTION: datePickerDateSelect( string: id ) void
            
            // debug info
            self.debug( 'datePickerDateSelect id: ' + id );
            var date = {
                'year'  :   self.datePickerDate['year'],
                'month'  :   self.datePickerDate['month'],
                'day'  :   self.tabStopDay
            };
            // create text
            var text = jsProject.dateObjectToText( date );
            // set caller text
            $( '#inputData' + self.callerOptions['id'] ).val( text );
            
            // remove events
            self.removeEvents();
            
            // hide
            // remember open
            self.containerOptions['open'] = false;
            self.displayOptions['visible'] = false;
            $( '#' + self.overlayOptions['id'] ).html( '' );
            $( '#' + self.overlayOptions['id'] ).hide( );
            // done hide
            
            // has callback
            if( self.callerOptions['callback'] ){
                // call
                self.callerOptions['callback']( true );
                // remove callback
                self.callerOptions['callback'] = null;
            } 
            // done has callback
            
            // unregister tabstops
            self.removeTabStops();
            
        // DONE FUNCTION: datePickerDateSelect( string: id ) void
        };
        self.datePickerDateLeft = function( id ){
        // FUNCTION: datePickerDateLeft( string: id ) void
            
            // debug info
            self.debug( 'datePickerDateLeft' );
            // done create caller date
            var elementId = '';
            var tabStopDay = self.tabStopDay;
            tabStopDay--;
            // day buttons
            for( var i = 0; i < 6; i++ ){
                for( var j = 0; j < 7; j++ ){
                    // get element
                    elementId = self.MODULE + 'Day' + i + '_' + j;
                    if( tabStopDay === parseInt( $( '#' + elementId ).html() ) ){
                        self.tabStopDay--;
                        self.refreshDatePicker();
                    }
                }
            }
            
        // DONE FUNCTION: datePickerDateLeft( string: id ) void
        };
        self.datePickerDateRight = function( id ){
        // FUNCTION: datePickerDateRight( string: id ) void
            
            // debug info
            self.debug( 'datePickerDateRight id: ' + id );
            // done create caller date
            var elementId = '';
            var tabStopDay = self.tabStopDay;
            tabStopDay++;
            // day buttons
            for( var i = 0; i < 6; i++ ){
                for( var j = 0; j < 7; j++ ){
                    // get element
                    elementId = self.MODULE + 'Day' + i + '_' + j;
                    if( tabStopDay === parseInt( $( '#' + elementId ).html() ) ){
                        self.tabStopDay++;
                        self.refreshDatePicker();
                    }
                }
            }
            
        // DONE FUNCTION: datePickerDateRight( string: id ) void
        };
        self.datePickerDateUp = function( id ){
        // FUNCTION: datePickerDateUp( string: id ) void
            
            // debug info
            self.debug( 'datePickerDateUp id: ' + id );
            // done create caller date
            var elementId = '';
            var tabStopDay = self.tabStopDay;
            tabStopDay -= 7;
            // day buttons
            for( var i = 0; i < 6; i++ ){
                for( var j = 0; j < 7; j++ ){
                    // get element
                    elementId = self.MODULE + 'Day' + i + '_' + j;
                    if( tabStopDay === parseInt( $( '#' + elementId ).html() ) ){
                        self.tabStopDay -= 7;
                        self.refreshDatePicker();
                    }
                }
            }
            
        // DONE FUNCTION: datePickerDateUp( string: id ) void
        };
        self.datePickerDateDown = function( id ){
        // FUNCTION: datePickerDateDown( string: id ) void
            
            // debug info
            self.debug( 'datePickerDateDown id: ' + id );
            // done create caller date
            var elementId = '';
            var tabStopDay = self.tabStopDay;
            tabStopDay += 7;
            // day buttons
            for( var i = 0; i < 6; i++ ){
                for( var j = 0; j < 7; j++ ){
                    // get element
                    elementId = self.MODULE + 'Day' + i + '_' + j;
                    if( tabStopDay === parseInt( $( '#' + elementId ).html() ) ){
                        self.tabStopDay += 7;
                        self.refreshDatePicker();
                    }
                }
            }
            
        // DONE FUNCTION: datePickerDateDown( string: id ) void
        };
        self.documentClick = function( event ){
        // FUNCTION: documentClick(  event: event ) void
            
            // debug info
            self.debug( 'documentClick' );
            // stop propagation
            event.stopPropagation();
            // close date picker
            self.closeDatePicker();
            
        // DONE FUNCTION: documentClick(  event: event ) void
        };
        self.closeDatePicker = function( ){
        // FUNCTION: closeDatePicker( void ) void
            
            // remove events
            self.removeEvents();
            
            // unregister tabstops
            self.removeTabStops();
            
            // hide
            self.containerOptions['open'] = false;
            self.displayOptions['visible'] = false;
            $( '#' + self.overlayOptions['id'] ).html( '' );
            $( '#' + self.overlayOptions['id'] ).hide( );
            // done hide
            
            // has callback
            if( self.callerOptions['callback'] ){
                // call callback
                self.callerOptions['callback']( false );
                // remove callback
                self.callerOptions['callback'] = null;
            } 
            // done has callback
            
        // DONE FUNCTION: closeDatePicker( void ) void
        };
        self.containerMouseClick = function( event ){
        // FUNCTION: containerMouseClick( event: event ) void
            
            // prevent propagation
            event.stopPropagation();
            
        // DONE FUNCTION: containerMouseClick( void ) void
        };
        self.refreshDatePicker = function(){
        // FUNCTION: refreshDatePicker(  event: event ) void
            
            // get date from caller
            var text = $( '#inputData' + self.callerOptions['id'] ).val( );
            // create date object
            var dateObject = jsProject.textToDateObject( text ); 
            
            // create caller date
            var callerDate = {
                'year' : dateObject['year'],
                'month' : dateObject['month'],
                'day' : dateObject['day']
            };
            // done create caller date

            // start at first day
            var loopDay = 1;
            // get first day of month day
            var loopDate = new Date( self.datePickerDate['year'], self.datePickerDate['month'] - 1, loopDay );
            // get month
            var loopMonth = loopDate.getMonth();
            var datePickerMonth = loopDate.getMonth();
            // done get month
            
            // create values
            var loopWeek = 0;
            var weekRow = 0;
            var dayRow = 0;
            // done create values
            
            // get week number
            // create temporary date
            var date = {
                'year' : self.datePickerDate['year'],
                'month' : self.datePickerDate['month'] - 1,
                'day' : loopDay
            };
            // get week
            var loopDayWeek = jsProject.getWeek( date );
            // display week number
            $( '#' + self.MODULE + 'Week' + weekRow ).html( loopWeek );
            
            // get month names
            var monthNames = pleisterman.translations['monthNames'].split( ',' );
            
            // create header text
            var html = monthNames[self.datePickerDate['month'] - 1]; 
            html += ' - ';
            html += self.datePickerDate['year'];
            // done create header text
            
            // set header text
            $( '#' + self.MODULE + 'Header'  ).html( html );
            
            // reset day elements
            for( var i = 0; i < 6; i++ ){
                // loop over columns
                for( var j = 0; j < 7; j++ ){
                    // get day element
                    var dayElement = $( '#' + self.MODULE + 'Day' + i + '_' + j );
                    // set style
                    dayElement.css( 'border-width', '0px' );
                    dayElement.css( 'background-color', 'transparent' );
                    dayElement.html( '' );
                    // done set style
                    
                    // set attributes
                    dayElement.attr( 'isCurrentDate', false );
                    dayElement.attr( 'isEmpty', true );
                    // done set attributes
                }
            }
            // done reset day elements
            
            // loop over days of the month
            while( datePickerMonth === loopMonth ){
                // create temporary date
                var date = {
                    'year' : self.datePickerDate['year'],
                    'month' : self.datePickerDate['month'] - 1,
                    'day' : loopDay
                };
                // get week
                var week = jsProject.getWeek( date );
                // next week
                if( week !== loopWeek ){
                    // set week text
                    $( '#' + self.MODULE + 'Week' + weekRow ).html( week );
                    // next loop week
                    loopWeek = week;
                    // next day
                    var nextDay = new Date( self.datePickerDate['year'], self.datePickerDate['month'] - 1, loopDay + 1 );
                    // get month of next day
                    var nextDayMonth = nextDay.getMonth();
                    // same month
                    if( nextDayMonth === loopMonth ){
                        // next row
                        weekRow++;
                    }
                    // done same month
                }
                // done next week
                
                // days next row
                if( loopDayWeek !== week ){
                    loopDayWeek = week;
                    dayRow++;
                }
                // done days next row
                
                // set day values
                var place = ( loopDate.getDay() + 6 ) % 7;
                // get element
                var dayElement = $( '#' + self.MODULE + 'Day' + dayRow + '_' + place );
                // display day number
                dayElement.html( loopDay );
                // show border
                dayElement.css( 'border-width', self.dayOptions['borderWidth'] );
                // set not empty
                dayElement.attr( 'isEmpty', false );
                // is caller day
                if( self.datePickerDate['year'] === callerDate['year'] && 
                    self.datePickerDate['month'] === callerDate['month'] && 
                    loopDay === callerDate['day'] ){
                    // show highlight
                    dayElement.css( 'background-color', pleisterman.colors['buttonSelectedBackgroundColor']['color'] );
                    dayElement.css( 'color', pleisterman.colors['buttonSelectedColor']['color'] );
                    dayElement.css( 'cursor', 'default' );
                    // done show highlight
                    
                    // set today date
                    dayElement.attr( 'isCurrentDate', true );
                    // done today
                }
                // done is caller day
                else if( loopDay === self.tabStopDay ){
                    // any day
                    dayElement.css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                    dayElement.css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
                    dayElement.css( 'cursor', 'pointer' );
                    // done any day
                    
                    // set tabstop day
                    dayElement.attr( 'isTabStopDay', true );
                                }
                // other day
                else
                {
                    // any day
                    dayElement.css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                    dayElement.css( 'color', pleisterman.colors['buttonColor']['color'] );
                    dayElement.css( 'cursor', 'pointer' );
                    // done any day
                     
                    // unset tabstop day
                    dayElement.attr( 'isTabStopDay', false );
                }
                // done other day
                // done set day values
                
                // next day
                loopDay++;
                // next day date
                loopDate = new Date( self.datePickerDate['year'], self.datePickerDate['month'] - 1, loopDay );
                // month of next day
                loopMonth = loopDate.getMonth();
            }
            // done loop over days of the month
            
            // loop over rows
            for( var i = 0; i < 6; i++ ){
                if( i <= dayRow ){
                    // add borders for visible week rows 
                    $( '#' + self.MODULE + 'Week' + i ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
                }
                else{
                    // remove borders for empty week rows
                    $( '#' + self.MODULE + 'Week' + i ).css( 'border-color', 'transparent' );
                    // empty week text
                    $( '#' + self.MODULE + 'Week' + i ).html( '&nbsp;' );
                }
            }
            // loop over rows
            
        // DONE FUNCTION: refreshDatePicker( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // visible
            if( !self.displayOptions['visible'] ){
                // done
                return;
            }
            // done visible
            
            // get caller position
            var position =  jsProject.getElementPosition( 'inputData' + self.callerOptions['id'] );
            // get date picker height
            var datePickerHeight = $( '#' + self.containerOptions['id'] ).height();
            // get date picker width
            var datePickerWidth = $( '#' + self.containerOptions['id'] ).width();
            // get layuot height
            var layoutHeight =  $( '#layout' ).height();

            // caller position > layout height / 2
            if( position['top'] > ( layoutHeight / 2 ) ){
                position['top'] -= datePickerHeight;
                position['top'] -= self.displayOptions['above']['marginBottom'];
            }
            // caller position < layout height / 2
            else {
                position['top'] += self.displayOptions['under']['marginTop'];
            }
            // done caller position < layout height / 2
            
            // top maximum layout height - date picker height or top 
            position['top'] = Math.min( position['top'], layoutHeight - datePickerHeight );
            // top minimum 0
            position['top'] = Math.max( position['top'], 0 );
            
            // move position left when caller position is 3 / 4 to the right            
            if( position['left'] > ( $( '#layout').width() / 4 ) * 3 ){
                position['left'] -= datePickerWidth / 2;
            }
            // done move position left when caller position is 3 / 4 to the right            

            // set position
            $( '#' + self.containerOptions['id'] ).css( 'top', position['top'] + 'px' );
            $( '#' + self.containerOptions['id'] ).css( 'left', position['left'] + 'px' );
            // set position
            
        // DONE FUNCTION: layoutChange( void ) void
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
        };
        // DONE PUBLIC
    };
    // DONE MODULE: dataDatePickerModule( void ) void 
})( pleisterman );
// done create module function
