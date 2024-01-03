import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const HeaderBar: React.FC = () => {
    const navItems = [
        { label: 'Orders', path: '/orders' },
        { label: 'Cart', path: '/cart' },
        { label: 'Exit', path: '/logout' },
    ];

    return (
        <AppBar component="nav">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { sm: 'block' } }}
                >
                    <Link component={RouterLink} to="/" color="inherit" underline="none">
                        gOzon
                    </Link>
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.label}
                            component={RouterLink}
                            to={item.path}
                            sx={{ color: '#fff' }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;
