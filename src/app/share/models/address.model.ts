export class Address {
    address_components: AddressComponent[];
    formatted_address: string;
}

export class AddressComponent {
    long_name: string;
    short_name: string;
    types: AddressComponentTypeName[];
}

export class AddressComponentType {
    public static readonly postal_code = 'postal_code';
    public static readonly postal_town = 'postal_town';
    public static readonly route = 'route';
    public static readonly street_number = 'street_number';
}
export type AddressComponentTypeName = keyof typeof AddressComponentType;

export class AddressContainer {
    details: Address;
}

export class AddressHelper {
    public static getComponent(address: Address, componentName: AddressComponentTypeName): AddressComponent {
        return address && _.find(address.address_components, addressComponent => {
                return ~addressComponent.types.indexOf(componentName);
            });
    }

    public static getHouse(address: Address): AddressComponent {
        return this.getComponent(address, AddressComponentType.street_number);
    }

    public static getPostcode(address: Address): AddressComponent {
        return this.getComponent(address, AddressComponentType.postal_code);
    }

    public static getStreet(address: Address): AddressComponent {
        return this.getComponent(address, AddressComponentType.route);
    }

    public static getTown(address: Address): AddressComponent {
        return this.getComponent(address, AddressComponentType.postal_town);
    }
}
