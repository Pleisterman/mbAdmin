<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace MbAdmin;

use Zend\Mvc\ModuleRouteListener;
use Zend\EventManager\EventInterface;
use Zend\ModuleManager\Feature\BootstrapListenerInterface;
use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
use Zend\ModuleManager\Feature\ConfigProviderInterface;

class Module implements BootstrapListenerInterface, AutoloaderProviderInterface, ConfigProviderInterface {
        
        public function onBootstrap( EventInterface $event ) {

        $eventManager = $event->getApplication()->getEventManager();
        
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach( $eventManager );
    }
    public function getConfig() {
        return include __DIR__ . '/config/module.config.php';
    }
    public function getServiceConfig() {
        return array(
            'factories' => array(
            )
        );
    }
    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                array(
                    __DIR__ . '/autoload_classmap.php',
                    __DIR__ . '/../MbCommon/autoload_classmap.php'
                )
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
}
