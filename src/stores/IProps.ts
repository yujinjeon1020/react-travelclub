import clubStore from "./club/ClubStore";
import memberStore from "./member/MemberStore";
import membershipStore from "./membership/MembershipStore";
import boardStore from "./board/BoardStore";
import postingStore from "./board/PostingStore";
import commentStore from "./board/CommentStore";
import modalStore from "./modal/ModalStore";

export interface IProps {
    //typeof 를 쓰는 이유?
    //typeof를 안쓰면 Store의 Value를 보내주는건데,
    //Value가 타입은 아니고..이 인터페이스는 타입을 지정해주는 것이기 때문에
    //typeof를 써야한다.
    clubStore?: typeof clubStore;
    memberStore?: typeof memberStore;
    membershipStore?: typeof membershipStore;
    boardStore?: typeof boardStore;
    postingStore?: typeof postingStore;
    commentStore?: typeof commentStore;

    modalStore?: typeof modalStore;
}