/* 
 *  Project: MbCommon Admin
 * 
 *  File: /mbCommon/js/templates/dataEditModule.js
 * 
 *  Purpose: 
 *                      
 *  Last Revision: 01-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( sharesoft ){

    // MODULE: dataEditModule( string: contentId ) void
    
    sharesoft.dataEditModule = function( contentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                            // object: self
        self.MODULE = 'dataEditModule';             // string: MODULE
        self.debugOn = false;                       // boolean: debugOn
        self.inputModules = [];                     // json: input modules
        self.mode = '';                             // string: mode 
        self.contentId = contentId;                 // string: element id
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
        
            // add event subscription new
            jsProject.subscribeToEvent( 'editNew', self.new );
            // add event subscription edit open
            jsProject.subscribeToEvent( 'editOpen', self.open );
            // add event subscription edit close
            jsProject.subscribeToEvent( 'editClose', self.close );
            // add event subscription edit set data
            jsProject.subscribeToEvent( 'editSetData', self.setData );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.new = function() {
        // FUNCTION: new( void ) void
        
            // set mode: insert
            self.mode = 'insert';
            // show
            self.show();
            
        // DONE FUNCTION: new( void ) void
        };
        self.open = function() {
        // FUNCTION: open( void ) void
        
            // set mode: edit
            self.mode = 'edit';
            // show
            self.show();
            
        // DONE FUNCTION: open( void ) void
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
            
            // loop over data object, create new modules
            $.each( dataObject, function( index, values ) {
                // switch: type
                switch( values['type'] ){
                    // case: text
                    case 'text' :  {
                        // create text 
                        var input = new sharesoft.dataEditTextModule( self.contentId, values, true );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: textarea
                    case 'textarea' :  {
                        // create text area 
                        var input = new sharesoft.dataEditTextAreaModule( self.contentId, values, true );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: checkbox
                    case 'checkbox' :  {
                        // create checkbox 
                        var input = new sharesoft.dataEditCheckboxModule( self.contentId, values, true );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: button
                    case 'button' :  {
                        // create button 
                        var input = new sharesoft.dataEditButtonModule( self.contentId, values, true );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: date
                    case 'date' :  {
                        // create date 
                        var input = new sharesoft.dataEditDateModule( self.contentId, values, true  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: documents
                    case 'documents' :  {
                        // mode is edit, not used during insert
                        if( self.mode === 'edit' ){    
                            // create documents 
                            var input = new sharesoft.dataEditDocumentsModule( self.contentId, values  );
                            // remember object
                            self.inputModules.push( input );
                        }
                        // done mode is edit, not used during insert
                        
                        // done
                        break;   
                    }
                    // case: color
                    case 'color' :  {
                        // create color
                        var input = new sharesoft.dataEditColorModule( self.contentId, values, true  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: list
                    case 'list' :  {
                        // create list
                        var input = new sharesoft.dataEditListModule( self.contentId, values, true );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: select
                    case 'select' :  {
                        // create select
                        var input = new sharesoft.dataEditSelectModule( self.contentId, values, true  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: imageSelect
                    case 'imageSelect' :  {
                        // create select
                        var input = new sharesoft.dataEditSelectImageModule( self.contentId, values, true  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: spinner
                    case 'spinner' :  {
                        // create spinner
                        var input = new sharesoft.dataEditSpinnerModule( self.contentId, values, true  );
                        // remember object
                        self.inputModules.push( input );
                        // done
                        break;   
                    }
                    // case: image uploader
                    case 'imageUpload' :  {
                        // mode is edit, not used during insert
                        if( self.mode === 'edit' ){    
                            // create documents 
                            var input = new sharesoft.dataEditImageUploadModule( self.contentId, values  );
                            // remember object
                            self.inputModules.push( input );
                        }
                        // done mode is edit, not used during insert
                        
                        // done
                        break;   
                    }
                    // case: linkList
                    case 'linkList' :  {
                        // mode = edit, not used during insert   
                        if( self.mode === 'edit' ){    
                            // create linkList
                            var input = new sharesoft.dataEditLinkListModule( self.contentId, values  );
                            // add linkList
                            self.inputModules.push( input );
                        }                        
                        // done mode = edit, not used during insert    
                        break;   
                    }
                    // case: password strength
                    case 'passwordStrength' :  {
                        // create linkList
                        var input = new sharesoft.dataEditPasswordStrengthModule( self.contentId, values  );
                        // add linkList
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
                        // no action    
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
            // done loop over data object, create new modules

            // call global add edit button tabstops
            jsProject.callEvent( 'addEditButtonsTabstops' );
            
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
                // remove module from array
                self.inputModules.pop();
            }
            // done empty array
            
        // DONE FUNCTION: destructModules( void ) void
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
    // DONE MODULE: dataEditModule( string: contentId ) void
})( sharesoft );
// done create module function
