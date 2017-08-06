import * as angular from 'angular';

import {BlankValidator} from '../validation-alert/blank-validator';

export class BlankAutocompleteController extends BlankValidator {

    public static $inject = ['$scope'];
    public country = 'uk';
    public details: any;
    public disabled: boolean;
    public info: string;
    public label: string;
    public model: any;
    public required: boolean;

    protected ctrlAs: string = CTRL_AS;

    constructor (protected $scope: angular.IScope) {
        super();
    }
}

const CTRL_AS = 'autoVM';

export let blankAutocomplete: angular.IComponentOptions = {
    templateUrl: require('./blank-autocomplete.component.jade'),
    controller: BlankAutocompleteController,
    controllerAs: CTRL_AS,
    bindings: {
        details: '=',
        disabled: '<',
        form: '<',
        info: '@',
        label: '@',
        model: '=',
        name: '@',
        required: '<',
    }
};
