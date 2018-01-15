/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataEditImageUploadModule.js
 * 
 *  Last revision: 10-01-2017
 * 
 *  Purpose: 
 *      Displays an image upload
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: dataEditImageUploadModule( string: contentId, json: values ) void 
    
    pleisterman.dataEditImageUploadModule = function( contentId, values  ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataEditImageUploadModule';                      // string:  MODULE
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
            'cursor'                :   'pointer'                       // css cursor
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
            'marginRight'           :   pleisterman.getSetting( 'dataEditLabelMarginRight' ),     // css margin height
            'styleWidth'            :   pleisterman.getSetting( 'dataEditLabelWidth' ),           // css style width
            'rememberColor'         :   '',                             // css color: rememeber color
            'rememberFontWeight'    :   ''                              // css font weight: remember font weight  
        };                                                              // done json: label options
        self.inputAndButtonContainerOptions = {                         // json: input and button container options
            'id'                    :   'inputAndButtonContainer' + self.values['id'],  // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'minimumWidth'          :   '35em',                         // css minimum width
            'paddingTop'            :   '0.6em',                        // css padding top
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'], // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],              // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
        };                                                              // done json: input and button container options
        self.previewContainerOptions = {                                // json: preview container options
            'id'                    :   'previewContainer' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css verical align
            'marginBottom'          :   '1.2em',                        // css margin bottom
        };                                                              // done json: preview container options
        self.previewHeaderOptions = {                                   // json: preview header options
            'id'                    :   'previewHeader' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block',                        // css display
            'text'                  :   pleisterman.translations['preview'], // string: text
            'textAlign'             :   'center',                       // css verical align
            'minimumHeight'         :   '1.1em',                        // css minimum height
            'marginTop'             :   '0.1em',                        // css margin top
            'color'                 :   pleisterman.colors['panelHighlightColor']['color'], // css color: color
            'fontSize'              :   '1.0em',                        // css font size
            'fontWeight'            :   'normal',                       // css font weight
            'marginBottom'          :   '0.2em',                        // css margin bottom
            'padding'               :   '0.2em',                        // css padding 
            'paddingBottom'         :   '0.4em',                        // css padding bottom
            'marginLeft'            :   '3.5em',                        // css margin left
            'paddingTop'            :   '0.4em',                        // css padding bottom
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'] // css color: background color
        };                                                              // done json: preview header options
        self.previewOptions = {                                         // json: preview options
            'id'                    :   'preview' + self.values['id'],  // string: element id
            'element'               :   'img',                          // string: html element type 
            'display'               :   'block',                        // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'padding'               :   '0.2em',                        // css padding
            'styleHeight'           :   '10.0em',                       // css style height
            'styleWidth'            :   '10.0em',                       // css style width
            'height'                :   '10.0em',                       // html height
            'width'                 :   '10.0em',                       // html width
            'marginLeft'            :   '3.5em',                        // css margin left
            'backgroundColor'       :   'black',                        // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width    
            'borderColor'           :   pleisterman.colors['commonBorderColor']['color'], // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'mouseOver'             :   false,                          // boolean: mouse over
            'hasFocus'              :   false,                          // boolean: has focus
        };                                                              // done json: preview options
        self.previewInfoContainerOptions = {                            // json: preview info container options
            'id'                    :   'previewInfoContainer' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'overflow-x'            :   'hidden',                       // css overflow
            'verticalAlign'         :   'top',                          // css verical align
            'marginBottom'          :   '1.2em',                        // css margin bottom
        };                                                              // done json: preview info container options
        self.previewInfoOptions = {                                     // json: preview info options
            'id'                    :   'previewInfo' + self.values['id'],  // string: element id
            'element'               :   'textArea',                     // string: html element type 
            'display'               :   'block',                        // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'padding'               :   '0.4em',                        // css padding
            'styleHeight'           :   '12.0em',                       // css style height
            'styleWidth'            :   '16.0em',                       // css style width
            'marginLeft'            :   '1.5em',                        // css margin left
            'backgroundColor'       :   'transparent',                  // css color: background color
        };                                                              // done json: preview info options
        self.inputOptions = {                                           // json: input options
            'id'                    :   'ImageUploadFrame' + self.values['id'], // string: element id
            'element'               :   'iframe',                       // string: html element type 
            'display'               :   'block',                        // css display
            'verticalAlign'         :   'top',                          // css verical align
            'styleWidth'            :   '24.4em',                       // css style width
            'styleHeight'           :   '9.6em',                        // css style height
            'marginLeft'            :   '5.5em',                        // css margin left
            'marginBottom'          :   '1.2em',                        // css margin bottom
            'border'                :   'true',                         // boolean: has border 
            'borderWidth'           :   '0.0em',                        // css border width
            'borderColor'           :   'black',                        // css css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   'transparent',                  // css color: background color
            'hasFocus'              :   false,                          // boolean: has focus
            'selectActive'          :   true,                           // boolean: select active    
            'mouseOver'             :   false,                          // boolean: mouse over
            'cursor'                :   'pointer'                       // css cursor            
        };                                                              // done json: input options
        self.fullViewContainerOptions = {                               // json: full view container options
            'parentId'              :   'mainOverlay',                  // string: parentId
            'id'                    :   'fullViewContainer' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block',                        // css display
            'verticalAlign'         :   'top',                          // css verical align
            'marginTop'             :   '3.5em',                        // css margin top
            'backgroundColor'       :   pleisterman.colors['panelBackgroundColor']['color'], // css color: background color
            'open'                  :   false                           // boolean: open
        };                                                              // done json: full view container options
        self.fullViewHeaderOptions = {                                  // json: full view header options
            'id'                    :   'fullViewHeader' + self.values['id'], // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block',                        // css display
            'text'                  :   pleisterman.translations['originalFileName'], // string: text
            'textAlign'             :   'center',                       // css verical align
            'minimumHeight'         :   '1.1em',                        // css minimum height
            'marginTop'             :   '0.1em',                        // css margin top
            'color'                 :   pleisterman.colors['panelHighlightColor']['color'], // css color: color
            'fontSize'              :   '1.0em',                        // css font size
            'fontWeight'            :   'normal',                       // css font weight
            'marginBottom'          :   '0.2em',                        // css margin bottom
            'padding'               :   '0.2em',                        // css padding 
            'paddingBottom'         :   '0.4em',                        // css padding bottom
            'paddingTop'            :   '0.4em',                        // css padding top
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],  // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'] // css color: background color
        };                                                              // done json: full view header options
        self.fullViewOptions = {                                        // json: full view options
            'id'                    :   'fullView' + self.values['id'], // string: element id
            'element'               :   'img',                          // string: html element type 
            'display'               :   'block',                        // css display
            'verticalAlign'         :   'middle',                       // css verical align
            'margin'                :   '0 auto',                       // css margin left
            'padding'               :   '0.2em',                        // css padding
            'backgroundColor'       :   'black',                        // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderWidth'           :   '0.1em',                        // css border width    
            'borderColor'           :   pleisterman.colors['commonBorderColor']['color'], // css color: border color
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'mouseOver'             :   false,                          // boolean: mouse over
        };                                                              // done json: full view options
        self.uploadActionOptions = {                                    // json: upload action options
            'openFileFunction'      :   null,                           // function: open file function
            'uploadCallback'        :   null,                           // function: upload callback
            'selectInputCallback'   :   null,                           // function: select input callback
            'imageId'               :   null                            // string: image id
        };                                                              // done son: upload action options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct value: ' + self.values['value'] + ' image uploaded: ' + self.values['imageUploaded'] );
            
            // set display options
            self.setDisplayOptions();

            // add html
            self.addHtml();
            
            // remember current display settings
            self.rememberUnselectedDisplay();

            // add events
            self.addEvents();
            
            // add tabstops
            self.addTabStops();

            // add the extensions
            self.addApplicationsExtensions();

            // event subscriptiona
            self.addEventSubscriptions();
            
            // update display
            self.updateDisplay();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // get document upload options
            pleisterman.getImageUploadOptions = self.getUploadOptions;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add after update
            jsProject.subscribeToEvent( 'afterUpdate', self.afterUpdate );
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove after update
            jsProject.unSubscribeFromEvent( 'afterUpdate', self.afterUpdate );
            // remove update colors
            jsProject.unSubscribeFromEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
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
            
            // add input options
            if( self.values['displayOptions']['input'] ){
                jQuery.extend( self.inputOptions, self.values['displayOptions']['input'] );
            }
            // done add input options
            
        // DONE FUNCTION: setDisplayOptions( void ) void
        };    
        self.rememberUnselectedDisplay = function(){
        // FUNCTION: rememberUnselectedDisplay( void ) void
            
            // remember item background color
            self.itemContainerOptions['rememberBackgroundColor'] = $( '#' + self.itemContainerOptions['id'] ).css( 'background-color' );
            // remember label color
            self.labelOptions['rememberColor'] = $( '#' + self.labelOptions['id'] ).css( 'color' );
            // remember label font weight
            self.labelOptions['rememberFontWeight'] = $( '#' + self.labelOptions['id'] ).css( 'font-weight' );
            
        // DONE FUNCTION: rememberUnselectedDisplay( void ) void
        };
        self.setSelectedDisplay = function(){
        // FUNCTION: setSelectedDisplay( void ) void
            
            // input mouse in -> color highlight
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['editColor']['color'] );
            // set item background color selected
            $( '#' + self.itemContainerOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // set label color selected
            $( '#' + self.labelOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            // set label font weight selected
            $( '#' + self.labelOptions['id'] ).css( 'font-weight', 'bold' );
            
        // DONE FUNCTION: setSelectedDisplay( void ) void
        };
        self.resetRememberedDisplay = function(){
        // FUNCTION: resetRememberedDisplay( void ) void
            
            // reset item background color
            $( '#' + self.itemContainerOptions['id'] ).css( 'background-color', self.itemContainerOptions['rememberBackgroundColor'] );  
            // reset label color
            $( '#' + self.labelOptions['id'] ).css( 'color', self.labelOptions['rememberColor'] );  
            // reset label font weight
            $( '#' + self.labelOptions['id'] ).css( 'font-weight', self.labelOptions['rememberFontWeight'] );  
            
        // DONE FUNCTION: resetRememberedDisplay( void ) void
        };
        self.getUploadOptions = function(){
        // FUNCTION: getUploadOptions( void ) void
            
            // debug info
            self.debug( 'getUploadOptions' );
            // set upload callback
            self.uploadActionOptions['uploadCallback'] = self.uploadCallback;
            // set input select callback
            self.uploadActionOptions['selectInputCallback'] = self.selectInputCallback;
            // set out of date callback
            self.uploadActionOptions['outOfDateCallback'] = self.outOfDateCallback;
            // set image id
            self.uploadActionOptions['imageId'] = self.values['value'];
            // set updated
            self.uploadActionOptions['updated'] = self.values['updated'];
            // return caller options
            return self.uploadActionOptions; 
            
        // DONE FUNCTION: getUploadOptions( void ) void
        };
        self.afterUpdate = function(){
        // FUNCTION: afterUpdate( void ) void
            
            // debug info
            self.debug( 'afterUpdate' );
            // load frame
            $( '#' + self.inputOptions['id'] ).attr('src', '/mbSiteCms/uploadImage' + '?' + new Date().getTime() );
            
        // DONE FUNCTION: afterUpdate( void ) void
        };
        self.uploadCallback = function( fileName, imageWidth, imageHeight, used, updated ) {
        // FUNCTION: uploadCallback( string: fileName, dateTimeString: used, dateTimeString: updated ) void
            
            // call caller upload callback
            self.values['uploadCallback']( fileName, imageWidth, imageHeight, used, updated );
            
            // set source
            $( '#' + self.previewOptions['id'] ).attr( 'src', self.values['thumbnail'] + '?' + new Date().getTime() );

            // add image info
            self.addImageInfo();
            
        // DONE FUNCTION: uploadCallback( string: fileName, dateTimeString: used, dateTimeString: updated ) void
        };
        self.outOfDateCallback = function(){
        // FUNCTION: outOfDateCallback( void ) void
            
            // debug info
            self.debug( 'outOfDateCallback' );
            // call caller outOfDate callback
            self.values['outOfDateCallback']( );
            
        // DONE FUNCTION: outOfDateCallback( void ) void
        };
        self.addHtml = function( ){
        // FUNCTION: addHtml( void ) void
            
            // add item container to content
            $( '#' + self.contentId ).append( jsProject.jsonToElementHtml( self.itemContainerOptions ) );

            // add input container to item container
            $( '#' + self.itemContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputContainerOptions ) );

            // label
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.labelOptions ) );
            
            // add buttons and input
            self.addButtonAndInput();
            
        // DONE FUNCTION: addHtml( void ) void
        };    
        self.addButtonAndInput = function( ){
        // FUNCTION: addButtonsAndInput( void ) void

            // add buttonAndInputContainer to input container
            $( '#' + self.inputContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputAndButtonContainerOptions ) );
            
            // add preview
            self.addPreview();
            // add preview info
            self.addPreviewInfo();
            // add input
            self.addInput();
            
        // DONE FUNCTION: addButtonsAndInput( void ) void
        };    
        self.addPreview = function( ){
        // FUNCTION: addPreview( void ) void

            // add preview continer to buttonAndInputContainer
            $( '#' + self.inputAndButtonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.previewContainerOptions ) );
            // add preview header to previewContainerOptions
            $( '#' + self.previewContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.previewHeaderOptions ) );
            // add preview to previewContainerOptions
            $( '#' + self.previewContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.previewOptions ) );
            if( self.values['thumbnail'] !== '' ){
                self.debug( 'thumbnail: ' + self.values['thumbnail'] );
                // set source
                $( '#' + self.previewOptions['id'] ).attr( 'src', self.values['thumbnail'] + '?' + new Date().getTime() );
            }            
            
        // DONE FUNCTION: addPreview( void ) void
        };    
        self.addPreviewInfo = function( ){
        // FUNCTION: addPreviewInfo( void ) void
        
            // add preview info continer to buttonAndInputContainer
            $( '#' + self.inputAndButtonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.previewInfoContainerOptions ) );
            // add previewInfo to previewInfoContainerOptions
            $( '#' + self.previewInfoContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.previewInfoOptions ) );
            // add image info
            self.addImageInfo();
            
        // DONE FUNCTION: addPreviewInfo( void ) void
        };    
        self.addImageInfo = function( ){
        // FUNCTION: addImageInfo( void ) void
        
            if( self.values['thumbnail'] !== '' ){
                // create info
                var imageInfo = '';
                // add file name
                imageInfo += pleisterman.translations['fileName'] + ': ' + self.values['fileName'];
                imageInfo += '\n';
                // add width
                imageInfo += pleisterman.translations['width'] + ': ' + self.values['imageWidth'];
                imageInfo += '\n';
                // add height
                imageInfo += pleisterman.translations['height'] + ': ' + self.values['imageHeight'];
                imageInfo += '\n';
                // done create info
                
                // set image info
                $( '#' + self.previewInfoOptions['id'] ).val( imageInfo );
            }   
            else {
                // create info
                var imageInfo = pleisterman.translations['noImageUploaded'];
                // set image info
                $( '#' + self.previewInfoOptions['id'] ).val( imageInfo );
            }

        // DONE FUNCTION: addImageInfo( void ) void
        };    
        self.addInput = function( ){
        // FUNCTION: addInput( void ) void

            // add input container to buttonAndInputContainer
            $( '#' + self.inputAndButtonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.inputOptions ) );

            // load frame
            $( '#' + self.inputOptions['id'] ).attr('src', '/mbSiteCms/uploadImage' + '?' + new Date().getTime() );
            
        // DONE FUNCTION: addInput( void ) void
        };    
        self.addEvents = function( ){
        // FUNCTION: addEvents( void ) void
            
            // add item events
            self.addDocumentEvents();
            // add item events
            self.addItemEvents();
            // add preview events
            self.addPreviewEvents();
            // add input events
            self.addInputEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };    
        self.addDocumentEvents = function( ){
        // FUNCTION: addDocumentEvents( void ) void
            
            // item events
            $( document ).on('dragenter', function( event ){  self.cancelDragDropEvent( event ); });
            $( document ).on('dragover', function( event ){ self.cancelDragDropEvent( event ); });
            $( document ).on('drop', function( event ){ self.cancelDragDropEvent( event ); });
            // done item events
            
        // DONE FUNCTION: addDocumentEvents( void ) void
        };    
        self.addItemEvents = function( ){
        // FUNCTION: addItemEvents( void ) void
            
            // item events
            $( '#' + self.itemContainerOptions['id'] ).mouseenter( function( event ){ self.itemMouseIn( ); });
            $( '#' + self.itemContainerOptions['id'] ).mouseleave( function( event ){ self.itemMouseOut( ); });
            $( '#' + self.itemContainerOptions['id'] ).click( function( event ){ self.itemClick( ); });
            // done item events
            
        // DONE FUNCTION: addItemEvents( void ) void
        };    
        self.addPreviewEvents = function( ){
        // FUNCTION: addPreviewEvents( void ) void
            
            // input button events
            $( '#' + self.previewOptions['id'] ).mouseenter( function( event ){ self.previewMouseIn( ); });
            $( '#' + self.previewOptions['id'] ).mouseleave( function( event ){ self.previewMouseOut( ); });
            $( '#' + self.previewOptions['id'] ).click( function( event ){ self.showFullView( ); });
            // done input button events
            
        // DONE FUNCTION: addPreviewEvents( void ) void
        };
        self.addInputEvents = function( ){
        // FUNCTION: addInputEvents( void ) void
            
            // item events
            $( '#' + self.inputOptions['id'] ).mouseenter( function( event ){ self.inputMouseIn( ); });
            $( '#' + self.inputOptions['id'] ).mouseleave( function( event ){ self.inputMouseOut( ); });
            $( '#' + self.inputOptions['id'] ).click( function( event ){ self.inputClick( ); });
            // done item events
            
        // DONE FUNCTION: addInputEvents( void ) void
        };    
        self.removeEvents = function( ){
        // FUNCTION: removeEvents( void ) void
            
            // document
            $( document ).off( 'dragleave' );
            $( document ).off( 'dragenter' );
            $( document ).off( 'drop' );
            // done document
            
            // remove item events
            $( '#' + self.itemContainerOptions['id'] ).off();
            // remove preview events
            $( '#' + self.previewOptions['id'] ).off();
            // remove item events
            $( '#' + self.inputOptions['id'] ).off();
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add preview tabstops
            self.addPreviewTabStops();
            
            // add input tabstops
            self.addInputTabStops();

        // DONE FUNCTION: addTabStops( void ) void
        };
        self.addPreviewTabStops = function(){
        // FUNCTION: addPreviewTabStops( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.previewOptions['id'],
                'layer'     :   'data',
                'select'    :   self.previewFocusIn,
                'deSelect'  :   self.previewFocusOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.showFullView
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'tabStop',
                        'function'  :   self.hideFullView
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addPreviewTabStops( void ) void
        };
        self.addInputTabStops = function(){
        // FUNCTION: addInputTabStops( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.inputOptions['id'],
                'layer'     :   'data',
                'select'    :   self.inputFocusIn,
                'deSelect'  :   self.inputFocusOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.inputClick
                    }
                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );

        // DONE FUNCTION: addInputTabStops( void ) void
        };
        self.itemMouseIn = function( ){
        // FUNCTION: itemMouseIn( void ) void
            
            // remmeber mouse over 
            self.itemContainerOptions['mouseOver'] = true;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseIn( void ) void
        };        
        self.itemMouseOut = function( id ){
        // FUNCTION: itemMouseOut( void ) void
            
            // rememeber mouse out
            self.itemContainerOptions['mouseOver'] = false;
            
            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: itemMouseOut( void ) void
        };        
        self.itemClick = function( ){
        // FUNCTION: itemClick( void ) void
            
           // set tabstop on input
           jsProject.callEvent( 'selectTabStop', self.previewOptions['id'] );
            
        // DONE FUNCTION: itemClick( void ) void
        };
        self.previewMouseIn = function(){
        // FUNCTION: previewMouseIn( void ) void
            
            // remember mouse over
            self.previewOptions['mouseOver'] = true;
            // refresh display
            self.updatePreviewDisplay();
            
        // DONE FUNCTION: previewMouseIn( void ) void
        };
        self.previewMouseOut = function(){
        // FUNCTION: previewMouseOut( void ) void
            
            // unset mouse over
            self.previewOptions['mouseOver'] = false;
            // refresh display
            self.updatePreviewDisplay();
            
        // DONE FUNCTION: previewMouseOut( void ) void
        };
        self.previewFocusIn = function(){
        // FUNCTION: previewfocusIn( void ) void
            
            // show input
            jsProject.scrollElement( self.previewHeaderOptions['id'], self.contentId );
            // remember mouse over
            self.previewOptions['hasFocus'] = true;
            // refresh display
            self.updatePreviewDisplay();
            // update display
            self.updateDisplay();
            
        // DONE FUNCTION: previewfocusIn( void ) void
        };
        self.previewFocusOut = function(){
        // FUNCTION: previewFocusOut( void ) void
            
            // unset mouse over
            self.previewOptions['hasFocus'] = false;
            // refresh display
            self.updatePreviewDisplay();
            // update display
            self.updateDisplay();
            
        // DONE FUNCTION: previewFocusOut( void ) void
        };
        self.updatePreviewDisplay = function(){
        // FUNCTION: updatePreviewDisplay( void ) void
            
            // preview mouse over or has focus
            if( self.previewOptions['mouseOver'] || self.previewOptions['hasFocus'] ){
                // mouse in -> background color, color highlight
                $( '#' + self.previewHeaderOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                // mouse in -> color, color highlight
                $( '#' + self.previewHeaderOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            }
            else {
                // mouse out -> background color, color default
                $( '#' + self.previewHeaderOptions['id'] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                // mouse out -> color, color default
                $( '#' + self.previewHeaderOptions['id'] ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            }
            // done input mouse over or has focus
            
        // DONE FUNCTION: updatePreviewDisplay( void ) void
        };
        self.showFullView = function(){
        // FUNCTION: showFullView( void ) void

            if( self.values['thumbnail'] === '' ){
                // done
                return;
            }
            
            if( self.fullViewContainerOptions['open'] ){
                // hide
                self.hideFullView();
                // done
                return;
            }
            
            // debug info
            self.debug( 'show full view' );
            
            // add preview continer to main overlay
            $( '#' + self.fullViewContainerOptions['parentId'] ).html( jsProject.jsonToElementHtml( self.fullViewContainerOptions ) );
            // add full view header to previewContainerOptions
            $( '#' + self.fullViewContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.fullViewHeaderOptions ) );
            // add preview to previewContainerOptions
            $( '#' + self.fullViewContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.fullViewOptions ) );
            // set source
            $( '#' + self.fullViewOptions['id'] ).attr( 'src', self.values['original'] + '?' + new Date().getTime() );
            // remember open
            self.fullViewContainerOptions['open'] = true;
            // show overlay
            $( '#' + self.fullViewContainerOptions['parentId'] ).show();
            // add event
            $( '#' + self.fullViewContainerOptions['parentId'] ).click( function( event ){ self.hideFullView( ); });
            
        // DONE FUNCTION: showFullView( void ) void
        };
        self.hideFullView = function(){
        // FUNCTION: hideFullView( void ) void

            // hide overlay
            $( '#' + self.fullViewContainerOptions['parentId'] ).html( '' );
            // hide overlay
            $( '#' + self.fullViewContainerOptions['parentId'] ).hide();
            // add event
            $( '#' + self.fullViewContainerOptions['parentId'] ).off( );
            // remember closed
            self.fullViewContainerOptions['open'] = false;

        // DONE FUNCTION: hideFullView( void ) void
        };
        self.inputMouseIn = function(){
        // FUNCTION: inputMouseIn( void ) void
            
            // remember mouse over
            self.inputOptions['mouseOver'] = true;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: inputMouseIn( void ) void
        };
        self.inputMouseOut = function(){
        // FUNCTION: inputMouseOut( void ) void
            
            // unset mouse over
            self.inputOptions['mouseOver'] = false;
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: inputMouseOut( void ) void
        };
        self.cancelDragDropEvent = function( event ){
        // FUNCTION: cancelDragDropEvent( event: event ) void
            
            // prevent default
            event.preventDefault();
            // stop propagation
            event.stopPropagation();
            
        // DONE FUNCTION: cancelDragDropEvent( event: event ) void
        };
        self.inputFocusIn = function( ){
        // FUNCTION: focusIn( void ) void
            
            // debg info
            self.debug( 'focus in' );
            
            // rememeber focus in
            self.inputOptions['hasFocus'] = true;

            // show input
            jsProject.scrollElement( self.inputOptions['id'], self.contentId );

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusIn( void ) void
        };
        self.inputFocusOut = function( ){
        // FUNCTION: focusOut( void ) void
            
            // rememeber focus out
            self.inputOptions['hasFocus'] = false;

            // refresh display
            self.updateDisplay();
            
        // DONE FUNCTION: focusOut( void ) void
        };
        self.inputClick = function( ){
        // FUNCTION: inputClick( void ) void
            
            // debug info
            self.debug( 'inputClick' );

            // call open file function
            self.uploadActionOptions['openFileFunction']();
            
        // DONE FUNCTION: inputClick( void ) void
        };
        self.selectInputCallback = function( ){
        // FUNCTION: selectInputCallback( void ) void
            
            // debug info
            self.debug( 'selectInputCallback' );

           // set tabstop on input
           jsProject.callEvent( 'selectTabStop', self.inputOptions['id'] );

            
        // DONE FUNCTION: selectInputCallback( void ) void
        };
        self.updateDisplay = function(  ){ 
        // FUNCTION: updateDisplay( void ) void
            
            // cursor
            $( '#' + self.inputOptions['id'] ).css( 'cursor', 'pointer' );
            $( '#' + self.itemContainerOptions['id'] ).css( 'cursor', 'pointer' );
            // done cursor
            
            // selected
            if( self.inputOptions['hasFocus'] || self.itemContainerOptions['mouseOver'] || self.inputOptions['mouseOver'] ||
                self.previewOptions['hasFocus'] || self.previewOptions['mouseOver']    ){
                // display selected
                self.setSelectedDisplay();
            }
            else {
                // reset display unselected
                self.resetRememberedDisplay();
            }
            // selected
            
            // update button display
            self.updateButtonsDisplay();
            
        // DONE FUNCTION: updateDisplay( void ) void
        };
        self.updateButtonsDisplay = function(  ){
        // FUNCTION: updateButtonsDisplay( void ) void
        
            // set background color
            $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );            
            // set color
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );            

            // input mouse over or has focus
            if( self.inputOptions['mouseOver'] || self.inputOptions['hasFocus'] ){
                // mouse out -> background color, color default
                $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                // mouse out -> color, color default
                $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            }
            else {
                // mouse out -> background color, color default
                $( '#' + self.inputOptions['id'] ).css( 'background-color', 'transparent' );
                // mouse out -> color, color default
                $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['commonColor']['color'] );
            }
            // done input mouse over or has focus
            
        // DONE FUNCTION: updateButtonsDisplay( void ) void
        };
        self.setData = function( ) {
        // FUNCTION: setData( void ) void
            
            // no action
            
        // DONE FUNCTION: setData( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            // set background color
            $( '#' + self.inputOptions['id'] ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            // set color
            $( '#' + self.inputOptions['id'] ).css( 'color', pleisterman.colors['editColor']['color'] );
            
        // DONE FUNCTION: updateColors( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove event subscription
            self.removeEventSubscriptions();
            
            // remove self.uploadActionOptions link
            self.uploadActionOptions = null;
            
            // remove events
            self.removeEvents();

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
    // DONE MODULE: dataEditImageUploadModule( string: contentId, json: values ) void 
})( pleisterman );
// done create module function
