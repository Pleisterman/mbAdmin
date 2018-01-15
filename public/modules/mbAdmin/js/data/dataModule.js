/* 
 *  Project: MbAdmin 
 * 
 *  File: /data/dataModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *       this module controls common data funtions
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
    
    // MODULE: dataModule( void ) 
    
    sharesoft.dataModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'dataModule';                                     // string: MODULE
        self.debugOn = false;                                           // boolean: debug
        self.vatSelectModule = null;                                    // module: vat select
        self.projectSelectModule = null;                                // module: project select
        self.vehicleSelectModule = null;                                // module: vehicle select
        self.documentSelectModule = null;                               // module: document select
        self.dataModules = [];                                          // json: dataModules
        self.loadCount = 0;                                             // integer: load count
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the data modules
            self.addSelectModules();
            
            // add the data modules
            self.addDataModules();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // subscribe to load data
            jsProject.subscribeToEvent( 'loadData', self.loadData );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addSelectModules = function(){
        // FUNCTION: addSelectModules( void ) void

            // create vehicle select module
            self.vatSelectModule = new sharesoft.vatSelectModule(); 
            jsProject.setValue( 'vatSelectModule', 'select', self.vatSelectModule );
            // done create project select module
            
            // create project select module
            self.projectsSelectModule = new sharesoft.projectsSelectModule(); 
            jsProject.setValue( 'projectsSelectModule', 'select', self.projectsSelectModule );
            // done create project select module
            
            // create vehicle select module
            self.vehiclesSelectModule = new sharesoft.vehiclesSelectModule(); 
            jsProject.setValue( 'vehiclesSelectModule', 'select', self.vehiclesSelectModule );
            // done create project select module
            
            // create document select module
            self.documentsSelectModule = new sharesoft.documentsSelectModule(); 
            jsProject.setValue( 'documentsSelectModule', 'select', self.documentsSelectModule );
            // done create project select module
            
        // DONE FUNCTION: addSelectModules( void ) void
        };
        self.addDataModules = function(){
        // FUNCTION: addDataModules( void ) void

            // create the modules in the list order from the options
            var listOrder = sharesoft.options['listOrder']['value'].split( ',' );
            
            // create modules
            for( var i = 0; i < listOrder.length; i++ ){
                switch( listOrder[i] ){
                    case 'vat' : {
                        // create new vehicles module    
                        self.dataModules[i] = new sharesoft.vatModule();
                        // set select module
                        self.dataModules[i].setSelectModule( self.vatSelectModule );
                        // done 
                        break;
                    }
                    case 'projects' : {
                        // create new projects module    
                        self.dataModules[i] = new sharesoft.projectsModule();
                        // set select module
                        self.dataModules[i].setSelectModule( self.projectsSelectModule );
                        // done 
                        break;
                    }
                    case 'contacts' : {
                        // create new contacts mdule    
                        self.dataModules[i] = new sharesoft.contactsModule();
                        // done 
                        break;
                    }
                    case 'vehicles' : {
                        // create new vehicles module    
                        self.dataModules[i] = new sharesoft.vehiclesModule();
                        // set select module
                        self.dataModules[i].setSelectModule( self.vehiclesSelectModule );
                        // done 
                        break;
                    }
                    case 'tasks' : {
                        // create new tasks module    
                        self.dataModules[i] = new sharesoft.tasksModule();
                        // done 
                        break;
                    }
                    case 'costs' : {
                        // create new costs module    
                        self.dataModules[i] = new sharesoft.costsModule();
                        // done 
                        break;
                    }
                    case 'rides' : {
                        // create new rides medule   
                        self.dataModules[i] = new sharesoft.ridesModule();
                        // done 
                        break;
                    }
                    case 'documents' : {
                        // create new documents module    
                        self.dataModules[i] = new sharesoft.documentsModule();
                        // set select module
                        self.dataModules[i].setSelectModule( self.documentsSelectModule );
                        // done 
                        break;
                    }
                    case 'export' : {
                        // create new export module
                        self.dataModules[i] = new sharesoft.exportModule();
                        // done 
                        break;
                    }
                    default : {
                        // debug info   
                        self.debug( 'error list container unknown list ' + listOrder[i] );
                        // log error
                        console.log( 'dataModule addDataModules unknown module: ' + listOrder[i] );
                    }
                }                
            }
            // done create modules
            
        // DONE FUNCTION: addDataModules( void ) void
        };
        self.loadData = function() {
        // FUNCTION: loadData( void ) void
        
            // debug info
            self.debug( 'loadData' );

            // show busy screen
            sharesoft.startBusyProcess();
            
            // create the load count
            self.loadCount = self.dataModules.length;
            // loop over data modules
            for( var i = 0; i < self.dataModules.length; i++ ){
                // call module load function
                self.dataModules[i].load( self.loaded );
            };
            // done loop over data modules

        // DONE FUNCTION: loadData( void ) void
        };
        self.loaded = function() {
        // FUNCTION: loaded( void ) void
        
            // debug info
            self.debug( 'loaded: count: ' + self.loadCount );
            
            // load count -1
            self.loadCount--;
            // check load count 0
            if( self.loadCount === 0 ){
                // all loaded
                self.loadReady();
            }
            // done check load count 0
            
        // DONE FUNCTION: loaded( void ) void
        };
        self.loadReady = function(){
        // FUNCTION: loadReady( void ) void
        
            // debug info
            self.debug( 'load ready' );

            // end busy proces
            sharesoft.endBusyProcess();
            
            // activate tabstops
            jsProject.callEvent( 'activateTabStopsLayer', 'main' );
            // open initial selection
            jsProject.callEvent( 'openInitialSelection' );
            
        // DONE FUNCTION: loadReady( void ) void
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
    // DONE MODULE: dataFunctionsModule( void ) void 
})( sharesoft );
// done create module function
