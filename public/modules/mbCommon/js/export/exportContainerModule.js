/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/export/exportContainerModule.js
 * 
 * Purpose: this file controls the data container for the 
 *          export
 *          A html div element is displayed. 
 *          Modules that display data wil add html to 
 *          the content of this element
 * 
 * Last revision: 01-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){

    // MODULE: exportContainerModule( void ) void
    
    pleisterman.exportContainerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'exportContainerModule';                          // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        self.layoutId = 'layout';                                       // string: element id
        self.dataId = '';                                               // string: data id
        self.imageUrl = pleisterman.getSetting( 'imageUrl' );             // string: image directory url    
        self.containerOptions = {                                       // json: container options     
            'id'                    :   self.MODULE + 'Container',      // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '',                             // string: text    
            'position'              :   'absolute',                     // css style position
            'display'               :   'none',                         // css display style
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'],             // css color: COLOR: editBackgroundColor
            'zIndex'                :   pleisterman.getSetting( 'zIndexData' ).toString()               // integer: SETTING: zIndexData   
        };                                                              // done json: container options 
        self.headerOptions = {                                          // json: headerOptions options  
            'id'                    :   self.MODULE + 'Header',         // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '&nbsp;',                       // string: text    
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'],   // css color: COLOR: panelHighlightBackgroundColor
            'color'                 :   pleisterman.colors['panelHighlightColor']['color'],             // css color: COLOR: panelHighlightColor
            'fontSize'              :   '1.1em',                        // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'borderWidth'           :   '0.1em',                        // css relative size
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],                // css color: COLOR: panelBorderColor    
            'borderStyle'           :   'solid',                        // css border style
            'borderBottom'          :   true,                           // boolean: has border bottom
            'paddingLeft'           :   '3.8em',                        // css relative size: borderBottom
            'paddingTop'            :   '0.4em',                        // css relative size: paddingTop
            'paddingBottom'         :   '0.6em'                         // css relative size: paddingBottom
        };                                                              // done json: headerOptions options 
        self.contentOptions = {                                         // json: contentOptions options 
            'id'                    :   self.MODULE + 'Content',        // string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent',                  // css color: background color
            'styleWidth'            :   '100%',                         // css style width
            'overflow'              :   'auto'                          // css overflow
        };                                                              // done json: contentOptions options 
        self.buttonContainerOptions = {                                 // json: buttonContainerOptions options     
            'id'                    :   self.MODULE + 'ButtonContainer',// string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'],       // css color: COLOR: panelHighlightBackgroundColor 
            'marginRight'           :   0,                              // css margin right   
            'maximumMarginRight'    :   320,                            // css maximum margin right   
            'minimumWidth'          :   220,                            // css maximum width
            'borderTop'             :   true,                           // boolean: border top
            'borderBottom'          :   true,                           // boolean: border bottom
            'borderWidth'           :   '0.1em',                        // css size px: border width
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],                    // css color: COLOR: panelBorderColor
            'borderStyle'           :   'groove'                        // css border style
        };                                                              // done json: buttonContainerOptions options 
        self.buttonOptions = {                                          // json: buttonOptions options   
            'exportHtmlId'          :   self.MODULE + 'exportHtmlButton',   // string: export html button id    
            'exportCsvId'           :   self.MODULE + 'exportCsvButton',    // string: export csv button id    
            'exportExcelId'         :   self.MODULE + 'exportExcelButton',  // string: export excel button id    
            'cancelId'              :   self.MODULE + 'cancelButton',       // string: cancel button id    
            'buttonCount'           :   4,                              // integer: button count
            'element'               :   'div',                          // string html element type 
            'display'               :   'inline-block',                 // css display
            'color'                 :   pleisterman.colors['buttonColor']['color'],             // css color: COLOR: panelBorderColor
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'],   // css color: COLOR: panelBorderColor
            'fontSize'              :   pleisterman.getSetting( 'buttonFontSize' ),             // css font size: SETTING: buttonFontSize
            'fontWeight'            :   pleisterman.getSetting( 'buttonFontWeight' ),           // css font weight: SETTING: buttonFontWeight
            'padding'               :   pleisterman.getSetting( 'buttonPadding' ),              // css size: SETTING: buttonPadding
            'minimumWidth'          :   '6.0em',                        // css minimum width
            'marginLeft'            :   12,                             // css margin left
            'marginBottom'          :   4,                              // css margin bottom
            'marginTop'             :   8,                              // css margin top
            'border'                :   true,                           // add border option
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),          // css border width: SETTING: buttonBorderWidth
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],       // css color: COLOR: buttonBorderColor
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),          // css border style: SETTING: buttonBorderStyle
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),         // css border radius: SETTING: buttonBorderRadius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: buttonOptions options             
        self.messageOptions = {                                         // json: message options    
            'id'                    :   self.MODULE + 'MessageContainer', // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '',                             // string: text
            'position'              :   'absolute',                     // css position
            'isVisible'             :   false,                          // boolean: is visible
            'showPeriod'            :   1200,                           // integer: miliseconds
            'containerMinimumWidth' :   120,                            // integer: container minimum width
            'color'                 :   pleisterman.colors['commonColor']['color'],                 // css border width: SETTING: commonColor
            'backgroundColor'       :   pleisterman.colors['dialogBackgroundColor']['color'],       // css border width: SETTING: dialogBackgroundColor
            'errorColor'            :   pleisterman.colors['errorDialogColor']['color'],            // css border width: SETTING: errorDialogColor
            'errorBackgroundColor'  :   pleisterman.colors['errorDialogBackgroundColor']['color'],  // css border width: SETTING: errorDialogBackgroundColor
            'padding'               :   '0.8em',                        // css padding
            'fontSize'              :   '1.1em',                        // css font size
            'fontWeight'            :   'bold',                         // css font weight
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderColor'           :   pleisterman.colors['errorDialogBorderColor']['color'],  // css color: border color         
            'borderRadius'          :   '0.1em',                        // css border radius
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: message options  
        self.exportDisplayModule = null;                                // module: exportDisplayModule
        self.mode = '';                                                 // string: mode
        self.messageTimer = null;                                       // timer object: message timer
        self.mouseOverButtonId = null;                                  // string: html element id                    
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
            // add js events
            self.addEvents();
            
            // subscribe to event layoutChange
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            // subscribe to event exportOpen
            jsProject.subscribeToEvent( 'exportOpen', self.open );
            // subscribe to event addExportButtonsTabstops
            jsProject.subscribeToEvent( 'addExportButtonsTabstops', self.addExportButtonsTabstops );
            // subscribe to event showExportMessage
            jsProject.subscribeToEvent( 'showExportMessage', self.getMessage );
            // subscribe to event exportClose
            jsProject.subscribeToEvent( 'exportClose', self.close );
            // subscribe to event updateColors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
            // add display module
            self.exportDisplayModule = new pleisterman.exportDisplayModule( self.contentOptions['id'] );

        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // create data container
            $( document.body ).append( jsProject.jsonToElementHtml( self.containerOptions ) );

            // add header
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // content to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.contentOptions ) );
                
            // add button container to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );

            // create buttons
            self.addButtons();
                
            // message container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageOptions ) );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addButtons = function(){
        // FUNCTION: addButtons( void ) void
            
            // set exportHtml id 
            self.buttonOptions['id'] = self.buttonOptions['exportHtmlId'];
            // set exportHtml text
            self.buttonOptions['text'] = pleisterman.translations['exportHtml'];
            // add exportHtml html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
            // set exportCsv id 
            self.buttonOptions['id'] = self.buttonOptions['exportCsvId'];
            // set exportCsv text
            self.buttonOptions['text'] = pleisterman.translations['exportCsv'];
            // add exportCsv html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
            // set exportExcel id 
            self.buttonOptions['id'] = self.buttonOptions['exportExcelId'];
            // set exportExcel text
            self.buttonOptions['text'] = pleisterman.translations['exportExcel'];
            // add exportExcel html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            
            // set cancel id 
            self.buttonOptions['id'] = self.buttonOptions['cancelId'];
            // set cancel text
            self.buttonOptions['text'] = pleisterman.translations['cancel'];
            // add cancel html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add content scroll event
            $( '#' + self.contentOptions['id'] ).scroll( function( event ){ jsProject.callEvent( 'dataContentScroll' ); } );

            // buttons
            self.addButtonEvents();

        // DONE FUNCTION: addEvents( void ) void
        };
        self.addButtonEvents = function(){
        // FUNCTION: addButtonEvents( void ) void
            
            // exportHtml button
            $( '#' + self.buttonOptions['exportHtmlId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['exportHtmlId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['exportHtmlId'] ).click( function( event ){ self.buttonClick( 'exportHtml' ); });
            // done exportHtml button
            
            // exportCsv button
            $( '#' + self.buttonOptions['exportCsvId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['exportCsvId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['exportCsvId'] ).click( function( event ){ self.buttonClick( 'exportCsv' ); });
            // done exportCsv button
            
            // exportExcel button
            $( '#' + self.buttonOptions['exportExcelId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['exportExcelId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['exportExcelId'] ).click( function( event ){ self.buttonClick( 'exportExcel' ); });
            // done exportExcel button
            
            // cancel button
            $( '#' + self.buttonOptions['cancelId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['cancelId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['cancelId'] ).click( function( event ){ self.buttonClick( 'cancel' ); });
            // done cancel button
                        
        // DONE FUNCTION: addButtonEvents( void ) void
        };
        self.buttonSelect = function( elementId ){
        // FUNCTION: buttonSelect( string: elementId ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === elementId || self.mouseOverButtonId === elementId ){
                // mouse over -> background color, color highlight
                $( '#' + elementId ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                $( '#' + elementId ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
                // done mouse over -> background color, color highlight
            }
            else {
                // mouse out -> background color, color default
                $( '#' + elementId ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + elementId ).css( 'color', pleisterman.colors['buttonColor']['color'] );
                // done mouse out -> background color, color default
            }
            // done is current tabstop
                        
        // DONE FUNCTION: buttonSelect( string: elementId ) void
        };
        self.buttonMouseIn = function( elementId ){
        // FUNCTION: buttonMouseIn( string: elementId ) void
            
            // remember mouse over
            self.mouseOverButtonId = elementId;

            // mouse over -> background color, color highlight
            $( '#' + elementId ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color, color highlight
            $( '#' + elementId ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
                        
        // DONE FUNCTION: buttonMouseIn( string: elementId ) void
        };
        self.buttonMouseOut = function( elementId ){
        // FUNCTION: buttonMouseOut( string: elementId ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === elementId ){
                // keep selected
                return;
            }
            // done is current tabstop
            
            // unset mouse over id
            self.mouseOverButtonId = elementId;

            // mouse out -> background color, color default
            $( '#' + elementId ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + elementId ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done mouse out -> background color, color default
                        
        // DONE FUNCTION: buttonMouseOut( string: elementId ) void
        };
        self.buttonClick = function( action ){
        // FUNCTION: buttonClick( string: action ) void
            
            // cancel
            if( action === 'cancel' ){
                // close
                self.close();
            }
            else {
                // call the event action: exportHtml, exportCsv, exportExcel
                jsProject.callEvent( 'export', action );
            }
            // done cancel 
                        
        // DONE FUNCTION: buttonClick( string: action ) void
        };
        self.exportHtml = function( ){
        // FUNCTION: exportHtml( void ) void
            
            // call export event
            jsProject.callEvent( 'export', 'exportHtml' );
            
        // DONE FUNCTION: exportHtml( void ) void
        };
        self.exportCsv = function( ){
        // FUNCTION: exportCsv( void ) void
            
            // call export event
            jsProject.callEvent( 'export', 'exportCsv' );
            
        // DONE FUNCTION: exportCsv( void ) void
        };
        self.exportExcel = function( ){
        // FUNCTION: exportExcel( void ) void
            
            // call export event
            jsProject.callEvent( 'export', 'exportExcel' );
            
        // DONE FUNCTION: exportExcel( void ) void
        };
        self.cancel = function( ){
        // FUNCTION: cancel( void ) void
            
            // close
            self.close();
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.open = function() {
        // FUNCTION: open( void ) void
            
            // debug info
            self.debug( 'open' );

            // get data object
            var dataObject = jsProject.getValue( 'dataObject', 'data' );    
            // get data id
            self.dataId = jsProject.getValue( 'id', 'data' );    

            // set the title
            var title = '<nobr>';
            title += jsProject.getValue( 'headerText', 'data' ); ;
            title += '</nobr>';
            $( '#' + self.headerOptions['id'] ).html( title );
            
            // hide the messages
            $( '#' + self.messageOptions['id'] ).hide();

            // show the containers
            //$( '#dataEditOverlay' ).show();
            $( '#' + self.containerOptions['id'] ).show();
            // show the containers
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'data' );

            // refresh the layout
            self.layoutChange();
            
        // DONE FUNCTION: open( void ) void
        };
        self.addExportButtonsTabstops = function(){
        // FUNCTION: addExportButtonsTabstops( void ) void
            
            // debug info
            self.debug( 'addExportButtonsTabstops' );
            // add export html button tab stop
            self.addHtmlExportButtonTabstop();
            // add export csv button tab stop
            self.addCsvExportButtonTabstop();
            // add export excel button tab stop
            self.addExcelExportButtoTabstop();
            // add cancel button tab stop
            self.addCancelButtonTabstop();
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'data' );
            
        // DONE FUNCTION: addExportButtonsTabstops( void ) void
        };
        self.addHtmlExportButtonTabstop = function(){
        // FUNCTION: addHtmlExportButtonTabstop( void ) void
            
            // create tabstop options: export html button
            var tabStopOptions = {
                'id'        :    self.buttonOptions['exportHtmlId'],
                'layer'     :   'data',
                'select'    :   self.buttonSelect,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.exportHtml
                    }
                ]
            };
            // done create tabstop options: export html button

            // add tabstop: export html button
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addExportButtonsTabstops( void ) void
        };
        self.addCsvExportButtonTabstop = function(){
        // FUNCTION: addCsvExportButtonTabstop( void ) void
            
            // create tabstop options: export csv button
            var tabStopOptions = {
                'id'        :    self.buttonOptions['exportCsvId'],
                'layer'     :   'data',
                'select'    :   self.buttonSelect,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.exportCsv
                    }
                ]
            };
            // done create tabstop options: export csv button

            // add tabstop: export csv button
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addCsvExportButtonTabstop( void ) void
        };
        self.addExcelExportButtoTabstop = function(){
        // FUNCTION: addExcelExportButtoTabstop( void ) void
            
            // create tabstop options: export excel button
            var tabStopOptions = {
                'id'        :    self.buttonOptions['exportExcelId'],
                'layer'     :   'data',
                'select'    :   self.buttonSelect,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.exportExcel
                    }
                ]
            };
            // done create tabstop options: export excel button

            // add tabstop: export excel button
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addExcelExportButtoTabstop( void ) void
        };
        self.addCancelButtonTabstop = function(){
        // FUNCTION: addCancelButtonTabstop( void ) void
            
            // create tabstop options: export cancel button
            var tabStopOptions = {
                'id'        :    self.buttonOptions['cancelId'],
                'layer'     :   'data',
                'select'    :   self.buttonSelect,
                'deSelect'  :   self.buttonMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.cancel
                    }
                ]
            };
            // done create tabstop options: export cancel button

            // add tabstop: export cancel button
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addCancelButtonTabstop( void ) void
        };
        self.getMessage = function( messageId ){
        // FUNCTION: getMessage( string: messageId ) void
        
            // debug info
            self.debug( 'showExportMessage' + messageId );
            // get the message
            pleisterman.getMessage( messageId, self.showMessage );
            
        // DONE FUNCTION: getMessage( string: messageId ) void
        };
        self.showMessage = function( message, duration ){
        // FUNCTION: showMessage( string: message, integer: duration ) void
            
            // debug info
            self.debug( 'showExportMessage' + message );
            
            // set message background color
            $( '#' + self.messageOptions['id'] ).css( 'background-color', self.messageOptions['backgroundColor'] );
            // set message color
            $( '#' + self.messageOptions['id'] ).css( 'color', self.messageOptions['color'] );
            // set message html
            $( '#' + self.messageOptions['id'] ).html( message );
            // show the message
            $( '#' + self.messageOptions['id'] ).show();
            // refresh the layuot
            self.layoutChange();
            
            // delete old timer
            if( self.messageTimer ){
                // clear the timer
                clearTimeout( self.messageTimer );
                // unset timer
                self.messageTimer = null;
            }
            // done delete old timer
            
            // duration not defined
            if( duration === undefined ){
                // set default duration
                duration = self.messageOptions['showPeriod'];
            }
            // done duration not defined
            
            // create new timer
            self.messageTimer = setTimeout( function () { self.hideMessage(); }, duration  );
            
        // DONE FUNCTION: showMessage( string: message, integer: duration ) void
        };
        self.hideMessage = function(){
        // FUNCTION: hideMessage( void ) void
        
            // empty html
            $( '#' + self.messageOptions['id'] ).html( '' );
            // hide message
            $( '#' + self.messageOptions['id'] ).hide();
            
        // DONE FUNCTION: hideMessage( void ) void
        };
        self.close = function( ){
        // FUNCTION: close( void ) void
        
            // debug info
            self.debug( 'close' );
            
            // hide the containers
            $( '#dataEditOverlay' ).hide();
            $( '#' + self.containerOptions['id'] ).hide();
            // hide the containers

            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStopsLayer', 'data' );
            
            // empty content
            $( '#' + self.contentOptions['id'] ).html( '' );
            
        // DONE FUNCTION: close( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // get top
            var top = $( '#right' ).position().top + $( '#layout' ).position().top;
            // get left
            var left = $( '#right' ).position().left;
            // get width
            var width = $( '#right' ).width();
            
            // start calculate total button width
            var totalButtonWidth = 4;
            totalButtonWidth += self.buttonOptions['buttonCount'] * pleisterman.getSetting( 'buttonPadding' );
            totalButtonWidth += ( self.buttonOptions['buttonCount']  * 2 ) * pleisterman.getSetting( 'buttonBorderWidth' );
            totalButtonWidth += ( self.buttonOptions['buttonCount']  * 2 ) * self.buttonOptions['marginLeft'];
            // done start calculate total button width

            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['exportHtmlId'] ).outerWidth();
            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['exportCsvId'] ).outerWidth();
            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['exportExcelId'] ).outerWidth();
            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['cancelId'] ).outerWidth();
            // add button margins
            totalButtonWidth += 2 * self.buttonOptions['buttonCount'] * self.buttonOptions['marginLeft'];

            // width < total width
            if( width < totalButtonWidth ){
                // set container width 
                $( '#' + self.buttonContainerOptions['id'] ).css( 'width', totalButtonWidth + 'px' );
                // set margin
                $( '#' + self.buttonContainerOptions['id'] ).css( 'margin-left', '0px' );
            }
            else {
                // calculate margin
                var restMargin = width - ( totalButtonWidth + self.buttonContainerOptions['marginRight'] );
                // rest margin < margin left
                if(  restMargin < self.buttonOptions['containerMarginLeft'] ){
                    // set margin
                    $( '#' + self.buttonContainerOptions['id'] ).css( 'padding-left', restMargin + 'px' );
                }
                else {
                    // restmargin > maximum right
                    if( restMargin > self.buttonContainerOptions['maximumMarginRight'] ){
                        // set rest margin
                        restMargin = self.buttonContainerOptions['maximumMarginRight'];
                    }
                    // done restmargin > maximum right
                    
                    // set margin
                    $( '#' + self.buttonContainerOptions['id'] ).css( 'padding-left', restMargin + 'px' );
                }
                // done rest margin < margin left
            }
            // done width < total width
            
            // set container position and dimensions
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            $( '#' + self.containerOptions['id'] ).width( $( '#right' ).width() );
            $( '#' + self.containerOptions['id'] ).height( $( '#right' ).height() );
            // done set container position and dimensions

            // calculate data content height
            var height = $( '#right' ).innerHeight();
            height -= $( '#' + self.headerOptions['id'] ).outerHeight();
            height -= $( '#' + self.buttonContainerOptions['id'] ).outerHeight();
            height --;
            // calculate data content height
            
            // calculate message position
            width =  ( $( '#' + self.containerOptions['id'] ).width() / 3 ) * 2;
            $( '#' + self.messageOptions['id'] ).width( width );
            left = ( $( '#' + self.containerOptions['id'] ).width() - $( '#' + self.messageOptions['id'] ).width() ) / 2; 
            top = ( $( '#' + self.containerOptions['id'] ).height() - $( '#' + self.messageOptions['id'] ).height() ) / 2; 
            $( '#' + self.messageOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.messageOptions['id'] ).css( 'left', left + 'px' );
            // done calculate message position
            
            // set data content heights
            $( '#' + self.contentOptions['id'] ).height( height );
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
        
            // debug info
            self.debug( 'update colors' );
            
            // container
            $( '#' + self.containerOptions['id'] ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            
            // header
            $( '#' + self.headerOptions['id'] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.headerOptions['id'] ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            $( '#' + self.headerOptions['id'] ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
            // done header
            
            // button container
            $( '#' + self.buttonContainerOptions['id'] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.buttonContainerOptions['id'] ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
            // done button container

            // buttons
            self.updateButtonColors();
            
            // message 
            $( '#' + self.messageOptions['id'] ).css( 'color', pleisterman.colors['commonColor']['color'] );
            $( '#' + self.messageOptions['id'] ).css( 'background-color', pleisterman.colors['dialogBackgroundColor']['color'] );
            $( '#' + self.messageOptions['id'] ).css( 'border-color', pleisterman.colors['errorDialogBorderColor']['color'] );
            // done message

        // DONE FUNCTION: updateColors( void ) void
        };
        self.updateButtonColors = function( ) {
        // FUNCTION: updateButtonColors( void ) void
        
            // export html button
            $( '#' +  self.buttonOptions['exportHtmlId'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' +  self.buttonOptions['exportHtmlId'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            $( '#' +  self.buttonOptions['exportHtmlId'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done export html button

            // export csv button
            $( '#' +  self.buttonOptions['exportCsvId'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' +  self.buttonOptions['exportCsvId'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            $( '#' +  self.buttonOptions['exportCsvId'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done export csv button

            // export excel button
            $( '#' +  self.buttonOptions['exportExcelId'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' +  self.buttonOptions['exportExcelId'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            $( '#' +  self.buttonOptions['exportExcelId'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done export excel button

            // cancel button
            $( '#' +  self.buttonOptions['cancelId'] ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' +  self.buttonOptions['cancelId'] ).css( 'border-color', pleisterman.colors['buttonBorderColor']['color'] );
            $( '#' +  self.buttonOptions['cancelId'] ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            // done cancel button

        // DONE FUNCTION: updateButtonColors( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug is on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.MODULE + ' ' + message );
            }
            // done debug is on
            
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
    // DONE MODULE: exportContainerModule( void ) void
})( pleisterman );
// done create module function
