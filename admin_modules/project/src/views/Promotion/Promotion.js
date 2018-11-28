import React, { Component } from 'react';
import {
  Col, Container, Row, Badge, Table, Card, Button,
  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, CardFooter, Label, Form, CardBody,
  CardHeader, FormText
} from 'reactstrap';
import { connect } from 'react-redux'
import { loadPromotion } from '../../redux/actions/promotion'

class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAdd: false,
      file: '',
      imagePreviewUrl: ''
    };

  }
  componentDidMount() {
    this.props.loadPromotion();

  }

  fileChangedHandler = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

  }

  render() {
    const list = this.props.promotion.listPromotion;
    const options = [];
    list.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        console.log(element[i]);
        options.push(<tr>
          <td>{element[i].ID_PRMOTION}</td>
          <td>{element[i].Start_date}</td>
          <td>{element[i].End_date}</td>
        </tr>)
      }
    });

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={imagePreviewStyle} src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div>Please select an Image for Preview</div>);
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col col="9" sm="9" md="9">
            <h3>List promotion progress</h3>
          </Col>
          <Col col="3" sm="3" md="3">
            <Button block color="primary" onClick={(e) => this.setState({ isOpenAdd: true })}>Add new promotion</Button>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col md="12">
            <Card>
              <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Beginning date</th>
                    <th>Ending date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {options}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.isOpenAdd}
          className={'modal-primary ' + this.props.className}>
          <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
            <Card>
              <CardHeader>
                <strong>New Promotion</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="date-input">Beginning Date</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="date-input">Ending</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Description</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label >Transaction</Label>
                      <Input type="select">
                        <option>User to user</option>
                        <option>User to agent</option>
                        <option>Recharge</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Image</Label>
                      <Input type="file" onChange={this.fileChangedHandler} />
                    </FormGroup>
                    <div className="imgPreview">
                      {$imagePreview}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={(e) => this.setState({ isOpenAdd: true })}>Yes</Button>{' '}
            <Button color="danger" onClick={(e) => this.setState({ isOpenAdd: false })}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const imagePreviewStyle = {
  maxHeight: '100%',
  maxWidth: '100%'
};
const mapStateToProps = state => ({
  promotion: state.promotionReducer,
})
// export default UserToUser;
export default connect(mapStateToProps, { loadPromotion })(Promotion);

