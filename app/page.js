'use client'
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc, count  } from "firebase/firestore";
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection:'column',
  gap: 3,

};

export default function Home() {
  const [pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState(' ') 

  const updatePantry = async () => { 
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {  
      pantryList.push({name: doc.id, ...doc.data()})
    })
    console.log(pantryList)
    setPantry(pantryList )
  }

  useEffect(() => { 
    updatePantry()
  }, [])

  //Add Items
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    //check if exists
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef,{count: count + 1 })
    } else {
      await setDoc (docRef, {count: 1 })
    }
    await updatePantry()
  }

  //Remove Items
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    //remove -1
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc (docRef)
      } else {
        await setDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry() 
  }

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [classification, setClass] = useState('');

  const handleChangeInClass = (event) => {
    setClass(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
    
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            P a n t r y f i e r 1.0 
          </Typography>
          <Typography 
          variant="h6" 
          component="div" 
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ flexGrow: 3}}
          
          >
            Make it easy to Classify your Inventory Items
          </Typography>
          
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ minWidth: 300, minHeigh: 200 }} 
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <InputLabel id="demo-simple-select-label">Type of Pantry</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classification}
            label="Search by classification"
            onChange={handleChangeInClass}
          >
            <MenuItem value={10}>House</MenuItem>
            <MenuItem value={20}>Restaurant</MenuItem>
            <MenuItem value={30}>Hotel</MenuItem>
            <MenuItem value={40}>Shelter</MenuItem>

          </Select>
      </Box>
  

    <Box 
      width="100vw"
      heigtt="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap = {2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx = {style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add your items
          </Typography> 
    
          <Stack width='100%' direction={'row'} spacing={2} >
            <TextField 
              id="outlined-basic" 
              label="Item Name" 
              variant="outlined" 
              fullWidth 
              value={itemName} 
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addItem(itemName);
                  setItemName('');
                  handleClose();

                }
              }}
         />
            <Button variant="outlined"
              onClick = {() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }} >
              Add  
            </Button>
          </Stack>
          <Box sx={{ minWidth: 120 }} display='flex'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={1}>Dairy</MenuItem>
                <MenuItem value={1}>Vegetables</MenuItem>
                <MenuItem value={2}>Bakery</MenuItem>
                <MenuItem value={3}>Meat</MenuItem>
                <MenuItem value={4}>Seafood</MenuItem>
                <MenuItem value={5}>Fruits</MenuItem>
                <MenuItem value={6}>Beverages</MenuItem>
                <MenuItem value={7}>Snacks</MenuItem>
                <MenuItem value={8}>Frozen</MenuItem>
                <MenuItem value={9}>Canned Foods</MenuItem>
                <MenuItem value={10}>Grains</MenuItem>
                <MenuItem value={11}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Type and select the class of item, there's a variety of selections.
          </Typography>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>Add your items</Button>
      <Box 
        width="800px" 
        heigth="100px" 
        bgcolor={'#90EE90'}  
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'}
        border={'1px solid #333'}

        > 
          <Typography variant="h4" color={'#333'} textAlign={'center'} >
            P a n t r y f i e r 1.0  
          </Typography>
      </Box> 

      <Stack 
        width="800px" 
        height="300px" 
        spacing={2} 
        overflow={'auto'} 
        border={'1px solid #333'} 
      >
        {pantry.map(({name, count}) => (
      
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display={'flex'}
            justifyContent={'space-between'} 
            alignItems={'center'}        
            paddingX={5}
          >
            <Typography variant={'h5'} color={'#3342ff'} textAlign={'center'}>
              {
                //Capitalize the first letter of the items
                name.charAt(0).toUpperCase() + name.slice(1)
              }
            </Typography>
            
            <Typography variant={'h5'} color={'#3342ff'} textAlign={'center'}>
              Quatity: {count}
            </Typography>

            <Stack direction={'row'} spacing={2}>
              <Button 
                variant="contained" 
                onClick={() => addItem(name)}
                >
                  Add
              </Button> 
              <Button variant="contained" onClick={() => removeItem(name)}>Delete</Button> 
            </Stack>
          </Box>
          ))}    
        </Stack>
      </Box> 
    </Box> 
  );
};
