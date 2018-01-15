/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:  this module controls the scene for the application
*           the scene encapsulates html elements added to the application
*           the module will save the document body settings 
*           set the document body settings for the scene
*           when the scene ends the document body settings are restored
*           the module catches the window.onresize event resizes the scene
*           and calls the event sceneSizeChanged
* Last revision: 03-11-2014
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
    jsProject.sceneModule = function( zIndex ) {
        /*
        *  module sceneModule 
        *  Purpose:  this module controls the scene for the application
        *            the scene encapsulates html elements added to the application
        *            the module will save the document body settings 
        *            set the document body settings for the scene
        *            when the scene ends the document body settings are restored
        *            the module catches the window.onresize event resizes the scene
        *            and calls the event sceneSizeChanged
        *   
        *  functions: 
        *       private:
        *           construct:          parameters: ( void ) return: void
        *                               called by the module for initialization of the module
        *           createCss:          parameters: ( ) return: void
        *                               create the css for the scene
        *           resize:             parameters: ( ) return: void
        *                               called by the subscription to the window.onresize event
        *           saveBodyCss:        parameters: ( void ) return: void
        *                               called by the module to save the body settings for restore
        *           resetBodyCss:       parameters: ( void ) return: void
        *                               called by the module to restore the body settings
        *           debug:              parameters: ( string string ) return: void
        *                               calls the jsProject.debug( string ) when self.debugOn
        *      
        *  The module will call the event 'jsProjectSceneReady' when scene is created
        *  The module will call the event 'jsProjectSceneSizeChanged' on window.resize
        */
       
        // private
        var self = this;
        self.MODULE = 'sceneModule';
        self.debugOn = false;

        self.zIndex = zIndex;
        self.innerZindex = 1;
        self.css = '';
        // the body values to set
        self.bodyCss = { 'margin' : '0px',
                         'padding' : '0px' };
        
        // store the original values
        self.bodyResetCss = { 'margin-top' : null,
                              'margin-left' : null,
                              'margin-right' : null,
                              'margin-bottom' : null,
                              'padding-top' : null,
                              'padding-left' : null,
                              'padding-right' : null,
                              'padding-bottom' : null,
                              'min-width' : null };
        

        // functions
        self.construct = function() {
            self.debug( 'construct' );

            self.saveBodyCss();

            self.setBodyCss();

            // create the css
            self.createCss();
            
            // create html
            var html = '';
            html += '<div id="jsProjectScene" class="jsProjectDiv jsProjectScene">';
                html += self.css;
            html += '</div>';
            $( document.body ).append( html );


            jsProject.callEvent( 'jsProjectSceneReady' );
        };
        // create the css
        self.createCss = function() {
            // create css
            self.css = '';
            self.css += '<style> ';
                self.css += ' .jsProjectScene { ' + "\n";
                self.css += '    overflow: hidden; ' + "\n";
                self.css += '    top: 0px; ' + "\n";
                self.css += '    left: 0px; ' + "\n";
                self.css += '    width: 100%; ' + "\n";
                self.css += '    height: 100%; ' + "\n";
                self.css += '    background-color: ' + jsProject.getValue( 'backgroundColor', 'jsProject' ) + ';' + "\n";
                self.css += '    z-index: ' +  self.zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";
            self.css += '</style>';
        };
        // save the body css 
        self.saveBodyCss = function() {
            // save the old settings
            for ( var key in self.bodyResetCss ) {
                self.bodyResetCss[key] = $( document.body ).css( key );  
            }
        };        
        // set the new body css 
        self.setBodyCss = function() {
            for ( var key in self.bodyCss ) {
                $( document.body ).css( key, self.bodyCss[key] );  
            }
        };        
        // reset the old body css 
        self.resetBodyCss = function() {
            for ( var key in self.bodyResetCss ) {
                $( document.body ).css( key, self.bodyResetCss[key] );  
            }
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };
        
        // initialize the module 
        self.construct();
    };
    
})( jsProject );


