import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { gsap } from 'gsap';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  lastLogin: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      avatar: 'JD',
      lastLogin: '2024-01-15 10:30',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      role: 'User',
      status: 'active',
      avatar: 'SS',
      lastLogin: '2024-01-15 09:15',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Moderator',
      status: 'inactive',
      avatar: 'MJ',
      lastLogin: '2024-01-14 16:45',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'User',
      status: 'pending',
      avatar: 'ED',
      lastLogin: 'Never',
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'User',
      status: 'active',
      avatar: 'DW',
      lastLogin: '2024-01-15 11:20',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    // Animate table rows
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('tr');
      gsap.fromTo(rows,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.05,
          delay: 0.2,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? selectedUser : user
      ));
    }
    handleCloseDialog();
  };

  return (
    <Box>
      {/* Header */}
      <Box ref={headerRef} sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage system users and their permissions
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add User
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card ref={tableRef}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'background.default' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Last Login</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {user.avatar}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        size="small"
                        color={getStatusColor(user.status) as any}
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditUser(user)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={selectedUser?.name || ''}
              onChange={(e) => setSelectedUser(prev => prev ? {...prev, name: e.target.value} : null)}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={selectedUser?.email || ''}
              onChange={(e) => setSelectedUser(prev => prev ? {...prev, email: e.target.value} : null)}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={selectedUser?.role || ''}
                label="Role"
                onChange={(e) => setSelectedUser(prev => prev ? {...prev, role: e.target.value} : null)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Moderator">Moderator</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedUser?.status || ''}
                label="Status"
                onChange={(e) => setSelectedUser(prev => prev ? {...prev, status: e.target.value as any} : null)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage; 