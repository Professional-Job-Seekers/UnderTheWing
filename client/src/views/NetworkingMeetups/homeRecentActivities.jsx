import { Typography } from 'antd';
import React from 'react';

import CmpActivities from '../../components/cmpActivities';

const HomeRecentActivities = ({ recentActivities, handleLoadMoreActivities }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      <Typography.Title level={3}>Recent Activities</Typography.Title>
      {/* activity timeline */}
      <CmpActivities activities={recentActivities} onLoadMore={handleLoadMoreActivities}></CmpActivities>
    </>
  );
};

export default HomeRecentActivities;
