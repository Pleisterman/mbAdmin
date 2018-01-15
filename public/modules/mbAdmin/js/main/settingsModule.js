/* 
 *  Project: MbAdmin
 * 
 *  File: /MbAdmin/main/settingsModule.js
 * 
 *  Last revision: 16-01-2017
 * 
 *  Purpose: 
 *          this file controls settings for the application pleisterman
 *          settings are immutable global values for the project
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
    pleisterman.settingsModule = function( ) {
        
        //  settingsModule 
         
        
        // private
        var self = this;
        self.debugOn = false;
        self.MODULE = 'settingsModule';
        
        self.settings = {
            "keyCodes"                      :   {
                    'tab'                   :   9,
                    'space'                 :   32,
                    'enter'                 :   13,
                    'escape'                :   27,
                    'arrowUp'               :   38,
                    'arrowDown'             :   40,
                    'arrowLeft'             :   37,
                    'arrowRight'            :   39
            },
            
            // image dir
            "imageUrl"                      :   '/modules/mbAdmin/images/',      // dir
            
            // audio dir
            "audioUrl"                      :   '/modules/mbAdmin/sounds/',      // dir

            // z-index
            "zIndexLayout"                  :   2,                  // z-index
            "zIndexDivider"                 :   24,                 // z-index
            "zIndexDividerDragArea"         :   25,                 // z-index
            "zIndexMenus"                   :   26,                 // z-index
            "zIndexData"                    :   22,                 // z-index
            "zIndexDataError"               :   25,                 // z-index
            "zIndexDataEditOverlay"         :   28,                 // z-index
            "zIndexListSelectionsOverlay"   :   30,                 // z-index
            "zIndexOverlay"                 :   32,                 // z-index
            "zIndexOutOfDateLayer"          :   36,                 // z-index
            "zIndexMessageLayer"            :   40,                 // z-index
            "zIndexErrorLayer"              :   44,                 // z-index
            "zIndexBusyDiv"                 :   48,                 // z-index
            // donee z-index
           
            // dialogs
            'dialogMinimumWidth'            :   '400px',            // css minimum width
            'dialogMaximumWidth'            :   '1200px',           // css maximum width
            'dialogMinimumHeight'           :   '300px',            // css minimum heigth
            'dialogMaximumHeight'           :   '100px',            // css maximum height
            'dialogBorder'                  :   true,               // boolean: has border
            'dialogBorderRadius'            :   '0.1em',            // css border radius
            'dialogBorderStyle'             :   'groove',           // css border style
            "dialogBorderWidth"             :   '0.1em',            // css border width
            // done dialogs
            
            // dialog headers
            "dialogHeaderFontSize"          :   '1.2em',            // css font size
            "dialogHeaderFontWeight"        :   'bold',             // css font weight
            "dialogHeaderMarginLeft"        :   '1.6em',            // css margin left
            "dialogHeaderMarginTop"         :   '0.2em',            // css margin top
            "dialogHeaderPadding"           :   '0.2em',            // css padding
            "dialogHeaderMarginBottom"      :   '2.0em',            // css margin bottom
            // dialog headers
            
            // dialog sub headers
            "dialogSubHeaderFontSize"       :   '1.0em',            // css font size
            "dialogSubHeaderFontWeight"     :   'bold',             // css font weight
            "dialogSubHeaderMarginLeft"     :   '2.5em',            // css margin left
            "dialogSubHeaderMarginTop"      :   '0.4em',            // css margin top
            "dialogSubHeaderMarginBottom"   :   '1.7em',            // css margin bottom
            "dialogSubHeaderPadding"        :   '0.4em',            // css padding
            // dialog sub headers
            
            // dialog messages
            "dialogMessageFontSize"         :   '1.1em',            // css font size
            "dialogMessageFontWeight"       :   'normal',           // css font weight
            "dialogMessageMarginLeft"       :   '1.2em',            // css margin left
            "dialogMessagePaddingLeft"      :   '0.4em',            // css padding left
            "dialogMessagePaddingRight"     :   '0.4em',            // css padding right
            // dialog messages

            // dialog messages
            "dialogTextFontSize"            :   '1.0em',            // css font size
            "dialogTextFontWeight"          :   'normal',           // css font weight
            "dialogTextMarginLeft"          :   '1.2em',            // css margin left
            "dialogTextPaddingLeft"         :   '0.4em',            // css padding left
            "dialogTextPaddingRight"        :   '0.4em',            // css padding right
            // dialog messages
            
            // dialog buttons
            "dialogButtonPadding"           :   '0.6em',            // css padding
            "dialogButtonMarginTop"         :   '0.4em',            // css margin top
            "dialogButtonMarginBottom"      :   '0.0em',            // css margin bottom
            // dialog buttons
            
            // buttons
            'dataButtonsMarginLeftInLetters' :  '14',  
            "buttonPadding"                 :   '0.4em',            // css padding
            "buttonFontSize"                :   '1.1em',            // css font size
            "buttonFontWeight"              :   'normal',           // css font weight
            "buttonBorderWidth"             :   '0.1em',            // css border width
            "buttonBorderStyle"             :   'solid',            // css border style
            "buttonBorderRadius"            :   '0.1em',            // css border radius
            // done buttons

            // layout 
            'layoutTopRowHeight'             :   '3.0em',            // css style heigth
            'layoutBottomRowHeight'          :   '3.0em',            // css style height
            // done layout
            
            // top menu buttons
            'topMenuButtonsMarginTop'       :   '0.5em',            // css margin top
            'topMenuButtonsPadding'         :   '0.4em',            // css padding
            "topMenuButtonsFontSize"        :   '1.1em',            // css font size
            "topMenuButtonsFontWeight"      :   'bold',             // css font weight
            "topMenuButtonFontSize"         :   '1.1em',            // css font size
            "topMenuButtonFontWeight"       :   'bold',             // css font weight
            'topMenuButtonsImageSize'       :   '1.4em',            // css style height
            'topMenuButtonsTextPaddingLeft' :   '1.4em',            // css padding left
            // done top menu buttons
            
            // top menus
            "topMenuBorderWidth"            :   '0.1em',            // css border width
            "topMenuBorderStyle"            :   'groove',           // css border style
            "topMenuBorderRadius"           :   '0.1em',            // css border radius
            "topMenuPadding"                :   '0.4em 0.4em',      // css padding
            
            // done top menus
            
            // menu items
            "menuItemPaddingLeft"           :   '1.0em',            // cass padding left
            "menuItemPaddingRight"          :   '1.2em',            // css padding right
            "menuItemPadding"               :   '0.1em',            // css padding
            "menuItemTopMargin"             :   '0.2em',            // css margin top
            "menuItemMarginLeft"            :   '0.5em',            // css margin left
            "menuItemMarginRight"           :   '0.5em',            // css margin right
            "menuItemFontSize"              :   '1.0em',            // css font size
            "menuItemFontWeight"            :   'bold',             // css font weight
            "menuItemBorderWidth"           :   '0.1em',            // css border width
            "menuItemBorderStyle"           :   'solid',            // css border style
            "menuItemBorderRadius"          :   '0.1em',            // css border radius
            // done menu items
            
            
            // divider
            "dividerMinimumPosition"        :   140,                // integer: dividerMinimumPosition 
            "dividerWidth"                  :   '1.2em',            // css style width
            "dividerButtonHeight"           :   '99%',              // css style height                    
            "dividerButtonWidth"            :   '0.4em',            // css style width                    
            // done divider

            // lists
            "listRowFontSize"               :   '1.1em',            // css font size
            "listRowFontWeight"             :   'normal',           // css font weight
            // done lists
            
            // data edit
            "dataEditBorderRadius"          :   '0.1em',            // css border radius

            // items
            "dataEditItemBorderRadius"      :   '0.1em',            // css border radius
            "dataEditItemMarginTop"         :   '0.6em',            // css margin top
            "dataEditItemMarginLeft"        :   '0.6em',            // css margin left
            "dataEditItemPadding"           :   '8px 8px 6px 8px',  // css padding
            // done items
            
            // labels
            "dataEditLabelWidth"            :   '12.0em',           // css style width
            "dataEditLabelMarginTop"        :   '0.4em',            // css margin top
            "dataEditLabelMarginRight"      :   '1.0em',            // css margin right
            "dataEditLabelFontSize"         :   '1.0em',            // css font size
            "dataEditLabelFontWeight"       :   'normal',           // css font weight
            // done labels
            
            // inputs
            "dataEditInputFontSize"         :   '1.0em',            // css font size
            "dataEditInputFontWeight"       :   'normal',           // css font weight
            // done inputs
            
            // errors
            "dataEditErrorFontSize"         :   '0.9em',            // css font size
            "dataEditErrorFontWeight"       :   'normal',           // css font weight
            // done errors

            
            // checkbox
            "dataEditCheckboxFontSize"      :   '1.0em',            // css font size
            "dataEditCheckboxFontWeight"    :   'normal',           // css font weight
            "checkboxBorderWidth"           :   '0.1em',            // css border width
            "checkboxBorderStyle"           :   'groove',           // css border style 
            // done checkbox
            
            // data lists
            "dataListFontSize"              :   '0.9em',            // css font size
            "dataListFontWeight"            :   'normal',           // css font weight
            "dataListBorderWidth"           :   '0.1em',            // css border width
            "dataListBorderStyle"           :   'solid'             // css border style 
            // done data lists
        };
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add get setting
            pleisterman.getSetting = self.get;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.get = function( setting ) {
        // FUNCTION get( string: setting ) var
        
            // setting exists
            if( self.settings[setting] !== undefined ){
                // done 
                return self.settings[setting];
            }
            // done setting exists
            
            // debug info
            self.debug( 'error setting not found: ' +  setting );
            // doen with error
            return false;
            
        // DONE FUNCTION get( string: setting ) var
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
    // DONE MODULE: settingsModule( void ) void 
})( pleisterman );
// done create module function


