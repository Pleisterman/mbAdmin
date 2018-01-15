/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/upload/dataModule.js
 * 
 *  Last revision: 31-12-2016
 * 
 *  Purpose: 
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: dataModule( void ) void 
    
    pleisterman.dataModule = function( options ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataModule';                                     // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.options = options;                                         // json: options    
        self.labelOptions = {                                           // json: label options
            'element'               :   'div',                          // string: element type
            'display'               :   'inline-block',                 // css display style
            'verticalAlign'         :   'top',                          // css vertical align
            'fontSize'              :   parent.pleisterman.getSetting( 'dataEditLabelFontSize' ),     // css font size
            'fontWeight'            :   parent.pleisterman.getSetting( 'dataEditLabelFontWeight' ),   // css font weight
            'marginTop'             :   parent.pleisterman.getSetting( 'dataEditLabelMarginTop' ),    // css margin top
            'marginRight'           :   parent.pleisterman.getSetting( 'dataEditLabelMarginRight' )   // css margin right
        };                                                              // done json: label options
        self.nameContainerOptions = {                                   // json: name container options
            'parentId'              :   'contentContainer',             // string: parent element id
            'id'                    :   'nameContainer',                // string: element id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block',                        // css display
            'position'              :   'relative',                     // css position
            'verticalAlign'         :   'middle',                       // css verical align
            'backgroundColor'       :   parent.pleisterman.colors['dataItemBackgroundColor']['color'], // css color: background color
            'padding'               :   '0.4em',                        // css padding
            'marginTop'             :   '0.4em',                        // css margin top
            'marginLeft'            :   '2.0em'                         // css margin left
        };                                                              // done json: name container options
        self.nameLabelOptions = {                                       // json: name label options
            'id'                    :   'nameLabel',                    // string: element id
            'text'                  :   parent.pleisterman.translations['name']   // string: text
        };                                                              // done json: name label options
        self.nameOptions = {                                            // json: name options
            'id'                    :   'name',                         // string: id
            'name'                  :   'name',                         // string: name
            'element'               :   'input',                        // string: html element type 
            'type'                  :   'text',                         // string: input type 
            'display'               :   'inline-block',                 // css display 
            'styleWidth'            :   '20.7em',                       // css style width
            'backgroundColor'       :   parent.pleisterman.colors['editBackgroundColor']['color'],    // css color: background color
            'fontSize'              :   parent.pleisterman.getSetting( 'dataEditInputFontSize' ),     // css font size
            'fontWeight'            :   parent.pleisterman.getSetting( 'dataEditInputFontWeight' ),   // css font weight
            'color'                 :   parent.pleisterman.colors['editColor']['color'],              // css color: color
            'border'                :   true,                           // boolean: has border    
            'borderStyle'           :   'solid',                        // css border style
            'borderWidth'           :   '0.1em',                        // css border width
            'borderRadius'          :   '0.0em',                        // css border radius
            'marginLeft'            :   '1.0em'                         // css margin left
        };                                                              // done json: name options
        self.originalFileNameContainerOptions = {                       // json: original name container options
            'parentId'              :   'contentContainer',             // string: parent element id    
            'id'                    :   'originalFileNameContainer',    // string: id
            'element'               :   'div',                          // string: html element type 
            'display'               :   'block',                        // css display
            'position'              :   'relative',                     // css position
            'verticalAlign'         :   'middle',                       // css verical align
            'backgroundColor'       :   parent.pleisterman.colors['dataItemBackgroundColor']['color'], // css color: background color
            'padding'               :   '0.4em',                        // css padding
            'marginTop'             :   '0.4em',                        // css margin top
            'marginLeft'            :   '2.0em'                         // css margin left
        };                                                              // done json: original name container options
        self.originalFileNameOptions = {                                // json: original name options
            'id'                    :   'originalFileName',             // string: id
            'type'                  :   'text',                         // string: input type 
            'element'               :   'input',                        // string: html element type 
            'display'               :   'inline-block',                 // css display
            'backgroundColor'       :   parent.pleisterman.colors['editBackgroundColor']['color'],    // css color: background color
            'fontSize'              :   parent.pleisterman.getSetting( 'dataEditInputFontSize' ),     // css font size
            'fontWeight'            :   parent.pleisterman.getSetting( 'dataEditInputFontWeight' ),   // css font weight
            'color'                 :   parent.pleisterman.colors['buttonDisabledColor']['color'],    // css color: color
            'styleWidth'            :   '20.7em',                       // css style width
            'border'                :   true,                           // boolean: has border   
            'borderColor'           :   'transparent',                  // css color: border style
            'borderStyle'           :   'solid',                        // css border style
            'borderWidth'           :   '0.0em',                        // rcss border width
            'borderRadius'          :   '0.0em',                        // css border radius
            'marginTop'             :   '0.2em',                        // css margin top
            'padding'               :   '0.2em',                        // css padding
            'marginLeft'            :   '1.0em'                         // css margin left
        };                                                              // done json: original name options
        self.fileButtonOptions = {                                      // json: file button options
            'parentId'              :   'fileContainer',                // string: parent element id     
            'id'                    :   'file',                         // string: element id 
            'name'                  :   'file',                         // string: name 
            'element'               :   'input',                        // string: html element type
            'type'                  :   'file',                         // string: input type 
            'minimumWidth'          :   '22.0em',                       // css minimum width
            'color'                 :   parent.pleisterman.colors['buttonColor']['color'],            // css color: color
            'backgroundColor'       :   parent.pleisterman.colors['buttonBackgroundColor']['color'],  // css color: background color
            'fontSize'              :   parent.pleisterman.getSetting( 'buttonFontSize' ),            // css font size
            'fontWeight'            :   parent.pleisterman.getSetting( 'buttonFontWeight' ),          // css font weight
            'padding'               :   parent.pleisterman.getSetting( 'buttonPadding' ),             // css padding
            'border'                :   true,                           // boolean: has border 
            'borderWidth'           :   parent.pleisterman.getSetting( 'buttonBorderWidth' ),         // css border width
            'borderColor'           :   parent.pleisterman.colors['buttonBorderColor']['color'],      // css color: border color
            'borderStyle'           :   parent.pleisterman.getSetting( 'buttonBorderStyle' ),         // css border style
            'borderRadius'          :   parent.pleisterman.getSetting( 'buttonBorderRadius' ),        // css border radius
            'marginTop'             :   '0.6em',                        // css margin top
            'marginBottom'          :   '0.4em',                        // css margin bottom
            'marginLeft'            :   '1.8em',                        // css margin left
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: file button options
        self.buttonOptions = {                                          // json: button options
            'parentId'              :   'buttonsContainer',             // tring: parent element id  
            'closeButtonId'         :   'buttonClose',                  // string: element id  
            'insertButtonId'        :   'buttonUpload',                 // string: insert button element id  
            'insertEnabled'         :   false,                          // boolean: insert enabled
            'updateNameButtonId'    :   'buttonUpdateName',             // string: update name button element id  
            'updateFileButtonId'    :   'buttonUpdateFile',             // string: update file button element id  
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'color'                 :   parent.pleisterman.colors['buttonColor']['color'],            // css color: color     
            'backgroundColor'       :   parent.pleisterman.colors['buttonBackgroundColor']['color'],  // css color: background color
            'fontSize'              :   parent.pleisterman.getSetting( 'buttonFontSize' ),            // css font size
            'fontWeight'            :   parent.pleisterman.getSetting( 'buttonFontWeight' ),          // css font weight
            'padding'               :   parent.pleisterman.getSetting( 'buttonPadding' ),             // css padding
            'border'                :   true,                           // add border option
            'borderWidth'           :   parent.pleisterman.getSetting( 'buttonBorderWidth' ),         // css border width
            'borderColor'           :   parent.pleisterman.colors['buttonBorderColor']['color'],      // css color: border color
            'borderStyle'           :   parent.pleisterman.getSetting( 'buttonBorderStyle' ),         // css border style
            'borderRadius'          :   parent.pleisterman.getSetting( 'buttonBorderRadius' ),        // css border radius
            'marginTop'             :   '0.4em',                        // css margin top           
            'marginBottom'          :   '0.4em',                        // css margin bottom        
            'marginLeft'            :   '2.0em',                        // css margin left         
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align 
        };                                                              // done json: button options
        self.insertEnabled = false;                                     // boolean: insert enabled
        self.updateFileEnabled = false;                                 // boolean: update file enables
        self.nameChangeEnabled = false;                                 // boolean: name change enabled
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function( ) {
        // FUNCTION: addHtml( void ) void
            
            // add name
            self.addName();

            // add original file name
            self.addOriginalFileName();

            // add file button
            self.addFileButton();

            // add buttons
            self.addButtons();
            
            // add events
            self.addEvents();
            
            // activate tab stops
            self.activateTabStops();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addName = function() {
        // FUNCTION: addName( void ) void
            
            // add name container html
            $( '#' + self.nameContainerOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.nameContainerOptions ) );

            // add label
            $( '#' + self.nameContainerOptions['id'] ).append( parent.jsProject.jsonToElementHtml( self.nameLabelOptions ) );
            // done add label
            
            // add name input
            $( '#' + self.nameContainerOptions['id'] ).append( parent.jsProject.jsonToElementHtml( self.nameOptions ) );
            
            // add tab stop
            self.addNameTabStop();
            
        // DONE FUNCTION: addName( void ) void
        };
        self.addNameTabStop = function(){
        // FUNCTION: addNameTabStop( void ) void
            
            // debug info
            self.debug('addNameTabStop' );
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.nameOptions['id'],
                'layer'     :   'main',
                'select'    :   self.nameSelect,
                'deSelect'  :   self.nameMouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.nameOptions['id']
            };
            // done create tabstop options
            
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            // done add tabstop
            
        // DONE FUNCTION: addNameTabStop( void ) void
        };
        self.addOriginalFileName = function() {
        // FUNCTION: addOriginalFileName( void ) void
            
            // add original file name container html
            $( '#' + self.originalFileNameContainerOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.originalFileNameContainerOptions ) );
             
            // add label
            self.labelOptions['text'] = parent.pleisterman.translations['originalFileName'];
            $( '#' + self.originalFileNameContainerOptions['id'] ).append( parent.jsProject.jsonToElementHtml( self.labelOptions ) );
            // done add label

            // original file name
            $( '#' + self.originalFileNameContainerOptions['id'] ).append( parent.jsProject.jsonToElementHtml( self.originalFileNameOptions ) );
            $( '#' + self.originalFileNameOptions['id'] ).attr( 'disabled', true );
            // original file name
            
        // DONE FUNCTION: addOriginalFileName( void ) void
        };
        self.addFileButton = function() {
        // FUNCTION: addFileButton( void ) void
            
            // add button html
            $( '#' + self.fileButtonOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.fileButtonOptions ) );
            // set single select
            $( '#' + self.fileButtonOptions['id'] ).attr( 'multiple', false );
            // add tab stop 
            self.addFileButtonTabStop();
            
        // DONE FUNCTION: addFileButton( void ) void
        };
        self.addFileButtonTabStop = function(){
        // FUNCTION: addFileButtonTabStop( void ) void
            
            // debug info
            self.debug('addFileButtonTabStop' );
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.fileButtonOptions['id'],
                'layer'     :   'main',
                'select'    :   self.fileMouseIn,
                'deSelect'  :   self.fileMouseOut,
                'canFocus'  :   true,
                'focusId'   :   self.fileButtonOptions['id']
            };
            // done create tabstop options
            
            // add tab  stop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addFileButtonTabStop( void ) void
        };
        self.addButtons = function() {
        // FUNCTION: addButtons( void ) void
            
            // mode
            if( self.options['callerOptions']['mode'] === 'insert' ){
                // add insert buttons
                self.addInsertButtons();
            }
            else {
                // add update buttons
                self.addUpdateButtons();
            }
            // done mode

            // add close button
            self.addCloseButton();
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addInsertButtons = function(){
        // FUNCTION: addInsertButtons( void ) void
            
            // set button text
            self.buttonOptions['text'] = parent.pleisterman.translations['insert'];
            // set id
            self.buttonOptions['id'] = self.buttonOptions['insertButtonId'];

            // create html
            $( '#' + self.buttonOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.buttonOptions ) );

            // set disabled colors
            $( '#' + self.buttonOptions['insertButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['insertButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );
            // done set disabled colors
            
            // add tab stop
            self.addInsertButtonTabStop();
            
        // DONE FUNCTION: addInsertButtons( void ) void
        };
        self.addInsertButtonTabStop = function(){
        // FUNCTION: addInsertButtonTabStop( void ) void
            
            // debug info
            self.debug('addInsertButtonTabStop' );
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['insertButtonId'],
                'layer'     :   'main',
                'select'    :   self.buttonInsertMouseIn,
                'deSelect'  :   self.buttonInsertMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.insert
                    }                ]
            };
            // done create tabstop options
            
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            // done add tabstop
            
        // DONE FUNCTION: addInsertButtonTabStop( void ) void
        };
        self.addUpdateButtons = function(){
        // FUNCTION: addUpdateButtons( void ) void
            
            // add update name
            self.addUpdateNameButton();
            // add update file
            self.addUpdateFileButton();
            
        // DONE FUNCTION: addUpdateButtons( void ) void
        };
        self.addUpdateNameButton = function(){
        // FUNCTION: addUpdateNameButton( void ) void
            
            // set button text
            self.buttonOptions['text'] = parent.pleisterman.translations['updateName'];
            // set id
            self.buttonOptions['id'] = self.buttonOptions['updateNameButtonId'];

            // create html
            $( '#' + self.buttonOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.buttonOptions ) );
            // set disabled colors
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );
            // done set disabled colors

            // add tab stop
            self.addUpdateNameButtonTabStop();
            
        // DONE FUNCTION: addUpdateNameButton( void ) void
        };
        self.addUpdateNameButtonTabStop = function(){
        // FUNCTION: addUpdateNameButtonTabStop( void ) void
            
            // debug info
            self.debug('addUpdateButtonTabStop' );
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['updateNameButtonId'],
                'layer'     :   'main',
                'select'    :   self.buttonUpdateNameMouseIn,
                'deSelect'  :   self.buttonUpdateNameMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.updateName
                    }                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addUpdateNameButtonTabStop( void ) void
        };
        self.addUpdateFileButton = function(){
        // FUNCTION: addUpdateFileButton( void ) void
            
            // set button text
            self.buttonOptions['text'] = parent.pleisterman.translations['updateFile'];
            // set id
            self.buttonOptions['id'] = self.buttonOptions['updateFileButtonId'];

            // create html
            $( '#' + self.buttonOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.buttonOptions ) );
            // set disabled colors
            $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );
            // done set disabled colors
            
            // add tab stop
            self.addUpdatFileButtonTabStop();
            
        // DONE FUNCTION: addUpdateFileButton( void ) void
        };
        self.addUpdatFileButtonTabStop = function(){
        // FUNCTION: addUpdatFileButtonTabStop( void ) void
            
            // debug info
            self.debug('addUpdatFileButtonTabStop' );
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['updateFileButtonId'],
                'layer'     :   'main',
                'select'    :   self.buttonUpdateFileMouseIn,
                'deSelect'  :   self.buttonUpdateFileMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.updateFile
                    }                ]
            };
            // done create tabstop options
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addUpdatFileButtonTabStop( void ) void
        };
        self.addCloseButton = function(){
        // FUNCTION: addCloseButton( void ) void
            
            // add close 
            self.buttonOptions['id'] = self.buttonOptions['closeButtonId'];
            self.buttonOptions['text'] = parent.pleisterman.translations['close'];
            $( '#' + self.buttonOptions['parentId'] ).append( parent.jsProject.jsonToElementHtml( self.buttonOptions ) );
            // done add close 

            // add tab stop
            self.addCloseButtonTabStop();
            
        // DONE FUNCTION: addCloseButton( void ) void
        };
        self.addCloseButtonTabStop = function(){
        // FUNCTION: addCloseButtonTabStop( void ) void
            
            // debug info
            self.debug('addCloseButtonTabStop' );
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.buttonOptions['closeButtonId'],
                'layer'     :   'main',
                'select'    :   self.buttonCloseMouseIn,
                'deSelect'  :   self.buttonCloseMouseOut,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabstop',
                        'function'  :   self.close
                    },                
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'default',
                        'function'  :   self.close
                    }                
                ]
            };
            // done create tabstop options
            
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            // done add tabstop
            
        // DONE FUNCTION: addCloseButtonTabStop( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add name events
            $( '#' + self.nameContainerOptions['id'] ).mouseenter( function( event ){ self.nameMouseIn( ); });
            $( '#' + self.nameContainerOptions['id'] ).mouseleave( function( event ){ self.nameMouseOut( ); });
            $( '#' + self.nameOptions['id'] ).keyup( function( event ){ self.nameChange( ); });
            // done add name events
            
            // add file button events
            $( '#' + self.fileButtonOptions['id'] ).mouseenter( function( event ){ self.fileMouseIn( ); });
            $( '#' + self.fileButtonOptions['id'] ).mouseleave( function( event ){ self.fileMouseOut( ); });
            $( '#' + self.fileButtonOptions['id'] ).change( function( event ){ self.fileChange( ); });
            // done add file button events
          
            // mode
            if( self.options['callerOptions']['mode'] === 'insert' ){
                // add insert button events
                $( '#' + self.buttonOptions['insertButtonId'] ).mouseenter( function( event ){ self.buttonInsertMouseIn( ); });
                $( '#' + self.buttonOptions['insertButtonId'] ).mouseleave( function( event ){ self.buttonInsertMouseOut( ); });
                $( '#' + self.buttonOptions['insertButtonId'] ).click( function( event ){ self.insert(); });
                // done add insert button events
            }
            else {
                // add update file events
                $( '#' + self.buttonOptions['updateFileButtonId'] ).mouseleave( function( event ){ self.buttonUpdateFileMouseOut( ); });
                $( '#' + self.buttonOptions['updateFileButtonId'] ).mouseenter( function( event ){ self.buttonUpdateFileMouseIn( ); });
                $( '#' + self.buttonOptions['updateFileButtonId'] ).click( function( event ){ self.updateFile( ); });
                // done add update file events
                
                // add update name button events
                $( '#' + self.buttonOptions['updateNameButtonId'] ).mouseleave( function( event ){ self.buttonUpdateNameMouseOut( ); });
                $( '#' + self.buttonOptions['updateNameButtonId'] ).mouseenter( function( event ){ self.buttonUpdateNameMouseIn( ); });
                $( '#' + self.buttonOptions['updateNameButtonId'] ).click( function( event ){ self.updateName(); });
                // done add update name button events
            }
            // done mode
            
            // done add close button events
            $( '#' + self.buttonOptions['closeButtonId'] ).mouseleave( function( event ){ self.buttonCloseMouseOut( ); });
            $( '#' + self.buttonOptions['closeButtonId'] ).mouseenter( function( event ){ self.buttonCloseMouseIn( ); });
            $( '#' + self.buttonOptions['closeButtonId'] ).click( function( event ){ self.close(); });
            // done add close button events
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.activateTabStops = function(){
        // FUNCTION: activateTabStops( void ) void
            
            // debug info
            self.debug( 'activateTabStopsTabStops' );
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'main' );
            
            // create options
            var tabstopOptions = {
                'layer' :   'main',
                'id'    :   ''
            };
            // done create options

            // mode
            if( self.options['callerOptions']['mode'] === 'insert' ){
                // set insert id
                tabstopOptions['id'] = self.buttonOptions['insertButtonId'];
                // disable insert tabstop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
                // set tabstop on file button
                jsProject.callEvent( 'selectTabStop', self.fileButtonOptions['id'] );
                
            }
            else {
                // set update name id
                tabstopOptions['id'] = self.buttonOptions['updateNameButtonId'];
                // disable update name tabstop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
                // set update file id
                tabstopOptions['id'] = self.buttonOptions['updateFileButtonId'];
                // disable update file tabstop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
            }
            // done mode
            
        // DONE FUNCTION: activateTabStops( void ) void
        };
        self.nameSelect = function( ){
        // FUNCTION: nameSelect( void ) void
            
            // select text
            $( '#' + self.nameOptions['id'] ).select();
            
            // update display
            self.updateNameDisplay( true );
            
        // DONE FUNCTION: nameSelect( void ) void
        };
        self.nameMouseIn = function( ){
        // FUNCTION: nameMouseIn( void ) void
            
            // update display
            self.updateNameDisplay( true );
            
        // DONE FUNCTION: nameMouseIn( void ) void
        };
        self.nameMouseOut = function( ){
        // FUNCTION: nameMouseOut( void ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.nameOptions['id'] ){
                // done keep selected
                return;
            }
            // done is current tabstop
            
            // update display
            self.updateNameDisplay( false );
            
        // DONE FUNCTION: nameMouseOut( void ) void
        };
        self.updateNameDisplay = function( select ){
        // FUNCTION: updateNameDisplay( boolezn: select ) void
            
            // if select
            if( select ){
                // set item background color selected
                $( '#' + self.nameContainerOptions['id'] ).css( 'background-color', parent.pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                // set label color selected
                $( '#' + self.nameLabelOptions['id'] ).css( 'color', parent.pleisterman.colors['buttonHighlightColor']['color'] );
                // set label font weight selected
                $( '#' + self.nameLabelOptions['id'] ).css( 'font-weight', 'bold' );
            }
            else {
                // set item background color default
                $( '#' + self.nameContainerOptions['id'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
                // set label color default
                $( '#' + self.nameLabelOptions['id'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
                // set label font weight default
                $( '#' + self.nameLabelOptions['id'] ).css( 'font-weight', 'normal' );
            }
            // done if select
            
        // DONE FUNCTION: updateNameDisplay( boolezn: select  ) void
        };
        self.nameChange = function() {
        // FUNCTION: nameChange( void ) void
            
            // error no background color
            $( '#' + self.options['errorId'] ).css( 'background-color', 'transparent' );
            // hide empty
            $( '#' + self.options['errorId'] ).html( '' );
            
            // mode is update
            if( self.options['callerOptions']['mode'] === 'update' ){ 
                // update button name change enabled background color
                $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
                // update button name change enabled color
                $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
                // remember enable name change
                self.nameChangeEnabled = true;

                // create options
                var tabstopOptions = {
                    'layer' :   'main',
                    'id'    :   self.buttonOptions['updateNameButtonId']
                };
                // done create options
                
                // enable tab stop
                jsProject.callEvent( 'enableTabStop', tabstopOptions );
                
            }
            // done mode is update
            
            // callback empty error
            self.options['errorCallback']( '' );
            
        // DONE FUNCTION: nameChange( void ) void
        };
        self.fileMouseIn = function(){
        // FUNCTION: fileMouseIn( void ) void
            
            // show selection
            self.selectFileButton( true );
            
        // DONE FUNCTION: fileMouseIn( void ) void
        };
        self.fileMouseOut = function(){
        // FUNCTION: fileMouseOut( void ) void
            
               // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.fileButtonOptions['id'] ){
                // done keep selected
                return;
            }
            // done is current tabstop
         
            // show selection
            self.selectFileButton( false );
            
        // DONE FUNCTION: fileMouseOut( void ) void
        };
        self.selectFileButton = function( select ){
        // FUNCTION: selectFileButton( boolean: select ) void
            
            // if select
            if( select ){
                // set item background color selected
                $( '#' + self.fileButtonOptions['id'] ).css( 'background-color', parent.pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                // set focus
                $( '#' + self.fileButtonOptions['id'] ).focus();
            }
            else {
                // set item background color default
                $( '#' + self.fileButtonOptions['id'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
            }
            // done if select
            
        // DONE FUNCTION: selectFileButton( boolean: select ) void
        };
        self.fileChange = function() {
        // FUNCTION: fileChange( void ) void
            
            // remove errors
            self.options['errorCallback']( '' );

            // create options
            var tabstopOptions = {
                'layer' :   'main',
                'id'    :   ''
            };
            // done create options
            
            // has filename value
            if( $( '#' + self.fileButtonOptions['id'] ).val() ){
                // is insert mode
                if( self.options['callerOptions']['mode'] === 'insert' ){
                    // insert button enable background color
                    $( '#' + self.buttonOptions['insertButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
                    // insert button enable color
                    $( '#' + self.buttonOptions['insertButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
                    // remember enable insert
                    self.insertEnabled = true;
                    
                    // set tab stop options id
                    tabstopOptions['id'] = self.buttonOptions['insertButtonId'];
                    // enable tabstop
                    jsProject.callEvent( 'enableTabStop', tabstopOptions );

                    // check if name is empty
                    var name = $( '#' + self.nameOptions['id'] ).val( );
                    name = $.trim( name );
                    if( name.length === 0 ){
                        // get file name
                        var filePath = $( '#' + self.fileButtonOptions['id'] ).val();
                        var fileArray = filePath.split( '\\' );
                        var file = fileArray[fileArray.length-1];
                        // done get file name

                        // set name input = filename
                        $( '#' + self.nameOptions['id'] ).val( file );
                    }
                    // done check if name is empty
                }    
                // done is insert mode
                
                // is update mode
                if( self.options['callerOptions']['mode'] === 'update' ){
                    // update file button enable background color
                    $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
                    // update file button enable color
                    $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
                    // remmeber update file enabled
                    self.updateFileEnabled = true;

                    // set tab stop options id
                    tabstopOptions['id'] = self.buttonOptions['updateFileButtonId'];
                    // enable tabstop
                    jsProject.callEvent( 'enableTabStop', tabstopOptions );
                }    
                // done is update mode
            }
            else {
                // mode is insert
                if( self.options['callerOptions']['mode'] === 'insert' ){
                    // upload button disabled background color
                    $( '#' + self.buttonOptions['insertButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                    // upload button disabled color
                    $( '#' + self.buttonOptions['insertButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );
                    // remember upload disabled
                    self.insertEnabled = false;
                    
                    // set tab stop options id
                    tabstopOptions['id'] = self.buttonOptions['insertButtonId'];
                    // enable tabstop
                    jsProject.callEvent( 'disableTabStop', tabstopOptions );
                }    
                // done mode is insert
                
                // is update mode
                if( self.options['callerOptions']['mode'] === 'update' ){
                    // update file button disabled background color
                    $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                    // update file button disabled color
                    $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );
                    // remember update file disabled
                    self.updateFileEnabled = false;
                    
                    // set tab stop options id
                    tabstopOptions['id'] = self.buttonOptions['updateFileButtonId'];
                    // enable tabstop
                    jsProject.callEvent( 'disableTabStop', tabstopOptions );
                }    
                // done is update mode    
            }
            // done has filename value
            
        // DONE FUNCTION: fileChange( void ) void
        };
        self.buttonInsertMouseIn = function(  ){
        // FUNCTION: buttonInsertMouseIn( void ) void
            
            // insert disabled
            if( !self.insertEnabled ){
                // done 
                return;
            } 
            // done insert disabled

            // change selection
            self.buttonInsertSelect( true );
            
        // DONE FUNCTION: buttonInsertMouseIn( void ) void
        };
        self.buttonInsertMouseOut = function( ){
        // FUNCTION: buttonInsertMouseOut( void ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonOptions['insertButtonId'] ){
                // done keep selected
                return;
            }
            // done is current tabstop
            
            // insert disabled
            if( !self.insertEnabled ){
                // done 
                return;
            } 
            // done insert disabled

            // change selection
            self.buttonInsertSelect( false );
            
        // DONE FUNCTION: buttonInsertMouseOut( void ) void
        };
        self.buttonInsertSelect = function( select ){
        // FUNCTION: buttonInsertSelect( boolean: select ) void
            
            // if select
            if( select ){
                // mouse over -> background color, color highlight
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'color', parent.pleisterman.colors['buttonHighlightColor']['color'] );
                // done mouse over -> background color, color highlight
            }
            else {
                // mouse over -> background color, color highlight
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
                // done mouse over -> background color, color highlight
            }
            // done if select
            
        // DONE FUNCTION: buttonInsertSelect( boolean: select ) void
        };
        self.insert = function( ){
        // FUNCTION: insert( void ) void
            
            // insert disabled
            if( !self.insertEnabled ){
                // done 
                return;
            } 
            // done insert disabled

            // call the callback
            self.options['insertCallback']( );
            
        // DONE FUNCTION: insert( void ) void
        };
        self.buttonUpdateNameMouseIn = function( ){
        // FUNCTION: buttonUpdateNameMouseIn( void ) void
            
            // name change disabled
            if( !self.nameChangeEnabled ){
                // done 
                return;
            } 
            // name change disabled

            // mouse over -> background color, color highlight
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'color', parent.pleisterman.colors['buttonHighlightColor']['color'] );
            // done mouse over -> background color, color highlight
            
        // DONE FUNCTION: buttonUpdateNameMouseIn( void ) void
        };
        self.buttonUpdateNameMouseOut = function(  ){
        // FUNCTION: buttonUpdateNameMouseOut( void ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonOptions['updateNameButtonId'] ){
                // done keep selected
                return;
            }
            // done is current tabstop

            // mouse over -> background color, color highlight
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
            // done mouse over -> background color, color highlight
            
        // DONE FUNCTION: buttonUpdateNameMouseOut( void ) void
        };
        self.updateName = function( ){
        // FUNCTION: updateName( void ) void
            
            // name change disabled
            if( !self.nameChangeEnabled ){
                // done not enabled
                return;
            } 
            // name change disabled

            // call the callback
            self.options['updateNameCallback']( );

            // remember disable name change
            self.nameChangeEnabled = false;
            
            // set tabstop on close button
            jsProject.callEvent( 'selectTabStop', self.buttonOptions['closeButtonId'] );
            
            // create options
            var tabstopOptions = {
                'layer' :   'main',
                'id'    :   self.buttonOptions['updateNameButtonId']
            };
            // done create options

            // enable tab stop
            jsProject.callEvent( 'enableTabStop', tabstopOptions );

            // set disabled colors
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );
            // done set disabled colors
            
        // DONE FUNCTION: updateName( void ) void
        };
        self.buttonUpdateFileMouseIn = function( ){
        // FUNCTION: buttonUpdateFileMouseIn( void ) void
            
            // update file disabled
            if( !self.updateFileEnabled ){
                // done not enabled
                return;
            } 
            // done update file disabled
            
            // mouse over -> background color, color highlight
            $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'color', parent.pleisterman.colors['buttonHighlightColor']['color'] );
            // done mouse over -> background color, color highlight
            
        // DONE FUNCTION: buttonUpdateFileMouseIn( void ) void
        };
        self.buttonUpdateFileMouseOut = function( ){
        // FUNCTION: buttonUpdateFileMouseOut( void ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonOptions['updateFileButtonId'] ){
                // done keep selected
                return;
            }
            // done is current tabstop

            // mouse over -> background color, color highlight
            $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['updateFileButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
            // done mouse over -> background color, color highlight
            
        // DONE FUNCTION: buttonUpdateFileMouseOut( void ) void
        };
        self.updateFile = function( ){
        // FUNCTION: updateFile( void ) void
            
            // update file disabled
            if( !self.updateFileEnabled ){
                // done not enabled
                return;
            } 
            // done update file disabled
            
            // call the callback
            self.options['updateFileCallback']( );
            
        // DONE FUNCTION: updateFile( void ) void
        };
        self.buttonCloseMouseIn = function( ){
        // FUNCTION: buttonCloseMouseIn( void ) void
            
            // mouse over -> background color, color highlight
            $( '#' + self.buttonOptions['closeButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['closeButtonId'] ).css( 'color', parent.pleisterman.colors['buttonHighlightColor']['color'] );
            // done mouse over -> background color, color highlight
            
        // DONE FUNCTION: buttonCloseMouseIn( void ) void
        };
        self.buttonCloseMouseOut = function( ){
        // FUNCTION: buttonCloseMouseOut( void ) void
            
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === self.buttonOptions['closeButtonId'] ){
                // done keep selected
                return;
            }
            // done is current tabstop
            
            // mouse over -> background color, color highlight
            $( '#' + self.buttonOptions['closeButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['closeButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );
            // done mouse over -> background color, color highlight
            
        // DONE FUNCTION: buttonCloseMouseOut( void ) void
        };
        self.close = function(){
        // FUNCTION: close( void ) void
            
            // call the callback
            self.options['closeCallback']( );
            
        // DONE FUNCTION: close( void ) void
        };
        self.getName = function(  ){
        // FUNCTION: getName( void ) string: name
            
            // get name
            var name = $( '#' + self.nameOptions['id'] ).val( );
            
            // check name empty
            name = $.trim( name );        
            if( name.length === 0 ){
                // set focus
                $( '#' + self.nameOptions['id'] ).focus();
                // get error
                parent.pleisterman.getError( 'nameEmpty', self.options['errorCallback'] );
                self.enableUpdateName( false );
                return false;
            }
            // done check name empty

            // name input val = trimmed name
            $( '#' + self.nameOptions['id'] ).val( name );

            // return 
            return name;
            
        // DONE FUNCTION: getName( void ) string: name
        };
        self.enableInsert = function( enable ){
        // FUNCTION: enableInsert( boolean: enable ) void
            
            // remember enabled
            self.insertEnabled = enable;
            
            // enabled
            if( enable ){
                // insert button background color default
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
                // insert button color default
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );

                // create options
                var tabstopOptions = {
                    'layer' :   'main',
                    'id'    :   self.buttonOptions['insertButtonId']
                };
                // done create options
                
                // enable tab stop
                jsProject.callEvent( 'enableTabStop', tabstopOptions );
            }
            else {
                // insert button background color disabled
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                // insert button color disabled
                $( '#' + self.buttonOptions['insertButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );

                // create options
                var tabstopOptions = {
                    'layer' :   'main',
                    'id'    :   self.buttonOptions['insertButtonId']
                };
                // done create options
                
                // disable tab stop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
            }
            // done enabled

        // DONE FUNCTION: enableInsert( boolean: enable ) void
        };
        self.enableNameUpdate = function( enable ){
        // FUNCTION: enableNameUpdate( boolean: enable ) void
            
            // remember enable
            self.nameChangeEnabled = enable;
            
            // enabled
            if( enable ){
                // update name button background color default
                $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonBackgroundColor']['color'] );
                // update name button color default
                $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'color', parent.pleisterman.colors['buttonColor']['color'] );

                // create options
                var tabstopOptions = {
                    'layer' :   'main',
                    'id'    :   self.buttonOptions['updateNameButtonId']
                };
                // done create options
                
                // enable tab stop
                jsProject.callEvent( 'enableTabStop', tabstopOptions );
            }
            else {
                // update name button background color disabled
                $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'background-color', parent.pleisterman.colors['buttonDisabledBackgroundColor']['color'] );
                // update name button color disabled
                $( '#' + self.buttonOptions['updateNameButtonId'] ).css( 'color', parent.pleisterman.colors['buttonDisabledColor']['color'] );

                // set tabstop on close button
                jsProject.callEvent( 'selectTabStop', self.buttonOptions['closeButtonId'] );

                // create options
                var tabstopOptions = {
                    'layer' :   'main',
                    'id'    :   self.buttonOptions['updateNameButtonId']
                };
                // done create options
                
                // disable tab stop
                jsProject.callEvent( 'disableTabStop', tabstopOptions );
                
            }
            // done enabled
            
        // DONE FUNCTION: enableNameUpdate( boolean: enable ) void
        };
        self.setName = function( name ){
        // FUNCTION: setName( string: name ) void
            
            // debug info
            self.debug( 'set name: ' + name );
            // set name value
            $( '#' + self.nameOptions['id'] ).val( name );
            // select text
            $( '#' + self.nameOptions['id'] ).select();
            
        // DONE FUNCTION: setName( string: name ) void
        };
        self.setOriginalFileName = function( originalFileName ){
        // FUNCTION: setOriginalFileName( string: originalFileName ) void
            
            // debug info
            self.debug( 'set originalFileName: ' + originalFileName );
            // set original file name value
            $( '#' + self.originalFileNameOptions['id'] ).val( originalFileName );
            
        // DONE FUNCTION: setOriginalFileName( string: originalFileName ) void
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
            // FUNCTION: addHtml( json: callerOptions ) void
            addHtml : function( callerOptions ){
                // call internal
                self.addHtml( callerOptions );
            },
            // FUNCTION: getName( void ) string: name
            getName : function(){
                // call internal
                return self.getName();
            },
            // FUNCTION: setName( string: name ) void
            setName : function( name ){
                // call internal
                return self.setName( name );
            },
            // FUNCTION: nameSetFocus( void ) void
            nameSetFocus : function( ){
                // call internal
                $( '#' + self.nameOptions['id'] ).focus();
            },
            // FUNCTION: setOriginalFileName( string: originalFileName ) void
            setOriginalFileName : function( originalFileName ){
                // call internal
                return self.setOriginalFileName( originalFileName );
            },
            // FUNCTION: enableInsert( boolean: enable ) void
            enableInsert : function( enable ){
                // call internal
                self.enableInsert( enable );
            },
            // FUNCTION: enableNameUpdate( boolean: enable ) void
            enableNameUpdate : function( enable ){
                // call internal
                self.enableNameUpdate( enable );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: dataModule( void ) void 
})( pleisterman );
// done create module function
