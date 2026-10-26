import WarehouseTable from './WarehouseTable/WarehouseTable';

/**
 * Карточка позиции
 * @param {Object} data - Товар
 * @param {string} data.brand - Марка
 * @param {string} data.number - Артикул
 * @param {string} data.name - Название
 * @param {number} data.count - Количество
 * @param {Object[]} data.analogues - Аналоги
 * @param {Object[]} data.warehouses - Склады
 * @param {boolean} nested - Флаг, указывающий, что карточка вложенная
 * @returns {JSX.Element}
 */
const Item = ({ data, nested = false }) => {
  const { brand, number, name, count, analogues = [], warehouses = [] } = data;

  const filteredAnalogues = analogues.filter((item) => item.count > 0);

  const hasAnalogues = filteredAnalogues.length > 0 && !nested;

  const title = `${brand} · ${number}`;
  const HeaderTag = nested ? 'h4' : 'h2';

  return (
    <article className={nested ? 'card border bg-body-tertiary' : 'card shadow-sm'}>
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
          <div>
            <HeaderTag className={nested ? 'h6 mb-1' : 'h5 mb-1'}>{title}</HeaderTag>
            <div>{name}</div>
          </div>
          <div className="text-md-end">
            <div>{count > 0 ? `В наличии: ${count} шт.` : 'Нет в наличии'}</div>
          </div>
        </div>
        <WarehouseTable warehouses={warehouses} />
        {hasAnalogues && (
          <div className="mt-4">
            <h3 className="h6">Аналоги</h3>
            <div className="d-grid gap-2">
              {filteredAnalogues.map((item) => (
                <Item key={`analogue-${item.goodsID}`} data={item} nested />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Item;
