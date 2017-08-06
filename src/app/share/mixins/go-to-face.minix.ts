import {Constructor} from './common';
import {faceTemplateParam} from '../../face/face.controller';
import {FaceService} from '../face.service';

export const GoToFace = <T extends Constructor<object>>(Base: T = class {} as T) =>
    class extends Base {
        protected $state: ng.ui.IStateService;
        protected faceService: FaceService;

        constructor(...args: any[]) {
            super(...args);
        }

        public getGoToFaceSref(): string {
            let currentTemplateName = this.faceService.getCurrentTemplateName();

            return `main.face({ ${faceTemplateParam}: '${currentTemplateName}' })`;
        }
    };
