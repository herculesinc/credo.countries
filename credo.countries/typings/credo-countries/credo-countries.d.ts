declare module "credo-countries" {

    export function find(codeOrName: string): Country;
    
    export interface Country {
        alpha2: string;
        alpha3: string;
        name: {
            common: string;
            official: string;
        },
        tld: string[],
        currencies: string[],
        callingCodes: string[],
        languages: string[]
    }
}