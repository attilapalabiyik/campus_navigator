import "./HomePage.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Building } from "../../../../models/Building";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { setBuildings } from "../../store/buildingsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBuildings, patchUser } from "../../services";
import { setUser } from "../../store/userSlice";

function BuildingCard({ building }: { building: Building }) {
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateBuilding = (building: Building) => () =>
    navigate(`/building/${building.id}`);
  const savedBuilding = (building: Building) =>
    userState && userState.savedBuildings.includes(building.id);
  const saveBuilding = (building: Building) => {
    if (userState) {
      let newBuildings = userState.savedBuildings;
      if (savedBuilding(building)) {
        newBuildings = userState.savedBuildings.filter(
          (buildingId: string) => buildingId !== building.id
        );
      } else {
        newBuildings = userState.savedBuildings.concat([building.id]);
      }
      dispatch(
        setUser({
          ...userState,
          savedBuildings: newBuildings,
        })
      );
      patchUser(userState.id, { savedBuildings: newBuildings });
    }
  };
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
      <CardActions className="building-card-actions">
        <Button size="small" onClick={navigateBuilding(building)}>
          Learn More
        </Button>
        {userState && (
          <IconButton onClick={() => saveBuilding(building)}>
            <FavoriteIcon
              htmlColor={savedBuilding(building) ? "#dc2626" : "inherit"}
            />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

function BuildingsContent() {
  const userState = useAppSelector((state) => state.user);
  const buildingsState = useAppSelector((state) => state.buildings);
  const savedBuilding = (building: Building) =>
    userState && userState.savedBuildings.includes(building.id);

  return (
    <div className="buildings-content">
      {buildingsState &&
        [...buildingsState]
          .sort((a: Building, b: Building) =>
            savedBuilding(a) === savedBuilding(b)
              ? a.name.localeCompare(b.name)
              : savedBuilding(a)
              ? -1
              : 1
          )
          .map((building: Building) => <BuildingCard building={building} />)}
    </div>
  );
}

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBuildings = async () => {
      const buildings = await getBuildings();
      dispatch(setBuildings(buildings));
    };
    fetchBuildings();
  }, [dispatch]);

  return (
    <div className="home-content">
      <BuildingsContent />
    </div>
  );
}

export default HomePage;
