/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/main/introModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *          displays the intro 
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

    // MODULE: introModule( void ) void 
    
    pleisterman.introModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'introModule';                                    // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.callback = null;                                           // function: callback
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image dir
        self.options = {                                                // jsom: options
            'showPeriod' : 500                                          // integer: show period
        };                                                              // done jsom: options
        self.parentOptions = {                                          // jsom: parent options
            'id'                    :   'overlay'                       // string: id
        };                                                              // done json: parent options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   'introDialog',                  // string: element id 
            'element'               :   'div',                          // string html element type 
            'overflow'              :   'hidden',                       // css overflow style
            'position'              :   'absolute',                     // css style position
            'styleWidth'            :   '44em',                         // css style width
            'styleHeight'           :   '22em',                         // css style height
            'border'                :   pleisterman.getSetting( 'dialogBorder' ),             // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'dialogBorderWidth' ),        // css border width    
            'borderColor'           :   pleisterman.colors['dialogBorderColor']['color'],     // css border color
            'borderStyle'           :   pleisterman.getSetting( 'dialogBorderStyle' ),        // css border style
            'borderRadius'          :   pleisterman.getSetting( 'dialogBorderRadius' ),       // css border radius
            'backgroundColor'       :   pleisterman.colors['dialogBackgroundColor']['color']  // css background color
        };                                                              // done json: dialog options
        self.headerContainerOptions = {                                 // json: header container options
            'id'                    :   'introDialogHeaderContainer',   // string: elment id
            'element'               :   'div'                           // string html element type 
        };                                                              // done json: header container options
        self.headerOptions = {                                          // json: header options
            'id'                    :   'introDialogHeader',            // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   pleisterman.translations['introHeader'],              // string: text
            'fontSize'              :   pleisterman.getSetting( 'dialogHeaderFontSize' ),     // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogHeaderFontWeight' ),   // css font weight
            'color'                 :   pleisterman.colors['dialogHighlightColor']['color'],  // css color: color
            'marginLeft'            :   pleisterman.getSetting( 'dialogHeaderMarginLeft' ),   // css margin left
            'marginBottom'          :   pleisterman.getSetting( 'dialogHeaderMarginBottom' ), // css margin bottom
            'padding'               :   pleisterman.getSetting( 'dialogHeaderPadding' )       // css padding
        };                                                              // done json: header options
        self.textContainerOptions = {                                   // json text container options
            'id'                    :   'introDialogTextContainer',     // string: element id
            'element'               :   'div'                           // string: html element type 
        };                                                              // done json: text container options
        self.textOptions = {                                            // json text options
            'id'                    :   'introDialogText',              // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'top'                   :   '0.4em',                        // css top
            'left'                  :   '5.1em',                        // css left
            'text'                  :   'Pleisterman Time Administration.', // string: text
            'paddingLeft'           :   5,                              // css padding left
            'paddingRight'          :   5,                              // css padding rigth
            'fontSize'              :   '1.4em',                        // css font size
            'fontWeight'            :   'bold'                          // css foont weight
        };                                                              // done json: text options
        self.imageContainerOptions = {                                  // json: image container options
            'id'                    :   'introImageContainer',          // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'top'                   :   0,                              // css top
            'left'                  :   0,                              // css left
            'zIndex'                :   0,                              // css z-index    
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%'                          // css style width
        };                                                              // done json: image container options
        self.imageOptions = {                                           // json: image options
            'element'               :   'img',                          // string: html element type 
            'src'                   :   self.imageUrl + 'introBackground.png',  // string: image source
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%',                         // css style width
            'minimumWidth'          :   '100%',                         // css minimum width
            'minimumHeight'         :   '100%'                          // css minimum height
        };                                                              // done json: image options
        self.timer = null;                                              // timer object            
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.show = function(){
        // FUNCTION: show( void ) void

            // add the dialog to the poverlay
            $( '#' + self.parentOptions['id'] ).html( jsProject.jsonToElementHtml( self.dialogOptions ) );
            
            // add the header container to the dialog
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerContainerOptions ) );
            
            // add the text to the header container 
            $( '#' + self.headerContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );


            // add image
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.imageContainerOptions ) );
            
            // add image
            $( '#' + self.imageContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.imageOptions ) );

            
            // add the text container to the dialog 
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.textContainerOptions ) );
            
            // add the text to the text container
            $( '#' + self.textContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.textOptions ) );
            
            // refresh layout
            self.layoutChange();

            // subscribe to events
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // done subscribe to events
            
            // show the into
            $( '#' + self.parentOptions['id'] ).show();
            
        // DONE FUNCTION: show( void ) void
        };
        self.start = function( callback ) {
        // DONE FUNCTION: start( function: callback ) void
            
            // debug info
            self.debug( 'start' );
            // sett the callback
            self.callback = callback;
            // show the dialog
            self.show();
            // create timer
            self.timer = setTimeout( function () { self.end(); }, self.options['showPeriod'] );
                                                   
        // DONE FUNCTION: start( function: callback ) void
        };
        self.end = function(){
        // FUNCTION: end( void ) void

            // delete old timer
            if( self.timer ){
                clearTimeout( self.timer );
                self.timer = null;
            }
            // done delete old timer
            
            // remove event subscription
            jsProject.unSubscribeFromEvent( 'layoutChange', self.layoutChange );
            
            // hide the window
            $( '#overlay' ).hide();
            $( '#overlay' ).html('');
            // done hide the window
            
            // call calback
            if( self.callback ){
                self.callback();
                self.callback = null;
            }  
            // done call calback
            
        // DONE FUNCTION: end( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // set dimensions for dialog
            $( '#' + self.dialogOptions['id'] ).css( 'max-width', $( '#layout' ).width() );
            $( '#' + self.dialogOptions['id'] ).css( 'max-height', $( '#layout' ).height() );
            // done set dimensions for dialog
            
            // set position for dialog
            var top = ( $( '#layout' ).height() - $( '#' + self.dialogOptions['id'] ).height() ) / 2;
            var left = ( $( '#layout' ).width() - $( '#' + self.dialogOptions['id'] ).width() ) / 2;
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );
            // done set position for dialog
            
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
            // FUNCTION: start( function: callback ) void    
            start : function( callback ){
                // call internal
                self.start( callback );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: introModule( void ) void 
})( pleisterman );
// done create module function
