/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds the functions to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
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
    jsProject.functionsModule = function( ) {

        // functionsModule 
        
        // private
        var self = this;
        self.MODULE = 'functionsModule';
        self.debugOn = false;  
        // common functions
        self.getLinearGradientPrefixFunction = null;// function module
        self.getJsonValueFunction = null;           // function module
        self.elementIsVisibleFunction = null;       // function module
        self.scrollElementFunction = null;          // function module
        self.getElementPositionFunction = null;     // function module
        // text functions
        self.padfunction = null;                    // function module
        self.checkEmailSyntaxFunction = null;       // function module
        self.xorStringFunction = null;              // function module
        self.orderArrayFunction = null;             // function module
        // date functions
        self.dateObjectToDbDateFunction = null;     // function module
        self.dateObjectToTextFunction = null;       // function module
        self.dbDateToDateObjectFunction = null;     // function module
        self.getNextDayFunction = null;             // function module
        self.getPreviousDayFunction = null;         // function module
        self.getTodayDbDateFunction = null;         // function module
        self.getTodayTextFunction = null;           // function module
        self.getWeekFunction = null;                // function module
        self.textToDateObjectFunction = null;       // function module
        // color functions
        self.hexStringToRgbFunction = null;         // function module
        self.hsvToRgbFunction = null;               // function module
        self.rgbIsRgbFunction = null;               // function module
        self.rgbToHexStringFunction = null;         // function module
        self.rgbToHsvFunction = null;               // function module
        self.rgbToStringFunction = null;            // function module
        self.stringToRgbFunction = null;            // function module
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create common functions 
            self.addCommonFunctions();
            // create text functions 
            self.addTextFunctions();
            // create date functions 
            self.addDateFunctions();
            // create date functions 
            self.addColorFunctions();
        };
        self.addCommonFunctions = function( ){
            // add get gradient prefix value
            self.getLinearGradientPrefixFunction = new jsProject.getLinearGradientPrefixFunction();
            // add get json value
            self.getJsonValueFunction = new jsProject.getJsonValueFunction();
            // add get element position
            self.getElementPositionFunction = new jsProject.getElementPositionFunction();
            // add get element is visible
            self.elementIsVisibleFunction = new jsProject.elementIsVisibleFunction();
            // add scroll element
            self.scrollElementFunction = new jsProject.scrollElementFunction();
        };
        self.addTextFunctions = function( ){
            // add pad
            self.padfunction = new jsProject.padFunction();
            // add check email syntax
            self.checkEmailSyntaxFunction = new jsProject.checkEmailSyntaxFunction();
            // add xor string
            self.xorStringFunction = new jsProject.xorStringFunction();
            // add order array
            self.orderArrayFunction = new jsProject.orderArrayFunction();

        };
        self.addDateFunctions = function( ){
            // add json date object to db date
            self.dateObjectToDbDateFunction = new jsProject.dateObjectToDbDateFunction();
            // add json date object to text
            self.dateObjectToTextFunction = new jsProject.dateObjectToTextFunction();
            // add db date to json date object
            self.dbDateToDateObjectFunction = new jsProject.dbDateToDateObjectFunction();
            // add get next day 
            self.getNextDayFunction = new jsProject.getNextDayFunction();
            // add get previous day 
            self.getPreviousDayFunction = new jsProject.getPreviousDayFunction();
            // add get today as string
            self.getTodayDbDateFunction = new jsProject.getTodayDbDateFunction();
            // add get today as string
            self.getTodayTextFunction = new jsProject.getTodayTextFunction();
            // add get week 
            self.getWeekFunction = new jsProject.getWeekFunction();
            // add text to date
            self.textToDateObjectFunction = new jsProject.textToDateObjectFunction();
        };
        self.addColorFunctions = function( ){
            // add string to rgb
            self.stringToRgbFunction = new jsProject.stringToRgbFunction();
            // add hex string to rgb
            self.hexStringToRgbFunction = new jsProject.hexStringToRgbFunction();
            // add hsv to rgb
            self.hsvToRgbFunction = new jsProject.hsvToRgbFunction();
            // add rgb is rgb
            self.rgbIsRgbFunction = new jsProject.rgbIsRgbFunction();
            // add rgb to hex string
            self.rgbToHexStringFunction = new jsProject.rgbToHexStringFunction();
            // add rgb to hsv json object
            self.rgbToHsvFunction = new jsProject.rgbToHsvFunction();
            // add rgb to string
            self.rgbToStringFunction = new jsProject.rgbToStringFunction();

        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );