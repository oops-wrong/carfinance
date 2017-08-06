export class Option {
    displayName: string;
    value: string;
}

export class OptionWithIcon extends Option {
    icon: string;
}

export const fMonthOptions: Option[] = [
    {
        displayName: '0',
        value: '0'
    },
    {
        displayName: '1',
        value: '1'
    },
    {
        displayName: '2',
        value: '2'
    },
    {
        displayName: '3',
        value: '3'
    },
    {
        displayName: '4',
        value: '4'
    },
    {
        displayName: '5',
        value: '5'
    },
    {
        displayName: '6',
        value: '6'
    },
    {
        displayName: '7',
        value: '7'
    },
    {
        displayName: '8',
        value: '8'
    },
    {
        displayName: '9',
        value: '9'
    },
    {
        displayName: '10',
        value: '10'
    },
    {
        displayName: '11',
        value: '11'
    },
];

export const fYearOptions: Option[] = [
    {
        displayName: '0',
        value: '0'
    },
    {
        displayName: '1',
        value: '1'
    },
    {
        displayName: '2',
        value: '2'
    },
    {
        displayName: '3',
        value: '3'
    },
    {
        displayName: '4',
        value: '4'
    },
    {
        displayName: '5',
        value: '5'
    },
    {
        displayName: '6',
        value: '6'
    },
    {
        displayName: '7',
        value: '7'
    },
    {
        displayName: '8',
        value: '8'
    },
    {
        displayName: '9',
        value: '9'
    },
    {
        displayName: '10+',
        value: '10'
    },
];

export class CommonHelper {
    public static calculateYearPartByMonths(months: any): number {
        return _.round(_.toNumber(months) / 12, 2);
    }

    public static resetForm(form: ng.IFormController): void {
        form.$setUntouched();
        form.$setPristine();
    }
}
