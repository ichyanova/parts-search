import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { searchParts } from '@/store/searchSlice';
import InputDropdown from './InputDropdown/InputDropdown';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(import.meta.env.VITE_API_KEY || '');

  const onBrandSet = (item) => {
    dispatch(
      searchParts({
        key,
        number: item.number,
        brand: item.brand,
        analogues: true,
      }),
    );
  };

  return (
    <Form className="card shadow-sm" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12 col-lg-9">
            <label className="form-label" htmlFor="api-key">
              Ключ покупателя
            </label>
            <Form.Control
              id="api-key"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="col-12 col-lg-9">
            <label className="form-label" htmlFor="part-number">
              Артикул
            </label>
            <InputDropdown apiKey={key} setBrand={onBrandSet} />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
