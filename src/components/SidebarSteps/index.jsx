import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { selectCurrentPage } from '@pages/Form/selectors';

import StepComp from '@components/StepComp';

import classes from './style.module.scss';

const SidebarSteps = ({ page, intl: { formatMessage } }) => {
  return (
    <div className={classes.sidebar}>
      <StepComp step={1} title={formatMessage({ id: 'app_sidebar_step_one' })} active={page == 0} />
      <StepComp step={2} title={formatMessage({ id: 'app_sidebar_step_two' })} active={page == 1} />
      <StepComp step={3} title={formatMessage({ id: 'app_sidebar_step_three' })} active={page == 2} />
      <StepComp step={4} title={formatMessage({ id: 'app_sidebar_step_four' })} active={page == 3} />
    </div>
  );
};

SidebarSteps.propTypes = {
  page: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  page: selectCurrentPage,
});

export default injectIntl(connect(mapStateToProps)(SidebarSteps));
