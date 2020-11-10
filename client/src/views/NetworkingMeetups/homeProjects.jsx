import { ClockCircleOutlined, EllipsisOutlined, PlusOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';
import './homeProjects.css';
import { Button, Card, Input, Space, Spin, Typography } from 'antd';
import _ from 'lodash';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';

import CmpDrawer from '../../components/cmpDrawer';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import INPUTSELECT from '../../constants/INPUTSELECT';
import PADDING from '../../constants/PADDING';
import TIMEFORMAT from '../../constants/TIMEFORMAT';
import CtxApi from '../../contexts/ctxApi';
import { convertIsoDateToMoment } from '../../utilities/utlType';
import ProjectCreate from './homeProjects/projectCreate';

const HomeProjects = ({ recentProjects, recentProjectsSet, handleProjectCreated, match }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // searching state
  const [isSearching, isSearchingSet] = React.useState(false);

  // search query
  const [searchQuery, searchQuerySet] = React.useState('');

  // END -- STATES

  // START -- FUNCTIONS

  // open drawer: project create
  const handleOpenDrawerProjectCreate = () => history.push(`${match.url}/createproject`);

  // navigate: project
  const handleNavigateToProject = (projectCode) => history.push(`/project/${projectCode}`);

  // search project
  const handleSearchProjects = (event) => {
    event.persist();
    handleSearchProjectsDebounced(event.target.value);
    searchQuerySet(event.target.value);
  };
  const handleSearchProjectsDebounced = _.debounce(async (value) => {
    // searching...
    isSearchingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/user/recentprojects?search=${value}`, HTTPMETHOD.GET);

      // set recent projects
      recentProjectsSet(response.data);
    } catch (error) {
    } finally {
      // not searching...
      isSearchingSet(false);
    }
  }, INPUTSELECT.SEARCH_DELAY);

  // refresh project
  const handleRefreshProjects = async () => {
    // searching
    isSearchingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/user/recentprojects?search=${searchQuery}`, HTTPMETHOD.GET);

      // set recent projects
      recentProjectsSet(response.data);
    } catch (error) {
    } finally {
      // not searching
      isSearchingSet(false);
    }
  };

  // // horizontal mouse scroll on a container
  // const handleHorizontalScroll = (event) => {
  //   event.preventDefault();
  //   const elementRow = event.target.closest('.recent-projects');
  //   const elementRowScrollPosition = elementRow.scrollLeft;
  //   elementRow.scrollTo({
  //     top: 0,
  //     left: elementRowScrollPosition + event.deltaY,
  //     behaviour: 'smooth',
  //   });
  // };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <Spin spinning={isSearching} tip='searching projects..'>
      <Space direction='vertical' style={{ width: '100%' }}>
        {/* title */}
        <Typography.Title level={3} style={{ ...PADDING.LEFT_RIGHT(), marginBottom: 0 }}>
          Projects
        </Typography.Title>
        {/* sub */}
        <Space>
          {/* search bar */}
          <div style={{ width: 266, paddingLeft: 16, marginRight: 8 }}>
            <Input allowClear name='searchProject' placeholder='search project' onChange={handleSearchProjects}></Input>
          </div>
          {/* refresh button */}
          <Button type='primary' icon={<ReloadOutlined></ReloadOutlined>} onClick={handleRefreshProjects}></Button>
        </Space>
        {/* project list */}
        <PerfectScrollbar className='recent-projects' /**onWheel={handleHorizontalScroll} */>
          {/* render create project card */}
          <Card className='recent-project-card recent-project-card-create' bordered={false}>
            <Button type='primary' size='large' icon={<PlusOutlined></PlusOutlined>} onClick={handleOpenDrawerProjectCreate} style={{ width: '100%', height: '100%' }}></Button>
          </Card>
          {/* render other projects */}
          {recentProjects.map((project, projectIndex) => (
            <Card
              className='recent-project-card'
              key={projectIndex}
              size='small'
              title={`[${project.code}] ${project.name}`}
              // extra={project.is_owning ? <Button type='link' icon={<SettingOutlined></SettingOutlined>} onClick={() => handleOpenDrawerProjectEdit(project.code)}></Button> : false}
              onClick={() => handleNavigateToProject(project.code)}
              // actions={[<Button block type='primary' icon={<ArrowRightOutlined></ArrowRightOutlined>} onClick={}></Button>]}
            >
              <p>
                <EllipsisOutlined></EllipsisOutlined> {project.description}
              </p>
              <p>
                <UserOutlined></UserOutlined> {project.is_owning ? <b>{project.author}</b> : project.author}
              </p>
              <p>
                <ClockCircleOutlined></ClockCircleOutlined> {convertIsoDateToMoment(project.last_accessed, TIMEFORMAT.DDMMYYHHMMSS_BACKSLASH)}
              </p>
            </Card>
          ))}
        </PerfectScrollbar>
        {/* routes */}
        {/* create project */}
        <Route
          path={`${match.url}/createproject`}
          render={({ match: _match }) => (
            <CmpDrawer title='Create project' width={500} history={history} drawerCloseCallback={handleProjectCreated}>
              <ProjectCreate match={_match}></ProjectCreate>
            </CmpDrawer>
          )}></Route>
      </Space>
    </Spin>
  );
};

export default React.memo(HomeProjects);
