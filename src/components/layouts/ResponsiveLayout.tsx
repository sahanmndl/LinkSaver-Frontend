import React from 'react';
import {Container, Box} from '@mui/material';

interface ResponsiveLayoutProps {
    children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({children}) => {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '90vh',
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default ResponsiveLayout;