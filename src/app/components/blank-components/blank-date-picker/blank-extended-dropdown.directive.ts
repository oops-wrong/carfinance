export let BlankExtendedDropdown: Function & angular.IDirectiveFactory;

export default BlankExtendedDropdown = function($timeout: ng.ITimeoutService): angular.IDirective {
    return {
        link: link,
        restrict: 'A',
        scope: {
            blankExtendedDropdown: '='
        }
    };

    function link(scope: ng.IScope, elem: ng.IAugmentedJQuery) {
        $(elem).on('show.bs.dropdown', () => {
            scope.$apply(() => {
                scope['blankExtendedDropdown'] = true;
            });
        });
        $(elem).on('hide.bs.dropdown', () => {
            $timeout(() => {
                scope['blankExtendedDropdown'] = false;
            });
        });
    }
};

BlankExtendedDropdown.$inject = [
    '$timeout'
] as any;
