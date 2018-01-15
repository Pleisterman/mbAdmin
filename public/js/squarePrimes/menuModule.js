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
    squarePrimes.menuModule = function( ) {


    /*
     *  module menuModule 
     *  purpose:
     *   this module controls menuModule for the squarePrimes.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'menuModule';
        self.debugOn = true;
        self.html = '';
        self.panelPositionId = 'middleLeft';
        self.algorithmMenu = null;
        // functions
        self.construct = function() {
            self.debug( 'construct' );

            self.addHtml();
        };
        self.addHtml = function() {
            // create html
            
            self.addAlgorithmMenu();
            self.addRowsEdit();
            self.addColumnsEdit();
            self.addStartWithEdit();
            
            $( '#' + self.panelPositionId ).append( self.html );
        };
        self.addAlgorithmMenu = function() {
            self.algorithmMenu = new squarePrimes.algorithmMenuModule( self.panelPositionId );
        };
        self.addRowsEdit = function() {
            // rows edit
                
            self.html += '<div class="roundedBorder" ';
                self.html += ' style="';
                    self.html += ' border: black 1px groove;width:80%;margin-left:10%;margin-top:10px;';
                    self.html += 'padding:10px;text-align:center;background-color:rgb(92, 184, 92);';
                self.html += ' " ';
            self.html += '>';

                // input
                self.html += '<input class="roundedBorder" type="text" ';
                    self.html += ' style="';
                        self.html += 'font-size:1.1em;font-weight:bold;margin:0px;';
                        self.html += 'float:right;padding:1px;padding-right:4px;text-align:right;margin-left:8px;width:40px;';
                    self.html += ' " ';
                    self.html += ' id="" value="' + jsProject.getValue( 'rows', 'menuOption' ) + '"';
                self.html += '>';
                // done input
                // label
                self.html += '<span ';
                    self.html += ' style="font-size:1.1em;font-weight:bold;color:black"';
                self.html += '>';
                    self.html += 'Rijen: ';
                self.html += '</span>';
                // done label
            self.html += '</div>';
            // done rows edit
        };
        self.addColumnsEdit = function() {
            self.html += '<div class="roundedBorder" ';
                self.html += ' style="';
                    self.html += ' border: black 0px groove;width:80%;margin-left:10%;margin-top:10px;';
                    self.html += 'padding:10px;text-align:center;background-color:rgb(92, 184, 92);';
                self.html += ' " ';
            self.html += '>';
                // input
                self.html += '<input class="roundedBorder" type="text" ';
                    self.html += ' style="';
                        self.html += 'font-size:1.1em;font-weight:bold;margin:0px;';
                        self.html += 'float:right;padding:1px;padding-right:4px;text-align:right;margin-left:8px;width:40px;';
                    self.html += ' " ';
                    self.html += ' id="" value="' + jsProject.getValue( 'columns', 'menuOption' ) + '"';
                self.html += '>';
                // done input
                // label
                self.html += '<span ';
                    self.html += ' style="font-size:1.1em;font-weight:bold;color:black"';
                self.html += '>';
                    self.html += 'Kolommen: ';
                self.html += '</span>';
                // done label
            self.html += '</div>';
            // done rows edit
        };
        self.addStartWithEdit = function() {
            self.html += '<div class="roundedBorder" ';
                self.html += ' style="';
                    self.html += ' border: black 0px groove;width:80%;margin-left:10%;margin-top:10px;';
                    self.html += 'padding:10px;text-align:center;background-color:rgb(92, 184, 92);';
                self.html += ' " ';
            self.html += '>';
                // input
                self.html += '<input class="roundedBorder" type="text" ';
                    self.html += ' style="';
                        self.html += 'font-size:1.1em;font-weight:bold;margin:0px;';
                        self.html += 'float:right;padding:1px;padding-right:4px;text-align:right;margin-left:8px;width:40px;';
                    self.html += ' " ';
                    self.html += ' id="" value="' + jsProject.getValue( 'startWith', 'menuOption' ) + '"';
                self.html += '>';
                // done input
                // label
                self.html += '<span ';
                    self.html += ' style="font-size:1.1em;font-weight:bold;color:black"';
                self.html += '>';
                    self.html += 'Start met: ';
                self.html += '</span>';
                // done label
            self.html += '</div>';
            // done rows edit
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