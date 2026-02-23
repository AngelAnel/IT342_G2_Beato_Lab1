import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dialog, DialogContent, DialogTitle, Button, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';

const SettingsModal = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: 'rgba(103, 126, 234, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    minWidth: 300,
                },
            }}
        >
            <DialogTitle sx={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Settings
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: 'rgba(255, 100, 100, 0.8)',
                            color: 'white',
                            padding: '12px 40px',
                            borderRadius: 3,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 80, 80, 1)',
                            },
                        }}
                    >
                        LOGOUT
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;