import "./BuildingPage.css";
import { IconButton, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Building } from "../../models/Building";
import BuildingMap from "../../components/BuildingMap";
import MapIcon from "@mui/icons-material/Map";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useState } from "react";

type buildingContentModeType = "map" | "rooms";

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
  const [buildingContentMode, setBuildingContentMode] =
    useState<buildingContentModeType>("map");

  return building ? (
    <div className="building-content">
      <Paper elevation={2} className="building-main-content">
        {buildingContentMode === "map" && <BuildingMap building={building} />}
      </Paper>
      <div className="building-side-content">
        <Paper elevation={2} className="building-info">
          <Typography variant="h5">{building.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {building.address}
          </Typography>
          <div className="building-content-modes">
            <IconButton onClick={() => setBuildingContentMode("map")}>
              <MapIcon
                color={buildingContentMode === "map" ? "info" : "inherit"}
              />
            </IconButton>
            <IconButton onClick={() => setBuildingContentMode("rooms")}>
              <ApartmentIcon
                color={buildingContentMode === "rooms" ? "info" : "inherit"}
              />
            </IconButton>
          </div>
        </Paper>
        <img className="building-img" src={building.img} />
      </div>
    </div>
  ) : (
    <>404</>
  );
}

export default BuildingPage;
