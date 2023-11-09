import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import imgArcade from '../../assets/images/icon-arcade.svg';
import imgAdvanced from '../../assets/images/icon-advanced.svg';
import imgPro from '../../assets/images/icon-pro.svg';

import { selectDataPlan } from '@pages/Form/selectors';
import { setDataPlan } from '@pages/Form/actions';

import classes from './style.module.scss';

const FormPlanStep = ({ dataPlan }) => {
  const dispatch = useDispatch();

  const isDataPlanEmpty = JSON.stringify(dataPlan) === '{}';

  const [plan, setPlan] = useState(
    isDataPlanEmpty
      ? {
          arcade: true,
          advanced: false,
          pro: false,
        }
      : dataPlan?.planType
  );
  const [plansOption] = useState({
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 },
  });
  const [switchOff, setSwitch] = useState(isDataPlanEmpty ? false : !dataPlan?.optionsMonthly);

  useEffect(() => {
    dispatch(
      setDataPlan({
        planType: plan,
        optionsMonthly: !switchOff,
        price:
          plansOption[Object.entries(plan).filter((val) => val[1] == true)[0][0]][switchOff ? 'yearly' : 'monthly'],
      })
    );
  }, [plan, switchOff]);

  return (
    <div className={classes.plan}>
      {console.log(isDataPlanEmpty)}
      <h2>
        <FormattedMessage id="app_header_form_plan_step" />
      </h2>
      <p>
        <FormattedMessage id="app_secondary_header_form_plan_step" />
      </p>
      <div className={classes.plansCrads}>
        <div onClick={() => setPlan({ arcade: true, advanced: false, pro: false })}>
          <div className={`${classes.planCard} ${plan.arcade && classes.planClick}`}>
            <img src={imgArcade} alt="Arcade" />
            <div className={classes.title}>
              <h3>
                <FormattedMessage id="app_form_plan_arcade" />
              </h3>
              <p>${switchOff ? plansOption?.arcade?.yearly + '/yr' : plansOption?.arcade?.monthly + '/mo'}</p>
              {switchOff && (
                <p style={{ color: '#174a89' }}>
                  <FormattedMessage id="app_form_plan_step_two_months_free" />
                </p>
              )}
            </div>
          </div>
        </div>
        <div onClick={() => setPlan({ arcade: false, advanced: true, pro: false })}>
          <div className={`${classes.planCard} ${plan.advanced && classes.planClick}`}>
            <img src={imgAdvanced} alt="Arcade" />
            <div className={classes.title}>
              <h3>
                <FormattedMessage id="app_form_plan_advance" />
              </h3>
              <p>${switchOff ? plansOption?.advanced?.yearly + '/yr' : plansOption?.advanced?.monthly + '/mo'}</p>
              {switchOff && (
                <p style={{ color: '#174a89' }}>
                  <FormattedMessage id="app_form_plan_step_two_months_free" />
                </p>
              )}
            </div>
          </div>
        </div>
        <div onClick={() => setPlan({ arcade: false, advanced: false, pro: true })}>
          <div className={`${classes.planCard} ${plan.pro && classes.planClick}`}>
            <img src={imgPro} alt="Arcade" />
            <div className={classes.title}>
              <h3>
                <FormattedMessage id="app_form_plan_pro" />
              </h3>
              <p>${switchOff ? plansOption?.pro?.yearly + '/yr' : plansOption?.pro?.monthly + '/mo'}</p>
              {switchOff && (
                <p style={{ color: '#174a89' }}>
                  <FormattedMessage id="app_form_plan_step_two_months_free" />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <label htmlFor="plan" className={classes.switch}>
        <span className={!switchOff ? classes.switchOn : ''}>
          <FormattedMessage id="app_monthly_form_plan_step" />
        </span>
        <input type="checkbox" name="plan" id="plan" checked={switchOff} onChange={() => setSwitch(!switchOff)} />
        <span className={switchOff ? classes.switchOn : ''}>
          <FormattedMessage id="app_yearly_form_plan_step" />
        </span>
      </label>
    </div>
  );
};

FormPlanStep.propTypes = {
  dataPlan: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dataPlan: selectDataPlan,
});

export default connect(mapStateToProps)(FormPlanStep);
