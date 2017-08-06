import {FaceService} from '../share/face.service';
import {FVehicleType} from '../share/models/form.model';
import {MiniForm} from '../share/models/mini-form.model';

export class FaceController implements ng.IController {

    public static $inject = [
        '$state',
        'faceService',
        '$analytics'
    ];
    public FVehicleType = FVehicleType;
    public miniForm = new MiniForm();
    public templateUrl: string;

    private templateParam: string;

    constructor(
        private $state: ng.ui.IStateService,
        private faceService: FaceService,
        private $analytics: any
    ) {}

    public $onInit() {
        this.setTemplate();
    }

    public miniFormSubmit(): void {
        this.$analytics.eventTrack('Filter', {  category: 'filter', label: 'filter' });
        this.$state.go('main.form', {
            'vehicle_type': this.miniForm.vehicle_type,
            'product_amount': this.miniForm.product_amount,
            'product_term': this.miniForm.product_term,
        });
    }

    private static setUnknownTemplate(): void {
        console.error('No template found');
    }

    private setTemplate(): void {
        this.templateParam = this.$state.params[faceTemplateParam] || FaceService.defaultTemplateName;
        this.setTemplateUrl();
    }

    private setTemplateUrl(): void {
        try {
            this.faceService.setCurrentTemplateName(this.templateParam);
            this.templateUrl = this.faceService.getTemplate(this.templateParam);
        } catch(e) {
            FaceController.setUnknownTemplate();
        }
    }
}

export const faceTemplateParam = 'template';
