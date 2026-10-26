import { useSelector } from 'react-redux';
import EmptyState from '@/components/Search/Common/EmptyState';
import Item from './Item/Item';

const Results = () => {
  const goods = useSelector((state) => state.search.goods);
  const query = useSelector((state) => state.search.query);

  if (!goods.length) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="d-grid gap-3">
      {goods.map((item) => (
        <Item key={item.goodsID} data={item} />
      ))}
    </div>
  );
};

export default Results;
