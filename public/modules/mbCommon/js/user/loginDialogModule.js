/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/user/loginDialogModule.js
 * 
 *  Last Revision:  17-01-2017
 *  
 *  Purpose: 
 *          this file controls the dialog for the login 
 *          for the application sharesoft
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

    // MODULE: loginDialogModule( function: loginCallback ) void
    
    sharesoft.loginDialogModule = function( loginCallback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'loginDialogModule';                              // string: MODULE
        self.debugOn = true;                                           // boolean: debug
        self.loginCallback = loginCallback;                             // function: login callback
        self.parentOptions = {                                          // json: parent options    
            'id'                    :   'mainOverlay'                   // string: element id
        };                                                              // done json: parent options
        self.dialogOptions = {                                          // json: dialog options
            'id'                    :   self.MODULE + 'Dialog',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '44em',                         // css style width
            'border'                :   sharesoft.getSetting( 'dialogBorder' ),               // boolean: has border
            'borderWidth'           :   sharesoft.getSetting( 'dialogBorderWidth' ),          // css border width
            'borderColor'           :   sharesoft.colors['dialogBorderColor']['color'],       // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'dialogBorderStyle' ),          // css border style
            'borderRadius'          :   sharesoft.getSetting( 'dialogBorderRadius' ),         // css border radius
            'backgroundColor'       :   sharesoft.colors['dialogBackgroundColor']['color']    // css color: background color
        };                                                              // done json: dialog options
        self.scrollContainerOptions = {                                 // json: scroll container options    
            'id'                    :   self.MODULE + 'DialogScollContainer', // string: element id
            'element'               :   'div',                          // string: html element type 
            'margin'                :   30,                             // css margin
            'overflowY'             :   'auto',                         // css overflow
            'styleHeight'           :   '24.5em',                       // css style height
            'maximumMargin'         :   50                              // integer: maximum margin
        };                                                              // done json: scroll container options  
        self.headerContainerOptions = {                                 // json: header container options  
            'id'                    :   self.MODULE + 'HeaderContainer',// string: element id
            'element'               :   'div'                           // string html element type 
        };                                                              // done json: header container options  
        self.headerOptions = {                                          // json: header options  
            'id'                    :   self.MODULE + 'Header',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   sharesoft.translations['loginHeader'],                // string: text
            'fontSize'              :   sharesoft.getSetting( 'dialogHeaderFontSize' ),       // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogHeaderFontWeight' ),     // css font weight
            'color'                 :   sharesoft.colors['dialogHighlightColor']['color'],    // css color: color
            'marginLeft'            :   sharesoft.getSetting( 'dialogHeaderMarginLeft' ),     // css margin left
            'marginTop'             :   sharesoft.getSetting( 'dialogHeaderMarginTop' ),      // css margin top
            'padding'               :   sharesoft.getSetting( 'dialogHeaderPadding' )         // css padding
        };                                                              // done json: header options  
        self.subHeaderOptions = {                                       // json: sub header options  
            'id'                    :   self.MODULE + 'SubHeader',      // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   sharesoft.translations['loginSubHeader'],
            'fontSize'              :   sharesoft.getSetting( 'dialogSubHeaderFontSize' ),        // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dialogSubHeaderFontWeight' ),      // css font weight
            'color'                 :   sharesoft.colors['dialogHighlightColor']['color'],        // css color: color
            'marginLeft'            :   sharesoft.getSetting( 'dialogSubHeaderMarginLeft' ),      // css margin left
            'marginTop'             :   sharesoft.getSetting( 'dialogSubHeaderMarginTop' ),       // css margin top
            'marginBottom'          :   sharesoft.getSetting( 'dialogSubHeaderMarginBottom' ),    // css margin bottom
            'padding'               :   sharesoft.getSetting( 'dialogSubHeaderPadding' )          // css padding
        };                                                              // done json: sub header options  
        self.contentOptions = {                                         // json: content options  
            'id'                    :   self.MODULE + 'Content',        // string: element id
            'element'               :   'div',                          // string: html element type 
            'styleHeight'           :   '11.5em'                        // css style height
        };                                                              // done json: content options  
        self.itemOptions = {                                            // json: item options  
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'block',                        // css display
            'padding'               :   sharesoft.getSetting( 'dataEditItemPadding' ),          // css padding
            'marginTop'             :   sharesoft.getSetting( 'dataEditItemMarginTop' ),        // css margin top
            'marginLeft'            :   sharesoft.getSetting( 'dataEditItemMarginLeft' ),       // css margin left
            'marginRight'           :   '2.1em',                        // css margin right
            'backgroundColor'       :   sharesoft.colors['dataItemBackgroundColor']['color'], // css color: background color
            'borderRadius'          :   sharesoft.getSetting( 'dataEditBorderRadius' ),       // css border radius
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
            'styleWidth'            :   '9em',                          // css style width
            'paddingLeft'           :   '2.2em',                        // css padding left
            'marginTop'             :   '0.6em',                        // css margin top
            'marginBottom'          :   '0.6em'                         // css margin bottom
        };                                                              // done json: label options  
        self.inputOptions = {                                           // json: input options  
            'element'               :   'input',                        // string: html element type 
            'display'               :   'inline-block',                 // css display
            'marginLeft'            :   '0.6em',                        // css margin left
            'marginTop'             :   '0.6em',                        // css margin top
            'fontSize'              :   sharesoft.getSetting( 'dataEditInputFontSize' ),      // css font size
            'fontWeight'            :   sharesoft.getSetting( 'dataEditInputFontWeight' ),    // css font weight
            'color'                 :   sharesoft.colors['editColor']['color']                // css color: color
        };                                                              // done json: input options  
        self.nameOptions = {                                            // json: name options  
            'id'                    :   self.MODULE + 'Name',           // string: element id
            'maxlength'             :   32,                             // integer: html input max length
            'type'                  :   'text',                         // string: input type 
            'paddingLeft'           :   '0.2em',                        // css padding left
            'styleWidth'            :   '14em'                          // css style width
        };                                                              // done json: name options  
        self.passwordOptions = {                                        // json: password options  
            'id'                    :   self.MODULE + 'Password',       // string: element id
            'maxlength'             :   32,                             // integer, html input max length
            'type'                  :   'password',                     // string: input type
            'paddingLeft'           :   '0.2em',                        // css padding left
            'styleWidth'            :   '14em'                          // css style width
        };                                                              // done json: password options  
        self.rememberMeOptions = {                                      // json: rememberMe options          
            'id'                    :   self.MODULE + 'RememberMe',     // string: element id
            'type'                  :   'text',                         // string: input type
            'readOnly'              :   true,                           // boolean html input read only
            'checked'               :   false,                          // boolean: checked
            'textAlign'             :   'center',                       // css text align
            'styleWidth'            :   '1.0em'                         // css stye width
        };                                                              // done json: rememberMe options          
        self.buttonContainerOptions = {                                 // json: button container options                  
            'id'                    :   self.MODULE + 'ButtonContainer',// string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'relative',                     // css position
            'display'               :   'block',                        // css display
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: button container options                  
        self.buttonOptions = {                                          // json: button options                  
            'id'                    :   self.MODULE + 'LoginButton',    // string: element id    
            'element'               :   'div',                          // string: html element type 
            'text'                  :   sharesoft.translations['login'],  // string: text
            'minimumWidth'          :   '14em',                         // relative size
            'color'                 :   sharesoft.colors['buttonColor']['color'],             // css color: color
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'],   // css color: background color
            'fontSize'              :   sharesoft.getSetting( 'buttonFontSize' ),             // css font size
            'fontWeight'            :   sharesoft.getSetting( 'buttonFontWeight' ),           // css font weight
            'padding'               :   sharesoft.getSetting( 'dialogButtonPadding' ),        // css padding    
            'marginTop'             :   sharesoft.getSetting( 'dialogButtonMarginTop' ),      // css margin top
            'marginBottom'          :   sharesoft.getSetting( 'dialogButtonMarginBottom' ),   // css margin bottom    
            'marginLeft'            :   '4em',                          // css margin left
            'marginRight'           :   '4em',                          // css margin right
            'border'                :   true,                           // add border option
            'borderWidth'           :   sharesoft.getSetting( 'buttonBorderWidth' ),
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'],       // css color: border color
            'borderStyle'           :   sharesoft.getSetting( 'buttonBorderStyle' ),          // css border style
            'borderRadius'          :   sharesoft.getSetting( 'buttonBorderRadius' ),         // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: button options                  
        self.passwordResetContainerOptions = {                                // json: message container options                  
            'id'                    :   self.MODULE + 'PaswordResetContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent',                  // css color: background color
            'marginTop'             :   '1.4em',                        // css margin top
            'marginLeft'            :   '3em',                          // css margin left
            'marginRight'           :   '3em'                           // css margin right
        };                                                              // done json: message container options                  
        self.passwordResetOptions = {                                   // json: password reset options                  
            'id'                    :   self.MODULE + 'PasswordReset',  // string: element id    
            'text'                  :   sharesoft.translations['passwordReset'], // string: text
            'element'               :   'div',                          // string: html element type 
            'padding'               :   '0.2em',                        // css padding
            'paddingLeft'           :   '2.2em',                        // css padding left
            'paddingTop'            :   '0.6em',                        // css padding top
            'paddingBottom'         :   '0.4em',                        // css padding bottom
            'fontSize'              :   '1.1em',                        // css font size
            'fontWeight'            :   'normal',                       // css font weight    
            'color'                 :   sharesoft.colors['editColor']['color']                // css color: color
        };                                                              // done password reset options                  
        self.messageContainerOptions = {                                // json: message container options                  
            'id'                    :   self.MODULE + 'MessageContainer',  // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent',                  // css color: background color
            'marginTop'             :   '0.4em',                        // css margin top
            'marginLeft'            :   '3em',                          // css margin left
            'marginRight'           :   '3em'                           // css margin right
        };                                                              // done json: message container options                  
        self.messageOptions = {                                         // json: message options                  
            'id'                    :   self.MODULE + 'Message',        // string: element id
            'element'               :   'div',                          // string: html element type 
            'fontSize'              :   sharesoft.getSetting( 'dialogMessageFontSize' ),      // css font size
            'color'                 :   sharesoft.colors['errorColor']['color'],              // css color: color
            'fontWeight'            :   sharesoft.getSetting( 'dialogMessageFontWeight' ),    // css font weight    
            'marginLeft'            :   '2em',                          // css margin left
            'marginRight'           :   '2em',                          // css margin right
            'padding'               :   '0.6em'                         // css padding
        };                                                              // done json: message options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.show = function(){
        // FUNCTION: show( void ) void
            
            // add the dialog
            $( '#' + self.parentOptions['id'] ).append( jsProject.jsonToElementHtml( self.dialogOptions ) );

            // add the scroll container
            $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.scrollContainerOptions ) );
                        
            // add hedaer
            self.addHeader();
            
            // add content
            self.addContent();
            
            // add login button
            self.addButton();
            
            // add password reset
            self.addPaswordReset();
            
            // show dialog
            $( '#' + self.parentOptions['id'] ).show( );

            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'overlay' );

            // call layout change
            self.layoutChange();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: show( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // add layout change
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // add layout change
            jsProject.unSubscribeFromEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.addHeader = function(){
        // FUNCTION: addHeader( void ) void
            
            // add header container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerContainerOptions ) );

            // add header 
            $( '#' + self.headerContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // add sub header 
            $( '#' + self.headerContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.subHeaderOptions ) );
            
        // DONE FUNCTION: addHeader( void ) void
        };
        self.addContent = function(){
        // FUNCTION: addContent( void ) void
            
            // add content
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.contentOptions ) );
            
            // add content
            self.addName();
            self.addPassword();
            self.addRememberMe();
            // done add content
            
            // add message
            self.addMessage();
            
        // DONE FUNCTION: addContent( void ) void
        };
        self.addName = function(){
        // FUNCTION: addName( void ) void
            
            // add item to content
            self.itemOptions['id'] = 'itemName';
            // add item to content
            $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.itemOptions ) );
            
            // enrich options
            self.labelOptions['text'] = sharesoft.translations['name'];
            // add label to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );

            // enrich options
            jQuery.extend( self.nameOptions, self.inputOptions );
            // add input to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.nameOptions ) );

            // add events
            var id = self.itemOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.itemMouseOver( id ); }); 
            $( '#' + id ).mouseout( function( event ){ self.itemMouseOut( id ); }); 
            $( '#' + id ).click( function( event ){ self.nameClick(); }); 
            // done add events
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'overlay',
                'select'    :   self.itemMouseOver,
                'deSelect'  :   self.itemMouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.nameOptions['id']
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addName( void ) void
        };
        self.nameClick = function(){
        // FUNCTION: nameClick( void ) void
            
            jsProject.callEvent( 'selectTabStop',  'itemName' );
            
        // DONE FUNCTION: nameClick( void ) void
        };
        self.addPassword = function(){
        // FUNCTION: addPassword( void ) void
            
            // add item to content
            self.itemOptions['id'] = 'itemPassword';
            $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.itemOptions ) );
            // done add item to content
            
            // enrich options
            self.labelOptions['text'] = sharesoft.translations['password'];
            // add label to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
            // done add label to item

            // enrich options
            jQuery.extend( self.passwordOptions, self.inputOptions );
            // add input to item
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.passwordOptions ) );

            // add events
            var id = self.itemOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.itemMouseOver( id ); }); 
            $( '#' + id ).mouseout( function( event ){ self.itemMouseOut( id ); }); 
            $( '#' + id ).click( function( event ){ self.passwordClick(); }); 
            // done add events
            
            // create tabstop options
             var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'overlay',
                'select'    :   self.itemMouseOver,
                'deSelect'  :   self.itemMouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.passwordOptions['id']
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addPassword( void ) void
        };
        self.passwordClick = function(){
        // FUNCTION: passwordClick( void ) void
            
            // set tabstop on item password
            jsProject.callEvent( 'selectTabStop',  'itemPassword' );
            
        // DONE FUNCTION: passwordClick( void ) void
        };
        self.addRememberMe = function(){
        // FUNCTION: addRememberMe( void ) void
            
            // add item to content
            self.itemOptions['id'] = 'itemRememberMe';
            $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.itemOptions ) );
            // done add item to content
            
            // add label to item
            self.labelOptions['text'] = sharesoft.translations['rememberMe'];
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
            // done add label to item

            // add input to item
            // enrich options
            jQuery.extend( self.rememberMeOptions, self.inputOptions );
            // checked
            if( sharesoft.rememberMe ){
                self.rememberMeOptions['checked'] = true;
                self.rememberMeOptions['value'] = 'X';
            }
            // done checked
            // add remember me
            $( '#' + self.itemOptions['id'] ).append( jsProject.jsonToElementHtml( self.rememberMeOptions ) );
            // done add input to item
            
            // add events
            var id = self.itemOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.itemMouseOver( id ); }); 
            $( '#' + id ).mouseout( function( event ){ self.itemMouseOut( id ); }); 
            $( '#' + id ).click( function( event ){ self.rememberMeClick( id ); }); 
            // done add events
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'overlay',
                'select'    :   self.itemMouseOver,
                'deSelect'  :   self.itemMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.rememberMeClick
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addRememberMe( void ) void
        };
        self.addMessage = function(){
        // FUNCTION: addMessage( void ) void
            
            // add the container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageContainerOptions ) );
            // add the message
            $( '#' + self.messageContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageOptions ) );
            
        // DONE FUNCTION: addMessage( void ) void
        };
        self.addButton = function(){
        // FUNCTION: addButton( void ) void
            
            // add the container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );
            // ad the button
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

            // add events
            var id = self.buttonOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.buttonMouseOver( id ); }); 
            $( '#' + id ).mouseout( function( event ){ self.buttonMouseOut( id ); }); 
            $( '#' + id ).click( function( event ){ self.login(); }); 
            // done add events
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'overlay',
                'select'    :   self.buttonMouseOver,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.login
                    },
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['enter'],
                        'type'      :   'default',
                        'function'  :   self.login
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addButton( void ) void
        };
        self.itemMouseOver = function( id ){
        // FUNCTION: itemMouseOver( string: element id ) void
            
            // background color highlight
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // color highlight
            $( '#' + id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: itemMouseOver( string: element id ) void
        };
        self.itemMouseOut = function( id ){
        // FUNCTION: itemMouseOut( string: element id ) void
            
            if( jsProject.getValue( 'selected', 'tabStops' ) === id ){
                return;
            }
            
            // background color default
            $( '#' + id ).css( 'background-color', sharesoft.colors['dataItemBackgroundColor']['color'] );
            // color default
            $( '#' + id ).css( 'color', sharesoft.colors['commonColor']['color'] );
            
        // DONE FUNCTION: itemMouseOut( string: element id ) void
        };
        self.buttonMouseOver = function( id ){
        // FUNCTION: buttonMouseOver( string: element id ) void
            
            // background color highlight
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // color highlight
            $( '#' + id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOver( string: element id ) void
        };
        self.buttonMouseOut = function( id ){
        // FUNCTION: buttonMouseOut( string: element id ) void
            
            if( jsProject.getValue( 'selected', 'tabStops' ) === id ){
                return;
            }
            // background color default
            $( '#' + id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // color default
            $( '#' + id ).css( 'color', sharesoft.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( string: element id ) void
        };
        self.addPaswordReset = function(){
        // FUNCTION: addPaswordReset( void ) void
            
            // add password reset container
            $( '#' + self.scrollContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.passwordResetContainerOptions ) );
            // ad password reset
            $( '#' + self.passwordResetContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.passwordResetOptions ) );

            // add events
            var id = self.passwordResetOptions['id'];
            $( '#' + id ).mouseover( function( event ){ self.itemMouseOver( id ); }); 
            $( '#' + id ).mouseout( function( event ){ self.itemMouseOut( id ); }); 
            $( '#' + id ).click( function( event ){ self.passwordReset(); }); 
            // done add events
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   id,
                'layer'     :   'overlay',
                'select'    :   self.itemMouseOver,
                'deSelect'  :   self.itemMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   sharesoft.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.passwordReset
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addPaswordReset( void ) void
        };
        self.rememberMeClick = function( id ){
        // FUNCTION: rememberMeClick( string: element id ) void
            
            // toggle checked
            self.rememberMeOptions['checked'] = !self.rememberMeOptions['checked'];
            
            // move tabstop
            jsProject.callEvent( 'selectTabStop',  id );

            // display selection
            if( self.rememberMeOptions['checked'] ){
                $( '#' + self.rememberMeOptions['id'] ).val( 'X' ); 
            }
            else {
                $( '#' + self.rememberMeOptions['id'] ).val( '' ); 
            }
            // done display selection
            
        // DONE FUNCTION: rememberMeClick( string: element id ) void
        };
        self.login = function( ){
        // FUNCTION: login( void ) void
            
            // debug info
            self.debug( 'login' );

            // select tabstop loin button
            jsProject.callEvent( 'selectTabStop',  self.buttonOptions['id'] );
            
            // clear message
            $( '#' + self.messageOptions['id'] ).html( '' );
            
            // refresh layout
            self.layoutChange();
            
            // call the calback
            self.loginCallback();
            
        // DONE FUNCTION: login( void ) void
        };
        self.passwordReset = function( ){
        // FUNCTION: passwordReset( void ) void
            
            // set tabstop on password reset
            jsProject.callEvent( 'selectTabStop',  self.passwordResetOptions['id'] );
            // debug info
            self.debug( 'password reset' );
            // show send reset password email dialog
            sharesoft.showSendResetPasswordEmailDialog();
            
        // DONE FUNCTION: passwordReset( void ) void
        };
        self.showError = function( errorId ){
        // FUNCTION: showError( string: errorId ) void
            
            // get the error
            sharesoft.getError( errorId, self.getErrorCallback );  
            
        // DONE FUNCTION: showError( string: errorId ) void
        };
        self.getErrorCallback = function( error ){
        // FUNCTION: getErrorCallback( string: error ) void
            
            // debug info
            self.debug( 'getErrorCallback: ' + error );
            // show message
            $( '#' + self.messageOptions['id'] ).html( error );
            
            // refresh layout
            self.layoutChange();
            
        // DONE FUNCTION: getErrorCallback( string: error ) void
        };
        self.hide = function(){
        // FUNCTION: hide( void ) void
            
            // remove event subscriptions
            self.removeEventSubscriptions();

            // remove events
            self.removeEvents();

            // remove html
            $( '#' + self.parentOptions['id'] ).html( '' );
            // hide overlay
            $( '#' + self.parentOptions['id'] ).hide( );
            
        // DONE FUNCTION: hide( void ) void
        };
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void
            
            // remove events
            $( '#itemName' ).off();
            $( '#itemPassword' ).off();
            $( '#itemRememberMe' ).off();
            $( '#' + self.buttonOptions['id'] ).off();
            // done remove events
            
            // remove tabstops
            jsProject.callEvent( 'unRegisterTabStopsLayer', 'overlay' );
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.checkCredentials = function(){
        // FUNCTION: checkCredentials( void ) boolean
            
            // get name 
            var name = $.trim( $( '#' + self.nameOptions['id'] ).val() );
            $( '#' + self.nameOptions['id'] ).val( name );
            // get password
            var password = $( '#' + self.passwordOptions['id'] ).val();
            $( '#' + self.passwordOptions['id'] ).val( password );
            
            // check if name is empty
            if( name === '' ){
                self.showError( 'nameEmpty' );
                jsProject.callEvent( 'selectTabStop', 'itemName' );
                return false;
            }
            // done check if name is empty
            
            // check if password is empty
            if( password === '' ){
                self.showError( 'passwordEmpty' );
                jsProject.callEvent( 'selectTabStop',  'itemPassword' );
                return false;
            }
            // done check if password is empty
            
            return true;
            
        // DONE FUNCTION: checkCredentials( void ) boolean
        };
        self.getValues = function(){
        // FUNCTION: getValues( void ) json: values / false
            
            if( self.checkCredentials() ){
                // get dialog input values
                return {
                    'name'          :   $.trim( $( '#' + self.nameOptions['id'] ).val() ),
                    'password'      :   $.trim( $( '#' + self.passwordOptions['id'] ).val() ),
                    'rememberMe'    :   self.rememberMeOptions['checked']
                };
                // done get dialog input values
            }                
            // error occurred
            return false;
            
        // DONE FUNCTION: getValues( void ) json: values / false
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // set dimensions for loginDialog
            $( '#' + self.dialogOptions['id'] ).css( 'max-width', $( '#layout' ).width() );
            $( '#' + self.dialogOptions['id'] ).css( 'max-height', $( '#layout' ).height() );
            // done set dimensions for loginDialog

            // calculate container height
            var height = $( '#layout' ).height();
            height -= self.scrollContainerOptions['margin'] * 2;
            height -= self.scrollContainerOptions['maximumMargin']; 
            $( '#' + self.scrollContainerOptions['id'] ).css( 'height', self.scrollContainerOptions['styleHeight'] );
            var totalContainerHeight = $( '#' + self.scrollContainerOptions['id'] ).height();
            totalContainerHeight += $( '#' + self.messageContainerOptions['id'] ).height();
            if(  totalContainerHeight > height ){
                $( '#' + self.scrollContainerOptions['id'] ).height( height );
            }
            else {
                $( '#' + self.scrollContainerOptions['id'] ).height( totalContainerHeight );
            }
            // done calculate container height
            
            // set position for loginDialog
            var top = ( $( '#layout' ).height() - $( '#' + self.dialogOptions['id'] ).height() ) / 2;
            var left = ( $( '#layout' ).width() - $( '#' + self.dialogOptions['id'] ).width() ) / 2;
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );
            // done set position for loginDialog
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update dialog colors
            self.dialogOptions['backgroundColor'] = sharesoft.colors['dialogBackgroundColor']['color'];
            self.dialogOptions['borderColor'] = sharesoft.colors['dialogBorderColor']['color'];
            // done update dialog colors
            
            // update header colors
            self.headerOptions['color'] = sharesoft.colors['dialogHighlightColor']['color'];
            
            // update sub header colors
            self.subHeaderOptions['color'] = sharesoft.colors['dialogHighlightColor']['color'];
            
            // update item colors
            self.itemOptions['backgroundColor'] = sharesoft.colors['dataItemBackgroundColor']['color'];
            
            // update input colors
            self.inputOptions['color'] = sharesoft.colors['editColor']['color'];
            
            // update button colors
            self.buttonOptions['color'] = sharesoft.colors['buttonColor']['color'];
            self.buttonOptions['backgroundColor'] = sharesoft.colors['buttonBackgroundColor']['color'];
            self.buttonOptions['borderColor'] = sharesoft.colors['buttonBorderColor']['color'];
            // done update button colors
            
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
            // FUNCTION: show( void ) void
            show : function(){
                // call internal show
                self.show();
            },
            // FUNCTION: checkCredentials( void ) boolean
            checkCredentials : function(){
                // call internal checkCredentials
                return self.checkCredentials();
            },
            // FUNCTION: getValues void ) json: values / false
            getValues : function(){
                // call internal getValues
                return self.getValues();
            },
            // FUNCTION: showError( string: errorId ) void
            showError : function( errorId ){
                // call internal showError
                self.showError( errorId );
            },
            // FUNCTION: hide( void ) void
            hide : function(){
                // call internal hide
                self.hide();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: loginDialogModule( function: loginCallback ) void 
})( sharesoft );
// done create module function
