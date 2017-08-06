import {faceTemplateParam} from './face/face.controller';
import {FaceService} from './share/face.service';

export class MainConfig {
    public static $inject = [
        '$stateProvider'
    ];
    constructor($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state('main', {
                abstract: true,
                url: '?utm_source;utm_source_id;utm_medium;utm_campaign;utm_term',
                views: {
                    '@': {
                        controller: 'MainController',
                        controllerAs: 'mainVM',
                        templateUrl: require('./main.jade')
                    }
                },
            })
            .state('main.congratulations', {
                url: '/congratulations?ref;token',
                views: {
                    'content@main': {
                        controller: 'CongratulationsController',
                        controllerAs: 'congVM',
                        templateUrl: require('./congratulations/congratulations.jade')
                    }
                }
            })
            .state('main.form', {
                url: '/form?vehicle_type;product_amount;product_term',
                views: {
                    'content@main': {
                        controller: 'FormController',
                        controllerAs: 'formVM',
                        templateUrl: require('./form/form.jade')
                    }
                }
            })
            .state('main.face', {
                url: `/:${faceTemplateParam}`,
                views: {
                    'content@main': {
                        controller: 'FaceController',
                        controllerAs: 'faceVM',
                        templateUrl: require('./face/face.jade')
                    }
                },
                params: {
                    [faceTemplateParam]: {
                        value: FaceService.defaultTemplateName,
                        squash: true
                    },
                }
            });
    }
}
