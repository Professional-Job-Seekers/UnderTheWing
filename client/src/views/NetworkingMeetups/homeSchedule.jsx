import './homeSchedule.css';

import { ClockCircleOutlined, ExclamationCircleTwoTone, StarTwoTone, WarningTwoTone } from '@ant-design/icons';
import { Calendar, Tag, Typography } from 'antd';
import moment from 'moment';
import React from 'react';

import COLOR from '../../constants/COLOR';
import SCHEDULE_TYPE from '../../constants/SCHEDULE_TYPE';
import SELECTOPTIONS, { SELECTOPTION } from '../../constants/SELECTOPTIONS';
import TIMEFORMAT from '../../constants/TIMEFORMAT';
import { makeEllipsis } from '../../utilities/utlType';

const HomeSchedule = ({ schedules = [], onMonthChanged }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // render schedule type
  const renderScheduleType = React.useCallback((schedule) => {
    // render nothing if empty
    if (!schedule.type) return null;

    switch (schedule.type) {
      // to do reminder
      case SCHEDULE_TYPE.TODO_REMINDER:
        return (
          <>
            <ClockCircleOutlined></ClockCircleOutlined> {moment(schedule.date).format(TIMEFORMAT.HHMM)}{' '}
          </>
        );
      // to do end date
      case SCHEDULE_TYPE.TODO_DATEEND:
        return (
          <>
            <ExclamationCircleTwoTone twoToneColor={COLOR.ORANGE}></ExclamationCircleTwoTone>{' '}
          </>
        );
      // project deadline
      case SCHEDULE_TYPE.PROJECT_DEADLINE:
        return (
          <>
            <WarningTwoTone twoToneColor={COLOR.RED}></WarningTwoTone>{' '}
          </>
        );
      // not recognized
      default:
        return null;
    }
  }, []);

  // render date cell
  const renderDateCell = (date) => {
    // get schedule for this date
    const currentDateSchedules = schedules.filter((schedule) => moment(schedule.date).isSame(date, 'date'));

    // render the schedules
    return (
      <ul className='schedule-calendar-list'>
        {currentDateSchedules.map((schedule, scheduleIndex) => {
          // get to do priority
          const selectOptionTodoPriority = SELECTOPTION.TODO_PRIORITY[schedule.priority];

          // render
          return (
            <li key={scheduleIndex}>
              {renderScheduleType(schedule)}
              {/* important flag */}
              {schedule.isImportant && <StarTwoTone twoToneColor={COLOR.YELLOW}></StarTwoTone>}
              {/* priority */}
              {schedule.priority !== SELECTOPTIONS.UNRENDERED_TODO_PRIORITY && selectOptionTodoPriority && <Tag color={selectOptionTodoPriority.todoColor}>{selectOptionTodoPriority.text}</Tag>}
              {/* description (ellipsized) */}
              {makeEllipsis(schedule.description)}
            </li>
          );
        })}
      </ul>
    );
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      <Typography.Title level={3}>Schedule</Typography.Title>
      <Calendar onPanelChange={onMonthChanged} dateCellRender={renderDateCell}></Calendar>
    </>
  );
};

export default React.memo(HomeSchedule);
