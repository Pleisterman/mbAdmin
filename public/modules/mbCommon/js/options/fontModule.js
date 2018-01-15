/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/options/fontModule.js
 *  
 *  Last Revision:  17-01-2017
 * 
 *  Purpose: 
 *      this module controls the font data
 *      it contains the font dataObject
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Purpose:  
 *      contains the basic html code for the header
 *      of the website
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// create module function
( function( pleisterman ){

    // MODULE: fontModule( void ) void
    
    pleisterman.fontModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'fontModule';                         // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.id = 'font';                                   // string: id
        self.dataObject = [                                 // json: data object
            {  
                'id'                :   'fontSize',         // json: fontSize
                'type'              :   'spinner',          // data type: spinner
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['fontSize'] // string: label TRANSLATION: fontSize
                    }                                       // done json: label
                },                                          // done json: display options
                'value'         :   pleisterman.options['fontSize']['value'], // integer: OPTION: fontSize
                'minimum'       :   10,                     // integer: minimum
                'maximum'       :   36                      // integer: minimum
            },                                              // done json: fontSize
            {  
                'id'             :   'fontFamily',          // json: fontFamily
                'type'           :   'list',                // data type: list
                'displayOptions'    :   {                   // json: display options
                    'label'         :   {                   // json: label
                        'text'          :   pleisterman.translations['fontFamily'] // string: label TRANSLATION: fontFamily
                    },                                      // done json: label
                    'list'          :   {                   // json: list    
                        'styleHeight'       : 120           // css height
                    }                                       // done json: list
                },                                          // done json: display options
                'value'          :   null,                  // integer: value
                'rows'           :   {},                    // json array[ json, json,..]: rows
                'height'         :   140                    // css height
            }                                               // done json: fontFamily
        ];                                                  // done json: data object
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add font families
            self.addFontFamilies();

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add open iniitial selection change
            jsProject.subscribeToEvent( 'openInitialSelection', self.openInitialSelection );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addFontFamilies = function(){
        // FUNCTION: addFontFamilies( void ) void

            // create font family rows
            var rows = Array();
            // get families
            var families = pleisterman.options['fontFamilies']['value'].split(';');
            
            // create selected index
            var selectedIndex = 0;
            
            // loop over families
            for( var i = 0; i < families.length; i++ ){
                // create row
                var row = {
                    'id'        :   i,
                    'text'      :   families[i].replace( /"/g, '' )
                };
                // done create row
                
                // add to rows
                rows.push( row );
                
                // is current font family
                if( row['text'] === pleisterman.options['fontFamily']['value'] ){
                    // remember index 
                    selectedIndex = i;
                }
                // done is current font family
            }
            // done loop over families
            
            // loop over data object
            $.each( self.dataObject, function( index, data ){
                // id is font family
                if( data['id'] === 'fontFamily' ){
                    // set rows
                    data['rows'] = rows;
                    // set elected index
                    data['value'] = selectedIndex;
                }
                // done id is font family
            });
            // done loop over data object
            
        // DONE FUNCTION: addFontFamilies( void ) void
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void
            
            // show font if selected
            if( pleisterman.options['openSubject']['value'] === 'font' ){
                // show
                self.show(); 
            }
            // done show font if selected
            
        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.prepareShow = function() {
        // FUNCTION: prepareShow( void ) void
            
            // debug info
            self.debug( 'prepareShow' );  
            
            // call global prepare data show
            pleisterman.prepareDataShow( self.show );
            
        // DONE FUNCTION: prepareShow( void ) void
        };
        self.show = function(){
        // FUNCTION: show( void ) void
            
            // debug info
            self.debug( 'show' );  
            
            // cancel events
            jsProject.callEvent( 'cancel' );

            // debug info    
            self.debug( 'open subject=' + self.id );
            // set open subject option
            pleisterman.setOption( 'openSubject', self.id );

            // set data values
            jsProject.setValue( 'changed', 'data', false );    
            jsProject.setValue( 'dataObject', 'data', self.dataObject );    
            jsProject.setValue( 'id', 'data', self.id );    
            // set data values
            
            // subscribe to events
            jsProject.subscribeToEvent( 'update', self.update );
            jsProject.subscribeToEvent( 'cancel', self.cancelUpdate );
            // done subscribe to events
            
            // call the edit event
            jsProject.callEvent( 'editOpen' );    
            
        // DONE FUNCTION: show( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
            
            // debug info
            self.debug( 'update' );

            // nothing changed
            if( !jsProject.getValue( 'changed', 'data' ) ){
                // show message nothing changed
                jsProject.callEvent( 'showEditMessage', 'nothingChanged' );
                // done
                return;
            }    
            // done nothing changed
            
            // get the data from the inputs
            jsProject.callEvent( 'editSetData' );
            
            // loop over data object
            $.each( self.dataObject, function( index, data ) {
                // is font size
                if( data['id'] === 'fontSize' ){
                    // debug info
                    self.debug( 'font size: ' + data['value'] );
                    // set option
                    pleisterman.setOption( 'fontSize', data['value'] );
                    // set document font size
                    $( document.body ).css( 'font-size', pleisterman.options['fontSize']['value'] + 'px' );
                }
                // done is font size
                
                // is font family
                if( data['id'] === 'fontFamily' ){
                    // get index
                    var fontIndex = data['value'];
                    // get font
                    var font = data['rows'][fontIndex]['text'];
                    // set option
                    pleisterman.setOption( 'fontFamily', font );
                    // set document body font
                    $( document.body ).css( 'font-family', font );
                }
                // done is font family
            });
            // done loop over data object
            
            // call global font change
            jsProject.callEvent( 'fontChange' );
            // call global scebe change
            jsProject.callEvent( 'sceneChange' );
            // show update message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );
            // set data unchanged
            jsProject.setValue( 'changed', 'data', false );    
            
        // DONE FUNCTION: update( void ) void
        };        
        self.cancelUpdate = function( ){
        // FUNCTION: cancelUpdate( void ) void
            
            // debug info
            self.debug( 'cancelUpdate' );  
            
            // remove event subscriptions
            jsProject.unSubscribeFromEvent( 'update', self.update );
            jsProject.unSubscribeFromEvent( 'cancel', self.cancelUpdate );
            // done remove event subscriptions
            
            // unset data id
            jsProject.setValue( 'id', 'data', null );    
            // unset data object
            jsProject.setValue( 'dataObject', 'data', null );    
            // reset data changed
            jsProject.setValue( 'changed', 'data', false );
            // unset open subject
            pleisterman.setOption( 'openSubject', null );            
            // call cancel event
            jsProject.callEvent( 'cancel' );
            
        // DONE FUNCTION: cancelUpdate( void ) void
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
            show : function(){
                // call internal prepare show
                self.prepareShow();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: fontModule( void ) void 
})( pleisterman );
// done create module function
