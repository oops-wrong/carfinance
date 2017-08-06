import * as angular from 'angular';

import {BlankValidator} from '../validation-alert/blank-validator';

export class BlankInputNumberController extends BlankValidator {

    public static $inject = ['$scope'];
    public disabled: boolean;
    public icon: string;
    public info: string;
    public isHighlightedAddon: boolean;
    public label: string;
    public model: any;
    public max: number;
    public min: number;
    public required: boolean;
    public step: number;

    protected ctrlAs: string = CTRL_AS;

    constructor (protected $scope: angular.IScope) {
        super();
    }

    public changeIsHighlightedAddon() {
        this.isHighlightedAddon = !this.isHighlightedAddon;
    }
}

const CTRL_AS = 'inputVM';

export let blankInputNumber: angular.IComponentOptions = {
    templateUrl: require('./blank-input-number.component.jade'),
    controller: BlankInputNumberController,
    controllerAs: CTRL_AS,
    bindings: {
        disabled: '<',
        form: '<',
        icon: '@',
        info: '@',
        label: '@',
        max: '@',
        min: '@',
        model: '=',
        name: '@',
        required: '<',
        step: '@'
    }
};
