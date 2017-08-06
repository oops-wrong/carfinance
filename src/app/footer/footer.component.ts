import * as angular from 'angular';

export class PageFooterController implements angular.IComponentController {

    public static $inject = [
        '$state'
    ];

    protected ctrlAs: string = CTRL_AS;

    constructor (private $state: ng.ui.IStateService) {}

    public isCongratulations(): boolean {
        let  isCongratulations: boolean = false;

        if (this.$state.current.name === 'main.congratulations' || this.$state.current.name === 'congratulations') {
            isCongratulations = true;
        }

        return isCongratulations;
    }
}

const CTRL_AS = 'footerVM';

export let pageFooter: angular.IComponentOptions = {
    templateUrl: require('./footer.component.html'),
    controller: PageFooterController,
    controllerAs: CTRL_AS,
    bindings: {}
};
