/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module handles the layout for the application squarePrimes 
 * 
 *  functions: 
 *      private:
 *          construct               called internal
 *          debug
 * 
 * Last revision: 18-08-2015
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

( function( squarePrimes ){
    squarePrimes.animationModule = function( ) {


    /*
     *  module animationModule 
     *  purpose:
     *   this module controls animationModule for the squarePrimes.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'animationModule';
        self.debugOn = true;
        self.html = '';
        self.panelPositionId = 'middleMiddle';
        self.canvasSurface = null;                      // store the surface to draw on
        self.positions = { "offsetX"    :    8,
                           "offsetMaxX" :   15,
                           "offsetY"    :    8,
                           "offsetMaxY" :   15 };
        self.clearPadding = 2;                  // px of background
        self.clearRect = { "top" :      0,      // px, the rect that the image was drawn in  
                           "left" :     0,      // px
                           "height" :   0,      // px
                           "width" :    0 };    // px
        self.drawRect = {  "top" :      0,      // px, the rect that the image is drawn in  
                           "left" :     0,      // px
                           "height" :   0,      // px
                           "width" :    0 };    // px
        self.lineWidth = 2;                   
        self.fontSize = 50;                       
        self.animationDelay = 11120;                       // ms >= updateDelay
        self.lastAnimationDate = 0;                     // save last animation time for delay
        self.startWith = 1;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );

            self.addHtml();

            // subscribe to events
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
            // start the animation
            self.animateRequest();
            
        };
        self.addHtml = function() {
            // create html
            var html = '';
            html += '<canvas id="canvas" ';
                html += 'style="position:absolute;background-color:whitesmoke;border: black 0px groove;" ';
            html += '>';
            html += '</canvas>';
            
            $( '#' + self.panelPositionId ).html( html );
            // get the canvas surface to draw on
            self.canvasSurface = document.getElementById( 'canvas' ).getContext( '2d' );
            
            
        };
        self.layoutChange = function() {
            var width = $( '#' + self.panelPositionId ).width( );
            var height = $( '#' + self.panelPositionId ).height( );
            
            $( '#canvas' ).height( height );
            $( '#canvas' ).width( width );
            self.canvasSurface.canvas.height = height;
            self.canvasSurface.canvas.width = width;
            
            self.drawRect["width"] = width;
            self.drawRect["height"] = height;
            
            self.animate( true );
        };
        self.animateRequest = function( ){
            self.animate( false );
            // set the timer
            //window.requestAnimationFrame( self.animateRequest );
        };
        self.animate = function( skipDelay ){
            // check for delay
            var date = new Date();
            if( !skipDelay ){
                if( date - self.lastAnimationDate < self.animationDelay ){
                    return;
                }
            }
            // done delay
            self.lastAnimationDate = date;
            //self.debug( 'animate' );
            // clear the clearRect
            self.canvasSurface.clearRect( self.clearRect["left"], self.clearRect["top"], self.clearRect["width"], self.clearRect["height"] );  

            var rows = parseInt( jsProject.getValue( 'rows', 'menuOption' ) );
            var columns = parseInt( jsProject.getValue( 'columns', 'menuOption' ) );
            if( columns % 2 === 0 ){
                columns--;
            }
            if( rows % 2 === 0 ){
                rows--;
            }
            var width = Math.floor( ( self.drawRect["width"] - ( 2 * self.lineWidth ) ) / columns );
            var totalWidth = width * columns;
            
            //width--;
            var height = Math.floor( ( self.drawRect["height"] - ( 2 * self.lineWidth ) ) / rows );
            var totalHeight = height * rows;
            //height--;
            var i = 0;
            self.canvasSurface.strokeStyle = 'black';
            self.canvasSurface.lineWidth = self.lineWidth;
            for( i = 0; i <= rows; i++ ){
                self.canvasSurface.beginPath();
                self.canvasSurface.moveTo( self.lineWidth, self.lineWidth + ( i * height ) );            
                self.canvasSurface.lineTo( totalWidth + self.lineWidth, self.lineWidth + ( i * height ) );            
                self.canvasSurface.stroke();            
            }
            for( i = 0; i <= columns; i++ ){
                self.canvasSurface.beginPath();
                self.canvasSurface.moveTo( self.lineWidth + ( i * width ), self.lineWidth );            
                self.canvasSurface.lineTo( self.lineWidth + ( i * width ), totalHeight + self.lineWidth );            
                self.canvasSurface.stroke();            
            }
            
            if( self.startWith === 0 ){
                self.startWith = jsProject.getValue( 'startWith', 'menuOption' );
            }
            var count = self.startWith;
            self.canvasSurface.fillStyle = 'green';



            var x = 0, y = 0;
            var numberOfPoints = Math.pow( Math.max( columns - 1, rows - 1 ), 2 );
            var segmentLength = -1;
            var segmentsDone = 0;
            var direction = { 'x' : 1, 'y' : 0 };
            var max = Math.max( columns, rows ) / 2;
            y = max / 2;
            x = max / 2;
            //self.canvasSurface.fillRect( ( x * width ) + self.lineWidth, ( y * height ) + self.lineWidth , width, height );
            //self.drawPrime( self.startWith, x, y, width, height );
            for( i = 0; i < numberOfPoints; ){
                if( direction['x'] === 1 ){
                    for( j = 0; j < segmentLength; j++ ){
                        x += 1;
                        self.drawPrime( i + self.startWith, x, y, width, height );
                        i++;
                    }
                    direction['x'] = 0;
                    direction['y'] = 1;
                    segmentsDone++;
                }
                else if( direction['x'] === -1 ){
                    for( j = 0; j < segmentLength; j++ ){
                        x -= 1;
                        self.drawPrime( i + self.startWith, x, y, width, height );
                        i++;
                    }
                    direction['x'] = 0;
                    direction['y'] = -1;
                    segmentsDone++;
                }
                else if( direction['y'] === 1 ){
                    for( j = 0; j < segmentLength; j++ ){
                        y += 1;
                        self.drawPrime( i + self.startWith, x, y, width, height );
                        i++;
                    }
                    direction['x'] = -1;
                    direction['y'] = 0;
                    segmentsDone++;
                }
                else if( direction['y'] === -1 ){
                    for( j = 0; j < segmentLength; j++ ){
                        y -= 1;
                        self.drawPrime( i + self.startWith, x, y, width, height );
                        i++;
                    }
                    direction['x'] = 1;
                    direction['y'] = 0;
                    segmentsDone++;
                }
                if( segmentsDone % 2 === 0 ){
                    segmentsDone = 0;
                    segmentLength++;
                }
            }
            
            // linear            
/*            
            for( var j = 0; j < columns; j++ ){
                for( i = 0; i < rows; i++ ){
                    
                    if( self.isPrime( count ) ){
                        self.canvasSurface.fillRect( ( i * width ) + self.lineWidth, ( j * height ) + self.lineWidth , width, height );
                        
                    }
                    count++;
                }            
            }            
*/
            self.startWith += numberOfPoints;
            if( self.startWith > 10000 ){
                self.startWith = 0;
                var dimensions = parseInt( Math.random() * 11 ) +  2;
                jsProject.setValue( 'rows', 'menuOption', dimensions );
                jsProject.setValue( 'columns', 'menuOption', dimensions );
            }
            
            // clearRect = drawRect
            self.clearRect["top"] = self.drawRect["top"] - self.clearPadding;
            self.clearRect["left"] = self.drawRect["left"] - self.clearPadding;
            self.clearRect["height"] = self.drawRect["height"] + ( self.clearPadding * 2 );
            self.clearRect["width"] = self.drawRect["width"] + ( self.clearPadding * 2 );
            // done clearRect = drawRect
            //self.debug( 'animate end' );
            
        };
        self.drawPrime = function( n, x, y, width, height ){
            self.debug( "n:" + n );
            if( self.isPrime( n ) ){
                self.canvasSurface.fillStyle = 'green';
                self.canvasSurface.fillRect( ( ( x ) * width ) + self.lineWidth, ( ( y )  * height ) + self.lineWidth , width, height );
            }
            self.canvasSurface.fillStyle = 'black';
            self.canvasSurface.font =  "18px Times New Roman";
            self.canvasSurface.fillText( n , ( ( x ) * width ) + self.lineWidth + 30, ( ( y )  * height ) + self.lineWidth + 30 );
        };
        self.isPrime = function( n ){
            if (isNaN( n ) || !isFinite( n ) || n % 1 || n < 2 ){
                return false;
            } 
            if ( n === self.leastFactor( n ) ) {
                return true;
            }
            return false;
        };
        self.leastFactor = function(n){
            if( isNaN( n ) || !isFinite( n ) ){
                return NaN;
            }  
            if ( n === 0 ){
                return 0;
            }  
            if ( n % 1 || n * n < 2 ) {
                return 1;
            }
            if ( n % 2 === 0 ){
                return 2;
            }  
            if ( n % 3 === 0 ){
                return 3;
            }  
            if ( n % 5 === 0 ){
                return 5;
            }  
            var m = Math.sqrt( n );
            for ( var i = 7; i <= m; i += 30 ) {
                if( n % i === 0)      return i;
                if( n % ( i + 4 )=== 0 ){
                    return i+4;
                }
                if( n % ( i + 6 )=== 0 ){
                    return i+6;
                }
                if( n % ( i + 10 )=== 0 ){
                    return i+10;
                }
                if( n % ( i + 12 )=== 0 ){ 
                    return i+12;
                }
                if( n % ( i + 16 )=== 0 ){
                    return i+16;
                }
                if( n % ( i + 22 )=== 0 ){
                    return i+22;
                }
                if( n % ( i + 24 )=== 0 ){
                    return i+24;
                }
            }
            return n;
        };
        
/*
isPrime = function(n) {
 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
 if (n==leastFactor(n)) return true;
 return false;
}

// leastFactor(n)
// returns the smallest prime that divides n
//     NaN if n is NaN or Infinity
//      0  if n=0
//      1  if n=1, n=-1, or n is not an integer

leastFactor = function(n){
 if (isNaN(n) || !isFinite(n)) return NaN;  
 if (n==0) return 0;  
 if (n%1 || n*n<2) return 1;
 if (n%2==0) return 2;  
 if (n%3==0) return 3;  
 if (n%5==0) return 5;  
 var m = Math.sqrt(n);
 for (var i=7;i<=m;i+=30) {
  if (n%i==0)      return i;
  if (n%(i+4)==0)  return i+4;
  if (n%(i+6)==0)  return i+6;
  if (n%(i+10)==0) return i+10;
  if (n%(i+12)==0) return i+12;
  if (n%(i+16)==0) return i+16;
  if (n%(i+22)==0) return i+22;
  if (n%(i+24)==0) return i+24;
 }
 return n;
}
         */        
        
        
        
        // debug 
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ' ' + string );
            }
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( squarePrimes );