import {module} from 'angular';

import {blankAutocomplete} from './components/blank-components/blank-autocomplete/blank-autocomplete.component';
import {blankButton} from './components/blank-components/blank-button/blank-button.component';
import {blankButtonNumber} from './components/blank-components/blank-button-number/blank-button-number.component';
import {blankCheckbox} from './components/blank-components/blank-checkbox/blank-checkbox.component';
import {blankDatePicker} from './components/blank-components/blank-date-picker/blank-date-picker.component';
import {BlankExtendedDropdown} from './components/blank-components/blank-date-picker/blank-extended-dropdown.directive';
import {blankInput} from './components/blank-components/blank-input/blank-input.component';
import {blankInputNumber} from './components/blank-components/blank-input-number/blank-input-number.component';
import {blankRadio} from './components/blank-components/blank-radio/blank-radio.component';
import {blankSelect} from './components/blank-components/blank-select/blank-select.component';
import {blankSelectDouble} from './components/blank-components/blank-select-double/blank-select-double.component';
import {BlankZero} from './components/blank-components/blank-select-double/blank-zero.directive';
import {validationAlert} from './components/blank-components/validation-alert/validation-alert.component';
import {faq} from './components/faq/faq.component';
import {CongratulationsController} from './congratulations/congratulations.controller';
import {FaceController} from './face/face.controller';
import {pageFooter} from './footer/footer.component';
import {FormController} from './form/form.controller';
import {formState} from './form-state/form-state.component';
import {pageHeader} from './header/header.component';
import {MainConfig} from './main.config';
import {MainController} from './main.controller';
import {ApiFactory} from './share/api.factory';
import {ErrorCatcherService} from './share/error-catcher.service';
import {$exceptionHandler} from './share/exception-handler.factory';
import {FaceService} from './share/face.service';
import {FormService} from './share/form.service';
import {Form} from './share/models/form.model';

let deps: Array<string> = [];

export default module('main.module', deps)
    .component('blankAutocomplete', blankAutocomplete)
    .component('blankButton', blankButton)
    .component('blankButtonNumber', blankButtonNumber)
    .component('blankCheckbox', blankCheckbox)
    .component('blankDatePicker', blankDatePicker)
    .component('blankInput', blankInput)
    .component('blankInputNumber', blankInputNumber)
    .component('blankRadio', blankRadio)
    .component('blankSelect', blankSelect)
    .component('blankSelectDouble', blankSelectDouble)
    .component('faq', faq)
    .component('formState', formState)
    .component('pageFooter', pageFooter)
    .component('pageHeader', pageHeader)
    .component('validationAlert', validationAlert)
    .config(MainConfig)
    .controller('CongratulationsController', CongratulationsController)
    .controller('FaceController', FaceController)
    .controller('FormController', FormController)
    .controller('MainController', MainController)
    .directive('blankExtendedDropdown', BlankExtendedDropdown)
    .directive('blankZero', BlankZero)
    .factory('api', ApiFactory)
    .factory('$exceptionHandler', $exceptionHandler)
    .service('errorCatcherService', ErrorCatcherService)
    .service('faceService', FaceService)
    .service('formService', FormService)
    .value('formModel', new Form())
    .name;
