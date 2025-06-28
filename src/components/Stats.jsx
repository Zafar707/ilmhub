import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/statsSlice';

function Stats() {
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 py-12 text-center bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-ilm-blue mb-6">Bizning Statistikamiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-4xl font-bold text-ilm-green">{stats.students}</p>
          <p className="text-gray-600">O'quvchilar</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-ilm-green">{stats.courses}</p>
          <p className="text-gray-600">Kurslar</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-ilm-green">{stats.certificates}</p>
          <p className="text-gray-600">Sertifikatlar</p>
        </div>
      </div>
      <button
        onClick={() => dispatch(increment())}
        className="mt-4 px-4 py-2 bg-ilm-blue text-white rounded hover:bg-blue-700"
      >
        Yangilash
      </button>
    </div>
  );
}

export default Stats;