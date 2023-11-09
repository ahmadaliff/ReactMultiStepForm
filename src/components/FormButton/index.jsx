import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { selectCurrentPage } from '@pages/Form/selectors';
import { setIsConfirm, setNextPage, setPrevPage } from '@pages/Form/actions';

import classes from './style.module.scss';

const FormButton = ({ page, handleValidation }) => {
  const dispatch = useDispatch();
  const handleNext = () => {
    switch (page) {
      case 0:
        handleValidation() && dispatch(setNextPage());
        break;
      case 3:
        dispatch(setIsConfirm());
      default:
        dispatch(setNextPage());
        break;
    }
  };
  return (
    <div className={`${classes.navigation} ${page == 0 && classes.btnRight} `}>
      {page != 0 && (
        <button className={classes.btn1} onClick={() => dispatch(setPrevPage())}>
          <FormattedMessage id="app_form_button_back" />
        </button>
      )}
      <button className={classes.btn2} onClick={() => handleNext()}>
        {page == 3 ? (
          <FormattedMessage id="app_form_button_confirm" />
        ) : (
          <FormattedMessage id="app_form_button_next_step" />
        )}
      </button>
    </div>
  );
};
FormButton.propTypes = {
  page: PropTypes.number,
};
const mapStateToProps = createStructuredSelector({
  page: selectCurrentPage,
});

export default connect(mapStateToProps)(FormButton);
