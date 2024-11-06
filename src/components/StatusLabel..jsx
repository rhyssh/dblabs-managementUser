import PropTypes from 'prop-types';

StatusLabel.propTypes = {
    status: PropTypes.string.isRequired,
  };

const StatusLabel = ({ status  }) => {
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status}
        </span>
    )
}

export default StatusLabel