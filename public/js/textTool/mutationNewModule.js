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
    textTool.mutationNewModule = function( ) {


    /*
     *  module mutationNewModule 
     *  purpose:
     *   this module controls mutationNewModule for the textTool.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'mutationNewModule';
        self.debugOn = true;
        
        self.positions = { "width" : 40,                                       // percentage of window width
                           "maxWidth" : 420,                                   // px
                           "offsetTop" : 20 };                                 // percentage of window height
        
        self.translations = { 'textToolMutationNewHeader' : { "translation" : 'Nieuwe bewerking maken' } };                            
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            //self.addHtml();
            
            // subscribe to events
            jsProject.subscribeToEvent( 'languageChange', self.translate );
            jsProject.subscribeToEvent( 'mutationNew', self.addHtml );

            // translate 
            self.translate();
        };
        self.addHtml = function() {
            // create html
            var html = '';
            // input panel
            html += '<div id="mutationNewDialog" class="panel panel-default" ';
                html += ' style="position:absolute;border: black 0px groove;" ';
            html += '>';
                // header
                html += '<div id="mutationNewHeader"';
                    html += ' class="panel-heading"';
                html += '>';
                    html += self.translations['textToolMutationNewHeader']['translation'];
                html += '</div>';
                // done header

                    html += '<div class="panel-body">';
                    
                    html += '<span class="label label-default">';
                        html += 'doe:';
                    html += '</span>';
                    html += '<span>';
                        html += '<select size="1">';
                            html += '<option value="1">Voeg toe</option>';
                            html += '<option selected value="2">Verwijder</option>';
                            html += '<option value="3">Vervang</option>';
                        html += '</select>';
                        
                    html += '</span>';
                    html += '<br>';
                    html += '<span class="label label-default">';
                        html += 'wat:';
                    html += '</span>'; 
                    html += '<span>';
                        html += '<select size="1">';
                            html += '<option selected value="1">Invoer:</option>';
                            html += '<option value="2">Regel nr.</option>';
                        html += '</select>';
                    html += '</span>';
                        
                    html += '<br>';
                    html += '<span class="label label-default">';
                        html += 'waar:';
                    html += '</span>'; 
                    html += '<span>';
                        html += '<select size="1">';
                            html += '<option selected value="1">Overal</option>';
                            html += '<option value="2">Voor Invoer:</option>';
                            html += '<option value="3">Na Invoer:</option>';
                            html += '<option value="4">Begin van een regel.</option>';
                            html += '<option value="5">Eind van een regel</option>';
                        html += '</select>';
                    html += '</span>';
                    html += '<br>';
                    html += '<span class="label label-default">';
                        html += 'hoe vaak:';
                    html += '</span>'; 
                    html += '<span>';
                        html += '<select size="1">';
                            html += '<option selected value="1">Alles</option>';
                            html += '<option value="2">Aantal:</option>';
                            html += '<option value="3">Aantal per regel.</option>';
                        html += '</select>';
                    html += '</span>';
                    html += '<br>';
                        html += '<div id="combineer" style="margin-top:30px;" class="btn btn-primary">';
                            html += 'combinatie maken.';
                        html += '</div>'; 
                    html += '<br>';
                    html += '<br>';
                
                        html += '<div id="close" style="float:right;margin-top:30px;" class="btn btn-success">';
                            html += 'ok';
                        html += '</div>'; 
                    html += '</div>'; 
            
            html += '</div>'; 
            // done output panel
            // done input panel
            $( '#mutationDialog' ).html( html );
            $( '#mutationDialog' ).show();
            self.visible = true;
            self.layoutChange();
        };
        self.layoutChange = function() {
            if( !self.visible ){
                return;
            }
            //self.debug( 'layoutChange' );
            var width = ( $( '#mutationDialog' ).width() / 100 ) * self.positions['width'];
            if( width > self.positions['maxWidth'] ){
                width = self.positions['maxWidth'];
            }
            var offsetX = ( $( '#mutationDialog' ).width() - width ) / 2;
            var height = $( '#mutationNewDialog').height();
            //self.debug( 'height: ' + height );
            
            var offsetY = ( $( '#mutationDialog' ).height() - height ) / 2;
            $( '#mutationNewDialog' ).css( 'top', offsetY );
            $( '#mutationNewDialog' ).css(  'left', offsetX );
            $( '#mutationNewDialog' ).width( width );
            
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
                    case 'textToolMutationNewHeader' : {
                        if( self.visible ){
                            $( '#mutationNewHeader' ).html( value );
                        }
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