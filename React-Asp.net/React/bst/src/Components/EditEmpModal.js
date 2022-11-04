import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form, FormGroup, FormLabel,FormControl} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class EditEmpModal extends Component {
    constructor(props){
        super(props);
        this.state={
            deps:[],
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
    componentDidMount() {
        fetch('http://localhost:55029/api/department').then(response =>response.json())
        .then(data =>
          {
              this.setState({
                  deps:data
              });
          })
    }
    handleSubmit(e)
    {
      e.preventDefault();
      fetch('http://localhost:55029/api/employee',
      {
        method:'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
            EmployeeID:e.target.EmployeeID.value,
            EmployeeName: e.target.EmployeeName.value,
            Department: e.target.Department.value,
            MailID: e.target.MailID.value,
            DOJ: e.target.DOJ.value,
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
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
           <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup controlId='EmployeeID'>
                        <FormLabel>
                        EmployeeID
                        </FormLabel>
                        <FormControl
                        type="text"
                        name="EmployeeID"
                        required
                        disabled
                        defaultValue={this.props.empid}
                        placeholder="EmployeeID"
                        />
                    </FormGroup>
                    <FormGroup controlId='EmployeeName'>
                        <FormLabel>
                        EmployeeName
                        </FormLabel>
                        <FormControl
                        type="text"
                        name="EmployeeName"
                        required
                        defaultValue={this.props.empname}
                        placeholder="EmployeeName"
                        />
                    </FormGroup>
             
                    <Form.Group controlId="Department">
                <Form.Label>
                  Department
                </Form.Label>
				<Form.Control as="select" defaultValue={this.props.empdepartment}>
					{this.state.deps.map(dep =>
						
						<option key={dep.DepatmentID}>
							{dep.DepartmentName}
						</option>
						
						)}
					

				</Form.Control>
               

              </Form.Group>
                    <FormGroup controlId='MailID'>
                        <FormLabel>
                        MailID
                        </FormLabel>
                        <FormControl
                        type="text"
                        name="MailID"
                        required
                        defaultValue={this.props.empmailid}
                        placeholder="MailID"
                        />
                    </FormGroup>
                    <FormGroup controlId='DOJ'>
                        <FormLabel>
                        DOJ
                        </FormLabel>
                        <FormControl
                        type="text"
                        name="DOJ"
                        required
                        defaultValue={this.props.empDOJ}
                        placeholder="DOJ"
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


