import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { getTransaction } from 'redux/actions/transactionAction';

function Transaction() {
  const dispatch = useDispatch();
  const { getTransactionLoading, getTransactionResult } = useSelector((state) => state.transactionReducer);

  useEffect(() => {
    dispatch(getTransaction());
  }, [dispatch]);

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <h2>Recent Transactions</h2>
            </CardHeader>
            <CardBody>
              <div className=''>
                <table className='table'>
                  <thead className='text-primary'>
                    <tr>
                      <th>No</th>
                      <th>Order Id</th>
                      <th>Payment Url</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTransactionLoading ? (
                      <tr>
                        <td colSpan={4} className='text-center'>
                          Loading...
                        </td>
                      </tr>
                    ) : getTransactionResult ? (
                      getTransactionResult.map((item, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.orderId.slice(0, 30)}</td>
                            <td>
                              <a href={item.paymentUrl} target='_blank' rel='noopener noreferrer'>
                                {item.paymentUrl.slice(0, 50)}
                              </a>
                            </td>
                            <td>{'pending'}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <td colSpan={4} className='text-center'>
                        'data kosong'
                      </td>
                    )}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Transaction;
