<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

$config = array(
    'mbAdmin' => array( 
        'debugger'              => array( 
            'on'                => true,
            'debugDir'          => 'debug/mbAdmin/',
            'errorDir'          => 'debug/mbAdmin/',
            'phpDebugOn'        => true,
            'defaultSubject'    => 'mbAdmin',
            'clearLog'          => true,
        ),
        'dataDir'                           => 'data/mbAdmin/',
        'applicationKeyFile'                => 'applicationKey.json',
        'applicationKeyLength'              => 128,
        'preferedAlgorithms'                => array( 
            'sha256',
            'ripemd160',
            'md5'
        ),
        'publicTokenLength'                 => 256,
        'publicTokenExpirationPeriod'       => 28800, // 8 * 3600
        'rememberMeTokenLength'             => 256,
        'rememberMeTokenExpirationPeriod'   => 360, // 360
        'jsonWebTokenTokenLength'           => 256,
        'jsonWebTokenExpirationPeriod'      => 259200, // 3600 * 24 * 3
        'maximumUndelayedLogins'            => 3,
        'cookieCheckName'                   => 'mbAdminCookieCheck',
        'loginDelay'                        => 30,
        'loginTokenLength'                  => 256,
        'loginTokenExpirationPeriod'        => 120, // 120
        'loginCookiename'                   => 'mbAdminLoginCookie',
        'loginCookieExpirationPeriod'       => 1200, // 1200 seconds
        'pageTokenLength'                   => 128,
        'pageTokenExpirationPeriod'         => 3 * 60 * 60, // seconds
        'pageTokenRefreshPeriod'            => 2 * 60 * 60, // seconds
        'nameKeyLength'                     => 128,
        'sendResetPasswordEmailRepeatDelay' => 10, // 10 * 60, // seconds
        'sendResetPasswordEmailTokenLength' => 20,
        'sendResetPasswordEmailTokenExpirationPeriod'   => 28800,  // 8 * 60 * 60 seconds
        'passwordTokenLength'               => 128,
        'passwordKeyLength'                 => 128,
        'openResetPasswordExpirationPeriod' => 3 * 60 * 60, // seconds
        'resetPasswordTokenLength'          => 128,
        'resetPasswordCookieLength'         => 128,
        'passwordResetCookieName'           => 'mbAdminResetPassword',
        'prepareResetPasswordExpirationPeriod'   => 1200, // 1200 seconds
        'prepareResetPasswordTokenLength'   => 128,
        'prepareResetPasswordCookieLength'  => 128,
        'cookieKeyLength'                   => 256,
        'cookiePath'                        => '/mbAdmin',
        'tokenCodeAlphabet'                 => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$~.,^&*()><|}{[]',
        'resetPasswordEmailTokenCodeAlphabet' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    )
);

//require_once './config/autoload/config/configMbadmin.php';

return $config;