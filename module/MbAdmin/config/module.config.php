<?php
/* 
 *  Project: MbAdmin
 * 
 *  File: module.config.php
 * 
 *  Last Revision:  18-01-2017
 * 
 *  Purpose: this a Zend Framework module config file
 *           here the rutes and controllers are defined
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: Pleisterman 
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


return array(
    'router' => array(
        'routes' => array(
////////////////////////////////////// home route ///////////////////            
            'MbAdminRouteHome' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Home',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                        ),
                    ),
                ),
            ),
////////////////////////////////////// work route ///////////////////            
            'MbAdminRouteWorkDirectory' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => ':workDirectory[/]',
                        ),
                    ),
                ),
            ),
////////////////////////////////////// Login route ///////////////////            
            'MbAdminRouteLogin' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/login',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Login',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '[/][:action[/]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\Login',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
////////////////////////////////////// RefreshToken route ///////////////////            
            'MbAdminRouteRefreshToken' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/refreshToken',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\RefreshToken',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\RefreshToken',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
//////////////////////// openResetPassword route ///////////////////            
            'MbAdminRouteOpenResetPassword' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/openResetPassword/',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Index',
                        'action'     => 'openResetPassword',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => ':workDirectory/:token',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ),
//////////////////////// ResetPassword route ///////////////////            
            'MbAdminRouteResetPassword' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/resetPassword/',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\ResetPassword',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => ':action',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ),            
////////////////////////////////////// read route ///////////////////            
            'MbAdminRouteRead' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/read',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Read',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\Read',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
////////////////////////////////////// update route ///////////////////            
            'MbAdminRouteUpdate' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/update',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Update',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\Update',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
////////////////////////////////////// insert route ///////////////////            
            'MbAdminRouteInsert' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/insert',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Insert',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\Insert',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
////////////////////////////////////// getString route ///////////////////            
            'MbAdminRouteGetString' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/getString',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\GetString',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\GetString',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
////////////////////////////////////// export route ///////////////////            
            'MbAdminRouteExport' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/export',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Export',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\Export',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
////////////////////////////////////// upload route ///////////////////            
            'MbAdminRouteUpload' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/mbAdmin/upload',
                    'defaults' => array(
                        'controller' => 'MbAdmin\Controller\Upload',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                'controller' => 'MbAdmin\Controller\Upload',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
////////////////////////////////////// done route ///////////////////            
        ),
    ),
    'service_manager' => array(
        'abstract_factories' => array(
        ),
        'factories' => array(
            'translator' => 'Zend\Mvc\Service\TranslatorServiceFactory',
        ),
        'aliases' => array(
        ),
    ),
    'translator' => array(
        'locale' => 'nl_NL',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'MbAdmin\Controller\Home'           => 'MbAdmin\Controller\HomeController',
            'MbAdmin\Controller\Login'          => 'MbAdmin\Controller\LoginController',
            'MbAdmin\Controller\ResetPassword'  => 'MbAdmin\Controller\ResetPasswordController',
            'MbAdmin\Controller\RefreshToken'   => 'MbAdmin\Controller\RefreshTokenController',
            'MbAdmin\Controller\Index'          => 'MbAdmin\Controller\IndexController',
            'MbAdmin\Controller\Read'           => 'MbAdmin\Controller\ReadController',
            'MbAdmin\Controller\GetString'      => 'MbAdmin\Controller\GetStringController',
            'MbAdmin\Controller\Update'         => 'MbAdmin\Controller\UpdateController',
            'MbAdmin\Controller\Insert'         => 'MbAdmin\Controller\InsertController',
            'MbAdmin\Controller\Export'         => 'MbAdmin\Controller\ExportController',
            'MbAdmin\Controller\Upload'         => 'MbAdmin\Controller\UploadController',
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
        'template_map' => array(
            'layout/layout'            => __DIR__ . '/../view/error/layout.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ),
        'exception_template'       => 'error/index',
    ),
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),
);


