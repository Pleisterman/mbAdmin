/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this file controls the ajaxModule for the application pleisterman Guitar Slider
* Last revision: 26-08-2014
* 
* NOTICE OF LICENSE
*
* All of the material on this site is protected by copyright 
* only code that is explicitly made available for copying may be 
* copied without permission. 
* 
* Where code is made available to be copied all of the conditions 
* within the existing or modified code as well as the conditions on the page 
* where you found it must be observed when you use the code on your site.
* 
*/

( function( urenAdmin ){
    urenAdmin.ajaxModule = function( ) {


    /*
     *  module ajaxModule 
     *  purpose:
     *   this module controls ajaxModule for the urenAdmin.
     *   
     *  functions: 
 *  events: 
 */
    
        // private
        var self = this;
        self.MODULE = 'ajaxModule';
        self.debugOn = false;
        self.nextProcesId = 0;
        self.processes = {};
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            urenAdmin.post = self.post;
        };
        self.post = function( url, data, callback ) {
            data['procesId'] = self.nextProcesId;
            self.debug( 'post url: ' + url );
            var proces = {  'id'   : self.nextProcesId++,
                            'url'  : url,
                            'data' : data,
                            'callback' : callback };
            self.processes[proces['id']] = proces;
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: 'json',
                success: function( result )
                {
                    self.debug( 'ajax succes' );
                    self.succes( result );
                },
                error: function( jqXHR, textStatus,errorThrown )
                {
                    $.each( jqXHR, function( index, value ) {
                        self.debug( 'ajax failed jqXHR:' + value );
                    } );
                    self.debug( 'ajax failed textStatus:' + textStatus );
                    self.debug( 'ajax failed errorThrown:' + errorThrown );
                }
            });
        };
        self.succes = function( result ) {
            self.debug( 'succes' );
            if( result['procesId'] === null ){
                $.each( result, function( index, value ) {
                    console.log( index + ": " + value );
                } );
            }
            else {
                self.processes[result['procesId']]['callback']( result['result'] );
                delete self.processes[result['procesId']];
            }
        };
        // debug 
        self.debug = function( string ) {
            if( self.debugOn ) {
                jsProject.debug( self.MODULE + ' ' + string );
            }
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( urenAdmin );