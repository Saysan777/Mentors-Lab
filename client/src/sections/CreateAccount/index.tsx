import { Card, Form, Input, Layout, Select } from 'antd';
import { Role } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { createAccount } from 'store/auth/auth.actions';
import { clearAuthError } from 'store/auth/auth.slice';
import { CreateAccountData } from 'types';
import { displayErrorMessage } from 'utils/notifications';
import signupImg from './assets/signup.svg';

const { Content } = Layout;
const { Item } = Form;
const { Option } = Select;
const { Password } = Input;

export const CreateAccount = () => {
  const dispatch = useAppDispatch();

  const { error, status } = useAppSelector((state) => state.auth);

  const onFormSubmit = (formData: CreateAccountData) => {
    dispatch(createAccount(formData));
  };

  useEffect(() => {
    if (error) {
      displayErrorMessage(error);
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  return (
    <Content className="signup">
      <Helmet>
        <title>Create Account | A-Square Labs</title>
      </Helmet>
      <div className="container">
        <div className="signup__wrapper">
          <div className="signup__banner">
            <div className="signup__img">
              <img src={signupImg} alt="signup" loading="lazy" />
            </div>
          </div>

          <Card className="signup__card">
            <h1 className="signup__title">Create your account for free.</h1>
            <Form layout="vertical" onFinish={onFormSubmit} size="large">
              <Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name',
                  },
                  { min: 4, message: 'Name must be min 4 characters.' },
                ]}
              >
                <Input />
              </Item>

              <Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Item>

              <Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  { min: 4, message: 'Password must be minimum 4 characters long.' },
                ]}
                hasFeedback
              >
                <Password />
              </Item>

              <Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Password />
              </Item>

              <Item name="role" label="Role" initialValue={Role.STUDENT}>
                <Select>
                  <Option value={Role.STUDENT}>Student</Option>
                  <Option value={Role.TEACHER}>Teacher</Option>
                </Select>
              </Item>

              <button
                className={`btn--primary signup__btn ${status === 'pending' ? 'btn--loading' : ''}`}
                type="submit"
                disabled={status === 'pending'}
              >
                Create Account
              </button>
            </Form>
          </Card>
        </div>
      </div>
    </Content>
  );
};
