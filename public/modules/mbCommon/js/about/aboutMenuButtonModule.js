/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/about/aboutMenuButtonModule.js
 *  
 *  Purpose: 
 *          this module creates a button for opening 
 *          the info menu
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
 *          an options menu in this layer
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( sharesoft ){

    // MODULE: optionsMenuButtonModule( function: callback ) void
    
    sharesoft.aboutMenuButtonModule = function( callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'aboutMenuButtonModule';                          // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        self.callback = callback;                                       // function: callback
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );             // string: image dir
        self.menuButtonOptions = {                                      // json: menu button options
            'id'                    :   self.MODULE + 'MenuButton',     // string: element id
            'parentId'              :   'topRight',                     // string: parent element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   'transparent',                  // css color: background color
            'selectedBackgroundColor' : sharesoft.colors['panelHighlightBackgroundColor']['color'], // css color: selected background color
            'marginTop'             :   sharesoft.getSetting( 'topMenuButtonsMarginTop' ),          // css margin top
            'marginLeft'            :   '26.0em',                       // css margin left
            'color'                 :   sharesoft.colors['panelColor']['color'],                    // css color: color
            'selectedColor'         :   sharesoft.colors['panelHighlightColor']['color'],           // css color: selected color
            'imageUrl'              :   'url( ' + self.imageUrl + 'about.png )', // string: image file name
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '0.2em center',                 // css background positiob
            'padding'               :   sharesoft.getSetting( 'topMenuButtonsPadding' ),            // css padding
            'backgroundSize'        :   sharesoft.getSetting( 'topMenuButtonsImageSize' ) +         // css background size
                                        ' ' + sharesoft.getSetting( 'topMenuButtonsImageSize' ), 
            'cursor'                :   'pointer',                      // css cursor            
            'borderRadius'          :   '0.4em'                         // css border radius        
        };                                                              // done json: menu button options
        self.menuButtonTextOptions = {                                  // json: menu text options    
            'element'               :   'div',                          // string: html element type 
            'text'                  :   sharesoft.translations['about'],                            // string: text
            'paddingLeft'           :   sharesoft.getSetting( 'topMenuButtonsTextPaddingLeft' ),    // css padding left
            'fontSize'              :   sharesoft.getSetting( 'topMenuButtonsFontSize' ),           // css font size
            'fontWeight'            :   sharesoft.getSetting( 'topMenuButtonsFontWeight' )          // css font weight
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
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
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
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update menu button colors
            self.menuButtonOptions['selectedBackgroundColor'] = sharesoft.colors['panelHighlightBackgroundColor']['color'];
            self.menuButtonOptions['color'] = sharesoft.colors['panelColor']['color'];
            $( '#' + self.menuButtonOptions['id'] ).css( 'color', sharesoft.colors['panelColor']['color'] );
            self.menuButtonOptions['selectedColor'] = sharesoft.colors['panelHighlightColor']['color'];
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
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: aboutMenuButtonModule( function: callback ) void 
})( sharesoft );
// done create module function
