import { useState, useEffect, useRef } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/UI/Loader/Loader';
import ErrorMessage from '@/components/Search/Common/ErrorMessage';
import './InputDropdown.css';
import useSearch from './use-search';

/**
 * Компонент поля ввода с выпадающим списком результатов поиска
 * @param {string} className - класс для контейнера
 * @param {string} apiKey - ключ пользователя
 * @param {function} setBrand - функция для установки бренда
 */
const InputDropdown = ({ className, apiKey, setBrand }) => {
  const containerRef = useRef(null);

  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const brands = useSelector((state) => state.search.brands);
  const status = useSelector((state) => state.search.brandStatus);
  const error = useSelector((state) => state.search.brandError);

  const brandsWithCount = brands.filter((item) => item.count > 0);
  const isLoading = status === 'loading';

  useSearch(query, apiKey);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectResult = (item) => {
    setShowDropdown(false);
    setBrand(item);
  };

  const hasResults = brandsWithCount.length > 0 && status === 'success';

  const hasNoResults = brandsWithCount.length === 0 && query.trim() !== '' && status === 'success';

  return (
    <div className={className} ref={containerRef}>
      <Form.Control
        type="text"
        id="part-number"
        placeholder="Поиск по артикулу"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setShowDropdown(true)}
      />
      <Dropdown show={showDropdown}>
        <Dropdown.Menu className={`w-100 custom-dropdown-menu`}>
          {!query.trim() && (
            <Dropdown.Item disabled className="py-2 text-muted">
              Введите артикул для начала поиска
            </Dropdown.Item>
          )}

          {isLoading && <Loader className="menu-loading" />}

          {hasResults && (
            <>
              <Dropdown.Item disabled className="py-2 text-muted">
                Выберите производителя из&nbsp;списка
              </Dropdown.Item>
              {brandsWithCount.map((item, index) => (
                <Dropdown.Item
                  key={item.goodsID || `${item.brand}-${item.number}-${index}`}
                  onClick={() => handleSelectResult(item)}
                  className="py-2"
                >
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <span className="d-block" style={{ maxWidth: '240px' }}>
                      {item.brand}
                    </span>
                    <small className="text-muted text-truncate">
                      {item.name} [{item.number}]
                    </small>
                  </div>
                </Dropdown.Item>
              ))}
            </>
          )}

          {hasNoResults && (
            <Dropdown.Item disabled className="py-2 text-muted">
              Ничего не&nbsp;найдено по&nbsp;запросу "{query}"
            </Dropdown.Item>
          )}

          {status === 'error' && error && (
            <Dropdown.Item disabled className="py-2 text-muted">
              <ErrorMessage message={error} />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default InputDropdown;
