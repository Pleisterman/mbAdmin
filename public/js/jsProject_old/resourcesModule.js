/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this module controls the resources for the application 
*          resources are images, sounds, [ // later more? ]
*          when load is called the module will load the resources in the list
*          and call the callback when finished   
* Last revision: 03-11-2014
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
    jsProject.resourcesModule = function( ) {


        /*
        *  module resourcesModule 
        *  purpose:
        *          this module controls the resources for the application 
        *          resources are images, sounds, [ // later more? ]
        *          when load is called the module will load the resources in the list
        *          and call the callback when finished
        *          
        *   functions: 
        *       private:
        *           construct:      parameters: ( void ) return: void 
        *                           called by the module for initialization
        *           debug:          parameters: ( string string ) return: void
        *                           calls the jsProject.debug( string ) when self.debugOn
        *                           
        *  event subscription loadCancel                         
        */
    
        // private
        var self = this;
        self.MODULE = 'resourcesModule';
        self.debugOn = false;

        // array to save the resources in
        self.resources = new Array();
        self.audioExtensions = [ "ogg", "wav", "mp3" ];
        self.playableAudioExtionsions = [];
        self.checkLoadTimer = null;
        self.checkLoadDelay = 2000;
        
        // store the callback for load
        self.callback = null;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );

            jsProject.addValue( "loadedResource", "resourceLoader", "" );

            self.checkAudioCapabilities();
            
            // add the acces functions for the app
            jsProject.addResource = self.add;
            jsProject.loadResources = self.load;
            jsProject.getResource = self.get;
            jsProject.freeResource = self.free;
            jsProject.canPlaySoundType = self.canPlaySoundType;
            
            jsProject.subscribeToEvent( 'loadCancel', self.loadCancel );
            
        };
        self.checkAudioCapabilities = function() {
            var audio = new Audio();
            for( var i = 0; i < self.audioExtensions.length; i++ ){
                if( audio.canPlayType( "audio/" + self.audioExtensions[i] ) ){
                    self.playableAudioExtionsions.push(self.audioExtensions[i]);
                }
            }
            for( var i = 0; i < self.playableAudioExtionsions.length; i++ ){
                self.debug( 'i can play ==== ' +  self.playableAudioExtionsions[i] );
            }
        };
        self.canPlaySoundType = function( type ) {
            for( var i = 0; i < self.playableAudioExtionsions.length; i++ ){
                if( self.playableAudioExtionsions[i] == type ){
                    return true;
                }
            }
            return false;
        };
        self.add = function( id, src, type  ) {
            self.debug( 'addResource: ' + id );
            var resource = { 'id' : id,
                             'loaded' : false, 
                             'src' : src,      
                             'type'  : type, 
                             'resource' : null };
           self.resources.push( resource );                  
        };
       
        self.load = function( callback ) {
            self.debug( 'load' );
            self.callback = callback;
            // loop the resource array and start loading
            var hasResourcesToLoad = false;
            self.resources.forEach( function( resource ) {
                // if resource is empty
                if( !resource['resource']) {
                    hasResourcesToLoad = true;
                    switch( resource['type'] ) {
                        case 'image' : {
                            resource['resource'] = new Image();
                            resource['resource'].onload = function() {
                                self.loaded( resource['id'] );
                            };
                            resource['resource'].src = resource['src'];
                            break;
                        }
                        case 'sound' : {
                            resource['resource'] = new Audio();
                            resource['resource'].src = resource['src'];
                            resource['resource'].onloadeddata = function() {
                                self.loaded( resource['id'] );
                            };
                            break;
                        }
                        default : {
                            self.debug( 'error unknown resource type: ' + resource['type'] );
                            break;
                        }
                    }
                }    
            });
            if(!hasResourcesToLoad){
                self.callback();
            }
            else {
                self.checkLoadTimer = setTimeout( function () { self.loadCheck(); }, self.checkLoadDelay );
            }            
        };
        self.loadCancel = function( ) {
            clearTimeout( self.checkLoadTimer );
        };
        self.loaded = function( id ) {
            self.debug( ' sceneResourceLoaded: ' + id );
           
            jsProject.setValue( "loadedResource", "resourceLoader", id );
            jsProject.callEvent( "resourceLoaded" );

            var allLoaded = true;
            self.resources.forEach( function( resource ) {
                // set loaded to true 
                if( resource['id'] == id ) {
                    resource['loaded'] = true;
                    resource['resource'].onloadeddata = null;
                }
                // check if all resource are loaded
                if( !resource['loaded'] ) {
                    allLoaded = false;
                }
            });
            if( allLoaded ){
                clearTimeout( self.checkLoadTimer );
                self.debug( 'allLoaded' );
                self.callback();
            }
        };        
        self.loadCheck = function( ) {
            self.debug( 'loadCheck' );
            self.callback();
        };
        
/*      
        self.load = function( callback ) {
            self.callback = callback;
            self.loadResource();
        }
        self.loadResource = function() {
            self.debug( 'loadResource' );
            if( self.checkLoadTimer ){
                clearTimeout( self.checkLoadTimer );
                self.checkLoadTimer = null;
            }
            var resourcesToLoad = false;
            self.resources.forEach( function( resource ) {
                if( !resource['resource'] && !resourcesToLoad ) {
                    resourcesToLoad = true;
                    switch( resource['type'] ) {
                        case 'image' : {
                            resource['resource'] = new Image();
                            resource['resource'].onload = function() {
                                self.loaded( resource['id'] );
                            };
                            resource['resource'].src = resource['src'];
                            break;
                        }
                        case 'sound' : {
                            resource['resource'] = new Audio();
                            resource['resource'].onloadeddata = function() {
                                self.debug( 'setting load event for' + resource['id'] );
                                self.loaded( resource['id'] );
                            };
                            resource['resource'].src = resource['src'];
                            break;
                        }
                        default : {
                            self.debug( 'error unknown resource type: ' + resource['type'] );
                            break;
                        }
                    }
                }                
            }); 
            if( !resourcesToLoad ){
                self.debug( 'allLoaded' );
                if( self.callback ){
                    self.callback();
                }
            }
            else {
                self.checkLoadTimer = setTimeout( function () { self.loadCheck(); }, self.checkLoadDelay );                
            }
        };
        self.loaded = function( id ) {
            self.debug( 'resourceLoaded: ' + id );
            if( self.checkLoadTimer ){
                clearTimeout( self.checkLoadTimer );
                self.checkLoadTimer = null;
            }
            self.loadResource();
        };
        self.loadCheck = function( ) {
            self.debug( 'loadCheck' );
            self.loadResource();
        };
*/        
        self.get = function( id, type ) {
            self.debug( 'resourceItem get id=' + id + ' type:'  + type );
            var resource = null;
            self.resources.forEach( function( resourceItem ) {
                if( resourceItem['id'] == id && resourceItem['type'] == type ) {
                   resource = resourceItem['resource'];
                }
            });
            if( resource ){
                return resource
            }
            else {
                self.debug( ' resource not found id: ' + id + ' type: ' + type );
            }
        };
        self.free = function( id, type ) {
            self.debug( 'resourceItem free id=' + id + ' type:'  + type );
            var resourceIndex = null;
            for( var i = 0; i < self.resources.length; i++ ){
                if( self.resources[i]['id'] == id && self.resources[i]['type'] == type ) {
                   self.resources[i]['resource'] = null;
                   resourceIndex = i;
                }
            }
            self.resources.splice( i, 1 );
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