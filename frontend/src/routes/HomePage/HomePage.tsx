import "./HomePage.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Building } from "../../models/Building";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

function BuildingCard({ building }: { building: Building }) {
  const navigate = useNavigate();
  const navigateBuilding = (building: Building) => () =>
    navigate(`/building/${building.id}`);
  return (
    <Card className="building-card">
      <CardMedia
        sx={{ height: 140, width: 400 }}
        image={building.img}
        title={building.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {building.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {building.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateBuilding(building)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

function HomeContent() {
  const buildingsState = useAppSelector((state) => state.buildings);
  return (
    <div className="home-content">
      {buildingsState.filteredBuildings &&
        buildingsState.filteredBuildings.map((building: Building) => (
          <BuildingCard building={building} />
        ))}
    </div>
  );
}

function HomePage() {
  return <HomeContent />;
}

export default HomePage;
