/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/user/resetPasswordDialogModule.js
 *  
 *  Purpose: 
 * 
 *  Last Revision:  17-01-2017
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

    // MODULE: resetPasswordDialogModule( void ) void
    
    pleisterman.resetPasswordDialogModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'resetPasswordDialogModule';                      // string: MODULE
        self.debugOn = false;                                            // boolean: debug on
        self.callback = null;                                           // function: callback
        self.visible = false;                                           // boolean: visible
        self.layerOptions = {                                           // json: layer options
            'id'                    :   self.MODULE + 'Layer',          // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'display'               :   'none',                         // css display
            'top'                   :   0,                              // css top
            'left'                  :   0,                              // css left
            'styleHeight'           :   '100%',                         // css style height
            'styleWidth'            :   '100%',                         // css style width
            'backgroundColor'       :   pleisterman.colors['overlayBackgroundColor']['color'], 
            'zIndex'                :   pleisterman.getSetting( 'zIndexMessageLayer' ).toString()
        };                                                              // done json: layer options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   self.MODULE + 'Dialog',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'overflow'              :   'hidden',                       // css overflow
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '60em',                         // css style width
            'border'                :   pleisterman.getSetting( 'dialogBorder' ),                 // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'dialogBorderWidth' ),            // css border width
            'borderColor'           :   pleisterman.colors['dialogBorderColor']['color'],         // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'dialogBorderStyle' ),            // css border style
            'borderRadius'          :   pleisterman.getSetting( 'dialogBorderRadius' ),           // css border radius
            'backgroundColor'       :   pleisterman.colors['dialogBackgroundColor']['color']      // css color: background color
        };                                                              // done json: dialog options
        self.scrollContainerOptions = {                                 // json: scroll container options                     
            'id'                    :   self.MODULE + 'DialogScollContainer', // string: element id
            'element'               :   'div',                          // string: html element type  
            'margin'                :   20,                             // css margin
            'overflowY'             :   'auto',                         // css overflow-y
            'styleHeight'           :   '25.5em',                       // css style height
            'maximumMargin'         :   50                              // integer: maximum margin
        };                                                              // done json: scroll container options 
        self.headerContainerOptions = {                                 // json: header container options
            'id'                    :   self.MODULE + 'DialogHeaderContainer',  // string
            'element'               :   'div'                           // string html element type 
        };                                                              // done json: header container options  
        self.headerOptions = {                                          // json: header options  
            'id'                    :   self.MODULE + 'DialogHeader',   // string: element id
            'element'               :   'div',                          // string html element type 
            'text'                  :   pleisterman.translations['passwordResetHeader'],                // string: text
            'fontSize'              :   pleisterman.getSetting( 'dialogHeaderFontSize' ),         // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogHeaderFontWeight' ),       // css font weight
            'color'                 :   pleisterman.colors['dialogHighlightColor']['color'],      // css color: color
            'marginLeft'            :   pleisterman.getSetting( 'dialogHeaderMarginLeft' ),       // css margin left
            'marginBottom'          :   pleisterman.getSetting( 'dialogHeaderMarginBottom' ),     // css margin top
            'padding'               :   pleisterman.getSetting( 'dialogHeaderPadding' )           // css padding
        };                                                              // done json: header options  
        self.subHeaderContainerOptions = {                                // json: sub header container options  
            'id'                    :   self.MODULE + 'DialogSubHeaderContainer',   // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginTop'             :   '1.2em',                        // css margin bottom
            'marginBottom'          :   '1.2em',                        // css margin bottom
            'minimumHeight'         :   '2.4em'                         // css style height
        };                                                              // done json: sub header container options              
        self.subHeaderOptions = {                                         // json: sub header options        
            'id'                    :   self.MODULE + 'DialogSubHeader',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   pleisterman.translations['passwordResetSubHeader'],       // string: text
            'fontSize'              :   pleisterman.getSetting( 'dialogMessageFontSize' ),        // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogMessageFontWeight' ),      // css font weight 
            'marginLeft'            :   pleisterman.getSetting( 'dialogMessageMarginLeft' ),      // css margin left
            'paddingLeft'           :   pleisterman.getSetting( 'dialogMessagePaddingLeft' ),     // css padding left
            'paddingRight'          :   pleisterman.getSetting( 'dialogMessagePaddingRight' )     // css padding right
        };                                                              // done json: sub header options                    
        self.contentOptions = {                                         // json: content options  
            'id'                    :   self.MODULE + 'Content',        // string: element id
            'element'               :   'div',                          // string: html element type 
            'styleHeight'           :   '10.5em',                        // css style height
            'backgroundColor'       :   'transparent'                   // css color: background color    
        };                                                              // done json: content options  
        self.itemOptions = {                                            // json: item options  
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'block',                        // css display
            'padding'               :   pleisterman.getSetting( 'dataEditItemPadding' ),          // css padding
            'marginTop'             :   pleisterman.getSetting( 'dataEditItemMarginTop' ),        // css margin top
            'marginLeft'            :   pleisterman.getSetting( 'dataEditItemMarginLeft' ),       // css margin left
            'marginRight'           :   '2.1em',                        // css margin right
            'backgroundColor'       :   pleisterman.colors['dataItemBackgroundColor']['color'], // css color: background color
            'borderRadius'          :   pleisterman.getSetting( 'dataEditBorderRadius' ),       // css border radius
            'cursor'                :   'pointer',                      // css cursor
            'marginBottom'          :   '0.4em'                         // css margin bottom
        };                                                              // done json: item options  
        self.labelOptions = {                                           // json: label options  
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css vertical align
            'fontSize'              :   '1.1em',                        // css font size
            'fontWeight'            :   'normal',                       // css font weight    
            'marginRight'           :   '0.6em',                        // css margin rigth
            'styleWidth'            :   '16em',                          // css style width
            'paddingLeft'           :   '2.2em',                        // css padding left
            'marginTop'             :   '0.6em',                        // css margin top
            'marginBottom'          :   '0.6em'                         // css margin bottom
        };                                                              // done json: label options  
        self.inputOptions = {                                           // json: input options  
            'element'               :   'input',                        // string: input type 
            'maxlength'             :   32,                             // integer: html input max length
            'type'                  :   'password',                     // string: input type 
            'paddingLeft'           :   '0.2em',                        // css padding left
            'verticalAlign'         :   'middle',                       // css verical align
            'styleWidth'            :   '25em',                         // css style width
            'display'               :   'inline-block',                 // css display
            'marginLeft'            :   '0.6em',                        // css margin left
            'marginTop'             :   '0.6em',                        // css margin top
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),    // css font weight
            'color'                 :   pleisterman.colors['editColor']['color']                // css color: color
        };                                                              // done json: input options  
        self.strengthContainerOptions = {                               // json: strength container options  
            'id'                    :   self.MODULE + 'DialogStrengthContainer',  // string: element id
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css vertical align
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: strength ok options  
        self.strengthValidOptions = {                                   // json: strength valid options  
            'id'                    :   self.MODULE + 'DialogStrengthValid',  // string: element id
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
            'id'                    :   self.MODULE + 'DialogStrengthColor',  // string: element id
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
        self.buttonContainerOptions = {                                 // json: button container options 
            'id'                    :   self.MODULE + 'DialogButtonContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginTop'             :   '1.6em',                        // css margin top
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button container options     
        self.buttonOptions = {                                          // json: button options   
            'id'                    :   self.MODULE + 'ok',             // string: element id 
            'text'                  :   pleisterman.translations['ok'],   // string: text      
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display 
            'minimumWidth'          :   '6.0em',                        // css minimum width
            'color'                 :   pleisterman.colors['buttonColor']['color'],           // css color: color
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'],     // css color: background color    
            'fontSize'              :   pleisterman.getSetting( 'buttonFontSize' ),               // css font size
            'fontWeight'            :   pleisterman.getSetting( 'buttonFontWeight' ),             // css font weight
            'padding'               :   pleisterman.getSetting( 'dialogButtonPadding' ),          // css padding   
            'marginTop'             :   pleisterman.getSetting( 'dialogButtonMarginTop' ),        // css margin top
            'marginBottom'          :   pleisterman.getSetting( 'dialogButtonMarginBottom' ),     // css margin bottom    
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),            // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],         // css color: border color
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),            // css border style
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),           // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: button options     
        self.buttonSpacingOptions = {                                   // json: button spacing options
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'styleWidth'            :   '2.0em'                         // css style width
        };                                                              // done json: button spacing options
        self.errorContainerOptions = {                                  // json: error container options  
            'id'                    :   self.MODULE + 'DialogErrorContainer',   // string: element id
            'element'               :   'div',                          // string: html element type 
            'marginRight'           :   '2.5em',                        // css margin right
            'marginTop'             :   '1.2em',                        // css margin top
            'marginBottom'          :   '1.2em',                        // css margin bottom
            'minimumHeight'         :   '2.4em'                         // css style height
        };                                                              // done json: error container options              
        self.errorOptions = {                                           // json: error options        
            'id'                    :   self.MODULE + 'DialogError',    // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text
            'fontSize'              :   pleisterman.getSetting( 'dialogMessageFontSize' ),        // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dialogMessageFontWeight' ),      // css font weight 
            'backgroundColor'       :   'transparent',                                          // css color: background color    
            'color'                 :   pleisterman.colors['errorColor']['color'],                // css color: color
            'marginLeft'            :   pleisterman.getSetting( 'dialogMessageMarginLeft' ),      // css margin left
            'padding'               :   pleisterman.getSetting( 'dialogButtonPadding' ),          // css padding   
            'paddingLeft'           :   pleisterman.getSetting( 'dialogMessagePaddingLeft' ),     // css padding left
            'paddingRight'          :   pleisterman.getSetting( 'dialogMessagePaddingRight' )     // css padding right
        };                                                              // done json: error options                    
        self.passwordVisible = false;
        self.password = '';
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
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add message layer
            $( document.body ).append( jsProject.jsonToElementHtml( self.layerOptions ) );

            // add the dialog
            $( '#' + self.layerOptions['id'] ).append( jsProject.jsonToElementHtml( self.dialogOptions ) );

            // add the scroll container
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.scrollContainerOptions ) );
            
            // add header container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerContainerOptions ) );

            // add header 
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // add message container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.subHeaderContainerOptions ) );

            // add message 
            $( '#' + self.subHeaderContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.subHeaderOptions ) );

            // add content
            self.addContent();

            // add error
            self.addError();

            // add buttons
            self.addButtons();

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addContent = function(){
        // FUNCTION: addContent( void ) void
            
            // add content
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.contentOptions ) );
            
            // add password
            self.addPassword();
            
            // add password repeat
            self.addPasswordRepeat();
            
            // add password strength
            self.addPasswordStrength();

        // DONE FUNCTION: addContent( void ) void
        };
        self.addPassword = function(){
        // FUNCTION: addPassword( void ) void

            // set id    
            self.itemOptions['id'] = self.MODULE + 'PasswordItem';
            // add item to content
            $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.itemOptions ) );
            // set id    
            self.labelOptions['id'] = self.MODULE + 'PasswordLabel';
            // set text    
            self.labelOptions['text'] = pleisterman.translations['passwordNew'];
            // add label to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
            // set id    
            self.inputOptions['id'] = self.MODULE + 'PasswordInput';
            // add input to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );
            // done add label to item

        // DONE FUNCTION: addPassword( void ) void
        };    
        self.addPasswordRepeat = function(){
        // FUNCTION: addPasswordRepeat( void ) void

            // set id    
            self.itemOptions['id'] = self.MODULE + 'PasswordRepeatItem';
            // add item to content
            $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.itemOptions ) );
            // set id    
            self.labelOptions['id'] = self.MODULE + 'PasswordRepeatLabel';
            // set text    
            self.labelOptions['text'] = pleisterman.translations['passwordRepeat'];
            // add label to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
            // set id    
            self.inputOptions['id'] = self.MODULE + 'PasswordRepeatInput';
            // add input to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );

        // DONE FUNCTION: addPassword( void ) void
        };    
        self.addPasswordStrength = function(){
        // FUNCTION: addPasswordStrength( void ) void

            // set id    
            self.itemOptions['id'] = self.MODULE + 'PasswordStrengthItem';
            // add item to content
            $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.itemOptions ) );
            // set id    
            self.labelOptions['id'] = self.MODULE + 'PasswordStrengthLabel';
            // set text    
            self.labelOptions['text'] = pleisterman.translations['passwordStrength'];
            // add label to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
            // add strength container to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.strengthContainerOptions ) );
            // add strength valid to strength container
            $( '#' + self.strengthContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.strengthValidOptions ) );
            // add strength color to strength container
            $( '#' + self.strengthContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.strengthColorOptions ) );

        // DONE FUNCTION: addPasswordStrength( void ) void
        };    
        self.addError = function() {
        // FUNCTION: addError( void ) void
            
            // add error container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorContainerOptions ) );
            // add error 
            $( '#'  + self.errorContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.errorOptions ) );

        // DONE FUNCTION: addPasswordStrength( void ) void
        };    
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // add button container
            $( '#'  + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );

            // set id
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'Ok';
            // set text
            self.buttonOptions['text'] =  pleisterman.translations['ok'];
            // add ok button
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
            // set id
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'SpacingOkCancel';
            // add spacing
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonSpacingOptions ) );

            // set id
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'Cancel';
            // set text
            self.buttonOptions['text'] =  pleisterman.translations['cancel'];
            // add cancel button
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
                        
            // set id
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'SpacingCancelShowPassword';
            // add spacing
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonSpacingOptions ) );

            // set id
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'ShowPassword';
            // set text
            self.buttonOptions['text'] =  pleisterman.translations['showPassword'];
            // add show password button
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
                        
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void

            // create password input id
            var passwordItemId = self.MODULE + 'PasswordItem';
            // add events password events
            $( '#' + passwordItemId ).keyup( function( event ){ self.passwordChange( ); }); 
            $( '#' + passwordItemId ).mouseover( function( event ){ self.itemMouseOver( passwordItemId ); }); 
            $( '#' + passwordItemId ).mouseout( function( event ){ self.itemMouseOut( passwordItemId ); }); 
            $( '#' + passwordItemId ).click( function( event ){ self.passwordClick(); }); 
            // done add events
            
            // create password repeat input id
            var passwordRepeatItemId = self.MODULE + 'PasswordRepeatItem';
            // add password repeat events
            $( '#' + passwordRepeatItemId ).mouseover( function( event ){ self.itemMouseOver( passwordRepeatItemId ); }); 
            $( '#' + passwordRepeatItemId ).mouseout( function( event ){ self.itemMouseOut( passwordRepeatItemId ); }); 
            $( '#' + passwordRepeatItemId ).click( function( event ){ self.passwordRepeatClick(); }); 
            // done add password repeat events
            
            // add ok button events
            var idOk = self.dialogOptions['id'] + 'Ok';
            $( '#' + idOk ).mouseover( function( event ){ self.buttonMouseOver( idOk ); }); 
            $( '#' + idOk ).mouseout( function( event ){ self.buttonMouseOut( idOk ); }); 
            $( '#' + idOk ).click( function( event ){ self.ok(); }); 
            // done add ok button events
            
            // add cancel button events
            var idCancel = self.dialogOptions['id'] + 'Cancel';
            $( '#' + idCancel ).mouseover( function( event ){ self.buttonMouseOver( idCancel ); }); 
            $( '#' + idCancel ).mouseout( function( event ){ self.buttonMouseOut( idCancel ); }); 
            $( '#' + idCancel ).click( function( event ){ self.cancel(); }); 
            // done add cancel button events

            // add show password button events
            var idShowPassword = self.dialogOptions['id'] + 'ShowPassword';
            $( '#' + idShowPassword ).mouseover( function( event ){ self.buttonMouseOver( idShowPassword ); }); 
            $( '#' + idShowPassword ).mouseout( function( event ){ self.buttonMouseOut( idShowPassword ); }); 
            $( '#' + idShowPassword ).click( function( event ){ self.togglePassword(); }); 
            // done add show password button events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.show = function( callback ){
        // FUNCTION: show( function: callback ) void
            
            // remember callback
            self.callback = callback;
            
            // show dialog
            $( '#' + self.layerOptions['id'] ).show( );
            
            // add tab stop
            self.addTabStops();
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'message' );
            
            // set visibility
            self.visible = true;
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: show( function: callback ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add password tabstops
            self.addPasswordTabStop();
            // add password repeat tabstops
            self.addPasswordRepeatTabStop();
            // add ok button tabstops
            self.addOkTabStop();
            // add cancel button tabstops
            self.addCancelTabStop();
            // add show password button tabstops
            self.addShowPasswordTabStop();
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.addPasswordTabStop = function(){
        // FUNCTION: addPasswordTabStop( void ) void
            
            // create id
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.MODULE + 'PasswordItem',
                'layer'     :   'message',
                'select'    :   self.itemMouseOver,
                'deSelect'  :   self.itemMouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.MODULE + 'PasswordInput'
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addPasswordTabStop( void ) void
        };
        self.addPasswordRepeatTabStop = function(){
        // FUNCTION: addPasswordRepeatTabStop( void ) void
            
            // create id
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.MODULE + 'PasswordRepeatItem',
                'layer'     :   'message',
                'select'    :   self.itemMouseOver,
                'deSelect'  :   self.itemMouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.MODULE + 'PasswordRepeatInput'
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addPasswordRepeatTabStop( void ) void
        };
        self.addOkTabStop = function(){
        // FUNCTION: addOkTabStop( void ) void
            
            // create id
            var id = self.dialogOptions['id'] + 'Ok';
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'message',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.ok
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addOkTabStop( void ) void
        };
        self.addCancelTabStop = function(){
        // FUNCTION: addCancelTabStop( void ) void
            
            // create id
            var id = self.dialogOptions['id'] + 'Cancel';
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'message',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.cancel
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addCancelTabStop( void ) void
        };
        self.addShowPasswordTabStop = function(){
        // FUNCTION: addShowPasswordTabStop( void ) void
            
            // create id
            var id = self.dialogOptions['id'] + 'ShowPassword';
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'message',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.togglePassword
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addShowPasswordTabStop( void ) void
        };
        self.itemMouseOver = function( id ){
        // FUNCTION: itemMouseOver( string: element id ) void
            
            // background color highlight
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // color highlight
            $( '#' + id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: itemMouseOver( string: element id ) void
        };
        self.itemMouseOut = function( id ){
        // FUNCTION: itemMouseOut( string: element id ) void
            
            if( jsProject.getValue( 'selected', 'tabStops' ) === id ){
                return;
            }
            
            // background color default
            $( '#' + id ).css( 'background-color', pleisterman.colors['dataItemBackgroundColor']['color'] );
            // color default
            $( '#' + id ).css( 'color', pleisterman.colors['commonColor']['color'] );
            
        // DONE FUNCTION: itemMouseOut( string: element id ) void
        };
        self.buttonMouseOver = function(  id ){ 
        // FUNCTION: buttonMouseOver( void ) void
            
            // debug info
            self.debug( 'buttonMouseOver: ' + id );
            // mouse over -> background color highlight
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + id ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( void ) void
        };
        self.buttonMouseOut = function( id ){
        // FUNCTION: buttonMouseOut( void ) void
            
            // debug info
            self.debug( 'buttonMouseOut: ' + id );
                    self.debug( 'selected: ' + jsProject.getValue( 'selected', 'tabStops' ) );

            // is selected
            if( jsProject.getValue( 'selected', 'tabStops' ) === id ){
                // done keep selected
                return;
            }
            // is selected
            
            // mouse out -> background color default
            $( '#' + id ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + id ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( void ) void
        };
        self.passwordChange = function( ){ 
        // FUNCTION: passwordChange( void ) void

            // get password
            var password = $.trim( $( '#' + self.MODULE + 'PasswordInput' ).val() );
            
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
            
            // unset error
            self.showError( '' );
            
        // DONE FUNCTION: passwordChange( void ) void
        };
        self.passwordClick = function( ){ 
        // FUNCTION: passwordRepeatClick( void ) void
            
            // set tabstop on password repeat input
            jsProject.callEvent( 'selectTabStop', self.MODULE + 'PasswordItem' );
            
        // DONE FUNCTION: passwordClick( void ) void
        };
        self.passwordRepeatClick = function( ){ 
        // FUNCTION: passwordRepeatClick( void ) void
            
            // set tabstop on password repeat input
            jsProject.callEvent( 'selectTabStop', self.MODULE + 'PasswordRepeatItem' );
            
        // DONE FUNCTION: passwordRepeatClick( void ) void
        };
        self.ok = function( ){ 
        // FUNCTION: ok( void ) void
            
            // debug info
            self.debug( 'ok' );
            
            // set tabstop on email input
            jsProject.callEvent( 'selectTabStop', self.itemOptions['id'] );
            
            // check data
            if( self.hasDataErrors() ){
                // set tabstop on password repeat input
                jsProject.callEvent( 'selectTabStop', self.MODULE + 'PasswordItem' );
                // done with error
                return;
            }
            // done check data

            // remember password
            self.password = $( '#' + self.MODULE + 'PasswordInput' ).val(); 

            // close dialog
            self.close();

            // call callback
            self.callback( true );            
            
        // DONE FUNCTION: ok( void ) void
        };
        self.cancel = function( ){ 
        // FUNCTION: cancel( void ) void
            
            // debug info
            self.debug( 'cancel' );
            
            // close dialog
            self.close();
            
            // call callback
            self.callback( false );            

        // DONE FUNCTION: cancel( void ) void
        };
        self.close = function( ){ 
        // FUNCTION: close( void ) void

            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'message' );
            // hide layer
            $( '#' + self.layerOptions['id'] ).hide();
            
        // DONE FUNCTION: close( void ) void
        };
        self.togglePassword = function( ){ 
        // FUNCTION: togglePassword( void ) void
            
            // password is visible
            if( self.passwordVisible ){
                // set input type password
                $( '#' + self.MODULE + 'PasswordInput' ).attr( 'type', 'password' );
                // set input type password
                $( '#' + self.MODULE + 'PasswordRepeatInput' ).attr( 'type', 'password' );
                // set button text
                $( '#' + self.dialogOptions['id'] + 'ShowPassword' ).html( pleisterman.translations['showPassword'] );
            }
            else {
                // set input type password
                $( '#' + self.MODULE + 'PasswordInput' ).attr( 'type', 'text' );
                // set input type password
                $( '#' + self.MODULE + 'PasswordRepeatInput' ).attr( 'type', 'text' );
                // set button text
                $( '#' + self.dialogOptions['id'] + 'ShowPassword' ).html( pleisterman.translations['hidePassword'] );
            }
            // done password is visible
            
            // remember visibility change
            self.passwordVisible = !self.passwordVisible;
            
        // DONE FUNCTION: togglePassword( void ) void
        };
        self.hasDataErrors = function( ){ 
        // FUNCTION: hasDataErrors( void ) void

            // trim password
            $( '#' + self.MODULE + 'PasswordInput' ).val( $.trim( $( '#' + self.MODULE + 'PasswordInput' ).val() ) );
            // trim password repeat
            $( '#' + self.MODULE + 'PasswordRepeatInput' ).val( $.trim( $( '#' + self.MODULE + 'PasswordRepeatInput' ).val() ) );
            // get password
            var password =  $( '#' + self.MODULE + 'PasswordInput' ).val();
            // get repeat password
            var repeatPassword = $( '#' + self.MODULE + 'PasswordRepeatInput' ).val();
            
            // validate password
            if( pleisterman.validatePassword( password, repeatPassword, self.showError ) ){ 
                // done
                false;
            }
            else {
                // done with error
                return true;
            }
            // done validate password
            
        // DONE FUNCTION: hasDataErrors( void ) void
        };
        self.showError = function( error ){ 
        // FUNCTION: showError( string: error ) void
            
            if( error === '' ){
                // set background color
                $( '#' + self.errorOptions['id'] ).css( 'background-color', 'transparent' );
            }
            else {
                // set background color
                $( '#' + self.errorOptions['id'] ).css( 'background-color', pleisterman.colors['errorDialogBackgroundColor']['color'] );
            }
            
            // show password strength valid
            $( '#' + self.errorOptions['id'] ).html( error );
            
        // DONE FUNCTION: showError( string: error ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // !visible
            if( !self.visible ){
                return;
            }
            // done !visible

            // set dimensions for dialog
            $( '#' + self.dialogOptions['id'] ).css( 'max-width', $( '#layout' ).width() );
            $( '#' + self.dialogOptions['id'] ).css( 'max-height', $( '#layout' ).height() );
            // done set dimensions for dialog
            
            // calculate and set height off the scrollcontainer
            var height = $( '#layout' ).height();
            height -= self.scrollContainerOptions['margin'] * 2;
            height -= self.scrollContainerOptions['maximumMargin']; 
            $( '#' + self.scrollContainerOptions['id'] ).css( 'height', self.scrollContainerOptions['styleHeight'] );
            var totalContainerHeight = $( '#' + self.scrollContainerOptions['id'] ).height();
            totalContainerHeight += $( '#' + self.subHeaderContainerOptions['id'] ).height();
            if(  totalContainerHeight > height ){
                $( '#' + self.scrollContainerOptions['id'] ).height( height );
            }
            else {
                $( '#' + self.scrollContainerOptions['id'] ).height( totalContainerHeight );
            }
            // done calculate and set height off the scrollcontainer

            // calculate and set button positions
            var totalWidth = 0;
            totalWidth += $( '#' + self.dialogOptions['id'] + 'Ok' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'SpacingOkCancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'Cancel' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'SpacingCancelShowPassword' ).outerWidth();
            totalWidth += $( '#' + self.dialogOptions['id'] + 'ShowPassword' ).outerWidth();
            var margin = ( $( '#' + self.scrollContainerOptions['id'] ).width() - totalWidth ) / 2;
            $( '#' + self.dialogOptions['id'] + 'Ok' ).css( 'marginLeft', margin + 'px' );
            // done calculate and set button positions
            
            // set position for messageDialog
            var top = ( $( '#layout' ).height() - $( '#' + self.dialogOptions['id'] ).height() ) / 2;
            var left = ( $( '#layout' ).width() - $( '#' + self.dialogOptions['id'] ).width() ) / 2;
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );
            // done set position for messageDialog
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update dialog options
            self.dialogOptions['backgroundColor'] = pleisterman.colors['dialogBackgroundColor']['color'];
            self.dialogOptions['borderColor'] = pleisterman.colors['dialogBorderColor']['color'];
            // done update dialog options

            // update dialog colors
            $( '#' + self.dialogOptions['id'] ).css( 'background-color', pleisterman.colors['dialogBackgroundColor']['color'] );
            $( '#' + self.dialogOptions['id'] ).css( 'border-color', pleisterman.colors['dialogBorderColor']['color'] );
            // done update dialog colors

            // update header options
            $( '#' + self.headerOptions['id'] ).css( 'color', pleisterman.colors['dialogHighlightColor']['color'] );
            // update header colors
            self.headerOptions['color'] = pleisterman.colors['dialogHighlightColor']['color'];
            
            // update button options
            self.buttonOptions['color'] = pleisterman.colors['buttonColor']['color'];
            self.buttonOptions['backgroundColor'] = pleisterman.colors['buttonBackgroundColor']['color'];
            self.buttonOptions['borderColor'] = pleisterman.colors['buttonBorderColor']['color'];
            // done update button options
            
            // update ok button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'Ok';
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            // done update ok button
            
            // update cancel button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'Cancel';
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            // done update cancel button
            
            // update show password button
            self.buttonOptions['id'] = self.dialogOptions['id'] + 'ShowPassword';
            $( '#' + self.buttonOptions['id'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['id'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            // done update show pasword button
            
        // DONE FUNCTION: updateColors( void ) void
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
            // function show( function callback ) void
            show: function( callback ){
                // call internal
                self.show( callback );
            },
            // function getPassword( void ) string password
            getPassword: function( ){
                // return password
                return self.password;
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: resetPasswordDialogModule( void ) void 
})( pleisterman );
// done create module function
