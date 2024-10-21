import "./BuildingPage.css";
import { Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Building } from "../../models/Building";

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

  return building ? (
    <div className="building-content">
      <Paper elevation={2} className="building-main-content"></Paper>
      <div className="building-side-content">
        <Paper elevation={2} className="building-info">
          <Typography variant="h5">{building.name}</Typography>
        </Paper>
        <img className="building-img" src={building.img} />
      </div>
    </div>
  ) : (
    <>404</>
  );
}

export default BuildingPage;
