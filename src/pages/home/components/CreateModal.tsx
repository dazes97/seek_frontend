import { SubmitHandler, useForm } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"

interface IFormInput {
    title: string
    description: string
}
export const CreateModal = ({ open, onCloseModal, createTodo }: { open: boolean, onCloseModal: () => void, createTodo: (title: string, description: string) => void }) => {

    const { register, handleSubmit, formState: { isValid }, reset } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async ({ title, description }) => {
        createTodo(title, description)
        reset();
        closeModal();
    }
    const closeModal = () => {
        onCloseModal();
        reset();
    }

    return (
        <Modal
            open={open}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', textAlign: 'center', p: { sm: 3, md: 10 } }}>
                <Paper sx={{py:5}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField variant='outlined' placeholder='Example task' {...register("title", { required: true, minLength: 1, maxLength: 255 })} />
                            </Grid>
                            <Grid size={12}>
                                <TextField variant='outlined' placeholder='Example description' {...register("description", { required: true, minLength: 1, maxLength: 255 })} />
                            </Grid>
                            <Grid size={12}>
                                <Button size='large' type="submit" disabled={!isValid} variant='contained'>Crear</Button>
                            </Grid>
                            <Grid size={12}>
                                <Button size='large' variant='contained' onClick={closeModal}>Cerrar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Modal>);
}
