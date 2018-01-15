/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/user/userModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this module handles user functions;
 *          Remember me, login, refreshToken
 *          for the application sharesoft.
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

    // MODULE: userModule( void ) void
    
    sharesoft.userModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'userModule';                         // string: MODULE
        self.debugOn = false;                                // boolean: debug
        self.reLoginDialog = null;                          // module: re login dialog
        self.loginDialog = null;                            // module: login dialog
        self.sendResetPasswordEmailDialogModule = null;     // module: send password reset email dialog
        self.resetPasswordDialog = null;                    // module: reset password dialog
        self.tokenRefreshTimer = null;                      // js timer
        self.refreshPeriodStart = null;                     // dateTime: refreshPeriodStart
        self.tokenRefreshCheckPeriod = 60 * 1000;           // integer: miliseconds
        self.userMenuModule = null;                         // module: user menu module
        self.passwordCheckModule = null;                    // module: password check module
        self.resetPasswordDialog = null;                   // module: user change password module
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
            // create the login dialog
            self.loginDialog = new sharesoft.loginDialogModule( self.prepareLogin );
            
            // create the relogin dialog
            self.reLoginDialog = new sharesoft.reLoginDialogModule();

            // create the send reset password email dialog
            self.sendResetPasswordEmailDialog = new sharesoft.sendResetPasswordEmailDialogModule( self.sendResetPasswordEmail );

            // create the reset password dialog
            self.resetPasswordDialog = new sharesoft.resetPasswordDialogModule( );

            // create menu module
            self.userMenuModule = new sharesoft.userMenuModule();
            
            // create user password check module
            self.passwordCheckModule = new sharesoft.passwordCheckModule();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.start = function() {
        // FUNCTION: start( void ) void
            
            // is password reset
            if( sharesoft.isResetPassword ){
                // show password reset
                
                // debug info
                self.debug( 'isResetPassword' );
                
                // show reset password dialog
                self.resetPasswordDialog.show( self.prepareResetPassword );
                
                // end busy proces
                sharesoft.endBusyProcess();
            }
            else {
                // call remember me
                self.rememberMe();
            }
            // is password reset
            
        // DONE FUNCTION: start( void ) void
        };
        self.rememberMe = function() {
        // FUNCTION: rememberMe( void ) void
        
            // debug info
            self.debug( 'rememberMe' );
            
            // create json: data
            var data = { 
                'workDirectory'     :   sharesoft.workDirectory
            };
            // done create json: data

            // ajax remember me
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/login/rememberMe', sharesoft.token, data, self.rememberMeCallback );
            
        // DONE FUNCTION: rememberMe( void ) void
        };
        self.rememberMeCallback = function( result ){
        // FUNCTION: rememberMeCallback( json: result  ) void
        
            // end busy proces
            sharesoft.endBusyProcess();

            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
            // set new token if exists
            if( result['token'] ){
                // debug info
                self.debug( 'public token: ' + result['token'] );
                // remember token
                sharesoft.token = result['token'];
            }
            // done set new token if exists
            
            // check result
            if( result['rememberMe'] ){
                // remember me succes
                self.debug( 'rememberMe succes. ' ); 
                // set user name
                self.userMenuModule.setUserName( result['userName'] );
                // start the program
                self.startProgram();
            }
            else {
                // remember me failed show login
                self.loginDialog.show();
            }
            // done check result
            
        // DONE FUNCTION: rememberMeCallback( json: result  ) void
        };
        self.prepareLogin = function(){
        // FUNCTION: prepareLogin( void ) void
        
            // debug info
            self.debug( 'prepareLogin' );

            // check login values
            if( !self.loginDialog.checkCredentials() ){
                // done with error
                return;
            }
            // done check login values
            
            // create json: data
            var data = {
                'workDirectory'     :   sharesoft.workDirectory
            };
            // done create json: data
            
            // show busy screen
            sharesoft.startBusyProcess();

            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/login/prepareLogin', sharesoft.token, data, self.prepareLoginCallback );
            
        // DONE FUNCTION: prepareLogin( void ) void
        };
        self.prepareLoginCallback = function( result ){
        // FUNCTION: prepareLoginCallback( json: result  ) void
            
            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
            // handle errors
            if( result['error'] ){
                
                // login delayed
                if( result['error'] === 'loginDelayed' ){
                    // show error
                    self.loginDialog.showError( 'loginDelayed' );
                }
                // done login delayed
                
                // hide busy screen
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done handle errors
            
            // check and set new token
            if( result['token'] ){
                // remember token
                sharesoft.token = result['token'];
            }
            else {
                // error no token
                self.loginDialog.showError( 'loginError' );
                // hide busy screen
                sharesoft.endBusyProcess();
                // done with error
                return;
            }
            // done check and set new token

            // get login values 
            var values = self.loginDialog.getValues();
            // no values
            if( !values ){
                // error no token
                self.loginDialog.showError( 'loginError' );
                // hide busy screen
                sharesoft.endBusyProcess();
                // return
                return;
            }
            // done no values
            
            // encode name
            var encodedName = jsProject.xorString( values['name'], result['keys']['nameKey'] );
            // encode password
            var encodedPassword = jsProject.xorString( values['password'], result['keys']['passwordKey'] );
            
            // create json: data
            var data = {
                'workDirectory'     :   sharesoft.workDirectory,
                'name'              :   encodedName,
                'password'          :   encodedPassword,
                'rememberMe'        :   values['rememberMe']
            };
            // done create json: data
            
            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/login', sharesoft.token, data, self.loginCallback );
            
        // DONE FUNCTION: prepareLoginCallback( json: result  ) void
        };
        self.loginCallback = function( result ){
        // FUNCTION: loginCallback( json: result  ) void
        
            // debug info
            self.debug( 'login callback ' );
            
            // hide busy screen
            sharesoft.endBusyProcess();

            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
            // set new token
            if( result['token'] ){
                // remember token
                sharesoft.token = result['token'];
            }
            // done set new token
            
            // handle errors
            if( result['error'] ){
                // show error
                self.loginDialog.showError( result['error'] );
                // done with error
                return;
            }
            // done handle errors

            // set user name
            self.userMenuModule.setUserName( result['userName'] );

            // start the program
            self.startProgram();
            
        // DONE FUNCTION: loginCallback( json: result  ) void
        };
        self.sendResetPasswordEmail = function( email ){
        // FUNCTION: sendResetPasswordEmail( string: email ) void
        
            // debug info
            self.debug( 'resetPassword email: ' + email );
            
            // create json: data
            var data = {
                'workDirectory'     :   sharesoft.workDirectory,
                'email'             :   email
            };
            // done create json: data
            
            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/resetPassword/sendResetPasswordEmail', sharesoft.token, data, self.sendResetPasswordEmailCallback );

        // DONE FUNCTION: sendResetPasswordEmail( string: email ) void
        };
        self.sendResetPasswordEmailCallback = function( result ){
        // FUNCTION: sendResetPasswordEmailCallback( json: result  ) void

            // create message options
            var messageOptions = {
                'okCallback'    :   self.sendResetPasswordEmailMessageCallback  
            };
            // done create message options

            // show message
            sharesoft.showMessage( 'sendResetPasswordEmailAfterSendMessage', messageOptions );
            
        // DONE FUNCTION: sendResetPasswordEmailCallback( json: result  ) void
        };
        self.sendResetPasswordEmailMessageCallback = function( result ){
        // FUNCTION: resetPasswordMessageCallback( json: result  ) void

            // debug info
            self.debug( 'sendResetPasswordEmailMessageCallback' );
                        
        // DONE FUNCTION: resetPasswordMessageCallback( json: result  ) void
        };
        self.prepareResetPassword = function( change ){
        // FUNCTION: resetPassword( void  ) void

            // debug info
            self.debug( 'prepareResetPassword' );
            
            // change canceled
            if( !change ){
                // reload application
                open( '/' + sharesoft.baseDirectory + '/' + sharesoft.workDirectory, '_self' );
                // done
                return;
            }
            // done change canceled
            
            // create json: data
            var data = {
                'workDirectory'     :   sharesoft.workDirectory
            };
            // done create json: data
            
            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/resetPassword/prepareResetPassword', sharesoft.token, data, self.prepareResetPasswordCallback );           
            
        // DONE FUNCTION: resetPassword( void  ) void
        };
        self.prepareResetPasswordCallback = function( result ){
        // FUNCTION: prepareResetPasswordCallback( json: result  ) void
            
            // debug info
            self.debug( 'prepareResetPasswordCallback result: ' + result );
           
            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result

            // get password    
            var password = self.resetPasswordDialog.getPassword(); 
            
            // create json: data
            var data = {
                'workDirectory'     :   sharesoft.workDirectory,
                'value'          :   jsProject.xorString( password, result['key'] )
            };
            // done create json: data
            
            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/resetPassword/resetPassword', result['token'], data, self.resetPasswordCallback );           
            
        // DONE FUNCTION: prepareResetPasswordCallback( json: result  ) void
        };
        self.resetPasswordCallback = function( result ){
        // FUNCTION: resetPasswordCallback( json: result  ) void
            // debug info
            self.debug( 'resetPasswordCallback result: ' + result );
            
            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
            // set new token
            if( result['token'] ){
                // remember token
                sharesoft.token = result['token'];
            }
            // done set new token
            
            // set user name
            self.userMenuModule.setUserName( result['userName'] );

            // start the program
            self.startProgram();

            // create message options
            var messageOptions = {
            };
            // done create message options
            
            // show message
            sharesoft.showMessage( 'passwordChanged', messageOptions );
            
        // DONE FUNCTION: resetPasswordCallback( json: result  ) void
        };
        self.startProgram = function(){
        // FUNCTION: startProgram( void ) void
        
            // start refresh timer
            self.startTokenRefreshTimer();
            // hide dialog
            self.loginDialog.hide();
            // call event startProgram
            jsProject.callEvent( 'loadData' );
            
        // DONE FUNCTION: startProgram( void ) void
        };
        self.startTokenRefreshTimer = function(){
        // FUNCTION: startTokenRefreshTimer( void ) void
        
            // delete old timer
            if( self.tokenRefreshTimer ){
                // clear time out
                clearTimeout( self.tokenRefreshTimer );
                // unset timer
                self.tokenRefreshTimer = null;
            }
            // done delete old timer
            
            // unset expired period
            self.refreshPeriodStart = new Date();
            
            // create timer
            self.tokenRefreshTimer = setTimeout( function () { self.tokenRefreshTimerTic(); }, self.tokenRefreshCheckPeriod );
            
        // DONE FUNCTION: startTokenRefreshTimer( void ) void
        };
        self.tokenRefreshTimerTic = function(){
        // FUNCTION: tokenRefreshTimerTic( void ) void
        
            // delete old timer
            if( self.tokenRefreshTimer ){
                // clear time out
                clearTimeout( self.tokenRefreshTimer );
                // unset timer
                self.tokenRefreshTimer = null;
            }
            // done delete old timer
            
            var now = new Date();
            // calculate dalay
            var currentDelay = parseInt( ( now - self.refreshPeriodStart ) / 1000 );
                        
            // debug info
            self.debug( 'expired: ' + currentDelay + ' refresh after: ' + sharesoft.pageTokenRefreshPeriod );
            // expiration period reached
            if( currentDelay > sharesoft.pageTokenRefreshPeriod  ){
                // refresh token
                self.refreshToken();
            }
            // done expiration period reached
            else {
                // start timer
                self.tokenRefreshTimer = setTimeout( function () { self.tokenRefreshTimerTic(); }, 
                                                                   self.tokenRefreshCheckPeriod  );
            }
            
        // DONE FUNCTION: tokenRefreshTimerTic( void ) void
        };
        self.refreshToken = function(){
        // FUNCTION: refreshToken( void ) void
        
            // debug info
            self.debug( 'Refresh token' );
            
            // create json: data
            var data = {
                'workDirectory'     :   sharesoft.workDirectory
            };
            // done create json: data
            
            // ajax
            jsProject.securePost( '/' + sharesoft.baseDirectory + '/refreshToken', sharesoft.token, data, self.refreshTokenCallback );
            
        // DONE FUNCTION: refreshToken( void ) void
        };
        self.refreshTokenCallback = function( result ){
        // FUNCTION: refreshTokenCallback( json: result ) void
        
            // global check result
            if( sharesoft.hasAjaxResultErrors( result ) ){
                // done with error
                return;
            }
            // done global check result
            
            // debug info
            self.debug( 'new token: ' + result['token'] );
            // remember token
            sharesoft.token = result['token'];
            // restart timer
            self.startTokenRefreshTimer();
            // done set new token
            
        // DONE FUNCTION: refreshTokenCallback( json: result  ) void
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
            // function: start( void ) void
            start : function(){
                // call internal
                self.start();
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: userModule( void ) void 
})( sharesoft );
// done create module function
