/**
 * Пустое состояние результатов поиска
 * @param {Object} query - Запрос
 * @param {string} query.brand - Бренд
 * @param {string} query.number - Артикул
 */
const EmptyState = ({ query }) => {
  const caption = query.brand ? `${query.brand} · ${query.number}` : query.number;

  return (
    <div className="alert alert-secondary mb-0" role="status">
      По запросу «{caption}» ничего не найдено.
    </div>
  );
};

export default EmptyState;
