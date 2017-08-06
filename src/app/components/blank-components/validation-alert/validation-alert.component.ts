import * as angular from 'angular';

export class ValidationAlertController implements angular.IComponentController {

    public static $inject = [];
    public field: angular.INgModelController;
    public form: angular.IFormController;
    public format: string;
    public hasError: boolean;
    public label: string;
    public max: number;
    public min: number;
    public patternName: string;
    public today: Date = new Date();

    constructor () {}
}

export let validationAlert: angular.IComponentOptions = {
    templateUrl: require('./validation-alert.component.jade'),
    controller: ValidationAlertController,
    controllerAs: 'validationVM',
    bindings: {
        field: '<',
        form: '<',
        format: '<',
        hasError: '<',
        label: '<',
        max: '@',
        maxlength: '<',
        min: '@',
        patternName: '<',
    }
};
