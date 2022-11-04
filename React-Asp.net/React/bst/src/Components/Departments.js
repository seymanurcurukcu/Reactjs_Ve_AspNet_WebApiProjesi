import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {Button,ButtonToolbar} from 'react-bootstrap';
import { EditDepModal } from './EditDepModal';
export class Departments extends Component {
    constructor(props){
         super(props);
         this.state={
            deps:[],
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
     fetch("http://localhost:55029/api/Department")
     .then((response)=>{
        return response.json();
     })
     .then((data)=>{
       this.setState({
          deps:data
       });
     })
    }

    deleteDep(depid){
      if(window.confirm("Are you sure?")){
        fetch("http://localhost:55029/api/Department/"+depid,
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
    const {deps,depid,depname}=this.state;
    let AddModalClose=()=>this.setState({
      AddModalShow:false
    });
    let editModalClose = () => this.setState({editModalShow:false})
    return (
      <>
      <Table className='mt-4' striped bordered hover size="sm">
             <thead>
                <tr>
                    <th>DepartmentID</th>
                    <th>DepartmentName</th>
                    <th>Options</th>
                </tr>
             </thead>
             <tbody>
                {deps.map(dep=>
                 <tr key={dep.DepatmentID}>
                    <td>{dep.DepatmentID}</td>
                    <td>{dep.DepartmentName}</td>
                    <td>
							<ButtonToolbar>

								<Button onClick={() => this.setState({
									editModalShow:true,
									depid:dep.DepatmentID,
									depname:dep.DepartmentName

								})	}> 
									Edit
								</Button>
                <Button style={{marginLeft:'4px'}} variant='danger'
                onClick={()=>this.deleteDep(dep.DepatmentID)}>
                  Delete
                </Button>
								
								<EditDepModal
								show={this.state.editModalShow}
								onHide={editModalClose}
								depid={depid}
								depName={depname}

								/>
							</ButtonToolbar>
							
							
						</td>	
                 </tr>
                )
                    
                }
               
             </tbody>
        </Table>
        <ButtonToolbar>
                <Button onClick={()=>this.setState({AddModalShow:true})}>Add Department</Button>
        </ButtonToolbar>
        <AddDepModal show={this.state.AddModalShow} onHide={AddModalClose}/>
      </>
        
    )
  }
}
