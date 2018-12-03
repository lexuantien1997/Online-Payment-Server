import React, { Component } from 'react';
import {
  Col, Container, Row, Badge, Table, Card, Button,
  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, CardFooter, Label, Form, CardBody,
  CardHeader, Alert
} from 'reactstrap';
import { connect } from 'react-redux'
import { loadPromotion } from '../../redux/actions/promotion'

const axios = require('axios');

class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAdd: false,
      file: '',
      imagePreviewUrl: '',
      beginDate: null,
      beginTime: null,
      endDate: null,
      endTime: null,
      description: null,
      transaction: 1,
      query1: null,
      query2: null,
      query3: null,
      query4: null,
      imageUrl: null,
      promotionCon:false,
      messError:"",
      isError:false,
      discount:""
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
      console.log(reader.result);
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

  }
  _handleSubmit(e) {
    e.preventDefault();
    const {beginDate,beginTime,endDate,endTime,description,transaction,query1,query2,query3,
    query4,imagePreviewUrl,promotionCon}=this.state;

    if(beginDate==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Beginning Date",
        isError:true
      });
     return ;
    }
    if(beginTime==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Beinning Time",
        isError:true
      });
      return;
    }
    if(endDate==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong End Date",
        isError:true
      });
      return;
    }
    if(endTime==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Beginning Time",
        isError:true
      });
      return;
    }
    if(description==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Description",
        isError:true
      });
      return;
    }
    if(query1==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Query",
        isError:true
      });
      return;
    }
    if(query2==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Query",
        isError:true
      });
      return;
    }

    if(query3==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Query",
        isError:true
      });
      return;
    }

    if(query4==null){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Query",
        isError:true
      });
      return;
    }
    if(this.state.imagePreviewUrl==''){
      this.setState({
        isOpenAdd:false, 
        messError:"Wrong Image Preview Url",
        isError:true
      });
      return;
    }
    var promotion={
      beginDate: beginDate,
      beginTime: beginTime,
      endDate: endDate,
      endTime: endTime,
      description: description,
      transaction: transaction,
      query1: query1,
      query2: query2,
      query3: query3,
      query4: query4,
      promotionCon:promotionCon,
      imagePreviewUrl
    }
    axios.post('/manage/promotion/init',{
      promotion: promotion
    })
    .then()
  }

  changeDiscount=(event)=>{
    console.log( event.target.value);
    this.setState({discount: event.target.value});
  }
  changeTarget= (event) => {
    this.setState({promotionCon: event.target.value});
   }
   changeTransaction= (event) => {
    console.log( event.target.value);
    this.setState({transaction: event.target.value});
   }
   changeDescription= (event)=>{
    this.setState({description: event.target.value});
   }
   changeQuery1= (event) => {
     console.log(event.target.value);
    this.setState({query1: event.target.value});
   }
   changeQuery2= (event) => {
    console.log( event.target.value);
    this.setState({query2: event.target.value});
   }
   changeQuery3= (event) => {
    console.log( event.target.value);
    this.setState({query3: event.target.value});
   }
   changeQuery4= (event) => {
    console.log( event.target.value);
    this.setState({query4: event.target.value});
   }
   changeBeginDate= (event) => {
    console.log( event.target.value);
    this.setState({beginDate: event.target.value});
   }
   changeBeginTime= (event) => {
    console.log( event.target.value);
    this.setState({beginTime: event.target.value});
   }
   changeEndDate= (event) => {
    console.log( event.target.value);
    this.setState({endDate: event.target.value});
   }
   changeEndTime= (event) => {
    console.log( event.target.value);
    this.setState({endTime: event.target.value});
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
          <td>
            <Button block color="primary">Edit</Button>
            <Button block color="primary">Delete</Button>
          </td>
        </tr>)
      }
    });

    let { imagePreviewUrl } = this.state;
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
        <Modal isOpen={this.state.isOpenAdd} size="lg"
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
                  <Col xs="12" md="4">
                    <Input onChange={this.changeBeginDate} type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>

                  <Col xs="12" md="4">
                    <Input onChange={this.changeBeginTime} type="time" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="date-input">Ending</Label>
                  </Col>
                  <Col xs="12" md="4">
                    <Input onChange={this.changeEndDate} type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                  <Col xs="12" md="4">
                    <Input onChange={this.changeEndTime} type="time" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Description</Label>
                      <Input onChange={this.changeDescription} type="textarea" id="text-input" name="text-input" placeholder="Text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label >Transaction</Label>
                      <Input type="select" onChange={this.changeTransaction}>
                        <option value="1">User to user</option>
                        <option value="2">User to agent</option>
                        <option value="3">Recharge</option>
                      </Input>
                    </FormGroup>
                  </Col>  
                  <Col xs="6">
                    <FormGroup>
                      <Label >Discount</Label>
                      <Input type="text" onChange={this.changeDiscount}>
                        
                      </Input>
                    </FormGroup>
                  </Col>     
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label >Target Property Promotion</Label>
                      <Input type="select" onChange={this.changeTarget} value={this.state.promotionCon}>
                        <option value="true">Age</option>
                        <option value="false">Registered Date</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      Chọn 1 chiều thôi nghen. Nếu lỡ rồi thì F5.
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col xs="12">
                    <FormGroup>
                      <Label >Query</Label>
                      <Row>
                        <Col xs="3">
                          <Input onChange={this.changeQuery1} type={this.state.promotionCon ? "number" : "date"} />
                        </Col>
                        <Col xs="2">
                          <Input type="select" onChange={this.changeQuery2}>
                            <option></option>
                            <option>&lt;</option>
                            <option>&le;</option>
                          </Input>
                        </Col>
                        <Col xs="2">
                          Value
                        </Col>
                        <Col xs="2">
                          <Input type="select" onChange={this.changeQuery3}>
                            <option></option>
                            <option>&lt;</option>
                            <option>&le;</option>
                            <option>=</option>
                          </Input>
                        </Col>
                        <Col xs="3">
                          <Input onChange={this.changeQuery4} type={this.state.promotionCon?"number":"date"} />
                        </Col>
                      </Row>
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
            <Button color="danger" onClick={(e) => this.setState({ isOpenAdd: false })}>Cancel</Button>
            <Button color="success" onClick={(e) => this._handleSubmit(e)}>Yes</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isError}>
          <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
            <Alert color="danger" >
              {this.state.messError}
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.setState({ isError: false })}>OK</Button>
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

