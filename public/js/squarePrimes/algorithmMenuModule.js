/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module handles the layout for the application squarePrimes 
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

( function( squarePrimes ){
    squarePrimes.algorithmMenuModule = function( panelId ) {


    /*
     *  module algorithmMenuModule 
     *  purpose:
     *   this module controls algorithmMenuModule for the squarePrimes.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'algorithmMenuModule';
        self.debugOn = true;
        self.panelId = panelId;
        self.headers = [ {    "language" : "en_US",
                              "menuText" : "Algorithm" },
                         {    "language" : "nl_NL",
                              "menuText" : "Algoritme" } ];
                              
        self.algorithms = [  { "id" :"leftRight", 
                               "en_US" : "Horizontal<br> Left to Right", 
                               "nl_NL" : "Horizontaal<br> Links naar Rechts" },
                             { "id" :"rightLeft", 
                               "en_US" : "Horizontal<br> Right to Left", 
                               "nl_NL" : "Horizontaal<br> Rechts naar Links" },
                             { "id" :"topBottom", 
                               "en_US" : "Horizontal<br> Top to Bottom", 
                               "nl_NL" : "Horizontaal<br> Boven naar Beneden" },
                             { "id" :"bottomTop", 
                               "en_US" : "Horizontal<br> Bottom to Top", 
                               "nl_NL" : "Horizontaal<br> Beneden naar boven" } ];
        // functions
        self.construct = function() {
            var language = squarePrimes.getLanguage();
            self.debug( 'construct: language=' + language );
            var html = '';
            html += '<div class="btn btn-success" ';
                html += ' style="';
                    html += ' border: black 0px groove;width:80%;margin-left:10%;margin-top:10px;';
                    html += 'padding:10px;text-align:center;color:black;font-weight:bold;';
                html += ' " ';
            html += '>';
                html += '<span id="algorithmsHeaderLabel">';
                    $.each( self.headers, function( index, value ) {
                        if( value['language'] === language ){
                            html += self.headers[index]['menuText'];
                        }
                    });
                html += '</span>';
                html += '<br>';
                html += '<span id="selectedAlgorithm">'; 
                    var algorithm = jsProject.getValue( "selectedAlgorithm","menuOption" );
                    $.each( self.algorithms, function( index, value ) {
                        self.debug( 'index: ' + index + ' value: ' + value );
                        if( value['id'] === algorithm ){
                            html += value[language];
                        }
                    });
                html += '</span>';
            html += '</div>';
            $( '#' + self.panelId ).append( html );
            
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
})( squarePrimes );