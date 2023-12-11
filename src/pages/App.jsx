import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import { jwtDecode } from "jwt-decode";
import { useCart } from './cart/cartContext';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';

  
  
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Biblioteca Tech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();



function App  ({ book }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [codBook, setcodBook] = useState('');
  const [name, setName] = useState('');
  const [Autor, setAutor] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [image, setImage] = useState('');
  const [Books, setBooks] = useState([]);
  const [User, setUser] = useState(null);
  const navigate = useNavigate();

  
  const fetchUserPermission = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.permission);
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
      }
    }
  }

  
  const { dispatch } = useCart();

  const handleAddToCart = async (book) => {
    
   
      dispatch({ type: 'ADD_TO_CART', payload: { ...book, quantity: 1 } });
      toast('Livro adicionado ao carrinho!');
  
     
    
  };
  
  
  const handleMyOrders = () => {
    navigate('/MyOrders')
  }

  
    const handleOpenCart = () => {
      navigate('/cart')
    };

    const handleOpenSearch = () => {
      navigate('/pesquisarLivros')
    }
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBook = async () => {
    try {
      const requestData = { codBook };
      const response = await httpService.deleteBook(requestData);
      if (response.status === 200) {
        toast(response);
        fetchBooks();
        handleClose();
      } else {
        toast('Erro ao excluir o produto');
      }
    } catch (error) {
      toast('Erro ao excluir o produto', error);
    }
  };

  const handleUpdateBook = async () => {
    try {
      const requestData = { codBook, image, name, Autor, currentPrice };
      const response = await httpService.updateBook(requestData);
      if (response.status === 200) {
        toast(response);
        fetchBooks();
        handleClose2();
      } else {
        toast('Erro ao atualizar o produto');
      }
    } catch (error) {
      toast('Erro ao atualizar o produto', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await httpService.getBooks();
      if (response.status === 200) {
        const BooksData = await response.json();
        setBooks(BooksData);
      } else {
        toast('Erro ao buscar produtos');
      }
    } catch (error) {
      toast.error('Erro ao buscar produtos', error);
    }
  };


  useEffect(() => {
    fetchBooks();
    fetchUserPermission();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateBook = () => {
    navigate('/Book');
  };



  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escreva o código do livro para confirmar a exlusão
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="codBook"
            label="Código do produto"
            type="text"
            fullWidth
            variant="standard"
            value={codBook}
            onChange={(e) => setcodBook(e.target.value)}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDeleteBook}>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe dados para atualização do produto
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="codBook"
            label="Código do produto"
            type="text"
            fullWidth
            variant="standard"
            value={codBook}
            onChange={(e) => setcodBook(e.target.value)}
          />
                      <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Imagem URL"
            type="text"
            fullWidth
            variant="standard"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Autor"
            label="Autor"
            type="text"
            fullWidth
            variant="standard"
            value={Autor}
            onChange={(e) => setAutor(e.target.value)}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="CurrentPrice"
            label="Preço"
            type="Double"
            fullWidth
            variant="standard"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
          />

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancelar</Button>
          <Button onClick={handleUpdateBook}>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap style={{ marginRight: '15px' }}>
              Bem-vindo à Biblioteca Tech
            </Typography>
            <BookIcon />
            <div style={{ marginLeft: '55%',  background: '#1565C0  ',padding: '7px' }}>
            <p onClick={handleMyOrders}>Meus pedidos</p>
            </div>
            <div style={{ marginLeft: 'auto',  background: '#1565C0  ', borderRadius: '100%', padding: '7px' }}>
              
              <SearchIcon onClick={handleOpenSearch} />
            </div>
            <Typography variant="h6" color="inherit" noWrap style={{ marginLeft: '48px', background: '#1565C0  ', borderRadius: '90%', padding: '5px'   }}>
              <LocalGroceryStoreTwoToneIcon onClick={handleOpenCart} />
              </Typography>
              <Typography variant="h6" color="error" noWrap style={{ marginLeft: '48px' }}>
            {User === 10 && <h6>Admin</h6>}
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Descubra uma vasta coleção de livros de tecnologia e comece a descobrir o
              vasto mundo tecnológico.

              </Typography>

              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
        {User === 10 && (
          <Button onClick={handleCreateBook} variant="contained" color='secondary'>
            Criar livro
          </Button>
        )}

              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {Books.map((Book) => (
                <Grid item xs={12} sm={6} md={4} key={Book.codBook}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                  }}
                >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '56.25%',
                      }}
                      image={Book.image}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {Book.name}
                      </Typography>
                      <Typography>
                        Autor: {Book.Autor}
                      </Typography>
                      <Typography>
                        Preço: R$ {Book.currentPrice}
                      </Typography>
                      <Typography>
                        Código: {Book.codBook}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Button
                      size="expensive"
                      onClick={() => handleAddToCart(Book)}
                      variant="contained"
                      color="primary" 
                      
                    >
                      Adicionar ao carrinho
                    </Button>
                      {User === 10 && (
                      <Button
                      onClick={() => {
                        setImage(Book.image);
                        setcodBook(Book.codBook);
                        setName(Book.name);
                        setAutor(Book.Autor);
                        setCurrentPrice(Book.currentPrice);

                        
                        handleClickOpen2();
                        size="small"
                      }}
                      >
                        Editar
                      </Button>
                      )}
                      {User === 10 && (
                      <Button
                        onClick={() => {
                          setcodBook(Book.codBook);
                          handleClickOpen();
                        }}
                        size="small"
                      >
                        Deletar
                      </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
       <Box sx={{ bgcolor: 'background.paper', p: 6, mt: 4 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          <Button onClick={handleLogout} variant="contained" color="error">
            Sair
          </Button>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Biblioteca Tech
          </Typography>
          <Copyright />
        </Box>
        <ToastContainer/>
      </ThemeProvider>
    </div>
  );
}


export default App;
