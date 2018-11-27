import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux'
import { loadCheckin } from '../../../redux/actions/checkin'

var store = require('../../../redux/store')
const axios = require('axios');
class Checkin extends Component {
  componentDidMount() {
    this.props.loadCheckin();

  }
  render() {
    const list = this.props.checkin.listCheckin;
    const options =[];
    list.forEach(element => {
      for(let i = (element.length-1) ;i>=0;i--){
        console.log(element[i]);
        options.push(<tr>
          <td>{element[i].emailOrPhone}</td>
          <td>{element[i].date}</td>
          <td>{element[i].type}</td>
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
                      <th>Email or Phone</th>
                      <th>Data</th>
                      <th>Type</th>
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
  checkin: state.checkinReducer,
})
// export default UserToUser;
export default connect(mapStateToProps, { loadCheckin })(Checkin);

