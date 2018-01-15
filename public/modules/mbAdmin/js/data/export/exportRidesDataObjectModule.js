/* 
 *  Project: MbAdmin
 * 
 *  File: /mbAdmin/js/data/export/exportRidesDataObjectModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *      this module controls dataObject for rides for the export
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function( pleisterman ){

    // MODULE: exportRidesDataObjectModule( module: delimiterSelectModule, module: exportRidesTotalsSelectModule ) void
    
    pleisterman.exportRidesDataObjectModule = function( delimiterSelectModule, exportRidesTotalsSelectModule ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                // object: self
        self.MODULE = 'exportRidesDataObjectModule';    // string: MODULE
        self.debugOn = false;                           // boolean: debug
        self.dataObject = [                             // json: dataObject
            {                                           // json: from
                'id'                :   'from',         // string: id
                'type'              :   'date',         // string: display type
                'displayOptions'    :   {               // json: display options
                    'label'             :   {           // json: label
                        'text'          :   pleisterman.translations['from'] // string: TRANSLATION: from
                    }                                   // done json: label
                },                                      // done json: display options
                'optional'          :   false,          // boolean: optional
                'value'             :   ''              // date: value
            },                                          // done json: from
            {                                           // json: till
                'id'                :   'till',         // string: id
                'type'              :   'date',         // string: display type
                'displayOptions'    :   {               // json: display options
                    'label'             :   {           // json: label
                        'text'          :   pleisterman.translations['till'] // string: TRANSLATION: till
                    }                                   // done json: label
                },                                      // done json: display options
                'optional'      :   false,              // boolean: optional
                'value'         :   ''                  // date: value    
            },                                          // done json: till
            {                                           // json: delimiter
                'id'                :   'delimiter',    // string: id
                'type'              :   'select',       // string: display type
                'displayOptions'    :   {               // json: display options
                    'label'             :   {           // json: label
                        'text'          :   pleisterman.translations['delimiter'] // string: TRANSLATION: delimiter
                    }                                   // done json: label
                },                                      // done json: display options
                'value'             :   'comma',        // string: value
                'selectModule'      :   delimiterSelectModule,      // module: delimiterSelectModule
                'selectImageId'     :   'projects',                 // string: IMAGE: projects   
                'selectOption'      :   'delimiterLastSelection'    // string: OPTION: delimiterLastSelection
            },                                          // done json: delimiter
            {                                           // json: addHeaders
                'id'            :   'addHeaders',       // string: id
                'type'          :   'checkbox',         // string: display type
                'displayOptions'    :   {               // json: display options
                    'label'             :   {           // json: label
                        'text'          :   pleisterman.translations['AddExportHeaders'] // string: TRANSLATION: AddExportHeaders
                    }                                   // done json: label
                },                                      // done json: display options
                'value'             :   pleisterman.options['exportRidesAddHeaders']['value'], // string: OPTION: exportRidesAddHeaders
                'changeFunction'    :  null             // function: change function
            },                                          // done json: addHeaders
            {                                           // json: addTotals
                'id'            :   'addTotals',        // string: id
                'type'          :   'select',           // string: display type
                'displayOptions'    :   {               // json: display options
                    'label'             :   {           // djson: label
                        'text'          :   pleisterman.translations['addTotals'] // string: TRANSLATION: addTotals
                    }                                   // done json: label
                },                                      // done json: display options
                'value'         :   'comma',            // string: value
                'selectModule'        :   exportRidesTotalsSelectModule,    // module: exportRidesTotalsSelectModule
                'selectImageId'     :   'projects',                         // string: IMAGE: projects
                'selectOption'      :   'exportRidesTotalsLastSelection'    // string: OPTION: exportRidesTotalsLastSelection
            }                                           // done json: addTotals
        ];                                              // done json: dataObject
        self.callerOptions = {                          // json: caller options
            'callback'    :   null                      // function: callback
        };                                              // done json: caller options
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // get today date
            var date = jsProject.getTodayDbDate( );
            
            // loop over data object
            $.each( self.dataObject, function( objectIndex, objectValue ) {
                // id = from
                if( objectValue['id'] === 'from' ){
                    // set from value 
                    objectValue['value'] = date;
                }
                // done id = from

                // id = till
                if( objectValue['id'] === 'till' ){
                    // set to value 
                    objectValue['value'] = date;
                }
                // done id = till
                
                // id = addHeaders
                if( objectValue['id'] === 'addHeaders' ){
                    // set from value 
                    objectValue['changeFunction'] = self.changeHeaderOption;
                }
                // done id = addHeaders
                
            });
            // done loop over data object 
                        
        // DONE FUNCTION: construct( void ) void    
        };
        self.export = function( exportType, callback ) {
        // FUNCTION: export( string: exportType, function: callback ) void

            // debug info
            self.debug( 'rides export type: ' + exportType );
            
            // remember callback
            self.callerOptions['callback'] = callback;
            
            // show busy screen
            pleisterman.startBusyProcess();

            // get data from display
            jsProject.callEvent( 'displaySetData' );
            
            // create json: selection
            var selection = {
                'languageId'    : pleisterman.selectedLanguageId
            };
            // done create json: selection
            
            // loop over dataObject
            $.each( self.dataObject, function( index, value ) {
                // id = delimiter
                if( value['id'] === 'delimiter' ){
                    // get delimiter value
                    var delimiter = value['selectModule'].getValue( value['value'] );
                    // set delimiter selection
                    selection[value['id']] = value['selectModule'].getValue( value['value'] );
                }
                else {
                    // set selection
                    selection[value['id']] = value['value'];
                }
                // done id = delimiter
            });
            // done loop over dataObject
            
            // construct jaon: data
            var data = { 
                'workDirectory'     :   pleisterman.workDirectory,
                'subject'           :   'rides',
                'what'              :   'exportPeriodList',
                'exportType'        :   exportType,
                'selection'         :   selection 
            };
            // done construct jaon: data
             
            // AJAX: /pleisterman/export
            jsProject.securePost( '/' + pleisterman.baseDirectory + '/export', pleisterman.token, data, self.exportCallback );
            
        // DONE FUNCTION: export( string: exportType, function: callback ) void
        };
        self.exportCallback = function( result ){
        // FUNCTION: exportCallback( json: result ) void
        
            // check for errors
            if( self.hasCallbackErrors( result ) ){
                // end busy
                pleisterman.endBusyProcess();
                // done with error
                return;
            }
            // done check for errors
        
            // hide busy screen
            pleisterman.endBusyProcess();
            
            // call callback
            self.callerOptions['callback']( result );
        
        // DONE FUNCTION: exportCallback( json: result ) void
        };
        self.hasCallbackErrors = function( result ){
        // FUNCTION: hasCallbackErrors( json: result ) boolean
            
            // global check result
            if( pleisterman.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
             
            // check errors
            if( result['error'] ){

                // debug info
                self.debug( result['error'] );
          
                // show error
                jsProject.callEvent( 'showExportMessage', result['error'] );
                
                // done with error
                return true;
            }
            // done check errors
          
            // done 
            return false;
        };
        self.changeHeaderOption = function( value ){
        // FUNCTION: changeHeaderOption( string: value ) void
            
            // set option
            pleisterman.setOption( 'exportRidesAddHeaders', value );
            
        // DONE FUNCTION: changeHeaderOption( string: value ) void
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
            getDataObject : function(){
            // FUNCTION: getDataObject( void ) json: data object
                return self.dataObject;
            },        
            export : function( exportType, callback ){
            // FUNCTION: export( string: exportType, function: callback ) void
                self.export( exportType, callback );
            }         
        };
        // DONE PUBLIC
    };
    // DONE MODULE: exportRidesDataObjectModule( module: delimiterSelectModule, module: exportRidesTotalsSelectModule ) void
})( pleisterman );
// done create module function
