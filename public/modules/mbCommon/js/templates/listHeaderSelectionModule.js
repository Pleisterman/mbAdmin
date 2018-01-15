/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listHeaderSelectionModule.js
 * 
 *  Last revision: 04-01-2017
 * 
 *  Purpose: 
 *          this module creates the list open selections button for the listHeaders
 *          the module displays a button 
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

    // MODULE: listHeaderSelectionModule( string: id, function: callback ) void 
    
    pleisterman.listHeaderSelectionModule = function( id, callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listHeaderSelectionModule';                      // string: MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.id = id;                                                   // string: element id
        self.callback = callback;                                       // function: callback
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image dir
        self.parentOptions = {                                          // json: parent options
            'id'                    :   'listHeader' + self.id          // string: element id
        };                                                              // done json: parent options
        self.buttonOptions = {                                          // json button options
            'id'                    :   'openSelectionsButton' + self.id,   // string: element id   
            'title'                 :   pleisterman.translations[self.id + 'OpenSelections'], // string: title
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
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
            'cursor'                :   'pointer',                      // css cursor            
            'imageUrl'              :   'url(' + self.imageUrl + 'listSelections.png' + ')', // string: image file name
            'selected'              :   false                           // boolean: selected
        };                                                              // done json: button options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: listOrder: ' + self.id );
            
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
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add to listHeader
            $( '#' + self.parentOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

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
        self.mouseIn = function( ){
        // FUNCTION: mouseIn( html element: element ) void
            
            // mouse over -> background color highlight
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );

        // DONE FUNCTION: mouseIn( html element: element ) void
        };
        self.mouseOut = function( ){
        // FUNCTION: mouseOut( void ) void
            
            // selected
            if( self.buttonOptions['selected'] ){
                return;
            }
            // done selected
            
            // mouse out -> background color default
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );

        // DONE FUNCTION: mouseOut( void ) void
        };
        self.click = function( event, element ){
        // FUNCTION: click( void ) void
            
            event.stopPropagation();
            // debug info
            self.debug( 'click' );
            // call the callback
            self.callback( self.buttonOptions['id'] );

        // DONE FUNCTION: click( void ) void
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
    // DONE MODULE: listHeaderSelectionModule( string: id, function: callback ) void 
})( pleisterman );
// done create module function
