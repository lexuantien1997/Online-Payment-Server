import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux'
import { loadTransaction } from '../../../redux/actions/transaction'

var store = require('../../../redux/store')
const axios = require('axios');
class Transaction extends Component {
  componentDidMount() {
    this.props.loadTransaction();
    // let eventSource = new EventSource('http://localhost:8080/updates');

    // eventSource.addEventListener('connected', (e) => {
    //     console.log(e.data.welcomeMsg);
    //     // => Hello world!
    // });

    // // listens to all the messages. The only way to catch unnamed events (with no `event` name set)
    // eventSource.onmessage = message => {
    //   console.log(message);
    // };
  }
  render() {
    const list = this.props.recharge.listTransaction;
    const options = [];
    list.forEach(element => {
      for (let i = (element.length - 1); i >= 0; i--) {
        console.log(element[i]);
        options.push(<tr>
          <td>{element[i].TranID}</td>
          <td>{element[i].Name}</td>
          <td>{element[i].Phone}</td>
          <td>{element[i].Target}</td>
          <td>{element[i].Money}</td>
          <td>{element[i].Description}</td>
          <td>{element[i].DateTrans}</td>
          <td>{element[i].Type}</td>
          <td>{element[i].FeeTrans}</td>
        </tr>)
      }
    });
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Trans ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Target</th>
                      <th>Money</th>
                      <th>Description</th>
                      <th>DateTrans</th>
                      <th>Type</th>
                      <th>Fee Trans</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recharge: state.transactionReducer,
})
// export default UserToUser;
export default connect(mapStateToProps, { loadTransaction })(Transaction);

