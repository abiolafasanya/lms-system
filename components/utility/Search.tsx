import Link from 'next/link';

const Search = () => {
  return (
    <div className="relative max-w-3xl">
      <form>
        <div className="flex items-center space-x-2">
          <input
            type="search"
            name="search"
            id="search"
            className="ml-2 py-3 px-5 block outline-none border-none hover:outline-blue-500"
          />
          <button className="btn rounded-sm py-3">Search</button>
        </div>
      </form>
      {/* <div id="search-result" className="absolute top-0">
        <Link href={''}>
          <div className="card">
            <h3 className="text-lg font-semibold">Abiola Fasanya</h3>
            <h5 className="text-md">role: user</h5>
          </div>
        </Link>
      </div> */}
    </div>
  );
};

export default Search;
