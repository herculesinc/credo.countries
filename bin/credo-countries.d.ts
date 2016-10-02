declare module "@credo/countries" {
    
    // INTERFACES
    // --------------------------------------------------------------------------------------------
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
    
    // PUBLIC FUNCTIONS
    // --------------------------------------------------------------------------------------------
    
    /**
     * Gets a country by alpha2 code (lower cose)
     */
    export function get(alpha2: string): Country;

    /**
     * Finds a country for the specified contry code (alpha2 or alpha3) or country name (common or official)
     */
    export function find(codeOrName: string): Country;
    
    /** 
     * Iterates over all countries and calls the callback function for each county
     */
    export function forEach(callback: (country: Country, index?: number) => any): void;
    
    /**
     * Maps all countries using provided callback funciton; if trimEmpty = true (default), excludes empty values from returned array
     */
    export function map<T>(callback: (country: Country, index?: number) => T, trimEmpty?: boolean): T[];
}