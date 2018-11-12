import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux'
import { loadUser, changeStatusUser } from '../../../redux/actions/userinfo'
import { AppSwitch } from '@coreui/react'
var store = require('../../../redux/store')
const axios = require('axios');
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      danger: false,
      emailNeedChange: null,
      statusNeedChange: null
    };

  }

  componentDidMount() {
    this.props.loadUser();

  }

  toggleDanger = (param) => {
    if (param.change == true || param.change == false) {
      if (param.change == true){
        this.props.changeStatusUser(this.state.emailNeedChange,  this.state.statusNeedChange * (-1));
      }
      this.setState({
        danger: !this.state.danger,
        animate:!this.state.animate,
        emailNeedChangeStatus: null,
        statusNeedChange: null
      });
    }
    else {
      this.setState({
        danger: !this.state.danger,
        emailNeedChange: param.email,
        statusNeedChange: param.status
      });
    }
  }


  render() {
    const list = this.props.userinfo.listUser;
    const options = [];
    console.log("render");
    list.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        options.push(<tr style={{ backgroundColor : element[i].status == 1 ? "#ffffff" : "#ef9a9a",
          // height: this.state.animate ? 250 : 50,
          transition:this.state.animate? 'all 2s':'all 2s',
          }}>
          <td>{element[i].name}</td>
          <td>{element[i].email}</td>
          <td>{element[i].phone}</td>
          <td>
            <Badge color={element[i].verified ? "success" : "danger"} >{element[i].verified ? "Verified" : "Un-verified"}</Badge>
          </td>
          <td>{element[i].money} VND</td>
          <td>
            {element[i].status == 1
              ?
              <AppSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={(e) => this.toggleDanger({ email: element[i].email, status: element[i].status })} checked />
              :
              <AppSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={(e) => this.toggleDanger({ email: element[i].email, status: element[i].status })} disable />
            }
          </td>
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
                <Table hover responsive >
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Verified</th>
                      <th>Money</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options}

                  </tbody>
                </Table>
                <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                  className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Modal title</ModalHeader>
                  <ModalBody>
                    Are you sure you want to change status this user?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={(e) => this.toggleDanger({ change: true })}>Yes</Button>{' '}
                    <Button color="secondary" onClick={(e) => this.toggleDanger({ change: false })}>Cancel</Button>
                  </ModalFooter>
                </Modal>
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
  userinfo: state.userinfoReducer,
})
// export default UserToUser;
export default connect(mapStateToProps, { loadUser, changeStatusUser })(UserInfo);

