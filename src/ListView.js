
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const LIST_END_POINT = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
   
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ListView = () => {
    const [rows, setRows] = useState([]);
    const [status, setStatus] = React.useState({});

    const getCharacterDetail = async (character, characterDetails) => {
        await fetch(character.url)
            .then(response => response.json())
            .then(response => {
                characterDetails.push(response)
            })
    }

    const fetchData = async () => {
        await fetch(LIST_END_POINT)
            .then(response => response.json()) 
            .then(async response => {
                    const characterDetails = [];
                    if(response && response.results.length) {
                        await Promise.all(response.results.map(async (character) => {
                            await getCharacterDetail(character, characterDetails)
                        }));
                    }
                    setRows(characterDetails);
                }
            )
            .catch(err => console.error(err));
    };

    
    useEffect(() => {
        fetchData();
        },);

    const onCollapseChange = (rowId) => {
        setStatus(prevState => ({
                ...prevState,
                [rowId]: !prevState[rowId]
        }));
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Avatar</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Height</TableCell>
                            <TableCell align="left">Weight</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <>
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => onCollapseChange(row.name)}
                                    >
                                        {status[row.name] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <img alt="avatar" src={row.sprites.front_default}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.height}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.weight}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={status[row.name]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Abilities
                                            </Typography>
                                            <Table size="small" aria-label="abilites">
                                                <TableBody>
                                                    {row.abilities.map((abilityInfo, index) => (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {abilityInfo.ability.name.toUpperCase()}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Moves
                                            </Typography>
                                            <Table size="small" aria-label="moves">
                                                <TableBody>
                                                    {row.moves.map((moveInfo, index) => (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {moveInfo.move.name.toUpperCase()}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ListView;
