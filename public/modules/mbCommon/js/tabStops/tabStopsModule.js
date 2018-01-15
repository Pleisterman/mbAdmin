/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/tabStops/tabStopsModule.js
 * 
 *  Last revision: 30-12-2016
 * 
 *  Purpose: 
 *          this module handles the tabstops
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

    // MODULE: tabStopsModule( void ) void 
    
    pleisterman.tabStopsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'tabStopsModule';                             // string:  MODULE
        self.debugOn = false;                                       // boolean: debug
        self.layers = {                                             // json: layers
            'error'   :   {                                         // json: error
                'selected'  :   null,                               // json: selected
                'active'    :   false,                              // boolean: active
                'items'     :   []                                  // json: items
            },                                                      // done json: error
            'message'   :   {                                       // json: message
                'selected'  :   null,                               // json: selected
                'active'    :   false,                              // boolean: active
                'items'     :   []                                  // json: items
            },                                                      // done json: message
            'overlay'     :   {                                     // json: overlay
                'selected'  :   null,                               // json: selected
                'active'    :   false,                              // boolean: active
                'items'     :   []                                  // json: items
            },                                                      // done json: overlay    
            'data'      :   {                                       // json: data
                'selected'  :   null,                               // json: selected
                'active'    :   false,                              // boolean: active
                'items'     :   []                                  // json: items
            },                                                      // done json: data    
            'main'      :   {                                       // json: main
                'selected'  :   null,                               // json: selected
                'active'    :   false,                              // boolean: active
                'items'     :   []                                  // json: items    
            }                                                       // done json: main    
        };                                                          // json: layers
        self.activeLayer = null;                                    // json: active layer
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // event subscription
            self.addEventSubscriptions();

            // add the keyboard events
            self.addkeyBoardEvents();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // activate tabstops
            jsProject.subscribeToEvent( 'activateTabStopsLayer', self.activate );
            // deActivate tabstops
            jsProject.subscribeToEvent( 'deActivateTabStopsLayer', self.deActivate );
            // select first tabstops
            jsProject.subscribeToEvent( 'selectFirstTabStop', self.selectFirst );
            // register tabstop
            jsProject.subscribeToEvent( 'registerTabStop', self.register );
            // set tabstop at
            jsProject.subscribeToEvent( 'selectTabStop', self.selectTabStopById );
            // after update
            jsProject.subscribeToEvent( 'afterUpdate', self.afterUpdate );
            // disable tabstop
            jsProject.subscribeToEvent( 'disableTabStop', self.disableTabStop );
            // enable tabstop
            jsProject.subscribeToEvent( 'enableTabStop', self.enableTabStop );
            // unegister tabstops
            jsProject.subscribeToEvent( 'unRegisterTabStops', self.unRegister );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.activate = function( name ){
        // FUNCTION: activate( string: name ) void
            
            // debug info
            self.debug( 'activate layer: ' + name );
            
            // check layer exists
            if( self.layers[name] === undefined ){
                // debug info
                self.debug( 'layer does not exists ' );
                // error return
                return;
            }
            // done check layer exists
            
            // active layer exists
            if( self.activeLayer ){
                // debug info
                self.debug( 'active layer deselect: ' + jsProject.getValue( 'selected', 'tabStops' ) );
                // get index of current selected item
                var currentIndex = self.getCurrentIndex();
                // unset global selected item 
                jsProject.setValue( 'selected', 'tabStops', null );
                // deselect item
                self.deSelectTabStop( currentIndex );
            }
            // done active layer exists
            
            // set new active layer
            self.activeLayer = self.layers[name];
            // remember active
            self.activeLayer['active'] = true;
            // has selected tabstop
            if( self.activeLayer['selected'] ){
                // set global selected item 
                jsProject.setValue( 'selected', 'tabStops', self.activeLayer['selected'] );
                // get current selected item
                var currentIndex = self.getCurrentIndex();
                // deselect item
                self.selectTabStop( currentIndex );
            }
            else {
                // no selection select first
                self.selectFirst();
            }
            // done has selected tabstop
            
        // DONE FUNCTION: activate( string: name ) void
        };
        self.deActivate = function( name ){
        // FUNCTION: deActivate( string: name  ) void
            
            // debug info
            self.debug( 'deActivate: ' + name );
            
            // layer !exists
            if( self.activeLayer !== self.layers[name] ){
                // debug info
                self.debug( 'layer not active current: ' + self.activeLayer['name'] + ' name: ' + name );
                // done with error
                return;
            }
            // done layer !exists
            
            // get index 
            var currentIndex = self.getCurrentIndex();
            // unset global selected item 
            jsProject.setValue( 'selected', 'tabStops', null );
            // deselect item
            self.deSelectTabStop( currentIndex );
            // remember active
            self.activeLayer['active'] = false;
            
            // loop over layers
            var deActivatedLayerFound = false;
            var foundLayertoActivate = false;
            $.each( self.layers, function( index, value ) {
                // is layer to deactivate
                if( index === name ){
                    // lyaer to deactivate found
                    deActivatedLayerFound = true;
                }
                // is layer to deactivate
                
                // if layer to deactivate found and layer active
                if( deActivatedLayerFound && !foundLayertoActivate && value['active'] ){
                    // activate layer
                    self.activate( index );
                    foundLayertoActivate = true;
                }
                // done if layer to deactivate found and layer active
            });
            // done loop over layers
            
        // DONE FUNCTION: deActivate( string: name  ) void
        };
        self.selectFirst = function( ){
        // FUNCTION: selectFirst( void ) void
            
            // debug info
            self.debug( 'selectFirst' );
            
            // active layer !exists orno items
            if( !self.activeLayer || self.activeLayer['items'].length <= 0 ){
                // debug info
                self.debug( 'selectFirst no elements' );
                // error return
                return;
            }
            // done active layer !exists orno items
            
            // get current index
            var currentIndex = self.getCurrentIndex();
            
            // find first not disbaled tabstop
            var firstIndex = -1;
            for( var i = 0; i < self.activeLayer['items'].length; i++ ){
                // check not first found and not disabled
                if(  firstIndex < 0 && !self.activeLayer['items'][i]['disabled'] ){
                    // remember first index
                    firstIndex = i;
                }
                // done check not first found and not disabled
            }
            // done find first not disbaled tabstop
            
            // debug info
            self.debug( 'select first tabstop count: ' + self.activeLayer['items'].length );
            
            if( firstIndex !== self.activeLayer['selected'] ){
                // debug info
                self.debug( 'select first: ' + self.activeLayer['items'][firstIndex]['id'] );
                // unset global selected
                jsProject.setValue( 'selected', 'tabStops', null );
                // deselect selected item                
                self.deSelectTabStop( currentIndex );
                // set global selected
                jsProject.setValue( 'selected', 'tabStops', self.activeLayer['items'][firstIndex]['id'] );
                // select first
                currentIndex = self.getCurrentIndex();
                // debug info
                self.debug( 'currentIndex: ' + currentIndex );
                // select
                self.selectTabStop( currentIndex );
            }
            
        // DONE FUNCTION: selectFirst( void ) void
        };
        self.disableTabStop = function( options ){
        // FUNCTION: disableTabStop( json: options ) void
            
            // debug info
            self.debug( 'disableTabStop layer: ' + options['layer'] + ' id: ' + options['id'] );
            
            // find tabstop
            for( var i = 0; i < self.layers[options['layer']]['items'].length; i++ ){
                // itemId = tbstopId
                if( self.layers[options['layer']]['items'][i]['id'] === options['id'] ){
                    // set disabled
                    self.layers[options['layer']]['items'][i]['disabled'] = true;
                }
                // itemId = tbstopId
            }            
            // done find tabstop
            
        // DONE FUNCTION: disableTabStop( json: options ) void
        };
        self.enableTabStop = function( options ){
        // FUNCTION: enableTabStop( json: options ) void
            
            // debug info
            self.debug( 'enableTabStop layer: ' + options['layer'] + ' id: ' + options['id'] );
            
            // find tabstop
            for( var i = 0; i < self.layers[options['layer']]['items'].length; i++ ){
                // itemId = tbstopId
                if( self.layers[options['layer']]['items'][i]['id'] === options['id'] ){
                    // enable tabstop
                    self.layers[options['layer']]['items'][i]['disabled'] = false;
                }
                // itemId = tbstopId
            }            
            // done find tabstop
            
        // DONE FUNCTION: enableTabStop( json: options ) void
        };
        self.afterUpdate = function( ){
        // FUNCTION: afterUpdate( void ) void
            
            // select current tabstop
            // active layer !exists
            if( !self.activeLayer || self.activeLayer['items'].length <= 0 ){
                // done 
                return;
            }
            // done active layer ! exists
            
            // get current index
            var currentIndex = self.getCurrentIndex();
            // select
            self.selectTabStop( currentIndex );
          
        // DONE FUNCTION: afterUpdate( void ) void
        };
        self.selectTabStopById = function( id ){
        // FUNCTION: selectTabStopById( string: id ) void
            
            // debug info
            self.debug( 'selectTabStop: ' + id );
            
            // already selected
            if( self.activeLayer['selected'] === id ){
                // doen nothing to do
                return;
            }
            // done already selected
                
            // deselect selected
            var currentIndex = self.getCurrentIndex();
            jsProject.setValue( 'selected', 'tabStops', null );
            self.deSelectTabStop( currentIndex );
            // done deselect selected
            
            // debug info
            self.debug( 'setTabStopAt deselect ok' );
            
            // find tabstop
            for( var i = 0; i < self.activeLayer['items'].length; i++ ){
                // itemId = tbstopId
                if( self.activeLayer['items'][i]['id'] === id ){
                    // select tabstop
                    jsProject.setValue( 'selected', 'tabStops', self.activeLayer['items'][i]['id'] );
                    if( self.activeLayer['items'][i]['disabled'] ){
                        // error
                        self.debug( 'error tabstop select is disabled' );
                        // done with error
                        return;
                        
                    }
                    
                    // set global selected
                    jsProject.setValue( 'selected', 'tabStops', id );

                    self.selectTabStop( i );
                    // done select tabstop
                    
                    // done 
                    return;
                }
                // itemId = tbstopId
            }            
            // done find tabstop
            
        // DONE FUNCTION: selectTabStopById( string: id ) void
        };
        self.register  = function( options ){
        // FUNCTION: register( json: options ) void
            
            // debug info
            self.debug( 'registerTabStop: ' + options['id'] );
            
            // layer !exists
            if( self.layers[options['layer']] === undefined ){
                // debug info
                self.debug( 'layer does not exists ' );
                // done with error
                return;
            }
            // done layer !exists

            // add item
            self.layers[options['layer']]['items'].push( options );
            
        // DONE FUNCTION: register( json: options ) void
        };
        self.unRegister  = function( name ){
        // FUNCTION: unRegister( string: name ) void
            
            self.debug( 'unRegister tabstops layer: ' + name );
            
            // layer !exists
            if( !self.getLayerByName( name ) ){
                // debug info
                self.debug( 'layer does not exists.. ' + name );
                // done with error
                return;
            }
            // done layer !exists

            // deactivate layer
            self.deActivate( name );

            // get layer to unregister
            var layer = self.getLayerByName( name );
            
            // remove items
            for( var i = 0; i < layer['items'].length; i++ ){
                // remove keys
                if( layer['items'][i]['keys'] !== undefined ){
                    var keys = layer['items'][i]['keys'];
                    for( var j = 0; j < keys.length; j++ ){
                        layer['items'][i]['keys'][j]['function'] = null;
                        layer['items'][i]['keys'][j] = null;
                    }
                    layer['items'][i]['select'] = null;
                    layer['items'][i]['deSelect'] = null;
                    layer['items'][i] = null;
                }
                // done remove keys
            }
            // done remove items
            
            // remove all tabstop objects
            while(  layer['items'].length > 0 ){
                // remove tabstop object
                layer['items'].pop();
            }
            // done remove all tabstop objects
            
            // unset selected
            layer['selected'] = null;
            
        // DONE FUNCTION: unRegister( string: name ) void
        };
        self.addkeyBoardEvents = function(){
        // FUNCTION: addkeyBoardEvents( void ) void
            
            
            // add key down
            $( document.body ).keydown( function( event ){ self.keyDown( event ); });
            // add key up
            $( document.body ).keyup( function( event ){ self.keyUp( event ); });
            
        // DONE FUNCTION: addkeyBoardEvents( void ) void
        };
        self.keyDown = function( event ){
        // FUNCTION: keyDown( event: event ) void
            
            // active element !exists or no elements
            if( !self.activeLayer || self.activeLayer.length <= 0 ){
                
                // debug info
                self.debug( 'keyDown no activeLayer or no elements' );
                
                // error return
                return;
            }
            // done active element !exists or no elements
            
            // application is busy
            if( pleisterman.isBusy !== undefined && pleisterman.isBusy() ){
                self.debug( 'tabstopsModule app is busy' );
                // done no action
                return;
            }
            // done application is busy
            
            // tab pressed
            if( event.keyCode === pleisterman.getSetting( 'keyCodes')['tab'] ){
                // prevent default
                event.preventDefault();
                // stop propagation
                event.stopPropagation();
                
                // select next tab
                if( event.shiftKey ){
                    // select previous item
                    self.debug( 'previousTab' );
                    self.previousTab();
                }
                else {
                    // select next item
                    self.debug( 'nextTab' );
                    self.nextTab();
                }
            // done tab pressed
            }
            else { // not tab key pressed
                // get selected tabstop
                var selected = jsProject.getValue( 'selected', 'tabStops' );
                // loop over tabstops
                for( var i = 0; i < self.activeLayer['items'].length; i++ ){
                    // has keys
                    if( self.activeLayer['items'][i]['keys'] !== undefined ){
                        // get keys
                        var keys = self.activeLayer['items'][i]['keys'];
                        // loop over keys
                        for( var j = 0; j < keys.length; j++ ){
                            // is pressed key
                            if( keys[j]['keyCode'] === event.keyCode ){
                                // is default key
                                if( keys[j]['type'] === 'default' ){
                                    // stop propagation
                                    event.stopPropagation();
                                    // stop default behavior
                                    event.preventDefault();
                                    // call key event
                                    keys[j]['function']( self.activeLayer['items'][i]['id'] );
                                    // done
                                    return;
                                }
                                else if( selected === self.activeLayer['items'][i]['id'] ){
                                    // stop propagation
                                    event.stopPropagation();
                                    // stop default behavior
                                    event.preventDefault();
                                    // call key event
                                    keys[j]['function']( self.activeLayer['items'][i]['id'] );
                                    // done
                                    return;
                                }
                                // done is default key    
                            }
                            // done is pressed key
                        }
                        // done loop over keys
                    }
                    // done has keys
                }            
                // loop over tabstops
            }
            // done not tab key pressed
            
        // DONE FUNCTION: keyDown( event: event ) void
        };
        self.keyUp = function( event ){
        // FUNCTION: keyUp( event: event ) void
            
            // do nothing
            
        // DONE FUNCTION: keyUp( event: event ) void
        };
        self.previousTab = function( ){
        // FUNCTION: previousTab( void ) void
            
            // has actibve layer
            if( !self.activeLayer || self.activeLayer['items'].length <= 0 ){
                // done no active layer
                return;
            }
            // done has actibve layer

            // get current selection
            var currentIndex = self.getCurrentIndex();
            // unset global selection
            jsProject.setValue( 'selected', 'tabStops', null );
            // de select
            self.deSelectTabStop( currentIndex );
            
            // get previous not disabled index
            var previousIndex = -1;
            // loop from current selection - 1
            for( var i = currentIndex - 1; i >= 0; i-- ){
                // previous and not disabled
                if( previousIndex < 0 && !self.activeLayer['items'][i]['disabled'] ){
                    // remember previous index
                    previousIndex = i;
                }
                // done previous and not disabled
            }
            // done loop from current selection - 1
            
            // no previous found
            if( previousIndex < 0 ){
                // loop from end
                for( var i = self.activeLayer['items'].length - 1; i >= 0; i-- ){
                    // previous and not disabled
                    if( previousIndex < 0 && !self.activeLayer['items'][i]['disabled'] ){
                        // remember previous index
                        previousIndex = i;
                    }
                    // done previous and not disabled
                }
                // done loop from end
            }
            // done get previous not disabled index
            
            // set global selection
            jsProject.setValue( 'selected', 'tabStops',  self.activeLayer['items'][previousIndex]['id'] );
            
            // select
            self.selectTabStop( previousIndex );
            
        // DONE FUNCTION: previousTab( void ) void
        };
        self.nextTab = function( ){
        // FUNCTION: nextTab( void ) void
            
            // has actibve layer
            if( !self.activeLayer || self.activeLayer['items'].length <= 0 ){
                // done no active layer
                return;
            }
            // done has actibve layer

            // get current selection
            var currentIndex = self.getCurrentIndex();
            // unset global selection
            jsProject.setValue( 'selected', 'tabStops', null );
            // de select
            self.deSelectTabStop( currentIndex );

            // get next not disabled index
            var nextIndex = -1;
            // loop from current selection + 1
            for( var i = currentIndex + 1; i < self.activeLayer['items'].length; i++ ){
                // next and not disabled
                if( nextIndex < 0 && !self.activeLayer['items'][i]['disabled'] ){
                    // remember next index
                    nextIndex = i;
                }
                // done next and not disabled
            }
            // done loop from current selection + 1
            
            // no next found
            if( nextIndex < 0 ){
                // loop from start
                for( var i = 0; i < self.activeLayer['items'].length; i++ ){
                    // next and not disabled
                    if( nextIndex < 0 && !self.activeLayer['items'][i]['disabled'] ){
                        // remember next index
                        nextIndex = i;
                    }
                    // done next and not disabled
                }
                // done loop from start
            }
            // done get next not disabled index

            // set global selection
            jsProject.setValue( 'selected', 'tabStops',  self.activeLayer['items'][nextIndex]['id'] );
            
            // select
            self.selectTabStop( nextIndex );
            
        // DONE FUNCTION: nextTab( void ) void
        };
        self.getLayerByName = function( layerName ){
        // FUNCTION: getLayerByName( string: layerName ) json: layer
            
            // create layer object
            var layer = null;
            // loop over layers
            $.each( self.layers, function( index, value ) {
                // is layer name
                if( index === layerName ){
                    // remember layer
                    layer = value;
                }
                // done is layer name
            });
            // loop over layers

            // done 
            return layer;
            
        // DONE FUNCTION: getLayerByName( string: layerName ) json: layer
        };
        self.getCurrentIndex = function( ){
        // FUNCTION: getCurrentIndex( void ) integer: index
            
            // create return value
            var currentIndex = false;
            // get current id
            var selected = jsProject.getValue( 'selected', 'tabStops' );
            // is selected
            if( selected ){
                // loop over tabstops
                for( var i = 0; i < self.activeLayer['items'].length; i++ ){
                    // is selected id
                    if( self.activeLayer['items'][i]['id'] === selected ){
                        // remmeber index
                        currentIndex = i;
                    }
                    // done is selected id
                }
                // done loop over tabstops
            }
            // done is selected
            
            // done 
            return currentIndex;
            
        // DONE getCurrentIndex: construct( void ) integer: index
        };
        self.selectTabStop = function( index ){
        // FUNCTION: selectTabStop( integer: index ) void
            
            // index exists
            if( index !== false ){
                // rememeber selected
                self.activeLayer['selected'] = self.activeLayer['items'][index]['id'];
                // select tabstop
                self.activeLayer['items'][index]['select']( self.activeLayer['items'][index]['id'] );
                // can focus
                if( self.activeLayer['items'][index]['canFocus'] ){
                    // focus
                    $( '#' + self.activeLayer['items'][index]['focusId'] ).focus();
                }
                // done can focus
                
            }
            // done index exists
            
        // DONE FUNCTION: selectTabStop( integer: index ) void
        };
        self.deSelectTabStop = function( index ){
        // FUNCTION: deSelectTabStop( integer: index ) void
            
            // index exists
            if( index !== false ){
                // select tabstop
                self.activeLayer['items'][index]['deSelect']( self.activeLayer['items'][index]['id'] );
                // can focus
                if( self.activeLayer['items'][index]['canFocus'] ){
                    // focus
                    $( '#' + self.activeLayer['items'][index]['focusId'] ).blur();
                }
                // done can focus
            }
            // done index exists
            
        // DONE FUNCTION: deSelectTabStop( integer: index ) void
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
    // DONE MODULE: tabStopsModule( void ) void 
})( pleisterman );
// done create module function
