/* 
 *  Project: MbCommon Admin
 * 
 *  File: /mbCommon/js/templates/listRowsModule.js
 * 
 *  Purpose: 
 *          this module controls the display and events for the rows
 *          of the listModule
 *                      
 *  Last Revision: 12-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){

    // MODULE: listRowsModule( json: options, function: callback ) void 
    
    pleisterman.listRowsModule = function( options, callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listRowsModule';                                 // string: MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.id = options['id'];                                        // string: id    
        self.callback = callback;                                       // function: callback
        self.options = options;                                         // json: options
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );               // string: image dir
        self.listRowsOptions = {                                        // json: list rows options
            'id'                    :   'listRows' + self.id,           // string: element id
            'element'               :   'div',                          // string: html element type
            'overflow'              :   'hidden',                       // css overflow
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // json: list rows options
        self.headerOptions = {                                          // json: header options
            'id'                        :   'listRowsHeader' + self.id, // string: element id
            'element'                   :   'div',                      // string: html element type
            'minimumWidth'              :   '10.0em',                   // css minimum width
            'styleHeight'               :   '1.1em',                    // css style height
            'marginTop'                 :   '0.1em',                    // css margin top
            'color'                     :   pleisterman.colors['panelHighlightColor']['color'],     // css color: color
            'fontSize'                  :   '0.9em',                    // css font size
            'marginBottom'              :   '0.2em',                    // css margin bottom
            'paddingLeft'               :   '1.2em',                    // css padding left
            'padding'                   :   '0.2em',                    // css padding
            'paddingBottom'             :   '0.4em',                    // css padding top
            'borderBottom'              :   true,                       // boolean: has border
            'borderColor'               :   pleisterman.colors['panelBorderColor']['color'],        // css color: border color
            'borderWidth'               :   '0.1em',                    // relative size 
            'borderStyle'               :   'solid',                    // relative size 
            'backgroundColor'           :   pleisterman.colors['panelHighlightBackgroundColor']['color']
        };                                                              // done json: header options
        self.dateSelectionOptions = {                                   // json date selection options
            'id'                        :   'listRowsDateSelection' + self.id,  // string: element id
            'element'                   :   'div',                      // string: html element type
            'marginTop'                 :   '0.1em',                    // css margin top
            'color'                     :   pleisterman.colors['panelHighlightColor']['color'], // css color: color
            'fontSize'                  :   '0.9em',                    // css font sizer
            'marginBottom'              :   '0.2em',                    // css margin bottom
            'paddingLeft'               :   '4.2em',                    // css padding left
            'padding'                   :   '0.2em',                    // css padding
            'paddingBottom'             :   '0.4em',                    // css padding top
            'borderBottom'              :   true,                       // boolean, show border
            'borderColor'               :   pleisterman.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'               :   '0.1em',                    // css border width
            'borderStyle'               :   'solid',                    // css border style
            'backgroundColor'           :   pleisterman.colors['panelHighlightBackgroundColor']['color']
        };                                                              // done json date selection options        
        self.rowOptions = {                                             // json: row options
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'hidden',                       // css overflow 
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
            'backgroundSize'        :   '1.8em',                        // css background size
            'cursor'                :   'pointer'                       // css cursor            
        };                                                              // done json: row options
        self.rowTextOptions = {                                         // json: row text options
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'backgroundColor'       :   'transparent',                  // css background color
            'size'                  :   '60',                           // string: size
            'readOnly'              :   true,                           // boolean: readonly
            'paddingTop'            :   '0.2em',                        // css padding top
            'color'                 :   pleisterman.colors['editColor']['color'],       // css color: color
            'fontSize'              :   pleisterman.getSetting( 'listRowFontSize' ),    // css font size
            'fontWeight'            :   pleisterman.getSetting( 'listRowFontWeight' ),  // css font weight
            'paddingLeft'           :   '2.0em',                        // css padding left
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: row text options
        self.rowArray = null;                                           // json: row array
        self.listRowsDateSelectorModule = null;                         // module: list row date selector
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: listRows: ' + self.id );
            
            // create html
            self.addHtml();
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to order up
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add header to container
            $( '#listContent' + self.id ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            if( self.options['hasDayList'] ){
                // add selection to container
                $( '#listContent' + self.id ).append( jsProject.jsonToElementHtml( self.dateSelectionOptions ) );
                self.listRowsDateSelectorModule = new pleisterman.listRowsDateSelectorModule( self.dateSelectionOptions['id'], self.callback );
            }

            // add to container
            $( '#listContent' + self.id ).append( jsProject.jsonToElementHtml( self.listRowsOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.refreshRows = function( options ){
        // FUNCTION: refreshRows( json: options ) void
            
            // debug info
            self.debug( 'refreshRows ' + self.id );
            // delete existing rows
            self.deleteRows();
            // set header text
            $( '#' + self.headerOptions['id'] ).html( options['headerText'] );

            if( options['selection'] === 'dayList' ){
                
                self.listRowsDateSelectorModule.setDate( options['date'] );
                $( '#' + self.dateSelectionOptions['id'] ).show(  );
            }
            else {
                $( '#' + self.dateSelectionOptions['id'] ).hide(  );
            }
            
            // set self row array
            self.rowArray = options['rows'];
            // add html
            self.addRowHtml();
            // add events
            self.addRowEvents();

        // DONE FUNCTION: refreshRows( json: options ) void
        };
        self.addRowHtml = function(){
        // FUNCTION: addRowHtml( void ) void
            
            // debug info
            self.debug( 'add row html' );
            
            // add no row 
            self.addNoRowsRow();

            // add rows 
            self.addRows();
            
            // hide norows row
            if( self.rowArray.length > 0 ){
                $( '#listRow' + self.id + '_'  + 'noRows' ).hide( );
            }
            // done hide norows row

        // DONE FUNCTION: addRowHtml( void ) void
        };
        self.addNoRowsRow = function(){
        // FUNCTION: addNoRowsRow( void ) void
            
            // set row id
            self.rowOptions['id'] = 'listRow' + self.id + '_noRows';
            // set row image
            self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + 'noRowsIcon.png)';
            // add row
            $( '#' + self.listRowsOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowOptions ) );
            
            // set id 
            self.rowTextOptions['id'] = 'listRowText' + self.id + '_noRows';
            // add text 
            $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
            // set text
            $( '#' + self.rowTextOptions['id'] ).val( pleisterman.translations['noRows'] );

        // DONE FUNCTION: addNoRowsRow( void ) void
        };
        self.addRows = function(){
        // FUNCTION: addRows( void ) void
            
            // loop over rows
            $.each( self.rowArray, function( index, value ) {
                // set row id
                self.rowOptions['id'] = 'listRow' + self.id + '_' + value['id'];
                // set row image
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + self.options['id'] + 'RowIcon.png )';
                // add row
                $( '#' + self.listRowsOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );

                // set id 
                self.rowTextOptions['id'] = 'listRowText' + self.id + '_' + value['id'];
                // add text 
                $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( value['text'] );
                
            });
            // done loop over rows

        // DONE FUNCTION: addRows( void ) void
        };
        self.addRowEvents = function(){
        // FUNCTION: addRowEvents( void ) void
            
            // loop over rows
            $.each( self.rowArray, function( index, value ) {
                // row events
                $( '#listRow' + self.id + '_' + value['id'] ).mouseleave( function( event ){ self.rowMouseOut( event, this ); });
                $( '#listRow' + self.id + '_' + value['id'] ).mouseenter( function( event ){ self.rowMouseIn( event, this ); });
                $( '#listRow' + self.id + '_' + value['id'] ).click( function( event ){ self.rowClick( event, this ); });
                // done row events
            });
            // done loop over rows

        // DONE FUNCTION: addRowEvents( void ) void
        };
        self.rowMouseIn = function( event, element ){
        // FUNCTION: rowMouseIn( event: event, html element: element ) void
            
            var idArray = element.id.split( '_' );  
            // mouse over -> background color, color highlight
            $( '#listRow' + self.id + '_'  + idArray[idArray.length - 1] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#listRow' + self.id + '_'  + idArray[idArray.length - 1] ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );

        // DONE FUNCTION: rowMouseIn( event: event, html element: element ) void
        };
        self.rowMouseOut = function( event, element ){
        // FUNCTION: rowMouseOut( event: event, html element: element ) void
            
            var idArray = element.id.split( '_' );  
            // mouse over -> background, color
            $( '#listRow' + self.id + '_'  + idArray[idArray.length - 1] ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            $( '#listRow' + self.id + '_'  + idArray[idArray.length - 1] ).css( 'color', pleisterman.colors['editColor']['color'] );

        // DONE FUNCTION: rowMouseOut( event: event, html element: element ) void
        };
        self.rowClick = function( event, element ){
        // FUNCTION: rowClick( event: event, html element: element ) void
            
            event.preventDefault();
            event.stopPropagation(); 
            // get id
            var idArray = element.id.split( '_' );  
            var id = idArray[idArray.length - 1];
            // done get id 
            // call the callback
            self.callback( 'select', id );

        // DONE FUNCTION: rowClick( event: event, html element: element ) void
        };
        self.deleteRows = function( ){
        // FUNCTION: deleteRows( void ) void
            
            self.debug( 'clear' + self.id  );
            // loop over the rows
            if( self.rowArray ){
                $.each( self.rowArray, function( index, value ) {
                    // renove the events
                    $( '#listRow' + self.id + '_' + value['id'] ).off();
                });
            }
            // done loop over the rows
            self.rowArray = null;

        // DONE FUNCTION: deleteRows( void ) void
        };
        self.layoutChange = function(){
        // FUNCTION: layoutChange( void ) void
            
            // nothing to show
            if( !self.rowArray ){
                return;
            }
            
            // calculate the width of the text 
            var width = $( '#list' + self.id ).width();
            width -= self.rowOptions['paddingLeft'];
            width -= 10;
            // done calculate the width of the text 
            
            // set width of text
            $( '#listRowText' + self.id + '_'  + 'noRows' ).width( width );
            $.each( self.rowArray, function( index, value ) {
                $( '#listRowText' + self.id + '_'  + value['id'] ).width( width );
            });
            // done set width of text

        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // header colors
            $( '#' + self.headerOptions['id'] ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            $( '#' + self.headerOptions['id'] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.headerOptions['id'] ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
            // done header colors
            
            // date selector colors
            $( '#' + self.dateSelectionOptions['id'] ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            $( '#' + self.dateSelectionOptions['id'] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.dateSelectionOptions['id'] ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
            // done date selector colors
           
            // no rows row color
            $( '#' + 'listRow' + self.id + '_noRows' ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            $( '#' + 'listRow' + self.id + '_noRows' ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            // done no rows row color
            
            // has rows
            if( self.rowArray ){
                // loop over rows
                $.each( self.rowArray, function( index, value ) {
                    // row colors
                    $( '#listRow' + self.id + '_' + value['id'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
                    $( '#listRow' + self.id + '_' + value['id'] ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
                    $( '#listRowText' + self.id + '_'  + value['id'] ).css( 'color', pleisterman.colors['editColor']['color'] );
                    // done row colors
                });
                // done loop over rows
            }
            // done has rows

        // DONE FUNCTION: updateColors( void ) void
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
            // FUNCTION: refreshRows( json: rows ) void
            refreshRows : function( rows ){
                // call internal refreshRows
                self.refreshRows( rows );
            },
            // FUNCTION: layoutChange( void ) void
            layoutChange    : function(){
                // call internal layoutChange
                self.layoutChange();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: listRowsModule( json: options, function: callback ) void 
})( pleisterman );
// done create module function
