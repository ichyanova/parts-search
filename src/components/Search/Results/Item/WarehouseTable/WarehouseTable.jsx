import { formatPrice } from '@/helpers/format';

/**
 * Таблица складов
 * @param {Object} warehouses - Массив складов
 * @param {string} warehouses.id - ID склада
 * @param {string} warehouses.code - Код склада, может быть пустым
 * @param {number} warehouses.price - Цена
 * @param {number} warehouses.stock - Остаток
 */
const WarehouseTable = ({ warehouses = [] }) => {
  if (warehouses.length === 0) {
    return <p className="text-secondary mb-0">Нет предложений по&nbsp;складам.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle mb-2">
        <thead>
          <tr>
            <th scope="col">Склад</th>
            <th scope="col">Цена</th>
            <th scope="col">Остаток</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.code || '—'}</td>
              <td className="text-nowrap">{formatPrice(warehouse.price)}</td>
              <td>{warehouse.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseTable;
