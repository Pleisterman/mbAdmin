/* 
 *  Project: MbSiteCms 
 * 
 *  File: /mbCommon/js/layout/dividerModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          this file controls the divider for the application
 *          the divider is used to give the user control of the layout.
 *          this divider is a vertical divider that controls the width of two divs.
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

    // MODULE: dividerModule( void ) void 
    
    sharesoft.dividerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'dividerModule';                              // string:  MODULE
        self.debugOn = false;                                       // boolean: debug
        self.lastMousePosition = { 'x' : 0 };                       // last mouse position for move events
        self.dragging = false;                                      // boolean: dragging
        self.moveOptions = {                                        // json: move options
            'timer'                 :   null,                       // time object
            'delay'                 :   30,                         // integer: delay
            'change'                :   2                           // integer: change
        };                                                          // done json: move options
        self.dividerOptions = {                                     // json: divider options
            'id'                    :   'divider',                  // string: element id 
            'element'               :   'div',                      // string: html element type 
            'position'              :   'absolute',                 // css position
            'overflow'              :   'hidden',                   // css overflow 
            'styleWidth'            :   '0.7em',                    // css style width
            'zIndex'                :   sharesoft.getSetting( 'zIndexDivider' ).toString(), // css z-index
            'cursor'                :   'col-resize',               // css cursor    
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'],
            'eventLayer'            :   'main',                     // string event layer id
            'borderRight'           :   true,                       // boolean: has border rigth
            'borderLeft'            :   true,                       // boolean: has border left
            'borderWidth'           :   '1px',                      // css border width
            'borderColor'           :   sharesoft.colors['buttonBackgroundColor']['color'], // css border color
            'borderStyle'           :   'groove',                   // css border style
        };                                                          // done json: divider options
        self.dragAreaOptions = {                                    // json: drag area options
            'id'                    :   'dividerDragArea',          // string: element id 
            'element'               :   'div',                      // string: html element type 
            'display'               :   'none',                     // css display style
            'position'              :   'absolute',                 // css position
            'zIndex'                :   sharesoft.getSetting( 'zIndexDividerDragArea' ).toString(), // css z-index
            'backgroundColor'       :   'transparent',              // css color: background color
            'cursor'                :   'col-resize',               // css cursor    
            'offset'                :   120,                        // integer: offset
            'eventLayer'            :   'main'                      // string event layer id
        };                                                          // done json: drag area options
        self.dividerDragButtonOptions = {                           // json: drag button options
            'id'                :   'dividerDragButton',            // string: element id
            'element'           :   'div',                          // string: html element type 
            'backgroundColor'   :   sharesoft.colors['buttonHighlightBackgroundColor']['color'], // css color: background color
            'borderRadius'      :   '0.2em',                        // css border radius
            'styleHeight'       :   '80%',                          // css style height
            'styleWidth'        :   '40%',                          // css style width
            'marginLeft'        :   '30%',                          // css margin left
            'marginTop'         :   '25%'                           // css margin top
        };                                                          // done json: drag button options
        self.dividerJumpButtonOptions = {                           // json: jump button options
            'element'           :   'div',                          // string: html element type 
            'jumpPosition'      :   200,                            // integer: jump position
            'backgroundColor'   :   sharesoft.colors['buttonHighlightBackgroundColor']['color'], // css color: background color
            'borderRadius'      :   '0.2em',                        // css border radius
            'styleHeight'       :   '9%',                           // csss style height
            'styleWidth'        :   '70%',                          // css style width
            'marginLeft'        :   '22%',                          // css margin left
            'marginTop'         :   '25%',                          // css margin top
            'marginBottom'      :   '10%',                          // css margin bottom    
            'cursor'            :   'pointer'                       // css cursor    
        };                                                          // done json: jump button options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );

            // create html
            self.addHtml();

            // event subscription
            self.addEventSubscriptions();

            // add events
            self.addEvents();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: layoutChange( void ) void
        
            // subscribe to layuot change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
        
            // add divider
            $( document.body ).append( jsProject.jsonToElementHtml( self.dragAreaOptions ) );

            // add divider
            $( document.body ).append( jsProject.jsonToElementHtml( self.dividerOptions ) );

            // add top jump button
            self.dividerJumpButtonOptions['id'] = 'dividerJumpButtonTop';
            $( '#' + self.dividerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dividerJumpButtonOptions ) );
            // done add top jump button
            
            // add drag button
            $( '#' + self.dividerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dividerDragButtonOptions ) );
            
            // add bottom jump button
            self.dividerJumpButtonOptions['id'] = 'dividerJumpButtonBottom';
            $( '#' + self.dividerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dividerJumpButtonOptions ) );
            // done add bottom jump button
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
        
            // add divider events
            self.addButtonEvents();
            // add drag events
            self.addDragEvents();
            // add top jump events
            self.addJumpEvents( );
            
        // DONE FUNCTION: addEvents( void ) void
        };            
        self.addDragEvents = function() {
        // FUNCTION: addDragEvents( void ) void
        
            var id = self.dragAreaOptions['id'];
            $( '#' + id ).mouseout( function( event ){ self.endDrag( ); }); 
            $( '#' + id ).mouseup( function( event ){ self.endDrag( ); }); 
            $( '#' + id ).mousemove( function( event ){ self.drag( event ); }); 
            // done ui events object
            
        // DONE FUNCTION: addDragEvents( void ) void
        };            
        self.addJumpEvents = function( ) {
        // FUNCTION: addJumpEvents( void ) void
        
            var id = 'dividerJumpButtonTop';
            $( '#' + id ).mouseout( function( event ){ self.jumpButtonDeSelect( ); }); 
            $( '#' + id ).mouseover( function( event ){ self.jumpButtonSelect( ); }); 
            $( '#' + id ).mousedown( function( event ){ self.jump( event ); }); 
            var id = 'dividerJumpButtonBottom';
            $( '#' + id ).mouseout( function( event ){ self.jumpButtonDeSelect( ); }); 
            $( '#' + id ).mouseover( function( event ){ self.jumpButtonSelect( ); }); 
            $( '#' + id ).mousedown( function( event ){ self.jump( event ); }); 
            
        // DONE FUNCTION: addJumpEvents( void ) void
        };            
        self.addButtonEvents = function() {
        // FUNCTION: addButtonEvents( void ) void
        
            var id = self.dividerOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.select( this ); }); 
            $( '#' + id ).mouseout( function( event ){ self.deSelect( this ); }); 
            $( '#' + id ).mousedown( function( event ){ self.startDrag( event ); }); 
            
        // DONE FUNCTION: addButtonEvents( void ) void
        };            
        self.addTabStop = function() {
        // FUNCTION: addTabStop( void ) void
            
        // DONE FUNCTION: addTabStop( void ) void
        };        
        self.jumpButtonSelect = function( ){
        // FUNCTION: jumpButtonSelect( void ) void
        
            self.debug( ' jump select' );
            // mouse over -> background color highlight
            $( '#dividerJumpButtonTop' ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#dividerJumpButtonBottom' ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            
        // DONE FUNCTION: jumpButtonSelect( void ) void
        };
        self.jumpButtonDeSelect = function( ){
        // FUNCTION: jumpButtonDeSelect( void ) void
        
            self.debug( ' jump deselects' );

            // mouse out -> background color default
            $( '#dividerJumpButtonTop' ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#dividerJumpButtonBottom' ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            
        // DONE FUNCTION: jumpButtonDeSelect( void ) void
        };
        self.jump = function( event ){
        // FUNCTION: jump( event: event ) void
        
            self.debug( ' jump ' );
            // stop propagation 
            if( event && event.stopPropagation ){
                event.stopPropagation();
            }
            // done stop propagation 
            
            // get current position
            var currentPosition = jsProject.getValue( 'position', 'divider' );
            var newPosition = 0;
            
            // current position = minmium position
            if( currentPosition <= sharesoft.getSetting( 'dividerMinimumPosition' ) ){
                newPosition = self.dividerJumpButtonOptions['jumpPosition'];
                // done current position = minmium position
            }
            else {
                // current position > minimum    
                self.dividerJumpButtonOptions['jumpPosition'] = currentPosition;
                newPosition = sharesoft.getSetting( 'dividerMinimumPosition' );
                // done current position > minimum    
            }
            self.debug( newPosition );
            // set position
            jsProject.setValue( 'position', 'divider',  newPosition );
            // call sceneChange event
            jsProject.callEvent( 'sceneChange' );
            
        // DONE FUNCTION: jump( event: event ) void
        };
        self.select = function( element ){
        // FUNCTION: select( html element ) void
        
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            
        // DONE FUNCTION: select( html element ) void
        };
        self.deSelect = function( element ){
        // FUNCTION: deSelect( html element ) void
        
            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            
            
        // DONE FUNCTION: deSelect( html element ) void
        };
        self.startDrag = function( event ){
        // FUNCTION: startDrag( event: event ) void
        
            // debug info
            self.debug( 'startDrag' );
            
            // remember dragging
            self.dragging = true;
            
            // show drag area
            $( '#' + self.dragAreaOptions['id'] ).show();
            
            // set last position
            self.lastMousePosition['x'] = event.pageX;
            
        // DONE FUNCTION: startDrag( event: event ) void
        };
        self.endDrag = function( ){
        // FUNCTION: endDrag( void ) void
        
            // debug info
            self.debug( 'endDrag' );
            
            // remember dragging
            self.dragging = false;

            // hide drag area
            $( '#' + self.dragAreaOptions['id'] ).hide();
            
            // set didvider position value
            sharesoft.setOption( 'dividerPosition',  jsProject.getValue( 'position', 'divider' ) );

        // DONE FUNCTION: endDrag( void ) void
        };
        self.drag = function( event ){
        // FUNCTION: drag( event: event ) void
            
            // calculate change
            var change = event.pageX - self.lastMousePosition['x'];
            // set last position
            self.lastMousePosition['x'] = event.pageX;
           
            // get current position
            var currentPosition = jsProject.getValue( 'position', 'divider' );
            // calculate new position
            var newPosition = currentPosition + change;
            if( newPosition < sharesoft.getSetting( 'dividerMinimumPosition' ) ){
                newPosition = sharesoft.getSetting( 'dividerMinimumPosition' );
            }
            // done calculate new position
            
            // set position
            jsProject.setValue( 'position', 'divider',  newPosition );
            // call sceneChange event
            jsProject.callEvent( 'sceneChange' );
            
        // DONE FUNCTION: drag( event: event ) void
        };
        self.moveLeft = function( ){
        // FUNCTION: moveLeft( void ) void
        
            // remove timer
            if( self.moveOptions['timer'] !== null ) {
                clearTimeout( self.moveOptions['timer'] );
                self.moveOptions['timer'] = null;
            }
            // done remove timer

            // get current position
            var currentPosition = jsProject.getValue( 'position', 'divider' );
            // calculate new position
            var newPosition = currentPosition - self.moveOptions['change'];
            if( newPosition < sharesoft.getSetting( 'dividerMinimumPosition' ) ){
                newPosition = sharesoft.getSetting( 'dividerMinimumPosition' );
            }
            // done calculate new position
            // set position
            jsProject.setValue( 'position', 'divider',  newPosition );
            
            // create timer
            self.moveOptions['timer'] = setTimeout( function () { self.moveLeft(); }, self.moveOptions['delay'] );

            // call sceneChange event
            jsProject.callEvent( 'sceneChange' );
            
        // DONE FUNCTION: moveLeft( void ) void
        };
        self.moveRight = function( ){
        // FUNCTION: moveRight( void ) void
        
            // remove timer
            if( self.moveOptions['timer'] !== null ) {
                clearTimeout( self.moveOptions['timer'] );
                self.moveOptions['timer'] = null;
            }
            // done remove timer
            
            // get current position
            var currentPosition = jsProject.getValue( 'position', 'divider' );
            // calculate new position
            var newPosition = currentPosition + self.moveOptions['change'];
            if( newPosition < $( '#layout').width() - self.moveOptions['minimumOffsetRight'] ){
                newPosition = $( '#layout').width() - self.moveOptions['minimumOffsetRight'];
            }
            // done calculate new position
            // set position
            jsProject.setValue( 'position', 'divider',  newPosition );
            
            // create timer
            self.moveOptions['timer'] = setTimeout( function () { self.moveRight(); }, self.moveOptions['delay'] );

            // call sceneChange event
            jsProject.callEvent( 'sceneChange' );
            
        // DONE FUNCTION: moveRight( void ) void
        };
        self.endMove = function(){
        // FUNCTION: endMove( void ) void
        
            // remove timer
            if( self.moveOptions['timer'] !== null ) {
                clearTimeout( self.moveOptions['timer'] );
                self.moveOptions['timer'] = null;
            }
            // done remove timer
            
        // DONE FUNCTION: endMove( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            var top = 0, left = 0, width = 0, height = 0;
            
            // get the divider position
            var dividerPosition = jsProject.getValue( 'position', 'divider' );
            
            // calculate height
            var height = $( '#layout' ).height();
            height -= $( '#topLeft' ).outerHeight();
            height -= $( '#bottomRow' ).outerHeight();
            // done calculate height
            
            //  set divider layout
            $( '#' + self.dividerOptions['id'] ).css( 'top', $( '#topLeft' ).outerHeight() + 'px' );
            $( '#' + self.dividerOptions['id'] ).css( 'left', dividerPosition + 'px' );
            $( '#' + self.dividerOptions['id'] ).height( height );
            //  done set divider layout

            top = $( '#topLeft' ).outerHeight();
            left = dividerPosition - self.dragAreaOptions['offset'];
            width = $( '#' + self.dividerOptions['id'] ).width();
            width += 2 * self.dragAreaOptions['offset'];
            height = $( '#' + self.dividerOptions['id'] ).height();
                    
            //  set drag area layout
            $( '#' + self.dragAreaOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dragAreaOptions['id'] ).css( 'left', left + 'px' );
            $( '#' + self.dragAreaOptions['id'] ).height( height );
            $( '#' + self.dragAreaOptions['id'] ).width( width );
            //  done set drag area layout
            
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
    // DONE MODULE: dividerModule( void ) void 
})( sharesoft );
// done create module function
