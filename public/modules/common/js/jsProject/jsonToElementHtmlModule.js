/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: 
 * 
 * Last revision: 15-11-2016
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

( function( jsProject ){
    jsProject.jsonToElementHtmlModule = function( ) {

        // dataDivModule 
    
        // private
        var self = this;
        self.MODULE = 'jsonToElementHtmlModule';
        self.debugOn = false;
        self.closeElements = [
            'a',
            'div',
            'form',
            'svg',
            'iframe'
        ];
        self.properties = [
            'id',
            'name',
            'type',
            'value',
            'src',
            'href',
            'target',
            'method',
            'action',
            'title',
            'size',
            'cols',
            'rows',
            'width',
            'height',
            'maxlength',
            'rowspan',
            'colspan'
            
        ];
        self.styles = {
            'zIndex'            :   'z-index',  
            'position'          :   'position',  
            'float'             :   'float',  
            'clear'             :   'clear',  
            'top'               :   'top',  
            'left'              :   'left',  
            'display'           :   'display',  
            'overflow'          :   'overflow',  
            'overflowX'         :   'overflow-x',  
            'overflowY'         :   'overflow-y',  
            'cursor'            :   'cursor',  
            'background'        :   'background',
            'backgroundColor'   :   'background-color',
            'backgroundRepeat'  :   'background-repeat',
            'backgroundPosition':   'background-position',
            'backgroundSize'    :   'background-size',
            'color'             :   'color',
            'minimumWidth'      :   'min-width',
            'maximumWidth'      :   'max-width',
            'minimumHeight'     :   'min-height',
            'maximumHeight'     :   'max-height',
            'styleWidth'        :   'width',
            'styleHeight'       :   'height',
            'fontFamily'        :   'font-family',
            'fontSize'          :   'font-size',
            'lineHeight'        :   'line-height',
            'letterSpacing'     :   'letter-spacing',
            'fontWeight'        :   'font-weight',
            'textAlign'         :   'text-align',
            'verticalAlign'     :   'vertical-align',
            'margin'            :   'margin',
            'marginTop'         :   'margin-top',
            'marginLeft'        :   'margin-left',
            'marginRight'       :   'margin-right',
            'marginBottom'      :   'margin-bottom',
            'padding'           :   'padding',
            'paddingTop'        :   'padding-top',
            'paddingLeft'       :   'padding-left',
            'paddingRight'      :   'padding-right',
            'paddingBottom'     :   'padding-bottom',
            'imageUrl'          :   'background-image',
            'transformOrigin'   :   'transform-origin',
            'boxShadow'         :   'box-shadow'
        };
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to jsProject
            self.addApplicationsExtensions();

        };
        self.addApplicationsExtensions = function(){
            // add get element html
            jsProject.jsonToElementHtml = self.jsonToElementHtml;
            // add get element html
            jsProject.jsonIndexToCssIndex = self.jsonIndexToCssIndex;
        };
        self.jsonIndexToCssIndex = function( jsonIndex ) {
            // translate value
            return self.styles[jsonIndex];
        };
        self.jsonToElementHtml = function( options ) {
            var html = '';
            
            // element
            html += '<' + options['element'];
                html += self.addProperties( options );
                html += self.addStyle( options );
            html += '>';
            // done div header
                
            // text
            if( options['text'] ){
                html += options['text'];
            }
            // done text
            
            // close element
            if( self.closeElements.indexOf( options['element'] ) >= 0 ){
                html += '</' + options['element'] + '>';
            }
            
            return html;
        };
        self.addProperties = function( options ){
            var html = '';
            
            // add properties
            $.each( self.properties, function( index, value ) {
                if( options[value] !== undefined ){
                    html += ' ' + value + '="' + options[value]; 
                    if( typeof( options[value] ) === 'number' ){
                         html += 'px;';
                    }
                    html += '"';
                }
            } );
            // done add properties

            // read only
            if( options['readOnly'] ){
                html += ' readOnly '; 
            }
            // done read only

            // checked
            if( options['checked'] ){
                html += ' checked '; 
            }
            // done checked

            return html;
        };
        self.addStyle = function( options ){
            var html = '';
            // add style
            html += ' style="';
            
            // 
            $.each( self.styles, function( index, value ) {
                if( options[index] !== undefined ){
                    html += value + ' : ' + options[index];
                    if( typeof( options[index] ) === 'number' ){
                         html += 'px';
                    }
                    html += ';';
                }
            });
            html += self.addBorder( options );
            
            
            html += '"';
            
            // done add style
            
            return html;
        };
        self.addBorder = function( options ){
            var html = '';
            
            // border
            if( options['border'] !== undefined  ){
                html += ' border: ';
                html += self.getBorderHtml( options );
            }
            // top border
            if( options['borderTop'] !== undefined ){
                html += ' border-top: ';
                html += self.getBorderHtml( options );
            }
            // left border
            if( options['borderLeft'] !== undefined ){
                html += ' border-left: ';
                html += self.getBorderHtml( options );
            }
            // right border
            if( options['borderRight'] !== undefined ){
                html += ' border-right: ';
                html += self.getBorderHtml( options );
            }
            // bottom border
            if( options['borderBottom'] !== undefined ){
                html += ' border-bottom: ';
                html += self.getBorderHtml( options );
            }
            
            // bottom radius
            if( options['borderRadius'] !== undefined ){
                html += ' border-radius: ';
                html += options['borderRadius'];
                if( typeof( options['borderRadius'] === 'number' ) ){
//                     html += 'px;';
                }
                html += ';';
            }
            return html;
        };
        self.getBorderHtml = function( options ){
            var html = '';
            html += options['borderWidth'];
            if( typeof( options['borderWidth'] === 'number' ) ){
            //     html += 'px ';
            }
            html += ' ';
            html += options['borderColor'];
            html += ' ';
            html += options['borderStyle'];
            html += ';';
            
            return html;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );