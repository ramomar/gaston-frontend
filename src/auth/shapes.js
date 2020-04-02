import PropTypes from 'prop-types';

const loginStatus = PropTypes.shape({
  isLogginIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  invalidUserOrPassword: PropTypes.bool.isRequired
});

export default {
  loginStatus
};
