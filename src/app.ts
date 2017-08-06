import {module} from 'angular';

import mainModule from './app/main.module';

declare global {
    type _ = 'lodash';
    type Dereg = () => void;
    const ENV: any;
}

let deps = [
    'ui.router',
    'restangular',
    'duScroll',
    'ngSanitize',
    'ngAutocomplete',
    'ui.bootstrap.datetimepicker',
    'ui.dateTimeInput',
    'ui.mask',
    'ng-slide-down',
    'angulartics',
    'angulartics.google.analytics',
    // App modules
    mainModule
];

export class Config {
  public static $inject = [
      '$urlRouterProvider',
      '$locationProvider'
  ];

  constructor (
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider
  ) {
      // default fall back route
      $urlRouterProvider.otherwise('/');

      // enable HTML5 Mode for SEO
      //noinspection TypeScriptUnresolvedFunction
      $locationProvider.html5Mode({enabled: true, requireBase: false});
  }
}

export class RunApp {

    public static $inject = [
        '$anchorScroll',
        '$rootScope'
    ];
    private static $anchorScroll;

    constructor(
        $anchorScroll,
        $rootScope,
    ) {
        RunApp.$anchorScroll = $anchorScroll;

        $rootScope.$on('$stateChangeSuccess', () => {
            RunApp.scrollTop();
        });
    }

    private static scrollTop(): void {
        this.$anchorScroll();
    }
}

module('app', deps)
    .config(Config)
    .run(RunApp)
    .name;
