import * as angular from 'angular';

import {BlankValidator} from '../validation-alert/blank-validator';

export class BlankCheckboxController extends BlankValidator {

    public static $inject = ['$scope'];
    public label: string;
    public model: any;
    public required: boolean;

    protected ctrlAs: string = CTRL_AS;

    constructor (protected $scope: angular.IScope) {
        super();
    }
}

const CTRL_AS = 'checkboxVM';

export let blankCheckbox: angular.IComponentOptions = {
    templateUrl: require('./blank-checkbox.component.jade'),
    controller: BlankCheckboxController,
    controllerAs: CTRL_AS,
    bindings: {
        form: '<',
        label: '@',
        model: '=',
        name: '@',
        required: '<'
    }
};
