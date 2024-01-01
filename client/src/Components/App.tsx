import './App.css'
import HeaderBar from './HeaderBar';
import Box from '@mui/material/Box';

const App: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <HeaderBar></HeaderBar>
        </Box>
    );
}

export default App;
