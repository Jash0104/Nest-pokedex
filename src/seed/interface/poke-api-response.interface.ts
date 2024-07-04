export interface PokeAPIResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  PokeSmall[];
}

export interface PokeSmall {
    name: string;
    url:  string;
}
