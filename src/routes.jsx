import Home from './pages/home/Home';
import Users from './pages/users/Users';
import Books from './pages/books/Books';
import BookDetail from './pages/books/bookDetail/BookDetail';



let router =[
    {path:"/", element:<Home />},
    {path:"/users", element:<Users />},
    {path:"/books", element:<Books />},
    {path:"/books/:id", element:<BookDetail />},
]

export default router;