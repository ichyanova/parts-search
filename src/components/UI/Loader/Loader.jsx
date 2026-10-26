import { Spinner } from 'react-bootstrap';

const Loader = ({ className = '' }) => {
  return (
    <div className={`d-flex align-items-center gap-3 py-3 ${className}`} role="status">
      <div>Загрузка...</div>
      <Spinner animation="border" size="sm" variant="warning" />
    </div>
  );
};

export default Loader;
