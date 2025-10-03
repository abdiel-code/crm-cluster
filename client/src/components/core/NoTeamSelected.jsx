import { Link } from 'react-router-dom';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

const NoTeamSelected = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center max-w-md px-6">
        <div className="mb-6 flex justify-center">
          <div className="bg-[#BDD5EA] rounded-full p-8">
            <FaUsers className="w-20 h-20 text-[#577399]" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#495867] mb-4">
          No Team Selected
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          You need to join or select a team before accessing collaborative
          tasks.
        </p>

        <Link
          to="/connect"
          className="inline-flex items-center gap-2 bg-[#577399] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#495867] transition-colors"
        >
          Select a Team
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default NoTeamSelected;
