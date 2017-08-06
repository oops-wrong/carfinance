export let BlankZero: Function & angular.IDirectiveFactory;

export default BlankZero = function(): angular.IDirective {
    return {
        link: link,
        require: 'ngModel',
        restrict: 'A',
        scope: {
            blankZero: '='
        }
    };

    function link(scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ng.IController | any) {
        ctrl.$validators.zero = function(modelValue) {
            if (modelValue === void 0) {
                // consider empty models to be valid
                return true;
            }

            if (modelValue === '0' && scope['blankZero'] === '0') {
                // it is invalid
                return false;
            }

            // it is valid
            return true;
        };
    }
};

BlankZero.$inject = [];
