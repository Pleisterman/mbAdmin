/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module is the container class for the application textTool 
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
         *   textTool
         */
        
    // create the textTool object
    window.textTool = new function(){};

    // private 
    // set the self
    var self = window.textTool;
    self.CLASSNAME = 'textTool';
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
    self.textInputModule = null;
    self.textOutputModule = null;
    self.mutationListModule = null;
    self.inputMenuModule = null;
    self.mutationNewModule = null;
    self.mutationMenuModule = null;
    self.outputMenuModule = null;
    
    // zIndex for messageBox, debugEvents, scene
    self.jsProjectZIndex = 200; 

    window.onload = function() {
        jsProject.debugOn( self.debugOn );
        jsProject.initialize( "textColor" , 'black' );
        jsProject.initialize( "zIndex" , self.jsProjectZIndex );
        jsProject.construct();
        jsProject.addValue( "debugOn", "textTool", textTool.debugOn );
        
        // set project js scene
        self.setScene();
        
        // create the modules
        self.valuesModule = new textTool.valuesModule();
        self.languageModule = new textTool.languageModule();
        self.navigationModule = new textTool.navigationModule();
        self.layoutModule = new textTool.layoutModule();
        self.aboutModule = new textTool.aboutModule();
        self.textInputModule = new textTool.textInputModule();
        self.textOutputModule = new textTool.textOutputModule();
        self.mutationListModule = new textTool.mutationListModule();
        self.inputMenuModule = new textTool.inputMenuModule();
        self.mutationMenuModule = new textTool.mutationMenuModule();
        self.outputMenuModule = new textTool.outputMenuModule();
        self.mutationNewModule = new textTool.mutationNewModule();
        // create the modules
        
        // set the global value
        jsProject.setValue( "menu", "navigation", menu );
        jsProject.debug( 'menu:' + menu );
        if( menu !== '' ){
            self.selectMenu();
        }
        
        jsProject.callEvent( 'sceneChange' );
        
        // debug info
        jsProject.debug( 'textTool ok' );
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
        $('#jsProjectDebugDiv').css('left', '1040px');
        $('#jsProjectDebugDiv').css('top', '630px');
        $('#jsProjectDebugDiv').css('font-size', '0.9em');
        $('#jsProjectDebugDivContent').css('height', '140px');
    };
    self.selectMenu = function(){
        switch( menu ){
            case 'aboutMenu' : {
                 // debug info
                 jsProject.debug( 'about mneu' );  
                 // done debug info
                 
                 // show about 
                 self.aboutModule.show( true );
                 break;
            }
            case 'mutationNew' : {
                 // debug info
                 jsProject.debug( 'mutation new dialog' );  
                 // done debug info
                 
                 jsProject.callEvent( 'mutationNew' );
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
 
