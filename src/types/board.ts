export interface MainBoard{
  boardNum: number; // 게시글 번호
  userNum: number; // 사용자 번호
  userName: string; // 사용자 이름
  boardTitle: string; // 게시글 제목
  boardCreateAt: string; // 작성일
  boardUpdateAt: string; // 수정일
  boardState: number; // 게시글 상태
  boardFavCnt: number; // 게시글 공감수
  boardHitCnt: number; // 게시글 조회수
}