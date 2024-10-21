import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useState } from "react";
import { Building } from "../models/Building";
import { filterBuildings } from "../store/buildingsSlice";
import { logoutUser, setUser } from "../store/userSlice";
import { User } from "../models/User";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

function SearchBar({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const search = () => {
    navigate("/");
    const regex = new RegExp(searchText, "i");
    dispatch(
      filterBuildings((building: Building) => regex.test(building.name))
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
        className="navbar-search"
        sx={{ ".MuiOutlinedInput-root": { borderRadius: 5 } }}
      />
      <IconButton onClick={search} className="navbar-search-button">
        <SearchIcon />
      </IconButton>
    </>
  );
}

function UserAvatar({ user }: { user: User }) {
  const showText = !useMediaQuery("(max-width: 1000px)");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setMenu] = useState(false);

  const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
    setMenu(!openMenu);
  };
  const nameToInitials = (name: string) =>
    name ? name.split(" ").reduce((acc, e) => acc + e[0], "") : "";
  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div onClick={toggleMenu} className="avatar">
      <Avatar className="avatar-img">{nameToInitials(user.name)}</Avatar>
      {showText ? (
        <div className="avatar-text">
          <Typography fontSize={15}>{user.name}</Typography>
          <Typography fontSize={13} color="text.secondary">
            {user.email}
          </Typography>
        </div>
      ) : (
        <KeyboardArrowDownIcon className="avatar-dropdown" />
      )}
      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        className="avatar-menu"
        slotProps={{ paper: { sx: { width: "200px" } } }}
      >
        <MenuItem
          className="avatar-menu-item"
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon />
          <Typography className="avatar-menu-text">Settings</Typography>
        </MenuItem>
        <MenuItem className="avatar-menu-item" onClick={logout}>
          <LogoutIcon color="error" />
          <Typography color="error" className="avatar-menu-text">
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

function LogInButton() {
  const dispatch = useDispatch();
  const onSuccess = (credentials: CredentialResponse) => {
    if (credentials.credential) {
      const userInfo = jwtDecode(credentials.credential) as User;
      dispatch(
        setUser({
          name: userInfo.name,
          username: userInfo.username,
          email: userInfo.email,
        })
      );
    }
  };
  const onError = () => {};

  return (
    <div className="login-button">
      <GoogleLogin
        text="signin"
        shape="pill"
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
}

function Navbar() {
  const showTitle = !useMediaQuery("(max-width: 1000px)");
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const navigateHome = () => {
    setSearchText("");
    dispatch(filterBuildings(() => true));
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <IconButton className="navbar-icon-button">
          <MenuIcon />
        </IconButton>
        {showTitle && (
          <Typography
            fontSize={20}
            fontWeight={500}
            width={172}
            onClick={navigateHome}
            className="navbar-button"
          >
            Campus Navigator
          </Typography>
        )}
      </div>
      <div className="navbar-middle">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>
      <div className="navbar-right">
        {userState ? <UserAvatar user={userState} /> : <LogInButton />}
      </div>
    </div>
  );
}

export default Navbar;
