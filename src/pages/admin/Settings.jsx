import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Divider,
  Typography
} from '@mui/material';
import { usersApi } from '../../redux/api/userApi';

const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const user = localStorage.getItem("userId")
  const { data: userData, isError: getUserDataError } = usersApi.useGetUserInfoQuery(user);
  const [editUser, { isError, isLoading, isSuccess }] = usersApi.useEditUserInfoMutation()

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
    }
  }, [userData])


  const saveChanges = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    editUser({ userId: user, userData:{ email, password }})
};
return (
  <div className="max-w-3xl mx-auto px-4 py-8">
    {/* Account Settings */}
    <div className="mb-8">
      <Typography variant="h4" className="mb-4">Account Settings</Typography>
      <Typography>
        Enter to update admin info
      </Typography>
      <br />
      <br />
      <Divider />
      <TextField
        label="Email"
        fullWidth
        className="mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <TextField
        label="Password"
        type="password"
        fullWidth
        className="mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        className="mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={error !== ""}
        helperText={error}
      />
      <br /><br />
      <Button
        className="mr-4 normal_btn"
        variant="contained"
        color="primary"
        onClick={saveChanges}
      >
        Save Changes
      </Button>
    </div>
  </div>
);
}

export default Settings;
