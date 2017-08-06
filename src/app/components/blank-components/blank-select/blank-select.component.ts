import * as angular from 'angular';

import {Option} from '../../../share/models/common.model';
import {BlankValidator} from '../validation-alert/blank-validator';

export class BlankSelectController extends BlankValidator {

    public static $inject = ['$scope'];
    public disabled: boolean;
    public info: string;
    public label: string;
    public model: any;
    public multiple: boolean;
    public options: Option[];
    public order: string;
    public required: boolean;
    public reverse: boolean = false;

    protected ctrlAs: string = CTRL_AS;

    constructor (protected $scope: angular.IScope) {
        super();
    }
}

const CTRL_AS = 'selectVM';

export let blankSelect: angular.IComponentOptions = {
    templateUrl: require('./blank-select.component.jade'),
    controller: BlankSelectController,
    controllerAs: CTRL_AS,
    bindings: {
        disabled: '<',
        form: '<',
        info: '@',
        label: '@',
        maxlength: '@',
        model: '=',
        multiple: '<',
        name: '@',
        options: '<',
        order: '<',
        required: '<',
        reverse: '<'
    }
};
