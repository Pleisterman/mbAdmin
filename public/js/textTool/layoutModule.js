/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module handles the layout for the application textTool 
 * 
 *  functions: 
 *      private:
 *          construct               called internal
 *          debug
 * 
 * Last revision: 18-08-2015
 * 
 * Copyright (C) 2015  Pleisterman
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

( function( textTool ){
    textTool.layoutModule = function( ) {


    /*
     *  module layoutModule 
     *  purpose:
     *   this module controls layoutModule for the textTool.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'layoutModule';
        self.debugOn = true;
        self.backgroundPosition = { 'width' : 80,           // percentage of window width
                                    'offsetBottom' : 10 };  // percentage of window height
        self.layout = { 'leftColumnWidth' : 260,            // px, constant                        
                        'rightColumnWidth' : 2,             // px, constant                        
                        'topRowHeight' : 30,                // percentage of window height
                        'middleRowHeight' : 30,             // percentage of window height
                        'bottomRowHeight' : 30 };           // percentage of window height
        // functions
        self.construct = function() {
            self.debug( 'construct' );

            self.addHtml();
            window.onresize = function( ) {
                //self.debug( 'window.onresize' );
                self.sceneChange();
            };
        
            jsProject.subscribeToEvent( 'sceneChange', self.sceneChange );
        };
        self.addHtml = function() {
            // create html
            var html = '';
            
            // add css
            html += '<style>' + "\n";
                
                html += ' .overlay { ' + "\n";
                    html += '  position:absolute;' + "\n";
                    html += '  display: none;' + "\n";
                    html += '  top: 0px;' + "\n";
                    html += '  left: 0px;' + "\n";
                    html += '  height:100%;' + "\n";
                    html += '  width:100%;' + "\n";
                    html += '  background-color:rgba(0,0,0,0.2);' + "\n";
                    html += '  z-index:10;' + "\n";
                    html += '  ' + "\n";
                html += '  }' + "\n" + "\n";
                html += ' .mutationDialog { ' + "\n";
                    html += '  position:absolute;' + "\n";
                    html += '  display: none;' + "\n";
                    html += '  top: 0px;' + "\n";
                    html += '  left: 0px;' + "\n";
                    html += '  height:100%;' + "\n";
                    html += '  width:100%;' + "\n";
                    html += '  background-color:rgba(0,0,0,0.2);' + "\n";
                    html += '  z-index:9;' + "\n";
                    html += '  ' + "\n";
                html += '  }' + "\n" + "\n";
                
            html += '</style>' + "\n";
            
            html += '<div id="layout" style="position:absolute;background-color:black;z-index:2;">';
                html += '<div id="topLeft"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="topMiddle"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="topRight"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="middleLeft"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="middleMiddle"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="middleRIght"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="bottomLeft"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="bottomMiddle"  style="position:absolute;background-color:white;"></div>';
                html += '<div id="bottomRight"  style="position:absolute;background-color:white;"></div>';
            html += '</div>';
            html += '<div class="overlay" id="overlay"></div>';
            html += '<div class="mutationDialog" id="mutationDialog"></div>';
            $( document.body ).append( html );

        };
        self.sceneChange = function() {
            
            var width = ( $( window ).width() / 100 ) * self.backgroundPosition['width'];
            var top = $( '#offsetTop' ).height();
            var offsetBottom = ( $( window ).height() / 100 ) * self.backgroundPosition['offsetBottom'];
            var totalHeight = $( window ).height() - ( top + offsetBottom );
            var left = ( $( window ).width() - width ) / 2;

            $( '#layout' ).css( 'top', top );
            $( '#layout' ).css( 'left', left );
            $( '#layout' ).width( width  );
            $( '#layout' ).height( height );

            var height = ( totalHeight / 100 ) * self.layout['topRowHeight'];

            $( '#topLeft' ).css( 'top', 0 );
            $( '#topLeft' ).css( 'left', 0 );
            $( '#topLeft' ).width( self.layout['leftColumnWidth']  );
            $( '#topLeft' ).height( height );
            
            var columnLeft = width - self.layout['rightColumnWidth'];
            $( '#topRight' ).css( 'top', 0 );
            $( '#topRight' ).css( 'left', columnLeft );
            $( '#topRight' ).width( self.layout['rightColumnWidth']  );
            $( '#topRight' ).height( height );

            var middleColumnWidth = width - ( self.layout['leftColumnWidth'] + self.layout['rightColumnWidth'] );
            $( '#topMiddle' ).css( 'top', 0 );
            $( '#topMiddle' ).css( 'left', self.layout['leftColumnWidth'] );
            $( '#topMiddle' ).width( middleColumnWidth  );
            $( '#topMiddle' ).height( height );

            top = height;
            var height = ( totalHeight / 100 ) * self.layout['middleRowHeight'];
            $( '#middleLeft' ).css( 'top', top );
            $( '#middleLeft' ).css( 'left', 0 );
            $( '#middleLeft' ).width( self.layout['leftColumnWidth']  );
            $( '#middleLeft' ).height( height );
            
            $( '#middleRIght' ).css( 'top', top );
            $( '#middleRIght' ).css( 'left', columnLeft );
            $( '#middleRIght' ).width( self.layout['rightColumnWidth']  );
            $( '#middleRIght' ).height( height );

            $( '#middleMiddle' ).css( 'top', top );
            $( '#middleMiddle' ).css( 'left', self.layout['leftColumnWidth'] );
            $( '#middleMiddle' ).width( middleColumnWidth  );
            $( '#middleMiddle' ).height( height );
            
            top += height;
            var height = ( totalHeight / 100 ) * self.layout['bottomRowHeight'];
            $( '#bottomLeft' ).css( 'top', top );
            $( '#bottomLeft' ).css( 'left', 0 );
            $( '#bottomLeft' ).width( self.layout['leftColumnWidth']  );
            $( '#bottomLeft' ).height( height );
            
            $( '#bottomRight' ).css( 'top', top );
            $( '#bottomRight' ).css( 'left', columnLeft );
            $( '#bottomRight' ).width( self.layout['rightColumnWidth']  );
            $( '#bottomRight' ).height( height );

            $( '#bottomMiddle' ).css( 'top', top );
            $( '#bottomMiddle' ).css( 'left', self.layout['leftColumnWidth'] );
            $( '#bottomMiddle' ).width( middleColumnWidth  );
            $( '#bottomMiddle' ).height( height );
            
            jsProject.callEvent( "layoutChange" );
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
})( textTool );