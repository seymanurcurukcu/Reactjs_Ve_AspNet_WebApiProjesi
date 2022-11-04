import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {Button,ButtonToolbar} from 'react-bootstrap';
import { EditEmpModal } from './EditEmpModal';
export class Employees extends Component {
  constructor(props){
    super(props);
    this.state={
       emps:[],
       AddModalShow:false,
       editModalShow:false
    };
}
componentDidMount = () => {
  this.refleshList();
}
componentDidUpdate=()=>{
  this.refleshList();
}
refleshList()
{
 fetch("http://localhost:55029/api/employee")
 .then((response)=>{
    return response.json();
 })
 .then((data)=>{
   this.setState({
    emps:data
   });
 })
}

deleteEmp(empid){
  if(window.confirm("Are you sure?")){
    fetch("http://localhost:55029/api/employee/"+empid,
    {
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    }
    )
 
  }
 
}
  render() {
    const {emps,empid,empname,empdepartment,empmailid,empDOJ}=this.state;
    let AddModalClose=()=>this.setState({
      AddModalShow:false
    });
    let editModalClose = () => this.setState({editModalShow:false})
    return (
      <>
      <Table className='mt-4' striped bordered hover size="sm">
             <thead>
                <tr>
                    <th>EmployeeID</th>
                    <th>EmployeeName</th>
                    <th>Department</th>
                    <th>MailID</th>
                    <th>DOJ</th>
                    <th>Options</th>
                </tr>
             </thead>
             <tbody>
                {emps.map(emp=>
                 <tr key={emp.EmployeeID}>
                    <td>{emp.EmployeeID}</td>
                    <td>{emp.EmployeeName}</td>
                    <td>{emp.Department}</td>
                    <td>{emp.MailID}</td>
                    <td>{emp.DOJ}</td>
                    <td>
							<ButtonToolbar>

								<Button onClick={() => this.setState({
									editModalShow:true,
									empid:emp.EmployeeID,
									empname:emp.EmployeeName,
                  empdepartment:emp.Department,
                  empmailid:emp.MailID,
                  empDOJ:emp.DOJ
								})	}> 
									Edit
								</Button>
                <Button style={{marginLeft:'4px'}} variant='danger'
                onClick={()=>this.deleteEmp(emp.EmployeeID)}>
                  Delete
                </Button>
								
								<EditEmpModal
								show={this.state.editModalShow}
								onHide={editModalClose}
								empid={empid}
								empname={empname}
                empdepartment={empdepartment}
                empmailid={empmailid}
                empDOJ={empDOJ}
								/>
							</ButtonToolbar>
							
							
						</td>	
                 </tr>
                )
                    
                }
               
             </tbody>
        </Table>
        <ButtonToolbar>
                <Button onClick={()=>this.setState({AddModalShow:true})}>Add Employee</Button>
        </ButtonToolbar>
        <AddEmpModal show={this.state.AddModalShow} onHide={AddModalClose}/>
      </>
    )
  }
}

