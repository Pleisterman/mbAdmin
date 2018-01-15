/* 
 *  Project: MbCommon Admin
 * 
 *  File: /mbCommon/js/templates/listRowsDateSelectorModule.js
 * 
 *  Purpose: 
 *                      
 *  Last Revision: 04-01-2017
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
( function( sharesoft ){

    // MODULE: listRowsDateSelectorModule( sring: parentId, function: callback ) void 
    
    sharesoft.listRowsDateSelectorModule = function( parentId, callback ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listRowsDateSelectorModule';                     // string: MODULE
        self.debugOn = false;                                           // boolean: debug on
        self.parentId = parentId;                                       // string: parent id
        self.callback = callback;                                       // function: callback
        self.options = null;                                            // json: options
        self.imageUrl = sharesoft.getSetting( 'imageUrl' );             // string: inage dir    
        self.buttonOptions = {                                          // json: button options
            'previousId'            :   self.parentId + 'PreviousDayButton',                // string: element id
            'previousImage'         :   'url(' + self.imageUrl + 'buttonPrevious.png' + ')',// string: image file name
            'nextId'                :   self.parentId + 'NextDayButton',                    // string: element id
            'nextImage'             :   'url(' + self.imageUrl + 'buttonNext.png' + ')',    // string: image file name
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'verticalAlign'         :   'top',                          // css vertical align
            'marginTop'             :   '0.1em',                        // css margin top
            'marginLeft'            :   '0.3em',                        // css margin left
            'styleWidth'            :   '1.8em',                        // css style width
            'styleHeight'           :   '1.8em',                        // css style height
            'backgroundColor'       :   sharesoft.colors['buttonBackgroundColor']['color'], // css color: background color 
            'backgroundSize'        :   '1.8em',                        // css background size
            'backgroundPosition'    :   'center center',                // css background position
            'backgroundRepeat'      :   'no-repeat',                    // css background repeat
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'], // css color: border color 
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'cursor'                :   'pointer'                       // css cursor            
        };                                                              // done json: button options
        self.dateDisplayOptions = {                                     // json: date display options
            'id'                    :   self.parentId + 'DateDisplay',  // string: element id
            'text'                  :   'noSelection',                  // string: text
            'element'               :   'div',                          // string: html element type 
            'display'               :   'inline-block',                 // css display
            'styleWidth'            :   '7.0em',                        // css style width
            'styleHeight'           :   '1.6em',                        // css style height
            'marginLeft'            :   '0.3em',                        // css margin left
            'marginTop'             :   '0.1em',                        // css margin top
            'paddingTop'            :   '0.2em',                        // css padding top
            'textAlign'             :   'center',                       // css text align
            'color'                 :   sharesoft.colors['editColor']['color'],             // css color: color 
            'backgroundColor'       :   sharesoft.colors['editBackgroundColor']['color'],   // css color: background color 
            'border'                :   true,                           // boolean: has border
            'borderColor'           :   sharesoft.colors['buttonBorderColor']['color'], // css color: border color 
            'borderWidth'           :   '0.1em',                        // css border width
            'borderStyle'           :   'solid',                        // css border style
            'cursor'                :   'pointer'                       // css cursor            
        };                                                              // done json: date display options    
        self.date = null;                                               // string: date
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct: listRowsDateSelector: ' + self.parentId );
            
            // create html
            self.addHtml();
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to order up
            jsProject.subscribeToEvent( 'updateColors', self.updateColors );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // add previous button
            self.addPreviousButton();
            // add date display
            self.addDateDisplay();
            // add next button
            self.addNextButton();

        // DONE FUNCTION: addHtml( void ) void
        };
        self.addPreviousButton = function(){
        // FUNCTION: addPreviousButton( void ) void
            
            var id = self.buttonOptions['previousId'];
            self.buttonOptions['id'] = id;
            self.buttonOptions['imageUrl'] = self.buttonOptions['previousImage'];
            
            $( '#' + self.parentId ).html( jsProject.jsonToElementHtml( self.buttonOptions ) );

            $( '#' + id ).mouseover( function( event ){ self.buttonMouseIn( this ); }); 
            $( '#' + id ).mouseout( function( event ){ self.buttonMouseOut( this ); }); 
            $( '#' + id ).click( function( event ){ self.previousDate( event ); }); 

        // DONE FUNCTION: addPreviousButton( void ) void
        };
        self.addDateDisplay = function(){
        // FUNCTION: addDateDisplay( void ) void
            
            $( '#' + self.parentId ).append( jsProject.jsonToElementHtml( self.dateDisplayOptions ) );

            $( '#' + self.dateDisplayOptions['id'] ).mouseover( function( event ){ self.dateDisplayMouseIn( this ); }); 
            $( '#' + self.dateDisplayOptions['id'] ).mouseout( function( event ){ self.dateDisplayMouseOut( this ); }); 
            $( '#' + self.dateDisplayOptions['id'] ).click( function( event ){ self.openDateSelector( event ); }); 

        // DONE FUNCTION: addDateDisplay( void ) void
        };
        self.addNextButton = function(){
        // FUNCTION: addNextButton( void ) void
            
            var id = self.buttonOptions['nextId'];
            self.buttonOptions['id'] = id;
            self.buttonOptions['imageUrl'] = self.buttonOptions['nextImage'];
            
            $( '#' + self.parentId ).append( jsProject.jsonToElementHtml( self.buttonOptions ) );

            $( '#' + id ).mouseover( function( event ){ self.buttonMouseIn( this ); }); 
            $( '#' + id ).mouseout( function( event ){ self.buttonMouseOut( this ); }); 
            $( '#' + id ).click( function( event ){ self.nextDate( event ); }); 

        // DONE FUNCTION: addNextButton( void ) void
        };
        self.buttonMouseIn = function( element ){
        // FUNCTION: buttonMouseIn( html element: element ) void
            
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' +element.id ).css( 'color', sharesoft.colors['buttonHighlightColor']['color'] );

        // DONE FUNCTION: buttonMouseIn( html element: element ) void
        };
        self.buttonMouseOut = function( element ){
        // FUNCTION: buttonMouseOut( html element: element ) void
            
            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', sharesoft.colors['buttonColor']['color'] );

        // DONE FUNCTION: buttonMouseOut( html element: element ) void
        };
        self.previousDate = function( event ){
        // FUNCTION: previousDate( event: event ) void
            
            self.callback( 'previousDay' );

        // DONE FUNCTION: previousDate( event: event ) void
        };
        self.nextDate = function( event ){
        // FUNCTION: nextDate( event: event ) void
            
            self.callback( 'nextDay' );

        // DONE FUNCTION: nextDate( event: event ) void
        };
        self.dateDisplayMouseIn = function( element ){
        // FUNCTION: dateDisplayMouseIn( html element: element ) void
            
            // mouse over -> background color highlight
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['panelHighlightBackgroundColor']['color'] );
            // mouse over -> color highlight
            $( '#' + element.id ).css( 'color', sharesoft.colors['panelHighlightColor']['color'] );

        // DONE FUNCTION: dateDisplayMouseIn( html element: element ) void
        };
        self.dateDisplayMouseOut = function( element ){
        // FUNCTION: dateDisplayMouseOut( html element: element ) void
            
            // mouse out -> background color default
            $( '#' + element.id ).css( 'background-color', sharesoft.colors['editBackgroundColor']['color'] );
            // mouse out -> color default
            $( '#' + element.id ).css( 'color', sharesoft.colors['buttonColor']['color'] );

        // DONE FUNCTION: dateDisplayMouseOut( html element: element ) void
        };
        self.openDateSelector = function( event ){
        // FUNCTION: openDateSelector( event: event ) void
            
            self.callback( 'openDateSelector' );
            // stop propagation
            event.stopPropagation();
            
            sharesoft.showSelectionsDatePicker(  self.dateDisplayOptions['id'], self.date, self.dateSelectorCallback );

        // DONE FUNCTION: openDateSelector( event: event ) void
        };
        self.dateSelectorCallback = function( date ){
        // FUNCTION: dateSelectorCallback( string: date ) void
            
            self.debug( 'dateSelectorCallback date: ' + date );
            if( date ){
                self.callback( 'selectDay', date );
            }

        // DONE FUNCTION: dateSelectorCallback( string: date ) void
        };
        self.setDate = function( date ){
        // FUNCTION: setDate( void ) void
            
            self.debug( 'setDate' );
            self.date = date;
            $( '#' + self.dateDisplayOptions['id'] ).html( jsProject.dateObjectToText( jsProject.dbDateToDateObject( date ) ) );

        // DONE FUNCTION: setDate( void ) void
        };
        self.updateColors = function( ) {
        // FUNCTION: updateColors( void ) void
            
            self.debug( 'update colors' );
            $( '#' + self.buttonOptions['previousId'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['previousId'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
            $( '#' + self.buttonOptions['nextId'] ).css( 'background-color', sharesoft.colors['buttonBackgroundColor']['color'] );
            $( '#' + self.buttonOptions['nextId'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
            self.buttonOptions['backgroundColor'] =  sharesoft.colors['buttonBackgroundColor']['color'];
            self.buttonOptions['borderColor'] =  sharesoft.colors['buttonBorderColor']['color'];
            $( '#' + self.dateDisplayOptions['id'] ).css( 'background-color', sharesoft.colors['editBackgroundColor']['color'] );
            $( '#' + self.dateDisplayOptions['id'] ).css( 'border-color', sharesoft.colors['buttonBorderColor']['color'] );
            $( '#' + self.dateDisplayOptions['id'] ).css( 'color', sharesoft.colors['editColor']['color'] );
            self.dateDisplayOptions['backgroundColor'] =  sharesoft.colors['editBackgroundColor']['color'];
            self.dateDisplayOptions['borderColor'] =  sharesoft.colors['buttonBorderColor']['color'];
            self.dateDisplayOptions['color'] =  sharesoft.colors['editColor']['color'];

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
            // FUNCTION: setDate( string: date ) void
            setDate : function( date ){
                // call internal setDate
                self.setDate( date );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: listRowsDateSelectorModule( sring: parentId, function: callback ) void 
})( sharesoft );
// done create module function
