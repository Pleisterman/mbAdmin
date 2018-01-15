/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditPasswordStrengthModule.js
 * 
 *  Last revision: 10-01-2017
 * 
 *  Purpose: 
 *          Displays a text input
 *          the text is a time value    
 *          links an error function for error callback
 *          on updates
 *          checks for default focus
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: dataEditPasswordStrengthModule( string: contentId, json: values ) void 
    
    pleisterman.dataEditPasswordStrengthModule = function( contentId, values ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditPasswordStrengthModule';                             // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.values = values;                                           // json: values
        self.contentId = contentId;                                     // string: element id
        self.itemContainerOptions = {                                   // json: item container options
            'id'                    :   'itemContainer' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'table',                        // css display
            'padding'               :   pleisterman.getSetting( 'dataEditItemPadding' ),          // css padding
            'marginTop'             :   pleisterman.getSetting( 'dataEditItemMarginTop' ),        // css margin top
            'marginLeft'            :   pleisterman.getSetting( 'dataEditItemMarginLeft' ),       // css margin left
            'backgroundColor'       :   pleisterman.colors['dataItemBackgroundColor']['color'],   // css color: background color
            'rememberBackgroundColor':  '',                             // css color: remember background color
            'borderRadius'          :   pleisterman.getSetting( 'dataEditBorderRadius' ),         // css border radius
            'mouseOver'             :   false,                          // boolean: mouse over
        };                                                              // done json: item container options
        self.inputContainerOptions = {                                  // json: input container options
            'id'                    :   'inputContainer' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block'                         // css display
        };                                                              // done json: input container options
        self.labelOptions = {                                           // json: label options
            'id'                    :   'dataLabel' + self.values['id'],// string: element id    
            'element'               :   'div',                          // string: html element type
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css vertical align
            'fontSize'              :   pleisterman.getSetting( 'dataEditLabelFontSize' ),        // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditLabelFontWeight' ),      // css font weight
            'marginTop'             :   pleisterman.getSetting( 'dataEditLabelMarginTop' ),       // css margin top    
            'marginRight'           :   pleisterman.getSetting( 'dataEditLabelMarginRight' ),     // css margin right
            'styleWidth'            :   pleisterman.getSetting( 'dataEditLabelWidth' ),           // css style width
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.strengthContainerOptions = {                               // json: strength container options  
            'id'                    :   'dataStrengthContainer' + self.values['id'],  // string: element id
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css vertical align
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: strength ok options  
        self.strengthValidOptions = {                                   // json: strength valid options  
            'id'                    :   'dataStrengthValid' + self.values['id'],  // string: element id
            'text'                  :   pleisterman.translations['invalid'], // string: text      
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'marginTop'             :   '0.4em',                        // css margin top
            'verticalAlign'         :   'middle',                       // css vertical align
            'styleWidth'            :   '10.0em',                       // css style width
            'padding'               :   '0.4em',                        // css padding
            'paddingBottom'         :   '0.6em',                        // css padding bottom
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),    // css font weight
            'color'                 :   pleisterman.colors['editColor']['color'],               // css color: color
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: strength valid options  
        self.strengthColorOptions = {                                      // json: strength color options  
            'id'                    :   'dataStrengthColor' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'marginTop'             :   '0.4em',                        // css margin top
            'marginLeft'            :   '0.6em',                        // css margin left
            'verticalAlign'         :   'middle',                       // css vertical align
            'styleWidth'            :   '5.0em',                        // css style width
            'styleHeigth'           :   pleisterman.getSetting( 'dataEditInputFontSize' ), // css style height
            'padding'               :   '0.4em',                        // css padding
            'paddingBottom'         :   '0.6em',                        // css padding bottom
            'backgroundColor'       :   'red'                           // css color: background color
        };                                                              // done json: strength color options  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // set show password strength function
            self.setShowPasswordStrengthFunction();
            
            // set display options
            self.setDisplayOptions();

            // add html
            self.addHtml();

        // DONE FUNCTION: construct( void ) void
        };
        self.setShowPasswordStrengthFunction = function( ){
        // FUNCTION: setShowPasswordStrengthFunction( void ) void
        
            self.values['showStrengthFunction'] = self.showPasswordStrength;

        // DONE FUNCTION: setShowPasswordStrengthFunction( void ) void
        };
        self.setDisplayOptions = function( ){
        // FUNCTION: setDisplayOptions( void ) void
            
            // add item options
            if( self.values['displayOptions']['item'] ){
                jQuery.extend( self.itemContainerOptions, self.values['displayOptions']['item'] );
            }
            // done add item options
            
            // add label options
            if( self.values['displayOptions']['label'] ){
                jQuery.extend( self.labelOptions, self.values['displayOptions']['label'] );
            }
            // done label options
            
        // DONE FUNCTION: setDisplayOptions( void ) void
        };    
        self.addHtml = function( ){
        // FUNCTION: addHtml( void ) void
            
            // add item container to content
            $( '#' + self.contentId ).append( jsProject.jsonToElementHtml( self.itemContainerOptions ) );

            // add input container to item container
            $( '#' + self.itemContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputContainerOptions ) );

            // label
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
  
            // add strength container to item
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.strengthContainerOptions ) );
            // add strength valid to strength container
            $( '#' + self.strengthContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.strengthValidOptions ) );
            // add strength color to strength container
            $( '#' + self.strengthContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.strengthColorOptions ) );
                            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.showPasswordStrength = function( password ) {
        // FUNCTION: showPasswordStrength( string: password ) void

            // show password strength color
            $( '#' + self.strengthColorOptions['id'] ).css( 'backgroundColor', pleisterman.getPasswordStrengthColor( password ) );
            
            // check password valid
            if( pleisterman.getPasswordStrengthValid( password ) ){
                // show password strength valid
                $( '#' + self.strengthValidOptions['id'] ).html( pleisterman.translations['valid']  );
            }
            else {
                // show password strength valid
                $( '#' + self.strengthValidOptions['id'] ).html( pleisterman.translations['invalid']  );
            }
            // done check password valid
                
        // DONE FUNCTION: showPasswordStrength( string: password ) void
        };
        self.setData = function( ) {
        // FUNCTION: setData( void ) void

            // unused
                
        // DONE FUNCTION: setData( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove values link
            self.values = null;
            
        // DONE FUNCTION: destruct( void ) void
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
            // FUNCTION: setData( void ) void
            setData : function(){
                // call internal setData
                self.setData();
            },
            // FUNCTION: destruct( void ) void
            destruct : function(){
                // call internal destruct
                self.destruct();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: dataEditPasswordStrengthModule( string: contentId, json: values ) void 
})( pleisterman );
// done create module function
