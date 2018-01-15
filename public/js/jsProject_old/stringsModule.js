/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this module controls the strings for the application
*          strings are immutable declarations for the languages 
*          of the application and will be used in the user interface.  
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

( function( jsProject ){
    jsProject.stringsModule = function( ) {
        /*
        *  module stringsModule 
        *  purpose:
        *       this module controls strings for the application.
        *       strings are immutable declarations which are used in the user interface    
        *   
        *   functions: 
        *       private:
        *           construct:      parameters: ( void ) return: void 
        *                           called by the module for initialization
        *           addString:      parameters: ( string id, string language, mixed value) return: void
        *                           call to add a value associated with the id  within the language
        *                           will call an error message when value exists
        *           addStringList:  parameters: ( json{id, string language, mixed value}) return: void
        *                           call to add values associated with the ids within the language  
        *                           will call an error message when value exists
        *           getString:      parameters: ( string id, string language ) return string / false 
        *                           call to get a string associated with the 
        *                           id and the current application language
        *           debug:          parameters: ( string string ) return: void
        *                           calls the jsProject.debug( string ) when self.debugOn
        *       
        *  public: 
        *  The module will add the function addString to the application    
        *  The module will add the function addStringList to the application    
        *  The module will add the function getString to the application    
        */
        
        // private
        var self = this;
        self.MODULE = 'stringsModule';
        self.debugOn = false;
        
        // the languages object
        self.languages = {};

        // add the messageBox strings nl
        self.languages['nl'] = {};
        self.languages['nl']["yes"] =  'Ja';
        self.languages['nl']["no"] =  'Nee';
        self.languages['nl']["ok"] =  'Ok';
        // add the messageBox strings en
        self.languages['en'] = {};
        self.languages['en']["yes"] =  'Yes';
        self.languages['en']["no"] =  'No';
        self.languages['en']["ok"] =  'Ok';
        // add the messageBox strings de
        self.languages['de'] = {};
        self.languages['de']["yes"] =  'Ja';
        self.languages['de']["no"] =  'Nein';
        self.languages['de']["ok"] =  'Ok';


        // functions
        self.construct = function() {
            self.debug( 'construct' );
            
            // add functions to application 
            jsProject.addString = self.addString;
            jsProject.addStringList = self.addStringList;
            jsProject.getString = self.getString;
            
        };
        // add a string according to id
        self.addString = function( id, language, string ) {
            // check if the language exists
            if( self.languages[language] === undefined ){
                // create the language
                self.languages[language] = {};
            }    
            // check if the string exists
            if( self.languages[language][id] !== undefined ){
                if( self.debugOn ) {
                    // string exists error
                    self.debug( 'add string error string already exists id: ' +  id );
                }                
            }
            else {
                // add the string
                self.languages[language][id] = string;
            } 
        };
        // add strings according to list json{id,string}
        self.addStringList = function( stringList, language ) {
            for (var key in stringList ) {
                self.addString( key, language, stringList[key] );
            }                
        };
        // get  a string according to id
        self.getString = function( id ) {
            // check if the id exists
            if( self.languages[jsProject.getValue( 'language', 'jsProject' )][id] ){
                // return the string
                return self.languages[jsProject.getValue( 'language', 'jsProject' )][id];
            }
            // id not found error
            self.debug( 'get string error string not found id: ' +  id );
            return false;
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


