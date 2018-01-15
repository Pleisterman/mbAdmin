/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:  this module controls the debugEvents for the application 
*           the debugModule will add a div with id 'jsProjectDebugDiv' 
*           and z-index  > scene + messagebox
*           and prepend messages to the div.
* Last revision: 04-11-2014
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2014  Pleisterman
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
    jsProject.debugModule = function( zIndex, debugOn ) {
        /*
        *   module debugModule 
        *   purpose:
        *               the debugModule will add a div to the body that will
        *               dispay debug messages.  
        *   
        *   functions: 
        *       private:
        *           construct:  parameters: ( void ) return: void
        *                       called by the module for initialization of the module
        *           debug:      parameters: ( string ) return void
        *                       the function will prepend the string to the div 
        *                       created by the construct function
        *   
        *      
        */

        // private
        var self = this;
        self.debugOn = true;
        self.MODULE = 'debugModule';
        self.debugApplication = debugOn;
        self.zIndex = zIndex;
        self.top = 20;
        self.left = 1350;
        self.width = 510;
        self.height = 110;
        
        // functions
        self.construct = function(){
            // create the css
            var css = '';
            css += '<style>';
                css += ' .jsProjectDebugDiv { ' + "\n";
                css += '    -webkit-user-select: none; ' + "\n";
                css += '    -khtml-user-select: none; ' + "\n";
                css += '    -moz-user-select: none; ' + "\n";
                css += '    -ms-user-select: none; ' + "\n";
                css += '    user-select: none; ' + "\n";
                css += '    display: block; ' + "\n";
                css += '    position: absolute; ' + "\n";
                css += '    top: ' +  self.top + 'px; ' + "\n";
                css += '    left: ' +  self.left + 'px; ' + "\n";
                css += '    background-color: white; ' + "\n";
                css += '    border: lightblue 1px groove; ' + "\n";
                css += '    border-radius: 5px; ' + "\n";
                css += '    z-index: ' +  self.zIndex + '; ' + "\n";
                css += '  }' + "\n" + "\n";
                
                css += ' .jsProjectDebugDivDragHandle { ' + "\n";
                css += '    background-color: green; ' + "\n";
                css += '  }' + "\n" + "\n";

                css += ' .jsProjectDebugDivDragHandleOver { ' + "\n";
                css += '    background-color: lightgreen; ' + "\n";
                css += '  }' + "\n" + "\n";
                
                css += ' .jsProjectDebugDivDragHandleDisabled { ' + "\n";
                css += '    background-color: grey; ' + "\n";
                css += '  }' + "\n" + "\n";

                css += ' .jsProjectDebugDivContent { ' + "\n";
                css += '    overflow: auto; ' + "\n";
                css += '    padding: 10px; ' + "\n";
                css += '    width: ' +  self.width + 'px; ' + "\n";
                css += '    height: ' +  self.height + 'px; ' + "\n";
                css += '    background-color: white; ' + "\n";
                css += '    color: black; ' + "\n";
                css += '  }' + "\n" + "\n";
            css += '</style>';
            var html = '';
            html += '<div id="jsProjectDebugDiv" class="jsProjectDebugDiv">';
                html += '<div id="jsProjectDebugDivDragHandle" class="jsProjectDebugDivDragHandle"';
                    html += ' style="width: 100%;height: 20px;"';
                html += '>';
                
                html += '</div>';
                html += '<div id="jsProjectDebugDivContent" class="jsProjectDebugDivContent">';

                html += '</div>';
            html += '</div>';
            $( document.body ).append( html );
            
            
            // add css to div
            $( css ).appendTo( $( '#jsProjectDebugDiv' ) );

            // add functions to application 
            jsProject.debug = self.debug;
            
                // add the drag events
            // store the className of the button div element
            self.handleClassName = $("#jsProjectDebugDivDragHandle" ).attr( 'class' );
            $("#jsProjectDebugDivDragHandle" ).mouseenter( function( ){ self.enter(); } );
            $("#jsProjectDebugDivDragHandle" ).mouseout( function(){ self.out(); } );
            $("#jsProjectDebugDivDragHandle" ).mousedown( function( event ){ self.down( event ); } );
        };
        self.enter = function( ) {
            //self.debug( ' over');
            
            $("#jsProjectDebugDivDragHandle" ).attr('class', 'jsProjectDebugDivDragHandleOver' ); 
        };
        self.out = function( ) {
            //self.debug( ' out' );
            
            $("#jsProjectDebugDivDragHandle" ).attr('class', 'jsProjectDebugDivDragHandle' ); 
        };
        self.down = function( event ) {
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
                $( '#jsProjectDebugDivContent' ).prepend( message + '<br/>' );
            }
        }
        
        // if required construct the module User Interface
        if( self.debugApplication ) {
            self.construct();
        }
        else {
            // add functions to application 
            jsProject.debug = function( string ){};
        }
    };
    
})( jsProject );


