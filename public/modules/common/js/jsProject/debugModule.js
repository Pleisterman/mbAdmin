/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
* 
* Purpose:  this module displays debug info for the application.
*           
* Usage:    call jsProject.debugOn( true, zIndex );
*           the module will add a dragable window on the screen with the provided zIndex.
*           the module adds the function debug to the jsProject module
*           jsProject.debug( string message );
*           will prepend the provided message to the debug window
*           
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
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

( function( jsProject ){
    jsProject.debugModule = function( options ) {

        // debugModule

        // private
        var self = this;
        self.debugOn = true;
        self.MODULE = 'debugModule';
        self.options = options;
        self.lineCounter = 0;
        
        // functions
        self.construct = function(){

            // create the html for the window
            var html = '';
            // debug div
            html += '<div id="jsProjectDebugDiv" ';
                html += 'style="';
                    html += ' position:absolute; ';
                    html += ' top: ' + self.options['top'] + 'px; ';
                    html += ' left: ' + self.options['left'] + 'px;';
                    html += ' z-index: ' + self.options['zIndex'] + ';';
                    html += ' border: lightblue 1px groove; ';
                    html += ' border-radius: 5px; ';
                html += '"';
            html += '>';
                // drag handle
                html += '<div id="jsProjectDebugDivDragHandle" ';
                    html += 'style="';
                        html += ' width:100%; ';
                        html += ' height:20px; ';
                        html += ' background-color:green; ';
                    html += '"';
                html += '>';
                
                html += '</div>';
                html += '<div id="jsProjectDebugDivContent" ';
                    html += 'style="';
                        html += ' overflow: auto; ';
                        html += ' width: ' + self.options['width'] + 'px; ';
                        html += ' height: ' + self.options['height'] + 'px;';
                        html += ' background-color:black;color:white; ';
                    html += '"';
                html += '>';

                html += '</div>';
            html += '</div>';
            // done debug div
            $( document.body ).append( html );
            

            // add functions to application 
            jsProject.debug = self.debug;
            
                // add the drag events
            // store the className of the button div element
            $("#jsProjectDebugDivDragHandle" ).mouseenter( function( ){ self.dragHandleMouseIn(); } );
            $("#jsProjectDebugDivDragHandle" ).mouseout( function(){ self.dragHandleMouseOut(); } );
            $("#jsProjectDebugDivDragHandle" ).mousedown( function( event ){ self.dragHandleMouseClick( event ); } );
        };
        self.dragHandleMouseIn = function( ) {
            //self.debug( ' over');
            $("#jsProjectDebugDivDragHandle" ).css('background-color', 'lightgreen' ); 
        };
        self.dragHandleMouseOut = function( ) {
            //self.debug( ' out' );
            $("#jsProjectDebugDivDragHandle" ).css('background-color', 'green' ); 
        };
        self.dragHandleMouseClick = function( event ) {
            //self.debug( ' down' );
            self.lastPosition = { 'x' : event.pageX, 'y' : event.pageY };
            
            $(document).on( 'mousemove', function( event ) { self.move( event ); } );
            $(document).on( 'mouseup', function( event ) { self.up( event ); } );
        };
        self.move = function( event ) {
            //self.debug( ' move' );
            self.positionChange = { 'x' : 0, 'y' : 0 };
            self.positionChange['y'] = self.lastPosition['y'] - event.pageY;
            self.positionChange['x'] = self.lastPosition['x'] - event.pageX;
            var newTop = parseFloat( $('#jsProjectDebugDiv').offset().top ) - parseFloat( self.positionChange['y'] ),
                newLeft = parseFloat( $('#jsProjectDebugDiv').offset().left ) - parseFloat( self.positionChange['x'] );
            if( newTop < 0 ){
                newTop = 0;
            } 
            if( newLeft < 0 ){
                newLeft = 0;
            } 
            
            $( '#jsProjectDebugDiv' ).css( 'top', newTop );
            $( '#jsProjectDebugDiv' ).css( 'left', newLeft );
            self.lastPosition = { 'x' : event.pageX, 'y' : event.pageY };
        }; 
        self.up = function( event ) { 
            //self.debug( ' up' );
            $(document).off('mousemove');
            $(document).off('mouseup');
        }; 
        self.debug = function( message ){
            // function prepends the message to the div
            if( self.debugOn ) {
                $( '#jsProjectDebugDivContent' ).prepend( jsProject.pad( self.lineCounter, '0', 2 ) + '-' + message + '<br/>' );
                self.lineCounter++;
                self.lineCounter %= 10; 
            }
        };
        
        // initialize the class
        self.construct();
    };
    
})( jsProject );


