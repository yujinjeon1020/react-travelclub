import {PureComponent} from "react";
import {
    Box, Button, Grid,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow, TextareaAutosize,
    TextField,
} from "@material-ui/core";
import {observer} from "mobx-react";
import PostingModal from "../../components/modal/PostingModal";
import DateUtil from "../../util/DateUtil";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {toJS} from "mobx";
import {IPosting} from "../../stores/board/PostingStore";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {IComment} from "../../stores/board/CommentStore";
import {IState} from "../../stores/modal/ModalStore";

@observer
class PostingView extends PureComponent<any, IState> {

    render() {

        const { comment, comments, clubs, club, members, member, posting, postings, board,
            onAddPosting, onSetPostingProps, onRemovePosting, onSelectedPosting, onSetReadCountUp, onUpdatePosting, onSetForce,
            onSelectedComment, onAddComment, onSetCommentProps, onRemoveComment, onUpdateComment,
            postingCreateModalOpen, postingDetailModalOpen, postingUpdateModalOpen,
            commentCreateModalOpen, commentUpdateModalOpen,
            onOpenPostingCreateModal, onOpenPostingDetailModal, onOpenPostingUpdateModal,
            onClosePostingCreateModal, onClosePostingDetailModal, onClosePostingUpdateModal,
            onOpenCommentCreateModal, onOpenCommentUpdateModal, onCloseCommentCreateModal, onCloseCommentUpdateModal} = this.props;

        return (
        <div>
            <br /><br />
            <TableContainer component={Paper}>
            {/*<h2>{club && club.name ? 'Board for ' + club.name: ''}</h2>*/}
            <h2>{board.name}</h2>
                <Table style={{justifyContent:'center', alignItems:'center'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' width='100px'><b>No.</b></TableCell>
                            <TableCell align='center' width='500px'><b>Title</b></TableCell>
                            <TableCell align='center' width='400px'><b>Writer</b></TableCell>
                            <TableCell align='center' width='400px'><b>Posted Date</b></TableCell>
                            <TableCell align='center' width='100px'><b>Read Count</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(postings) && postings.length
                            ?
                            postings.
                            filter( (posting) => posting.boardId === club.usid).
                            map((posting) => (
                                <TableRow
                                    key={posting.postId} hover
                                    onClick={ () => {
                                        onSelectedPosting(posting);
                                        onOpenPostingDetailModal();
                                        onSetReadCountUp();
                                        console.log(toJS(posting));
                                    }}
                                >
                                    <TableCell align='center'>{posting.postId}</TableCell>
                                    <TableCell align='center'>{posting.title}</TableCell>
                                    <TableCell align='center'>{posting.writerEmail}</TableCell>
                                    <TableCell align='center'>{posting.writtenDate}</TableCell>
                                    <TableCell align='center'>{posting.readCount}</TableCell>
                                    <TableCell align='center'>
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow key='1'>
                                <TableCell align='center' width='300px'><h6> No posting exists </h6></TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        <br/>
        <Button
            onClick = { () => {
                onOpenPostingCreateModal();
            }}
            variant='contained' size='small' color='primary'>New Post</Button>

            {/*게시글 작성 모달*/}
        {postingCreateModalOpen &&
                <PostingModal open={ postingCreateModalOpen } close={ onClosePostingCreateModal } header="New Post" posting={posting} postings={postings} member={member} members={members} club={club} clubs={clubs}>
                    <Box>
                    Club : &nbsp;
                        <TextField
                        disabled
                        defaultValue={club.name}
                        />
                    <br /><br />
                    Writer : &nbsp;
                        <TextField
                        focused
                        required
                        placeholder='hello@gmail.com'
                        onChange={ (event) => onSetPostingProps('writerEmail', event.target.value) }
                        />
                    <br /><br />
                    Title : &nbsp;
                        <TextField
                        required
                        placeholder='제목을 입력해주세요.'
                        onChange={ (event) => onSetPostingProps('title', event.target.value) }
                        />
                    <br /><br />
                    Content : &nbsp;
                        <TextareaAutosize
                            aria-label="empty textarea"
                            style={{ width: 200 }}
                            minRows={10}
                            placeholder='내용을 입력해주세요.'
                            onChange={ (event) => onSetPostingProps('contents', event.target.value) }
                        />
                    <br /><br />
                    Date : &nbsp;
                        <TextField
                            disabled
                            defaultValue={DateUtil.today()}
                            onChange={ (event) => onSetPostingProps('writtenDate', event.target.value) }
                        />
                    <br /><br />
                    <Button
                        type='button'
                        onClick={ () => {
                            onAddPosting(posting);
                            onClosePostingCreateModal();
                        }}
                        variant='contained' size='small' color='primary' startIcon={<BorderColorIcon />}>Write</Button>
                        <br /><br />
                        <Button
                            onClick={() => {
                                onClosePostingCreateModal();
                            }}
                            variant='contained' size='small' color='default'>Cancel</Button>
                    </Box>
                </PostingModal>}

            {/*게시글 조회 모달*/}
        {postingDetailModalOpen &&
            <PostingModal open={ postingDetailModalOpen } close={onClosePostingDetailModal} header='Posting Detail' posting={posting} postings={postings} member={member} members={members} club={club} clubs={clubs}>
                {Array.isArray(postings) && postings.length
                    ?
                    //club.posting.filter((target: IBoard) => target.clubId === club.usid).filter((target: IBoard) => target.postId === posting.postId).map((posting: IBoard) => (
                    //boards.filter((target1: any) => target1.usid === board.clubId && target1.postId === board.postId).map((board: IBoard) => (
                    postings.filter( target => target.boardId === club.usid && target.postId === posting.postId).map( (posting: IPosting) => (
                        <div key={posting.postId}>
                            Writer : &nbsp;
                            <input
                                disabled
                                value={posting.writerEmail}
                            />
                            <br/><br/>
                            Title : &nbsp;
                            <input
                                disabled
                                value={posting.title}
                            />
                            <br/><br/>
                            Content : &nbsp;
                            <TextareaAutosize
                                disabled
                                aria-label="empty textarea"
                                style={{width: 200}}
                                minRows={5}
                                value={posting.contents}
                            />
                            <br/><br/>
                            Posted Date : &nbsp;
                            <input
                                disabled
                                defaultValue={posting.writtenDate}
                            />
                            <hr/>
                            {/*댓글 목록 시작*/}
                            <b>Comments</b>
                            <Table>
                                <TableHead>
                                </TableHead>
                                <TableBody>
                            {Array.isArray(comments) && comments.length
                            ?
                            comments.filter( target => target.boardId === posting.boardId && target.postId === posting.postId).
                            map( (comment: IComment) => (
                                <TableRow
                                    key={comment.commentId} hover
                                    onClick={() => {
                                        onSelectedComment(comment);
                                    }}
                                >
                                    <TableCell><b>{comment.writerEmail}</b></TableCell>
                                    <TableCell>{comment.contents}</TableCell>
                                    <TableCell>{comment.writtenDate}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                onOpenCommentUpdateModal();
                                            }}
                                            variant='outlined' size='small' color='default'>Edit</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            key='remove'
                                            onClick={() => {
                                                onRemoveComment(comment.boardId, comment.postId, comment.commentId);
                                            }}
                                            variant='outlined' size='small' color='secondary'
                                        >Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                                <TableRow>
                                    <TableCell align='center'>
                                        No Comment Exists
                                    </TableCell>
                                </TableRow>
                            }
                                </TableBody>
                            </Table>
                            <br />
                            {/*댓글 작성*/}
                            <Button
                                key='button1'
                                variant='outlined' color='primary'
                                onClick={ () => {
                                    console.log('댓글 작성 클릭');
                                    onOpenCommentCreateModal();
                                }}
                            >New comment
                            </Button>
                            <hr />
                            <Button
                                onClick={() => {
                                    onSetForce();
                                    onOpenPostingUpdateModal();
                                }}
                                variant='contained' size='small' color='primary'
                                startIcon={<UpdateIcon />}>Edit Post</Button>
                            &nbsp;&nbsp;
                            <Button
                                onClick={() => {
                                    onRemovePosting(posting.postId);
                                    onClosePostingDetailModal();
                                }}
                                variant='contained' size='small' color='secondary'
                                startIcon={<DeleteSweepIcon />}>Delete Post</Button>
                            <br /><br />
                            <Button
                                onClick={() => {
                                    onSetForce();
                                    onClosePostingDetailModal();
                                }}
                                variant='contained' size='small' color='default'>Close</Button>
                            </div>
                    ))
                    :
                    <div>
                        null
                    </div>
                }
            </PostingModal>}

            {/*게시글 수정 Modal*/}
            {postingUpdateModalOpen &&
                <PostingModal open={ postingUpdateModalOpen } close={onClosePostingUpdateModal} header='Edit a post' posting={posting} postings={postings} member={member} members={members} club={club} clubs={clubs}>
                    {Array.isArray(postings) && postings.length
                        ?
                        //club.posting.filter((target: IBoard) => target.clubId === club.usid).filter((target: IBoard) => target.postId === posting.postId).map((posting: IBoard) => (
                        //boards.filter((target1: any) => target1.usid === board.clubId && target1.postId === board.postId).map((board: IBoard) => (
                        postings.filter( target => target.boardId === club.usid && target.postId === posting.postId).map( (posting: IPosting) => (
                            <div key={posting.postId}>
                                Writer : &nbsp;
                                <input
                                    disabled
                                    value={posting.writerEmail}
                                />
                                <br/><br/>
                                Title : &nbsp;
                                <input
                                    required
                                    defaultValue={posting.title}
                                    placeholder='제목을 입력해주세요.'
                                    onChange={ (event) => onSetPostingProps('title', event.target.value) }
                                />
                                <br/><br/>
                                Content : &nbsp;
                                <TextareaAutosize
                                    required
                                    aria-label="empty textarea"
                                    style={{width: 200}}
                                    minRows={10}
                                    defaultValue={posting.contents}
                                    placeholder='내용을 입력해주세요.'
                                    onChange={ (event) => onSetPostingProps('contents', event.target.value) }
                                />
                                <br/><br/>
                                Posted Date : &nbsp;
                                <input
                                    disabled
                                    defaultValue={posting.writtenDate}
                                />
                                <br/><br/>
                                <Button
                                    onClick={() => {
                                        onUpdatePosting();
                                        onSetForce();
                                        onClosePostingUpdateModal();
                                        onClosePostingDetailModal();
                                    }}
                                    variant='contained' size='small' color='primary'
                                    startIcon={<UpdateIcon />}>Submit</Button>
                                &nbsp;&nbsp;
                                <Button
                                    onClick={() => {
                                        //onSetReadCountUp();
                                        onSetForce();
                                        onClosePostingUpdateModal();
                                        onClosePostingDetailModal();
                                    }}
                                    variant='contained' size='small' color='default'>Cancel</Button>
                            </div>
                        ))
                        :
                        <div>
                            null
                        </div>
                    }
                </PostingModal>}

            {/*댓글 작성 모달*/}
            {commentCreateModalOpen &&
                <PostingModal open={ commentCreateModalOpen } close={ onCloseCommentCreateModal } header="New Comment" posting={posting} postings={postings} member={member} members={members} club={club} clubs={clubs}>
                    <Box>
                        Post No. : &nbsp;
                        <TextField
                            disabled
                            defaultValue={posting.postId}
                        />
                        <br /><br />
                        Writer : &nbsp;
                        <TextField
                            focused
                            required
                            placeholder='hello@gmail.com'
                            onChange={ (event) => onSetCommentProps('writerEmail', event.target.value) }
                        />
                        <br /><br />
                        Content : &nbsp;
                        <TextareaAutosize
                            aria-label="empty textarea"
                            style={{ width: 200 }}
                            minRows={5}
                            placeholder='내용을 입력해주세요.'
                            onChange={ (event) => onSetCommentProps('contents', event.target.value) }
                        />
                        <br /><br />
                        Date : &nbsp;
                        <TextField
                            disabled
                            defaultValue={DateUtil.today()}
                            onChange={ (event) => onSetCommentProps('writtenDate', event.target.value) }
                        />
                        <br /><br />
                        <Button
                            type='button'
                            onClick={ () => {
                                onAddComment(comment);
                                onCloseCommentCreateModal();
                            }}
                            variant='contained' size='small' color='primary' startIcon={<BorderColorIcon />}>Write</Button>
                        <br /><br />
                        <Button
                            onClick={() => {
                                onSetForce();
                                onCloseCommentCreateModal();
                            }}
                            variant='contained' size='small' color='default'>Cancel</Button>
                    </Box>
                </PostingModal>}


            {/*댓글 수정 모달*/}
            {commentUpdateModalOpen &&
                <PostingModal open={ commentUpdateModalOpen } close={ onCloseCommentUpdateModal } header="Edit a comment" posting={posting} postings={postings} member={member} members={members} club={club} clubs={clubs}>
                    {Array.isArray(comments) && comments.length
                    ?
                    comments.filter( target => target.boardId === posting.boardId && target.postId === comment.postId && target.commentId === comment.commentId).
                    map( (comment: IComment) => (
                        <div key={comment.commentId}>
                        Post No. : &nbsp;
                        <TextField
                            disabled
                            defaultValue={posting.postId}
                        />
                        <br /><br />
                        Writer : &nbsp;
                        <TextField
                            disabled
                            value={comment.writerEmail}
                            //onChange={ (event) => onSetCommentProps('writerEmail', event.target.value) }
                        />
                        <br /><br />
                        Content : &nbsp;
                        <TextareaAutosize
                            aria-label="empty textarea"
                            style={{ width: 200 }}
                            minRows={5}
                            defaultValue={comment.contents}
                            placeholder='내용을 입력해주세요.'
                            onChange={ (event) => onSetCommentProps('contents', event.target.value) }
                        />
                        <br /><br />
                        Date : &nbsp;
                        <TextField
                            disabled
                            defaultValue={comment.writtenDate}
                        />
                        <br /><br />
                        <Button
                            type='button'
                            onClick={ () => {
                                onUpdateComment(comment.boardId, comment.postId, comment.commentId);
                                onCloseCommentUpdateModal();
                            }}
                            variant='contained' size='small' color='primary' startIcon={<BorderColorIcon />}>Submit</Button>
                        <br /><br />
                        <Button
                            onClick={() => {
                                onSetForce();
                                onCloseCommentUpdateModal();
                            }}
                            variant='contained' size='small' color='default'>Cancel</Button>
                    </div>
                ))
                :
                <div>
                    null
                </div>
                }
                </PostingModal>}
        </div>)
    }
}

export default PostingView;