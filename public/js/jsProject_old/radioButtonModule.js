/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this file controls the radioButtonModule for the application pleisterman Guitar Slider
* Last revision: 26-08-2014
* 
* NOTICE OF LICENSE
*
* All of the material on this site is protected by copyright 
* only code that is explicitly made available for copying may be 
* copied without permission. 
* 
* Where code is made available to be copied all of the conditions 
* within the existing or modified code as well as the conditions on the page 
* where you found it must be observed when you use the code on your site.
* 
*/



( function( jsProject ){
    jsProject.radioButtonModule = function( defaultValue, radioButtonDivName, clickCallback, itemOverChangeCallback ) {


    /*
     *  class radioButtonModule 
     *  purpose:
     *   this class controls radioButtonModule for the jsProject.
     *   
     *  functions: 
 *      initialize: parameters: (htmlElement (button div) Name), (htmlElement (menu div) Name), (click callback function), 
 *      ( previous callback optional button ), ( next callback ( optional button) )
 *      ( topprevious callback optional button ), ( topnext callback ( optional button) )
 *      ( bottomprevious callback optional button ), ( bottomnext callback ( optional button) )
 *      returns: void
 *      enable: parameters: (bool enable) returns: void
 *      destruct: parameters: (void) returns: void ( delete off all objects and events )
 *  events: 
 *      buttonover:   will add Over to the css className of the button divs
 *      buttonout:    will set className to initial css className of the button divs
 *      menuover:   will add Over to the css className of the menu div
 *      menuout:    will set className to initial css className of the menu div
 *      menuitemover:   will add Over to the css className of the menu items div
 *      menuitemout:    will set className to initial css className of the menu items div
 */
    
        // private
        var self = this;
        self.MODULE = 'radioButtonModule';
        self.debugOn = false;
        self.radioButtonDivName = radioButtonDivName;
        self.classNames = [];
        self.enabled = true;
        self.clickCallback = clickCallback;
        self.itemOverChangeCallback = itemOverChangeCallback;
        self.selectedValue = defaultValue;
        
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );
             
            $("#" + self.radioButtonDivName ).children("div").each( function() {
                self.classNames.push( $(this).attr('class' ) );
               
                if( $(this).attr('value') == self.selectedValue ) {
                    $(this).attr('class', $(this).attr('class' ) + 'Selected' );
                }
                else {
                    $(this).mouseover( function(){ self.itemOver($(this)); } );
                    $(this).mouseout( function(){ self.itemOut($(this)); } );
                    $(this).click( function() { self.itemClick($(this)); } );
                }
            }); 
        };
        self.itemOver = function( element ) {
            self.debug( 'item over' );
            var value = element.attr( 'value' );
            element.attr('class', self.classNames[value] + 'Over' ); 
            if( self.itemOverChangeCallback ){
                self.itemOverChangeCallback();
            }
        };
        self.itemOut = function( element ) {
            self.debug( 'item out' );
            var value = element.attr( 'value' );
            element.attr('class', self.classNames[value] ); 
        };
        self.itemClick = function( element ) {
            self.debug( 'click' );
            var newValue = element.attr('value');
            var i = 0;
            $("#" + self.radioButtonDivName ).children("div").each( function() {
                if( $(this).attr('value') == self.selectedValue ) {
                    $(this).attr('class', self.classNames[i] );
                    $(this).mouseover( function(){ self.itemOver($(this)); } );
                    $(this).mouseout( function(){ self.itemOut($(this)); } );
                    $(this).click( function() { self.itemClick($(this)); } );
                }
                if( $(this).attr('value') == newValue ) {
                    $(this).attr('class', self.classNames[i] + 'Selected' );
                    $(this).unbind();
                }
                i++;
            }); 
            
            self.selectedValue = newValue;
            self.clickCallback( element.attr('value') );
        };
        self.setValue = function( value ) {
            self.debug( 'setValue' );
            var i = 0;
            $("#" + self.radioButtonDivName ).children("div").each( function() {
                if( $(this).attr('value') == self.selectedValue ) {
                    $(this).attr('class', self.classNames[i] );
                    $(this).mouseover( function(){ self.itemOver($(this)); } );
                    $(this).mouseout( function(){ self.itemOut($(this)); } );
                    $(this).click( function() { self.itemClick($(this)); } );
                }
                if( $(this).attr('value') == value ) {
                    $(this).attr('class', self.classNames[i] + 'Selected' );
                    $(this).unbind();
                }
                i++;
            }); 
            
            self.selectedValue = value;
//            self.clickCallback( value );
        };
        self.enable = function( enable ){
            self.enabled = enable;
            var i = 0;
            if( self.enabled ){
                i = 0;
                $("#" + self.radioButtonDivName ).children("div").each( function() {
                    if( $(this).attr('value') == self.selectedValue ) {
                        $(this).attr('class', self.classNames[i] + 'Selected' );
                        $(this).unbind();
                    }
                    else {
                        $(this).attr('class', self.classNames[i] );
                        $(this).mouseover( function(){ self.itemOver($(this)); } );
                        $(this).mouseout( function(){ self.itemOut($(this)); } );
                        $(this).click( function() { self.itemClick($(this)); } );
                    }
                    i++;
                }); 
            }
            else {
                i = 0;
                $("#" + self.radioButtonDivName ).children("div").each( function() {
                    $(this).attr('class', self.classNames[i] + 'Disabled' );
                    $(this).unbind();
                    i++;
                }); 
            }
        };
        self.showChoice = function( ){
            var i = 0;
            $("#" + self.radioButtonDivName ).children("div").each( function() {
                if( $(this).attr('value') != self.selectedValue ) {
                    $(this).attr('class', self.classNames[i] + 'Disabled' );
                    $(this).unbind();
                }
                i++
            }); 
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };
        
        // initialize the module 
        self.construct();

        // public
        return {
            getValue : function() {
                return self.selectedValue;
            },
            setValue : function( value ) {
                self.setValue( value );
            },
            enable : function( enable ) {
                self.enable( enable );
            },
            showChoice : function( ) {
                self.showChoice( );
            }
        };
    };
})( jsProject );