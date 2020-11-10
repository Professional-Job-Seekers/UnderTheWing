import { BarcodeOutlined, EditOutlined, EllipsisOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import _ from 'lodash';
import React from 'react';

import FORMLAYOUT from '../../../constants/FORMLAYOUT';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import INPUTSELECT from '../../../constants/INPUTSELECT';
import CtxApi from '../../../contexts/ctxApi';

const PROJECTCODE_MAXCHAR = 5;

const ProjectEdit = ({ match, handleCloseDrawerWithCallback }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // form control
  const [form] = Form.useForm();

  // END -- OTHERS

  // START -- STATES

  // select list: collaborators
  const [selectCollaborator, selectCollaboratorSet] = React.useState({ isLoading: true, data: [] });

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // make project code uppercase
  const handleConvertToUppercase = (event) => form.setFieldsValue({ code: event.target.value.toUpperCase() });

  // submit: edit project
  const handleSubmit = async (values) => {
    // submitting...
    isSubmittingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/project/${match.params.projectCode}`, HTTPMETHOD.PUT, values);

      handleCloseDrawerWithCallback(response);
    } catch (error) {
      // not submitting...
      isSubmittingSet(false);
    }
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    // get initial data
    svsT3dapi
      .sendRequest(`api/project/edit/${match.params.projectCode}`, HTTPMETHOD.GET)
      .then((response) => {
        // set initial data
        // initialDataSet(response.data);

        form.setFieldsValue(response.data);

        // populate select list: collaborators
        svsT3dapi
          .sendRequestSelectList('user')
          .then((response) => selectCollaboratorSet({ isLoading: false, data: response.data }))
          .catch((error) => selectCollaboratorSet({ isLoading: false }));
      })
      .catch((error) => {});
  }, [form, match.params.projectCode, svsT3dapi]);

  // END -- EFFECTS

  return (
    <Form {...FORMLAYOUT.sameRow.body} form={form} onFinish={handleSubmit}>
      {/* name */}
      <Form.Item hasFeedback label='Name' name='name' rules={[{ required: true, whitespace: true, message: 'project name is required' }]}>
        <Input autoFocus placeholder='project name' prefix={<EllipsisOutlined></EllipsisOutlined>}></Input>
      </Form.Item>
      {/* code */}
      <Form.Item
        hasFeedback
        label='Code'
        name='code'
        rules={[
          { required: true, whitespace: true, message: 'code is required' },
          { max: PROJECTCODE_MAXCHAR, message: `max. code is ${PROJECTCODE_MAXCHAR} character` },
        ]}>
        <Input autoFocus placeholder={`friendly project code (max. ${PROJECTCODE_MAXCHAR} character)`} onChange={handleConvertToUppercase} prefix={<BarcodeOutlined></BarcodeOutlined>}></Input>
      </Form.Item>
      {/* description */}
      <Form.Item hasFeedback label='Description' name='description'>
        <Input autoFocus placeholder='project description' prefix={<EllipsisOutlined></EllipsisOutlined>}></Input>
      </Form.Item>
      {/* collaborators */}
      <Form.Item hasFeedback label='Collaborators' name='collaborators'>
        <Select
          {...INPUTSELECT.SEARCH_PROPERTY}
          mode='multiple'
          notFoundContent='collaborator not found'
          placeholder='- select project collaborators -'
          loading={selectCollaborator.isLoading}
          suffixIcon={<TeamOutlined></TeamOutlined>}
          onSearch={_.debounce(async (searchString) => {
            // get collaborator selectlist data
            selectCollaboratorSet((_selectCollaborators) => ({ ...selectCollaborator, isLoading: true }));
            const responseSelectCollaborators = await svsT3dapi.sendRequestSelectList('user', { search: searchString });
            selectCollaboratorSet({ isLoading: false, data: responseSelectCollaborators.data });
          }, INPUTSELECT.SEARCH_DELAY)}>
          {selectCollaborator.data.map((collaborator, collaboratorIndex) => (
            <Select.Option key={collaboratorIndex} value={collaborator.value}>
              {collaborator.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {/* submit button */}
      <Button block htmlType='submit' type='primary' loading={isSubmitting} icon={<EditOutlined></EditOutlined>}></Button>
    </Form>
  );
};

export default ProjectEdit;
