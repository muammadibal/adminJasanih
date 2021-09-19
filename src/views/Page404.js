import ILError from 'assets/img/error-page.png';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Row } from 'reactstrap';

class Page404 extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.goBack();
    }, 3000);
  }
  render() {
    return (
      <Container fluid className='bg-primary flex' style={{ height: '100vh' }}>
        <Row className='justify-content-center'>
          <Col sm={4} className='' style={{ marginTop: '5%', justifyContent: 'center' }}>
            <Card className='px-2 py-4'>
              <CardHeader>
                <img src={ILError} alt='404-page' />
              </CardHeader>
              <CardBody className='text-center'>
                <CardTitle>
                  <strong>Halaman tidak ditemukan</strong>
                </CardTitle>

                <Button color='primary' className='btn-block mt-3' type='submit' onClick={() => this.props.history.goBack()}>
                  Go Back
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(null, null)(Page404);
