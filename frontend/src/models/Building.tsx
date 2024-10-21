export interface Building {
    id: string;
    name: string;
    address?: string;
    location: Location;
    img?: string;
}

export interface Location {
    latitude: number;
    longitude: number;
}