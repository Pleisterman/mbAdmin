<?php
/* 
 *  Project: MbCommon
 * 
 *  File: \MbCommon\Security\Authentification\AuthentificationSendResetPasswordEmail.php
 * 
 *  Last Revision:  25-01-2017
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
 * 
 * Purpose: this class handles sending a mail containing a link to reset the password
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

namespace MbCommon\Security\Authentification;

use Zend\ServiceManager\ServiceLocatorInterface;
use Common\Service\Debugger;
use Zend\Mail\Message;
use Zend\Mail\Transport\Sendmail;
use Zend\Mime\Part as MimePart;
use Zend\Mime\Message  as MimeMessage ;
use MbCommon\Database\Options\Options\OptionsDataController;
use MbCommon\Database\Language\LanguageDataController;

class AuthentificationSendResetPasswordEmail
{
    private $debugger = null;
    private $serviceLocator = null;
    private $configId = null;
    private $workDirectory = null;
    public function __construct( $configId, $workDirectory, ServiceLocatorInterface $serviceLocator, Debugger $debugger  )
    {
        // store debugger
        $this->debugger = $debugger;
        // store configid
        $this->configId = $configId;
        // store work directory
        $this->workDirectory = $workDirectory;
        /// store serviceLocator
        $this->serviceLocator = $serviceLocator;
    }
    public function sendResetPasswordEmail( $emailAddress, $token ){
        // debug info
        $this->debugger->LogInformation( 'AuthentificationSendResetPasswordEmail ' );
        
         // get options
        $optionsController = new OptionsDataController( $this->configId, $this->workDirectory, $this->serviceLocator, $this->debugger );
        // get language id from options
        $userLanguageId = $optionsController->getOption( 'languageId' );
        // create language controller
        $languageController = new LanguageDataController( $this->configId, $this->serviceLocator, $this->debugger );
        
        // create mail message
        $message = new Message();
        // add mail header adres translation
        
        
        $link = $this->workDirectory . '/' . $token;
        $bodyHeaderContent = new MimePart( $languageController->getTranslation( 'resetPassswordMailBodyHeader', $userLanguageId ) );
        $bodyHeaderContent->type = "text/html";
        $bodyLinkContent = new MimePart( str_replace( '%link%', $link, $languageController->getTranslation( 'resetPassswordMailBodyLink', $userLanguageId ) ) );
        $bodyLinkContent->type = "text/plain";
        $bodyFooterContent = new MimePart( $languageController->getTranslation( 'resetPassswordMailBodyFooter', $userLanguageId ) );
        $bodyFooterContent->type = "text/html";

        $body = new MimeMessage();
        $body->setParts( array( $bodyHeaderContent, $bodyLinkContent, $bodyFooterContent ) );

        $message->addFrom( "info@pleisterman.nl", $languageController->getTranslation( 'resetPassswordMailHeaderAddress', $userLanguageId ) );
        $message->addTo( $emailAddress );
        $message->setSubject( $languageController->getTranslation( 'resetPassswordMailSubject', $userLanguageId ) );
        $message->setBody( $body );
        $message->setEncoding( "UTF-8" );
        $mailer = new Sendmail();
        $mailer->send( $message );

        // debug info
        $this->debugger->LogInformation( 'AuthentificationSendResetPasswordEmail succes' );
    }
}
