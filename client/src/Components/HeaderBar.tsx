import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const HeaderBar: React.FC = () => {
    const navItems = ['Orders', 'Cart', 'Exit'];
    return (
    <AppBar component="nav">
        <Toolbar>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { sm: 'block' } }}
            >
                gOzon
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                ))}
            </Box>
        </Toolbar>
    </AppBar>
    );
}

export default HeaderBar;