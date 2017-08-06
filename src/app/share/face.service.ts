import {faceTemplateParam} from '../face/face.controller';

export class FaceService {

    public static $inject = [
        '$state'
    ];
    public static readonly defaultTemplateName = 'default';

    private readonly templates = {
        [FaceService.defaultTemplateName]: require('../share/templates/default.html'),
        example: require('../share/templates/example.html'),
        terms: require('../share/templates/terms.html'),
        'instant-quote': require('../share/templates/instant-quote.html')
    };
    private currentTemplateName: string = FaceService.defaultTemplateName;

    constructor(
        private $state: ng.ui.IStateService
    ) {}

    public getCurrentTemplateName(): string {
        return this.currentTemplateName;
    }

    public getTemplate(templateName: string): string {
        let templateUrl = this.templates[templateName];

        if (!templateUrl) {
            throw new Error(`Unknown template name "${name}"`);
        }

        return templateUrl;
    }

    public goToFacePage(): void {
        this.$state.go('main.face', {[faceTemplateParam]: this.currentTemplateName});
    }

    public setCurrentTemplateName(templateName: string): void {
        this.currentTemplateName = templateName;
    }
}
