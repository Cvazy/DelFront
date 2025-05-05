import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  ListItemButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
  AccountCircle,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useLogoutMutation, removeAuthTokens } from "shared/api";

const drawerWidth = 240;

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  width: "100%",
  display: "flex",
});

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
      removeAuthTokens();
    }

    handleAccountMenuClose();
    navigate("/login");
  };

  const getPageTitle = () => {
    const pathname = location.pathname;

    if (pathname === "/") return "Список доставок";
    if (pathname === "/create") return "Создание доставки";
    if (pathname.startsWith("/delivery/")) return "Редактирование доставки";
    if (pathname === "/report") return "Отчеты";
    if (pathname === "/login") return "Вход";

    return "Доставка";
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, pt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: "primary.main" }}>
          <Typography variant="h5">ДС</Typography>
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Доставка Систем
        </Typography>
      </Box>

      <Divider />

      <List>
        <StyledLink to="/">
          <ListItemButton selected={isActive("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Список доставок" />
          </ListItemButton>
        </StyledLink>

        <StyledLink to="/create">
          <ListItemButton selected={isActive("/create")}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Создать доставку" />
          </ListItemButton>
        </StyledLink>

        <StyledLink to="/report">
          <ListItemButton selected={isActive("/report")}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Отчеты" />
          </ListItemButton>
        </StyledLink>
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ borderRadius: "0px" }}
        aria-label="menu"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>

          <IconButton onClick={handleAccountMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Выйти</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Боковое меню для больших экранов */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      {/* Боковое меню для мобильных устройств */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Отступ для контента */}
      <Toolbar />
    </>
  );
};

export default Navbar;
