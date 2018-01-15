/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:  this module controls the messagebox for the application
*           the messageBox can be used to display a message of type Warning, Error, or Question
*           the module will return true / false when used as Question
*           The module will set the value userActionsEnabled to false while being displayed
*           and call the event userActionsEnabledChange
*           
* Last revision: 28-10-2014
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2014  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.messageBoxModule = function( zIndex ) {
        /*
        *  module messageBoxModule 
        *  purpose:
        *           this module controls messageBox for the application.
        *           the messageBox can be used to display a message of type Warning, Error, or Question
        *           the module will return true / false when used as Question
        *           The module will set the value userActionsEnabled to false while being displayed
        *           and call the event userActionsEnabledChange when being displayed and closed.
        *   
        *   functions: 
        *       private:
        *           construct:      parameters: ( void ) return: void 
        *                           called by the module for initialization
        *           createCss:      parameters: ( void ) return: void
        *                           create the css the css will be encapsulated in the debug DIV
        *                           called by the module from construct  
        *           createHtml:     parameters: ( void ) return: void
        *                           create the html and put it in self.html
        *                           called by the module from construct  
        *           setButtonsText: parameters: ( void ) return: void
        *                           set the text of the buttons
        *                           called by the module from construct  
        *                           can be used for later languageChangeEvent
        *           createButtons:  parameters: ( void ) return: void
        *                           create the button jsProject.button modules
        *                           called by the module from construct  
        *           displayMessage: parameters: ( MessageType type, string messageId, function callback ) return: void / true / false
        *                           displays the message box with jsProject.messages( messageId ) Message and Title 
        *                           added to the app from construct
        *           ok:             parameters: ( void ) return: void
        *                           closes the messageBox
        *           yes:            parameters: ( void ) return: void
        *                           closes the messageBox
        *                           call the callback( true )
        *           no:             parameters: ( void ) return: void
        *                           closes the messageBox
        *                           call the callback( false )
        *           debug:          parameters: ( string string ) return: void
        *                           calls the application.debug( string ) when self.DebugOn
        *                             
        *  event calls:
        *       userActionEnabledChange:    when displayed: 
        *                                   applcation value userActionsEnabled is set to false            
        *                                   and the event is called
        *                                   when closed
        *                                   applcation value userActionsEnabled is set to true            
        *                                   and the event is called
        *       
        *  public: 
        *  The module will add the function displayMessage to the application    
        *  
        *  MessageType controls the display and actions
        *  types: 
        *      Warning             displays the message with ok button returns: void 
        *      CriticalMessage,    displays the message in critical mode with ok button returns: void   
        *      Question,           displays the message with yes-no buttons returns: true / false    
        */
    
        // private
        var self = this;
        self.MODULE = 'messageBoxModule';
        self.debugOn = false;
        self.zIndex = zIndex;
        self.callback = null;
        self.width = 400;
        self.height = 240;
        // store the css
        self.css = '';
        // store the html
        self.html = '';
        
        self.mouseOverColor = 'indigo';
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );

            // create the css
            self.createCss();
            
            // create messageBox div
            self.html += '<div id="jsProjectMessageBox" class="jsProjectDiv jsProjectRoundBorder jsProjectMessageBox">';
                // add the created css
                self.html += self.css;
                // add inner html
                self.createHtml();
            // close the div    
            self.html += '</div>';
            // add to body
            $(document.body).append( self.html );
            
            // create the buttons
            self.createButtons();
            self.setButtonsText();
            $( '#jsProjectMessageBox' ).hide();

            // add functions to application 
            jsProject.displayMessage = self.displayMessage;
            
            // add the eventListeners 
            jsProject.subscribeToEvent( 'sceneChange', self.centerPosition );
        };
        self.createCss = function() {
            var top = 0, left = 0, height = 0, width = 0;
            var zIndex = 1;
            self.css += '<style>';
                // the message box
                self.css += ' .jsProjectMessageBox { ' + "\n";
                self.css += '    overflow: hidden; ' + "\n";
                self.css += '    width: ' +  self.width + 'px; ' + "\n";
                self.css += '    height: ' +  self.height + 'px; ' + "\n";
                self.css += '    background-color: ' + jsProject.getValue( 'backgroundColor', 'jsProject' ) + '; ' + "\n";
                self.css += '    border: lightblue 1px groove; ' + "\n";
                self.css += '    border-radius: 5px; ' + "\n";
                self.css += '    z-index: ' +  self.zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";

                left = self.width - 85;
                top = 15;
                self.css += ' .jsProjectMessageBoxLogo { ' + "\n";
                self.css += '    top: ' +  top + 'px; ' + "\n";
                self.css += '    left: ' +  left + 'px; ' + "\n";
                self.css += '    border-radius:50%;';
                self.css += '    border:1px lightgrey ridge;';
                self.css += '    padding:12px 22px;';
                self.css += '    font-size:2.4em;';
                self.css += '    color:lightgrey;';
                self.css += '    text-align:center;';
                self.css += '    z-index: ' +  zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;

                //the title
                width = self.width - 120;
                self.css += ' .jsProjectMessageBoxTitle { ' + "\n";
                self.css += '    overflow: hidden; ' + "\n";
                self.css += '    top: 25px; ' + "\n";
                self.css += '    left: 15px; ' + "\n";
                self.css += '    width: ' +  width + 'px; ' + "\n";
                self.css += '    height: 25px; ' + "\n";
                self.css += '    color: black; ' + "\n";
                self.css += '    font-size: 1.1em; ' + "\n";
                self.css += '    border:0px lightgrey ridge;'
                self.css += '    background: transparent; ' + "\n";
                self.css += '    z-index: ' +  zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;

                // the text
                width = self.width - 125;
                height= self.height - 140;
                self.css += ' .jsProjectMessageBoxText { ' + "\n";
                self.css += '    overflow: hidden; ' + "\n";
                self.css += '    top: 60px; ' + "\n";
                self.css += '    left: 20px; ' + "\n";
                self.css += '    width: ' +  width + 'px; ' + "\n";
                self.css += '    height: ' +  height + 'px; ' + "\n";
                self.css += '    color: ' +  jsProject.getValue( 'textColor', 'jsProject' ) + '; ' + "\n";
                self.css += '    padding: 10px; ' + "\n";
                self.css += '    font-size: 1.0em; ' + "\n";
                self.css += '    background: transparent; ' + "\n";
                self.css += '    border:0px lightgrey ridge;';
                self.css += '    z-index: ' +  zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;
            
                // the buttons 
                // ok
                top = self.height - 50;
                left = ( self.width - 80 ) / 2;
                self.css += ' .jsProjectMessageBoxButtonOk { ' + "\n";
                self.css += '    top: ' +  top + 'px; ' + "\n";
                self.css += '    left: ' +  left + 'px; ' + "\n";
                self.css += '    width: 80px; ' + "\n";
                self.css += '    height: 21px; ' + "\n";
                self.css += '    color: ' +  jsProject.getValue( 'textColor', 'jsProject' ) + '; ' + "\n";
                self.css += '    padding: 5px; ' + "\n";
                self.css += '    text-align: center; ' + "\n";
                self.css += '    font-size: 1.1em; ' + "\n";
                self.css += '    background-color: transparent; ' + "\n";
                self.css += '    z-index: ' +  zIndex + ';'  + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;
                // ok Over 
                self.css += ' .jsProjectMessageBoxButtonOkOver { ' + "\n";
                self.css += '    top: ' +  top + 'px; ' + "\n";
                self.css += '    left: ' +  left + 'px; ' + "\n";
                self.css += '    width: 80px; ' + "\n";
                self.css += '    height: 21px; ' + "\n";
                self.css += '    color: ' + self.mouseOverColor + '; ' + "\n";
                self.css += '    border-color: ' + self.mouseOverColor + '; ' + "\n";
                self.css += '    padding: 5px; ' + "\n";
                self.css += '    text-align: center; ' + "\n";
                self.css += '    font-size: 1.1em; ' + "\n";
                self.css += '    background-color: transparent; ' + "\n";
                self.css += '    z-index: ' +  zIndex + ';'  + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;

                // yes
                top = self.height - 50;
                left = ( self.width / 2 ) - 105;
                self.css += ' .jsProjectMessageBoxButtonYes { ' + "\n";
                self.css += '    overflow: hidden; ' + "\n";
                self.css += '    top: ' +  top + 'px; ' + "\n";
                self.css += '    left: ' +  left + 'px; ' + "\n";
                self.css += '    width: 80px; ' + "\n";
                self.css += '    height: 25px; ' + "\n";
                self.css += '    color: ' +  jsProject.getValue( 'textColor', 'jsProject'  ) + '; ' + "\n";
                self.css += '    padding: 5px; ' + "\n";
                self.css += '    text-align: center; ' + "\n";
                self.css += '    font-size: 1.3em; ' + "\n";
                self.css += '    background-color: transparent; ' + "\n";
                self.css += '    z-index: ' +  zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;
                // yes Over
                self.css += ' .jsProjectMessageBoxButtonYesOver { ' + "\n";
                self.css += '    overflow: hidden; ' + "\n";
                self.css += '    top: ' +  top + 'px; ' + "\n";
                self.css += '    left: ' +  left + 'px; ' + "\n";
                self.css += '    width: 80px; ' + "\n";
                self.css += '    height: 25px; ' + "\n";
                self.css += '    color: ' + self.mouseOverColor + '; ' + "\n";
                self.css += '    border-color: ' + self.mouseOverColor + '; ' + "\n";
                self.css += '    padding: 5px; ' + "\n";
                self.css += '    text-align: center; ' + "\n";
                self.css += '    font-size: 1.3em; ' + "\n";
                self.css += '    background-color: transparent; ' + "\n";
                self.css += '    z-index: ' +  zIndex + ';' + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;

                // no
                top = self.height - 50;
                left = ( self.width / 2 ) + 25;
                self.css += ' .jsProjectMessageBoxButtonNo { ' + "\n";
                self.css += '    top: ' +  top + 'px; ' + "\n";
                self.css += '    left: ' +  left + 'px; ' + "\n";
                self.css += '    width: 80px; ' + "\n";
                self.css += '    height: 25px; ' + "\n";
                self.css += '    color: ' +  jsProject.getValue( 'textColor', 'jsProject'  ) + '; ' + "\n";
                self.css += '    padding: 5px; ' + "\n";
                self.css += '    text-align: center; ' + "\n";
                self.css += '    font-size: 1.3em; ' + "\n";
                self.css += '    background-color: transparent; ' + "\n";
                self.css += '    z-index: ' +  zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";
                zIndex++;
                // no Over
                self.css += ' .jsProjectMessageBoxButtonNoOver { ' + "\n";
                self.css += '    top: ' +  top + 'px; ' + "\n";
                self.css += '    left: ' +  left + 'px; ' + "\n";
                self.css += '    width: 80px; ' + "\n";
                self.css += '    height: 25px; ' + "\n";
                self.css += '    color: ' + self.mouseOverColor + '; ' + "\n";
                self.css += '    border-color: ' + self.mouseOverColor + '; ' + "\n";
                self.css += '    padding: 5px; ' + "\n";
                self.css += '    text-align: center; ' + "\n";
                self.css += '    font-size: 1.3em; ' + "\n";
                self.css += '    background-color: transparent; ' + "\n";
                self.css += '    z-index: ' +  zIndex + '; ' + "\n";
                self.css += '  }' + "\n" + "\n";

            self.css += '</style>';
            
        };
        self.createHtml = function() {
            // logo
            self.html += '<div id="jsProjectMessageBoxLogo" class="jsProjectDiv jsProjectMessageBoxLogo">';
            self.html += 'X';
            self.html += '</div>';

            // title
            self.html += '<div id="jsProjectMessageBoxTitle" class="jsProjectDiv jsProjectMessageBoxTitle ">';
            self.html += '</div>';

            // text
            self.html += '<div id="jsProjectMessageBoxText" class="jsProjectDiv jsProjectMessageBoxText">';
            self.html += '</div>';

            // buttons
            // yes
            self.html += '<div id="jsProjectMessageBoxButtonYes" class="jsProjectDiv jsProjectClickable jsProjectRoundBorder jsProjectMessageBoxButtonYes">';
            self.html += '</div>';
            // no
            self.html += '<div id="jsProjectMessageBoxButtonNo" class="jsProjectDiv jsProjectClickable jsProjectRoundBorder jsProjectMessageBoxButtonNo">';
            self.html += '</div>';
            // ok
            self.html += '<div id="jsProjectMessageBoxButtonOk" class="jsProjectDiv jsProjectClickable jsProjectRoundBorder jsProjectMessageBoxButtonOk">';
            self.html += '</div>';
        };
        // set the text
        self.setButtonsText = function() {
            $( '#jsProjectMessageBoxButtonOk' ).html( jsProject.getString( 'ok' ) );
            $( '#jsProjectMessageBoxButtonYes' ).html( jsProject.getString( 'yes' ) );
            $( '#jsProjectMessageBoxButtonNo' ).html( jsProject.getString( 'no' ) );
        };
        self.createButtons = function() {
            //create the button modules
            self.buttonOk = new jsProject.buttonModule( "jsProjectMessageBoxButtonOk", true, self.ok );
            self.buttonYes = new jsProject.buttonModule( "jsProjectMessageBoxButtonYes", true, self.yes );
            self.buttonNo = new jsProject.buttonModule( "jsProjectMessageBoxButtonNo", true, self.no );
        };
        self.centerPosition = function() {
            self.debug( 'centerPosititon' );
            // center the messageBox
            var top = ( $(document).height() - self.height ) / 2,
                left = ( $(document.body).width() - self.width ) / 2 ;
            $( '#jsProjectMessageBox').css( "top" , top + 'px' );
            $( '#jsProjectMessageBox').css( "left" , left + "px" );
            
        };
        // display the message
        self.displayMessage = function( type, messageTitle, message, callback ){
            
            // set useraction disabled and call the event
            jsProject.setValue( 'userActionsEnabled', 'jsProject', false );
            jsProject.callEvent( 'UserActionEnabledChange' );

            // set the callback
            if( callback ){
                self.callback = callback;
            }
            
            // center the messageBox
            self.centerPosition();
            // show the appropiate logo and buttons
            $( '#jsProjectMessageBoxMessageLogo').hide();
            $( '#jsProjectMessageBoxButtonOk' ).hide();
            $( '#jsProjectMessageBoxButtonYes' ).hide();
            $( '#jsProjectMessageBoxButtonNo' ).hide();
            // messageType switch
            switch( type ){
                case 'message' : {
                    $( '#jsProjectMessageBoxLogo').html( '!' );
                    $( '#jsProjectMessageBoxButtonOk').show();
                    break;
                }
                case 'criticalMessage' : {
                    $( '#jsProjectMessageBoxLogo').html( 'X' );
                    $( '#jsProjectMessageBoxButtonOk').show();
                    break;
                }
                case 'question' : {
                    $( '#jsProjectMessageBoxLogo').html( '?' );
                    $( '#jsProjectMessageBoxButtonYes').show();
                    $( '#jsProjectMessageBoxButtonNo').show();
                    break;
                }
                default : {
                    jsProject.debug( 'messageBox type not found' );
                }
            }
            
            // show the Title
            $( '#jsProjectMessageBoxTitle').html( messageTitle );
            
            // show the message
            $( '#jsProjectMessageBoxText').html( message );
            
            // show the messageBox
            $( '#jsProjectMessageBox').show();
            
            
        }; 
        // ok button was clicked
        self.ok = function( ) {
            self.debug( 'ok' );
            // set useraction enabled and call the event

            jsProject.setValue( 'userActionsEnabled', 'jsProject', true );
            jsProject.callEvent( 'UserActionEnabledChange' );

            $( '#jsProjectMessageBox').hide();
            self.callback( true );
        };
        // yes button was clicked
        self.yes = function( ) {
            self.debug( 'yes' );
            
            // set useraction enabled and call the event
            jsProject.setValue( 'userActionsEnabled', 'jsProject', true );
            jsProject.callEvent( 'UserActionEnabledChange' );

            $( '#jsProjectMessageBox').hide();
            if( self.callback ){
                self.callback( true );
                self.callback = null;
            }
        };
        // no button was clicked
        self.no = function( ) {
            self.debug( 'no' );

            // set useraction enabled and call the event
            jsProject.setValue( 'userActionsEnabled', 'jsProject', true );
            jsProject.callEvent( 'UserActionEnabledChange' );

            $( '#jsProjectMessageBox').hide();
            if( self.callback ){
                self.callback( false );
                self.callback = null;
            }
        };
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ': ' + string );
            }
        };
        
        // initialize the module 
        self.construct();
    };
    
})( jsProject );


