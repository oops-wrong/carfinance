import * as angular from 'angular';

import {FormState} from '../share/models/form-state.model';

export class FormStateController implements angular.IComponentController {

    public static $inject = [];
    public animationDuration: number;
    public description: string;
    public editState: (...rest) => any;
    public formState: FormState;
    public isDelayed = false;
    public number: number;
    public title: string;

    protected ctrlAs: string = CTRL_AS;

    constructor () {}

    public $onInit() {
        this.isDelayed = true;
    }
}

const CTRL_AS = 'formStateVM';

export let formState: angular.IComponentOptions = {
    templateUrl: require('./form-state.component.jade'),
    controller: FormStateController,
    controllerAs: CTRL_AS,
    transclude: true,
    bindings: {
        animationDuration: '<',
        description: '@',
        editState: '&',
        formState: '<',
        number: '@',
        title: '@',
    }
};
