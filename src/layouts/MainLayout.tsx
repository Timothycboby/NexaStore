import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Container,
  Paper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  TableChart as TableChartIcon,
  QueryStats as QueryStatsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { gsap } from 'gsap';

const drawerWidth = 240;

const navItems = [
  { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { to: '/users', label: 'Users', icon: <PeopleIcon /> },
  { to: '/tables', label: 'Tables', icon: <TableChartIcon /> },
  { to: '/queries', label: 'Queries', icon: <QueryStatsIcon /> },
];

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations for sidebar
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current, 
        { x: -drawerWidth },
        { x: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // GSAP animations for content
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Nexamine
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label="Admin" 
              color="primary" 
              size="small"
              icon={<AccountCircleIcon />}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        ref={sidebarRef}
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
        ref={contentRef}
      >
        <Container maxWidth="xl">
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              backgroundColor: 'background.default',
              borderRadius: 2,
              minHeight: 'calc(100vh - 120px)'
            }}
          >
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

const DrawerContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Nexamine
        </Typography>
      </Box>
      <Divider />
      <List sx={{ pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              selected={location.pathname === item.to}
              onClick={() => navigate(item.to)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default MainLayout; 