/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get next day function to the
 *          application jsProject
 *          returns json date object
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
    jsProject.getNextDayFunction = function( ) {

        // getNextDayFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getNextDayFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getNextDay = self.getNextDay;
        };
        self.getNextDay = function( dateObject ){
            var date = new Date( dateObject['year'], parseInt( dateObject['month'] ) - 1, dateObject['day'] );
            date.setHours(0, 0, 0, 0);
            date.setDate( date.getDate() + 1 ); 
            dateObject['year'] = date.getFullYear().toString();
            dateObject['month'] = date.getMonth() + 1;
            dateObject['day'] = date.getDate();
            return dateObject;
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