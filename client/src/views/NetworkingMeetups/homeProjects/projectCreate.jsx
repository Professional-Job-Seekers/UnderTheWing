import { BarcodeOutlined, EllipsisOutlined, SaveOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import _ from 'lodash';
import React from 'react';

import FORMLAYOUT from '../../../constants/FORMLAYOUT';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import INPUTSELECT from '../../../constants/INPUTSELECT';
import CtxApi from '../../../contexts/ctxApi';

const PROJECTCODE_MAXCHAR = 5;

const initialFormValue = {
  name: '',
  code: '',
  description: '',
  collaborators: [],
};

const ProjectCreate = ({ handleCloseDrawerWithCallback }) => {
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
  // const handleConvertToUppercase = (event) => form.setFieldsValue({ code: event.target.value.toUpperCase() });

  // submit: project create
  const handleSubmit = async (values) => {
    // submitting...
    isSubmittingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest('api/project', HTTPMETHOD.POST, values);

      // close drawer and supply callback function parameters
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
    // populate select list: collaborators
    svsT3dapi
      .sendRequestSelectList('user')
      .then((response) => selectCollaboratorSet({ isLoading: false, data: response.data }))
      .catch((error) => selectCollaboratorSet((_selectCollaborator) => ({ ..._selectCollaborator, isLoading: false })));
  }, [svsT3dapi]);

  // END -- EFFECTS

  // unselected collaborators
  // const selectCollaboratorUnselected = selectCollaborator.data.filter((collaborator) => !selectCollaboratorSelected.includes(collaborator.value));

  return (
    <Form {...FORMLAYOUT.sameRow.body} form={form} initialValues={initialFormValue} onFinish={handleSubmit}>
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
          { pattern: new RegExp(/[^\s-]/, 'i'), message: 'code cannot contain space' },
        ]}>
        <Input autoFocus placeholder={`friendly project code (max. ${PROJECTCODE_MAXCHAR} character)`} prefix={<BarcodeOutlined></BarcodeOutlined>}></Input>
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
      <Button block type='primary' htmlType='submit' loading={isSubmitting} icon={<SaveOutlined></SaveOutlined>}></Button>
    </Form>
  );
};

export default ProjectCreate;
