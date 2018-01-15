/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listSelectorModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          this module creates the selections for the listModule
 *          it displays a header with the text of the selected selection
 *          it displays the selections except the selected selection
 *          the selection are hidden when a selection is made
 *          the selections can be opened and closed
 *          the selection can be set
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

    // MODULE: listSelectorModule( void ) void 
    
    sharesoft.listSelectorModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listSelectorModule';                             // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );             // string: image url
        self.overlayOptions = {                                         // json: overlay options 
            'id'                    :   self.MODULE + 'Overlay',        // string: element id
            'element'               :   'div',                          // string html: element type 
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'overflow'              :   'hidden',                       // css overflow
            'top'                   :   0,                              // css top
            'left'                  :   0,                              // css left
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%',                         // css style width
            'zIndex'                :   sharesoft.getSetting( 'zIndexListSelectionsOverlay' ).toString(), // css z-index
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: overlay options
        self.containerOptions = {                                       // json: container options
            'id'                    :   self.MODULE + 'Container',      // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   sharesoft.colors['commonBackgroundColor']['color'], // css color: background color
            'color'                 :   sharesoft.colors['panelColor']['color'],            // css color: color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'padding'               :   '0.4em',                        // css padding
            'paddingTop'            :   '0.8em'                         // css padding top
        };                                                              // done json: container options    
        self.headerOptions = {                                          // json: header options
            'id'                    :   self.MODULE + 'Header',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   sharesoft.colors['commonBackgroundColor']['color'] // css color: background color
        };                                                              // done json: header options
        self.headerTextOptions = {                                      // json: header text options
            'id'                    :   self.MODULE + 'HeaderText',     // string: element id
            'element'               :   'div',                          // string: html element type 
            'color'                 :   sharesoft.colors['panelColor']['color'] // css color: color
        };                                                              // done json: header text options            
        self.headerOpenTabOptions = {                                   // json: header opem tab options
            'id'                    :   self.MODULE + 'HeaderOpenTab',  // string
            'element'               :   'div',                          // string html element type 
            'display'               :   'inline-block',                 // css display
            'text'                  :   sharesoft.translations['openNoun'], // string: text
            'backgroundColor'       :   sharesoft.colors['panelHighlightBackgroundColor']['color'], // css color: background color
            'color'                 :   sharesoft.colors['panelColor']['color'],                    // css color: color
            'padding'               :   '0.4em 1.4em',                  // css padding
            'borderRadius'          :   '0.1em 0.1em 0em 0.0em',        // css border radius
            'marginLeft'            :   '0.2em',                        // css margin left
            'marginTop'             :   '0.8em',                        // css margin top
            'marginRight'           :   '0.4em'                         // css margin right
        };                                                              // done json: header opem tab options
        self.headerClosedTabOptions = {                                 // json: header closed tab options
            'id'                    :   self.MODULE + 'HeaderClosedTab',// string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'text'                  :   sharesoft.translations['closed'],                   // string: text
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'],  // css color: background color
            'color'                 :   sharesoft.colors['panelColor']['color'],            // css color: color
            'padding'               :   '0.4em 1.4em',                  // css padding
            'borderRadius'          :   '0.1em 0.1em 0em 0.0em',        // css border radius
            'marginTop'             :   '0.8em',                        // css margin top
            'cursor'                :   'pointer',                      // css cursor           
        };                                                              // done json: header closed tab options
        self.openRowsContainerOptions = {                               // json: open rows container options
            'id'                    :   self.MODULE + 'OpenRowsContainer',  // string: element id
            'element'               :   'div',                          // string html: element type 
            'maximumHeight'         :   '10.0em',                       // css maximum height
            'styleWidth'            :   '20.0em',                       // css style width
            'overflowX'             :   'hidden',                       // css overflow-x
            'overflowY'             :   'auto',                         // css overflow-y
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '1px',                          // css border width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'marginTop'             :   '0.2em'                         // css margin top
        };                                                              // done json: open rows container options
        self.closedRowsContainerOptions = {                             // json: closed rows container options
            'id'                    :   self.MODULE + 'ClosedRowsContainer',  // string: element id
            'element'               :   'div',                          // string html: element type
            'maximumHeight'         :   '10.0em',                       // css maximum height
            'styleWidth'            :   '20.0em',                       // css style width
            'overflowX'             :   'hidden',                       // css overflow-x
            'overflowY'             :   'auto',                         // css overflow-y
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '1px',                          // css border width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'marginTop'             :   '0.2em'                         // css margin top
        };                                                              // done json: closed rows container options
        self.rowOptions = {                                             // json: row options
            'element'               :   'div',                          // string html: element type
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'],  // css color: background color
            'color'                 :   sharesoft.colors['panelColor']['color'],            // css color: color
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '4px center',                   // css background position
            'borderBottom'          :   true,                           // boolean: has border bottom
            'borderTop'             :   true,                           // boolean: has border top
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'padding'               :   '0.4em',                        // css padding
            'paddingLeft'           :   '1.2em',                        // css padding left
            'cursor'                :   'pointer',                      // css cursor           
        };                                                              // done json: row options
        self.rowTextOptions = {                                         // json: row text options
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'backgroundColor'       :   'transparent',                  // css background color
            'size'                  :   '60',                           // string: size
            'readOnly'              :   true,                           // boolean: readonly
            'paddingTop'            :   '0.2em',                        // css padding top
            'color'                 :   sharesoft.colors['editColor']['color'],     // css color: color
            'fontSize'              :   sharesoft.getSetting( 'listRowFontSize' ),  // css font size
            'fontWeight'            :   sharesoft.getSetting( 'listRowFontWeight' ),// css font weight
            'paddingLeft'           :   '3.2em',                        // css padding left
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: row text options      
        self.displayOptions = {                                         // json: display options
            'visible'               :   false,                          // boolean: visible
            'above' :   {                                               // json: above
                'marginBottom'      :   25                              // integer: margin bottom
            },                                                          // done json: above
            'under' :   {                                               // json: under
                'marginTop'         :   25                              // integer: margin top
            }                                                           // done json: under 
        };                                                              // done json: display options      
        self.callerOptions = null;                                      // json: caller options
        self.rows = null;                                               // json: rows
        self.currentTab = 'open';                                       // string: cureent tab
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: dataSelector : ' );
            
            // add html
            self.addHtml();

            // add the extensions to sharesoft
            self.addApplicationsExtensions();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show list selections
            sharesoft.showListSelector = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // add layuot change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add overlay to document
            $( document.body ).append( jsProject.jsonToElementHtml( self.overlayOptions ) );
           
            // add the container
            $( '#' + self.overlayOptions['id'] ).append( jsProject.jsonToElementHtml( self.containerOptions ) );

            self.addHeader();

            // add open rows container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.openRowsContainerOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addHeader = function( ){
        // FUNCTION: addHeader( void ) void
            
            // add rows header
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // add open tab to header
            $( '#' + self.headerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerTextOptions ) );
            // add open tab to header
            $( '#' + self.headerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOpenTabOptions ) );
            // add closed tab to header
            $( '#' + self.headerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerClosedTabOptions ) );
            
            // add header events
            self.addHeaderEvents();
            
        // DONE FUNCTION: addHeader( void ) void
        };
        self.addHeaderEvents = function( ){
        // FUNCTION: addHeaderEvents( void ) void
            
            // header open tab
            $( '#' + self.headerOpenTabOptions['id'] ).mouseenter( function( event ){ self.openTabMouseIn( ); });
            $( '#' + self.headerOpenTabOptions['id'] ).mouseleave( function( event ){ self.openTabMouseOut( ); });
            $( '#' + self.headerOpenTabOptions['id'] ).click( function( event ) { self.openTabClick( event ); } ); 
            // done header open tab            
            
            // header closed tab
            $( '#' + self.headerClosedTabOptions['id'] ).mouseenter( function( event ){ self.closedTabMouseIn( ); });
            $( '#' + self.headerClosedTabOptions['id'] ).mouseleave( function( event ){ self.closedTabMouseOut( ); });
            $( '#' + self.headerClosedTabOptions['id'] ).click( function( event ) { self.closedTabClick( event ); } ); 
            // done header closed tab            
            
        // DONE FUNCTION: addHeaderEvents( void ) void
        };
        self.openTabMouseIn = function( ){
        // FUNCTION: openTabMouseIn( void ) void
            
            if( self.currentTab === 'open' ){
                return;
            }
            $( '#' + self.headerOpenTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.headerOpenTabOptions['id'] ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: openTabMouseIn( void ) void
        };
        self.openTabMouseOut = function( ){
        // FUNCTION: openTabMouseOut( void ) void
            
            if( self.currentTab === 'open' ){
                return;
            }
            $( '#' + self.headerOpenTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
            $( '#' + self.headerOpenTabOptions['id'] ).css( 'color', sharesoft.colors['panelColor']['color'] );
            
        // DONE FUNCTION: openTabMouseOut( void ) void
        };
        self.openTabClick = function( event ){
        // FUNCTION: openTabClick( event: event ) void
            
            // stop propagation
            event.stopPropagation();
            
            if( self.currentTab === 'open' ){
                return;
            }
            self.currentTab = 'open';
            self.callerOptions['filterChangeCallback']( 'open', self.refreshRows );
            
        // DONE FUNCTION: openTabClick( event: event ) void
        };
        self.closedTabMouseIn = function( ){
        // FUNCTION: closedTabMouseIn( void ) void
            
            if( self.currentTab === 'closed' ){
                return;
            }
            $( '#' + self.headerClosedTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.headerClosedTabOptions['id'] ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: closedTabMouseIn( void ) void
        };
        self.closedTabMouseOut = function( ){
         // FUNCTION: closedTabMouseOut( void ) void
            
           if( self.currentTab === 'closed' ){
                return;
            }
            $( '#' + self.headerClosedTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
            $( '#' + self.headerClosedTabOptions['id'] ).css( 'color', sharesoft.colors['panelColor']['color'] );
            
        // DONE FUNCTION: closedTabMouseOut( void ) void
        };
        self.closedTabClick = function( event ){
         // FUNCTION: closedTabClick( event: event ) void
            
           // stop propagation
            event.stopPropagation();

            if( self.currentTab === 'closed' ){
                return;
            }
            self.currentTab = 'closed';
            self.callerOptions['filterChangeCallback']( 'closed', self.refreshRows );
            
            
        // DONE FUNCTION: closedTabClick( event: event ) void
        };
        self.show = function( options ){
         // FUNCTION: show( json: options ) void
            
           // debug info
            self.debug( ' show ' );
            
            // remmeber callerOptions
            self.callerOptions = options;

            $( '#' + self.headerTextOptions['id'] ).html( self.callerOptions['headerText'] );
            
            // set current tab to open
            self.currentTab = 'open';
            // refreshRows
            self.refreshRows( self.callerOptions['rows'] );

            // show overlay
            $( '#' + self.overlayOptions['id'] ).show();
            // rememer visibility
            self.displayOptions['visible'] = true;
           
            // add events
            self.addEvents();

            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( json: options ) void
        };
        self.close = function( event ){
        // FUNCTION: close( event: event ) void
            
           // stop propagation
            event.stopPropagation();
            // remove events
            self.removeEvents();
            // reset html
            $( '#' + self.openRowsContainerOptions['id'] ).html( '' );
            // remember visibility
            self.displayOptions['visible'] = false;
            // hide overlay 
            $( '#' + self.overlayOptions['id'] ).hide( );
            // unlink caller options
            self.callerOptions = null;
            
        // DONE FUNCTION: close( event: event ) void
        };
        self.refreshRows = function( rows ){
        // FUNCTION: refreshRows( json: rows ) void
            
            // rows exist
            if( self.rows ){
                // remove existing rows
                self.deleteRows();
            }
            // done rows exist

            // current tab = 'open' / 'closed'
            if( self.currentTab === 'open' ){
                
                // set colors
                $( '#' + self.headerOpenTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
                $( '#' + self.headerOpenTabOptions['id'] ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
                $( '#' + self.headerClosedTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
                $( '#' + self.headerClosedTabOptions['id'] ).css( 'color', sharesoft.colors['panelColor']['color'] );
                // done set colors
            }
            else {
                // set colors
                $( '#' + self.headerClosedTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
                $( '#' + self.headerClosedTabOptions['id'] ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
                $( '#' + self.headerOpenTabOptions['id'] ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
                $( '#' + self.headerOpenTabOptions['id'] ).css( 'color', sharesoft.colors['panelColor']['color'] );
                // done set colors
            }
            // done current tab = 'open' / 'closed'
            
            // set rows
            self.rows = rows;
            
            // no rows
            if( self.rows.length === 0 ){
                // create id
                var id = self.MODULE + 'Row_' + 'noRows';
                // set id 
                self.rowOptions['id'] = id;
                // set image
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + 'noRowsIcon.png)';
                // set cursor
                self.rowOptions['cursor'] = 'default';
                // add row
                $( '#' + self.openRowsContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );

                // set id 
                self.rowTextOptions['id'] = self.MODULE + 'RowText_' + 'noRows';
                // add text 
                $( '#' + id ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( sharesoft.translations['noRows'] );
                
            }
            // done no rows
            
            // loop over rows
            for( var i = 0; i < self.rows.length; i++ ){
                
                // create id
                var id = self.MODULE + 'Row_' + self.rows[i]['id'];
                // set id 
                self.rowOptions['id'] = id;
                // set image
                self.rowOptions['imageUrl'] = 'url(' + self.imageUrl + self.callerOptions['id'] + 'RowIcon.png )';
                // set cursor
                self.rowOptions['cursor'] = 'pointer';
                // add row
                $( '#' + self.openRowsContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );

                // set id 
                self.rowTextOptions['id'] = 'RowText_' + self.rows[i]['id'];
                // add text 
                $( '#' + id ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
                // set val
                $( '#' + self.rowTextOptions['id'] ).val( self.rows[i]['text'] );
                
            }
            // done loop over rows
            
            // add row events
            self.addRowEvents();
            
        // DONE FUNCTION: refreshRows( json: rows ) void
        };
        self.deleteRows = function(  ){
        // FUNCTION: deleteRows( void ) void
            
            for( var i = 0; i < self.rows.length; i++ ){
                var id = self.MODULE + 'Row_' + self.rows[i]['id'];   
                $( '#' + id ).off( );
            }
            $( '#' + self.openRowsContainerOptions['id'] ).html( '' );
            
        // DONE FUNCTION: deleteRows( void ) void
        };
        self.addEvents = function(){
         // FUNCTION: addEvents( void ) void
            
           // document click, to close
            $( document.body ).click( function( event ){ self.close( event ); } );
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addRowEvents = function(){
        // FUNCTION: addRowEvents( void ) void
            
            for( var i = 0; i < self.rows.length; i++ ){
                    var id = self.MODULE + 'Row_' + self.rows[i]['id'];
                    var selection = self.rows[i];
                    $( '#' + id ).mouseover( function( event ){ self.rowMouseOver( this ); });
                    $( '#' + id ).mouseout( function( event ){ self.rowMouseOut( this ); });
                    $( '#' + id ).click( function( event ){ self.rowClick( event, this ); });
            }
            
        // DONE FUNCTION: addRowEvents( void ) void
        };
        self.removeEvents = function(  ){
         // FUNCTION: removeEvents( void ) void
            
           // document
            $( document.body ).off( 'click' );
            
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.rowMouseOver = function( element ){
        // FUNCTION: rowMouseOver( html element: element ) void
            
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: rowMouseOver( element: element ) void
        };
        self.rowMouseOut = function( element ){
        // FUNCTION: rowMouseOut( html element: element ) void
            
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', sharesoft.colors['panelColor']['color'] );
            
        // DONE FUNCTION: rowMouseOut( html element: element ) void
        };
        self.rowClick = function( event, element ){
         // FUNCTION: construct( event: event, html element: element ) void
            
           self.debug( element.id );
            var idArray = element.id.split( '_' );
            var id = idArray[idArray.length-1];
            if( self.callerOptions['selectCallback'] ){
                self.callerOptions['selectCallback']( id );
            }
            self.close( event );
            
        // DONE FUNCTION: construct( event: event, html element: element ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // visible
            if( !self.displayOptions['visible'] ){
                return;
            }
            // done visible
        
            // get caller position
            var position =  jsProject.getElementPosition( self.callerOptions['elementId'] );

            // get date picker height
            var containerHeight = $( '#' + self.containerOptions['id'] ).height();
            // get date picker width
            var containerWidth = $( '#' + self.containerOptions['id'] ).width();
            // get layuot height
            var layoutHeight =  $( '#layout' ).height();

            // caller position > layout height / 2
            if( position['top'] > ( layoutHeight / 2 ) ){
                position['top'] -= containerHeight;
                position['top'] -= self.displayOptions['above']['marginBottom'];
            }
            // caller position < layout height / 2
            else {
                position['top'] += self.displayOptions['under']['marginTop'];
            }
            // done caller position < layout height / 2
            
            // top maximum layout height - date picker height or top 
            position['top'] = Math.min( position['top'], layoutHeight - containerHeight );
            // top minimum 0
            position['top'] = Math.max( position['top'], 0 );
            
            // move position left when caller position is 3 / 4 to the right            
            if( position['left'] > ( $( '#layout').width() / 4 ) * 3 ){
                position['left'] -= containerWidth / 2;
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
            // FUNCTION: show( void ) void
            show : function( ){
                // call internal
                self.show( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: listSelectionsModule( void ) void 
})( sharesoft );
// done create module function
