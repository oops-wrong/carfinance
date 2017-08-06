import * as angular from 'angular';

import {BlankValidator} from '../validation-alert/blank-validator';

export class blankRadioController extends BlankValidator {

    public static $inject = ['$scope'];
    public label: string;
    public model: any;
    public required: boolean;
    public values: RadioChoice[];

    protected ctrlAs: string = CTRL_AS;

    constructor (protected $scope: angular.IScope) {
        super();
    }
}

const CTRL_AS = 'radioVM';

export let blankRadio: angular.IComponentOptions = {
    templateUrl: require('./blank-radio.component.jade'),
    controller: blankRadioController,
    controllerAs: CTRL_AS,
    bindings: {
        form: '<',
        label: '@',
        model: '=',
        name: '@',
        required: '<',
        values: '<'
    }
};

export type RadioChoice = string [][];
