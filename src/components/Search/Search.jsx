import { useSelector } from 'react-redux';
import SearchForm from '@/components/Search/Form/Form';
import Loader from '@/components/UI/Loader/Loader';
import ErrorMessage from '@/components/Search/Common/ErrorMessage';
import Results from '@/components/Search/Results/Results';

const Search = () => {
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);
  const query = useSelector((state) => state.search.query);

  return (
    <div className="row">
      <div className="col-12 col-lg-9">
        <SearchForm />
        {query.number && query.brand && (
          <section className="mt-4">
            {status === 'loading' && <Loader />}
            {status === 'error' && <ErrorMessage message={error} />}
            {status === 'success' && <Results />}
          </section>
        )}
      </div>
    </div>
  );
};

export default Search;
