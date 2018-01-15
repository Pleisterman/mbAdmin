/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module handles the text input for the application textTool 
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
    textTool.mutationListModule = function( ) {


    /*
     *  module mutationListModule 
     *  purpose:
     *   this module controls mutationListModule for the textTool.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'mutationListModule';
        self.debugOn = true;
        self.panelPositionId = 'middleMiddle';
        self.panelPositions = { "offsetX" : 8,
                                "offsetMaxX" : 15,
                                "offsetY" : 8,
                                "offsetMaxY" : 15,
                                "padding" : 5 };
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            self.addHtml();
            
            // subscribe to events
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );

        };
        self.addHtml = function() {
            // create html
            var html = '';
            
            html += '<div id="mutationsPanel" class="panel panel-default" ';
                html += ' style="';
                    html += ' padding:5px;position:absolute;background-color:rgb(66, 139, 202);';
                    html += ' overflow:hidden';
                html += ' " ';
            html += '>';

            html += '<div id="mutationsListContainer" ';
                        html += ' style="';
                            html += ' background-color:white;border: black 0px solid;';
                            html += 'position:absolute;overflow:hidden;';
                        html += ' "';
                    html += '>';
                        html += 'vervang &lsquo; met &ldquo; en vervang &ldquo; met &lsquo;';
                        html += '<br>';
                        html += 'voeg toe regelnr aan begin van iedere regel';
                        html += '<br>';
                        html += 'vervang regel einde met &lt;br&gt;';
                        html += '<br>';
                        html += 'verwijder commentaar';
                    html += '</div>'; 
            
            html += '</div>'; 

            $( '#' + self.panelPositionId ).html( html );
            
        };
        self.layoutChange = function() {
            //self.debug( 'layoutChange' );
            var width = $( '#' + self.panelPositionId ).width();
            var offsetX = ( width / 100 ) * self.panelPositions['offsetX'];
            if( offsetX > self.panelPositions['offsetMaxX'] ){
                offsetX = self.panelPositions['offsetMaxX'];
            }
            var height = $( '#' + self.panelPositionId ).height();
            
            var offsetY = ( height / 100 ) * self.panelPositions['offsetY'];
            if( offsetY > self.panelPositions['offsetMaxY'] ){
                offsetY = self.panelPositions['offsetMaxY'];
            }
            width -= 2 * offsetX;
            // substract external div 5px padding
            width -= 10;
            // done substract external div 5px padding
            
            height -= 2 * offsetY;
            $( '#mutationsPanel' ).css( 'top', offsetY );
            $( '#mutationsPanel' ).css(  'left', offsetX );
            $( '#mutationsPanel' ).width( width );
            $( '#mutationsPanel' ).height( height );
            
           
            $( '#mutationsListContainer' ).width( width );
            $( '#mutationsListContainer' ).height( height );
            
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