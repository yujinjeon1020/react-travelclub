import {observer} from "mobx-react";
import {PureComponent} from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Link} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import {IBoard} from "../../stores/board/BoardStore";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import EditIcon from '@mui/icons-material/Edit';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {IState} from "../../stores/modal/ModalStore";

@observer
class ClubListView extends PureComponent<any, IState> {

    render() {

        const { club, clubs, onSelectedClub, onRemoveClub,
            board, boards, onAddBoard, onSetBoardProps, onRemoveBoard, onUpdateBoard, onSelectedBoard,
            onOpenBoardDetailModal, onOpenBoardCreateModal, onOpenBoardUpdateModal,
            onCloseBoardDetailModal, onCloseBoardCreateModal, onCloseBoardUpdateModal,
            boardDetailModalOpen, boardCreateModalOpen, boardUpdateModalOpen} = this.props;

        return (
            <div>
            <TableContainer component={Paper} >
                <h2>Club List</h2>
                <Table>
                    <TableHead>
                       <TableRow>
                           <TableCell align='center'><b>No.</b></TableCell>
                           <TableCell align='center'><b>Name</b></TableCell>
                           <TableCell align='center'><b>Intro</b></TableCell>
                           <TableCell align='center'><b>CreatedDate</b></TableCell>
                           <TableCell align='center'><b>Menu</b></TableCell>
                       </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(clubs) && clubs.length
                        ?
                        clubs.map( (club) => (
                            <TableRow key={club.usid} hover onClick={ () => {
                                onSelectedClub(club);
                            }}>
                                <TableCell align='center'>{club.usid}</TableCell>
                                <TableCell align='center'>{club.name}</TableCell>
                                <TableCell align='center'>{club.intro}</TableCell>
                                <TableCell align='center'>{club.createDate}</TableCell>
                                <TableCell align='center'>
                                        <Button
                                            onClick={() => {
                                                onOpenBoardDetailModal(club);
                                            }}
                                            variant='outlined' size='small' color='primary' startIcon={<BorderColorIcon />}>Board</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to={`/membership/${club.usid}`} >
                                        <Button
                                            variant='outlined' size='small' color='default' startIcon={<AccountCircleRoundedIcon />}>Membership</Button>
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    onClick={ () => {
                                        onRemoveClub(club.usid);
                                        club.name = '';
                                        club.intro = '';
                                    }}
                                    variant='contained' size='small' color='secondary' startIcon={<DeleteIcon />}>Delete This Club</Button>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                            <TableRow>
                                <TableCell>No Club Exists</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

    {/*게시판으로 이동 - 게시판 정보 조회*/}
    {boardDetailModalOpen &&
        <Modal open={ boardDetailModalOpen } close={ onCloseBoardDetailModal } header="Club Board" boards={boards} board={board} club={club} clubs={clubs}>
            {Array.isArray(boards) && boards.length
             ?
            boards.map( (board:IBoard) => (
                <div key={board.boardId}>
                Board Name :
                    &nbsp;
                    <input
                        disabled
                        value={board.name}
                        id='name'
                    ></input>
                <br /><br />
                Admin Email :
                    &nbsp;
                    <input
                        disabled
                        value={board.adminEmail}
                        id='email'
                    ></input>
                <br /><br />
                <Link to={`/board/${club.usid}`} >
                    <Button
                        onClick={ () => {
                            onCloseBoardDetailModal();
                        }}
                        variant='contained' color='primary' startIcon={<DoubleArrowIcon />}>
                        Go To Board
                    </Button>
                </Link>
                    <br /><br />
                    <Button
                        onClick={ () => {
                            onSelectedBoard(board);
                            onOpenBoardUpdateModal();
                        }}
                        variant='contained' size='small' color='default'
                        startIcon={<EditIcon />}
                    >
                        Update
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        onClick={ () => {
                            onSelectedBoard(board);
                            onRemoveBoard(board.boardId, club.usid);
                        }}
                        variant='contained' size='small' color='secondary'
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </div>
            ))
            :
                <div>
                <b>No Board Exists</b>
                    <br /><br />
                <Button
                    onClick={() => {
                    onOpenBoardCreateModal();
                    }}
                    variant='contained' color='primary'
                    startIcon={<FiberNewIcon />}
                >
                NEW BOARD
                </Button>
                </div>
            }
        </Modal>}

    {/*게시판 존재 안할 시 생성하는 모달*/}
    {boardCreateModalOpen &&
        <Modal open={ boardCreateModalOpen } close={ onCloseBoardCreateModal } header="New Board" board={boards} club={club} clubs={clubs}>
                <Box>
                    Board Name :
                    <br />
                    &nbsp;
                    <TextField
                        key='name'
                        focused
                        variant='standard'
                        margin='normal'
                        required
                        placeholder='Board Name'
                        onChange={(event) => onSetBoardProps('name', event.target.value) }
                    >
                    </TextField>
                    <br /><br />
                    Admin Email :
                    <br />
                    &nbsp;
                    <TextField
                        key='adminEmail'
                        variant='standard'
                        required
                        margin='normal'
                        placeholder='Admin Email'
                        onChange={(event) => onSetBoardProps('adminEmail', event.target.value) }
                    >
                    </TextField>
                    <br /><br />
                    <Button
                        key='button'
                        onClick={() => {
                            board.adminEmail = board.adminEmail.replace(/(\s*)/g, "");
                            onAddBoard();
                            onCloseBoardCreateModal();
                        }}
                        variant='contained' color='primary'
                    >
                        CREATE
                    </Button>
                </Box>
        </Modal>}


        {/*게시판 수정 모달*/}
        {boardUpdateModalOpen &&
            <Modal open={ boardUpdateModalOpen } close={ onCloseBoardUpdateModal } header="Edit a Board" board={boards} club={club} clubs={clubs}>
                <div>
                    <Table>
                        Board Name :
                        <br />
                        <TextField
                            key='name'
                            focused
                            variant='standard'
                            margin='normal'
                            defaultValue={board.name}
                            placeholder='Board Name'
                            onChange={(event) => onSetBoardProps('name', event.target.value) }
                        >
                        </TextField>
                        <br /><br />
                        Admin Email :
                        <br />
                        <TextField
                            key='email'
                            variant='standard'
                            margin='normal'
                            defaultValue={board.adminEmail}
                            placeholder='Admin Email'
                            onChange={(event) => onSetBoardProps('adminEmail', event.target.value) }
                        >
                        </TextField>
                    </Table>
                        <br /><br />
                        <Button
                            key='button'
                            onClick={() => {
                                onUpdateBoard(board.boardId);
                                onCloseBoardUpdateModal();
                            }}
                            variant='contained' color='primary'
                        >
                            Submit
                        </Button>
                </div>
            </Modal>}
        </div>
        )
    }
}

export default ClubListView;