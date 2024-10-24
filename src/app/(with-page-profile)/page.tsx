import { getMainBoardListAction } from '../actions/board/mainBoardList-action'
import MainBoardItem from '../components/mainBoard/mainBoardItem';
import style from './page.module.css'

export default async function Page() {

	const {data} = await getMainBoardListAction()
	console.log(data);
	
	return(
		<div className={style.container}>
			<div className={style.pageMainTitle}>
				<h2>메인 페이지</h2>
				<p>안녕하세요. 서상균입니다.</p>
			</div>
			<div>
				{data.map((board) => <MainBoardItem key={board.boardNum} {...board} />)}
			</div>
		</div>
	)
}
