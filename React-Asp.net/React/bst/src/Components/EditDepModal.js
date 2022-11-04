import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form, FormGroup, FormLabel,FormControl} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class EditDepModal extends Component {
    constructor(props){
        super(props);
        this.state={
            snacbarOpen:false,
            snacbarMsg:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    snacbarClose=()=>{
        this.setState({
            snacbarOpen:false
        })
    }
    handleSubmit(e)
    {
      e.preventDefault();
      fetch('http://localhost:55029/api/Department',
      {
        method:'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
            DepatmentID:e.target.DepatmentID.value,
          DepartmentName: e.target.DepartmentName.value
        })  
      })  
      .then(res => res.json())
        .then((result)=>
        {
    
           this.setState({
            snacbarOpen:true,
            snacbarMsg:result
           });
     
        },
        (error)=>
        {
            this.setState({
                snacbarOpen:true,
                snacbarMsg:'Faild'
               });
        }
        )
  
     
     
    }
  
  render() {
    return (
        <div className='container'>
            <Snackbar
            anchorOrigin={{vertical:'center',horizontal:'center'}}
            open={this.state.snacbarOpen}
            autoHideDuration={3000}
            onClose={this.snacbarClose}
            message={<span id='massege-id'>{this.state.snacbarMsg}</span>}
            action={[
                <IconButton key='close' aria-label='Close' color='inherit' onClick={this.snacbarClose}>
                    x
                </IconButton>
            ]}
            />
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
           <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                        <FormLabel>
                        Department ID
                        </FormLabel>
                        <FormControl
                        type="text"
                        name="DepatmentID"
                        required
                        disabled
                        defaultValue={this.props.depid}
                        placeholder="DepartmentID"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Department Name
                        </FormLabel>
                        <FormControl
                        type="text"
                        name="DepartmentName"
                        required
                        defaultValue={this.props.depName}
                        placeholder="DepartmentName"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button variant='primary' type='submit' style={{marginTop:"8px"}}>Update Department</Button>
                    </FormGroup>
                </Form>
            </Col>
           </Row>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }
}


