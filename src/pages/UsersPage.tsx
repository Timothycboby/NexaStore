import React from 'react';
import UserList from '../features/users/UserList';

const UsersPage: React.FC = () => {
  return (
    <div>
      <h1>Users Management</h1>
      <UserList />
    </div>
  );
};

export default UsersPage; 