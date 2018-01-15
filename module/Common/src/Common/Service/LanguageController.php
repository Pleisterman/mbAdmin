<?php

/* Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this class handles languages 
 * 
 *                  the class reads and stores the languages from the configuration 
 *                  it stores the selected language for the application
 *                  it handles translation requests throught the translator class
 * 
 *                  variables:
 *                      debugger            handles debug calls
 *                      translator          stores the translator
 *                      language            stores the selected language
 *                      config              stores the configuration values
 *                  functions:
 *                      getConfig           read the configuration values
 *                      getDefaultLanguage  get the current selected language
 *                      getLanguages        get all the languages
 *                      setLanguage         set the default language
 *                      translate           translate according to id
 *                      
 *   
 * Last revision: 13-08-2015
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

namespace Common\Service;

use Common\Service\Debugger;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\I18n\Translator\Translator;

class LanguageController 
{
    private $translator = null;
    private $debugger = null;
    private $language = 'nl_NL';
    private $config = array( 
                'defaultLanguage' => 'nl',
                'languages' => array( 'nl', 'en' )
            );
    public function __construct( ServiceLocatorInterface $serviceLocator, $configId, Debugger $debugger )
    {
        // create helpers
        $this->debugger = $debugger;
        $this->debugger->logInformation( 'LanguageController construct', 'language' );
 //       $this->translator = $serviceLocator->get( 'translator' );
        $this->translator = new Translator();
        // done create helpers

        // get the configuration
        $this->getConfig( $serviceLocator, $configId );
    }
    private function getConfig( ServiceLocatorInterface $serviceLocator, $configId ) {
        // read the configuration
        $config = $serviceLocator->get( 'config' )[$configId]['language'];
        if(  $config ) {
            // loop over values
            forEach( $config as $key => $value ) {
                // if value is in member array set it
                if(  array_key_exists( $key, $this->config ) && $value && $value !== "" ) {
                    $this->config[$key] = $value;
                }
            }
            // done loop over values
        }
        // debug info
        $this->debugger->logInformation( 'LanguageController defaultLanguage: ' .  $this->config['defaultLanguage'], 'language' );
        $this->language = $this->config['defaultLanguage'];
        // done debug info
    }
    public function addTranslationFile( $baseDir ) {
        $this->debugger->logInformation( 'add translation files in dir: ' . $baseDir );
        $this->translator->addTranslationFilePattern( 'gettext', $baseDir, '%s.mo' );
    }
    public function getDefaultLanguage(  ) {
        return $this->config['defaultLanguage'];
    }
    public function getLanguages(  ) {
        return $this->config['languages'];
    }
    public function setLanguage( $language ) {
        $this->language = $language;
        // set the language for the translator
        $this->translator->setLocale( $language );
    }
    public function translate( $id, $language = null ) {
        if( $language ){
            // set the language for the translator
            $this->translator->setLocale( $language );
        }

        // debug info
        $this->debugger->logInformation( 'LanguageController getTranslation id:' . $id, 'language' );
        // done debug info
        
        $returnValue = $this->translator->translate( $id );
        
        // debug info
        $this->debugger->logInformation( 'translation return:' .  $returnValue, 'language' );
        // done debug info
        
        // reset the language
        if( $language ){
            $this->translator->setLocale( $this->language );
        }
        
        // return the value
        return $returnValue;
    }
}