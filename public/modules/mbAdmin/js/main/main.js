/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/js/main.js
 * 
 * Purpose: this module is the container class for the application pleisterman
 *          all modules are linked to this module and can be accessed through the functions
 *          linked to this module.
 *          this module requires the jsProject modules  
 * 
 *  Last Revision: 16-01-2017
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
( function() {

    // MODULE: pleisterman( void ) void 
    
    // create the pleisterman object
    window.pleisterman = new function(){};
    // PRIVATE:

    // MEMBERS
    var self = window.pleisterman;                        // object: self
    self.MODULE = 'pleisterman';                          // string: module
    self.valuesModule               =   null;           // module: valuesModule
    self.settingsModule             =   null;           // module: settingsModule
    self.functionsModule            =   null;           // module: functionsModule
    self.effectsModule              =   null;           // module: effectsModule
    self.imageManagerModule         =   null;           // module: imageManagerModule
    self.soundManagerModule         =   null;           // module: soundManagerModule
    self.frontEndCapabilitiesModule =   null;           // module: frontEndCapabilitiesModule
    self.tabStopsModule             =   null;           // module: tabStopsModule
    self.layoutModule               =   null;           // module: layoutModule
    self.dividerModule              =   null;           // module: dividerModule
    self.busyScreenModule           =   null;           // module: busyScreenModule
    self.messageModule              =   null;           // module: messageModule
    self.messageDialogModule        =   null;           // module: messageDialogModule
    self.errorModule                =   null;           // module: errorModule
    self.errorDialogModule          =   null;           // module: errorDialogModule
    self.dataOutOfDateDialogModule  =   null;           // module: dataOutOfDateDialogModule
    self.listSelectionsModule       =   null;           // module: listSelectionsModule
    self.listSelectorModule         =   null;           // module: listSelectorModule
    self.documentUploadModule       =   null;           // module: documentUploadModule
    self.dataColorPickerModule      =   null;           // module: dataColorPickerModule
    self.dataDatePickerModule       =   null;           // module: dataDatePickerModule
    self.listRowsDatePickerModule   =   null;           // module: listRowsDatePickerModule
    self.dataErrorModule            =   null;           // module: dataErrorModule
    self.optionsModule              =   null;           // module: optionsModule
    self.listsContainerModule       =   null;           // module: listsContainerModule
    self.brandModule                =   null;           // module: brandModule
    self.dataContainerModule        =   null;           // module: dataContainerModule
    self.exportContainerModule      =   null;           // module: exportContainerModule
    self.introModule                =   null;           // module: introModule
    self.dataLabelModule            =   null;           // module: dataLabelModule
    self.dataLineBreakModule        =   null;           // module: dataLineBreakModule
    self.dataElementModule          =   null;           // module: dataElementModule
    self.userModule                 =   null;           // module: userModule
    self.dataModule                 =   null;           // module: dataModule
    self.aboutModule                =   null;           // module: aboutModule
    self.debugOn                    =   false;           // boolean: debugOn
    self.debuggerOptions = {                            // json: debugger options
        'zIndex'                    : 8000,             // integer: z-index            
        'top'                       : 100,              // integer: top          
        'left'                      : 1000,              // integer: left           
        'width'                     : 350,              // integer: width            
        'height'                    : 270               // integer: height            
    };                                                  // done json: debugger options
    // DONE MEMBERS     

    // FUNCTIONS
    self.start = function() {
    // FUNCTION: start( void ) void
            
        // create the jsProject module
        jsProject.construct();
        // add debug functions
        jsProject.debugOn( self.debugOn, self.debuggerOptions );

        // create member modules
        self.settingsModule             = new pleisterman.settingsModule();
        self.valuesModule               = new pleisterman.valuesModule();
        self.tabStopsModule             = new pleisterman.tabStopsModule();
        self.listSelectionsModule       = new pleisterman.listSelectionsModule();
        self.listSelectorModule         = new pleisterman.listSelectorModule();
        self.listSelectionsDatePickerModule = new pleisterman.listSelectionsDatePickerModule();
        self.documentUploadModule       = new pleisterman.documentUploadModule();
        self.dataColorPickerModule      = new pleisterman.dataColorPickerModule();
        self.dataDatePickerModule       = new pleisterman.dataDatePickerModule();
        self.dividerModule              = new pleisterman.dividerModule();
        self.layoutModule               = new pleisterman.layoutModule();
        self.messageModule              = new pleisterman.messageModule();
        self.messageDialogModule        = new pleisterman.messageDialogModule();
        self.errorModule                = new pleisterman.errorModule();
        self.errorDialogModule          = new pleisterman.errorDialogModule();
        self.dataOutOfDateDialogModule  = new pleisterman.dataOutOfDateDialogModule();
        self.brandModule                = new pleisterman.brandModule();
        self.optionsModule              = new pleisterman.optionsModule();
        self.busyScreenModule           = new pleisterman.busyScreenModule();
        self.listsContainerModule       = new pleisterman.listsContainerModule();
        self.dataContainerModule        = new pleisterman.dataContainerModule();
        self.dataErrorModule            = new pleisterman.dataErrorModule();
        self.introModule                = new pleisterman.introModule();
        self.dataLabelModule            = new pleisterman.dataLabelModule();
        self.exportContainerModule      = new pleisterman.exportContainerModule();
        self.userModule                 = new pleisterman.userModule();
        self.dataFunctionsModule        = new pleisterman.dataFunctionsModule();
        self.aboutModule                = new pleisterman.aboutModule();
        self.dataModule                 = new pleisterman.dataModule();

        // show busy screen
       pleisterman.startBusyProcess();

        // set the layout
        jsProject.callEvent( 'sceneChange' );
        
        // show intro
        self.introModule.start( self.afterIntro );
        
        // debug info
        jsProject.debug( 'pleisterman ok: ' );
        // done debug info

    // DONE FUNCTION: start( void ) void
    };
    self.afterIntro = function(){
    // FUNCTION: afterIntro( void ) void
   
        // start user module
        self.userModule.start();
    };
    // DONE PRIVATE

    // PUBLIC
    return {
        start :function(){
            // FUNCTION: start( void ) void 
            self.start();
        }
        // DONE PUBLIC
    };
    // DONE MODULE: pleisterman( void ) void 
})();
// done create module function
 
