import * as angular from 'angular';

import {BlankValidator} from '../validation-alert/blank-validator';

export class BlankInputController extends BlankValidator {

    public static $inject = ['$scope'];
    public disabled: boolean;
    public info: string;
    public label: string;
    public model: any;
    public pattern: string;
    public patternName: string;
    public required: boolean;
    public type: string = 'text';

    protected ctrlAs: string = CTRL_AS;

    constructor (protected $scope: angular.IScope) {
        super();
    }
}

const CTRL_AS = 'inputVM';

export let blankInput: angular.IComponentOptions = {
    templateUrl: require('./blank-input.component.jade'),
    controller: BlankInputController,
    controllerAs: CTRL_AS,
    bindings: {
        disabled: '<',
        form: '<',
        info: '@',
        label: '@',
        mask: '@',
        model: '=',
        name: '@',
        pattern: '<',
        patternName: '@',
        required: '<',
        type: '@',
    }
};
