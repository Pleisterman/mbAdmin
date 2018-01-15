/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/help/helpDialogTextModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          this module costructs the text for the help dialog
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

    // MODULE: helpDialogTextModule( string: containerId ) void 
    
    pleisterman.helpDialogTextModule = function( containerId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'helpDialogTextModule';                           // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.containerId = containerId;                                 // string: container id
        self.headerOptions = {                                          // json: header options
            'id'                        :   self.MODULE + 'Header',     // string: element id
            'element'                   :   'div',                      // string: html element type
            'display'                   :   'relative',                 // css display
            'styleHeight'               :   '1.1em',                    // css style height
            'marginTop'                 :   '0.1em',                    // css margin top
            'color'                     :   pleisterman.colors['panelHighlightColor']['color'],   // css color: color
            'fontSize'                  :   '0.9em',                    // css font size
            'marginBottom'              :   '0.2em',                    // css margin bottom
            'paddingLeft'               :   '1.2em',                    // css padding left
            'padding'                   :   '0.2em',                    // css padding
            'paddingBottom'             :   '0.4em',                    // css padding bottom
            'borderBottom'              :   true,                       // boolean: has border
            'borderColor'               :   pleisterman.colors['panelBorderColor']['color'],  // css color: border color
            'borderWidth'               :   '0.1em',                    // css border width
            'borderStyle'               :   'solid',                    // css border style
            'backgroundColor'           :   pleisterman.colors['panelHighlightBackgroundColor']['color']  // css color: background color
        };                                                              // done json: header options
        self.textOptions = {                                            // json: text options
            'id'                        :   self.MODULE + 'Text',       // string: element id
            'element'                   :   'div',                      // string: html element type
            'display'                   :   'relative',                 // css display
            'overflow'                  :   'auto',                     // css overflow
            'styleHeight'               :   '21.1em',                   // css style height
            'marginTop'                 :   '0.4em',                    // css margin top
            'color'                     :   pleisterman.colors['editColor']['color'],     // css color: color
            'fontSize'                  :   '0.9em',                    // css font size
            'marginBottom'              :   '0.2em',                    // css margin bottom
            'padding'                   :   '0.4em',                    // css padding
            'paddingBottom'             :   '0.4em',                    // css padding bottom
            'backgroundColor'           :   pleisterman.colors['editBackgroundColor']['color'],   // css color: background color
            'scrollHeight'              :   10                          // integer: scrollheight
        };                                                              // done json: text options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add header to container
            $( '#' + self.containerId ).append( jsProject.jsonToElementHtml( self.headerOptions ) );
            // add text to container
            $( '#' + self.containerId ).append( jsProject.jsonToElementHtml( self.textOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.setText = function( subjectId, text ){
        // FUNCTION: setText( string: seubjectId, string: text ) void

            // set text
            $( '#' + self.textOptions['id'] ).html( text );
            
            // set header text
            $( '#' + self.headerOptions['id'] ).html( pleisterman.helpSubjects[subjectId]['translation'] );
            
        // DONE FUNCTION: setText( string: seubjectId, string: text ) void
        };
        self.textSelect = function( ){
        // FUNCTION: textSelect( void ) void
            
            // unused
            
        // DONE FUNCTION: textSelect( void ) void
        };
        self.textDeSelect = function( ){
        // FUNCTION: textDeSelect( void ) void
            
            // unused
            
        // DONE FUNCTION: textDeSelect( void ) void
        };
        self.textScrollUp = function( ){
        // FUNCTION: textScrollUp( void ) void
            
            // get current scroll top
            var scrollTop = $( '#' + self.textOptions['id'] ).scrollTop();
            // substract scroll height
            scrollTop -= self.textOptions['scrollHeight'];
            // minimum 0
            scrollTop = Math.max( 0, scrollTop ); 
            // set scroll top
            $( '#' + self.textOptions['id'] ).scrollTop( scrollTop );
            
        // DONE FUNCTION: textScrollUp( void ) void
        };
        self.textScrollDown = function( ){
        // FUNCTION: textScrollDown( void ) void
            
            // get current scroll top
            var scrollTop = $( '#' + self.textOptions['id'] ).scrollTop();
            // add scroll height
            scrollTop += self.textOptions['scrollHeight'];
            // set scroll top
            $( '#' + self.textOptions['id'] ).scrollTop( scrollTop );
            
        // DONE FUNCTION: textScrollDown( void ) void
        };
        self.addTabstops = function( ){
        // FUNCTION: addTabstops( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :    self.textOptions['id'],
                'layer'     :   'overlay',
                'select'    :   self.textSelect,
                'deSelect'  :   self.textDeSelect,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowUp'],
                        'type'      :   'tabStop',
                        'function'  :   self.textScrollUp
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowDown'],
                        'type'      :   'tabStop',
                        'function'  :   self.textScrollDown
                    }
                ]
            };
            // done create tabstop options
            
            // register tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabstops( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );

            // update header colors
            $( '#' + self.headerOptions['id'] ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            self.headerOptions['color'] = pleisterman.colors['panelHighlightColor']['color'];
            $( '#' + self.headerOptions['id'] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            self.headerOptions['backgroundColor'] = pleisterman.colors['panelHighlightBackgroundColor']['color'];
            $( '#' + self.headerOptions['id'] ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
            self.headerOptions['borderColor'] = pleisterman.colors['panelBorderColor']['color'];
            // done update header colors
            
            // update text colors
            $( '#' + self.textOptions['id'] ).css( 'color', pleisterman.colors['editColor']['color'] );
            self.textOptions['color'] = pleisterman.colors['editColor']['color'];
            $( '#' + self.textOptions['id'] ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            self.textOptions['backgroundColor'] = pleisterman.colors['editBackgroundColor']['color'];
            // done update text colors
            
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
            // FUNCTION: setText( string: subjectId, string text ) void
            setText   :   function( subjectId, text ){
                // call setSubject setText
                self.setText( subjectId, text );
            },
            // FUNCTION: addTabstops( void ) void
            addTabstops : function(){
                // call addTabstops show
                self.addTabstops();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: helpDialogTextModule( string: containerId ) void 
})( pleisterman );
// done create module function
