import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs } from '@material-ui/core';
import TabPanel from './tabPanel';

// STYLES
import { BoxWrapperStyled, TabBoxStyled, LabelWrapper } from './style';

const BasicTabs = ({ TabLabels }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <BoxWrapperStyled>
      <TabBoxStyled>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs statistics quiz"
          centered
        >
          {TabLabels.map((item, index) => (
            <Tab
              key={item.label}
              aria-label={item.label}
              label={
                <LabelWrapper>
                  {item.icon}
                  {item.label}
                </LabelWrapper>
              }
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </TabBoxStyled>
      {TabLabels.map((item, index) => (
        <TabPanel key={item.label} value={value} index={index}>
          {item.component}
        </TabPanel>
      ))}
    </BoxWrapperStyled>
  );
};

BasicTabs.propTypes = {
  TabLabels: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.string,
      component: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default BasicTabs;
