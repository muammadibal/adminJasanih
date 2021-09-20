import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from 'reactstrap';
import { confirmTransaction } from 'redux/actions/transactionAction';

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: '',
      transaction_status: '',
    };
  }

  onSubmit = () => {
    window.ReactNativeWebView.postMessage('finished');
  };

  componentDidMount() {
    // ?order_id=%23TOPUP-xpw72rfrjcelsJsja9zVGi8erz23-2021-9-18&status_code=201&transaction_status=pending
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let order_id = params.get('order_id');
    let transaction_status = params.get('transaction_status');

    if (order_id) {
      this.setState({
        order_id,
        transaction_status,
      });

      this.props.dispatch(confirmTransaction(order_id, transaction_status));
    }
  }

  render() {
    const { order_id, transaction_status } = this.state;
    return (
      <Container fluid className='bg-primary flex' style={{ height: '100vh' }}>
        <Row className='justify-content-center'>
          <Col sm={4} className='' style={{ marginTop: '10%', justifyContent: 'center' }}>
            <Card className='px-2 py-4'>
              <CardBody className='text-center'>
                <CardTitle>
                  <h1>Yeay!</h1>
                  <h4>Transaksi berhasil</h4>
                </CardTitle>

                <CardSubtitle>
                  <p>{order_id}</p>
                  <p>
                    <strong>Status {transaction_status === 'settlement' || transaction_status === 'capture' ? 'paid' : transaction_status}</strong>
                  </p>
                  <p>Selanjutnya cek dihalaman history</p>
                </CardSubtitle>

                <Button color='primary' className='btn-block mt-3' type='submit' onClick={() => this.onSubmit()}>
                  Continue
                </Button>
                {/* </form> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
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

export default connect(mapStateToProps, null)(Finish);
