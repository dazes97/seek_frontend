import { useCallback, useEffect, useState } from "react"
import { Button, Typography, Box, Tooltip } from "@mui/material";
import { AuthService, TodoService } from "../../services";
import { CreateModal, TodoTable } from "./components";
import { Todo } from "../../services/todo/todo.interface";

const authService = new AuthService();
const todoService = new TodoService(authService);
export const HomePage = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    const fetchTodos = async (): Promise<void> => {
        const response = await todoService.getAll();
        setTodoList(response);
    };
    const deleteTodo = async (id: string): Promise<void> => {
        await todoService.delete(id);
        fetchTodos();
    }
    
    const updateTodo = async (id: string, status: string): Promise<void> => {
        await todoService.update(id, status);
        fetchTodos();
    }
    
    const createTodo = async (title: string, description: string): Promise<void> => {
        await todoService.create(title, description);
        fetchTodos();
    }
    
    const redirectIfNotAuthenticated = useCallback(() => {
        const token = verifyToken();
        if(!token) window.location.href = '/login';
        fetchTodos();
    },[]);
    
    const logout = () => (authService.logout())
    const verifyToken = () => authService.getToken();
    const openModalCreate = () => setOpenModal(true);
    const closeModalCreate = () => setOpenModal(false);
    useEffect(() => {
        redirectIfNotAuthenticated()
    }, [redirectIfNotAuthenticated]);
    return (
        <>
            <CreateModal open={openModal} onCloseModal={closeModalCreate} createTodo={createTodo} />
            <Box sx={{ display: 'flex', justifyContent: 'end', flexWrap: 'wrap', py: 1, pr: 1 }}>
                <Tooltip title="Cerrar Sesion">
                    <Button size="small" variant="outlined" onClick={logout}>
                        Cerrar Sesion
                    </Button>
                </Tooltip>
            </Box >
            <Box sx={{ py: 5, textAlign: 'center' }}>
                <Typography variant="h5">TODO LIST</Typography>
            </Box>
            <Box sx={{ p: 5, textAlign: 'center' }}>
                <Button variant="contained" onClick={openModalCreate}>Agregar Tarea</Button>
            </Box>
            <Box sx={{ py: { sm: 3, md: 5 }, px: { sm: 2, md: 10 } }}>
                <TodoTable data={todoList} deleteTodo={deleteTodo} updateTodo={updateTodo} />
            </Box>
        </>
    )
}

