/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this file contains the global variable jsProject
*          The module jsProject contains 
*          the modules:
*               valuesModule    storage for global values by group name
*               eventsModule    event manager with subscription service
*               debugModule     displays debug info
*               ajaxModule      make ajex calls
*               browserModule   controls access to browser info
*               cookieModule    controls access to cookies 
*               resourcesModule controls preloading of resources ( images and sounds )
*               
* Usage:    Add the all the scripts, starting with the jsProject file, to the html page.
*           contstruct the jsProject:
*               jsProjects = new jsProject()
*           
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

// global var jsProject
var jsProject = ( function( ) {

    // jsProject    
    
    // private 
    var self = this;
    self.MODULE = 'jsProject';
    self.debugger = null;
    self.values = null;
    self.ajax = null;
    self.browser = null;
    self.storage = null;
    self.assets = null;
    self.events = null;
    self.debugger = null;
    self.functionsModule = null;
    self.jsonToElementHtmlModule = null;
    
    // construct the project only once
    self.constructed = false;

    // functions                          
    self.construct = function() {
        //only one instance of jsProject is constructed
        if( self.constructed ) {
            return false;
        }

        // create an empty debug function
        jsProject.debug = function(){};
        // will be overwritten by debugger 
        
        self.constructed = true;
        
        self.values = new jsProject.valuesModule();
        self.events = new jsProject.eventsModule();
        self.ajax = new jsProject.ajaxModule();
        self.browser = new jsProject.browserModule();
        self.storage = new jsProject.storageModule();
        self.assets = new jsProject.assetsModule();
        self.functions = new jsProject.functionsModule();
        self.jsonToElementHtmlModule = new jsProject.jsonToElementHtmlModule();
        
    };
    self.debugOn = function( debugOn, options ){
        if( debugOn ){
            // create the debugger
            jsProject.debugger = new jsProject.debugModule( options );
        }
    };
    // public
    return {
        construct : function() {
            self.construct();
        },
        debugOn : function( debugOn, options ) {
            self.debugOn( debugOn, options );
        }
    };
})();
 
