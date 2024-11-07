export interface Event {
  title: string;
  start: Date;
  end: Date;
}

export interface Room {
  name: string;
  events: Event[];
  attributes: string[];
}

export interface Floor {
  name: string;
  rooms: Room[];
}

export interface Building {
  id: string;
  name: string;
  address?: string;
  location: Location;
  img?: string;
  floors: Floor[];
}

export interface Location {
  lat: number;
  lng: number;
}
