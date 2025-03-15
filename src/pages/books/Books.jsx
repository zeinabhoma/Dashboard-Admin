import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Avatar,
  Fab,
  Tooltip,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import { fakeBooks } from "../../datas";
import "./Books.css";

export default function Books() {
  const columns = [
    // {
    //   field: "index",
    //   headerName: "No.",
    //   flex: 0.5,
    // },
    {
      field: "book",
      headerName: "BOOk",
      width: 220,
      renderCell: (params) => {
        const { book, imageUrl } = params.row;

        return (
          <Box className="titleAndImg">
            <Avatar
              src={imageUrl}
              alt={book}
              sx={{ bgcolor: imageUrl ? "transparent" : "#1976d2" }}
              className="bookPic"
            >
              {!imageUrl && book.charAt(0).toUpperCase()}
            </Avatar>
            <span>{book}</span>
          </Box>
        );
      },
    },
    { field: "sales", headerName: "SALES", width: 120 },
    // { field: "price", headerName: "PRICE", width: 120 },
    {
      field: "price",
      headerName: "PRICE",
      width: 120,
      renderCell: (params) => {
        return <Box>$ {params.row.price} </Box>;
      },
    },
    {
      field: "rating",
      headerName: "RATING",
      width: 120,
      renderCell: (params) => {
        return <Box>⭐ {params.row.rating} </Box>;
      },
    },
    {
      field: "author",
      headerName: "AUTHOR",
      width: 180,
      renderCell: (params) => {
        return <Box className="authorBox">{params.row.author}</Box>;
      },
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={`/books/${params.row.id}`}>
            <button>View Details</button>
          </Link>
        );
      },
    },
  ];

  const [books, setBooks] = useState([]);

  const [openAddBook, setOpenAddBook] = useState(false);
  const [newBook, setNewBook] = useState({
    book: "",
    author: "",
    price: "",
    sales: "",
    rating: "",
    imageUrl: "",
    about: "",
    description: "",
  });
  const [errors, setErrors] = useState([]);

  const fetchBooks = async () => {
    try {
      const booksCollection = collection(db, "Books");
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    } catch (error) {
      console.error("Failed to fetch from Firebase:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOpenAddBookModal = () => {
    setOpenAddBook(true);
  };
  const handleCancelAddBook = () => {
    setOpenAddBook(false);
    setNewBook({
      book: "",
      author: "",
      price: "",
      sales: "",
      rating: "",
      imageUrl: "",
      about: "",
      description: "",
    });
  };
  const validateFields = () => {
    let newErrors = {};
    if (!newBook.book.trim()) newErrors.book = "Book name is required.";
    if (!newBook.author.trim()) newErrors.author = "Author name is required.";
    if (!newBook.price) newErrors.price = "Price is required.";
    if (!newBook.sales) newErrors.sales = "Sales is required.";
    if (!newBook.rating) newErrors.rating = "Rating is required.";
    if (!newBook.imageUrl.trim()) newErrors.imageUrl = "Image URL is required.";
    if (!newBook.about.trim()) newErrors.about = "About is required.";
    if (!newBook.description.trim())
      newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleAddBook = async () => {
    if (!validateFields()) return;
    try {
      await addDoc(collection(db, "Books"), {
        ...newBook,
        price: parseFloat(newBook.price),
        sales: parseInt(newBook.sales),
        rating: parseFloat(newBook.rating),
      });
      fetchBooks();
      setOpenAddBook(false);
      setNewBook({
        book: "",
        author: "",
        price: "",
        sales: "",
        rating: "",
        imageUrl: "",
        about: "",
        description: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        open={openAddBook}
        onClose={() => setOpenAddBook(false)}
        closeAfterTransition
        aria-labelledby="edit-user-modal-title"
        scroll="paper"
      >
        <Fade in={openAddBook}>
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
              Add New Book
            </Typography>
            <Box
              gap={2}
              sx={{
                flexGrow: "noWrap",
              }}
            >
              <TextField
                error={!!errors.book}
                helperText={errors.book}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Book"
                variant="outlined"
                margin="normal"
                value={newBook.book}
                onChange={(e) =>
                  setNewBook({ ...newBook, book: e.target.value })
                }
              />
              <TextField
                error={!!errors.author}
                helperText={errors.author}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Author"
                variant="outlined"
                margin="normal"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
              />
              <TextField
                error={!!errors.price}
                helperText={errors.price}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Price"
                variant="outlined"
                type="number"
                margin="normal"
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
              />
              <TextField
                error={!!errors.sales}
                helperText={errors.sales}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Sales"
                variant="outlined"
                type="number"
                margin="normal"
                value={newBook.sales}
                onChange={(e) =>
                  setNewBook({ ...newBook, sales: e.target.value })
                }
              />
              <TextField
                error={!!errors.rating}
                helperText={errors.rating}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Ratting"
                variant="outlined"
                type="number"
                margin="normal"
                value={newBook.rating}
                onChange={(e) =>
                  setNewBook({ ...newBook, rating: e.target.value })
                }
              />
              <TextField
                error={!!errors.imageUrl}
                helperText={errors.imageUrl}
                sx={{ minWidth: "25ch", width: "30ch", margin: "1rem" }}
                id="outlined-basic"
                label="Image URL"
                variant="outlined"
                margin="normal"
                value={newBook.imageUrl}
                onChange={(e) =>
                  setNewBook({ ...newBook, imageUrl: e.target.value })
                }
              />
              <TextField
                error={!!errors.about}
                helperText={errors.about}
                // sx={{ margin: "1rem" }}
                id="outlined-multiline-static"
                multiline
                rows={2}
                label="About"
                variant="outlined"
                margin="normal"
                fullWidth
                value={newBook.about}
                onChange={(e) =>
                  setNewBook({ ...newBook, about: e.target.value })
                }
              />
              <TextField
                error={!!errors.description}
                helperText={errors.description}
                // sx={{margin: "1rem" }}
                id="outlined-multiline-static"
                multiline
                label="Description"
                rows={4}
                variant="outlined"
                margin="normal"
                fullWidth
                value={newBook.description}
                onChange={(e) =>
                  setNewBook({ ...newBook, description: e.target.value })
                }
              />

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  sx={{ marginRight: "1rem" }}
                  onClick={handleCancelAddBook}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  mr={2}
                  onClick={handleAddBook}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Tooltip title="Add New Book" arrow>
        <Fab
          onClick={handleOpenAddBookModal}
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 9000,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <div className="usersBox">
        <DataGrid
          rows={books}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pagination
          paginationMode="client"
          pageSizeOptions={[5, 10, 15]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          rowHeight={100}
          style={{ width: "100%" }}
          sx={{
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #ddd",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      </div>
    </>
  );
}

//   <Box display="flex" alignItems="center" gap={1}>
//     {/* onClick={() => deleteHandler(params.row.id)}   */}
//     <DeleteIcon
//     onClick={()=> handleOpenModal(params.row.id)}
//     className="deleteBtn"
//     />
//   </Box>

// const fetchBooks = async () => {
//   const timeout = new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("Timeout: Cannot connect to Firebase")), 5000) // 5 ثانیه تایم‌اوت
//   );

//   const fetchFromFirebase = async () => {
//     const booksCollection = collection(db, "Books");
//     const booksSnapshot = await getDocs(booksCollection);
//     return booksSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   };

//   try {
//     const booksList = await Promise.race([fetchFromFirebase(), timeout]); // اولین Promises که کامل شود
//     setBooks(booksList);
//   } catch (error) {
//     console.error("Failed to fetch from Firebase:", error);
//     alert("مشکل در اتصال به Firebase. نمایش داده‌های آزمایشی...");
//     setBooks(fakeBooks); // داده‌های فیک را نمایش بده
//   }
// };

// const fetchBooks = async () => {
//   console.log("Fetching books started...");

//   const timeout = new Promise((_, reject) =>
//     setTimeout(() => {
//       console.error("Timeout reached!");
//       reject(new Error("Timeout: Cannot connect to Firebase"));
//     }, 5000)
//   );

//   const fetchFromFirebase = async () => {
//     console.log("Trying to fetch from Firebase...");
//     const booksCollection = collection(db, "Books");
//     const booksSnapshot = await getDocs(booksCollection);
//     console.log("Fetched data from Firebase:", booksSnapshot.docs);
//     return booksSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   };

//   try {
//     const booksList = await Promise.race([fetchFromFirebase(), timeout]);
//     console.log("Books fetched successfully:", booksList);
//     setBooks(booksList);
//   } catch (error) {
//     console.error("Failed to fetch from Firebase:", error);
//     alert("مشکل در اتصال به Firebase. نمایش داده‌های آزمایشی...");
//     setBooks(fakeBooks); // نمایش داده‌های فیک
//   }
// };

// const fetchBooks = async () => {
//   console.log("Fetching books started...");
//   let isFetched = false; // فلگ برای بررسی وضعیت درخواست

//   const timeout = new Promise((_, reject) =>
//     setTimeout(() => {
//       if (!isFetched) {
//         console.error("Timeout reached!");
//         reject(new Error("Timeout: Cannot connect to Firebase"));
//       }
//     }, 5000)
//   );

//   const fetchFromFirebase = async () => {
//     console.log("Trying to fetch from Firebase...");
//     const booksCollection = collection(db, "Books");
//     const booksSnapshot = await getDocs(booksCollection);
//     console.log("Fetched data from Firebase:", booksSnapshot.docs);
//     isFetched = true; // وقتی داده‌ها با موفقیت دریافت شد
//     return booksSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   };

//   try {
//     const booksList = await Promise.race([fetchFromFirebase(), timeout]);
//     console.log("Books fetched successfully:", booksList);
//     setBooks(booksList);
//   } catch (error) {
//     console.error("Failed to fetch from Firebase:", error);
//     alert("مشکل در اتصال به Firebase. نمایش داده‌های آزمایشی...");
//     setBooks(fakeBooks); // داده‌های فیک
//   }
// };
