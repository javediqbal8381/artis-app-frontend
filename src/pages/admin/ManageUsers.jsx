import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Switch, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  DialogContentText
} from '@mui/material';
import { usersApi } from '../../redux/api/userApi';

const ManageUsers = () => {

  // State for dialog
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const {data:users, isLoading: usersLoading, isError:UsersError, refetch: refetchUsers} = usersApi.useGetAllUsersQuery()
  const [deleteUser, { isError: isDeletingUserError, }] = usersApi.useDeleteUserMutation();
  const [editUser, { isError, isLoading, isSuccess }] = usersApi.useEditUserInfoMutation()

  // Function to open dialog for editing user
  const handleEditUser = (e, user) => {
      editUser({ userId: user._id, userData:{ active: e.target.checked }})
  };

  // Function to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to open dialog for deleting user
  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

    // Function to delete user
    const handleConfirmDelete = () => {
      deleteUser(userToDelete)
      setTimeout(() => {
        refetchUsers()
      }, 3000);
        setOpenDeleteDialog(false);
      };


  // Function to update user
  const handleUpdateUser = () => {
    // Update user with edited details (you can implement this functionality as per your backend logic)
    console.log('Updated user:', editedUser);
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" mb={4}>Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>
                  <Switch onChange={(e) => handleEditUser(e, user)} checked={user.active} />
                </TableCell>
                <TableCell>
                  <Button className = "normal_btn" variant="outlined" color="error" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="Username" fullWidth value={editedUser ? editedUser.username : ''} onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} />
          <TextField label="Email" fullWidth value={editedUser ? editedUser.email : ''} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
          <TextField label="Mobile" fullWidth value={editedUser ? editedUser.mobile : ''} onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button className = "normal_btn" onClick={handleClose}>Cancel</Button>
          <Button className = "normal_btn" onClick={handleUpdateUser} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className = "normal_btn" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button className = "normal_btn" onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageUsers;
