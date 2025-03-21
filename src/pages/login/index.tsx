import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthService } from '../../services';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

interface IFormInput {
    email: string
    password: string
}

export const LoginPage = () => {
    const { register, handleSubmit, formState: { isValid } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
        const authService = new AuthService();
        const { token } = await authService.login(email, password)
        if (token) {
            authService.saveToken(token);
            window.location.href = '/';
        }
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', textAlign: 'center', p: { sm: 3, md: 10 } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={12} sx={{ py: 2 }}>
                        <Typography variant='h3'>Todo Login</Typography>
                    </Grid>
                    <Grid size={12}>
                        <TextField variant='outlined' placeholder='admin@gmail.com' {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                    </Grid>
                    <Grid size={12}>
                        <TextField variant='outlined' placeholder='12345678' {...register("password", { required: true, minLength: 8, maxLength: 255 })} />
                    </Grid>
                    <Grid size={12}>
                        <Button size='large' type="submit" disabled={!isValid} variant='contained'>Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}