import { CategoryDomain } from '@/types/category';

export default function CategorySelect({
	categoryItem,
}: {
	categoryItem: CategoryDomain;
}) {
	return (
		<option value={categoryItem.categoryNum}>
			{categoryItem.categoryName}
		</option>
	);
}
