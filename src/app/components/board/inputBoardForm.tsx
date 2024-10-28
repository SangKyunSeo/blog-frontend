'use client';

import { writeBoardAction } from '@/app/actions/board/writeBoard-action';
import { CategoryDomain } from '@/types/category';
import { getUserIdFromToken } from '@/utils/tokenUtil';
import { useCookies } from 'next-client-cookies';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function InputBoardForm(props: inputBoardFormProps) {
	const cookie = useCookies();
	const [userId] = useState(getUserIdFromToken(cookie.get('accessToken')!));

	const [state, formAction] = useFormState(writeBoardAction, null);
	const [categoryList] = useState(props.categoryList);
	const [selectedCategory, setSelectedCategory] = useState('');

	const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value);
	};

	const router = useRouter();

	useEffect(() => {
		if (state && !state.status && state.error.includes('401')) {
			alert(state.message);
			router.push('/');
		}

		if (state && state.status) {
			alert(state.message);
		}
	}, [state]);
	return (
		<div>
			<div>
				<form action={formAction}>
					<input type="hidden" name="userId" value={userId} />
					<div>
						<span>제목</span>
						<input type="text" name="boardTitle" />
					</div>
					<div>
						<span>내용</span>
						<textarea name="boardContent"></textarea>
					</div>
					<div>
						<label>카테고리</label>
						<select
							name="categoryNum"
							value={selectedCategory}
							onChange={handleSelectCategory}
						>
							{categoryList.map(category => (
								<option key={category.categoryNum} value={category.categoryNum}>
									{category.categoryName}
								</option>
							))}
						</select>
					</div>
					<div>
						<button>작성</button>
						<Link href="/">
							<button>취소</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

interface inputBoardFormProps {
	categoryList: CategoryDomain[];
}
