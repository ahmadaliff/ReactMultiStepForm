import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDataAddOns, selectDataPlan } from '@pages/Form/selectors';
import { addDataAddOns, deleteDataAddOns } from '@pages/Form/actions';

import classes from './style.module.scss';

const FormAddOns = ({ plan, dataAddOns }) => {
  const dispatch = useDispatch();

  const checkIsCheckInRedux = (name) => {
    return dataAddOns.filter((filVal) => filVal.name === name).length > 0;
  };

  const handleAddOns = (e) => {
    setcheckAddOns({ ...checkAddOns, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      dispatch(
        addDataAddOns({
          name: e.target.name,
          price_monthly: addOns[e.target.name].price.monthly,
          price_yearly: addOns[e.target.name].price.yearly,
        })
      );
    } else {
      dispatch(deleteDataAddOns(e.target.name));
    }
  };

  const [addOns] = useState({
    onlineService: {
      name: 'onlineService',
      title_id: 'app_add_ons_online_service_title',
      description_id: 'app_add_ons_online_service_description',
      price: { monthly: 1, yearly: 10 },
    },
    largerStorage: {
      name: 'largerStorage',
      title_id: 'app_add_ons_larger_storage_title',
      description_id: 'app_add_ons_larger_storage_description',
      price: { monthly: 2, yearly: 20 },
    },
    customizableProfile: {
      name: 'customizableProfile',
      title_id: 'app_add_ons_customizable_profile_title',
      description_id: 'app_add_ons_customizable_profile_description',
      price: { monthly: 2, yearly: 20 },
    },
  });
  const [PlanOptions] = useState(plan?.optionsMonthly ? 'monthly' : 'yearly');
  const [checkAddOns, setcheckAddOns] = useState({
    onlineService: checkIsCheckInRedux('onlineService'),
    largerStorage: checkIsCheckInRedux('largerStorage'),
    customizableProfile: checkIsCheckInRedux('customizableProfile'),
  });

  return (
    <div className={classes.addons}>
      {console.log(PlanOptions)}
      <h2>
        <FormattedMessage id="app_header_form_addons_step" />
      </h2>
      <p>
        <FormattedMessage id="app_secondary_header_form_addons_step" />
      </p>
      <div className={classes.packs}>
        {Object.values(addOns).map((val, key) => (
          <label
            htmlFor={val?.name}
            className={`${classes.pack} ${checkAddOns[val?.name] && classes.packChecked}`}
            key={key}
          >
            <div className={classes.displayFlex}>
              <input
                className={classes.checkMark}
                type="checkbox"
                checked={checkAddOns[val?.name]}
                name={val?.name}
                id={val?.name}
                onChange={handleAddOns}
              />
              <div className={classes.title}>
                <h3>
                  <FormattedMessage id={val.title_id} />
                </h3>
                <p>
                  <FormattedMessage id={val.description_id} />
                </p>
              </div>
            </div>
            <span>
              +${val.price[PlanOptions]}/{plan?.optionsMonthly ? 'mo' : 'yr'}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

FormAddOns.propTypes = {
  plan: PropTypes.object,
  dataAddOns: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  plan: selectDataPlan,
  dataAddOns: selectDataAddOns,
});

export default connect(mapStateToProps)(FormAddOns);
