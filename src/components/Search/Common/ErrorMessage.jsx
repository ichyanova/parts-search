/**
 * Сообщение об ошибке
 * @param {string} message - текст ошибки
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="alert alert-danger mb-0" role="alert">
      {message || 'Не удалось выполнить запрос.'}
    </div>
  );
};

export default ErrorMessage;
