/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/main/valuesModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *          this module adds the global values for the pleisterman application
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

    // MODULE: valuesModule( void ) void 
    
    pleisterman.valuesModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'valuesModule';                       // string:  MODULE
        self.debugOn = false;                               // boolean: debug
        self.values = [                                     // json: values
            {                                               // json: navigation menu
                "groupName" :   "navigation",               // string: group name
                "valueName" :   "menu",                     // string: value name
                "value"     :   ""                          // var: value
            },                                              // done json: navigation menu
            {                                               // json: navigation menuName
                "groupName" :   "navigation",               // string: group name
                "valueName" :   "menuName",                 // string: value name
                "value"     :   ""                          // var: value
            },                                              // done json: navigation menuName
            {                                               // json: divider position
                "groupName" :   "divider",                  // string: group name
                "valueName" :   "position",                 // string: value name
                "value"     :   parseInt( pleisterman.options['dividerPosition']['value'] ) // integer: value
            },                                              // done json: divider position
            {                                               // json: divider collapsed
                "groupName" :   "divider",                  // string: group name
                "valueName" :   "collapsed",                // string: value name
                "value"     :   false                       // boolean: value
            },                                              // done json: divider collapsed
            {                                               // json: listOrderUp listId
                "groupName" :   "listOrderUp",              // string: group name
                "valueName" :   "listId",                   // string: value name
                "value"     :   null                        // string: value
            },                                              // done json: listOrderUp listId
            {                                               // json: tabStops selected
                "groupName" :   "tabStops",                 // string: group name
                "valueName" :   "selected",                 // string: value name    
                "value"     :   null                        // string: value
            },                                              // done json: tabStops selected
            {                                               // json: edit messageId
                "groupName" :   "edit",                     // string: group name
                "valueName" :   "messageId",                // string: value name
                "value"     :   null                        // string: value
            },                                              // done json: edit messageId
            {                                               // json: data dataObject
                "groupName" :   "data",                     // string: group name
                "valueName" :   "dataObject",               // string: value name
                "value"     :   null                        // json: value
            },                                              // done json: data dataObject
            {                                               // json: data id
                "groupName" :   "data",                     // string: group name
                "valueName" :   "id",                       // string: value name
                "value"     :   null                        // string: id
            },                                              // done json: data id
            {                                               // json: data headerText
                "groupName" :   "data",                     // string: group name
                "valueName" :   "headerText",               // string: value name
                "value"     :   null                        // string: value
            },                                              // done json: data headerText        
            {                                               // json: edit changed     
                "groupName" :   "data",                     // string: group name
                "valueName" :   "changed",                  // string: value name
                "value"     :   false                       // string: value
            },                                              // done json: data changed
            {                                               // json: data hasFocus
                "groupName" :   "data",                     // string: group name
                "valueName" :   "hasFocus",                 // string: value name
                "value"     :   false                       // string: value
            },                                              // done json: data hasFocus
            {                                               // json: data hasError
                "groupName" :   "data",                     // string: group name
                "valueName" :   "hasError",                 // string: value name
                "value"     :   false                       // boolean: value
            },                                              // done jon: data hasError
            {                                               // json: select vatSelectModule
                "groupName" :   "select",                   // string: group name
                "valueName" :   "vatSelectModule",          // string: value name
                "value"     :   null                        // module: value
            },                                              // done json: select vatSelectModule
            {                                               // json: select taxSelectModule
                "groupName" :   "select",                   // string: group name
                "valueName" :   "projectsSelectModule",     // string: value name
                "value"     :   null                        // module: value
            },                                              // done json: select projectsSelectModule
            {                                               // json: select vehiclesSelectModule
                "groupName" :   "select",                   // string: group name
                "valueName" :   "vehiclesSelectModule",     // string: value name
                "value"     :   null                        // module: value
            },                                              // done json: select vehiclesSelectModule
            {                                               // json: select documentsSelectModule
                "groupName" :   "select",                   // string: group name
                "valueName" :   "documentsSelectModule",    // string: value name
                "value"     :   null                        // module: value
            }                                               // done json: select documentsSelectModule
        ];                                                  // done json: values    
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            // add values
            self.addValues();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addValues = function() {
        // FUNCTION addValues( void ) void
        
            // debug info
            self.debug( 'addValues' );

            // loop over values
            for( var i = 0; i < self.values.length; i++ ) {
                // add the value to the jsProject
                jsProject.addValue( self.values[i]["valueName"], self.values[i]["groupName"], self.values[i]["value"] );
            }
            // done loop over values
            
        // DONE FUNCTION: addValues( void ) void
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
    // DONE MODULE: valuesModule( void ) void 
})( pleisterman );
// done create module function
