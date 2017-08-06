import * as angular from 'angular';

export class FaqController implements angular.IComponentController {

    public static $inject = [];
    public answer: string;
    public collapseId: string;
    public headingId: string;
    public parentNode: string;
    public question: string;

    protected ctrlAs: string = CTRL_AS;

    constructor () {}

    public $onInit() {}
}

const CTRL_AS = 'faqVM';

export let faq: angular.IComponentOptions = {
    templateUrl: require('./faq.component.jade'),
    controller: FaqController,
    controllerAs: CTRL_AS,
    transclude: true,
    bindings: {
        answer: '@',
        collapseId: '@',
        headingId: '@',
        parentNode: '@',
        question: '@',
    }
};
