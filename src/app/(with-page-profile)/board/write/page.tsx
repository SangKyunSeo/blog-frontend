import { getCategoryListAction } from '@/app/actions/category/getCategoryList-actions';
import InputBoardForm from '@/app/components/board/inputBoardForm';

export default async function page() {
	const categoryList = await getCategoryListAction();

	return <InputBoardForm categoryList={categoryList.data} />;
}
