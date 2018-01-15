/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/menuItemModule.js
 * 
 *  Last revision: 31-12-2016
 * 
 *  Purpose: 
 *          this module creates a menuItem for the popUpMenuModule
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

    // MODULE: menuItemModule( string: id, var: value, string: text, string: menuId ) void 
    
    pleisterman.menuItemModule = function( id, value, text, menuId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'menuItemModule';                                 // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.id = id;                                                   // string: elelment id
        self.menuId = menuId;                                           // string: parent menu id
        self.value = value;                                             // var: value
        self.text = text;                                               // string; text
        self.menuItemOptions = {                                        // json: menu item options
            'id'                    :   'menuItem_' + self.menuId + '_' + self.id,   // string
            'element'               :   'div',                          // string html element type 
            'overflow'              :   'visible',                      // css overflow style
            'textAlign'             :   'left',                         // css text align
            'marginTop'             :   pleisterman.getSetting( 'menuItemTopMargin' ),        // css margin top
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'color'                 :   pleisterman.colors['buttonColor']['color'],           // css color: color
            'border'                :   true,                           // add border option
            'borderWidth'           :   pleisterman.getSetting( 'menuItemBorderWidth' ),  // css border width
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],  // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'menuItemBorderStyle' ),  // css border style
            'borderRadius'          :   pleisterman.getSetting( 'menuItemBorderRadius' ), // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'marginLeft'            :   pleisterman.getSetting( 'menuItemMarginLeft' ),   // css margin left
            'marginRight'           :   pleisterman.getSetting( 'menuItemMarginRight' )   // css margin right
        };                                                              // done json: menu item options
        self.menuItemTextOptions = {                                    // json: menu item text options
            'id'                    :   'menuItemText_' + self.menuId + '_' + self.id,   // string
            'text'                  :   '' + self.text + '',            // string
            'element'               :   'div',                          // string html element type 
            'display'               :   'block',                        // css display style
            'fontSize'              :   pleisterman.getSetting( 'menuItemFontSize' ),     // css fot size
            'fontWeight'            :   pleisterman.getSetting( 'menuItemFontWeight' ),   // css font weight
            'padding'               :   pleisterman.getSetting( 'menuItemPadding' ),      // css padding
            'paddingLeft'           :   pleisterman.getSetting( 'menuItemPaddingLeft' ),  // css padding left
            'paddingRight'          :   pleisterman.getSetting( 'menuItemPaddingRight' )  // css padding right
        };                                                              // done json: menu item text options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create html 
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function( ){
        // FUNCTION: addHtml( void ) void
            
            // add to item to menu    
            $( '#' + self.menuId ).append( jsProject.jsonToElementHtml( self.menuItemOptions ) );
            
            // set data value
            $( '#' + self.menuItemOptions['id'] ).attr( 'data-value', self.value );
            // add to text to menu    
            $( '#' + self.menuItemOptions['id'] ).append( jsProject.jsonToElementHtml( self.menuItemTextOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.setText = function( text ){
        // FUNCTION: setText( string: text ) void
            
            // set text
            $( '#' + self.menuItemTextOptions['id'] ).html( text );
            
        // DONE FUNCTION: setText( string: text ) void
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
            // FUNCTION: getId( void ) string: menuId
            getId : function(){
                // return string: menuId
                return self.menuItemOptions['id'];
            },
            // FUNCTION: setText( string: text ) void
            setText :   function( text ){
                // call internal
                self.setText( text );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: menuItemModule( void ) void 
})( pleisterman );
// done create module function
