import "./BuildingPage.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Building, Floor, Room } from "../../models/Building";
import BuildingMap from "../../components/BuildingMap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function RoomInfo({
  room,
  selectRoom,
}: {
  room: Room;
  selectRoom: (room: Room | null) => void;
}) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => selectRoom(null)}>
          <KeyboardReturnIcon />
        </IconButton>
        <Typography fontSize={20} style={{ marginLeft: "8px" }}>
          {room.name}
        </Typography>
      </div>
      <div className="building-room-calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={room.events}
        />
      </div>
    </>
  );
}

function BuildingRooms({
  building,
  selectRoom,
}: {
  building: Building;
  selectRoom: (room: Room | null) => void;
}) {
  return (
    <div className="building-rooms">
      {building.floors.map((floor: Floor) => (
        <Accordion className="building-floor">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {floor.name}
          </AccordionSummary>
          {floor.rooms.map((room: Room) => (
            <AccordionDetails
              onClick={() => selectRoom(room)}
              className="building-room"
            >
              {room.name}
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </div>
  );
}

function BuildingPage() {
  const location = useLocation();
  const buildingsState = useAppSelector((state) => state.buildings);
  const building =
    buildingsState.buildings
      ?.filter(
        (building: Building) =>
          building.id === location.pathname.split("/").pop()
      )
      .pop() || null;
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return building ? (
    <div className="building-content">
      <Paper elevation={2} className="building-main-content">
        {selectedRoom ? (
          <RoomInfo room={selectedRoom} selectRoom={setSelectedRoom} />
        ) : (
          <BuildingMap building={building} />
        )}
      </Paper>
      <div className="building-side-content">
        <Paper elevation={2} className="building-info">
          <Typography variant="h5">{building.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {building.address}
          </Typography>
          <BuildingRooms building={building} selectRoom={setSelectedRoom} />
        </Paper>
        <img className="building-img" src={building.img} />
      </div>
    </div>
  ) : (
    <>404</>
  );
}

export default BuildingPage;
