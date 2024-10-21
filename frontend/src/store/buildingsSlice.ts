import { createSlice } from "@reduxjs/toolkit";
import { Building } from "../models/Building";

const buildings = [
  {
    id: "111111111111",
    name: "Thompson Hall",
    address: "240 Hicks Way, Amherst, MA 01003",
    location: {
      latitude: 1,
      longitude: 1,
    },
    img: "https://www.fmarchitecture.com/wp-content/uploads/2021/04/UMass-Thompson-Tower-Lobby-Door-210-1920x1200.jpg",
  },
  {
    id: "222222222222",
    name: "Integrative Learning Center",
    address: "650 N Pleasant St, Amherst, MA 01003",
    location: {
      latitude: 2,
      longitude: 2,
    },
    img: "https://www.rrwindow.com/wp-content/uploads/2022/05/umassilc3_lg.jpg",
  },
  {
    id: "333333333333",
    name: "Life Sciences Laboratory",
    address: "240 Thatcher Rd, Amherst, MA 01003",
    location: {
      latitude: 3,
      longitude: 3,
    },
    img: "https://www.acentech.com/wp-content/uploads/2021/08/umass-life-science-lab-exterior-1800x1191.jpg",
  },
  {
    id: "444444444444",
    name: "Isenberg School of Management",
    address: "121 Presidents Dr, Amherst, MA 01003",
    location: {
      latitude: 4,
      longitude: 4,
    },
    img: "https://worldarchitecture.org/cdnimgfiles/extuploadb/leadimage-78-.png",
  },
  {
    id: "555555555555",
    name: "Design Building",
    address: "551 N Pleasant St, Amherst, MA 01003",
    location: {
      latitude: 5,
      longitude: 5,
    },
    img: "https://www.nordic.ca/data/images/project/slider/NORDIC_UMASS_Design_Building_3.jpg",
  },
  {
    id: "666666666666",
    name: "Tobin Hall",
    address: "135 Hicks Way, Amherst, MA 01003",
    location: {
      latitude: 6,
      longitude: 6,
    },
    img: "https://i.pinimg.com/736x/77/fa/67/77fa67cf445549ea827cb43509626d5e.jpg",
  },
  {
    id: "777777777777",
    name: "Campus Center",
    address: "1 Campus Center Way, Amherst, MA 01003",
    location: {
      latitude: 7,
      longitude: 7,
    },
    img: "https://www.umass.edu/sites/default/files/2023-09/campus_center%20_resized.jpg",
  },
  {
    id: "888888888888",
    name: "Student Union",
    address: "41 Campus Center Way, Amherst, MA 01002",
    location: {
      latitude: 8,
      longitude: 8,
    },
    img: "https://dailycollegian.com/wp-content/uploads/2021/12/51106943166_a30b4e864d_c.jpg",
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
