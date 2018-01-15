/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this file controls the popUpMenu for the application pleisterman fretBoard Slider
*               
* Last revision: 21-12-2014
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
    jsProject.popUpMenuModule = function(  buttonDivName, menuDivName, modal, clickCallback, itemOverChangeCallback  ) {
        /*
        *   module popUpMenuModule 
        *   Purpose:    
        *   
        *       
        */
    
        // private
        var self = this;
        self.MODULE = 'popUpMenuModule';
        self.debugOn = false;
        
        self.modal = modal;
        self.status = 'closed';
        self.buttonDivName = buttonDivName;
        self.buttonDivClassName = '';
        self.menuDivName = menuDivName;
        self.menuItemClass = '';
        self.menuHeight = 0;
        self.animationDuration = 500;
        self.animationEasing = 'swing';
        self.delay = 30;
        self.timer = null;
        self.enabled = true;
        self.mouseIsOverDivs = false;
        self.mouseWasOverDivs = false;
        self.clickCallback = clickCallback;        
        self.itemOverChangeCallback = itemOverChangeCallback;        
        
        // functions
        self.construct = function() {
            self.debug('construct'  );
            self.menuHeight = $("#" + self.menuDivName ).height();
            self.debug('menu is:' + self.buttonDivName  );
            $("#" + self.menuDivName ).hide();
            $("#" + self.buttonDivName ).mouseover( function(){ self.buttonOver($(this)); } );
            $("#" + self.buttonDivName ).mouseout( function(){ self.buttonOut($(this)); } );
            self.buttonDivClassName = $( "#" + self.buttonDivName ).attr('class');
            $("#" + self.menuDivName ).mouseover( function(){ self.menuOver(); } );
            $("#" + self.menuDivName ).mouseout( function(){ self.menuOut(); } );
            $("#" + self.menuDivName ).children("div").each( function() {
                self.menuItemClass = $(this).attr('class');
                $(this).mouseover(  function(){ self.menuItemOver($(this)); } );
                $(this).mouseout(  function(){ self.menuItemOut($(this)); } );
                $(this).click( function() { self.menuItemClick($(this)); } );
            }); 
            self.debug('menu ' + self.menuDivName + ' initialized' );
        };
        self.destruct = function() {
            if( self.timer !== null ) {
                clearTimeout(self.timer);
            }
            self.debug( 'menu ' + self.menuDivName + ' destuct' );
            $("#" + self.buttonDivName ).off( );
            $("#" + self.menuDivName ).off( );
            $("#" + self.menuDivName ).children("div").each( function() {
                $(this).off( );
            });         
        };
        self.enable = function( enable ) {
            self.debug( 'button ' + self.buttonDivName + ' enable:' + enable );
            self.enabled = enable;
            if( !self.enabled ) {
                if( self.timer !== null ) {
                    clearTimeout(self.timer);
                    self.status = 'closed';
                    $("#" + self.buttonDivName ).attr('class', self.buttonDivName ); 
                    $("#" + self.menuDivName).height(self.menuHeight);
                    $("#" + self.menuDivName).hide();
                }
            }
        };
        self.buttonOver = function( element ) {
            self.debug( 'button over' );
            if( !self.enabled ) {
                return;
            }
            self.mouseIsOverDivs = true;
            self.mouseWasOverDivs = true;
            element.attr('class',  self.buttonDivClassName + 'Over' ); 
            self.animate(true);
            if( self.itemOverChangeCallback ){
                self.itemOverChangeCallback();
            }
        };
        self.buttonOut = function( element) {
            self.debug( 'button out' );
            if( !self.enabled ) {
                return;
            }
            element.attr('class',  self.buttonDivClassName ); 
            self.mouseIsOverDivs = false;
        };        
        self.menuOver = function( element ) {
            self.debug( 'menu over' );
            if( !self.enabled ) {
                return;
            }
            self.mouseWasOverDivs = true;
            self.mouseIsOverDivs = true;
            self.animate(true);
            if( self.itemOverChangeCallback ){
                self.itemOverChangeCallback();
            }
        };
        self.menuOut = function( element ) {
            self.debug( 'menu out' );
            if( !self.enabled ) {
                return;
            }
            self.mouseIsOverDivs = false;
        };
        self.menuItemOver = function( element ) {
            self.debug( 'menu item over' );
            if( !self.enabled ) {
                return;
            }
            element.attr('class', self.menuItemClass + 'Over' ); 
            if( self.itemOverChangeCallback ){
                self.itemOverChangeCallback();
            }
        };
        self.menuItemOut = function( element ) {
            self.debug( 'menu item out' );
            if( !self.enabled ) {
                return;
            }
            element.attr('class', self.menuItemClass ); 
        };
        self.menuItemClick = function( element ) {
            if( !self.enabled ) {
                return;
            }
            if( self.timer !== null ) {
                clearTimeout(self.timer);
            }
            $("#" + self.menuDivName).stop();
            self.status = 'closed';
            $("#" + self.buttonDivName ).attr('class',  self.buttonDivClassName ); 
            $("#" + self.menuDivName).height(self.menuHeight);
            $("#" + self.menuDivName).hide();
            self.clickCallback( element.attr('value'), element.html() );
        };
        self.timeOut = function( ) {
            clearTimeout(self.timer);
            if( !self.mouseIsOverDivs && !self.mouseWasOverDivs ){
                self.animate( false );
            }
            self.mouseWasOverDivs = false;

            self.timer = setTimeout( function () { self.timeOut(); }, self.delay );
        };
        self.animate = function( open ) {
            if( open && ( self.status === 'opening' || self.status === 'opened' ) ) {
                self.debug( 'open no action:' + self.status );
                return;
            }
            if( !open && ( self.status === 'closing' || self.status === 'closed' ) ) {
                self.debug( 'close no action' );
                return;
            }

            if( self.timer !== null ) {
                clearTimeout(self.timer);
            }
            if( open ) {
                if( self.status === 'closed' ) {
                    $("#" + self.menuDivName).stop();
                    self.status = 'opening';
                    self.debug( 'animate opening from closed' );
                    $("#" + self.menuDivName).show();
                    $("#" + self.menuDivName).height(0);
                    $("#" + self.menuDivName).animate({ height: self.menuHeight}, {
                                                        duration: self.animationDuration,
                                                        easing: self.animationEasing,
                                                        complete: function() { self.opened(); } });
                }
                if( self.status === 'closing' ) {
                    $("#" + self.menuDivName).stop();
                    self.status = 'opening';
                    self.debug( 'animate opening from closing' );
                    $("#" + self.menuDivName).show();
                    var height = $("#" + self.menuDivName).height();
                    self.debug( 'height:' + height );
                    $("#" + self.menuDivName).height(height);
                    $("#" + self.menuDivName).animate({ height: self.menuHeight}, {
                                                        duration: self.animationDuration, 
                                                        easing: self.animationEasing,
                                                        complete: function() { self.opened(); } });
                }
            }
            else {
                if( self.status === 'opened' ) {
                    $("#" + self.menuDivName).stop();
                    self.status = 'closing';
                    self.debug( 'animate closing from opened');
                    $("#" + self.menuDivName).animate({ height: 0 }, {
                                                        duration: self.animationDuration,
                                                        easing: self.animationEasing,
                                                        complete: function() { self.closed(); } });
                }
                if( self.status === 'opening' ) {
                    $("#" + self.menuDivName).stop();
                    self.status = 'closing';
                    self.debug( 'animate closing from opening ');
                    $("#" + self.menuDivName).animate({ height: 0 }, {
                                                        duration: self.animationDuration,
                                                        easing: self.animationEasing,
                                                        complete: function() { self.closed(); } });
                }
            }

            self.timer = setTimeout( function () { self.timeOut(); }, self.delay );
        };
        self.opened = function( ) {
            self.debug( 'opened ');
            self.status = 'opened';
        };
        self.closed = function( ) {
            if( self.timer !== null ) {
                clearTimeout(self.timer);
            }
            self.debug( 'closed ');
            self.status = 'closed';
            $("#" + self.buttonDivName).attr('class',  self.buttonDivClassName ); 
            $("#" + self.menuDivName).hide();
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };
        self.destruct = function() {
            self.debug( 'destruct' );
        };

        // initialize the module 
        self.construct();

        // public
        return {
            enable : function( enable ) {
                self.enable( enable );
            },
            destruct : function( ) {
                self.destruct( );
            }
        };
    };
})( jsProject );