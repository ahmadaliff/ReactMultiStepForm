import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDataUser } from '@pages/Form/selectors';
import { setDataUser } from '@pages/Form/actions';

import FormButton from '@components/FormButton';

import classes from './style.module.scss';

const FormInfoStep = ({ userRedux }) => {
  const dispatch = useDispatch();

  const isUserEmpty = JSON.stringify(userRedux) === '{}';
  const [valid, setValid] = useState({});
  const [user, setUser] = useState(
    isUserEmpty
      ? {
          name: '',
          email: '',
          phone: '',
        }
      : userRedux
  );

  const emailvalidation = (val) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(val);
  };

  const phoneValidation = (val) => {
    return !isNaN(val) && val != '';
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    let validate = false;
    if (user.name === '') {
      validate = { ...validate, name: 'Name Is Required' };
    }
    if (!emailvalidation(user.email)) {
      if (user.email === '') {
        validate = { ...validate, email: 'Email is Required' };
      } else {
        validate = { ...validate, email: 'Invalid Email Address' };
      }
    }
    if (!phoneValidation(user.phone)) {
      if (user.phone === '') {
        validate = { ...validate, phone: 'Phone Is Required' };
      } else {
        validate = { ...validate, phone: 'Invalid Phone Number format' };
      }
    }
    setValid(validate);
    !validate && dispatch(setDataUser(user));
    return !validate;
  };

  return (
    <>
      <div className={classes.info}>
        <h2>
          <FormattedMessage id="app_header_form_info_step" />
        </h2>
        <p>
          <FormattedMessage id="app_secondary_header_form_info_step" />
        </p>
        <form className={classes.form} autoComplete="on">
          <div className={classes.fields}>
            <div className={classes.displayFlex}>
              <label>
                <FormattedMessage id="app_form_info_name_label" />
              </label>
              <span>{valid?.name}</span>
            </div>
            <input
              type="text"
              name="name"
              autoComplete="on"
              placeholder="e.g. Stephe king"
              value={user.name}
              onChange={handleChange}
              className={valid.email != '' ? classes.error : ''}
            />
          </div>
          <div className={classes.fields}>
            <div className={classes.displayFlex}>
              <label>
                <FormattedMessage id="app_form_info_email_label" />
              </label>
              <span>{valid?.email}</span>
            </div>
            <input
              type="text"
              inputMode="email"
              name="email"
              placeholder="e.g. Stepheking@lorem.com"
              value={user.email}
              onChange={handleChange}
              className={valid?.phone != '' ? classes.error : ''}
            />
          </div>
          <div className={classes.fields}>
            <div className={classes.displayFlex}>
              <label>
                <FormattedMessage id="app_form_info_phone_number_label" />
              </label>
              <span>{valid?.phone}</span>
            </div>
            <input
              type="text"
              placeholder="e.g. +1 234 567 890"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className={valid?.email != '' ? classes.error : ''}
            />
          </div>
        </form>
      </div>
      <FormButton handleValidation={() => handleValidation()} />
    </>
  );
};

FormInfoStep.propTypes = {
  userRedux: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userRedux: selectDataUser,
});

export default connect(mapStateToProps)(FormInfoStep);
