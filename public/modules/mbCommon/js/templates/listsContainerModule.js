/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listsContainerModule.js
 * 
 *  Last revision: 01-01-2017
 * 
 *  Purpose: 
 *       this module creates a container for the lists on the left side
 *       of the screen of the application pleisterman.
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

    // MODULE: listsContainerModule( void ) void 
    
    pleisterman.listsContainerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'listsContainerModule';                       // string:  MODULE
        self.debugOn = false;                                       // boolean: debug
        self.parentDivId = 'left';                                  // string: parent element id 
        self.containerOptions = {                                   // json: continer options
            'id'                    :   'listsContainer',           // string: element id
            'element'               :   'div',                      // string: html element type 
            'overflowX'             :   'hidden',                   // css overflow-x
            'overflowY'             :   'auto',                     // css overflow-y
            'position'              :   'absolute',                 // css position
            'backgroundColor'       :   'transparent',              // css color: background color
            'minimumWidth'          :   '20.0em'                    // css minimum width
        };                                                          // done json: continer options
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
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // add container
            $( '#' + self.parentDivId ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // subscribe to order up
            jsProject.subscribeToEvent( 'listOrderUp', self.listOrderUp );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // set dimensions for listcontainer
            $( '#' + self.containerOptions['id'] ).width( $( '#layout' ).width() );
            $( '#' + self.containerOptions['id'] ).height( $( '#' + self.parentDivId ).height() );
            // done set dimensions for listcontainer

            // call event to set layout of lists
            jsProject.callEvent( 'listsContainerLayoutChange' );
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.listOrderUp = function( listId ) {
        // FUNCTION: listOrderUp( string: listId ) void
            
            // get current order
            var listOrder = pleisterman.options['listOrder']['value'].split( ',' );
            // get container html element 
            var listsContainer = document.getElementById( "listsContainer" );
            // get the list html element
            var list = document.getElementById( 'list' + listId );
            // move the list to buffer
            var buffer = listsContainer.removeChild( list ); 
            // get list id of the list previous to the moving list
            var beforeListId = listOrder[listOrder.indexOf( listId ) - 1];
            // get the html element of yhe list previous to the moving list
            var beforeList = document.getElementById( 'list' + beforeListId );
            // insert the buffer before the previous list
            listsContainer.insertBefore( buffer, beforeList ); 

            // reorder the listOrder array    
            var index = listOrder.indexOf( listId );
            var list = listOrder.splice( index, 1 );
            listOrder.splice( index - 1, 0, list  );
            // done reorder the listOrder array    
            
            // set the option
            pleisterman.setOption( 'listOrder', listOrder.join() );
            
            // call the event to set the list order buttons of the lists
            jsProject.callEvent( 'showListOrder' );
            
        // DONE FUNCTION: listOrderUp( string: listId ) void
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
    // DONE MODULE: listsContainerModule( void ) void 
})( pleisterman );
// done create module function
