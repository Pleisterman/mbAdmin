/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this file creates the global variable jsProject
* Last revision: 28-10-2014 
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

// global var jsProject
var jsProject = ( function( ) {
    /*
    *  purpose:
    *   this is the namespace object.  
    *      
    */
     
    // private 
    var self = this;
    self.MODULE = 'jsProject';
    self.debugOn = false;
    
    // construct the project only once
    self.running = false;

    // if there is no cookie with a language
    // and no browser language found
    // defaultLanguage will be used
    self.languages = [ "nl", "en", "de" ];
    self.defaultLanguage = 'nl';

    // zIndex for messageBox, debugEvents, scene
    self.sceneZIndexOffset = 0; 
    self.messageBoxZIndexOffset = 1; 
    self.debugEventsZIndexOffset = 2; 

    
    // initializationObject
    // this object is used to initialize jsProject values
    // before function start where all the member objects
    // are created.
    self.initializationObject = { 'useCookie' : false,
                                  'cookieDomain' : '',
                                  'cookiePath' : './',
                                  'cookieSecure' : false,
                                  'cookieLifeTime' : 30, // days
                                  'language' : null,
                                  'zIndex' : 1,
                                  'textColor' : '#000000',
                                  'backgroundColor' : '#ffffff' };
                              
    // functions                          
    self.construct = function() {
        //only one instance of jsProject is constructed
        if( self.running ) {
            return false;
        }
        self.running = true;
        var zIndex = 0;
        
        self.createCss();
        
        // create the events module 
        jsProject.events = new jsProject.eventsModule();
        
        // create the debugWindow if needed
        zIndex = self.initializationObject["zIndex"] + self.debugEventsZIndexOffset;
        jsProject.debugWindow = new jsProject.debugModule(  zIndex, self.debugOn );

        self.debug( 'application start' );
        
        // create the values module 
        jsProject.values = new jsProject.valuesModule();
        
        // create the ajax module 
        jsProject.ajax = new jsProject.ajaxModule();

        // copy the initialization values to the application values
        jsProject.addValueList( self.initializationObject, 'jsProject' );

        // add the application values
        jsProject.addValue( 'userActionsEnabled', 'jsProject', true );
        jsProject.addValue( 'languages', 'jsProject', self.languages );
        
        // create the strings module 
        jsProject.strings = new jsProject.stringsModule();
        
        if( jsProject.getValue( 'useCookie', 'jsProject' ) ) {
            // create the cookies handler
            jsProject.cookie = new jsProject.cookieModule();
        }

        // create the browser module
        jsProject.browser = new jsProject.browserModule();
        
        // if there is no language set defaultLanguage will be used
        if( !jsProject.getValue( 'language', 'jsProject' ) ) {
            self.debug( 'jsProject set applicationLanguage: ' +  self.defaultLanguage );
            jsProject.setValue( 'language', 'jsProject', self.defaultLanguage );
        }
        if( jsProject.getValue( 'useCookie', 'jsProject' ) ) {
            jsProject.setCookieValue( 'language', jsProject.getValue( 'language', 'jsProject' ) );
        }
        
        // create the scene
        zIndex = jsProject.getValue( 'zIndex', 'jsProject' ) + self.sceneZIndexOffset;
        jsProject.scene = new jsProject.sceneModule( zIndex );

        
        // create the resourcesModule
        jsProject.resources = new jsProject.resourcesModule();
        
        // create the messageBox
        var zIndex = jsProject.getValue( 'zIndex', 'jsProject' ) + self.messageBoxZIndexOffset;
        jsProject.messageBox = new jsProject.messageBoxModule( zIndex );
        
    };
    self.createCss = function() {
            // create the css
            var css = '';
            css += '<style>';
            
                css += ' .jsProjectDiv { ' + "\n";
                css += '    -webkit-user-select: none; ' + "\n";
                css += '    -khtml-user-select: none; ' + "\n";
                css += '    -moz-user-select: none; ' + "\n";
                css += '    -ms-user-select: none; ' + "\n";
                css += '    user-select: none; ' + "\n";
                css += '    display: block; ' + "\n";
                css += '    position: absolute; ' + "\n";
                css += '    color: black; ' + "\n";
                css += '    font-size: 15px; ' + "\n";
                css += '    display: block; ' + "\n";
                css += '    background-color: white; ' + "\n";
                css += '    font-family: sans-serif; ' + "\n";
                css += '  }' + "\n" + "\n";
            
                css += ' .jsProjectRoundBorder { ' + "\n";
                css += '    border: lightblue 1px groove; ' + "\n";
                css += '    border-radius: 5px; ' + "\n";
                css += '  }' + "\n" + "\n";
            
                css += ' .jsProjectClickable { ' + "\n";
                css += '    cursor:pointer; ' + "\n";
                css += '    cursor:hand; ' + "\n";
                css += '  }' + "\n" + "\n";

            css += '</style>';
            var html = '';
            html += '<div id="jsProjectCssDiv" style="display:none;">' + css + '</div>';
            $( document.body ).append( html );
    };
    self.initialize = function( id, value ) {
        // copy the initialization values to the application values
        if( self.initializationObject[id] !== undefined ) {
            self.initializationObject[id] = value;
        }
        else {
            // initialization value not found,
            // the value you are trying to set is not available
            alert( self.MODULE + "unknown initialization id: " + id );
        }
    };
    self.debug = function( string ) {
        if( self.debugOn ) {
            jsProject.debug( self.MODULE + ': ' + string );
        }
    };
    // public
    return {
        initialize : function( id, value ) {
            self.initialize( id, value );
        },
        debugOn : function( debugOn ) {
            self.debugOn = debugOn;
        },
        construct : function() {
            self.construct();
        }
    };
})();
 
