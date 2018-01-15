/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module is the container class for the application squarePrimes 
 *          all modules are linked to this module and can be accessed through the functions
 *          linked to this module.
 *          this module requires the implementation of the jsProject modules  
 *          
 *  modules: 
 *      valuesModule
 *      ajaxModule
 *      languageModule
 *      navigationModule
 *      aboutModule
 *      
 *  functions: 
 *      private:
 *          window.onload       overwrite for the window function, starts the application
 *          setScene            set jsproject scene
 *          addOverlay          add html layer for dialogs
 *          selectMenu          select menu when following a route
 *          destruct
 *          
 *          
 * Last revision: 14-08-2015
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

( function() {
        /*
         *   squarePrimes
         */
        
    // create the squarePrimes object
    window.squarePrimes = new function(){};

    // private 
    // set the self
    var self = window.squarePrimes;
    self.CLASSNAME = 'squarePrimes';
    self.debugOn = true;

    // if there is no cookie with a language
    // and no browser language found
    // defaultLanguage will be used
    self.defaultLanguage = 'nl_NL';
    self.app = null; 
    self.appName = null;
    self.languageModule = null;
    self.valuesModule = null;
    self.navigationModule = null;
    self.layoutModule = null;
    self.aboutModule = null;
    self.menuModule = null;
    self.animationModule = null;
    
    // zIndex for messageBox, debugEvents, scene
    self.jsProjectZIndex = 200; 

    window.onload = function() {
        jsProject.debugOn( self.debugOn );
        jsProject.initialize( "textColor" , 'black' );
        jsProject.initialize( "zIndex" , self.jsProjectZIndex );
        jsProject.construct();
        jsProject.addValue( "debugOn", "squarePrimes", squarePrimes.debugOn );
        
        // set project js scene
        self.setScene();
        // add html layer for dialogs
        self.addOverlay();
        
        // create the modules
        self.valuesModule = new squarePrimes.valuesModule();
        self.languageModule = new squarePrimes.languageModule();
        self.layoutModule = new squarePrimes.layoutModule();
        self.navigationModule = new squarePrimes.navigationModule();
        self.aboutModule = new squarePrimes.aboutModule();
        self.menuModule = new squarePrimes.menuModule();
        self.animationModule = new squarePrimes.animationModule();
        // create the modules
        
        // set the global value
        jsProject.setValue( "menu", "navigation", menu );
        
        if( menu !== '' ){
            self.selectMenu();
        }

        jsProject.callEvent( 'sceneChange' );
        
        // debug info
        jsProject.debug( 'squarePrimes ok' );
        // done debug info
    };
    self.setScene = function() {
        $(document.body).css('max-width', '95%');
        //$(document.body).css('width', '80%');
        $('#jsProjectScene').css('overflow', 'hidden');
        $('#jsProjectScene').css('background-color', 'transparent');
        $('#jsProjectScene').css('clear', 'both');
        $('#jsProjectScene').css('position', 'relative');
        $(document.body).css('margin', '0 auto');
        $('#jsProjectDebugDiv').css('left', '20px');
        $('#jsProjectDebugDiv').css('top', '410px');
        $('#jsProjectDebugDiv').css('font-size', '0.9em');
        $('#jsProjectDebugDivContent').css('height', '220px');
        $('#jsProjectDebugDivContent').css('width', '220px');
    };
    self.addOverlay = function() {
        // create the html
        var html = '';
        // add css
        html += '<style>' + "\n";
            html += ' .overLay { ' + "\n";
            html += '  padding-top: 155px;' + "\n";
            html += '  margin: 0 auto;' + "\n";
            html += '  background-color: green;' + "\n";
            html += '  overflow-x: hidden;' + "\n";
            html += '  z-index:210;' + "\n";
            html += '  ' + "\n";
            html += '  }' + "\n" + "\n";
        html += '</style>' + "\n";
        html += '<div class="container"><div id="overlay" class="overlay"></div></div>';
        // create the html

        // add html to the scene
        $( document.body ).append( html );
        
    };
    self.selectMenu = function(){
        switch( menu ){
            case 'aboutMenu' : {
                 // debug info
                 jsProject.debug( 'about menu' );  
                 // done debug info
                 
                 // show about 
                 self.aboutModule.show( true );
                 break;
            }
            default : {
                    jsProject.debug( 'Unknown menu selected.' );
            }
        }
    };
    self.destruct = function() {
          self = null;
    };
    
    // public
    return {
    };
})();
 
