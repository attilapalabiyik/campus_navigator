import { createSlice } from "@reduxjs/toolkit";
import { Building } from "../models/Building";

const buildings = [
  {
    id: "111111111111",
    name: "Thompson Hall",
    address: "240 Hicks Way, Amherst, MA 01003",
    location: {
      lat: 42.39019,
      lng: -72.52938,
    },
    img: "https://www.fmarchitecture.com/wp-content/uploads/2021/04/UMass-Thompson-Tower-Lobby-Door-210-1920x1200.jpg",
    floors: [
      {
        name: "Floor 1",
        rooms: [
          {
            name: "room 1",
            events: [
              {
                title: "Halloween Party",
                start: new Date(2024, 9, 31, 18, 0),
                end: new Date(2024, 9, 31, 23, 0),
              },
            ],
            attributes: [],
          },
          { name: "room 2", events: [], attributes: [] },
        ],
      },
      {
        name: "Floor 2",
        rooms: [
          { name: "room 3", events: [], attributes: [] },
          { name: "room 4", events: [], attributes: [] },
        ],
      },
      {
        name: "Floor 3",
        rooms: [
          { name: "room 5", events: [], attributes: [] },
          { name: "room 6", events: [], attributes: [] },
        ],
      },
    ],
  },
  {
    id: "222222222222",
    name: "Integrative Learning Center",
    address: "650 N Pleasant St, Amherst, MA 01003",
    location: {
      lat: 42.390961,
      lng: -72.526039,
    },
    img: "https://www.rrwindow.com/wp-content/uploads/2022/05/umassilc3_lg.jpg",
    floors: [
      {
        name: "Floor 1",
        rooms: [
          { name: "room 1", events: [], attributes: [] },
          { name: "room 2", events: [], attributes: [] },
        ],
      },
      {
        name: "Floor 2",
        rooms: [
          { name: "room 3", events: [], attributes: [] },
          { name: "room 4", events: [], attributes: [] },
        ],
      },
    ],
  },
] as Building[] | null;

const initialState = {
  buildings: buildings,
  filteredBuildings: buildings,
};

export const buildingSlice = createSlice({
  name: "buildings",
  initialState: initialState,
  reducers: {
    setBuildings: (_state, action) => {
      return { buildings: action.payload, filteredBuildings: action.payload };
    },
    filterBuildings: (state, action) => {
      return {
        buildings: state.buildings,
        filteredBuildings:
          state.buildings?.filter(action.payload) || state.filteredBuildings,
      };
    },
  },
});

export const { setBuildings, filterBuildings } = buildingSlice.actions;
export default buildingSlice.reducer;
