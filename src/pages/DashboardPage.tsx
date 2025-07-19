import React, { useEffect, useRef } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Storage as StorageIcon,
  QueryStats as QueryStatsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { gsap } from 'gsap';

const DashboardPage: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate cards
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }

    // Animate stats
    if (statsRef.current) {
      gsap.fromTo(statsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }

    // Animate activity list
    if (activityRef.current) {
      const items = activityRef.current.children;
      gsap.fromTo(items,
        { opacity: 0, x: 20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <PeopleIcon />,
      color: '#6366f1',
      progress: 75,
    },
    {
      title: 'Active Tables',
      value: '56',
      icon: <StorageIcon />,
      color: '#8b5cf6',
      progress: 60,
    },
    {
      title: 'Queries Today',
      value: '892',
      icon: <QueryStatsIcon />,
      color: '#06b6d4',
      progress: 90,
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      icon: <TrendingUpIcon />,
      color: '#10b981',
      progress: 98,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New user registered',
      user: 'John Doe',
      time: '2 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      action: 'Database backup completed',
      user: 'System',
      time: '5 minutes ago',
      status: 'success',
    },
    {
      id: 3,
      action: 'Query optimization',
      user: 'Sarah Smith',
      time: '10 minutes ago',
      status: 'warning',
    },
    {
      id: 4,
      action: 'Table structure updated',
      user: 'Mike Johnson',
      time: '15 minutes ago',
      status: 'success',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <CheckCircleIcon color="success" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} ref={cardsRef} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                border: `1px solid ${stat.color}30`,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: stat.color,
                      mr: 2,
                      width: 48,
                      height: 48
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={stat.progress} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: `${stat.color}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stat.color,
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Card ref={statsRef}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                System Status
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Database</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">API Server</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Cache</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">File Storage</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card ref={activityRef}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Recent Activity
              </Typography>
              <List sx={{ mt: 1 }}>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        {getStatusIcon(activity.status)}
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.action}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.user} • {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 