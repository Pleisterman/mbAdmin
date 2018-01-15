/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/templates/listModule.js
 * 
 *  Last revision: 04-01-2017
 * 
 *  Purpose: 
 *          this module is a template to create a list for a table
 *          the list contains:
 *              header controlled by the listHeaderModule
 *              content:
 *                  selections controlled by the listSelectionsModule      
 *                  rows conrolled by the listRowsModule
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

    // MODULE: listModule( json: listOptions, function: callback ) void 
    
    pleisterman.listModule = function( listOptions, listCallback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listModule';                                     // string: MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.listOptions = listOptions;                                 // json: list options
        self.listCallback = listCallback;                               // function: list callback
        self.header = null;                                             // module: header module
        self.rows = null;                                               // json: rows    
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: list: ' + listOptions['id'] );
            
            // add the list html
            self.addHtml();
            
            // event subscription
            self.addEventSubscriptions();

            // add the modules
            self.addModules();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to lists container layoutChange
            jsProject.subscribeToEvent( 'listsContainerLayoutChange', self.layoutChange );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // create div options
            var divOptions = {
                'id'        :   'list' + self.listOptions['id'],
                'element'   :   'div'
            };
            // done create div options
            
            // add to container
            $( '#listsContainer' ).append( jsProject.jsonToElementHtml( divOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addModules = function(){
        // FUNCTION: addModules( void ) void
            
            // header
            self.header = new pleisterman.listHeaderModule( listOptions, 
                                                                   self.headerCallback );
            // done header
            
            // add the html for the content
            self.addContentHtml();
            
            // add rows
            self.rows = new pleisterman.listRowsModule( self.listOptions, self.rowsCallback );
            // done rows

        // DONE FUNCTION: addModules( void ) void
        };
        self.addContentHtml = function(){
        // FUNCTION: addContentHtml( void ) void
            
            // create div options
            var divOptions = {
                'id'        :   'listContent' + self.listOptions['id'],
                'element'   :   'div',
                'display'   :   'none'
            };
            // done create div options
            
            // add to container
            $( '#list' + listOptions['id'] ).append( jsProject.jsonToElementHtml( divOptions ) );

        // DONE FUNCTION: addContentHtml( void ) void
        };
        self.openContent = function( open ){
        // FUNCTION: openContent( boolean: open ) void
            
            if( open ){
                $( '#listContent' + listOptions['id'] ).show();
            }
            else {
                $( '#listContent' + listOptions['id'] ).hide();
            }

        // DONE FUNCTION: openContent( boolean: open ) void
        };
        self.headerCallback = function( action, id ){
        // FUNCTION: headerCallback( string: action, string: id ) void
            
            self.debug( action );
            switch( action ){
                case 'header' : {
                    $( '#listContent' + listOptions['id'] ).toggle();    
                }
            }
            self.listCallback( action, id );

        // DONE FUNCTION: headerCallback( string: action, string: id ) void
        };
        self.rowsCallback = function( action, id ){
        // FUNCTION: rowsCallback( string: action, string: id ) void
            
            self.debug( 'rowscallback action: ' + action + ' id: ' + id );
            self.listCallback( action, id );

        // DONE FUNCTION: rowsCallback( string: action, string: id ) void
        };
        self.layoutChange = function(){
        // FUNCTION: layoutChange( void ) void
            
            // set the width 
            $( '#list' + listOptions['id'] ).width( $( '#listsContainer' ).width() );
            // set the width 
            
            // refresh rows layout
            self.rows.layoutChange();

        // DONE FUNCTION: layoutChange( void ) void
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
            // FUNCTION: openContent( boolean: open ) void
            openContent : function( open ){
                // call internal openContent
                self.openContent( open );
            },
            // FUNCTION: refreshRows( json: rows ) void
            refreshRows : function( rows ){
                // call internal refreshRows
                self.rows.refreshRows( rows );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: listModule( json: listOptions, function: callback ) void 
})( pleisterman );
// done create module function
