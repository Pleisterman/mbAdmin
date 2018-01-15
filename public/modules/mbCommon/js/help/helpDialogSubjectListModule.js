/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/help/helpDialogSubjectListModule.js
 * 
 *  Last revision: 03-01-2017
 * 
 *  Purpose: 
 *          this module shows a list of subjects for the help dialog
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2016 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( pleisterman ){

    // MODULE: helpDialogSubjectListModule( string: containerId, function: callback ) void 
    
    pleisterman.helpDialogSubjectListModule = function( containerId, callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'helpDialogSubjectListModule';                    // string:  MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.containerId = containerId;                                 // string: container id            
        self.callback = callback;                                       // function: callback
        self.headerOptions = {                                          // json: header options
            'id'                        :   self.MODULE + 'ListRowsHeader', // string: element id
            'element'                   :   'div',                      // string: html element type 
            'text'                      :   pleisterman.translations['subjects'], // string: text
            'minimumWidth'              :   '15.0em',                   // css minimum width
            'styleHeight'               :   '1.1em',                    // css style height
            'marginTop'                 :   '0.1em',                    // css margin top   
            'color'                     :   pleisterman.colors['panelHighlightColor']['color'], // css color: color
            'fontSize'                  :   '0.9em',                    // css font size
            'marginBottom'              :   '0.2em',                    // css margin bottom
            'paddingLeft'               :   '1.2em',                    // css padding left
            'padding'                   :   '0.2em',                    // css padding   
            'paddingBottom'             :   '0.4em',                    // css padding bottom
            'borderBottom'              :   true,                       // boolean, has border
            'borderColor'               :   pleisterman.colors['panelBorderColor']['color'],  // css color: border color
            'borderWidth'               :   '0.1em',                    // css border width 
            'borderStyle'               :   'solid',                    // css border style 
            'backgroundColor'           :   pleisterman.colors['panelHighlightBackgroundColor']['color'] // css color: background color
        };                                                              // done json: header options
        self.listRowsOptions = {                                        // json: list rows options
            'id'                    :   self.MODULE + 'listRows',       // string: element id
            'element'               :   'div',                          // string: html element type 
            'óverflow'              :   'hidden',                       // css overflow
            'backgroundColor'       :   'transparent'                   // css color: background color
        };                                                              // done json: list rows options
        self.rowOptions = {                                             // json: row options
            'element'               :   'div',                          // string html element type 
            'overflow'              :   'hidden',                       // css overflow style
            'marginBottom'          :   2,                              // css margin bottom
            'marginTop'             :   2,                              // css margin top
            'backgroundColor'       :   pleisterman.colors['editBackgroundColor']['color'], // css color: border color
            'borderTop'             :   true,                           // add border option
            'borderBottom'          :   true,                           // add border option
            'borderWidth'           :   1,                              // px
            'borderColor'           :   pleisterman.colors['buttonBorderColor']['color'],
            'borderStyle'           :   'groove',                       // css border style
            'padding'               :   4,                              // css padding
            'paddingBottom'         :   6,                              // css padding bottom
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'backgroundPosition'    :   '4px center',                   // css background position
            'backgroundSize'        :   '1.8em',                        // css background size
            'cursor'                :   'pointer'                       // css cursor            
        };                                                              // done json: row options
        self.rowTextOptions = {                                         // json: row text options
            'element'               :   'div',                          // string: html element type 
            'backgroundColor'       :   'transparent',                  // css color: background color
            'overflow'              :   'hidden',                       // css overflow
            'paddingTop'            :   2,                              // css padding top
            'color'                 :   pleisterman.colors['editColor']['color'],
            'fontSize'              :   pleisterman.getSetting( 'listRowFontSize' ),      // css font size
            'fontWeight'            :   pleisterman.getSetting( 'listRowFontWeight' ),    // css font weight
            'paddingLeft'           :   '2.0em'                         // css padding left
        };                                                              // done json: row text options
        self.selectedSubjectIndex = 'overview';                         // string     
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // add update colors
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add header to container
            $( '#' + self.containerId ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

            // add to container
            $( '#' + self.containerId ).append( jsProject.jsonToElementHtml( self.listRowsOptions ) );
            
            // add rows 
            self.addRows();
            
            // add row events
            self.addRowEvents();
            
            // add event subscriptions
            self.addEventSubscriptions();

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addRows = function(){
        // FUNCTION: addRows( void ) void
            
            // loop over rows
            $.each( pleisterman.helpSubjects, function( index, value ) {
                // set row values
                self.rowOptions['id'] = self.listRowsOptions['id'] + '_' + index;
                
                if( index === self.selectedSubjectIndex ){
                    self.rowOptions['backgroundColor'] = pleisterman.colors['panelHighlightBackgroundColor']['color'];
                }
                else {
                    self.rowOptions['backgroundColor'] = pleisterman.colors['panelBackgroundColor']['color'];
                }
            
                // add row
                $( '#' + self.listRowsOptions['id'] ).append( jsProject.jsonToElementHtml( self.rowOptions ) );
                
                // set text values
                self.rowTextOptions['id'] = self.listRowsOptions['id'] + 'Text_' + index;
                self.rowTextOptions['text'] = value['translation'];
                // done set text values

                if( index === self.selectedSubjectIndex ){
                    self.rowTextOptions['color'] = pleisterman.colors['panelHighlightColor']['color'];
                }
                else {
                    self.rowTextOptions['color'] = pleisterman.colors['panelColor']['color'];
                }
            
                // add text 
                $( '#' + self.rowOptions['id'] ).html( jsProject.jsonToElementHtml( self.rowTextOptions ) );
            });
            // done loop over rows
            
        // DONE FUNCTION: addRows( void ) void
        };
        self.addRowEvents = function(){
        // FUNCTION: addRowEvents( event: event, integer: index ) void
            
            // loop over rows
            $.each( pleisterman.helpSubjects, function( index, value ) {
                // row events
                $( '#' + self.listRowsOptions['id'] + '_' + index ).mouseleave( function( event ){ self.rowMouseOut( event, index ); });
                $( '#' + self.listRowsOptions['id'] + '_' + index ).mouseenter( function( event ){ self.rowMouseIn( event, index ); });
                $( '#' + self.listRowsOptions['id'] + '_' + index ).click( function( event ){ self.rowClick( event, index ); });
                // done row events
            });
            // done loop over rows
            
        // DONE FUNCTION: addRowEvents( void ) void
        };
        self.rowMouseIn = function( event, index ){
        // FUNCTION: rowMouseIn( event: event, integer: index ) void
            
            // mouse over -> background color, color highlight
            $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            
        // DONE FUNCTION: rowMouseIn( void ) void
        };
        self.rowMouseOut = function( event, index ){
        // FUNCTION: rowMouseOut( event: event, integer: index ) void
            
            // is selected index
            if( index === self.selectedSubjectIndex ){
                // done keep selected
                return;
            }
            // done is selected index
            
            // mouse over -> background, color
            $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['editColor']['color'] );
            
        // DONE FUNCTION: rowMouseOut( event: event, integer: index ) void
        };
        self.rowClick = function( event, index ){
        // FUNCTION: rowClick( event: event, integer: index ) void
            
            // stop propagation
            event.stopPropagation(); 

            // mouse over -> background color, color highlight
            $( '#' + self.listRowsOptions['id'] + '_' + self.selectedSubjectIndex ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
            $( '#' + self.listRowsOptions['id'] + 'Text_' + self.selectedSubjectIndex ).css( 'color', pleisterman.colors['editColor']['color'] );
            
            //set selected index
            self.selectedSubjectIndex = index;
            
            // call the callback
            self.callback( index );
            
        // DONE FUNCTION: rowClick( event: event, integer: index ) void
        };
        self.listRowsSelect = function( ){
        // FUNCTION: listRowsSelect( void ) void
            
            // debug info
            self.debug( 'listRowsSelect' );
            // unused
            
        // DONE FUNCTION: listRowsSelect( void ) void
        };
        self.listRowsDeSelect = function( ){
        // FUNCTION: listRowsDeSelect( void ) void
            
            // debug info
            self.debug( 'listRowsDeSelect' );
            // unused
            
        // DONE FUNCTION: listRowsDeSelect( void ) void
        };
        self.listRowsPressSelected = function( ){
        // FUNCTION: listRowsPressSelected( void ) void
            
            // debug info
            self.debug( 'listRowsPressSelected' );
            // call the callback
            self.callback( self.selectedSubjectIndex );
            
        // DONE FUNCTION: listRowsPressSelected( void ) void
        };
        self.listRowsSelectPrevious = function( ){
        // FUNCTION: listRowsSelectPrevious( void ) void
            
            // debug info
            self.debug( 'listRowsSelectPrevious' );

            var selected = 0;
            var itemCount = 0;

            // find current index
            $.each( pleisterman.helpSubjects, function( index, value ) {
                if( index === self.selectedSubjectIndex ){
                    $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
                    $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['editColor']['color'] );
                    selected = itemCount;
                }
                itemCount++;
            });
            // done find current index
            
            // first selected
            if( selected === 0 ){
                // select last
                selected = itemCount - 1;
            }
            else {
                // select previous
                selected -= 1;
            }
            // done first selected
            
            // select new index
            itemCount = 0;
            $.each( pleisterman.helpSubjects, function( index, value ) {
                if( itemCount === selected ){
                    // remember selected
                    self.selectedSubjectIndex = index;
                    // highlight
                    $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
                    // done highlight
                }
                itemCount++;
            });
            // done select new index
            
        // DONE FUNCTION: listRowsSelectPrevious( void ) void
        };
        self.listRowsSelectNext = function( ){
        // FUNCTION: listRowsSelectNext( void ) void
            
            // debug info
            self.debug( 'listRowsSelectNext' );
            
            var selected = 0;
            var itemCount = 0;
            
            // find current index
            $.each( pleisterman.helpSubjects, function( index, value ) {
                if( index === self.selectedSubjectIndex ){
                    $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
                    $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['editColor']['color'] );
                    selected = itemCount;
                }
                itemCount++;
            });
            // done find current index

            // is last
            if( selected === itemCount - 1 ){
                // select first
                selected = 0;
            }
            else {
                // select next
                selected += 1;
            }
            // done is last
            
            // select new index
            itemCount = 0;
            $.each( pleisterman.helpSubjects, function( index, value ) {
                if( itemCount === selected ){
                    // remmeber selected
                    self.selectedSubjectIndex = index;
                    // highlight
                    $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
                    // done highlight
                }
                itemCount++;
            });
            // done select new index
            
        // DONE FUNCTION: listRowsSelectNext( void ) void
        };
        self.addTabstops = function( ){
        // FUNCTION: addTabstops( void ) void
            
            // create tabstop options
            var tabStopOptions = {
                'id'        :   self.listRowsOptions['id'],
                'layer'     :   'overlay',
                'select'    :   self.listRowsSelect,
                'deSelect'  :   self.listRowsDeSelect,
                'keys'      :   [
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['space'],
                        'type'      :   'tabStop',
                        'function'  :   self.listRowsPressSelected
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowUp'],
                        'type'      :   'tabStop',
                        'function'  :   self.listRowsSelectPrevious
                    },
                    {
                        'keyCode'   :   pleisterman.getSetting( 'keyCodes' )['arrowDown'],
                        'type'      :   'tabStop',
                        'function'  :   self.listRowsSelectNext
                    }
                ]
            };
            // done create tabstop options
            
            // register tabstop
            jsProject.callEvent( 'registerTabStop', tabStopOptions );
            
        // DONE FUNCTION: addTabstops( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            // debug info
            self.debug( 'update colors' );
            
            // update header colors
            $( '#' + self.headerOptions['id'] ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
            self.headerOptions['color'] = pleisterman.colors['panelHighlightColor']['color'];
            $( '#' + self.headerOptions['id'] ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
            self.headerOptions['backgroundColor'] = pleisterman.colors['panelHighlightBackgroundColor']['color'];
            $( '#' + self.headerOptions['id'] ).css( 'border-color', pleisterman.colors['panelBorderColor']['color'] );
            self.headerOptions['borderColor'] = pleisterman.colors['panelBorderColor']['color'];
            // done update header colors

            // update row colors
            $( '#' + self.rowOptions['id'] ).css( 'color', pleisterman.colors['editColor']['color'] );
            self.rowTextOptions['color'] = pleisterman.colors['panelHighlightColor']['color'];
            self.rowOptions['backgroundColor'] = pleisterman.colors['editBackgroundColor']['color'];
            self.rowOptions['borderColor'] = pleisterman.colors['buttonBorderColor']['color'];
            // loop over rows
            $.each( pleisterman.helpSubjects, function( index, value ) {
                if( index === self.selectedSubjectIndex ){
                    $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['panelHighlightBackgroundColor']['color'] );
                    $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['panelHighlightColor']['color'] );
                }
                else {
                    $( '#' + self.listRowsOptions['id'] + '_' + index ).css( 'background-color', pleisterman.colors['editBackgroundColor']['color'] );
                    $( '#' + self.listRowsOptions['id'] + 'Text_' + index ).css( 'color', pleisterman.colors['editColor']['color'] );
                }
            });
            // done loop over rows
            // done update row colors
            
        // DONE FUNCTION: updateColors( void ) void
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
            // FUNCTION: addTabstops( void ) void
            addTabstops : function(){
                // call addTabstops show
                self.addTabstops();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: helpDialogSubjectListModule( string: containerId, function: callback ) void 
})( pleisterman );
// done create module function
