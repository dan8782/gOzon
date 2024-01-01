import { Box, Typography } from "@mui/material"
import HeaderBar from "./HeaderBar";

const LoginPage: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <HeaderBar></HeaderBar>
            <Typography>
                LoginPagek
            </Typography>
        </Box>
    )
}
 
export default LoginPage;