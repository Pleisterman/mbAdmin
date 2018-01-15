/* 
 *  Project: MbAdmin 
 * 
 *  File: /mbAdmin/main/brandModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 * Purpose: this module displays the brand image
 *          the image is linked to the sharsoft website
 *           
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( sharesoft ){

    // MODULE: brandModule( void ) void 
    
    sharesoft.brandModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'brandModule';                                // string:  MODULE
        self.debugOn = false;                                       // boolean: debug
        self.url = 'http://www.sharesoft.nl';                       // string url
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );         // string: image dir
        self.parentOptions = {                                      // json: parent options
            'id'                    :   'bottomRow'                 // string: element id
        };                                                          // done json: parent options
        self.brandOptions = {                                       // json: brand options
            'id'                    :   'brand',                    // string: element id
            'element'               :   'div',                      // string: html element type 
            'cursor'                :   'pointer',                  // css cursor            
            'styleHeight'           :   sharesoft.getSetting( 'layoutTopRowHeight' ), // css style height
            'styleWidth'            :   sharesoft.getSetting( 'layoutTopRowHeight' ), // css style width  
            'marginRight'           :   '210px',                    // css margin right
            'float'                 :   'right',                    // css float
            'eventLayer'            :   'main'                      // string event layer id
        };                                                          // done json: brand options
        self.imageOptions = {                                       // json: image options
            'id'                    :   'brandImage',               // string: element id
            'element'               :   'img',                      // string: html element type 
            'src'                   :   self.imageUrl + 'brand.png',// string: file name
            'title'                 :   sharesoft.translations['brandTitle'],   // string: title
            'borderRadius'          :   '0.1em',                    // css border radius
            'marginTop'             :   '0.7em'                     // css margin top
        };                                                          // done json: image options
        self.mouseOverOptions = {                                   // json: mouse over options
            'backgroundColor'           :  sharesoft.colors['panelHighlightBackgroundColor']['color'] // css color: background color
        };                                                          // done json: mouse over options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();

            // add events
            self.addEvents();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add the html to the panel
            $( '#' + self.parentOptions['id'] ).append( jsProject.jsonToElementHtml( self.brandOptions ) );
            
            // add the image
            $( '#' + self.brandOptions['id'] ).append( jsProject.jsonToElementHtml( self.imageOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
            
            // add click 
            $( '#' + self.brandOptions['id'] ).click( function( event ){ self.click(  ); }); 

        // DONE FUNCTION: addEvents( void ) void
        };            
        self.addTabStop = function() {
        // FUNCTION: addTabStop( void ) void
            
        // DONE FUNCTION: addTabStop( void ) void
        };        
        self.click = function( ){
        // FUNCTION: click( void ) void
        
            // open url in new window
            window.open( self.url, '_blank' );
            
        // DONE FUNCTION: click( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.MODULE + ' ' + message );
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
    };
    // DONE MODULE: brandModule( void ) void 
})( sharesoft );
// done create module function
