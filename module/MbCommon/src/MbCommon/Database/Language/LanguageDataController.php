<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Database\Language\LanguageDataController.php
 * 
 *  Last Revision:  18-01-2017
 * 
 *  Purpose: 
 *          this dataController class is an extension of the mbadminDataController class
 *          it controls the calls for translations 
 *                      
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: PleistermanNL 
 * 
 *  Copyright (C) 2017 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 * 
 *  Zend Framework (http://framework.zend.com/)
 *
 *  @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 *  @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace MbCommon\Database\Language;

use Common\Service\Debugger;
use MbCommon\Database\MbCommonDataController;
use MbCommon\Database\Language\LanguageGetDefaultLanguage;
use MbCommon\Database\Language\LanguageGetLanguageById;
use MbCommon\Database\Language\LanguageGetLanguages;
use MbCommon\Database\Language\LanguageGetDocumentHeaderTranslations;
use MbCommon\Database\Language\LanguageGetColorTranslations;
use MbCommon\Database\Language\LanguageGetIndexTranslations;
use MbCommon\Database\Language\LanguageGetTranslation;
use MbCommon\Database\Language\LanguageGetMessage;
use MbCommon\Database\Language\LanguageGetError;
use MbCommon\Database\Language\LanguageGetInfo;
use MbCommon\Database\Language\LanguageGetHelp;

class LanguageDataController extends MbCommonDataController 
{
    private $fileOptions = array(
        'fileName'  =>  'language/data.db'
    ); 
    public function __construct( $configId, $serviceLocator, Debugger $debugger  )
    {
        // store configid
        $this->configId = $configId;

        // parent handles construct
        parent::__construct( $configId, $this->fileOptions, $serviceLocator, $debugger );
    }     
    public function getDefaultLanguage( ){
        // create get default languageId controller
        $controller = new LanguageGetDefaultLanguage( $this->debugger );
        // done 
        return $controller->getDefaultLanguage( $this );
        
    }            
    public function getLanguageById( $languagId ){
        // create get default languageId controller
        $controller = new LanguageGetLanguageById( $this->debugger );
        // done 
        return $controller->getLanguageById( $this, $languagId );
        
    }            
    public function getLanguages( ){
        // create get languages controller
        $controller = new LanguageGetLanguages( $this->debugger );
        // done 
        return $controller->getLanguages( $this );
        
    }            
    public function getDocumentHeaderTranslations( $languageId ){
        // create get default languageId controller
        $controller = new LanguageGetDocumentHeaderTranslations( $this->debugger );
        // done 
        return $controller->getDocumentHeaderTranslations( $this, $languageId );
        
    }            
    public function getColorTranslations( $languageId ){
        // create get color translations controller
        $controller = new LanguageGetColorTranslations( $this->debugger );
        // done 
        return $controller->getColorTranslations( $this, $languageId );
        
    }            
    public function getTranslation( $translationId, $languageId ){
        // create get default languageId controller
        $controller = new LanguageGetTranslation( $this->debugger );
        // done 
        return $controller->getTranslation( $this, $translationId, $languageId );
        
    }            
    public function getIndexTranslations( $languageId ){
        // create get default languageId controller
        $controller = new LanguageGetIndexTranslations( $this->debugger );
        // done 
        return $controller->getIndexTranslations( $this, $languageId );
        
    }            
    public function getMessage( $messageId, $languageId ){
        // create get default languageId controller
        $controller = new LanguageGetMessage( $this->debugger );
        // done 
        return $controller->getMessage( $this, $messageId, $languageId );
        
    }            
    public function getError( $errorId, $languageId ){
        // create get error controller
        $controller = new LanguageGetError( $this->debugger );
        // done 
        return $controller->getError( $this, $errorId, $languageId );
        
    }            
    public function getInfo( $infoId, $languageId ){
        // create get info controller
        $controller = new LanguageGetInfo( $this->debugger );
        // done 
        return $controller->getInfo( $this, $infoId, $languageId );
        
    }            
    public function getHelp( $subjectId, $languageId ){
        // create get info controller
        $controller = new LanguageGetHelp( $this->debugger );
        // done 
        return $controller->getHelp( $this, $subjectId, $languageId );
        
    }            
}