/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/dataColorPickerModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          displays a colorpicker for a dataEditColorModule
 *          sets caller date and calls a callback on return
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

    // MODULE: dataColorPickerModule( void ) void 
    
    pleisterman.dataColorPickerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataColorPickerModule';                          // string:  MODULE
        self.debugOn = false;                                           // boolean: debug
        self.overlayOptions = {                                         // json: overlay options 
            'id'                    :   'dataEditOverlay'               // string: element id
        };                                                              // done json: overlay options
        self.containerOptions = {                                       // json: container options 
            'id'                    :   self.MODULE + 'Container',      // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'styleWidth'            :   '20.0em',                       // css style width
            'styleHeight'           :   '16.0em',                       // css style height
            'backgroundColor'       :   'rgb(0,0,0 )',                  // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'], // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'groove',                       // css border style
            'borderRadius'          :   '0.2em',                        // css border radius
            'open'                  :   false                           // boolean: open
        };                                                              // done json: container options 
        self.topContainerOptions = {                                    // json: top container options 
            'id'                    :   self.MODULE + 'HexContainer',   // string: element id
            'element'               :   'div',                          // string: html element type 
            'position'              :   'absolute',                     // css position
            'border'                :   false,                          // boolean: has border
            'color'                 :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: color
            'backgroundColor'       :   pleisterman.colors['buttonColor']['color'],           // css color: backgrtound color
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],     // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'styleHeight'           :   '2.0em',                        // css style height
            'marginTop'             :   6,                              // css margin top
            'verticalMargin'        :   6,                              // integer: vartical margin
            'padding'               :   '0.3em',                        // css padding
            'marginLeft'            :   '0.8em'                         // css margin left
        };                                                              // done json: top container options 
        self.hexValueLabelOptions = {                                   // json: hex value options 
            'id'                    :   self.MODULE + 'HexLabel',       // string: element id
            'element'               :   'div',                          // string: html element type 
            'text'                  :   '#',                            // string: text
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'middle',                       // css vertical align
            'padding'               :   '0.2em',                        // css padding
            'marginRight'           :   '0.4em',                        // css margin right
            'lineHeight'            :   '2.0em'                         // css line height
        };                                                              // done json: hex value options 
        self.hexValueInputOptions = {                                   // json: hex value input options 
            'id'                    :   self.MODULE + 'HexInput',       // string: element id
            'element'               :   'input',                        // tring: html element type 
            'type'                  :   'text',                         // string input type
            'display'               :   'inline-block',                 // css display 
            'verticalAlign'         :   'middle',                       // css verical align
            'fontFamily'            :   pleisterman.options['fontFamily']['value'],           // css font family  
            'fontSize'              :   pleisterman.getSetting( 'dataEditInputFontSize' ),    // css font size
            'fontWeight'            :   pleisterman.getSetting( 'dataEditInputFontWeight' ),  // css font weight
            'styleWidth'            :   '8.0em',                        // css style width   
            'styleHeight'           :   '1.4em',                        // css style height
            'padding'               :   '0.2em'                         // rcss padding
        };                                                              // json: hex value input options 
        self.colorSampleOptions = {                                     // json: color sample options 
            'id'                    :   self.MODULE + 'ColorSample',    // string: element id
            'element'               :   'div',                          // string: html element type
            'display'               :   'inline-block',                 // css display 
            'verticalAlign'         :   'middle',                       // css verical align
            'styleWidth'            :   '6.7em',                        // css style width
            'border'                :   true,                           // boolean: has border
            'backgroundColor'       :   '',                             // css color: background color
            'borderColor'           :   'silver',                       // css color: border color
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   '0.1em',                        // css border radius
            'styleHeight'           :   '1.4em',                        // css style height
            'verticalMargin'        :   6,                              // integer: verticxal margin
            'marginLeft'            :   '0.8em',                        // css margin left 
            'padding'               :   '0.2em'                         // css padding
        };                                                              // doen json: color sample options 
        self.valuePanelOptions = {                                      // json: value panel options
            'id'                    :   self.MODULE + 'ValuePanel',     // string: element id
            'element'               :   'canvas',                       // string: html element type
            'canvasSurface'         :   null,                           // html canvas surface object
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   'transaparent',                 // css color: background color
            'highValueColor'        :   'rgb( 0,0,0)',                  // css color: high value color
            'lowValueColor'         :   'rgb( 0,0,0)',                  // css color: low value color
            'cursor'                :   'pointer'                       // css cursor
        };                                                              // done json: value panel options
        self.valueSliderOptions = {                                     // json: value slider options
            'margin'                :   0.1,                            // css margin
            'height'                :   5,                              // interger: height
            'width'                 :   8,                              // integer: width
            'lineWidth'             :   2,                              // integer: line width    
            'position'              :   100,                            // percentage of value height
            'dragging'              :   false,                          // boolean: dragging
            'strokeColor'           :   'silver'                        // css color: stroke color
        };                                                              // done json: value slider options
        self.colorPanelOptions = {                                      // json: color panel options
            'id'                    :   self.MODULE + 'ColorPanel',     // string: element id
            'element'               :   'canvas',                       // string: html element type 
            'canvasSurface'         :   null,                           // html canvas surface object
            'position'              :   'absolute',                     // css position
            'backgroundColor'       :   'rgb(255,255,255)',             // css color: background color
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'], // css color: border color
            'borderWidth'           :   1,                              // css border width
            'borderStyle'           :   'solid',                        // css border style
            'borderRadius'          :   2                               // css border radius
        };                                                              // done json: color panel options           
        self.colorPointerOptions = {                                    // json: color pointer options
            'width'                 :   10,                             // integer: width
            'dragging'              :   false                           // boolean: dragging
        };                                                              // done json: color pointer options
        self.buttonContainerOptions = {                                 // json: button container options
            'id'                    :   self.MODULE + 'ButtonContainer',// string: element id
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   pleisterman.colors['panelHighlightBackgroundColor']['color'], // css color: background color
            'styleHeight'           :   '2.9em',                        // css style height
            'marginTop'             :   '13.0em',                       // css margin top
            'borderTop'             :   true,                           // boolean: has border top
            'borderWidth'           :   '0.1em',                        // relative size
            'borderColor'           :   pleisterman.colors['panelBorderColor']['color'],              // css color: border color
            'borderStyle'           :   'groove'                        // css bordeer style
        };                                                              // doen json: button container options
        self.buttonOptions = {                                          // json: button options
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display 
            'color'                 :   pleisterman.colors['buttonColor']['color'],           // css color: color
            'backgroundColor'       :   pleisterman.colors['buttonBackgroundColor']['color'], // css color: background color
            'fontSize'              :   pleisterman.getSetting( 'buttonFontSize' ),           // css font size
            'fontWeight'            :   pleisterman.getSetting( 'buttonFontWeight' ),         // css font weight
            'padding'               :   pleisterman.getSetting( 'buttonPadding' ),            // css padding
            'minimumWidth'          :   '6.0em',                        // css minimum width
            'marginLeft'            :   '1.5em',                        // css margin left
            'marginBottom'          :   '0.0em',                        // css margin bottom
            'marginTop'             :   '0.4em',                        // css margin top
            'border'                :   true,                           // add border option
            'borderWidth'           :   pleisterman.getSetting( 'buttonBorderWidth' ),        // css border width
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],     // css color: border color    
            'borderStyle'           :   pleisterman.getSetting( 'buttonBorderStyle' ),        // css border style
            'borderRadius'          :   pleisterman.getSetting( 'buttonBorderRadius' ),       // css border radius
            'cursor'                :   'pointer',                      // css cursor            
            'textAlign'             :   'center'                        // css text align
        };                                                              // done json: button options
        self.displayOptions = {                                         // json: display options
            'visible'               :   false,                          // boolean: visible
            'marginLeft'            :   50,                             // integer: margin left 
            'panelSpacing'          :   8,                              // integer: spacing
            'panelPadding'          :   5,                              // integer: padding
            'valuePanelWidth'       :   15,                             // percentage of container width
            'hsv'                   :   null,                           // hsv object { 'h', 's', 'v' }
            'rgb'                   :   null,                           // rgb object { 'r', 'g', 'b' }
            'above' :   {                                               // json: above
                'marginBottom'      :   16                              // integer: margin bottom
            },                                                          // done json: above
            'under' :   {                                               // json: display under    
                'marginTop'         :   14                              // integer: margin top
            }                                                           // done json: under           
        };                                                              // done json: display options
        self.callerOptions = {                                          // json: caller options
            'id'                    :   '',                             // string: id
            'callback'              :   null,                           // function: callback
            'rgb'                   :   null,                           // json: rgb   
            'originalColor'         :   null,                           // css color: original color
            'backgroundColor'       :   ''                              // css color: background color
        };                                                              // done json: calller options
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add show data colorPicker extension
            pleisterman.showDataColorPicker = self.show;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add layout change
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.show = function( id, color, callback ) {
        // FUNCTION: show( string: element id, json: color, function: callback ) void
            
            // debug info
            self.debug( 'show' );
            
            // is open
            if( self.containerOptions['open'] ){
                // done already open
                return;
            }
            // done is open

            // remember open
            self.containerOptions['open'] = true;
            
            // remember caller
            self.callerOptions['id'] = id;
            self.callerOptions['rgb'] = jsProject.stringToRgb( color );
            self.callerOptions['originalColor'] = color;
            self.callerOptions['callback'] = callback;
            // done remember caller

            // set sample color
            self.colorSampleOptions['backgroundColor'] = color;

            // create hsv object
            self.displayOptions['hsv'] = jsProject.rgbToHsv( jsProject.stringToRgb( color ) );
            // create rgb object
            self.displayOptions['rgb'] = jsProject.stringToRgb( color );
            // add item container to content
            $( '#' + self.overlayOptions['id'] ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
            
            // create the color picker
            self.createColorPicker();
            
            // add events
            self.addEvents();

            // show overlay
            $( '#' + self.overlayOptions['id'] ).show();
            // remember visibility
            self.displayOptions['visible'] = true;

            // refresh 
            self.layoutChange();

            // add tabstops
            self.addTabStops();
            
        // DONE FUNCTION: show( string: element id, json: color, function: callback ) void
        };
        self.addTabStops = function(){
        // FUNCTION: addTabStops( void ) void
            
            // add hex value tabstop
            self.addTabStopHexValue();
            // add ok tabstop
            self.addTabStopOk();
            // add cancel tabstop
            self.addTabStopCancel();
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'overlay' );
            
        // DONE FUNCTION: addTabStops( void ) void
        };
        self.addTabStopHexValue = function(){
        // FUNCTION: addTabStopHexValue( void ) void
            
            // create tabstop options hex value
            var tabStopOptions = {
                'id'        :   self.hexValueInputOptions['id'],
                'layer'     :   'overlay',
                'select'    :   self.hexFocusIn,
                'deSelect'  :   self.hexFocusOut,
                'canFocus'  :   true,
                'focusId'   :   self.hexValueInputOptions['id'],
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['enter'],
                        'type'      :   'default',
                        'function'  :   self.chooseColor
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['escape'],
                        'type'      :   'tabStop',
                        'function'  :   self.close
                    }
                ]
            };
            // done create tabstop options hex value
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabStopHexValue( void ) void
        };
        self.addTabStopOk = function(){
        // FUNCTION: addTabStopOk( void ) void
            
            // create button id
            var buttonId = self.MODULE + 'ButtonOk';
            // create tabstop options ok button
            var tabStopOptions = {
                'id'        :   buttonId,
                'layer'     :   'overlay',
                'select'    :   self.buttonMouseIn,
                'deSelect'  :   self.buttonMouseOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.chooseColor
                    }
                ]
            };
            // done create tabstop options ok button
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabStopOk( void ) void
        };
        self.addTabStopCancel = function(){
        // FUNCTION: addTabStopCancel( void ) void
            
            // create button id
            var buttonId = self.MODULE + 'ButtonCancel';
            // create tabstop options cancel button
            var tabStopOptions = {
                'id'        :   buttonId,
                'layer'     :   'overlay',
                'select'    :   self.buttonMouseIn,
                'deSelect'  :   self.buttonMouseOut,
                'canFocus'  :   false,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.close
                    }
                ]
            };
            // done create tabstop options cancel button
            
            // add tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabStopCancel( void ) void
        };
        self.createColorPicker = function(){
        // FUNCTION: createColorPicker( void ) void
            
            // add hex container to content
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.topContainerOptions ) );

            // add hex value
            self.addHexValue();

            // add color sample
            self.addColorSample();
            
            // add item container to content
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.valuePanelOptions ) );
            // set surface object
            self.valuePanelOptions['canvasSurface'] = document.getElementById( self.valuePanelOptions['id'] ).getContext('2d');
            
            // add item container to content
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.colorPanelOptions ) );
            // set surface object
            self.colorPanelOptions['canvasSurface'] = document.getElementById( self.colorPanelOptions['id'] ).getContext('2d');
           
            // add buttons
            self.addButtons();
            
        // DONE FUNCTION: createColorPicker( void ) void
        };
        self.addHexValue = function(){
        // FUNCTION: addHexValue( void ) void
            
            // add hex label to hex container
            $( '#' + self.topContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.hexValueLabelOptions ) );
            // add hex label to hex container
            $( '#' + self.topContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.hexValueInputOptions ) );
            
        // DONE FUNCTION: addHexValue( void ) void
        };
        self.addColorSample = function(){
        // FUNCTION: addColorSample( void ) void
            
            // add hex container to content
            $( '#' + self.topContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.colorSampleOptions ) );
            
        // DONE FUNCTION: addColorSample( void ) void
        };
        self.addButtons = function(){
        // FUNCTION: addButtons( void ) void
            
            // add hex container to content
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonContainerOptions ) );
            
            // add ok button
            self.buttonOptions['id'] = self.MODULE + 'ButtonOk';
            self.buttonOptions['text'] =  pleisterman.translations['ok'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // done add button
            
            // add cancel button
            self.buttonOptions['id'] = self.MODULE + 'ButtonCancel';
            self.buttonOptions['text'] =  pleisterman.translations['cancel'];
            // add button html
            $( '#' + self.buttonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );
            // done add button
            
        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // document click, close picker,  cancel color change
            $( document.body ).click( function( event ){ self.cancel( event ); } );
            
            // container click, prevent closing
            $( '#' + self.containerOptions['id'] ).click( function( event ){ self.containerMouseClick( event ); } );
            // container mouse out, stop draging
            $( '#' + self.containerOptions['id'] ).mouseleave( function( event ){ self.containerMouseOut( event ); } );
            
            // hsv value
            $( '#' + self.valuePanelOptions['id'] ).mousedown( function( event ){ self.valueMouseDown( event ); } );
            $( '#' + self.valuePanelOptions['id'] ).mousemove( function( event ){ self.valueMouseMove( event ); } );
            $( '#' + self.valuePanelOptions['id'] ).click( function( event ){ self.valueMouseClick( event ); } );
            // done hsv value
            
            // color panel
            $( '#' + self.colorPanelOptions['id'] ).mousedown( function( event ){ self.colorMouseDown( event ); } );
            $( '#' + self.colorPanelOptions['id'] ).mousemove( function( event ){ self.colorMouseMove( event ); } );
            $( '#' + self.colorPanelOptions['id'] ).click( function( event ){ self.colorMouseClick( event ); } );
            // done color panel
            
            // hex value
            $( '#' + self.hexValueInputOptions['id'] ).keydown( function( event ){ self.hexChange( event ); } );
            
            // add button events
            self.addButtonEvents();
            
        // DONE FUNCTION: addEvents( void ) void
        };
        self.addButtonEvents = function(){
        // FUNCTION: addButtonEvents( void ) void
            
            // button ok events
            var buttonId = self.MODULE + 'ButtonOk';
            $( '#' + buttonId ).mouseleave( function( event ){ self.buttonMouseOut( buttonId ); });
            $( '#' + buttonId ).mouseenter( function( event ){ self.buttonMouseIn( buttonId ); });
            $( '#' + buttonId ).click( function( event ){ self.ok( event ); });
            // done button ok events
            
            // button cancel events
            var cancelButtonId = self.MODULE + 'ButtonCancel';
            $( '#' + cancelButtonId ).mouseleave( function( event ){ self.buttonMouseOut( cancelButtonId ); });
            $( '#' + cancelButtonId ).mouseenter( function( event ){ self.buttonMouseIn( cancelButtonId ); });
            $( '#' + cancelButtonId ).click( function( event ){ self.cancel( event ); });
            // done button cancel events
            
        // DONE FUNCTION: addButtonEvents( void ) void
        };
        self.removeEvents = function(){
        // FUNCTION: removeEvents( void ) void
            
            // document
            $( document.body ).off( 'click' );
            // container
            $( '#' + self.containerOptions['id'] ).off();
            // value
            $( '#' + self.valuePanelOptions['id'] ).off();
            // color
            $( '#' + self.colorPanelOptions['id'] ).off();
            // hex value
            $( '#' + self.hexValueInputOptions['id'] ).off();
            // button ok events
            var buttonId = self.MODULE + 'ButtonOk';
            $( '#' + buttonId ).off();
            // button cancel events
            var buttonId = self.MODULE + 'ButtonCancel';
            $( '#' + buttonId ).off();
            
        // DONE FUNCTION: removeEvents( void ) void
        };
        self.hexFocusIn = function( ){
        // FUNCTION: hexFocusIn( void ) void
            
            // debug info
            self.debug( 'focus in' );
            // select text
            $( '#' + self.hexValueInputOptions['id'] ).select();
            
        // DONE FUNCTION: hexFocusIn( void ) void
        };
        self.hexFocusOut = function( ){
        // FUNCTION: hexFocusOut( void ) void
            
            // get current value
            var hexValue = $( '#' + self.hexValueInputOptions['id'] ).val();
            // set rgb options
            self.displayOptions['rgb'] = jsProject.hexStringToRgb( hexValue );
            // set hsv options
            self.displayOptions['hsv'] = jsProject.rgbToHsv( self.displayOptions['rgb'] );
            // create rgb string
            var rgb = jsProject.rgbToString( self.displayOptions['rgb'] );
            // set caller background color
            $( '#inputData' + self.callerOptions['id'] ).css( 'background-color', rgb );       
            // refresh layout and colors
            self.layoutChange();
            
        // DONE FUNCTION: hexFocusOut( void ) void
        };
        self.hexChange = function( event ){
        // FUNCTION: hexChange( event: event ) void
            
            // is enter key
            if( event.keyCode !== pleisterman.getSetting( 'keyCodes')['enter'] ){
                // keep default behavior
                return;
            
            }
            // done is enter key

            // stop propagation
            event.stopPropagation();
            // get hex value
            var hexValue = $( '#' + self.hexValueInputOptions['id'] ).val();
            // set rgb options
            self.displayOptions['rgb'] = jsProject.hexStringToRgb( hexValue );
            // set hsv options
            self.displayOptions['hsv'] = jsProject.rgbToHsv( self.displayOptions['rgb'] );
            // create rgb string
            var rgb = jsProject.rgbToString( self.displayOptions['rgb'] );
            // set caller background color
            $( '#inputData' + self.callerOptions['id'] ).css( 'background-color', rgb );       
            // refresh layout and colors
            self.layoutChange();
            
        // DONE FUNCTION: hexChange( event: event ) void
        };
        self.containerMouseClick = function( event ){
        // FUNCTION: containerMouseClick( event: event ) void
            
            // debug info
            self.debug( 'valueMouseDown' );
            // stop propagation
            event.stopPropagation();
            
            // stop dragging
            self.valueSliderOptions['dragging'] = false;        
            self.colorPointerOptions['dragging'] = false;        
            // done stop dragging
            
        // DONE FUNCTION: containerMouseClick( event: event ) void
        };
        self.containerMouseOut = function( event ){
        // FUNCTION: containerMouseOut( event: event ) void
            
            // debug info
            self.debug( 'valueMouseDown' );
            // stop propagation
            event.stopPropagation();

            // stop dragging
            self.valueSliderOptions['dragging'] = false;        
            self.colorPointerOptions['dragging'] = false;        
            // done stop dragging
            
        // DONE FUNCTION: containerMouseOut( event: event ) void
        };
        self.valueMouseDown = function( event ){
        // FUNCTION: valueMouseDown( event: event ) void
            
            // debug info
            self.debug( 'valueMouseDown' );
            // stop propagation
            event.stopPropagation();
            
            // stop dragging color
            self.colorPointerOptions['dragging'] = false;        
            // start dragging value
            self.valueSliderOptions['dragging'] = true;
            
            // update value
            self.updateValue( event );            
            
        // DONE FUNCTION: valueMouseDown( event: event ) void
        };
        self.valueMouseMove = function( event ){
        // FUNCTION: valueMouseMove( event: event ) void
            
            // not dragging
            if( !self.valueSliderOptions['dragging'] ){
                return;
            }
            // done not dragging
            
            // stop propagation
            event.stopPropagation();

            // update value
            self.updateValue( event );            
            
        // DONE FUNCTION: valueMouseMove( event: event ) void
        };
        self.updateValue = function( event ){
        // FUNCTION: updateValue( event: event ) void
            
            // get top postition of mouse
            var top = event.pageY - $('#' + self.valuePanelOptions['id'] ).offset().top;
            // subtract padding
            top -= self.displayOptions['panelPadding'];
            // calculate value
            var value = Math.round( ( top / $('#' + self.valuePanelOptions['id'] ).height() ) * 100 );
            
            // set hsv value
            self.displayOptions['hsv']['v'] = value;
            // set rgb
            self.displayOptions['rgb'] = jsProject.hsvToRgb( self.displayOptions['hsv'] );
            
            // create rgb string
            var rgb = jsProject.rgbToString( self.displayOptions['rgb'] );
            // set caller background color
            $( '#inputData' + self.callerOptions['id'] ).css( 'background-color', rgb );
            
            // refresh 
            self.layoutChange();
            
        // DONE FUNCTION: updateValue( event: event ) void
        };
        self.valueMouseClick = function( event ){
        // FUNCTION: valueMouseClick( event: event ) void
            
            // debug info
            self.debug( 'valueMouseClick' );
            // stop propagation
            event.stopPropagation();
            // stop dragging 
            self.valueSliderOptions['dragging'] = false;        
            self.colorPointerOptions['dragging'] = false;        
            // done stop dragging
            
        // DONE FUNCTION: valueMouseClick( event: event ) void
        };
        self.colorMouseDown = function( event ){
        // FUNCTION: colorMouseDown( event: event ) void
            
            // debug info
            self.debug( 'colorMouseDown' );
            // stop propagation
            event.stopPropagation();
            // stop dragging value
            self.valueSliderOptions['dragging'] = false;        
            // start dragging color
            self.colorPointerOptions['dragging'] = true;
            // update oolor
            self.updateColor( event );
            
        // DONE FUNCTION: colorMouseDown( event: event ) void
        };
        self.colorMouseMove = function( event ){
        // FUNCTION: colorMouseMove( event: event ) void
            
            // not dragging
            if( !self.colorPointerOptions['dragging'] ){
                return;
            }
            // done not dragging
            
            // stop propagation
            event.stopPropagation();
            
            // update oolor
            self.updateColor( event );
            
        // DONE FUNCTION: colorMouseMove( event: event ) void
        };
        self.updateColor = function( event ){
        // FUNCTION: updateColor( event: event ) void
            
            // get top postition of mouse
            var top = event.pageY - $('#' + self.colorPanelOptions['id'] ).offset().top;
            // get left postition of mouse
            var left = event.pageX - $('#' + self.colorPanelOptions['id'] ).offset().left;
            // subtract padding
            top -= self.displayOptions['panelPadding'];
            // calculate hue
            var hue = Math.round( ( left / $('#' + self.colorPanelOptions['id'] ).width() ) * 360 );
            // calculate saturation
            var saturation = Math.round( ( top / $('#' + self.colorPanelOptions['id'] ).height() ) * 100 );
            
            // set hue
            self.displayOptions['hsv']['h'] = hue;
            // set saturation
            self.displayOptions['hsv']['s'] = saturation;
            
            // low value
            if( self.displayOptions['hsv']['v'] < 10 ){
                // set minimum
                self.displayOptions['hsv']['v'] = 20;
            }
            // done low value
            
            // set rgb
            self.displayOptions['rgb'] = jsProject.hsvToRgb( self.displayOptions['hsv'] );
            
            // create rgb string
            var rgb = jsProject.rgbToString( self.displayOptions['rgb'] );
            // set caller background color
            $( '#inputData' + self.callerOptions['id'] ).css( 'background-color', rgb );
            
            // refresh 
            self.layoutChange();
            
        // DONE FUNCTION: updateColor( event: event ) void
        };
        self.colorMouseClick = function( event ){
        // FUNCTION: colorMouseClick( event: event ) void
            
            // debug info
            self.debug( 'colorMouseClick' );
            // stop propagation
            event.stopPropagation();
            // stop dragging
            self.valueSliderOptions['dragging'] = false;        
            self.colorPointerOptions['dragging'] = false;        
            // done stop dragging
            
        // DONE FUNCTION: colorMouseClick( event: event ) void
        };
        self.buttonMouseIn = function( buttonId ){
        // FUNCTION: construct( string: buttonId ) void
            
            // debug info
            self.debug(  'mouseIn:  ' + buttonId );
            // mouse over -> background color, color highlight
            $( '#' + buttonId ).css( 'background-color', pleisterman.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color, color highlight
            $( '#' + buttonId ).css( 'color', pleisterman.colors['buttonHighlightColor']['color'] );
            
        // DONE FUNCTION: construct( string: buttonId ) void
        };
        self.buttonMouseOut = function( buttonId ){
        // FUNCTION: buttonMouseOut( string: buttonId ) void
            
            // debug info
            self.debug(  'mouseOut:  ' + buttonId );
            // is current tabstop
            if( jsProject.getValue( 'selected', 'tabStops' ) === buttonId ){
                // keep selected
                return;
            }
            // done is current tabstop

            // mouse out -> background color, color default
            $( '#' + buttonId ).css( 'background-color', pleisterman.colors['buttonBackgroundColor']['color'] );
            // done mouse out -> color, color default
            $( '#' + buttonId ).css( 'color', pleisterman.colors['buttonColor']['color'] );
            
        // DONE FUNCTION: buttonMouseOut( string: buttonId ) void
        };
        self.ok = function( event ){
        // FUNCTION: ok( event: event ) void
            
            // stop propagation
            event.stopPropagation();
            // choose color
            self.chooseColor();
            
        // DONE FUNCTION: ok( event: event ) void
        };
        self.cancel = function( event ){
        // FUNCTION: cancel( event: event ) void
            
            // stop propagation
            event.stopPropagation();
            // close
            self.close();
            
        // DONE FUNCTION: cancel( event: event ) void
        };
        self.chooseColor = function( ){
        // FUNCTION: chooseColor( void ) void
            
            // debug info
            self.debug( 'closeDataColorPicker' );
            // remove events
            self.removeEvents();
            // stop dragging
            self.colorPointerOptions['dragging'] = false;
            self.valueSliderOptions['dragging'] = false;
            // done stop dragging
            
            // remember close
            self.containerOptions['open'] = false;

            // caller callback
            if( self.callerOptions['callback'] ){
                // color changed
                if( jsProject.rgbIsRgb( self.callerOptions['rgb'], self.displayOptions['rgb'] ) ){
                    // callback color not changed
                    self.callerOptions['callback']( false );
                }
                else {
                    // callback color changed
                    self.callerOptions['callback']( true );
                }
                // done color changed
                
                // reset callback
                self.callerOptions['callback'] = null;
            } 
            // done caller callback
            
            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'overlay' );
       
            // hide
            self.displayOptions['visible'] = false;
            $( '#' + self.overlayOptions['id'] ).html( '' );
            $( '#' + self.overlayOptions['id'] ).hide( );
            // done hide

        // DONE FUNCTION: chooseColor( void ) void
        };
        self.close = function( ){
        // FUNCTION: close( void ) void
            
            // debug info
            self.debug( 'close' );
            // remove events
            self.removeEvents();
            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'overlay' );

            // stop dragging
            self.colorPointerOptions['dragging'] = false;
            self.valueSliderOptions['dragging'] = false;
            // done stop dragging
            
            // remember close
            self.containerOptions['open'] = false;
            
            // caller callback
            if( self.callerOptions['callback'] ){
                // callback color not changed
                self.callerOptions['callback']( false );
                
                // reset callback
                self.callerOptions['callback'] = null;
            } 
            // done caller callback

            // set caller background color
            $( '#inputData' + self.callerOptions['id'] ).css( 'background-color', self.callerOptions['originalColor'] );       

            // hide
            self.displayOptions['visible'] = false;
            $( '#' + self.overlayOptions['id'] ).html( '' );
            $( '#' + self.overlayOptions['id'] ).hide( );
            // done hide

        // DONE FUNCTION: close( void ) void
        };
        self.closeColorPicker = function( event ){
        // FUNCTION: closeColorPicker( event: event ) void
            
            // debug info
            self.debug( 'closeDataColorPicker' );
            // stop propagation
            event.stopPropagation();
            // remove events
            self.removeEvents();

            // unregister tabstops
            jsProject.callEvent( 'unRegisterTabStops', 'overlay' );

            // stop dragging
            self.colorPointerOptions['dragging'] = false;
            self.valueSliderOptions['dragging'] = false;
            // done stop dragging
            
            // remember close
            self.containerOptions['open'] = false;

            // caller callback
            if( self.callerOptions['callback'] ){
                // color changed
                if( jsProject.rgbIsRgb( self.callerOptions['rgb'], self.displayOptions['rgb'] ) ){
                    // callback color not changed
                    self.callerOptions['callback']( false );
                }
                else {
                    // callback color changed
                    self.callerOptions['callback']( true );
                }
                // done color changed
                
                // reset callback
                self.callerOptions['callback'] = null;
            } 
            // done caller callback
            
            // hide
            self.displayOptions['visible'] = false;
            $( '#' + self.overlayOptions['id'] ).html( '' );
            $( '#' + self.overlayOptions['id'] ).hide( );
            // done hide
            
        // DONE FUNCTION: construct( event: event ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // visible
            if( !self.displayOptions['visible'] ){
                // done not visible
                return;
            }
            // done visible

            // refresh container layout
            self.containerLayoutChange();
            
            // refresh value panel layout
            self.valuePanelLayoutChange( );

            // redraw value panel
            self.redrawValuePanel();
            
            // refresh color panel layout
            self.colorPanelLayoutChange( );
            
            // redraw color panel
            self.redrawColorPanel();

            // show hexValue
            self.showHexValue();
            
            // show color sample
            self.showColorSample();
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.containerLayoutChange = function(){
        // FUNCTION: containerLayoutChange( void ) void
            
            // set container width and height
            var colorPickerHeight = $( '#' + self.containerOptions['id'] ).outerHeight(  );
            var colorPickerWidth = $( '#' + self.containerOptions['id'] ).outerWidth( );
            // done set container width and height

            // get caller position
            var position =  jsProject.getElementPosition( 'inputData' + self.callerOptions['id'] );
            var callerHeight = $( '#inputData' + self.callerOptions['id'] ).height();
            
            // get layuot height
            var layoutHeight =  $( '#layout' ).height();

            // caller position > layout height / 2
            if( position['top'] > ( layoutHeight / 2 ) ){
                position['top'] -= colorPickerHeight;
                position['top'] -= self.displayOptions['above']['marginBottom'];
            }
            // caller position < layout height / 2
            else {
                position['top'] += self.displayOptions['under']['marginTop'];
                position['top'] += callerHeight;
            }
            // done caller position < layout height / 2

            // top maximum layout height - date picker height or top 
            position['top'] = Math.min( position['top'], layoutHeight - colorPickerHeight );
            // top minimum 0
            position['top'] = Math.max( position['top'], 0 );
            
            // move position left when caller position is 3 / 4 to the right            
            if( position['left'] > ( $( '#layout').width() / 4 ) * 3 ){
                // left min 1/2 colorPicker
                position['left'] -= colorPickerWidth / 2;
            }
            // done move position left when caller position is 3 / 4 to the right            

            // move position left when conainer left + width > layout width             
            if( position['left'] + colorPickerWidth > $( '#layout').width() ){
                position['left'] -= $( '#layout').width() - colorPickerWidth;
            }
            // done move position left when conainer left + width > layout width             

            // set position
            $( '#' + self.containerOptions['id'] ).css( 'top', position['top'] + 'px' );
            $( '#' + self.containerOptions['id'] ).css( 'left', position['left'] + 'px' );
            // set position
            
        // DONE FUNCTION: containerLayoutChange( void ) void
        };
        self.valuePanelLayoutChange = function(  ){
        // FUNCTION: valuePanelLayoutChange( void ) void
            
            // calculate and set dimensions of value panel
            // get height of color picker
            var height = $( '#' + self.containerOptions['id'] ).height();
            height -= self.topContainerOptions['verticalMargin'];
            height -= $( '#' + self.topContainerOptions['id'] ).outerHeight();
            height -= $( '#' + self.buttonContainerOptions['id'] ).outerHeight();
            // get width of color picker
            var width = $( '#' + self.containerOptions['id'] ).width();
            // subtract padding
            height -= 2 * self.displayOptions['panelPadding']; 
            // set value panel height
            $( '#' + self.valuePanelOptions['id'] ).height( height );
            // set value panel canvas surface height
            self.valuePanelOptions['canvasSurface'].canvas.height = height;
            // calculate percentage container width
            width = ( width / 100 ) * self.displayOptions['valuePanelWidth'];
            // set value panel width
            $( '#' + self.valuePanelOptions['id'] ).width( width );
            // set value panel canvas surface width
            self.valuePanelOptions['canvasSurface'].canvas.width = width;
            // done calculate and set dimensions of value panel

            var top = self.displayOptions['panelPadding'];
            top += $( '#' + self.topContainerOptions['id'] ).outerHeight();
            top += self.topContainerOptions['verticalMargin'];
            // set value panel top
            $( '#' + self.valuePanelOptions['id'] ).css( 'top', top + 'px' );
            // set value panel left
            $( '#' + self.valuePanelOptions['id'] ).css( 'left', self.displayOptions['panelPadding'] + 'px' );
            
        // DONE FUNCTION: valuePanelLayoutChange( void ) void
        };
        self.redrawValuePanel = function(){
        // FUNCTION: redrawValuePanel( void ) void
            
            // get panel width
            var width = $( '#' + self.valuePanelOptions['id'] ).width( );
            // get panel height
            var height = $( '#' + self.valuePanelOptions['id'] ).height( );
            // clear surface
            self.valuePanelOptions['canvasSurface'].clearRect(0, 0, width, height);

            // get start color
            var highValueColor = jsProject.rgbToString( self.displayOptions['rgb'] ); 

            // calculate gradient rect width 
            width -= 2 * self.valueSliderOptions['width'];
            width -= 2 * self.valueSliderOptions['lineWidth'];
            // done calculate gradient rect width 
            
            // set surface gradient
            self.valuePanelOptions['canvasSurface'].fillStyle = 'silver';
            self.valuePanelOptions['canvasSurface'].fillRect( self.valueSliderOptions['width'], 0, width, height );

            // create gradient
            var gradient = self.valuePanelOptions['canvasSurface'].createLinearGradient(0, 0, 0, height);
            gradient.addColorStop( 0, self.valuePanelOptions['lowValueColor'] );
            gradient.addColorStop( 1, highValueColor );
            // done create gradient

            // set surface gradient
            self.valuePanelOptions['canvasSurface'].fillStyle = gradient;
            
            
            // draw gradient
            self.valuePanelOptions['canvasSurface'].fillRect( parseInt( self.valueSliderOptions['width'] ) + 1, 1, width - 2, height - 2 );

            // calculate position of the slider
            self.valueSliderOptions['position'] = ( self.displayOptions['hsv']['v'] / 100 ) * height;            

            // get top
            var top = self.valueSliderOptions['position'];
            // maximum
            top = Math.min( top, height - self.valueSliderOptions['height'] );
            // minimum
            top = Math.max( top, 0 );
            
            // set stroke color
            self.valuePanelOptions['canvasSurface'].strokeStyle = self.valueSliderOptions['strokeColor'];
            // set line width
            self.valuePanelOptions['canvasSurface'].lineWidth = self.valueSliderOptions['lineWidth'];
            // draw slider pointer
            
            // calculate slider width
            var sliderWidth = self.valueSliderOptions['width'] - ( 2 * self.valueSliderOptions['lineWidth'] ); 
            // calculate slider height
            var sliderHeight = self.valueSliderOptions['height'] - ( 2 * self.valueSliderOptions['lineWidth'] );
            // calculate right slider left position
            var left = sliderWidth + width + ( 3 * self.valueSliderOptions['lineWidth'] );
            
            // draw left slider pointer
            self.valuePanelOptions['canvasSurface'].rect( 1, top, sliderWidth, sliderHeight );
            // draw right slider pointer
            self.valuePanelOptions['canvasSurface'].rect( left, top, sliderWidth, sliderHeight );
            // finish drawing
            self.valuePanelOptions['canvasSurface'].stroke();
            
        // DONE FUNCTION: redrawValuePanel( void ) void
        };
        self.colorPanelLayoutChange = function( ){
        // FUNCTION: colorPanelLayoutChange( void ) void
            
            // calculate and set dimensions of color panel
            // get height of color picker
            var height = $( '#' + self.containerOptions['id'] ).height();
            height -= $( '#' + self.topContainerOptions['id'] ).outerHeight();
            height -= self.topContainerOptions['verticalMargin'];
            height -= $( '#' + self.buttonContainerOptions['id'] ).outerHeight();
            
            // get width of color picker
            var width = $( '#' + self.containerOptions['id'] ).width();
            // subtract padding
            height -= 2 * self.displayOptions['panelPadding']; 
            // subtract border
            height -= 2 * self.colorPanelOptions['borderWidth']; 
            // set color panel height
            $( '#' + self.colorPanelOptions['id'] ).height( height );
            
            // set color panel canvas surface height
            self.colorPanelOptions['canvasSurface'].canvas.height = height;
            // subtract value panel width
            var width = width - $( '#' + self.valuePanelOptions['id'] ).width( );
            // subtract spacing
            width -= self.displayOptions['panelSpacing'];
            // subtract padding
            width -= 2 * self.displayOptions['panelPadding']; 
            // subtract border
            width -= 2 * self.colorPanelOptions['borderWidth']; 
            // set color panel width
            $( '#' + self.colorPanelOptions['id'] ).width( width );
            // set color panel canvas surface width
            self.colorPanelOptions['canvasSurface'].canvas.width = width;
            // done calculate and set dimensions of color panel
                        
            // set position of color panel
            var top = self.displayOptions['panelPadding'];
            top += $( '#' + self.topContainerOptions['id'] ).outerHeight();
            top += self.topContainerOptions['verticalMargin'];
            // set value panel top
            $( '#' + self.colorPanelOptions['id'] ).css( 'top', top + 'px' );
            // get value panel width 
            var left = $( '#' + self.valuePanelOptions['id'] ).width( );
            // add padding
            left += self.displayOptions['panelPadding']; 
            // add spacing
            left += self.displayOptions['panelSpacing'];
            // set color panel width
            $( '#' + self.colorPanelOptions['id'] ).css( 'left', left + 'px' );
            // done set position of color panel
    
        // DONE FUNCTION: colorPanelLayoutChange( void ) void
        };
        self.redrawColorPanel = function(){
        // FUNCTION: redrawColorPanel( void ) void
            
            // get color panel width    
            var width = $( '#' + self.colorPanelOptions['id'] ).width( );
            // get color panel height
            var height = $( '#' + self.colorPanelOptions['id'] ).height( );
            // clear canvas surface
            self.colorPanelOptions['canvasSurface'].clearRect( 0, 0, width, height );

            // create horizontal gradient
            var horizontalGradient = self.colorPanelOptions['canvasSurface'].createLinearGradient(0, 0, width, 0);
            horizontalGradient.addColorStop( 0 / 6, '#F00' );
            horizontalGradient.addColorStop( 1 / 6, '#FF0' );
            horizontalGradient.addColorStop( 2 / 6, '#0F0' );
            horizontalGradient.addColorStop( 3 / 6, '#0FF' );
            horizontalGradient.addColorStop( 4 / 6, '#00F' );
            horizontalGradient.addColorStop( 5 / 6, '#F0F' );
            horizontalGradient.addColorStop( 6 / 6, '#F00' );
            // done create horizontal gradient
            
            // set surface gradient
            self.colorPanelOptions['canvasSurface'].fillStyle = horizontalGradient;
            // fill colorpanel with gradient
            self.colorPanelOptions['canvasSurface'].fillRect(0, 0, width, height);
            
            // create vertical gradient
            var verticalGradient = self.colorPanelOptions['canvasSurface'].createLinearGradient(0, 0, 0, height);
            verticalGradient.addColorStop(0, 'rgba(255,255,255,1)');
            verticalGradient.addColorStop(1, 'rgba(255,255,255,0)');
            // done create vertical gradient

            // set canvas surface gradient
            self.colorPanelOptions['canvasSurface'].fillStyle = verticalGradient;
            // fill color panel with gradient
            self.colorPanelOptions['canvasSurface'].fillRect(0, 0, width, height);
            // redraw pointer
            self.redrawColorPanelPointer( width, height );
            
        // DONE FUNCTION: redrawColorPanel( void ) void
        };
        self.redrawColorPanelPointer = function( panelWidth, panelHeight ){
        // FUNCTION: redrawColorPanelPointer( void ) void
            
            // calculate top of pointer
            var top = Math.round( ( self.displayOptions['hsv']['s'] / 100 ) *  ( panelHeight ) - 1 );
            // calculate left of pointer
            var left = Math.round( ( self.displayOptions['hsv']['h'] / 360 ) * ( panelWidth - 1 ) );
            // min 0 + pointer height / 2
            top = Math.max( self.colorPointerOptions['width'] / 2, top );
            // max height - pointer height / 2
            top = Math.min( panelHeight - ( self.colorPointerOptions['width'] / 2 ), top );
            // min 0 + pointer width / 2
            left = Math.max( self.colorPointerOptions['width'] / 2, left );
            // max width - pointer width / 2
            left = Math.min( panelWidth - self.colorPointerOptions['width'], left );

            // draw pointer
            self.colorPanelOptions['canvasSurface'].arc( left, top, self.colorPointerOptions['width'], 0, 2 * Math.PI, false );
            // finish drawing
            self.colorPanelOptions['canvasSurface'].stroke();            
            
        // DONE FUNCTION: redrawColorPanelPointer( void ) void
        };
        self.showHexValue = function(){
        // FUNCTION: showHexValue( void ) void
            
            $( '#' + self.hexValueInputOptions['id'] ).val( jsProject.rgbToHexString( self.displayOptions['rgb'] ) ); 
            
        // DONE FUNCTION: showHexValue( void ) void
        };
        self.showColorSample = function(){
        // FUNCTION: showColorSample( void ) void
            
            $( '#' + self.colorSampleOptions['id'] ).css( 'background-color', jsProject.rgbToString( self.displayOptions['rgb'] ) ); 
            
        // DONE FUNCTION: showColorSample( void ) void
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
    // DONE MODULE: documentUploadModule( void ) void 
})( pleisterman );
// done create module function
