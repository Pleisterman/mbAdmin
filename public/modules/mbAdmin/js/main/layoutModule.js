/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module handles the layout for the mbadmin
 *           
 * Last revision: 27-04-2016
 * 
 * NOTICE OF LICENSE
 *
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


( function( mbadmin ){
    mbadmin.layoutModule = function( ) {

        // layoutModule 
    
        // private
        var self = this;
        self.MODULE = 'layoutModule';
        self.debugOn = false;
        self.documentCssOptions = { // css values: json object[ string css style : value, .. ]
            'maximum-width'             :   '',              
            'margin'                    :   '0 auto',              
            'font-size'                 :   mbadmin.options['fontSize']['value'] + 'px',
            'font-family'               :   mbadmin.options['fontFamily']['value'],
            'color'                     :   mbadmin.colors['commonColor']['color']
        };
        self.layoutOptions = { 
            'id'                        :   'layout',       // string
            'element'                   :   'div',          // string html element type 
            'overflow'                  :   'hidden',       // css overflow style
            'position'                  :   'absolute',     // css style position
            'top'                       :   0,              // px
            'left'                      :   0,              // px
            'minimumWidth'              :   600,            // px
            'minimumHeight'             :   300,            // px
            'backgroundColor'           :   mbadmin.colors['commonBackgroundColor']['color'],
            'zIndex'                    :   mbadmin.getSetting( 'zIndexLayout' ).toString()
        };
        self.topRowOptions  = {
            'element'                   :   'div',
            'leftId'                    :   'topLeft',
            'rightId'                   :   'topRight',
            'position'                  :   'absolute',
            'overflow'                  :   'hidden',
            'backgroundColor'           :   'transparent',
            'styleHeight'               :   mbadmin.getSetting( 'layoutTopRowHeight' ),
            'top'                       :   0,
            'left'                      :   0,
            'borderBottom'              :   true,               // boolean add border
            'borderWidth'               :   '0.1em',
            'borderColor'               :   mbadmin.colors['panelBorderColor']['color'],
            'borderStyle'               :   'solid',
            'leftWidth'                 :   '9.0em'
            
        };
        self.centerRowOptions  = {
            'element'                   :   'div',
            'leftId'                    :   'left',
            'rightId'                   :   'right',
            'position'                  :   'absolute',
            'overflow'                  :   'hidden',
            'backgroundColor'           :   'transparent'
        };
        self.bottomRowOptions  = {
            'id'                        :   'bottomRow',
            'element'                   :   'div',
            'position'                  :   'absolute',
            'overflow'                  :   'hidden',
            'styleHeight'               :   mbadmin.getSetting( 'layoutBottomRowHeight' ),
            'styleWidth'                :   '100%',
            'borderTop'                 :   true,               // boolean add border
            'borderWidth'               :   '0.1em',
            'borderColor'               :   mbadmin.colors['panelBorderColor']['color'],
            'borderStyle'               :   'solid',
            'backgroundColor'           :   'transparent'
        };
        self.overlayOptions = {
            'id'                    :   'mainOverlay',          // string html element type 
            'element'               :   'div',              // string html element type 
            'position'              :   'absolute',         // css position style
            'display'               :   'none',             // css display style
            'top'                   :   0,                  // px
            'left'                  :   0,                  // px
            'styleHeight'           :   '100%',             // css height style
            'styleWidth'            :   '100%',             // css width style
            'zIndex'                :   mbadmin.getSetting( 'zIndexOverlay' ).toString(),
            'backgroundColor'       :   mbadmin.colors['overlayBackgroundColor']['color']
        };            
        // functions
        self.construct = function() {
            
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
        };
        self.addEventSubscriptions = function(){

            // add scene change
            jsProject.subscribeToEvent( 'sceneChange', self.sceneChange );
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        };
        self.setDocumentCss = function() {
            // loop over document css options
            $.each( self.documentCssOptions, function( index, value ) {
                // set css value
                $(document.body).css( index, value );
            } );            
            // done loop over document css options
        };
        self.addHtml = function() {
            
            // add layout to document
            $( document.body ).append( mbadmin.getElementHtml( self.layoutOptions ) );
           
            // add top left
            self.topRowOptions['id'] = self.topRowOptions['leftId'];
            self.topRowOptions['styleWidth'] = self.topRowOptions['leftWidth'];
            $( '#' + self.layoutOptions['id'] ).append( mbadmin.getElementHtml( self.topRowOptions ) );

            // add top right
            self.topRowOptions['id'] = self.topRowOptions['rightId'];
            self.topRowOptions['styleWidth'] = undefined;
            $( '#' + self.layoutOptions['id'] ).append( mbadmin.getElementHtml( self.topRowOptions ) );

            // add left
            self.centerRowOptions['id'] = self.centerRowOptions['leftId'];
            $( '#' + self.layoutOptions['id'] ).append( mbadmin.getElementHtml( self.centerRowOptions ) );
            
            // add right
            self.centerRowOptions['id'] = self.centerRowOptions['rightId'];
            $( '#' + self.layoutOptions['id'] ).append( mbadmin.getElementHtml( self.centerRowOptions ) );
            
            // add bottom
            $( '#' + self.layoutOptions['id'] ).append( mbadmin.getElementHtml( self.bottomRowOptions ) );

            // add overlay
            $( document.body ).append( mbadmin.getElementHtml( self.overlayOptions ) );

        };
        self.sceneChange = function() {
            
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

        };
        self.updateColors = function( ) {
            self.debug( 'update colors' );
            $( document.body ).css( 'color', mbadmin.colors['commonColor']['color'] );
            $( '#' + self.layoutOptions['id'] ).css( 'background-color', mbadmin.colors['commonBackgroundColor']['color'] );
            $( '#' + self.topRowOptions['leftId'] ).css( 'border-color', mbadmin.colors['panelBorderColor']['color'] );
            $( '#' + self.topRowOptions['rightId'] ).css( 'border-color', mbadmin.colors['panelBorderColor']['color'] );
            $( '#' + self.bottomRowOptions['id'] ).css( 'border-color', mbadmin.colors['panelBorderColor']['color'] );
        };
        // debug 
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ' ' + string );
            }
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( mbadmin );