import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Avatar,
  TextField,
  Tooltip,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Users.css";

export default function Users() {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        const { name, profilePic } = params.row;

        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              src={profilePic}
              alt={name}
              sx={{ bgcolor: profilePic ? "transparent" : "#1976d2" }}
              className="profilePic"
            >
              {!profilePic && name.charAt(0).toUpperCase()}
            </Avatar>
            <span>{name}</span>
          </Box>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "purchasedBooks", headerName: "Purchased Books", width: 150 },
    { field: "registrationDate", headerName: "Registration Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <DeleteIcon
              onClick={() => handleOpenDeleteModal(params.row)}
              className="deleteBtn"
            />
            <button
              className="editBtn"
              onClick={() => handleOpenEditModal(params.row)}
            >
              Edit
            </button>
          </Box>
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    profilePic: "",
    purchasedBooks: "",
    registrationDate: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const usersData = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        index: index + 1,
        ...doc.data(),
      }));
      setRows(usersData);
    } catch (error) {
      console.error("Error fetching users data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddUserModal = () => {
    setOpenAddUser(true);
  };

  const handleCancelAddUser = () => {
    setOpenAddUser(false);
    setNewUser({
      name: "",
      email: "",
      profilePic: "",
      purchasedBooks: "",
      registrationDate: "",
      status: "",
    });
    setErrors({});
  };

  const validateFields = () => {
    let newErrors = {};
    if (!newUser.name.trim()) newErrors.name = "Name is required.";
    if (!newUser.email.trim()) newErrors.email = "Email is required.";
    if (!newUser.purchasedBooks) newErrors.purchasedBooks = "Purchased Books is required.";
    if (!newUser.registrationDate.trim()) newErrors.registrationDate = "Registration Date is required.";
    if (!newUser.status.trim()) newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validateFields()) return;
    try {
      await addDoc(collection(db, "Users"), {
        ...newUser,
        purchasedBooks: parseFloat(newUser.purchasedBooks),
      });
      fetchData();
      setOpenAddUser(false);
      setNewUser({
        name: "",
        email: "",
        profilePic: "",
        purchasedBooks: "",
        registrationDate: "",
        status: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleOpenDeleteModal = (user) => {
    setOpenDeleteUser(true);
    setUserToDelete(user);
  };

  const handleCloseModal = () => setOpenDeleteUser(false);

  const handleConfirmModal = async () => {
    if (userToDelete) {
      await deleteHandler(userToDelete.id);
      setOpenDeleteUser(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "Users", id));
      setRows((prevState) => prevState.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenEditModal = (user) => {
    setOpenEditUser(true);
    setUserToEdit(user);
  };

  const handleSaveChanges = async () => {
    if (!userToEdit) return;

    const userRef = doc(db, "Users", userToEdit.id);

    try {
      await updateDoc(userRef, {
        name: userToEdit.name,
        email: userToEdit.email,
      });

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === userToEdit.id ? userToEdit : row))
      );

      setOpenEditUser(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Modal
        open={openAddUser}
        onClose={() => setOpenAddUser(false)}
        closeAfterTransition
        aria-labelledby="edit-user-modal-title"
        scroll="paper"
      >
        <Fade in={openAddUser}>
          <Box
            className="modalBox"
            sx={{
              minWidth: { sm: "400px", md: "700px" },
              maxHeight: "70vh",
              overflowY: "auto",
              p: 3,
              bgcolor: "background.paper",
              borderRadius: "8px",
            }}
          >
            <Typography id="edit-user-modal-title" variant="h6" mb={2}>
              Add New User
            </Typography>
            <Box
              gap={2}
              sx={{
                flexGrow: "noWrap",
              }}
            >
              <TextField
                error={!!errors.name}
                helperText={errors.name}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                margin="normal"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <TextField
                error={!!errors.profilePic}
                helperText={errors.profilePic}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Profile Picture"
                variant="outlined"
                margin="normal"
                value={newUser.profilePic}
                onChange={(e) =>
                  setNewUser({ ...newUser, profilePic: e.target.value })
                }
              />
              <TextField
                error={!!errors.purchasedBooks}
                helperText={errors.purchasedBooks}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Purchased Books"
                variant="outlined"
                type="number"
                margin="normal"
                value={newUser.purchasedBooks}
                onChange={(e) =>
                  setNewUser({ ...newUser, purchasedBooks: e.target.value })
                }
              />
              <TextField
                error={!!errors.registrationDate}
                helperText={errors.registrationDate}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Registration Date"
                variant="outlined"
                margin="normal"
                value={newUser.registrationDate}
                onChange={(e) =>
                  setNewUser({ ...newUser, registrationDate: e.target.value })
                }
              />
              <TextField
                error={!!errors.status}
                helperText={errors.status}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Status"
                variant="outlined"
                margin="normal"
                value={newUser.status}
                onChange={(e) =>
                  setNewUser({ ...newUser, status: e.target.value })
                }
              />

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  sx={{ marginRight: "1rem" }}
                  onClick={handleCancelAddUser}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  mr={2}
                  onClick={handleAddUser}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Tooltip title="Add New User" arrow>
        <Fab
          onClick={handleOpenAddUserModal}
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 10,
            right: 16,
            zIndex: 9000,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal
        open={openDeleteUser}
        onClose={handleCloseModal}
        closeAfterTransition
        aria-labelledby="animated-modal-title"
        aria-describedby="animated-modal-description"
        sx={{ pointerEvents: openDeleteUser ? "auto" : "none" }}
      >
        <Fade in={openDeleteUser}>
          <Box className="modalBox">
            <Typography
              id="animated-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Are you sure you want to delete "{userToDelete?.name}" ?
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="outlined"
                sx={{ marginRight: "1rem" }}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                mr={2}
                onClick={handleConfirmModal}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={openEditUser}
        onClose={() => setOpenEditUser(false)}
        closeAfterTransition
        aria-labelledby="edit-user-modal-title"
      >
        <Fade in={openEditUser}>
          <Box
            className="modalBox"
            sx={{ minWidth: { sm: "400px", md: "700px" } }}
          >
            <Typography id="edit-user-modal-title" variant="h6" mb={2}>
              Edit User
            </Typography>
            {userToEdit && (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  defaultValue={userToEdit.name}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, name: e.target.value })
                  }
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue={userToEdit.email}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, email: e.target.value })
                  }
                />

                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="outlined"
                    sx={{ marginRight: "1rem" }}
                    onClick={() => setOpenEditUser(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    mr={2}
                    onClick={handleSaveChanges}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>

      <div className="usersBox">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pagination
          paginationMode="client"
          pageSizeOptions={[10, 15, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
}