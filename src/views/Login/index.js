import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { checkLogin, signIn } from 'redux/actions/authAction';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { signInLoading, signInResult, signInError, checkLoginLoading, checkLoginResult, checkLoginError } = this.props;
    if (signInResult && prevProps.signInResult !== signInResult) {
      this.props.history.push('/admin/dashboard');
    }

    if (checkLoginResult && prevProps.checkLoginResult !== checkLoginResult) {
      this.props.history.push('/admin/dashboard');
    }

    if (signInError && prevProps.signInError !== signInError) {
      this.setState({ error: true });
      setTimeout(() => {
        this.setState({ error: false });
      }, 3000);
    }
  }

  onSubmit = () => {
    const { email, password } = this.state;
    this.props.dispatch(signIn(email, password));
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.dispatch(checkLogin(this.props.history));
  }

  render() {
    const { signInLoading, signInResult, signInError, checkLoginLoading } = this.props;
    const { email, password, error } = this.state;
    return (
      <>
        {checkLoginLoading ? (
          <Container fluid className='bg-primary' style={{ height: '100vh' }}>
            <Row className='justify-content-center align-items-center bg-secondary' style={{ height: '100vh' }}>
              <Spinner animation='grow' color='white' className='' />
            </Row>
          </Container>
        ) : (
          <Container fluid className='bg-primary flex' style={{ height: '100vh' }}>
            {error && (
              <div>
                <div class='col-11 col-sm-4' style={{ display: 'inline-block', margin: 'auto', position: 'fixed', transition: 'all 0.5s ease-in-out 0s', zIndex: 9999, top: 20, left: 0, right: 0 }}>
                  <div class='alert-with-icon animated fadeInDown alert alert-success alert-dismissible fade show' role='alert'>
                    <button type='button' class='close' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                    <span data-notify='icon' class='nc-icon nc-bell-55'></span>
                    <span data-notify='message'>
                      <div>
                        <div>{signInError}</div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Row className='justify-content-center'>
              <Col sm={4} className='' style={{ marginTop: '10%', justifyContent: 'center' }}>
                <Card className='px-2 py-4'>
                  <CardBody>
                    <CardTitle>Welcome Back!</CardTitle>
                    <form>
                      <FormGroup>
                        <Label for='exampleEmail'>Email address</Label>
                        <Input type='email' name='email' value={email} onChange={(e) => this.handleChange(e)} id='exampleEmail' placeholder='Enter email' />
                      </FormGroup>
                      <FormGroup>
                        <Label for='examplePassword'>Password</Label>
                        <Input type='password' name='password' value={password} onChange={(e) => this.handleChange(e)} id='examplePassword' placeholder='Password' />
                      </FormGroup>
                      {signInLoading ? (
                        <Button type='submit' disabled className='btn-block mt-3'>
                          <Spinner animation='grow' color='primary' size='sm' /> Loading...
                        </Button>
                      ) : (
                        <Button color='primary' className='btn-block mt-3' type='submit' onClick={() => this.onSubmit()}>
                          Submit
                        </Button>
                      )}
                      {/* username.length > 6 && password.length > 5 */}
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  signInLoading: state.authReducer.signInLoading,
  signInResult: state.authReducer.signInResult,
  signInError: state.authReducer.signInError,

  checkLoginLoading: state.authReducer.checkLoginLoading,
  checkLoginResult: state.authReducer.checkLoginResult,
  checkLoginError: state.authReducer.checkLoginError,
});

export default connect(mapStateToProps, null)(Login);
