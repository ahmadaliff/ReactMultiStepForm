import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import { selectDataAddOns, selectDataPlan } from '@pages/Form/selectors';
import { setPageByValue } from '@pages/Form/actions';

import classes from './style.module.scss';

const FormSummary = ({ plan, addOns }) => {
  const dispatch = useDispatch();

  const handleSumOfAddonsPrice = () => {
    let sumOfAddOnsPrice = 0;
    addOns.forEach(
      (val) => (sumOfAddOnsPrice += parseFloat(val[plan.optionsMonthly ? 'price_monthly' : 'price_yearly']))
    );
    console.log(sumOfAddOnsPrice);
    return sumOfAddOnsPrice;
  };

  const [symbPrice] = useState(plan?.optionsMonthly ? 'mo' : 'yr');
  const [totalPrice] = useState(parseInt(plan?.price) + handleSumOfAddonsPrice());

  return (
    <div className={classes.Summary}>
      <h2>
        <FormattedMessage id="app_header_form_summary_step" />
      </h2>
      <p>
        <FormattedMessage id="app_secondary_header_form_summary_step" />
      </p>
      <div className={classes.boxSummary}>
        <div className={classes.title}>
          <div className={classes.headerWrap}>
            <h3>
              {Object.entries(plan?.planType).filter((val) => val[0])[0]}
              {plan?.optionsMonthly ? ' (Monthly)' : ' (Yearly)'}
            </h3>
            <p
              onClick={() => {
                dispatch(setPageByValue(1));
              }}
            >
              Change
            </p>
          </div>
          <span>
            ${plan?.price}/{symbPrice}
          </span>
        </div>
        {addOns?.map((val, key) => (
          <div className={classes.addOns} key={key}>
            <p>{val.name}</p>
            <span>
              +${val[plan.optionsMonthly ? 'price_monthly' : 'price_yearly']}/{symbPrice}
            </span>
          </div>
        ))}
      </div>
      <div className={classes.total}>
        <p>Total </p>
        <span>
          ${totalPrice}/{symbPrice}
        </span>
      </div>
    </div>
  );
};

FormSummary.propTypes = {
  plan: PropTypes.object,
  addOns: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  plan: selectDataPlan,
  addOns: selectDataAddOns,
});

export default connect(mapStateToProps)(FormSummary);
