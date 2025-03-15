import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Modal,
  Fade,
  TextField,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Directions } from "@mui/icons-material";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  const [openEditBook, setOpenEditBook] = useState(false);
  const [openDeleteBook, setOpenDeleteBook] = useState(false)

  const fetchBook = async () => {
    try {
      const bookCollection = collection(db, "Books");
      const bookSnapshot = await getDocs(bookCollection);
      bookSnapshot.forEach((doc) => {
        if (doc.id === id) {
          setBook({ id: doc.id, ...doc.data() });
        }
      });
    } catch (error) {
      console.error("Failed to fetch from Firebase:", error);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  const handleOpenEditModal = () => {
    setOpenEditBook(true);
  };
  const handleSaveChanges = async () => {
    const userRef = doc(db, "Books", book.id);

    try {
      await updateDoc(userRef, {
        book: book.book,
        author: book.author,
        sales: book.sales,
        price: book.price,
        description: book.description,
      });

      setOpenEditBook(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };


  const handleOpenDeleteBook = () => setOpenDeleteBook(true)
  const handleConfirmModal = async () => {
    await deleteDoc(doc(db, "Books", id));
        setBook((prevState) => prevState.filter((book) => book.id !== id));
        setOpenDeleteBook(false);
        window.location.href = "/books";
        }

  const renderStars = (rating) => {
    let fullStars = Math.floor(rating);
    let emptyStars = 5 - fullStars;
    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} sx={{ color: "#FFD700" }} />); // ⭐
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarBorderIcon key={i + fullStars} sx={{ color: "#FFD700" }} />
      ); // ☆
    }

    return stars;
  };

  return (
    <>
      <Modal
        open={openDeleteBook}
        onClose={() => setOpenDeleteBook(false)}
        closeAfterTransition
        aria-labelledby="animated-modal-title"
        aria-describedby="animated-modal-description"
        sx={{ pointerEvents: openDeleteBook ? "auto" : "none" }}
      >
        <Fade in={openDeleteBook}>
          <Box className="modalBox">
            <Typography
              id="animated-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Are you sure you want to delete "{book.book}" ?
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="outlined"
                sx={{ marginRight: "1rem" }}
                onClick={() => setOpenDeleteBook(false)}
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
        open={openEditBook}
        onClose={() => setOpenEditBook(false)}
        closeAfterTransition
        aria-labelledby="edit-user-modal-title"
        scroll="paper"
      >
        <Fade in={openEditBook}>
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
              Edit Book
            </Typography>
            {book && (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Book"
                  defaultValue={book.book}
                  onChange={(e) => setBook({ ...book, book: e.target.value })}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Author"
                  defaultValue={book.author}
                  onChange={(e) => setBook({ ...book, author: e.target.value })}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Sales"
                  defaultValue={book.sales}
                  onChange={(e) => setBook({ ...book, sales: e.target.value })}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Price"
                  defaultValue={book.price}
                  onChange={(e) => setBook({ ...book, price: e.target.value })}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue={book.description}
                  onChange={(e) =>
                    setBook({ ...book, description: e.target.value })
                  }
                />

                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="outlined"
                    sx={{ marginRight: "1rem" }}
                    onClick={() => setOpenEditBook(false)}
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

      <Box
        sx={{
          maxWidth: 900,
          padding: "24px",
          position: "relative",
          marginTop: { md: "-9rem" },
          margin:"auto"
        }}
      >
        {/*  بخش اول: عکس + نام کتاب + نویسنده */}
        <Box
          sx={{
            transform: "translateY(40%)",
            backgroundColor: "transparent",
            padding: "1rem 1rem 1rem 4rem",
            zIndex: 2,
            display: { xs: "none", md: "block" },
          }}
        >
          <Grid container spacing={4}>
            {/* عکس کتاب */}
            <Grid item xs={12} sm={4} sx={{ paddingBottom: "2rem" }}>
              <CardMedia
                component="img"
                image={book.imageUrl || "/placeholder.png"}
                alt={book.book}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "2px",
                  boxShadow: "1px 2px 8px 3px rgba(0, 0, 0, 0.3)",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              mt={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography fontWeight="bold" sx={{ fontSize: "x-large" }}>
                {book.book}
              </Typography>
              <Typography color="text.secondary">{book.author}</Typography>
              <Typography>{book.about}</Typography>
              <Box
                sx={{
                  marginTop: "3rem",
                  gap: "1rem",
                  display: "flex",
                  marginLeft: "1rem",
                }}
              >
                <Button variant="outlined" color="error" onClick={handleOpenDeleteBook}>
                  Delete
                </Button>
                <Button variant="contained" onClick={handleOpenEditModal}>
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/*  بخش دوم: توضیحات + جزئیات */}
        <Card
          sx={{
            padding: { xs: "1rem", md: "9rem 2rem 2rem" },
            backgroundColor: "#ffffff",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
          }}
        >
          {/* <Button mt={3} 
              // sx={{direction:"rtl" }}
              > delete </Button> */}

          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: { xs: "block", md: "none" }, marginTop: "1rem" }}
            >
              <CardMedia
                component="img"
                image={book.imageUrl || "/placeholder.png"}
                alt={book.book}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "2px",
                  boxShadow: "1px 2px 8px 3px rgba(0, 0, 0, 0.3)",
                }}
              />
            </Grid>

            {/* نام کتاب و نویسنده (در موبایل داخل Card قرار می‌گیرد) */}
            <Grid
              item
              xs={12}
              sm={8}
              mt={3}
              sx={{
                display: { xs: "flex", md: "none" },
                marginTop: "1rem",
                alignItem: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  // marginTop: "1rem",
                  display: { xs: "flex", sm: "none" },
                  gap: "1rem",
                  // display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="outlined" color="error"  onClick={handleOpenDeleteBook}>
                  Delete
                </Button>
                <Button variant="contained" onClick={handleOpenEditModal}>
                  Edit
                </Button>
              </Box>
              <Typography fontWeight="bold" sx={{ fontSize: "x-large" }}>
                {book.book}
              </Typography>
              <Typography color="text.secondary">{book.author}</Typography>
              <Typography>{book.about}</Typography>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  gap: "1rem",
                }}
              >
                <Button variant="outlined" color="error" onClick={handleOpenDeleteBook}>
                  Delete
                </Button>
                <Button variant="contained" onClick={handleOpenEditModal}>
                  Edit
                </Button>
              </Box>
            </Grid>
            {/* <Grid
        
          {/* توضیحات در سمت چپ */}
            <Grid
              item
              xs={12}
              sm={7}
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Typography sx={{ fontSize: "large", fontWeight: "bold" }}>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {book.description}
              </Typography>
            </Grid>

            {/* جزئیات در سمت راست */}
            <Grid item xs={12} sm={5}>
              <CardContent
                sx={{
                  marginTop: "1rem",
                  gap: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">Price: ${book.price}</Typography>
                <Typography variant="h6">
                  Rating:{renderStars(book.rating)}
                </Typography>
                <Typography variant="h6">Sales: {book.sales}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
