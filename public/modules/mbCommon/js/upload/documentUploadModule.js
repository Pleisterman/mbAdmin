/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/upload/documentUploadModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( sharesoft ){

    // MODULE: documentUploadModule( void ) void 
    
    sharesoft.documentUploadModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'documentUploadModule';                           // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.overlayOptions = {                                         // json: overlay options 
            'id'                    :   'dataEditOverlay'               // string: element id
        };                                                              // done json: overlay options
        self.containerOptions = {                                       // json: container options
            'id'                    :   self.MODULE + 'Upload',         // string: element id
            'element'               :   'div',                          // string html: element type 
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   sharesoft.colors['panelBackgroundColor']['color'], // css color: background color
            'border'                :   true,                           // boolean has border
            'borderColor'           :   sharesoft.colors['panelBorderColor']['color'],  // css color: border color
            'borderWidth'           :   '0.2em',                        // css border width
            'borderStyle'           :   'groove',                       // css border style
            'padding'               :   '0.4em',                        // css padding
            'open'                  :   false                           // boolean: open
        };                                                              // done json: container options    
        self.headerOptions = {                                          // json: header options
            'element'               :   'div',                          // string: html element type 
            'padding'               :   '0.5em',                        // css padding
            'fontSize'              :   '1.0em',                        // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'borderRadius'          :   '0.2em',                        // css border radius
            'backgroundColor'       :   sharesoft.colors['panelHighlightBackgroundColor']['color'], // css color: background color
            'color'                 :   sharesoft.colors['panelHighlightColor']['color'],           // css color: color
            'textAlign'             :   'left'                          // css text align    
        };                                                              // done json: header options
        self.frameOptions = {                                           // json: frame options
            'id'                    :   self.MODULE + 'Frame',          // string: element id
            'element'               :   'iframe',                       // string: html element type 
            'display'               :   'block',                        // css display style
            'minimumWidth'          :   '42.0em',                       // css minimum width
            'styleHeight'           :   '16.0em',                       // css style height
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: frame options
        self.displayOptions = {                                         // json display options
            'visible'               :   false,                          // boolean: visible
            'above' :   {                                               // json: above
                'marginBottom'      :   25                              // integer: margin bottom
            },                                                          // done json: above
            'under' :   {                                               // json: under
                'marginTop'         :   65                              // integer: margin top
            }                                                           // done json: under
        };                                                              // done json: display options
        self.callerOptions = null;                                      // json: caller options 
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
        
            // add the extensions to sharesoft
            self.addApplicationsExtensions();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show document upload
            sharesoft.showDocumentUpload = self.showUploadFrame;
            // get document upload options
            sharesoft.getDocumentUploadOptions = self.getUploadOptions;
            // hide frame
            sharesoft.hideDocumentUpload = self.hideUploadFrame;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.showUploadFrame = function( options ) {
        // FUNCTION: showUploadFrame( json: options ) void
            
            // debug info
            self.debug( 'showUploadFrame' );
            
            // already open
            if( self.containerOptions['open'] ){
                // done already open
                return;
            }
            // already open
            
            // remember open
            self.containerOptions['open'] = true;
            
            // remember caller
            self.callerOptions = options;
            // done remember caller
            
            // create the html
            self.addHtml();

            // load frame
            $( '#' + self.frameOptions['id'] ).attr('src', '/' + sharesoft.baseDirectory + '/upload' );

            // show overlay
            $( '#' + self.overlayOptions['id'] ).show();
            
            // remember visibility
            self.displayOptions['visible'] = true;
            
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: showUploadFrame( json: options ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add item container to content
            $( '#' + self.overlayOptions['id'] ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
            
            // add header to container
            if( self.callerOptions['mode'] === 'insert' ){
                // set heder text
                self.headerOptions['text'] = sharesoft.translations['documentUploadInsertHeader'];
            }
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );
            // done add header to container
            
            // add frame to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.frameOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.getUploadOptions = function(){
        // FUNCTION: getUploadOptions( void ) void
            
            // debug info
            self.debug( 'getUploadOptions' );
            // return caller options
            return self.callerOptions; 
            
        // DONE FUNCTION: getUploadOptions( void ) void
        };
        self.hideUploadFrame = function( ){
        // FUNCTION: hideUploadFrame( void ) void
            
            // debug info
            self.debug( 'hideUploadFrame ' );
            
            // hide overlay
            $( '#' + self.overlayOptions['id'] ).html( '' );
            $( '#' + self.overlayOptions['id'] ).hide();
            // done hide overlay
            
            // remember visibility
            self.displayOptions['visible'] = false;
            // remember open
            self.containerOptions['open'] = false;
            
            // has callback
            if( self.callerOptions['callback'] ){
                // unset caller callback
                self.callerOptions['callback'] = null;
            }
            // done has callback
            
            // unset caller options
            self.callerOptions = null;
            
        // DONE FUNCTION: hideUploadFrame( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // visible
            if( !self.displayOptions['visible'] ){
                // nothing to do not visible
                return;
            }
            // done visible
            
            // get caller position
            var position =  jsProject.getElementPosition( self.callerOptions['elementId'] );

            // get container height
            var containerHeight = $( '#' + self.containerOptions['id'] ).height();
            // get contaainer width
            var containerWidth = $( '#' + self.containerOptions['id'] ).width();
            // get layout height
            var layoutHeight =  $( '#layout' ).height();
            
            // caller position > layout height / 2
            if( position['top'] > ( layoutHeight / 2 ) ){
                position['top'] -= containerHeight;
                position['top'] -= self.displayOptions['above']['marginBottom'];
            }
            // caller position < layout height / 2
            else {
                position['top'] += self.displayOptions['under']['marginTop'];
            }
            // done caller position < layout height / 2
            
            // top maximum layout height - date picker height or top 
            position['top'] = Math.min( position['top'], layoutHeight - containerHeight );
            // top minimum 0
            position['top'] = Math.max( position['top'], 0 );
            
            // move position left when caller position is 3 / 4 to the right            
            if( position['left'] > ( $( '#layout').width() / 4 ) * 3 ){
                position['left'] -= containerWidth / 2;
            }
            // done move position left when caller position is 3 / 4 to the right            

            // move position left when conainer left + width > layout width             
            if( position['left'] + containerWidth > $( '#layout').width() ){
                position['left'] = $( '#layout').width() - ( containerWidth + 100 );
            }
            // done move position left when conainer left + width > layout width             
            
            // set position
            $( '#' + self.containerOptions['id'] ).css( 'top', position['top'] + 'px' );
            $( '#' + self.containerOptions['id'] ).css( 'left', position['left'] + 'px' );
            // set position
            
        // DONE FUNCTION: layoutChange( void ) void
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
            // FUNCTION: show( void ) void
            show : function( ){
                // call internal
                self.show( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: documentUploadModule( void ) void 
})( sharesoft );
// done create module function
