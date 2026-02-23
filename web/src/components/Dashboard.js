import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Box, Card, CardContent, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import SettingsModal from './SettingsModal';

const Dashboard = () => {
    const { user } = useAuth();
    const [settingsOpen, setSettingsOpen] = useState(false);

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 4,
                filter: settingsOpen ? 'blur(5px) brightness(0.7)' : 'none',
                transition: 'filter 0.3s ease',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h3" sx={{ color: 'white', letterSpacing: 2 }}>
                        Welcome, {user.firstName} {user.lastName}!
                    </Typography>
                    <IconButton
                        onClick={() => setSettingsOpen(true)}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                        }}
                    >
                        <Settings fontSize="large" />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Card
                        sx={{
                            minWidth: 250,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                Name
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'white' }}>
                                {user.firstName} {user.lastName}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            minWidth: 250,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                Email
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'white' }}>
                                {user.email}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            minWidth: 250,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                Username
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'white' }}>
                                {user.username}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>

            <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </Box>
    );
};

export default Dashboard;