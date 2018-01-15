/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listSelectionsModule.js
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

    // MODULE: listSelectionsModule( void ) void 
    
    pleisterman.listSelectionsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'listSelectionsModule';                       // string:  MODULE
        self.debugOn = false;                                       // boolean: debug
        self.overlayOptions = {                                     // json: overlay options 
            'id'                    :   'listSelectionsOverlay',    // string: element id
            'element'               :   'div',                      // string: html element type 
            'position'              :   'absolute',                 // css position
            'display'               :   'none',                     // css display
            'overflow'              :   'hidden',                   // css overflow
            'top'                   :   0,                          // css top
            'left'                  :   0,                          // css left
            'styleHeight'           :   '100%',                     // css style height
            'styleWidth'            :   '100%',                     // css style width
            'zIndex'                :   pleisterman.getSetting( 'zIndexListSelectionsOverlay' ).toString(), // css z-index
            'backgroundColor'       :   'transparent'               // css color: background color
        };                                                          // done json: overlay options
        self.containerOptions = {                                   // json: container options
            'id'                    :   'listSelectionsContainer',  // string: element id
            'element'               :   'div',                      // string: html element type 
            'text'                  :   pleisterman.translations['selections'],   // string: text
            'position'              :   'absolute',                 // css position
            'backgroundColor'       :   pleisterman.colors['commonBackgroundColor']['color'], // css color: background color
            'color'                 :   pleisterman.colors['panelColor']['color'],            // css color: color
            'border'                :   true,                       // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css border color
            'borderWidth'           :   '0.1em',                    // relative size
            'borderStyle'           :   'groove',                   // css border style
            'borderRadius'          :   '0.1em',                    // css border radius
            'padding'               :   '0.4em',                    // css padding
            'paddingTop'            :   '0.8em'                     // css padding top
        };                                                          // done json: container options
        self.rowsContainerOptions = {                               // json: rows cntainer options
            'id'                    :   'listSelectionsRowsContainer',  // string: element id
            'element'               :   'div',                      // string: html element type 
            'border'                :   true,                       // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css border color
            'borderWidth'           :   '1px',                      // css border width
            'borderStyle'           :   'groove',                   // css border style
            'borderRadius'          :   '0.1em',                    // css border radius
            'marginTop'             :   '0.8em'                     // css margin top
        };                                                          // done json: rows container options        
        self.rowOptions = {                                         // json row options
            'element'               :   'div',                      // string: html element type 
            'backgroundColor'       :   pleisterman.colors['panelBackgroundColor']['color'],  // css color: background color
            'color'                 :   pleisterman.colors['panelColor']['color'],            // css color: color
            'borderBottom'          :   true,                       // boolean: has border bottom
            'borderTop'             :   true,                       // boolean: has border top
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],      // css border color
            'borderWidth'           :   '0.1em',                    // css border width
            'borderStyle'           :   'groove',                   // css border style
            'borderRadius'          :   '0.1em',                    // css border radius
            'padding'               :   '0.4em',                    // css padding
            'paddingLeft'           :   '1.2em'                     // css padding left
        };                                                          // done json: row options
        self.displayOptions = {                                     // json: display options
            'visible'               :   false,                      // boolean: visible
            'above' :   {                                           // json: above
                'marginBottom'      :   25                          // integer: margin bottom
            },                                                      // done json: above
            'under' :   {                                           // json: under
                'marginTop'         :   25                          // integer: margin top
            }                                                       // done json: under
        };                                                          // done json: display options
        self.callerOptions = {                                      // json: caller options
            'id'        :   null,                                   // string: id
            'options'   :   null,                                   // json: options
            'callback'  :   null                                    // function: callback
        };                                                          // done json: caller options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: listSelections : ' );
            
            // add html
            self.addHtml();

            // add the extensions to pleisterman
            self.addApplicationsExtensions();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show list selections
            pleisterman.showListSelections = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // event subscription
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add overlay to document
            $( document.body ).append( jsProject.jsonToElementHtml( self.overlayOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.show = function( id, options, callback ){
        // FUNCTION: show( string: id, json: options, function: callback ) void
            
            // debug info
            self.debug( ' show ' );
            
            // add the container
            $( '#' + self.overlayOptions['id'] ).html( jsProject.jsonToElementHtml( self.containerOptions ) );

            // add rows container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowsContainerOptions ) );

            // one or more is false
            var oneOrMoreSelections = false;
            
            // get selections
            var selections = options['selections'];
            
            // loop over selections
            for( var i = 0; i < selections.length; i++ ){
                // selection is !current selection
                if( selections[i] !== options['currentSelection'] ){
                    // one or more selections is true
                    oneOrMoreSelections = true;
                }
                // done selection is !current selection
            }
            // done loop over selections

            // !one or more selections
            if( !oneOrMoreSelections ){
                // done 
                return;
            } 
            // done !one or more selections
            
            // remember caller id
            self.callerOptions['id'] = id;
            // remember caller options
            self.callerOptions['options'] = options;
            // remember caller callback
            self.callerOptions['callback'] = callback;

            // add html for selections
            self.addSelectionHtml();

            // show overlay
            $( '#' + self.overlayOptions['id'] ).show();
            // rememer visibility
            self.displayOptions['visible'] = true;
           
            // add events
            self.addEvents();

            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( string: id, json: options, function: callback ) void
        };
        self.close = function( event ){
        // FUNCTION: close( event: event ) void
            
            // stop propagation
            event.stopPropagation();
            // remove events
            self.removeEvents();
            $( '#' + self.rowsContainerOptions['id'] ).html( '' );
            // remember visibility
            self.displayOptions['visible'] = false;
            // hide overlay 
            $( '#' + self.overlayOptions['id'] ).hide( );
            // unlink caller options
            self.callerOptions['options'] = null;
            // unset id
            self.callerOptions['id'] = null;
            // unset callback
            self.callerOptions['callback'] = null;
            
        // DONE FUNCTION: close( event: event ) void
        };
        self.addSelectionHtml = function( ){
        // FUNCTION: addSelectionHtml( void ) void
            
            // get selections
            var selections = self.callerOptions['options']['selections'];
            
            // loop over selections
            for( var i = 0; i < selections.length; i++ ){
                // selection ! current selection
                if( selections[i] !== self.callerOptions['options']['currentSelection'] ){
                    // create row id
                    self.rowOptions['id'] = 'listSelection_' + selections[i];
                    // create row text
                    self.rowOptions['text'] = pleisterman.translations[selections[i]];
                    // add row html to container
                    $( '#' + self.rowsContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
                }                
                // done selection ! current selection
            }
            // done loop over selections
            
        // DONE FUNCTION: addSelectionHtml( void ) void
        };
        self.dateSelectorCallback = function(){
        // FUNCTION: dateSelectorCallback( void ) void
            
            self.debug( 'dateSelectorCallback' );
            
        // DONE FUNCTION: dateSelectorCallback( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // document click, to close
            $( document.body ).click( function( event ){ self.close( event ); } );

            var selections = self.callerOptions['options']['selections'];
            for( var i = 0; i < selections.length; i++ ){
                if( selections[i] !== self.callerOptions['options']['currentSelection'] ){
                    var id = 'listSelection_' + selections[i];
                    var selection = selections[i];
                    $( '#' + id ).mouseover( function( event ){ self.listSelectionMouseOver( this ); });
                    $( '#' + id ).mouseout( function( event ){ self.listSelectionMouseOut( this ); });
                    $( '#' + id ).click( function( event ){ self.listSelectionClick( event, this ); });
                }                
            }
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function(  ){
        // FUNCTION: removeEvents( void ) void
            
            // document
            $( document.body ).off( 'click' );
            var selections = self.callerOptions['options']['selections'];
            for( var i = 0; i < selections.length; i++ ){
                var id = 'listSelection_' + [i];    
                $( '#' + id ).off( );
            }
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.listSelectionMouseOver = function( element ){
        // FUNCTION: listSelectionMouseOver( html element: element ) void
            
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: listSelectionMouseOver( html element: element ) void
        };
        self.listSelectionMouseOut = function( element ){
        // FUNCTION: listSelectionMouseOut( html element: element ) void
            
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['panelBackgroundColor']['color'] );
            $( '#' + element.id ).css( 'color', pleisterman.colors['panelColor']['color'] );
            
        // DONE FUNCTION: listSelectionMouseOut( html element: element ) void
        };
        self.listSelectionClick = function( event, element ){
        // FUNCTION: listSelectionClick( event: event, html element: element ) void
            
            self.debug( element.id );
            var idArray = element.id.split( '_' );
            var id = idArray[idArray.length-1];
            if( self.callerOptions['callback'] ){
                self.callerOptions['callback']( id );
            }
            self.close( event );
            
        // DONE FUNCTION: listSelectionClick( event: event, html element: element ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // visible
            if( !self.displayOptions['visible'] ){
                return;
            }
            // done visible
        
            // get caller position
            var position =  jsProject.getElementPosition( self.callerOptions['id'] );

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
        };
        // DONE PUBLIC
    };
    // DONE MODULE: listSelectionsModule( void ) void 
})( pleisterman );
// done create module function
