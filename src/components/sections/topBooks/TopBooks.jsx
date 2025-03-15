import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import {fakeTopBooks} from "../../../datas"
import "./TopBooks.css";


export default function TopBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  
  const fetchBooks = async ()=>{
    try{
      setLoading(true)
      setError(false)

          const querySnapshot = await getDocs(collection(db, "TopBooks"));
    const booksArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(booksArray);
  } catch(err){
    // console.error('Firebase error:', err);
      setError(true)
      setBooks(fakeTopBooks)

      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (

      <Card className="cardContainer">
        <CardHeader title="Top Selling Books" sx={{ paddingBottom: 0 }} />
        <TableContainer className="tableContainer" >
          <Table stickyHeader sx={{ tableLayout: "100%", minWidth:'100%'}}>
            <TableHead >
              <TableRow >
                <TableCell className="TableHeadCell" sx={{flex:'2'}} >Book</TableCell>
                <TableCell className='TableHeadCell' >Sales</TableCell>
                <TableCell className="TableHeadCell" >Price</TableCell>
                <TableCell className="TableHeadCell" >Rating</TableCell>
                <TableCell className="TableHeadCell" >Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
             {loading ? (
                <Typography
                  style={{color:"red",fontSize:"small", opacity:"0.5"}}
                >(Please turn on your VPN)Loading...</Typography>
              ) : error ? (
                <Typography>Error loading books</Typography>
              ) : books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="tableBodyCellImg">
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="book-image"
                      />
                      <Typography variant="body2">{book.title}</Typography>
                    </div>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                <Typography variant="body2">{book.sales}</Typography>
              </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography variant="body2">${book.price}</Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography variant="body2">{book.rating}⭐</Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography variant="body2">{book.author}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link 
        to="/books"
        style={{ display:"flex", justifyContent:"flex-end", marginRight:"2rem"}}
        >
          <button>Show more</button>
        </Link>
       </Card>


  );
}

// {books.map((book) => (
//   <TableRow key={book.id}>
//     <TableCell>
//       <div className="tableBodyCellImg">
//         <img
//           src={book.imageUrl}
//           alt={book.title}
//           className="book-image"
//         />
//         <Typography variant="body2">{book.title}</Typography>
//       </div>
//     </TableCell>
//     <TableCell sx={{ textAlign: 'center' }}>
//   <Typography variant="body2">{book.sales}</Typography>
// </TableCell>
//     <TableCell sx={{ textAlign: "center" }}>
//       <Typography variant="body2">{book.price}</Typography>
//     </TableCell>
//     <TableCell sx={{ textAlign: "center" }}>
//       <Typography variant="body2">{book.rating} ⭐</Typography>
//     </TableCell>
//     <TableCell sx={{ textAlign: "center" }}>
//       <Typography variant="body2">{book.author}</Typography>
//     </TableCell>
//   </TableRow>
// ))}



// const fetchBooks = async () => {
//   const querySnapshot = await getDocs(collection(db, "TopBooks"));
//   const booksArray = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   setBooks(booksArray);
// };