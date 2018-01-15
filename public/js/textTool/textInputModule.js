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
    textTool.textInputModule = function( ) {


    /*
     *  module textInputModule 
     *  purpose:
     *   this module controls textInputModule for the textTool.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'textInputModule';
        self.debugOn = true;
        self.panelPositionId = 'topMiddle';
        self.panelPositions = { "offsetX" : 8,
                                "offsetMaxX" : 15,
                                "offsetY" : 8,
                                "offsetMaxY" : 15 };
        self.inputTextPositions = { 'marginWidth' : 15,
                                    'marginHeight' : 15 };                     
        self.translations = { 'textToolinputMenuHeader' : { "translation" : 'Voer hier uw tekst in:' } };                            
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
            
            html += '<div id="textInputPanel" class="panel panel-default" ';
                html += ' style="position:absolute;" ';
            html += '>';
                html += '<div id="textInputDiv" class="panel-body"';
                    html += ' style="padding:0px;background-color:rgb(153, 153, 153);" ';
                html += '>';
                    html += '<textarea id="textInput" type="text" ';
                        html += ' style="resize: none;margin:5px;white-space: nowrap; overflow: auto;" ';
                    html += '>';
                    html += '</textarea>'; 
                html += '</div>'; 
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
            height -= 2 * offsetY;
            $( '#textInputPanel' ).css( 'top', offsetY );
            $( '#textInputPanel' ).css(  'left', offsetX );
            $( '#textInputPanel' ).width( width );
            $( '#textInputPanel' ).height( height );
            
            height -= self.inputTextPositions['marginHeight'];
            width -= self.inputTextPositions['marginWidth'];
            $( '#textInput' ).css( 'top', 0 );
            $( '#textInput' ).css(  'left', 0 );
            $( '#textInput' ).width( width );
            $( '#textInput' ).height( height );
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