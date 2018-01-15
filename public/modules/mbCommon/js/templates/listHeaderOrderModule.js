/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listHeaderNewModule.js
 * 
 *  Last revision: 04-01-2017
 * 
 *  Purpose: 
 *          this module creates the list up buttons for the listHeaders
 *          of the application pleisterman
 *          the module displays a button or an image depending on
 *          the position of the list
 *          the first list cannot move up so an image is dispayed
 *          for the other lists an up button is displayed
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

    // MODULE: listHeaderOrderModule( string: id ) void 
    
    pleisterman.listHeaderOrderModule = function( id ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listHeaderOrderModule';                          // string: MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.id = id;                                                   // string: element id
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image dir
        self.parentOptions = {                                          // json: parent options
            'id'                    :   'listHeader' + self.id          // string: element id
        };                                                              // done json: parent options
        self.buttonOptions = {                                          // json button options
            'id'                    :   'listUpButton' + self.id,       // string: element id
            'element'               :   'div',                          // string: html element type 
            'verticalAlign'         :   'middle',                       // css vertical align
            'marginTop'             :   '0.1em',                        // css margin top
            'marginLeft'            :   '0.3em',                        // css margin left
            'styleWidth'            :   '1.8em',                        // css style width
            'styleHeight'           :   '1.8em',                        // css style height
            'backgroundSize'        :   '1.8em 1.8em',                  // css background size
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'backgroundPosition'    :   'center center',                // css background position
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width 
            'borderStyle'           :   'solid',                        // css border style 
            'selected'              :   false                           // boolean: selected
        };                                                              // done json: button options
        self.order = 0;                                                 // integer: order
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: listOrder: ' + self.id );
            
            // calculate order the list
            var listOrder = pleisterman.options['listOrder']['value'].split( ',' );
            if( listOrder.length > 0 && self.id !== listOrder[0] ){
                self.order = listOrder.indexOf( self.id );
            }
            // done calculate the list
            
            // add the header html
            self.addHtml();

            // add the events
            self.addEvents();
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to order up
            jsProject.subscribeToEvent( 'showListOrder', self.showListOrder );
            // subscribe update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // is visible
            if( pleisterman.options['showListOrder']['value'] === 'true' ){
                self.buttonOptions['display'] = 'inline-block;';
            }
            else {
                self.buttonOptions['display'] = 'none;';
            }
            // done is visible
            
            // is first
            if( self.order <= 0 ){
                self.buttonOptions['imageUrl'] = 'url(' + self.imageUrl + 'listUpFirst.png' + ')';
                self.buttonOptions['cursor'] = 'default';
                self.buttonOptions['title'] = '';
            }
            else {
                self.buttonOptions['imageUrl'] = 'url(' + self.imageUrl + 'listUp.png' + ')';
                self.buttonOptions['cursor'] = 'pointer';
                self.buttonOptions['title'] = pleisterman.translations[self.id + 'listUp'];
            }
            // done is first
            
            // add to listHeader
            $( '#' + self.parentOptions['id'] ).prepend( jsProject.jsonToElementHtml( self.buttonOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            var id = self.buttonOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.mouseIn( this ); }); 
            $( '#' + id ).mouseout( function( event ){ self.mouseOut( this ); }); 
            $( '#' + id ).click( function( event ){ self.click( event, this ); }); 

        // DONE FUNCTION: addEvents( void ) void
        };
        self.mouseIn = function( element ){
        // FUNCTION: mouseIn( html element: element ) void
            
            // first list no action
            if( self.order === 0 ){
                return;
            }            
            // done first list no action
            
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + element.id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );

        // DONE FUNCTION: mouseIn( html element: element ) void
        };
        self.mouseOut = function( element ){
        // FUNCTION: mouseOut( void ) void
            
            // first list no action
            if( self.order === 0 ){
                return;
            }            
            // done first list no action
            
            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', pleisterman.colors['buttonColor']['color'] );

        // DONE FUNCTION: mouseOut( void ) void
        };
        self.click = function( event, element ){
        // FUNCTION: click( void ) void
            
            event.stopPropagation();
            // debug info
            self.debug( 'listUp' );
            
            // first list no action
            if( self.order === 0 ){
                return;
            }            
            // done first list no action
            
            // call the event
            jsProject.callEvent( 'listOrderUp', self.id );

        // DONE FUNCTION: click( void ) void
        };
        self.showListOrder = function(){
        // FUNCTION: showListOrder( void ) void
            
            // order visible
            if( pleisterman.options['showListOrder']['value'] === 'true' ){
                // calculate order the list
                var listOrder = pleisterman.options['listOrder']['value'].split( ',' );
                if( listOrder.length > 0 ){
                    self.order = listOrder.indexOf( self.id );
                }
                // done calculate the list
    
                // first list
                if( self.order === 0 ){
                    // first list display first image
                    $( '#' + self.buttonOptions['id'] ).css( 'background-image', 'url(' + self.imageUrl + 'listUpFirst.png' + ')' );                    
                    $( '#' + self.buttonOptions['id'] ).css( 'cursor', 'default' );
                    // mouse out -> background color default
                    $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                    // mouse out -> color default
                    $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
                }
                else {
                    // display the list up image
                    $( '#' + self.buttonOptions['id'] ).css( 'background-image', 'url(' + self.imageUrl + 'listUp.png' + ')' );
                    $( '#' + self.buttonOptions['id'] ).css( 'cursor', 'pointer' );
                }
                // set diaplay inline
                $( '#' + self.buttonOptions['id'] ).css( 'display', 'inline-block' );
            }
            // done order visible
            // order not visible
            else {
                // hide the button
                $( '#' + self.buttonOptions['id'] ).css( 'display', 'none' );
            }
            // done order not visible

        // DONE FUNCTION: showListOrder( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );

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
            // FUNCTION: canbeSelected( void ) boolean
            canbeSelected   :   function(){
                // call internal canbeSelected
                return self.canbeSelected();
            },
            // FUNCTION: setSelected( string: selected ) void
            setSelected    :   function( selected ){
                // call internal setSelected
                self.setSelected( selected );
            },
            // FUNCTION: click( void ) void
            click           : function(){
                // call internal click
                self.click();
            }    
        };
        // DONE PUBLIC
    };
    // DONE MODULE: listHeaderOrderModule( string: id ) void 
})( pleisterman );
// done create module function
