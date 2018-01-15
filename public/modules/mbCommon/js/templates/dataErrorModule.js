/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/templates/dataErrorModule.js
 * 
 *  Purpose: 
 *                      
 *  Last Revision: 01-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( sharesoft ){

    // MODULE: dataErrorModule( void ) void
    
    sharesoft.dataErrorModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'dataErrorModule';                            // string: MODULE
        self.debugOn = false;                                       // boolean: debugOn
        self.containerOptions = {
            'id'                    :   'dataEditErrorContainer',   // string
            'element'               :   'div',                      // string html element type 
            'position'              :   'absolute',                 // css position
            'backgroundColor'       :   'rgba( 100,100,100,0.4)',
            'display'               :   'none',                     // css displat style
            'visible'               :   false,                      // boolean
            'border'                :   true,                       // px
            'borderColor'           :   sharesoft.colors['errorDialogBorderColor']['color'],
            'borderWidth'           :   1,                          // px
            'borderStyle'           :   'solid',                    // css border style
            'zIndex'                :   sharesoft.getSetting( 'zIndexDataError' ).toString(),
            'borderRadius'          :   5
        };         
        self.errorOptions = {
            'id'                    :   'dataErrorContainer',       // string
            'element'               :   'div',                      // string html element type 
            'backgroundColor'       :   sharesoft.colors['errorDialogBackgroundColor']['color'],
            'color'                 :   sharesoft.colors['errorColor']['color'],
            'padding'               :   6
        };
        self.displayOptions = {
            'above' :   {
                'marginBottom'         :   8
            },
            'under' :   {
                'marginTop'      :   0
            },
            'marginRight'           :   10,
            'marginLeft'            :   5,
            'scrollMargin'          :   60
        };
        self.callerOptions = {
            'id'             :   ''                  // string
        };
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
            // add the extensions to sharesoft
            self.addApplicationsExtensions();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // create the get error
            sharesoft.showDataError = self.getError;
            // create hide data error
            sharesoft.hideDataError = self.hide;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // add data content scroll 
            jsProject.subscribeToEvent( 'dataContentScroll', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // add container to overlay
            $( '#dataContent' ).append( jsProject.jsonToElementHtml( self.containerOptions ) );

            // add item container to content
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.getError = function( elementId, errorId ){
        // FUNCTION: getError( void ) void
            
            // remember caller
            self.callerOptions['id'] = elementId;
            sharesoft.getError( errorId, self.show );
            
        // DONE FUNCTION: getError( void ) void
        };
        self.show = function(  error ){
        // FUNCTION: show( void ) void
            
            // debug info
            self.debug( 'show error: ' + error );
            // set text
            $( '#' + self.errorOptions['id'] ).html( error );

            // show container
            $( '#' + self.containerOptions['id'] ).show();
            self.containerOptions['visible'] = true;
            
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( void ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            self.containerOptions['visible'] = false; 
            $( '#' + self.containerOptions['id'] ).hide();
            
        // DONE FUNCTION: hide( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            if( !self.containerOptions['visible'] ){
                return;
            }
            
            // get caler position
            var position =  jsProject.getElementPosition( 'inputData' + self.callerOptions['id'] );
            // get date picker height
            var errorHeight = $( '#' + self.containerOptions['id'] ).height();
            // get date picker width
            var errorWidth = $( '#' + self.containerOptions['id'] ).width();
            // get layuot height
            var layoutHeight =  $( '#layout' ).height();

            // caller position > layout height / 2
            if( position['top'] > ( layoutHeight / 2 ) ){
                position['top'] -= self.displayOptions['above']['marginBottom'];
            }
            // caller position < layout height / 2
            else {
                position['top'] += errorHeight;
                position['top'] += self.displayOptions['under']['marginTop'];
            }
            // done caller position < layout height / 2
            
            // top maximum layout height - date picker height or top 
            position['top'] = Math.min( position['top'], layoutHeight - errorHeight );
            // top minimum 0
            position['top'] = Math.max( position['top'], 0 );
            
            // move position left when caller position is 3 / 4 to the right            
            if( position['left'] > ( $( '#layout').width() / 4 ) * 3 ){
                position['left'] -= errorWidth / 2;
            }
            // done move position left when caller position is 3 / 4 to the right            

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
        };
        // DONE PUBLIC
    };
    // DONE MODULE: dataErrorModule( void ) void
})( sharesoft );
// done create module function
