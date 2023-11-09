import PropTypes from 'prop-types';
import SidebarSteps from '@components/SidebarSteps';

import { selectCurrentPage, selectIsConfirm } from './selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import FormInfoStep from '@components/FormInfoStep';
import FormPlanStep from '@components/FormPlanStep';
import FormAddOns from '@components/FormAddOns';
import FormSummary from '@components/FormSummary';
import FormFinish from '@components/FormFinish';
import FormButton from '@components/FormButton';

import classes from './style.module.scss';

const FormPage = ({ page, isConfirm }) => {
  const setFormComp = () => {
    switch (page) {
      case 0:
        return <FormInfoStep />;
      case 1:
        return <FormPlanStep />;
      case 2:
        return <FormAddOns />;
      case 3:
        return <FormSummary />;
    }
  };
  return (
    <main>
      <div className={classes.Formpage}>
        <div className={classes.Container}>
          <SidebarSteps />
          <div className={classes.content}>
            {isConfirm ? <FormFinish /> : setFormComp()}
            {!isConfirm && page != 0 && <FormButton />}
          </div>
        </div>
      </div>
    </main>
  );
};

FormPage.propTypes = {
  page: PropTypes.number,
  isConfirm: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  page: selectCurrentPage,
  isConfirm: selectIsConfirm,
});

export default connect(mapStateToProps)(FormPage);
