import * as angular from 'angular';

import {FaceService} from '../share/face.service';
import {GoToFace} from '../share/mixins/go-to-face.minix';

export class PageHeaderController extends GoToFace() implements angular.IComponentController {

    public static $inject = [
        '$state',
        'faceService'
    ];

    public mainForm: string = 'mainFormId';

    protected ctrlAs: string = CTRL_AS;

    constructor (
        protected $state: ng.ui.IStateService,
        protected faceService: FaceService
    ) {
        super();
    }
}

const CTRL_AS = 'headerVM';

export let pageHeader: angular.IComponentOptions = {
    templateUrl: require('./header.component.html'),
    controller: PageHeaderController,
    controllerAs: CTRL_AS,
    bindings: {}
};
