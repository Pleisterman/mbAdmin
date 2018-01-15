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
    textTool.inputMenuModule = function( ) {


    /*
     *  module inputMenuModule 
     *  purpose:
     *   this module controls inputMenuModule for the textTool.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'inputMenuModule';
        self.debugOn = true;
        self.panelPositionId = 'topLeft';
        self.panelPositions = { "offsetX" : 8,
                                "offsetMaxX" : 15,
                                "offsetY" : 18,
                                "offsetMaxY" : 18,
                                "headerWidth" : 90,
                                "headerHeight" : 20,
                                "bodyTop" : 40 };
        self.inputTextPositions = { 'marginWidth' : 15,
                                    'marginHeight' : 15 };  
        self.translations = { 'textToolinputMenuHeader' : { "translation" : 'Voer hier uw tekst in:' } };                            
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            self.addHtml();
            
            // subscribe to events
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            jsProject.subscribeToEvent( 'languageChange', self.translate );

            // translate 
            self.translate();
        };
        self.addHtml = function() {
            // create html
            var html = '';
            // input panel
            html += '<div id="inputMenuPanel"';
                html += ' style="position:absolute;border: black 0px groove;" ';
            html += '>';
                // header
                html += '<div id="inputMenuPanelHeader"';
                    html += ' style="border: black 0px groove;position:absolute;font-size:1.1em;padding-top:5px;" ';
                    html += ' class="label label-default"';
                html += '>';
                    // bold
                    html += '<b>';
                        // arrow
                        html += '<div';
                            html += ' class="glyphicon glyphicon-arrow-right" aria-hidden="true"';
                            html += ' style="float:right;color:darkgreen;"';
                        html += '></div>';
                        // done arrow
                        // header text
                        html += '<span ';
                            html += ' id="textToolinputMenuHeader"';
                        html += '>';
                            html += self.translations['textToolinputMenuHeader']['translation'];
                        html += '</span>';
                        // done header text
                    html += '</b>';
                    // done bold
                html += '</div>';
                // done header
                
                html += '<div style="position:absolute;margin-top:' + self.panelPositions['bodyTop'] + 'px;overflow:auto;width:95%;height:95%;">';
                html += '</div>';
            
            html += '</div>'; 
            // done output panel
            // done input panel
            $( '#' + self.panelPositionId ).html( html );
        };
        self.layoutChange = function() {
            //self.debug( 'layoutChange' );
            
            var width = $( '#' + self.panelPositionId ).width();
            var height = $( '#' + self.panelPositionId ).height();
            
            // calculate offset x
            var offsetX = ( width / 100 ) * self.panelPositions['offsetX'];
            if( offsetX > self.panelPositions['offsetMaxX'] ){
                offsetX = self.panelPositions['offsetMaxX'];
            }
            // done calculate offset x
            
            // calculate offset y
            var offsetY = ( height / 100 ) * self.panelPositions['offsetY'];
            if( offsetY > self.panelPositions['offsetMaxY'] ){
                offsetY = self.panelPositions['offsetMaxY'];
            }
            // calculate offset y
            
            // calculate width
            width -= 2 * offsetX;
            // calculate height
            height -= 2 * offsetY;
            
            // panel positions
            $( '#inputMenuPanel' ).css( 'top', offsetY );
            $( '#inputMenuPanel' ).css(  'left', offsetX );
            $( '#inputMenuPanel' ).width( width );
            $( '#inputMenuPanel' ).height( height );
            // done panel positions
            
            // header dimensions
            width = ( width / 100 ) * self.panelPositions['headerWidth'];
            $( '#inputMenuPanelHeader' ).width( width );
            $( '#inputMenuPanelHeader' ).height( self.panelPositions['headerHeight'] );
            // done header dimensions
        };
        self.translate = function(){
            self.debug( 'translate' );
            
            // create array with translation ids
            var translationIds = [];
            
            $.each( self.translations, function( index, value ) {
                translationIds.push( index );
            });
            // done create array with translation ids
            
            // translate
            textTool.translate( 'inputMenu', translationIds, self.translateCallback );
        };
        self.translateCallback = function( result ){
            self.debug( 'translateCallback' );
            // loop over values
            $.each( result, function( index, value ) {
                //self.debug( 'index: ' + index + ' value: '+ value );
                switch( index ) {
                    default : {
                        // set html element translations    
                        self.translations[index]["translation"] = value;
                        $( '#' + index ).html( value );
                    }
                }
            });
            // done loop over values
            
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