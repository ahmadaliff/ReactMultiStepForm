import React from 'react';
import imgThank from '../../assets/images/icon-thank-you.svg';

import classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { resetForm } from '@pages/Form/actions';
const FormFinish = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.FinishPage}>
      <img
        src={imgThank}
        className={classes.imgThank}
        alt="Subscription confirmed"
        onClick={() => dispatch(resetForm())}
      />
      <h2>
        <FormattedMessage id="app_header_finish_form" />
      </h2>
      <p>
        <FormattedMessage id="app_secondary_header_finish_form" />
      </p>
    </div>
  );
};

export default FormFinish;
