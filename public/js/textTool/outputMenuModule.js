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
    textTool.outputMenuModule = function( ) {


    /*
     *  module outputMenuModule 
     *  purpose:
     *   this module controls outputMenuModule for the textTool.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'outputMenuModule';
        self.debugOn = true;
        self.panelPositionId = 'bottomLeft';
        self.panelPositions = { "offsetX" : 8,
                                "offsetMaxX" : 15,
                                "offsetY" : 8,
                                "offsetMaxY" : 15,
                                "headerWidth" : 90,
                                "headerHeight" : 20,
                                "bodyTop" : 30 };
        self.inputTextPositions = { 'marginWidth' : 15,
                                    'marginHeight' : 15 };                     
        self.translations = { 'result' : { "translation" : 'Resultaat' } };                            
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
            // output panel
            html += '<div id="outputMenuPanel"';
                html += ' style="position:absolute;border: black 0px groove;" ';
            html += '>';
                // header
                html += '<div id="outputMenuPanelHeader"';
                    html += ' style="border: black 0px groove;position:absolute;font-size:1.1em;padding-top:5px;" ';
                    html += ' class="label label-success"';
                html += '>';
                    // bold
                    html += '<b>';
                        // arrow
                        html += '<span ';
                            html += ' style="float: right;margin-bottom: 15px;color:darkgreen;"';
                            html += ' class="glyphicon glyphicon-arrow-right" aria-hidden="true"';
                        html += '></span>';
                        // done arrow
                        // header text
                        html += '<span';
                            html += ' id="textTooloutputMenuHeader"';
                        html += '>';
                            html += self.translations['result']['translation'];
                        html += '</span>';
                        // done header text
                    html += '</b>';
                    // done bold
                html += '</div>';
                // done header
                
                html += '<div style="position:absolute;margin-top:' + self.panelPositions['bodyTop'] + 'px;overflow:auto;width:95%;height:95%;">';
//                    html += '<button type="button" class="btn btn-success" style="margin:4px;">voorbeeld</button>';
//                    html += '<button type="button" class="btn btn-success" style="margin:4px;">bewerkt</button>';
                    html += '<br>';
                    html += '<br>';
                html += '</div>';
            
            html += '</div>'; 
            // done output panel
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
            $( '#outputMenuPanel' ).css( 'top', offsetY );
            $( '#outputMenuPanel' ).css(  'left', offsetX );
            $( '#outputMenuPanel' ).width( width );
            $( '#outputMenuPanel' ).height( height );
            // done panel positions
            
            // header dimensions
            width = ( width / 100 ) * self.panelPositions['headerWidth'];
            $( '#outputMenuPanelHeader' ).width( width );
            $( '#outputMenuPanelHeader' ).height( self.panelPositions['headerHeight'] );
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
            textTool.translate( 'imputMenu', translationIds, self.translateCallback );
        };
        self.translateCallback = function( result ){
            self.debug( 'translateCallback' );
            // loop over values
            $.each( result, function( index, value ) {
                self.debug( 'index: ' + index + ' value: '+ value );
                switch( index ) {
                    case 'result' : {
                        self.translations[index]["translation"] = value;
                        $( '#textTooloutputMenuHeader' ).html( value );
                        break;
                    }
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