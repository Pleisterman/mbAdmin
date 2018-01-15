/* 
 *  Project: MbSiteCms
 * 
 *  File: /mbCommon/js/layout/layoutModule.js
 * 
 *  Last revision: 31-12-2016
 * 
 *  Purpose: 
 *          this module handles the layout for the sharesoft
 *           
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( sharesoft ){

    // MODULE: layoutModule( void ) void 
    
    sharesoft.layoutModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                        // object: self
        self.MODULE = 'layoutModule';                           // string:  MODULE
        self.debugOn = false;                                   // boolean: debug
        self.documentCssOptions = {                             // json: document css options
            'maximum-width'     :   '',                                             // css maximum width
            'margin'            :   '0 auto',                                       // css margin
            'font-size'         :   sharesoft.options['fontSize']['value'] + 'px',  // css font size
            'font-family'       :   sharesoft.options['fontFamily']['value'],       // css font- family
            'color'             :   sharesoft.colors['commonColor']['color']        // css color: color
        };                                                      // done json: document css options
        self.layoutOptions = {                                  // json: layout options
            'id'                :   'layout',                   // string: id
            'element'           :   'div',                      // string: html element type 
            'overflow'          :   'hidden',                   // css overflow style
            'position'          :   'absolute',                 // css style position
            'top'               :   0,                          // css top
            'left'              :   0,                          // css left
            'minimumWidth'      :   600,                        // css width: maximum width
            'minimumHeight'     :   300,                        // css height: maximum height
            'backgroundColor'   :   sharesoft.colors['commonBackgroundColor']['color'], // css color: background color
            'zIndex'            :   sharesoft.getSetting( 'zIndexLayout' ).toString()   // css z-index
        };                                                      // done json: layout options
        self.topRowOptions  = {                                 // json: top row options
            'element'           :   'div',                      // string: html element type
            'leftId'            :   'topLeft',                  // string: left part id
            'rightId'           :   'topRight',                 // string: right part id
            'position'          :   'absolute',                 // css position
            'overflow'          :   'hidden',                   // css overflow
            'backgroundColor'   :   'transparent',              // css color: background color
            'styleHeight'       :   sharesoft.getSetting( 'layoutTopRowHeight' ), // css style height
            'top'               :   0,                          // css top
            'left'              :   0,                          // css left
            'borderBottom'      :   true,                       // boolean: add border
            'borderWidth'       :   '0.1em',                    // css border width
            'borderColor'       :   sharesoft.colors['panelBorderColor']['color'],  // css border color
            'borderStyle'       :   'solid',                    // css border style
            'leftWidth'         :   '9.0em'                     // css size: left part width
        };                                                      // done json: top row options
        self.centerRowOptions  = {                              // json: center row options
            'element'           :   'div',                      // string: html element type
            'leftId'            :   'left',                     // string: left part id
            'rightId'           :   'right',                    // string: right part id
            'position'          :   'absolute',                 // css position
            'overflow'          :   'hidden',                   // css overflow
            'backgroundColor'   :   'transparent'               // css color: background color
        };                                                      // done json: center row options
        self.bottomRowOptions  = {                              // json: bottom row options
            'id'                :   'bottomRow',                // string: id
            'element'           :   'div',                      // string: html element type
            'position'          :   'absolute',                 // css position
            'overflow'          :   'hidden',                   // css overflow
            'styleHeight'       :   sharesoft.getSetting( 'layoutBottomRowHeight' ), // css style height
            'styleWidth'        :   '100%',                     // css style width
            'borderTop'         :   true,                       // boolean: add border
            'borderWidth'       :   '0.1em',                    // css border width
            'borderColor'       :   sharesoft.colors['panelBorderColor']['color'], // css border color
            'borderStyle'       :   'solid',                    // css border style
            'backgroundColor'   :   'transparent'               // css color: background color
        };                                                      // done json: bottom row options
        self.overlayOptions = {                                 // json: overlay options
            'id'                :   'mainOverlay',              // string html element type 
            'element'           :   'div',                      // string html element type 
            'position'          :   'absolute',                 // css position style
            'display'           :   'none',                     // css display style
            'top'               :   0,                          // css top
            'left'              :   0,                          // css left
            'styleHeight'       :   '100%',                     // css style height 
            'styleWidth'        :   '100%',                     // css style width 
            'zIndex'            :   sharesoft.getSetting( 'zIndexOverlay' ).toString(),
            'backgroundColor'   :   sharesoft.colors['overlayBackgroundColor']['color']
        };                                                      // done json: overlay options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create html
            self.addHtml();
            
            // set document css 
            self.setDocumentCss();
            
            // override window.onresize
            window.onresize = function( ) {
                // scene change
                self.sceneChange();
            };
            // done override window.onresize
        
            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // add scene change
            jsProject.subscribeToEvent( 'sceneChange', self.sceneChange );
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.setDocumentCss = function() {
        // FUNCTION: setDocumentCss( void ) void

            // loop over document css options
            $.each( self.documentCssOptions, function( index, value ) {
                // set css value
                $(document.body).css( index, value );
            } );            
            // done loop over document css options
            
        // DONE FUNCTION: setDocumentCss( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // add layout to document
            $( document.body ).append( jsProject.jsonToElementHtml( self.layoutOptions ) );
           
            // add top left
            self.topRowOptions['id'] = self.topRowOptions['leftId'];
            self.topRowOptions['styleWidth'] = self.topRowOptions['leftWidth'];
            $( '#' + self.layoutOptions['id'] ).append( jsProject.jsonToElementHtml( self.topRowOptions ) );

            // add top right
            self.topRowOptions['id'] = self.topRowOptions['rightId'];
            self.topRowOptions['styleWidth'] = undefined;
            $( '#' + self.layoutOptions['id'] ).append( jsProject.jsonToElementHtml( self.topRowOptions ) );

            // add left
            self.centerRowOptions['id'] = self.centerRowOptions['leftId'];
            $( '#' + self.layoutOptions['id'] ).append( jsProject.jsonToElementHtml( self.centerRowOptions ) );
            
            // add right
            self.centerRowOptions['id'] = self.centerRowOptions['rightId'];
            $( '#' + self.layoutOptions['id'] ).append( jsProject.jsonToElementHtml( self.centerRowOptions ) );
            
            // add bottom
            $( '#' + self.layoutOptions['id'] ).append( jsProject.jsonToElementHtml( self.bottomRowOptions ) );

            // add overlay
            $( document.body ).append( jsProject.jsonToElementHtml( self.overlayOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.sceneChange = function() {
        // FUNCTION: addHtml( void ) void
            
            var top = 0, left = 0, totalWidth = 0, width = 0, totalHeight = 0, height = 0;

            // calculate layout width
            totalWidth = $( window ).width();
            if( totalWidth < self.layoutOptions['minimumWidth'] ){
                totalWidth = self.layoutOptions['minimumWidth'];
            }
            // done calculate layout width
            
            // calculate layout height
            totalHeight = $( window ).height();
            if( totalHeight < self.layoutOptions['minimumHeight'] ){
                totalHeight = self.layoutOptions['minimumHeight'] ;
            }
            // done calculate layout height
            
            // set layout position
            $( '#' + self.layoutOptions['id'] ).width( totalWidth  );
            $( '#' + self.layoutOptions['id'] ).height( totalHeight  );
            // done set layout position

            // top row right
            width = totalWidth - $( '#topLeft' ).width();
            $( '#topRight' ).css( 'left', $( '#topLeft' ).width() );
            $( '#topRight' ).width( width  );
            // done top row right
            

            // set bottom top position
            top = totalHeight - $( '#' + self.bottomRowOptions['id'] ).outerHeight();
            $( '#' + self.bottomRowOptions['id'] ).css( 'top', top + 'px' );
            // done set bottom top position

            // get divider position
            var dividerPosition = jsProject.getValue( 'position', 'divider' );

            // calculate height
            height = totalHeight;
            height -= $( '#topLeft' ).outerHeight();
            height -= $( '#' + self.bottomRowOptions['id'] ).outerHeight();
            // done calculate height
            
            //  set left layout
            $( '#left' ).css( 'top',  $( '#topLeft' ).outerHeight() + 'px' );
            $( '#left' ).css( 'left',  '0px' );
            $( '#left' ).width( dividerPosition );
            $( '#left' ).height( height );
            //  done set left layout

            //  set right layout
            width = $( '#' + self.layoutOptions['id'] ).width( );;
            width -= $( '#left' ).outerWidth();
            width -= $( '#divider' ).outerWidth();
            left = $( '#left' ).outerWidth() + $( '#divider' ).outerWidth();
            $( '#right' ).css( 'top',  $( '#topLeft' ).outerHeight() + 'px' );
            $( '#right' ).css( 'left',  left + 'px' );
            $( '#right' ).width( width );
            $( '#right' ).height( height );
            //  done set right layout

            // call the global event
            jsProject.callEvent( "layoutChange" );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void

            // debug info
            self.debug( 'update colors' );
            
            // set document body color 
            $( document.body ).css( 'color', sharesoft.colors['commonColor']['color'] );
            // set layout background color 
            $( '#' + self.layoutOptions['id'] ).css( 'background-color', sharesoft.colors['commonBackgroundColor']['color'] );
            // set top left row border color
            $( '#' + self.topRowOptions['leftId'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            // set top right row border color
            $( '#' + self.topRowOptions['rightId'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            // set bottom row border color 
            $( '#' + self.bottomRowOptions['id'] ).css( 'border-color', sharesoft.colors['panelBorderColor']['color'] );
            
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
        };
        // DONE PUBLIC
    };
    // DONE MODULE: layoutModule( void ) void 
})( sharesoft );
// done create module function
