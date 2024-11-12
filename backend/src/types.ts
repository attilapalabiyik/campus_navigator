// types.ts

export interface User {
    name: string;
    username: string;
    email: string;
  }
  
  export interface Building {
    id: string;
    name: string;
    address?: string;
    location: {
      lat: number;
      lng: number;
    };
    img?: string;
    floors: Array<{
      name: string;
      rooms: Array<{
        name: string;
        events: Array<{
          title: string;
          start: Date;
          end: Date;
        }>;
        attributes: string[];
      }>;
    }>;
  }
  