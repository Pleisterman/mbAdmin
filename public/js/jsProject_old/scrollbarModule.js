/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:      this file controls scrollbars for the application
*               the scrollbar class will create the events: 
*               mouseEnter, mouseDown, mouseUp, mouseOut, mouseMove and click.
*               the scrollbar should be created with html:
*               div scrollbar
*                   div scrollbarLine
*                   div scollbarButton
*                   div scrollbarClickArea
*                   
*               when mouse over the scrollbar, Button and Line classes will be appended by 'Over'
*               when mouse out the className will be reset
*               when position changes the provided callback will be called with the 
*               percentage of the position relative to the width of the clickArea.
*               
* Last revision: 17-12-2014
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
    jsProject.scrollbarModule = function(  containerDiv, scrollbarDivId, direction, values, callback ) {
        /*
        *  module scrollbarModule 
        *   Purpose:    this file controls scrollbars for the application
        *               the scrollbar class will create the events: mouseenter, mouseout and click.
        *               when over the className will be appended by 'Over'
        *               when out the className will be reset
        *               the scrollbar subscribes to userActionChange event for application Modal Dialogs 
        *               when clicked the provided callback will be called.
        *   
        *  functions: 
        *      new:                     parameters: 
        *                                   scrollbarDivId (html div id), 
        *                                   direction: 'horizontal' , 'vertical'
        *                                   callback: callback function         
        *            
        *      private:
        *          construct:           parameters: ( void ) return: void
        *                               called by the class for initialization of the class
        *          debug:               parameters: ( string string ) return: void
        *                               calls the application.debug( string ) when self.DebugOn
        *          destruct:            parameters: ( void ) return: void
        *                               called by subscription to stopApplication event
        *                                       *       
        *  public: 
        *       enable         
        *       destruct           
        *       
        */
    
        // private
        var self = this;
        self.MODULE = 'scrollbarModule';
        self.debugOn = true;
        self.enabled = true;
        self.containerDiv = containerDiv;
        self.scrollbarDivId = scrollbarDivId;
        self.scrollbarClassName = $("#" + self.scrollbarDivId ).attr('class');
        self.scrollbarButtonClassName = $("#" + self.scrollbarDivId + "Button" ).attr('class');
        self.scrollbarLineClassName = $("#" + self.scrollbarDivId + "Line" ).attr('class');
        self.values = values;
        self.values['current'] = self.values['initial']
        self.clickChange = self.values['bigStep'];
        self.direction = direction;
        self.callback = callback;
        self.sliding = false;
        self.lastMousePosition = -1;
        self.minX = 16;
        self.maxX = 0;
        self.minY = 12;
        self.maxY = 0;
        self.construct = function() {
            self.debug( "construct" );
            self.debug( 'maximum' + '#' + self.scrollbarDivId + 'ClickArea'  );
            
            $( '#' + self.scrollbarDivId + 'ClickArea' ).mouseenter( function(event){ self.mouseEnter( event ); } );
            $( '#' + self.scrollbarDivId + 'ClickArea' ).mouseout( function(event){ self.mouseOut( event ); } );
            $( '#' + self.scrollbarDivId + 'ClickArea' ).mousedown( function(event){ self.mouseDown( event ); } );
            $( '#' + self.scrollbarDivId + 'ClickArea' ).click( function(event){ self.click( event ); } );
            
            self.maxX = $("#" + self.scrollbarDivId + "ClickArea" ).width() - 6;
            self.maxY = $("#" + self.scrollbarDivId + "ClickArea" ).height() - 27;
            
            self.setButtonPosition( );
            
            jsProject.subscribeToEvent( 'applicationStop', self.destruct );
        };
        self.enable = function( enable ) {
            self.debug( ' enable ' + enable );
            self.enabled = enable; 
            $( '#' + self.scrollbarDivId + 'Button' ).attr( 'class', self.scrollbarButtonClassName );
            $( '#' + self.scrollbarDivId + 'Line' ).attr( 'class',  self.scrollbarLineClassName );
        };
        self.mouseEnter = function( event ) {
            if( !self.enabled ) {
                return;
            }
            $( '#' + self.scrollbarDivId + 'Button' ).attr( 'class', self.scrollbarButtonClassName + 'Over' );
            $( '#' + self.scrollbarDivId + 'Line' ).attr( 'class',  self.scrollbarLineClassName + 'Over' );
        };
        self.mouseOut = function( event ) {
            if( !self.enabled ) {
                return;
            }
            if( self.sliding ) {
                return;
            }
            $( '#' + self.scrollbarDivId + 'Button' ).attr( 'class', self.scrollbarButtonClassName );
            $( '#' + self.scrollbarDivId + 'Line' ).attr( 'class',  self.scrollbarLineClassName );
        };
        self.mouseDown = function( event ) {
            self.debug( 'down' );
            if( !self.enabled ) {
                return;
            }
            switch( self.direction ){
                case 'horizontal' : {
                    var mousePosition = event.pageX - $( '#' + self.scrollbarDivId ).offset().left;
                    var buttonLeft = $( '#' + self.scrollbarDivId + 'Button' ).position().left - $( '#' + self.scrollbarDivId + 'ClickArea' ).position().left;
                    //self.debug( 'button left at:' + buttonLeft );
                    if( mousePosition >= buttonLeft && 
                        mousePosition <= buttonLeft + $( '#' + self.scrollbarDivId + 'Button' ).width() ) {
                        self.debug( 'sliding' );
                        self.startSliding();
                        self.lastMousePosition = event.pageX;
                    }    
                    break;
                }
/*                
                case 'vertical' : {
                    var mousePosition = event.pageY - $( '#' + self.scrollbarDivId ).offset().top;
                    var buttonTop = $( '#' + self.scrollbarDivId + 'Button' ).position().top - $( '#' + self.scrollbarDivId ).offset().top;
                    if( mousePosition >= buttonTop && 
                        mousePosition <= buttonTop + $( '#' + self.scrollbarDivId + 'Button' ).height() ) {
                        self.sliding = true;
                        self.lastMousePosition = event.pageY;
                    }    
                    break;
                }
*/
                default : {
                    self.debug( 'scrollbar direction unknown' );
                }
            }
        };
        self.mouseMove = function( event ) {
            self.debug( 'move' );
            if( !self.enabled ) {
                return;
            }
            if( self.sliding ) {
                switch( self.direction ){
                    case 'horizontal' : {
                        var mouseChange = event.pageX - parseInt( self.lastMousePosition );
                        self.changeValue( mouseChange * self.values["step"] )
                        self.lastMousePosition = event.pageX;
                        break;
                    }
/*                    
                    case 'vertical' : {
                        var mouseChange = event.pageY - self.lastMousePosition;
                        var buttonTop = $( '#' + self.scrollbarDivId + 'Button' ).position().top;
                            buttonTop -= $( '#' + self.scrollbarDivId + 'ClickArea' ).position().top;
                            buttonTop += mouseChange;    
                        if( buttonTop < self.minY ) {
                            buttonTop = self.minY;
                        }    
                        if( buttonTop > self.maxY ) {
                            buttonTop = self.maxY;
                        }    
                        $( '#' + self.scrollbarDivId + 'Button' ).css( 'top', buttonTop );
                        self.lastMousePosition = event.pageY;
                        break;
                    }
*/                    
                    default : {
                        self.debug( 'scrollbar direction unknown' );
                    }
                }
            }
        };
        self.mouseUp = function( event ) {
            self.debug( 'up' );
            if( !self.enabled ) {
                return;
            }
            self.endSliding();
            self.clickaftersliding = true;
        };
        self.click = function( event ) {
            if( !self.enabled ) {
                return;
            }
            if( self.clickaftersliding ) {
                self.clickaftersliding = false;
                return;
            }
            switch( self.direction ){
                case 'horizontal' : {
                        
                    var buttonLeft = $( '#' + self.scrollbarDivId + 'Button' ).position().left;
                    var mouseLeft = event.pageX - $( '#' + self.containerDiv ).position().left;
                    if( mouseLeft < buttonLeft ) {
                        self.debug( 'down' + mouseLeft )
                        self.changeValue( -self.clickChange );    
                    }
                    if( mouseLeft > buttonLeft ) {
                        self.debug( 'úp' )
                        self.changeValue( self.clickChange );    
                    }
                    break;
                }
/*                
                case 'vertical' : {
                    var buttonTop = event.pageY - $( '#' + self.scrollbarDivId + 'ClickArea' ).position().top;
                        buttonTop -= $( '#' + self.scrollbarDivId + 'Button' ).height() / 2;    
                    if( buttonTop < self.minY ) {
                        buttonTop = self.minY;
                    }    
                    if( buttonTop > self.maxY ) {
                        buttonTop = self.maxY;
                    }    
                    $( '#' + self.scrollbarDivId + 'Button' ).css( 'top', buttonTop );
                    break;
                }
*/
                default : {
                    self.debug( 'scrollbar direction unknown' );
                }
            }
        };
        self.startSliding = function() {
            self.sliding = true;
            $( document ).mousemove( function(event){ self.mouseMove( event ); } );
            $( document ).mouseup( function(event){ self.mouseUp( event ); } );
            $( '#' + self.scrollbarDivId + 'ClickArea' ).off( 'click' );
            self.debug( 'ok' );
        };
        self.endSliding = function() {
            $( document ).off( 'mousemove' );
            $( document ).off( 'mouseup' );
            $( '#' + self.scrollbarDivId + 'ClickArea' ).click( function(event){ self.click( event ); } );
        };
        self.changeValue = function( change ) {
            self.debug( 'change:' + change );
            self.values['current'] += change;
            if( self.values['current'] < self.values['minimum'] ){
                self.values['current'] = self.values['minimum']
            }
            if( self.values['current'] > self.values['maximum'] ){
                self.values['current'] = self.values['maximum']
            }
            self.setButtonPosition();
            self.callback( self.values['current'] );
        };
        self.setValue = function( value ) {
            self.debug( 'setValue:' + value );
            self.values['current'] = value;
            if( self.values['current'] < self.values['minimum'] ){
                self.values['current'] = self.values['minimum']
            }
            if( self.values['current'] > self.values['maximum'] ){
                self.values['current'] = self.values['maximum']
            }
            self.setButtonPosition();
        };
        self.setButtonPosition = function( ) {
            switch( self.direction ){
                case 'horizontal' : {
                    var areaWidth = $( '#' + self.scrollbarDivId + 'ClickArea' ).width();
                    var range = self.values['maximum'] - self.values['minimum'];
                    var percentage = ( self.values['current'] / range ) * 100 ;
                    var buttonLeft = ( areaWidth / 100 ) * percentage;
                    if( buttonLeft < self.minX ) {
                        buttonLeft = self.minX;
                    }    
                    if( buttonLeft > self.maxX ) {
                        buttonLeft = self.maxX;
                    }    
                    $( '#' + self.scrollbarDivId + 'Button' ).css( 'left', buttonLeft );
                    break;
                }
/*                
                case 'vertical' : {
                    var areaHeight = $( '#' + self.scrollbarDivId + 'ClickArea' ).height();
                        areaHeight -= $( '#' + self.scrollbarDivId + 'Button' ).height() / 2;
                    var buttonTop = ( areaHeight * positionPercentage ) / 100;
                    if( buttonTop < self.minY ) {
                        buttonTop = self.minY;
                    }    
                    if( buttonTop > self.maxY ) {
                        buttonTop = self.maxY;
                    }    
                    self.debug( 'buttonTop:' + buttonTop );
                    $( '#' + self.scrollbarDivId + 'Button' ).css( 'top', buttonTop );
                    break;
                }
*/                
                default : {
                    self.debug( 'scrollbar direction unknown' );
                }
            }
            
        };
        // debug 
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ' ' + string );
            }
        };
        // delete the class 
        self.destruct = function() {
            self.debug( 'destruct' );
            
            // remove the events
            $("#" + self.scrollbarDivId ).off();
            
            self = null;  
        };

        // initialize the class 
        self.construct();

        // public
        return {
            enable : function( enable ) {
                self.enable( enable );
            },
            setValue : function( value ) {
                self.setValue( value );
            },
            destruct : function( ) {
                self.destruct( );
            }
        };
    };
})( jsProject );