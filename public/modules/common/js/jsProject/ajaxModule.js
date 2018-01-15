/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
* 
* Purpose: this module controls ajax calls for the application
*
* Usage:    call jsProject.post( url, data, callback );
*               returns object result
*           call jsProject.securePost( url, token, data, callback );
*               returns object result
*  
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
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
    jsProject.ajaxModule = function( ) {

        // ajaxModule 
        
        // private
        var self = this;
        self.MODULE = 'ajaxModule';
        self.debugOn = true;
        self.nextProcesId = 0;
        self.errorCount = 0;
        self.maxRecalls = 3;
        self.processes = {};
        self.downloadCallback = null;
        self.header = null;
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // add the functions to jsProject
            jsProject.securePost = self.securePost;
            jsProject.secureDownload = self.secureDownload;
            jsProject.post = self.post;
            // done add the functions to jsProject
            
        };
        self.post = function( url, data, callback, isExistingProces ) {
            
            
            // !is existing proces 
            if( !isExistingProces ){


                // enrich data
                data['procesId'] = self.nextProcesId;
                // enrich data

                // debug info
                self.debug( 'new proces: ' + data['procesId']  + ' url: ' + url + ' subject: ' + data['subject'] );
                
                // create a process
                var proces = {  'id'            : self.nextProcesId++,
                                'url'           : url,
                                'isSecure'      : false,
                                'recallCount'   : 0,
                                'data'          : data,
                                'callback'      : callback };
                // done create a process

                // add the proces to the list
                self.processes[proces['id']] = proces;
            }            
            // !done is existing proces 
            
            // make ajax call
            $.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                dataType: 'json',
                success: function( result )
                {
                    // debug info
                    self.debug( 'ajax succes' );
                    // call succes
                    self.succes( result );
                },
                error: function( jqXHR, textStatus,errorThrown )
                {
                    // error count += 1
                    self.errorCount++;
                    // handle error 
                    console.log( 'ajax error' );
                    $.each( jqXHR, function( index, value ) {
                        self.debug( 'ajax failed jqXHR:' + value );
                        console.log( value );
                    } );
                    // debug info
                    self.debug( 'ajax failed textStatus:' + textStatus );
                    self.debug( 'ajax failed errorThrown:' + errorThrown );
                    // debug info
                    
                    // handle errors
                    self.handleErrors();
                }
            });
            // done make ajax call
        };
        self.securePost = function( url, token, data, callback, isExistingProces ) {
            
            // !is existing proces 
            if( !isExistingProces ){

                // enrich data
                data['procesId'] = self.nextProcesId;
                data['token'] = token;
                
                // debug info
                self.debug( 'new secure proces: ' + data['procesId']  + ' url: ' + url + ' subject: ' + data['subject'] );
                
                // create proces
                var proces = {  'id'            : self.nextProcesId++,
                                'url'           : url,
                                'data'          : data,
                                'isSecure'      : true,
                                'recallCount'   : 0,
                                'callback'      : callback };
                // done create proces
            
                // add to process list
                self.processes[proces['id']] = proces;
            }
            else {
                self.debug( 'recall secure post url: ' + url );
                // debug info
                self.debug( 'recall proces: ' + data['procesId'] );
            }
            // !done is existing proces 
            
            // make ajex call
            $.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                dataType: 'json',
                success: function( result )
                {
                    self.succes( result );
                },
                error: function( jqXHR, textStatus,errorThrown )
                {
                    // error count += 1
                    self.errorCount++;
                    // handle error 
                    console.log( 'ajax error' );
                    $.each( jqXHR, function( index, value ) {
                        // debug info
                        // self.debug( 'ajax failed jqXHR:' + value );
                        console.log( value );
                    } );
                    // debug info
                    self.debug( '-------- ajax failed ---------' + textStatus );
                    // debug info
                    self.debug( 'textStatus:' + textStatus );
                    // debug info
                    self.debug( 'errorThrown:' + errorThrown );
                    // debug info
                    self.debug( '-------- end ajax failed ---------' + textStatus );
                    // handle errors
                    self.handleErrors();
                }
            });
            // done make ajex call
        };
        self.secureDownload = function( url, token, data ) {
            data['token'] = token;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                if (this.status === 200) {
                    var filename = "";
                    var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }
                    var type = xhr.getResponseHeader('Content-Type');

                    var blob = new Blob([this.response], { type: type });
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            // use HTML5 a[download] attribute to specify filename
                            var a = document.createElement("a");
                            // safari doesn't support this yet
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                a.href = downloadUrl;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }
                        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
                    }
                }
            };
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send($.param(data));
        };
        self.downloadSucces = function( result ) {
            self.downloadCallback( result );
            self.downloadCallback = null;
        };
        self.succes = function( result ) {
            // debug info
            self.debug( 'succes' );
            // proces not defined
            if( result['procesId'] === null ){
                console.log( 'procesId = null error ' );
                $.each( result, function( index, value ) {
                    console.log( index + ": " + value );
                } );
            }
            else {
                // debug info
                self.debug( 'succes proces: ' + result['procesId'] );
                // make callback call
                self.processes[result['procesId']]['callback']( result['result'] );
                // remove proces
                delete self.processes[result['procesId']];
            }

            // handle errors
            self.handleErrors();
            
        }; 
        self.handleErrors = function( ) {

            // has errors and number of processes left = error count
            if( self.errorCount === 0 || Object.keys( self.processes ).length !== self.errorCount ){
                
                // 
                return;
                
            };
            // done has errors and number of processes left = error count
            
            self.errorCount = 0;
            var hasRecall = false;
            
            // loop over processes
            $.each( self.processes, function( procesId, process ) {
                
                if( process['recallCount'] < self.maxRecalls ){
                    hasRecall = true;
                    // create delay
                    self.recall( procesId, process );
                    return;
                }
                
            } );
            // done loop over processes
            
            if( !hasRecall ){
                var result = { 'criticalError'  :    'dataConnectionFailed' };
                // loop over processes
                $.each( self.processes, function( procesId, process ) {
                    process['callback']( result );
                } );
                // done loop over processes
                
            }
        }; 
        self.recall = function( procesId, process ) {
            
            process['recallCount']++;
            if( process['isSecure'] ){
                // recall secure post
                self.securePost(  process['url'], process['data']['token'], process['data'], process['callback'], true );
            }
            else {
                // recall post
                self.post( process['url'], process['data'], process['callback'], true );
            }
        }; 
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );