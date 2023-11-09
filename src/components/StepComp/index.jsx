import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const StepComp = ({ step, title, active }) => {
  return (
    <div className={classes.step}>
      <span className={`${classes.stepNumber} ${active && classes.active}`}>{step}</span>
      <div className={classes.stepInfo}>
        <span>
          <FormattedMessage id="app_sidebar_step" /> {step}
        </span>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StepComp;
