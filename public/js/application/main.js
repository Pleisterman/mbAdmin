/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module is the container class for the application urenAdmin 
 *          all modules are linked to this module and can be accessed through the functions
 *          linked to this module.
 *          this module requires the implementation of the jsProject modules  
 *          
 * Last revision: 16-05-2015
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
         *  module urenAdmin
         *  purpose:
         *   this module is the container class for the application urenAdmin  
         *   all modules are linked to this module and can be acceased through the functions
         *   linked to this module.
         *   this module requires the implementation of the jsProject modules
         */
        
    // create the urenAdmin object
    window.urenAdmin = new function(){};

    // private 
    // set the self
    var self = window.urenAdmin;
    self.CLASSNAME = 'urenAdmin';
    self.debugOn = true;

    // if there is no cookie with a language
    // and no browser language found
    // defaultLanguage will be used
    self.defaultLanguage = 'nl';
    self.app = null; 
    self.appName = null; 
    
    // zIndex for messageBox, debugEvents, scene
    self.jsProjectZIndex = 200; 

    self.start = function() {
        jsProject.debugOn( self.debugOn );
        jsProject.initialize( "textColor" , 'black' );
        jsProject.initialize( "zIndex" , self.jsProjectZIndex );
        jsProject.construct();
        jsProject.addValue( "debugOn", "urenAdmin", urenAdmin.debugOn );
        self.setScene();
        //self.testAjax();
        jsProject.debug( 'urenAdmin ok' );
    };
    self.setScene = function() {
        $(document.body).css('max-width', '');
        //$(document.body).css('width', '80%');
        $('#jsProjectScene').css('overflow', 'hidden');
        $('#jsProjectScene').css('background-color', 'transparent');
        $('#jsProjectScene').css('clear', 'both');
        $('#jsProjectScene').css('position', 'relative');
        $(document.body).css('margin', '0 auto');
        $('#jsProjectDebugDiv').css('left', '1040px');
        $('#jsProjectDebugDiv').css('top', '210px');
        $('#jsProjectDebugDiv').css('font-size', '0.9em');
        $('#jsProjectDebugDivContent').css('height', '420px');
    };
    self.ajaxResult = function( result ) {
        jsProject.debug( 'ajaxResult' );
        $.each( result, function( index, value ) {
            jsProject.debug( 'ajaxResult: index: ' + index + ' value: ' + value );
        } );
    };
    self.testAjax = function() {
        jsProject.debug( 'testAjax..' );
        self.ajaxModule = new urenAdmin.ajaxModule();
        var data = { 'subject'  : "test",
                     'ids'  : [1,2,3,4],
                     'language' : "nl"   };
        urenAdmin.post( '/ajaxTest', data, self.ajaxResult );
        
    };
    self.destruct = function() {
          self = null;
    };
    
    // public
    return {
        start : function() {
            self.start();
        }
    };
})();
 
