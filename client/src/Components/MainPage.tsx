import { Box, Container, Typography } from "@mui/material";
import HeaderBar from "./HeaderBar";

const MainPage: React.FC = () => {
    return (
        <Box display={"flex"}>
            <HeaderBar />
            <Container sx={{paddingTop:10}}>
                <Typography component="div" sx={{ my: 2, fontSize: 24,color: '#000'  }}>
                    MainPage
                </Typography>
            </Container>
        </Box>
    );
}

export default MainPage;
