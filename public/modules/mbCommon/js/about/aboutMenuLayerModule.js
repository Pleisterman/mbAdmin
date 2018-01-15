/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/about/aboutMenuLayerModule.js
 *  
 *  Purpose: 
 *      this module controls the test data in options
 * 
 *  Last Revision:  04-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Purpose:  
 *          this module creates 
 *          a menu layer 
 *          an about menu in this layer
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( sharesoft ){

    // MODULE: aboutMenuLayerModule( string: menuButtonId ) void
    
    sharesoft.aboutMenuLayerModule = function( menuButtonId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                        // object: self
        self.MODULE = 'aboutMenuLayerModule';                   // string: MODULE
        self.debugOn = false;                                   // boolean: debug on
        self.menuButtonId = menuButtonId;                       // string: menu button element id
        self.infoModule = null;                                 // module: info module
        self.helpModule = null;                                 // module: help module
        self.menuItems = {                                      // json: menu items
            'info' : {},                                        // json: info
            'help' : {}                                         // json: help        
        };                                                      // done json: menu items
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );     // string: image dir
        self.layerOptions = {                                   // json: layer options
            'id'                    :   self.MODULE + 'Layer',  // string: element id
            'element'               :   'div',                  // string: html element type 
            'position'              :   'absolute',             // css position
            'visible'               :   false,                  // boolean: visible
            'display'               :   'none',                 // css display
            'top'                   :   0,                      // css top
            'left'                  :   0,                      // css left
            'styleHeight'           :   '100%',                 // css style height
            'styleWidth'            :   '100%',                 // css style width
            'backgroundColor'       :   sharesoft.colors['overlayBackgroundColor']['color'], // css color: bakground color
            'zIndex'                :   sharesoft.getSetting( 'zIndexMenus' ).toString()     // css z-index   
        };                                                      // done json: layer options
         self.menuOptions = {                                    // json: menu options
            'id'                    :   self.MODULE + 'Menu',   // string: element id
             'element'               :   'div',                  // string: html element type 
            'position'              :   'absolute',             // css position
            'maximumHeight'         :   '15.0em',               // css minimum height
            'topOffset'             :   4,                      // integer: top offset
            'overflowX'             :   'visible',              // css overflow-x
            'overflowY'             :   'auto',                 // css overflow-y
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'],  // css color: bakground color
            'padding'               :   sharesoft.getSetting( 'topMenuPadding' ),           // css pdding
            'border'                :   true,                   // boolean: had border
            'borderWidth'           :   sharesoft.getSetting( 'topMenuBorderWidth' ),       // css border width
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],      // css border color
            'borderStyle'           :   sharesoft.getSetting( 'topMenuBorderStyle' ),       // css border style
            'borderRadius'          :   sharesoft.getSetting( 'topMenuBorderRadius' ),      // css border radius
            'zIndex'                :   sharesoft.getSetting( 'zIndexMenus' ).toString(),   // css z-index
            'eventLayer'            :   'mainOverlay'           // string event layer id
        };                                                      // done json: menu options
        self.menuItemCount = 0;                                 // integer: menu item count          
        self.selectedItemId = null;                             // string:  selected item id
        self.selectedItem = null;                               // string: selected index
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add menu to document
            $( document.body ).append( jsProject.jsonToElementHtml( self.layerOptions ) );

            // add menu to layer
            $( '#' + self.layerOptions['id'] ).append( jsProject.jsonToElementHtml( self.menuOptions ) );

            // add the menu items
            self.addMenuItems();
             
            // add info module
            self.infoModule = new sharesoft.infoModule();
             
            // add help module
            self.helpModule = new sharesoft.helpModule();

            // add the events
            self.addEvents();

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addMenuItems = function(){
        // FUNCTION: addMenuItems( void ) void
            
            var i = 0;
            var text = '';
            // loop over items
            $.each( self.menuItems, function( index, value ) {
                // switch index
                switch ( index ){
                    case 'info' : {
                        // set text
                        text = sharesoft.translations['info'];
                        // create menu item module
                        value['menuItem'] = new sharesoft.menuItemModule( index, index, text, self.menuOptions['id'] );
                        
                        // done
                        break;
                    }
                    case 'help' : {
                        // set text
                        text = sharesoft.translations['help'];
                        // create menu item module
                        value['menuItem'] = new sharesoft.menuItemModule( index, index, text, self.menuOptions['id'] );
                        
                        // done
                        break;
                    }
                    default : {
                        self.debug( 'error unknown menu item id: ' + index );
                    }
                }
                // done switch index
                
                i++;
            });
            // done loop over items
            
            // set item count
            self.menuItemCount += i;
            
        // DONE FUNCTION: addMenuItems( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // debug info
            self.debug( 'addEvents' );
            
            // add layer event
            $( '#' + self.layerOptions['id'] ).click( function( event ){ self.layerClick( ); }); 
            
            // add item events
            self.addItemEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.layerClick = function( ){
        // FUNCTION: layerClick( void ) void
            
            // hide menu
            self.hide();
            
        // DONE FUNCTION: layerClick( void ) void
        };
        self.addItemEvents = function(){
        // FUNCTION: addItemEvents( void ) void
            
            // loop over items
            $.each( self.menuItems, function( index, item ) {
                
                // get id
                var menuItemId = self.menuItems[index]['menuItem'].getId();
                
                // add events
                $( '#' + menuItemId ).mouseover( function( event ){ self.itemMouseIn( this ); }); 
                $( '#' + menuItemId ).mouseout( function( event ){ self.itemMouseOut( this ); }); 
                $( '#' + menuItemId ).click( function( event ){ self.itemClick( event, this ); }); 
                // done add events
                
            });
            // done loop over items
            
        // DONE FUNCTION: addItemEvents( void ) void
        };
        self.itemMouseIn = function( element ){
        // FUNCTION: itemMouseIn( html element: element ) void
            
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: itemMouseIn( html element: element ) void
        };
        self.itemMouseOut = function( element ){
        // FUNCTION: itemMouseOut( html element: element ) void
            
            // check if selected item is current element
            if( self.selectedItemId === element.id ){
                // done keep selected
                return;
            }
            // done check if selected item is current element
            
            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: itemMouseOut( html element: element ) void
        };
        self.itemSelect = function( id ){
        // FUNCTION: itemSelect( string: element id ) void
            
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> background color highlight
            $( '#' + id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: itemSelect( string: element id ) void
        };
        self.itemDeSelect = function( id ){
        // FUNCTION: itemDeSelect( string: element id ) void
            
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // mouse over -> background color highlight
            $( '#' + id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: itemDeSelect( string: element id ) void
        };
        self.itemClick = function( event, element ){
        // FUNCTION: itemClick( event: event, html element: element ) void
            
            // stop propagation
            event.stopPropagation();
            // debug info
            self.debug( 'itemClick id: ' + element.id );

            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            
            // get the id
            self.itemPress( element.id );
            
        // DONE FUNCTION: itemClick( event: event, html element: element ) void
        };
        self.itemPress = function( id ){
        // FUNCTION: itemPress( string: element id ) void
            
            // get item id
            var idArray = id.split( '_' );
            var itemId = idArray[idArray.length - 1];
            // get item id
            
            // check itemId
            switch( itemId ){
                case 'info' : {
                    // hide menu
                    self.hide();
                    // show info
                    self.infoModule.show();    
                    // done
                    break;
                } 
                case 'help' : {
                    // hide menu
                    self.hide();
                    // show info
                    self.helpModule.show();    
                    // done
                    break;
                } 
                default : {
                    // debug info    
                    self.debug( 'error unknown menu id: ' + id );
                }
            }
            // done check itemId
            
        // DONE FUNCTION: itemPress( string: element id ) void
        };
        // done menu item events
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // loop over items
            $.each( self.menuItems, function( index, item ) {
                
                // get id
                var menuItemId = item['menuItem'].getId();

                // cretae tabstop options
                var tabStopOptions = {
                    'id'        :   menuItemId,
                    'layer'     :   'overlay',
                    'select'    :   self.itemSelect,
                    'deSelect'  :   self.itemDeSelect,
                    'keys'      :   [
                        {
                            'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                            'type'      :   'tabStop',
                            'function'  :   self.itemPress
                        },
                        {
                            'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['escape'],
                            'type'      :   'tabStop',
                            'function'  :   self.hide
                        }
                    ]
                };
                // done cretae tabstop options
                
                // add tabstop
                jsProject.callEvent( 'registerTabStop', tabStopOptions );
                
            });
            // done loop over items
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'overlay' );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.removeTabStops = function(){
        // FUNCTION: removeTabStops( void ) void
            
            // remove tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'overlay' );
            
        // DONE FUNCTION: removeTabStops( void ) void
        };
        self.layoutChange = function(){
        // FUNCTION: layoutChange( void ) void
            
            // visible
            if( !self.layerOptions['visible'] ){
                return;
            }       
            // done visible

            // set position of options menu
            var position = jsProject.getElementPosition( self.menuButtonId );
            position.top += $( '#' + self.menuButtonId ).outerHeight();
            position.top += self.menuOptions['topOffset'];
            position.left += ( $( '#' + self.menuButtonId ).outerWidth() / 4 ) * 1;
            $( '#' + self.menuOptions['id'] ).css( 'top', position['top'] + 'px' );
            $( '#' + self.menuOptions['id'] ).css( 'left', position['left'] + 'px' );
            // done set position of options menu
            
            // done layout
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.toggle = function(){
        // FUNCTION: toggle( void ) void
            
            // debug info
            self.debug( 'toggle' );
            
            // visible
            if( self.layerOptions['visible'] ){
                self.hide();
            }
            else {
                self.show();
            }
            // done visible
            
        // DONE FUNCTION: toggle( void ) void
        };
        self.show = function(){
        // FUNCTION: show( void ) void
            
            // remember visibility 
            self.layerOptions['visible'] = true;
            // refresh layout
            self.layoutChange();
            // add tabstops
            self.addTabStops();
            // show the layer
            $( '#' + self.layerOptions['id'] ).show( 300 );
            
        // DONE FUNCTION: show( void ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // remember visibility 
            self.layerOptions['visible'] = false;
  
            // reset items colors
            $.each( self.menuItems, function( index, value ) {
                var id = self.menuItems[index]['menuItem'].getId();
                $( '#' + id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
                $( '#' + id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            });  
            // done reset items colors
            
            // remove tabstops
            self.removeTabStops();

            // hide layer 
            $( '#' + self.layerOptions['id'] ).hide( 300 );
            
        // DONE FUNCTION: hide( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update menu colors
            self.menuOptions['backgroundColor'] = sharesoft.colors['panelBackgroundColor']['color'];
            $( '#' + self.menuOptions['id'] ).css( 'background-color', sharesoft.colors['panelBackgroundColor']['color'] );
            self.menuOptions['borderColor'] = sharesoft.colors['panelBorderColor']['color'];
            $( '#' + self.menuOptions['id'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            // done update menu colors

            // loop over items
            $.each( self.menuItems, function( index, item ) {
                // get id
                var menuItemId = self.menuItems[index]['menuItem'].getId();
                // set colors
                $( '#' + menuItemId ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
                $( '#' + menuItemId ).css( 'color', sharesoft.colors['buttonColor']['color'] );
                // done set colors
            });
            // done loop over items
            
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
            // FUNCTION: toggle( void ) void
            toggle : function(){
                // call internal
                self.toggle();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: aboutMenuLayerModule( string: menuButtonId ) void 
})( sharesoft );
// done create module function
