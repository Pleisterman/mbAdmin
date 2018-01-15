/* 
 *  Project: MbCommon
 * 
 *  File: /mbCommon/js/templates/dataLabelModule.js
 * 
 *  Purpose: 
 *          creates a data label            
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

    // MODULE: dataLabelModule( void ) void
    
    sharesoft.dataLabelModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object: self
        self.MODULE = 'dataLabelModule';                            // string: MODULE
        self.debugOn = false;                                       // boolean: debugOn
        self.labelInitialOptions = {                                // json: label initial options
            'element'           :   'div',                          // string
            'display'           :   'inline-block',                 // css display style
            'verticalAlign'     :   'top',                          // css vertical align
            'fontSize'          :   sharesoft.getSetting( 'dataEditLabelFontSize' ),      // css font size
            'fontWeight'        :   sharesoft.getSetting( 'dataEditLabelFontWeight' ),    // css font weight    
            'marginTop'         :   sharesoft.getSetting( 'dataEditLabelMarginTop' ),     // css margin top
            'marginRight'       :   sharesoft.getSetting( 'dataEditLabelMarginRight' )    // css margin rigth
        };                                                          // done json: label initial options   
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to sharesoft
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add get label html
            sharesoft.getLabelHtml = self.getHtml;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getHtml = function( id, options ) {
        // FUNCTION: getHtml( string: element id, json: options ) void
            
            // create label options object
            var labelOptions = {};
            // loop over initial options
            $.each( self.labelInitialOptions, function( initialIndex, initialOption ) {
                // add option
                labelOptions[initialIndex] = initialOption;
            });
            // done loop over initial options
            
            // set id
            labelOptions['id'] = 'dataLabel' + id;

            // options exists
            if( options ){
                // loop over options
                $.each( options, function( index, option ) {
                    // set option
                    labelOptions[index] = option;
                });
                // done loop over options
            }
            // done options exists
            
            // return html
            return jsProject.jsonToElementHtml( labelOptions );
            
        // DONE FUNCTION: getHtml( string: element id, json: options ) void
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
    // DONE MODULE: dataLabelModule( void ) void
})( sharesoft );
// done create module function
