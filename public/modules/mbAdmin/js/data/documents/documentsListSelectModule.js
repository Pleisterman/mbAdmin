/*
 *  Project: MbAdmin
 *  
 *  File: /mbAdmin/js/data/tasks/documentsListSelectModule.js
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module controls selection of tasks for the list. 
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
    
    // MODULE: documentsListSelectModule( void ) 
    
    sharesoft.documentsListSelectModule = function( callback ) {
    
        // PRIVATE:
        var self = this;                                        // object: self
        self.MODULE = 'documentsListSelectModule';              // string: MODULE
        self.debugOn = false;                                   // boolean: debug
        self.callback = callback;                               // function: callback
        self.listSelectionsOptions = {                          // json: list selection options
            'id'            :   self.id,                        // string: id
            'currentSelection' : 'lastUsed',                    // string: current selection
            'selections'    :   [                               // json: selections
                'lastUsed',                                     // string: lastUsed
                'search'                                        // string: search
            ],                                                  // done json: selections
            'searchText'    :   ''                              // string: searchText
        };                                                      // done json: list selection options
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void    
        };
        self.show = function( selection ) {
        // FUNCTION: show( string: selection ) void
            
            // debug info
            self.debug( 'show' );
            
            // add current selection    
            self.listSelectionsOptions['currentSelection'] = sharesoft.options['documentsListSelection']['value'];
            // show selections  
            sharesoft.showListSelections( selection, self.listSelectionsOptions, self.listSelectionsCallback ); 
            
        // DONE FUNCTION: show( void ) void    
        };
        self.loadList = function( ){
        // FUNCTION: loadList( ) void
            
            // debug info
            self.debug( 'load list ' );
            
            // construct options object
            var options = { 
                'workDirectory'     :   sharesoft.workDirectory,
                'subject'           :   'documents',
                'what'              :   self.listSelectionsOptions['currentSelection'],
                'selection'         :   self.listSelectionsOptions['searchText']
            };
            // done construct options object

            // AJAX: /sharesoft/read
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/read', sharesoft.token, options, self.loadCallback );
        
        // FUNCTION: FUNCTION: loadList( string: listSelection, string: selection, function: callback ) void
        };
        self.loadCallback = function( result ){
        // FUNCTION: loadCallback( json: result ) AJAX CALLBACK
            
            // check critical errors
            if( result['criticalError'] ){
                // show error
                sharesoft.showCriticalError( result['criticalError'] ); // ERROR: criticalError
                // end busy proces
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check critical errors

            for( var i = 0; i< result['rows'].length; i++ ){
                result['rows'][i]['text'] = result['rows'][i]['name'];
                result['rows'][i]['text'] += ' ';
                result['rows'][i]['text'] += sharesoft.translations[result['rows'][i]['subject']];
            }

            // has callback
            if( self.callback ){
                // set projects rows
                self.callback( result['rows'] );
            }
            // done has callback

        // DONE FUNCTION: loadCallback( json: result ) AJAX CALLBACK
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
            loadList : function( ){
            // FUNCTION: loadList( void ) void
                self.loadList( );
            },
            show : function( selection ){
            // FUNCTION: show( string: selection  ) void
                self.show( selection );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: documentsListSelectModule( void ) 
})( sharesoft );
// done create module function
