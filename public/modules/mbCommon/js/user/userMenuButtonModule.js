/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/user/userMenuButtonModule.js
 *  
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *          this module creates a button for opening 
 *          the user menu
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
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

    // MODULE: userMenuButtonModule( function: callback ) void
    
    pleisterman.userMenuButtonModule = function( callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'userMenuButtonModule';                           // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        self.callback = callback;                                       // function: callback
        self.imageUrl = pleisterman.getSetting( 'imageUrl' ); 
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image dir
        self.menuButtonOptions = {                                      // json: menu button options
            'id'                    :   self.MODULE + 'MenuButton',     // string: element id
            'parentId'              :   'topRight',                     // string: parent element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   'transparent',                  // css color: background color
            'selectedBackgroundColor' : pleisterman.colors['panelHighlightBackgroundColor']['color'], // css color: selected background color
            'marginTop'             :   pleisterman.getSetting( 'topMenuButtonsMarginTop' ),          // css margin top
            'marginLeft'            :   '12.0em',                       // css margin left
            'color'                 :   pleisterman.colors['panelColor']['color'],                    // css color: color
            'selectedColor'         :   pleisterman.colors['panelHighlightColor']['color'],           // css color: selected color
            'imageUrl'              :   'url( ' + self.imageUrl + 'user.png )',                     // string: image file
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '0.2em center',                 // css background positiob
            'padding'               :   pleisterman.getSetting( 'topMenuButtonsPadding' ),            // css padding
            'backgroundSize'        :   pleisterman.getSetting( 'topMenuButtonsImageSize' ) +         // css background size
                                        ' ' + pleisterman.getSetting( 'topMenuButtonsImageSize' ), 
            'cursor'                :   'pointer',                      // css cursor            
            'borderRadius'          :   '0.4em'                         // css border radius        
        };                                                              // done json: menu button options
        self.menuButtonTextOptions = {                                  // json: menu text options    
            'id'                    :   self.MODULE + 'MenuButtonText', // string: element id
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'backgroundColor'       :   'transparent',                  // css background color
            'size'                  :   '15',                           // string: size
            'readOnly'              :   true,                           // boolean: readonly
            'paddingLeft'           :   pleisterman.getSetting( 'topMenuButtonsTextPaddingLeft' ),    // css padding left
            'fontSize'              :   pleisterman.getSetting( 'topMenuButtonsFontSize' ),           // css font size
            'fontWeight'            :   pleisterman.getSetting( 'topMenuButtonsFontWeight' ),         // css font weight
            'border'                :   true,                           // boolean: has border bottom
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: COLOR: panelBorderColor
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: menu text options    
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add button
            $( '#' + self.menuButtonOptions['parentId'] ).append( jsProject.jsonToElementHtml( self.menuButtonOptions ) );
            // add text
            $( '#' + self.menuButtonOptions['id'] ).append( jsProject.jsonToElementHtml( self.menuButtonTextOptions ) );
            
            // add button events
            self.addEvents();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
            // add button tabstops
            self.addTabStops();
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'userNameChange', self.setUserName );
            // add update colors 
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add events
            $( '#' + self.menuButtonOptions['id'] ).mouseover( function( event ){ self.mouseOver( ); }); 
            $( '#' + self.menuButtonOptions['id'] ).mouseout( function( event ){ self.mouseOut( ); }); 
            $( '#' + self.menuButtonOptions['id'] ).click( function( event ){ self.click(); }); 
            // done add events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // create tabstop options 
             var options = {
                'id'        :   self.menuButtonOptions['id'],
                'layer'     :   'main',
                'select'    :   self.mouseOver,
                'deSelect'  :   self.mouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.click
                    }
                ]
            };
            // done create tabstop options 
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', options );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.mouseOver = function( ){
        // FUNCTION: mouseOver( void ) void
            
            // select -> background color highlight
            $( '#' + self.menuButtonOptions['id'] ).css( 'background-color', self.menuButtonOptions['selectedBackgroundColor'] );
            // select -> color highlight
            $( '#' + self.menuButtonOptions['id'] ).css( 'color', self.menuButtonOptions['selectedColor'] );
            
        // DONE FUNCTION: mouseOver( void ) void
        };
        self.mouseOut = function( ){
        // FUNCTION: mouseOut( void ) void
            
            // check if button is selected tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.menuButtonOptions['id'] ){
                // done keep selected
                return;
            }
            // done check if button is selected tabstop
            
            // de select -> background color default
            $( '#' + self.menuButtonOptions['id'] ).css( 'background-color', self.menuButtonOptions['backgroundColor'] );
            // de select -> color default
            $( '#' + self.menuButtonOptions['id'] ).css( 'color', self.menuButtonOptions['color'] );
            
        // DONE FUNCTION: mouseOut( void ) void
        };
        self.click = function(){
        // FUNCTION: click( void ) void
            
            // debug info
            self.debug( 'click' );
            // call the callback
            self.callback( );
            
        // DONE FUNCTION: click( void ) void
        };
        self.setUserName = function( userName ){
        // FUNCTION: setUserName( string: userName ) void
            
            // set userName
            pleisterman.userName = userName;
            
            // set button text
            $( '#' + self.menuButtonTextOptions['id'] ).val( pleisterman.translations['hello'] + ' ' + pleisterman.userName );
            
        // DONE FUNCTION: setUserName( string: userName ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
        
            // debug info
            self.debug( 'update colors' );
            
            // update menu button colors
            self.menuButtonOptions['selectedBackgroundColor'] = pleisterman.colors['panelHighlightBackgroundColor']['color'];
            self.menuButtonOptions['color'] = pleisterman.colors['panelColor']['color'];
            $( '#' + self.menuButtonOptions['id'] ).css( 'color', pleisterman.colors['panelColor']['color'] );
            self.menuButtonOptions['selectedColor'] = pleisterman.colors['panelHighlightColor']['color'];
            // done update menu button colors
            
            
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
            // FUNCTION: getId( void ) string: menu button id
            getId   :   function(){
                // return button id
                return self.menuButtonOptions['id'];
            },
            // FUNCTION: setUserName( string: userName ) void
            setUserName : function( userName ){
                // call internal
                self.setUserName( userName );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: userMenuButtonModule( function: callback ) void 
})( pleisterman );
// done create module function
