/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get json value function to the
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
    jsProject.getLinearGradientPrefixFunction = function( ) {

        // getLinearGradientPrefixFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getLinearGradientPrefixFunction';
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
            jsProject.getLinearGradientPrefix = self.getLinearGradientPrefix;
            // add pad function
            jsProject.getLinearGradient = self.getLinearGradient;
        };
        self.getLinearGradientPrefix = function( ){
            // debug info
            self.debug( 'getLinearGradientPrefix; ');
            
            var styles = window.getComputedStyle( document.documentElement, '' );
            var pre = ( Array.prototype.slice
                            .call(styles)
                            .join('') 
                            .match( /-(moz|webkit|ms)-/ ) || ( styles.OLink === '' && [ '', 'o' ] ) )[1];
            var dom = ( 'WebKit|Moz|MS|O' ).match( new RegExp( '(' + pre + ')', 'i' ) )[1];
            if( pre !== '' ){
                pre = '-' + pre + '-';
            }
            return pre;
        };
        self.getLinearGradient = function( gradientOptions ){

            var userAgent = window.navigator.userAgent;
            var isIe = false;
            if( userAgent.indexOf("MSIE ") >= 0 ){
                isIe = true;
            };
            var linearGradient = '';
            
            // is ie
            if( !isIe ){
                // add prefix
                linearGradient += self.getLinearGradientPrefix( );
            }
            // done is ie
            
            // open gradient
            linearGradient += 'linear-gradient(';
            // is ie
            if( isIe ){
                // add prefix
                linearGradient += 'to ';
            }
            // done is ie
            
            // add direction
            linearGradient += gradientOptions['direction'] + ',';
            
            // loop over colors
            for ( var i = 0; i < gradientOptions['colors'].length; i++ ) {
                // add color
                linearGradient += gradientOptions['colors'][i];
                
                // not last color
                if( i < gradientOptions['colors'].length - 1 ){
                    // add comma
                    linearGradient += ',';
                }
                // done not last color
            }
            // done loop over colors
            
            // close gradient
            linearGradient += ')';
            
            // return gradient
            return linearGradient;
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