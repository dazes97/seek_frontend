
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { Todo } from '../../../services/todo/todo.interface';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

const statusList:string[]= ['Por hacer','En progreso', 'Terminado']
export const TodoTable = ({ data, deleteTodo, updateTodo }: { data: Todo[], updateTodo: (id: string, status:string) => void, deleteTodo: (id: string) => void }) => {
    const prepareUpdateTodo = (id: string, event:  SelectChangeEvent<string>) => {
        updateTodo(id, event.target.value);
    }
    return (
        <>
            {data && data.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Todo List">
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>Id</TableCell>
                                <TableCell align="left">Titulo</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Estado</TableCell>
                                <TableCell align="left">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>{row.id}
                                    </TableCell>
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="left">
                                        <Select value={row.status} onChange={(e)=> prepareUpdateTodo(row.id,e)}>
                                            {statusList.map((status) => (
                                                <MenuItem key={status} value={status}>{status}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Tooltip title="Borrar">
                                            <IconButton onClick={() => deleteTodo(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No hay tareas...</p>
            )
            }
        </>
    )
}