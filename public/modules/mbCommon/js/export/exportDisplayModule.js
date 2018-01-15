/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/export/exportDisplayModule.js
 * 
 * Purpose: 
 *          this module controls diplay of the export data 
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

    // MODULE: exportDisplayModule( string: contentId ) void
    
    pleisterman.exportDisplayModule = function( contentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'exportDisplayModule';                // string: MODULE
        self.debugOn = false;                               // boolean: debug
        self.inputModules = [];                             // json: inputModules
        self.contentId = contentId;                         // string: element id
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // event subscription export open
            jsProject.subscribeToEvent( 'exportOpen', self.show );
            // event subscription display set data
            jsProject.subscribeToEvent( 'displaySetData', self.setData );
            // event subscription export close
            jsProject.subscribeToEvent( 'exportClose', self.close );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.close = function() {
        // FUNCTION: close( void ) void

            // destruct existing modules
            self.destructModules();
            
        // DONE FUNCTION: close( void ) void
        };
        self.show = function() {
        // FUNCTION: show( void ) void

            // destruct existing modules
            self.destructModules();
            
            // empty content
            $( '#' + self.contentId ).html( '' );
            
            // get data object
            var dataObject = jsProject.getValue( 'dataObject', 'data' );    
            
            // create new modules
            $.each( dataObject, function( index, values ) {
                // switch: type
                switch( values['type'] ){
                    // case: text
                    case 'text' :  {
                        // create text 
                        var input = new pleisterman.dataEditTextModule( self.contentId, values, false );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: textarea
                    case 'textarea' :  {
                        // create text area
                        var input = new pleisterman.dataEditTextAreaModule( self.contentId, values, false );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: checkbox
                    case 'checkbox' :  {
                        // create checkbox
                        var input = new pleisterman.dataEditCheckboxModule( self.contentId, values, false );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: date
                    case 'date' :  {
                        // create date    
                        var input = new pleisterman.dataEditDateModule( self.contentId, values, false  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: list
                    case 'list' :  {
                        // create list    
                        var input = new pleisterman.dataEditListModule( self.contentId, values, false );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: select
                    case 'select' :  {
                        // create select    
                        var input = new pleisterman.dataEditSelectModule( self.contentId, values, false  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: spinner
                    case 'spinner' :  {
                        // create spinner    
                        var input = new pleisterman.dataEditSpinnerModule( self.contentId, values, false  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: element
                    case 'element' : {
                        // add element 
                        $( '#' + self.contentId ).append( jsProject.jsonToElementHtml( values['displayOptions'] ) );
                        // done
                        break;   
                    }
                    // case: noDisplay
                    case 'noDisplay' :  {
                        // done
                        break;   
                    }
                    // case: default
                    default : {
                        // debug info
                        self.debug( 'unknown display type' + values['type'] );
                    }
                }
                // done switch: type
            });
            // done create new modules

            // call global add display button tabstops
            jsProject.callEvent( 'addExportButtonsTabstops' );
            
        // DONE FUNCTION: show( void ) void
        };
        self.setData = function(){
        // FUNCTION: setData( void ) void
        
            // loop over modules
            for( var i = 0; i < self.inputModules.length; i++ ){
                // set data input -> dataObject
                self.inputModules[i].setData();
            }
            // done loop over modules
            
        // DONE FUNCTION: setData( void ) void
        };
        self.destructModules = function(){
        // FUNCTION: destructModules( void ) void
        
            // loop over modules
            for( var i = 0; i < self.inputModules.length; i++ ){
                // call module destruct
                self.inputModules[i].destruct();
            }
            // done loop over modules
            
            // empty array
            while( self.inputModules.length > 0 ){
                // remove module
                self.inputModules.pop();
            }
            // done empty array
            
        // DONE FUNCTION: destructModules( void ) void
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
    // DONE MODULE: exportDisplayModule( string: contentId ) void
})( pleisterman );
// done create module function
