/* 
 *  Project: MbCommon 
 * 
 *  File: /mbCommon/js/user/passwordCheckModule.js
 * 
 *  Last revision: 17-01-2017
 * 
 *  Purpose: 
 *          this module adds the functions:
 *              validatePasword
 *              getPasswordStrength
 *           to the application.
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

    // MODULE: passwordCheckModule( void ) void
    
    pleisterman.passwordCheckModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.MODULE = 'passwordCheckModule';            // string: MODULE
        self.debugOn = false;                               // boolean: debug
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add validate password
            pleisterman.validatePassword = self.validatePassword;
            
            // add get password strength color
            pleisterman.getPasswordStrengthColor = self.getPasswordStrengthColor;
            
            // add get password strength valid
            pleisterman.getPasswordStrengthValid = self.getPasswordStrengthValid;
            
        // DONE FUNCTION: userCheckNewPassword( void ) void
        };
        self.validatePassword = function( password, repeatPassword, errorCallback ) {
        // FUNCTION: validatePassword( string: password, string: repeatPassword, function: errorCallback ) boolean: valid
        
            // debug info
            self.debug( 'checkNewPassword' );
                        
            // password empty
            if( password === '' ){
                // debug info
                self.debug( 'password is empty' );
                // show error
                pleisterman.getError( 'passwordEmpty', errorCallback );
                // done with error
                return false;
            }
            // done password empty
            
            // password not password repeat
            if( password !== repeatPassword ){
                // debug info
                self.debug( 'password is not password repeat' );
                // show error
                pleisterman.getError( 'passwordsNotEqual', errorCallback );
                // done invalid
                return false;
            }
            // done password not password repeat
            
            // password to short
            if( password.length < pleisterman.minimumPasswordLength ){
                // debug info
                self.debug( 'password is not password repeat' );
                // show error
                pleisterman.getError( 'passwordToShort', errorCallback );
                // done invalid
                return false;
            }
            // done to short

            // check entropy
            if( !self.checkEntropy( password ) ){
                // show error
                pleisterman.getError( 'passwordEntropyFailed', errorCallback );
                // done invalid
                return false;
            }
            // check entropy

            // password valid
            return true;
            
        // DONE FUNCTION: validatePassword( string: password, string: repeatPassword, function: errorCallback ) boolean: valid
        };
        self.getPasswordStrengthColor = function( password ) {
        // FUNCTION: getPasswordStrengthColor( string: password ) color: color
        
            // check entropy
            if( !self.checkEntropy( password ) ){
                // done
                return 'red';
            }
            // check entropy

            // password to short
            if( password.length < pleisterman.minimumPasswordLength ){
                // done
                return 'red';
            }
            // done to short
            
            var strength = self.calculatePaswordStrength( password );

            // strength = 0
            if( strength === 0 ){
                // done
                return 'red';
            }
            // done strength = 0
            
            // strength >= minimum strength
            if( self.calculatePaswordStrength( password ) >= pleisterman.minimumPasswordStrength ){
                // done valid
                return 'green';
            }
            // done strength >= minimum strength


            // calculate ratio
            var ratio = ( strength / pleisterman.minimumPasswordStrength ) * 4;
            
            // ratio < 1
            if( ratio < 1 ){
                // done
                return 'red';
            }
            // done ratio < 1
            
            // ratio < 2
            if( ratio < 2 ){
                // done
                return 'orange';
            }
            // done ratio < 2
            
            // ratio < 3
            if( ratio < 3 ){
                // done
                return 'yellow';
            }
            // done ratio < 3
            
            
        // DONE FUNCTION: getPasswordStrengthColor( string: password ) color: color
        };
        self.getPasswordStrengthValid = function( password ) {
        // FUNCTION: getPasswordStrengthValid( string: password ) boolean: valid
        
            // debug info
            self.debug( 'getPasswordStrengthValid' );
            
            // check entropy
            if( !self.checkEntropy( password ) ){
                // done invalid
                return false;
            }
            // check entropy

            // password to short
            if( password.length < pleisterman.minimumPasswordLength ){
                // done invalid
                return false;
            }
            // done to short

            // strength < minimum strength
            if( self.calculatePaswordStrength( password ) < pleisterman.minimumPasswordStrength ){
                // done invalid
                return false;
            }
            // done strength < minimum strength
            
            // done valid
            return true;
            
        // DONE FUNCTION: getPasswordStrengthValid( string: password ) boolean: valid
        };
        self.calculatePaswordStrength = function( password ){
        // FUNCTION: calculatePaswordStrength( string: password ) integer: strength

            // create strength
            var strength = 0;

            // length > 7
            if( password.length > 10 ){
                // strength += 1
                strength++;
            }
            // done length > 7
            
            // length > minimum length + 1 
            if( password.length > pleisterman.minimumPasswordLength + 1 ){
                // strength += 1
                strength++;
            }
            // length > minimum length + 1 
            
            // has a number
            if( password.search( /[0-9]/ ) >= 0 ){
                // strength += 1
                strength++;
            }
            // done has a number
            
            // has uppercase 
            if( password.search( /[A-Z]/ ) >= 0 ){
                // strength += 1
                strength++;
            }
            // done has uppercase

            // has special char
            if( /^[a-zA-Z0-9- ]*$/.test( password ) === false ){
                // strength += 1
                strength++;
            }
            // done has special char

            self.debug( strength );
            // done 
            return strength;
            
        // DONE FUNCTION: calculatePaswordStrength( string: password ) integer: strength
        };
        self.checkEntropy = function( password ){
        // FUNCTION: checkEntropy( string: password ) boolean: entropyValid
        
            self.debug( 'check entropy' );
            var foundArray = [];

            for( var i = 0; i < password.length; i++ ){
                if( foundArray.indexOf( password[i] ) < 0 ){
                    foundArray.push( password[i] );
                }
            }

            if( foundArray.length < 4 ){
                self.debug( 'entropy failed' );
                return false;
            }
            
            self.debug( 'entropy succes: ' + foundArray.length );
            
            return true;
            
        // DONE FUNCTION: checkEntropy( string: password ) boolean: entropyValid
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
    // DONE MODULE: passwordCheckModule( void ) void 
})( pleisterman );
// done create module function
