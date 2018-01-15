/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/js/main.js
 * 
 * Purpose: this module is the container class for the application sharesoft
 *          all modules are linked to this module and can be accessed through the functions
 *          linked to this module.
 *          this module requires the jsProject modules  
 * 
 *  Last Revision: 16-01-2017
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2017 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 *  
 */

// create module function
( function() {

    // MODULE: sharesoft( void ) void 
    
    // create the sharesoft object
    window.sharesoft = new function(){};
    // PRIVATE:

    // MEMBERS
    var self = window.sharesoft;                        // object: self
    self.MODULE = 'sharesoft';                          // string: module
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
        self.settingsModule             = new sharesoft.settingsModule();
        self.valuesModule               = new sharesoft.valuesModule();
        self.tabStopsModule             = new sharesoft.tabStopsModule();
        self.listSelectionsModule       = new sharesoft.listSelectionsModule();
        self.listSelectorModule         = new sharesoft.listSelectorModule();
        self.listSelectionsDatePickerModule = new sharesoft.listSelectionsDatePickerModule();
        self.documentUploadModule       = new sharesoft.documentUploadModule();
        self.dataColorPickerModule      = new sharesoft.dataColorPickerModule();
        self.dataDatePickerModule       = new sharesoft.dataDatePickerModule();
        self.dividerModule              = new sharesoft.dividerModule();
        self.layoutModule               = new sharesoft.layoutModule();
        self.messageModule              = new sharesoft.messageModule();
        self.messageDialogModule        = new sharesoft.messageDialogModule();
        self.errorModule                = new sharesoft.errorModule();
        self.errorDialogModule          = new sharesoft.errorDialogModule();
        self.dataOutOfDateDialogModule  = new sharesoft.dataOutOfDateDialogModule();
        self.brandModule                = new sharesoft.brandModule();
        self.optionsModule              = new sharesoft.optionsModule();
        self.busyScreenModule           = new sharesoft.busyScreenModule();
        self.listsContainerModule       = new sharesoft.listsContainerModule();
        self.dataContainerModule        = new sharesoft.dataContainerModule();
        self.dataErrorModule            = new sharesoft.dataErrorModule();
        self.introModule                = new sharesoft.introModule();
        self.dataLabelModule            = new sharesoft.dataLabelModule();
        self.exportContainerModule      = new sharesoft.exportContainerModule();
        self.userModule                 = new sharesoft.userModule();
        self.dataFunctionsModule        = new sharesoft.dataFunctionsModule();
        self.aboutModule                = new sharesoft.aboutModule();
        self.dataModule                 = new sharesoft.dataModule();

        // show busy screen
       sharesoft.startBusyProcess();

        // set the layout
        jsProject.callEvent( 'sceneChange' );
        
        // show intro
        self.introModule.start( self.afterIntro );
        
        // debug info
        jsProject.debug( 'sharesoft ok: ' );
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
    // DONE MODULE: sharesoft( void ) void 
})();
// done create module function
 
