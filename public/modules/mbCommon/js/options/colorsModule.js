/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/options/colorsModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *      this module controls the colors 
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: colorsModule( void ) void
    
    pleisterman.colorsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'colorsModule';                       // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.id = 'colors';                                 // string: id
        self.colorNamesCashed = false;                      // boolean: colorNamesCashed
        self.dataObject = [                                 // json: data object
            {                                               // json: colorScheme
                'id'                    :   'colorScheme',  // string: id
                'type'                  :   'select',       // string: type
                'displayOptions'        :   {               // json: display options
                    'label'             :   {               // json: label
                        'text'          :   pleisterman.translations['colorScheme'] // string: label TRANSLATION: colorScheme
                    },                                      // done json: label
                    'input'             :       {           // json: input
                        'styleWidth'    :   '10.0em'        // css width
                    }                                       // done json: input
                },                                          // done json: display options
                'value'                 :   null,           // integer: colorSchemeId
                'selectModule'          :   null,           // module: select module
                'selectImageId'         :   'projects',     // string: IMAGE: select projects
                'selectOption'          :   'colorSchemesLastSelection', // integer: OPTION: colorSchemesLastSelection
                'width'                 :   140,            // css width
                'height'                :   140,            // css height
                'defaultValue'          :   null,           // integer: default value
                'getSelectionFunction'  :   null            // function: getSelectionFunction    
            },                                              // done json: colorScheme
            {                                               // json: colorSchemeSelectButton
                'id'                    :   'colorSchemeSelectButton', // string: id
                'type'                  :   'button',       // string: type
                'displayOptions'        :   {               // json: display options
                    'input'             :   {               // json: input
                        'styleWidth'    :   '10.0em'        // css style width
                    }                                       // done json: input
                },                                          // done json: display options
                'value'                 :  pleisterman.translations['selectScheme'], 
                'callback'              :  null             // function: callback    
            },                                              // done json: colorSchemeSelectButton
            {                                               // json: colorSchemeSaveButton
                'id'                    :   'colorSchemeSaveButton',    // string: id
                'type'                  :   'button',       // string: type
                'displayOptions'        :   {               // json: display options
                    'input' :   {                           // json: input
                        'styleWidth'    :   '10.0em'        // css style width
                    }                                       // done json: input
                },                                          // done json: display options
                'value'         :  pleisterman.translations['saveScheme'],
                'callback'      :  null                     // function: callback
            }                                               // done json: colorSchemeSaveButton
        ];                                                  // done json: dataObject
        self.colorSchemeSelect = null;                      // module: color scheme select
        self.contentScrollPosition = 0;                     // integer: content scroll position
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );

            // add colorScheme select module
            self.addColorSchemeSelect();

            // add colorSchemeButton callback select module
            self.addColorSchemeButtonCallback();

            // add colors
            self.addColors();

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
        self.addColors = function(){
        // FUNCTION: addColors( void ) void
        
            // create first char
            var firstChar = null;
            
            // loop over colors
            $.each( pleisterman.colors, function( index, colorRow ) {
                // color can change
                if( colorRow['canChange'] !== 'false' ){
                    
                    // not first char
                    if( !firstChar  ){
                        firstChar = colorRow['name'].substring( 0, 1 );
                    }
                    else {
                        // firat char ! first char color name
                        if( firstChar !== colorRow['name'].substring( 0, 1 ) ){
                            // set first char
                            firstChar = colorRow['name'].substring( 0, 1 );
                            
                            // create separator data
                            var data = {
                                'type'          :   'element',
                                'displayOptions'    :   {
                                    'element'       :   'div',
                                    'display'       :   'block',
                                    'float'         :   'left',
                                    'clear'         :   'both',
                                    'borderTop'     :   true,
                                    'borderWidth'   :   2,
                                    'borderStyle'   :   'solid',
                                    'borderColor'   :   'grey',
                                    'styleHeight'   :   30,
                                    'marginLeft'    :   '5%',
                                    'marginTop'     :   20,
                                    'styleWidth'    :   '90%',
                                    'text'          :   '&nbsp;'
                                }      
                            };
                            // done create separator data
                            
                            // add to data object
                            self.dataObject.push( data );
                        }
                    }
                    // done not first char

                    // create color data
                    var data = {
                        'id'                    :   colorRow['id'],
                        'name'                  :   colorRow['name'],
                        'type'                  :   'color',
                        'displayOptions'    :   {
                            'label'             :   {
                                'paddingLeft'       :   10,
                                'text'              :   colorRow['translation'],
                                'widthInLetters'    :   18
                            },
                            'item'              :   {
                                'position'          :   'relative',
                                'backgroundColor'   :   'rgba(128,128,128,0.1)',
                                'border'            :   true,
                                'borderRadius'      :   '0.1em',
                                'borderWidth'       :   0,
                                'padding'           :   '0.4em',
                                'paddingBottom'     :   '0.8em'
                            },
                            'input'     :   {
                                'styleWidth'        :   '10.0em'                                
                            }             
                            
                        },
                        'value'                 :   colorRow['color'],
                        'defaultValue'          :    ''
                    };
                    // done create color data
                    
                    // add to data object
                    self.dataObject.push( data );
                }
                // done color can change
            });
            // done loop over colors
            
        // DONE FUNCTION: addColors( void ) void
        };
        self.addColorSchemeSelect = function(){
        // FUNCTION: addColorSchemeSelect( void ) void
            
            // create the select module
            self.colorSchemeSelect = new pleisterman.colorSchemeSelectModule();
            
            // find object in data object
            $.each( self.dataObject, function( objectIndex, objectValue ) {
                // colorScheme object found
                if( objectValue['id'] === 'colorScheme' ){
                    // set select module value 
                    objectValue['selectModule'] = self.colorSchemeSelect;
                }
                // done colorScheme object found
            });
            // done find object in data object
            
        // DONE FUNCTION: addColorSchemeSelect( void ) void
        };
        self.addColorSchemeButtonCallback = function(){
        // FUNCTION: addColorSchemeButtonCallback( void ) void
            
            // find object in data object
            $.each( self.dataObject, function( objectIndex, objectValue ) {
                // colorSchemeSelectButton object found
                if( objectValue['id'] === 'colorSchemeSelectButton' ){
                    // set select module value 
                    objectValue['callback'] = self.selectColorScheme;
                }
                // done colorSchemeSelectButton object found
                 
                // colorSchemeSaveButton object found
                if( objectValue['id'] === 'colorSchemeSaveButton' ){
                    // set select module value 
                    objectValue['callback'] = self.saveColorScheme;
                }
                // done colorSchemeSaveButton object found
            });
            // done find object in data object
            
        // DONE FUNCTION: addColorSchemeButtonCallback( void ) void
        };
        self.selectColorScheme = function(  ){
        // FUNCTION: selectColorScheme( void ) void
            
            // debug info
            self.debug( 'selectColorScheme' );
        
            // show busy screen
            pleisterman.startBusyProcess();

            var id = null;
            // find object in data object
            $.each( self.dataObject, function( objectIndex, objectValue ) {
                // projectId object found
                if( objectValue['id'] === 'colorScheme' ){
                    // set select module value 
                    id = objectValue['getSelectionFunction']();
                }
                // done colorScheme object found
            });
            // done find object in data object

            // get colors
            self.colorSchemeSelect.getSchemeColors( id, self.getSchemeColorsCallback );
            
        // DONE FUNCTION: selectColorScheme( void ) void
        };
        self.getSchemeColorsCallback = function( colors ){
        // FUNCTION: getSchemeColorsCallback( json: colors ) void
            
            // debug info
            self.debug( 'getSchemeColorsCallback' );
            
            // create values
            var values = Array();
            // loop over colors
            $.each( colors, function( index, data ) {            
                // create color
                var color = {
                    'id'    :   data['colorId'],
                    'value' :   data['color']
                };
                // done create color
                
                // add to values
                values.push( color );
                
                // loop over data object
                $.each( self.dataObject, function( dataObjectIndex, dataObjectData ) {  
                    // is type color and data object id is color id
                    if( dataObjectData['type'] === 'color' && dataObjectData['id'] === data['colorId'] ){
                        // set color value
                        dataObjectData['value'] = data['color'];
                    }
                    // done is type color and data object id is color id
                });
                // done loop over data object
            });
            // done loop over colors
                
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'colors',
                'what'              :   'list',
                'values'            :   values 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.updateCallback );
            
        // DONE FUNCTION: getSchemeColorsCallback( json: colors ) void
        };
        self.saveColorScheme = function(  ){
        // FUNCTION: saveColorScheme( void ) void
            
            // debug info
            self.debug( 'saveColorScheme' );
            // start busy
            pleisterman.startBusyProcess();
            
            // get the data from the inputs
            jsProject.callEvent( 'editSetData' );
            
            // crate values
            var values = Array();
            // loop over dataobject
            $.each( self.dataObject, function( index, data ) {            
                // type is color
                if( data['type'] === 'color' ){
                    // create color
                    var color = {
                        'id'    :   data['id'],
                        'value' :   data['value']
                    };
                    // done create color
                    
                    // add to values
                    values.push( color );
                }
                // type is color
            });
            // done loop over dataobject
                
            var id = null;
            // find object in data object
            $.each( self.dataObject, function( objectIndex, objectValue ) {
                // projectId object found
                if( objectValue['id'] === 'colorScheme' ){
                    // set select module value 
                    id = objectValue['getSelectionFunction']();
                }
                // done colorScheme object found
            });
            // done find object in data object
            
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'colorSchemes',
                'what'              :   'colors',
                'values'            :   values,
                'id'                :   id
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.saveColorSchemeCallback );
            
        // DONE FUNCTION: saveColorScheme( void ) void
        };
        self.saveColorSchemeCallback = function( result ){
        // FUNCTION: saveColorSchemeCallback( json: result ) void
            
            // check for errors
            if( self.hasAjaxResultErrors( result ) ){
                // end busy
                pleisterman.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors

            // end busy
            pleisterman.endBusyProcess();

            // show update message    
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );
            
        // DONE FUNCTION: saveColorSchemeCallback( json: result ) void
        };
        self.openInitialSelection = function(){
        // FUNCTION: openInitialSelection( void ) void
            
            // show font if selected
            if( pleisterman.options['openSubject']['value'] === self.id ){
                // show
                self.colorSchemeSelect.load( self.show );
            }
            // done show font if selected
            
        // DONE FUNCTION: openInitialSelection( void ) void
        };
        self.prepareShow = function() {
        // FUNCTION: prepareShow( void ) void
            
            // debug info
            self.debug( 'prepareShow' );  
            
            // call global prepare data show
            pleisterman.prepareDataShow( self.colorSchemeSelect.load, self.show );
            
        // DONE FUNCTION: prepareShow( void ) void
        };
        self.show = function(){
        // FUNCTION: show( void ) void
            
            // debug info
            self.debug( 'show' );
            
            // cancel events
            jsProject.callEvent( 'cancel' );

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
            
            // set croll top
            $( '#dataContent' ).scrollTop( self.contentScrollPosition );
            // unset scroll position
            self.contentScrollPosition = 0;
            
        // DONE FUNCTION: show( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
            
            // nothing changed
            if( !jsProject.getValue( 'changed', 'data' ) ){
                // show message nothing changed
                jsProject.callEvent( 'showEditMessage', 'nothingChanged' );
                // done
                return;
            }    
            // done nothing changed

            // debug info
            self.debug( 'update' );
            // start busy   
            pleisterman.startBusyProcess();
            
            // get the data from the inputs
            jsProject.callEvent( 'editSetData' );
            
            // create values
            var values = Array();
            // loop over dataobject
            $.each( self.dataObject, function( index, data ) {            
                // is type color
                if( data['type'] === 'color' ){
                    // create json: color
                    var color = {
                        'id'    :   data['id'],
                        'value' :   data['value']
                    };
                    // done create json: color
                    
                    // add to values
                    values.push( color );
                }
                // done is type color
            });
            // loop over dataobject
                
            // construct data object
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :  'colors',
                'what'              :  'list',
                'values'            :  values 
            };
            // done construct data object
             
            // make the ajax call
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/update', pleisterman.token, data, self.updateCallback );
            
        // DONE FUNCTION: update( void ) void
        };
        self.updateCallback = function( result ){
        // FUNCTION: updateCallback( json: result ) void
            
            // check for errors
            if( self.hasAjaxResultErrors( result ) ){
                // end busy
                pleisterman.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors

            // show data updated message
            jsProject.callEvent( 'showEditMessage', 'dataUpdated' );
            
            // set data unchanged
            jsProject.setValue( 'changed', 'data', false );    
            
            // loop over dataObjec
            $.each( self.dataObject, function( index, data ) {  
                // is color
                if( data['value'] !== undefined && data['type'] === 'color' ){
                    // set value
                    pleisterman.colors[data['name']]['color'] = data['value'];
                }
                // done is color
            });
            // done loop over dataObjec
            
            // call update colors event
            jsProject.callEvent( 'updateColors' );

            // end busy proces
            pleisterman.endBusyProcess();
            
            // get scroll position
            self.contentScrollPosition = $( '#dataContent' ).scrollTop();
            // show data
            self.show();
            
        // DONE FUNCTION: updateCallback( json: result ) void
        };        
        self.cancelUpdate = function( ){
        // FUNCTION: cancelUpdate( void ) void
            
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
        self.hasAjaxResultErrors = function( result ){
        // FUNCTION: hasAjaxResultErrors( json: result ) boolean
        
            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // done with error
                return true;
            }
            // done global check result
             
            // check errors
            if( result['error'] ){
                // debug info
                self.debug( result['error'] );
                
                // show error message
                jsProject.callEvent( 'showEditError', result['error'] );

                // done with error
                return true;
           }
            // done check errors
          
            // done 
            return false;
            
        // DONE FUNCTION: hasAjaxResultErrors( json: result ) boolean
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
    // DONE MODULE: colorsModule( void ) void 
})( pleisterman );
// done create module function
