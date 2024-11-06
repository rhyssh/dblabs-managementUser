import PropTypes from 'prop-types'; // Import PropTypes

const StatusLabel = ({ status }) => {
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status}
        </span>
    )
}

const Table = ({ datas, onSort, onDelete, onEdit }) => {
    if (!datas || datas.length === 0) {
        return <div>No data available</div>; // Tampilkan pesan jika tidak ada data
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Name
                                <button onClick={() => onSort('name')}>
                                    {/* Sorting icon */}
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Age
                                <button onClick={() => onSort('age')}>
                                    {/* Sorting icon */}
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Status
                                <button onClick={() => onSort('membershipStatus')}>
                                    {/* Sorting icon */}
                                </button>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data) => (
                        <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.name}
                            </th>
                            <td className="px-6 py-4">
                                {data.email}
                            </td>
                            <td className="px-6 py-4">
                                {data.age}
                            </td>
                            <td className="px-6 py-4">
                                <StatusLabel status={data.membershipStatus} />
                            </td>
                            <td className="px-6 py-4 flex flex-wrap gap-3">
                                <button
                                    onClick={() => onEdit(data)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(data.id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// PropTypes validation
StatusLabel.propTypes = {
    status: PropTypes.string.isRequired
}
Table.propTypes = {
    datas: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            membershipStatus: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSort: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default Table;
