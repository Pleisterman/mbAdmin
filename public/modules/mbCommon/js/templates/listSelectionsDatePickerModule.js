/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listSelectionsDatePickerModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          displays a datepicker for a list selectionsDateModule
 *          sets caller date and calls a callback on return
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

    // MODULE: listSelectionsDatePickerModule( void ) void 
    
    sharesoft.listSelectionsDatePickerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listSelectionsDatePickerModule';                 // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );             // string: image dir
        self.overlayOptions = {                                         // json: overlay options 
            'id'                    :   'mainOverlay'                   // string: element id
        };                                                              // done json: overlay options
        self.containerOptions = {                                       // json: container options
            'id'                    :   self.MODULE + 'Container',      // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'],  // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],      // css color: border color
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
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'], // css color: background color
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   'center center',                // css background position        
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'], // css color: border color
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
            'fontSize'              :   '1.0em',                        // css relative font size
            'fontWeight'            :   'bold',                         // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'backgroundColor'       :   sharesoft.colors['panelHighlightBackgroundColor']['color'], // css color: background color
            'color'                 :   sharesoft.colors['panelHighlightColor']['color']            // css color: color
        };                                                              // done json: header options
        self.selectionOptions = {                                       // json: selection options
            'id'                    :   self.MODULE + 'Selection',      // string: element id
            'element'               :   'table'                         // string: html element type 
        };                                                              // done json: selection options
        self.weekHeaderOptions = {                                      // json: week header options
            'element'               :   'td',                           // string html element type 
            'text'                  :   sharesoft.translations['weekText'],                 // string: text 
            'fontSize'              :   sharesoft.getSetting( 'dataEditInputFontSize' ),    // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'padding'               :   '0.3em',                        // css padding 
            'textAlign'             :   'center',                       // css text align  
            'color'                 :   sharesoft.colors['panelColor']['color'],    // css color: color
        };                                                              // done json: week header options
        self.dayNamesOptions = {                                        // json: day names options
            'element'               :   'td',                           // string html element type 
            'fontSize'              :   sharesoft.getSetting( 'dataEditInputFontSize' ),   // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataEditInputFontWeight' ), // css font weight
            'minimumWidth'          :   '3.5em',                        // css minimum width
            'textAlign'             :   'center',                       // css text align
            'padding'               :   3,                              // css padding 
            'color'                 :   sharesoft.colors['panelColor']['color'],            // css color: color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   1,                              // css border width 
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],      // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   5                               // css border radius
        };                                                              // done json: day names options
        self.weekNumberOptions = {                                      // json: week number options
            'element'               :   'td',                           // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text
            'fontSize'              :   sharesoft.getSetting( 'dataEditInputFontSize' ),    // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'minimumWidth'          :   25,                             // css minimum width 
            'textAlign'             :   'center',                       // css text align
            'padding'               :   3,                              // css padding 
            'color'                 :   sharesoft.colors['panelColor']['color'], // css color: color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   1,                              // css border width 
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],  // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   5                               // css border radius   
        };                                                              // done json: week number options     
        self.dayOptions = {                                             // json: day options
            'element'               :   'td',                           // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text
            'fontSize'              :   sharesoft.getSetting( 'dataEditInputFontSize' ),    // css font size   
            'fontWeight'            :   sharesoft.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'minimumWidth'          :   25,                             // css minimum width 
            'textAlign'             :   'center',                       // css text align
            'padding'               :   3,                              // css padding 
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'], // css color: background color
            'color'                 :   sharesoft.colors['buttonColor']['color'],           // css color: color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   1,                              // css border width 
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   5                               // css border radius
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
            'selectedDate'          :   null,                           // date: selected date
            'callback'              :    null                           // functiom: callback
        };                                                              // done json: caller options
        self.datePickerDate = {                                         // json: datepicker date
            'year'  :   0,                                              // integer: year
            'month' :   0,                                              // integer: month
            'day'   :   0                                               // integer: day
        };                                                              // done json: datepicker date
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to sharesoft
            self.addApplicationsExtensions();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show data datepicker
            sharesoft.showSelectionsDatePicker = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: construct( void ) void
            
            // event subscription
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.show = function( id, selectedDate, callback ) {
        // FUNCTION: show( string: element id, date: selected date, function: callback ) void
            
            // debug info
            self.debug( 'show' );
            
            // already open
            if( self.containerOptions['open'] ){
                return;
            }
            // already open
             
            // remember open
            self.containerOptions['open'] = true;
            
            // remember caller
            self.callerOptions['id'] = id;
            self.callerOptions['selectedDate'] = selectedDate;
            self.callerOptions['callback'] = callback;
            // done remember caller

            // create date object
            var dateObject = jsProject.dbDateToDateObject( selectedDate ); 
            
            // set date picker date
            self.datePickerDate['year'] = dateObject['year'];
            self.datePickerDate['month'] = dateObject['month'];
            self.datePickerDate['day'] = dateObject['day'];
            // done set date picker date
            
            // create the html
            self.createDatePicker();
            
            // add events
            self.addEvents();
            
            // refresh
            self.refreshDatePicker();
            
            // show overlay
            $( '#' + self.overlayOptions['id'] ).show();
            // remember visibility
            self.displayOptions['visible'] = true;
            
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( string: element id, date: selected date, function: callback ) void
        };
        self.createDatePicker = function(){
        // FUNCTION: createDatePicker( void ) void
            
            // add item container to content
            $( '#' + self.overlayOptions['id'] ).html( jsProject.jsonToElementHtml( self.containerOptions ) );
            
            // add header
            self.addHeader();
            
            // add selection
            self.addSelection();
            
        // DONE FUNCTION: createDatePicker( void ) void
        };
        self.addHeader = function(){
        // FUNCTION: addHeader( void ) void
            
            // set down button values
            self.buttonOptions['id'] = self.MODULE + 'ButtonDown';
            self.buttonOptions['float'] = 'left';
            self.buttonOptions['imageUrl'] = 'url( ' + self.imageUrl + 'datePickerDown.png )';
            // done set down button values
            
            // add down button to datePicker container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
            // set up button values
            self.buttonOptions['id'] = self.MODULE + 'ButtonUp';
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
            var dayNames = sharesoft.translations['dayNamesShort'].split( ',' );
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
            $( document.body ).click( function( event ){ self.closeDatePicker( event ); } );
            
            // conainer click, prevent close
            $( '#' + self.containerOptions['id'] ).click( function( event ){ self.containerMouseClick( event ); } );
            
            // down button
            $( '#' + self.MODULE + 'ButtonDown' ).click( function( event ){ self.downClick( event ); });
            $( '#' + self.MODULE + 'ButtonDown' ).mouseover( function( event ){ self.downOver( event ); });
            $( '#' + self.MODULE + 'ButtonDown' ).mouseout( function( event ){ self.downOut( event ); });
            // done down button
            
            // up button
            $( '#' + self.MODULE + 'ButtonUp' ).click( function( event ){ self.upClick( event ); });
            $( '#' + self.MODULE + 'ButtonUp' ).mouseover( function( event ){ self.upOver( event ); });
            $( '#' + self.MODULE + 'ButtonUp' ).mouseout( function( event ){ self.upOut( event ); });
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
            $( '#' + self.MODULE + 'ButtonDown' ).off();
            // button up
            $( '#' + self.MODULE + 'ButtonUp' ).off();
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
        self.downOver = function( event ){
        // FUNCTION: downOver( event: event ) void
            
            // mouse in -> color and background color highlight
            $( '#' + self.MODULE + 'ButtonDown' ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'ButtonDown' ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            // done mouse in -> color and background color highlight
            
        // DONE FUNCTION: downOver( event: event ) void
        };
        self.downOut = function( event ){
        // FUNCTION: downOut( event: event ) void
            
            // mouse out -> color and background color default
            $( '#' + self.MODULE + 'ButtonDown' ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'ButtonDown' ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            // done mouse out -> color and background color default
            
        // DONE FUNCTION: downOut( event: event ) void
        };
        self.downClick = function( event ){
        // FUNCTION: downClick( event: event ) void
            
            // debug info
            self.debug( 'down' );
            // stop event propagation
            event.stopPropagation();
            // create date with month - 1 
            var date = new Date( self.datePickerDate['year'], self.datePickerDate['month'] - 2, 1 );
            // get new date 
            self.datePickerDate['year'] = date.getFullYear();
            self.datePickerDate['month'] = date.getMonth() + 1;
            // done get new date 
            // refresh datepicker data
            self.refreshDatePicker();
            
        // DONE FUNCTION: downClick( event: event ) void
        };
        self.upOver = function( event ){
        // FUNCTION: upOver( event: event ) void
            
            // mouse ib -> color and background color highlight
            $( '#' + self.MODULE + 'ButtonUp' ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'ButtonUp' ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            // done mouse in -> color and background color highlight
            
        // DONE FUNCTION: upOver( event: event ) void
        };
        self.upOut = function( event ){
        // FUNCTION: upOut( event: event ) void
            
            // mouse out -> color and background color default
            $( '#' + self.MODULE + 'ButtonUp' ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.MODULE + 'ButtonUp' ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            // done mouse out -> color and background color default
            
        // DONE FUNCTION: upOut( event: event ) void
        };
        self.upClick = function( event ){
        // FUNCTION: upClick( event: event ) void
            
            // debug info
            self.debug( 'up' );
            // stop event propagation
            event.stopPropagation();
            // create date with month + 1 
            var date = new Date( self.datePickerDate['year'], self.datePickerDate['month'], 1 );
            // get new date 
            self.datePickerDate['year'] = date.getFullYear();
            self.datePickerDate['month'] = date.getMonth() + 1;
            // done get new date 
            // refresh datepicker data
            self.refreshDatePicker();
            
        // DONE FUNCTION: upClick( event: event ) void
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
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            // done mouse in -> color and background color highlight
            
        // DONE FUNCTION: dayOver( event: event, html element: element ) void
        };
        self.dayOut = function( event, element ){
        // FUNCTION: dayOut( event: event, html element: element ) void
            
            // today or not a day
            if( $( '#' + element.id ).attr( 'isCurrentDate' ) === 'true' ||
                $( '#' + element.id ).attr( 'isEmpty' ) === 'true'  ){
                return;
            }
            // done today or not a day
            
            // mouse out -> color and background color default
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            // done mouse out -> color and background color default
            
        // DONE FUNCTION: dayOut( event: event, html element: element ) void
        };
        self.dayClick = function( event, element ){
        // FUNCTION: dayClick( event: event, html element: element ) void
            
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
            var dbDate = jsProject.dateObjectToDbDate( self.datePickerDate );
            
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
                self.callerOptions['callback']( dbDate );
                // remove callback
                self.callerOptions['callback'] = null;
            } 
            // done has callback
            
        // DONE FUNCTION: dayClick( event: event, html element: element ) void
        };
        self.closeDatePicker = function( event ){
        // FUNCTION: closeDatePicker( event: event ) void
            
            // debug info
            self.debug( 'closeDatePicker' );
            
            // stop propagation
            event.stopPropagation();
            // remove events
            self.removeEvents();
            
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
            
        // DONE FUNCTION: closeDatePicker( event: event ) void
        };
        self.containerMouseClick = function( event ){
        // FUNCTION: containerMouseClick( event: event ) void
            
            // prevent propagation
            event.stopPropagation();
            
        // DONE FUNCTION: containerMouseClick( event: event ) void
        };
        self.refreshDatePicker = function(){
        // FUNCTION: refreshDatePicker( void ) void
            
            // create date object
            var dateObject = jsProject.dbDateToDateObject( self.callerOptions['selectedDate'] ); 
            
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
            var monthNames = sharesoft.translations['monthNames'].split( ',' );
            
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
                dayElement.css( 'border-width', self.dayOptions['borderWidth'] + 'px' );
                // set not empty
                dayElement.attr( 'isEmpty', false );
                // is caller day
                if( self.datePickerDate['year'] === callerDate['year'] && 
                    self.datePickerDate['month'] === callerDate['month'] && 
                    loopDay === callerDate['day'] ){
                    // show highlight
                    dayElement.css( 'background-color', sharesoft.colors['buttonSelectedBackgroundColor']['color'] );
                    dayElement.css( 'color', sharesoft.colors['buttonSelectedColor']['color'] );
                    dayElement.css( 'cursor', 'default' );
                    // done show highlight
                    
                    // set today date
                    dayElement.attr( 'isCurrentDate', true );
                    // done today
                }
                // done is caller day
                // other day
                else{
                    // any day
                    dayElement.css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
                    dayElement.css( 'color', sharesoft.colors['buttonColor']['color'] );
                    dayElement.css( 'cursor', 'pointer' );
                    // done any day
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
                    $( '#' + self.MODULE + 'Week' + i ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
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
        // FUNCTION: construct( void ) void
            
            // visible
            if( !self.displayOptions['visible'] ){
                return;
            }
            // done visible
            
            // get caller position
            var position =  jsProject.getElementPosition( self.callerOptions['id'] );
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
    // DONE MODULE: listSelectionsDatePickerModule( void ) void 
})( sharesoft );
// done create module function
