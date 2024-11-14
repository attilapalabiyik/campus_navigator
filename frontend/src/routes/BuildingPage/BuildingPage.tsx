import "./BuildingPage.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Building, Floor, Room } from "../../../../models/Building";
import BuildingMap from "../../components/BuildingMap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getBuildingById } from "../../services";

function RoomInfo({
  room,
  setSelectedRoom,
}: {
  room: Room;
  selectedRoom: Room;
  setSelectedRoom: (room: Room | null) => void;
}) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => setSelectedRoom(null)}>
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
  selectedRoom,
  setSelectedRoom,
}: {
  building: Building;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
}) {
  return (
    <div className="building-rooms">
      {building.floors.map((floor: Floor) => (
        <Accordion className="building-floor">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {floor.name}
          </AccordionSummary>
          {floor.rooms
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((room: Room) => (
              <AccordionDetails
                onClick={() => setSelectedRoom(room)}
                className={
                  room === selectedRoom
                    ? "building-room-selected"
                    : "building-room"
                }
              >
                {room.name}
              </AccordionDetails>
            ))}
        </Accordion>
      ))}
    </div>
  );
}

function BuildingNotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100dvh - 72px)",
      }}
    >
      <Typography fontSize={24} margin={2}>
        Sorry, we couldn't find that building!
      </Typography>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
}

function BuildingPage() {
  const location = useLocation();
  const buildingId = location.pathname.split("/").pop();
  interface BuildingState {
    building: Building | null;
    status: "pending" | "fulfilled" | "rejected";
  }
  const [buildingState, setBuilding] = useState<BuildingState>({
    building: null,
    status: "pending",
  });
  useEffect(() => {
    const fetchBuilding = async () => {
      if (buildingId) {
        try {
          const building = await getBuildingById(buildingId);
          setBuilding({ building: building, status: "fulfilled" });
        } catch {
          setBuilding({ building: null, status: "rejected" });
        }
      }
    };
    fetchBuilding();
  }, [buildingId]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return buildingState.status === "fulfilled" && buildingState.building ? (
    <div className="building-content">
      <Paper elevation={2} className="building-main-content">
        {selectedRoom ? (
          <RoomInfo
            room={selectedRoom}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        ) : (
          <BuildingMap building={buildingState.building} />
        )}
      </Paper>
      <div className="building-side-content">
        <Paper elevation={2} className="building-info">
          <Typography variant="h5">{buildingState.building.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {buildingState.building.address}
          </Typography>
          <BuildingRooms
            building={buildingState.building}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        </Paper>
        <img className="building-img" src={buildingState.building.img} />
      </div>
    </div>
  ) : buildingState.status === "pending" ? (
    <></>
  ) : (
    <BuildingNotFound />
  );
}

export default BuildingPage;
