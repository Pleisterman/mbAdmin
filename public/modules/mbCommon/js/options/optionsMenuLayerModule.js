/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/options/optionsMenuLayerModule.js
 *  
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *      this module controls the test data in options
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Purpose:  
 *          this module creates 
 *          a menu layer 
 *          an options menu in this layer
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( pleisterman ){

    // MODULE: optionsMenuLayerModule( string: menuButtonId ) void
    
    pleisterman.optionsMenuLayerModule = function( menuButtonId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                        // object: self
        self.MODULE = 'optionsMenuLayerModule';                 // string: MODULE
        self.debugOn = false;                                   // boolean: debug
        self.menuButtonId = menuButtonId;                       // string: menu button element id
        self.fontModule = null;                                 // module: fontModule
        self.colorsModule = null;                               // module: colorsModule
        self.testModule = null;                                 // module: testModule
        self.menuItems = {                                      // json: menu items
            'listOrder' : {},                                   // json: listOrder
            'font'      : {},                                   // json: font
            'colors'    : {},                                   // json: colors
            'dataTest'  : {}                                    // json: dataTest
        };                                                      // done json: menu items
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );     // string: image dir
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
            'backgroundColor'       :   pleisterman.colors['overlayBackgroundColor']['color'], // css color: bakground color
            'zIndex'                :   pleisterman.getSetting( 'zIndexMenus' ).toString()     // css z-index   
        };                                                      // done json: layer options
        self.menuOptions = {                                    // json: menu options
            'id'                    :   self.MODULE + 'Menu',   // string: element id
            'element'               :   'div',                  // string: html element type 
            'position'              :   'absolute',             // css position
            'maximumHeight'         :   '15.0em',               // css minimum height
            'topOffset'             :   4,                      // integer: top offset
            'overflowX'             :   'visible',              // css overflow-x
            'overflowY'             :   'auto',                 // css overflow-y
            'backgroundColor'       :   pleisterman.colors['panelBackgroundColor']['color'],  // css color: bakground color
            'padding'               :   pleisterman.getSetting( 'topMenuPadding' ),           // css pdding
            'border'                :   true,                   // boolean: had border
            'borderWidth'           :   pleisterman.getSetting( 'topMenuBorderWidth' ),       // css border width
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],      // css border color
            'borderStyle'           :   pleisterman.getSetting( 'topMenuBorderStyle' ),       // css border style
            'borderRadius'          :   pleisterman.getSetting( 'topMenuBorderRadius' ),      // css border radius
            'zIndex'                :   pleisterman.getSetting( 'zIndexMenus' ).toString(),   // css z-index
            'eventLayer'            :   'mainOverlay'           // string event layer id
        };                                                      // done json: menu options
        self.languageSeparatorOptions = {                       // json: language separator options    
            'element'               :   'span',                 // string: html element type 
            'text'                  :   pleisterman.translations['language'] + ':', // string: text
            'display'               :   'block',                // css display
            'textAlign'             :   'left',                 // css text align
            'backgroundColor'       :   'transparent',          // css color: background color
            'color'                 :   pleisterman.colors['panelColor']['color'],            // css color: color
            'fontSize'              :   pleisterman.getSetting( 'menuItemFontSize' ),         // css font size
            'fontWeight'            :   pleisterman.getSetting( 'menuItemFontWeight' ),       // css font weight
            'paddingTop'            :   '0.4em',                // css padding top
            'marginLeft'            :   '2.0em',                // css margin left
            'marginRight'           :   '0.2em',                // css margin right
            'marginBottom'          :   '0.6em'                 // css margin bottom
        };                                                      // done json: language separator options
        self.languageOptions = {                                // json: language options
            'extraPaddingLeft'      :   20                      // integer: extra padding left    
        };                                                      // done json: language options
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
            
            // add the language items
            self.addMenuLanguageItems();
            
            // add modules
            self.colorsModule = new pleisterman.colorsModule();
            // done add modules
            
            // add modules
            self.fontModule = new pleisterman.fontModule();
            // done add modules
            
            // add modules
            self.testModule = new pleisterman.testModule();
            // done add modules
             
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
                    case 'listOrder' : {
                        // list order visible    
                        if( pleisterman.options['showListOrder']['value'] === 'true' ){
                            // set text
                            text = pleisterman.translations['hideListOrder'];
                            // create menu item
                            value['menuItem'] = new pleisterman.menuItemModule( index, index, text, self.menuOptions['id'] );
                        }   
                        else {
                            // set text
                            text = pleisterman.translations['showListOrder'];
                            // create menu item module
                            value['menuItem'] = new pleisterman.menuItemModule( index, index, text, self.menuOptions['id'] );
                        }
                        // done list order visible    
                        
                        // done
                        break;
                    }
                    case 'font' : {
                        // set text
                        text = pleisterman.translations['font'];
                        // create menu item module
                        value['menuItem'] = new pleisterman.menuItemModule( index, index, text, self.menuOptions['id'] );
                        
                        // done
                        break;
                    }
                    case 'colors' : {
                        // set text
                        text = pleisterman.translations['colors'];
                        // create menu item module
                        value['menuItem'] = new pleisterman.menuItemModule( index, index, text, self.menuOptions['id'] );
                        
                        // done
                        break;
                    }
                    case 'dataTest' : {
                        // set text
                        text = 'test';
                        // create menu item module
                        value['menuItem'] = new pleisterman.menuItemModule( index, index, text, self.menuOptions['id'] );
                        
                        // done
                        break;
                    }
                    default : {
                        // debug info    
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
        self.addMenuLanguageItems = function(){
        // FUNCTION: addMenuLanguageItems( void ) void
            
            // add the separator to the menu
            $( '#' + self.menuOptions['id'] ).append( jsProject.jsonToElementHtml( self.languageSeparatorOptions ) );
            
            // loop over languages
            var i = 0;
            $.each( pleisterman.languages, function( index, language ) {
                // not selected language
                if( parseInt( language['id'] ) !== parseInt( pleisterman.selectedLanguageId ) ){
                    // set id
                    var id = language['id'] + '_language';
                    // create text
                    var text = language['name'];
                    // create menu item object
                    self.menuItems[id] = {}; 
                        // create menu item module
                    self.menuItems[id]['menuItem'] = new pleisterman.menuItemModule( id, language['id'], text, self.menuOptions['id'] );
                    i++;
                }
                // done not selected language
            });                       
            // loop over languages

            // add item count
            self.menuItemCount += i;
            
        // DONE FUNCTION: addMenuLanguageItems( void ) void
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
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
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
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: itemMouseOut( html element: element ) void
        };
        self.itemSelect = function( id ){
        // FUNCTION: itemSelect( string: element id ) void
            
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> background color highlight
            $( '#' + id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: itemSelect( string: element id ) void
        };
        self.itemDeSelect = function( id ){
        // FUNCTION: itemDeSelect( string: element id ) void
            
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse over -> background color highlight
            $( '#' + id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: itemDeSelect( string: element id ) void
        };
        self.itemClick = function( event, element ){
        // FUNCTION: itemClick( event: event, html element: element ) void
            
            // stop propagation
            event.stopPropagation();
            // debug info
            self.debug( 'itemClick id: ' + element.id );

            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
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
                case 'language' : {
                    // change language
                    self.changeLanguage( $( '#' + id ).attr( 'data-value' ) );
                    // done
                    break;
                }
                case 'listOrder' : {
                    // hide menu
                    self.hide();
                    // list order click    
                    self.listOrderClick();    
                    // done
                    break;
                } 
                case 'font' : {
                    // hide menu
                    self.hide();
                    // show font data    
                    self.fontModule.show();    
                    // done
                    break;
                } 
                case 'colors' : {
                    // hide menu
                    self.hide();
                    // show color data    
                    self.colorsModule.show();    
                    // done
                    break;
                } 
                case 'dataTest' : {
                    // hide menu
                    self.hide();
                    // show test data    
                    self.testModule.show();    
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
        self.changeLanguage = function( languageId ){
        // FUNCTION: changeLanguage( string: language id ) void
            
            // construct data object
            var values = { 'value' : languageId };
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'options',
                'name'              :   'languageId',
                'values'            :   values 
            };
            // done construct data object
            
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.changeLanguageCallback );
            
            
        // DONE FUNCTION: changeLanguage( string: language id ) void
        };
        self.changeLanguageCallback = function( result ){
        // FUNCTION: changeLanguageCallback( json: result ) void
            
            // check critical errors
            if( result['criticalError'] ){
                pleisterman.showCriticalError( result['criticalError'] );
                return;
            }
            // done check critical errors
            
            // reopen 
            window.location.replace( '/' + pleisterman.baseDirectory + '/' + pleisterman.workDirectory );
            
        // DONE FUNCTION: changeLanguageCallback( json: result ) void
        };;
        self.listOrderClick = function(){
        // FUNCTION: listOrderClick( void ) void
            
            // debug info
            self.debug( 'listOrderClick show: ' + pleisterman.options['showListOrder']['value']);
            
            // change text of menuItem and set option
            var text = '';            
            var id = self.menuItems['listOrder']['menuItem'].getId();
            if( pleisterman.options['showListOrder']['value'] === 'true' ){
                pleisterman.setOption( 'showListOrder', 'false' );
                text = pleisterman.translations['showListOrder'];
            }
            else {
                pleisterman.setOption( 'showListOrder', 'true' );
                text = pleisterman.translations['hideListOrder'];
            }
            self.menuItems['listOrder']['menuItem'].setText( text );
            // done change text of menuItem and set option

            // call the event to refresh current displays
            jsProject.callEvent( 'showListOrder' );
            
        // DONE FUNCTION: listOrderClick( void ) void
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
                            'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                            'type'      :   'tabStop',
                            'function'  :   self.itemPress
                        },
                        {
                            'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['escape'],
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
                $( '#' + id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
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
            self.menuOptions['backgroundColor'] = pleisterman.colors['panelBackgroundColor']['color'];
            $( '#' + self.menuOptions['id'] ).css( 'background-color', pleisterman.colors['panelBackgroundColor']['color'] );
            self.menuOptions['borderColor'] = pleisterman.colors['panelBorderColor']['color'];
            $( '#' + self.menuOptions['id'] ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
            // done update menu colors
            
            // update menu colors
            self.languageSeparatorOptions['color'] = pleisterman.colors['panelColor']['color'];
            $( '#' + self.languageSeparatorOptions['id'] ).css( 'color', pleisterman.colors['panelColor']['color'] );
            // done update menu colors

            // loop over items
            $.each( self.menuItems, function( index, item ) {
                // get id
                var menuItemId = self.menuItems[index]['menuItem'].getId();
                // set colors
                $( '#' + menuItemId ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + menuItemId ).css( 'color', pleisterman.colors['buttonColor']['color'] );
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
    // DONE MODULE: optionsMenuLayerModule( string: menuButtonId ) void 
})( pleisterman );
// done create module function
