
import React, {Component} from 'react'
import "./index.css"
// import Table from "../Table"

const tableContent = [{
  id: 1,
  Name: 'Nitya',
  Email: 'labs@gmail.com',
  phoneNum: '9876543210',
  edit: true,
}]


class NavBar extends Component {
  state = {
    tableData: tableContent,
    id: '',
    name: "",
    EMail: "",
    number: "",
    showForm: false,
    errors: {

    }
  }

enterFormDate = () => {
   this.setState({showForm: true})
  }
closeForm = () => {
  this.setState({showForm: false})
} 
//onChange function for firstName
nameChange = e => {
    this.setState({name: e.target.value})
}
//onChange function for lattName
EMailChange = e => {
    this.setState({EMail: e.target.value})
}

//onChnage function for phoneNumber
phoneNumChange = e => {
    this.setState({number: e.target.value})
}

//validating the form
validationForm = () => {
  const fields = this.state 
  let isFormValid = true 
  const errors = {}
  
  if(fields["name"] === '') {
      isFormValid = false
      errors["name"] =  "*Please Enter Your name" 
  } else if(fields["name"].length < 4) {
    isFormValid = false;
    errors["name"] = "*Minimun four chars required*";
  }
  else {
    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        isFormValid = false;
        errors["name"] = "*Please enter valid first name";
      }
    }
  }

  
  
  if(fields["EMail"] === "") {
      isFormValid = false
      errors["EMail"] =  "*Please Enter Your E-Mail" 
  } else {
    if (typeof fields["EMail"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["EMail"])) {
        isFormValid = false;
        errors["EMail"] = "*Please enter valid email-ID.";
      }
    }
  }

  
  

  if(fields["number"] === "") {
      isFormValid = false;
      errors["number"] = "*Please enter mobile no.";
  } else {
    if (typeof fields["number"] !== "undefined") {
      if (!fields["number"].match(/^[0-9]{10}$/)) {
        isFormValid = false;
        errors["number"] = "*Please enter valid mobile no.";
      }
    }
  }
 
  

    //updating the errors
    this.setState({errors: errors})
  return isFormValid
}

submitForm = e => {
  const {name, EMail, number, tableData} = this.state
  e.preventDefault()

  const formValidation = this.validationForm()
  //update tableData if validation is completed
  if(formValidation) {
      const newData = {
          id: tableData.length + 1,
          Name: name,
          Email: EMail,
          phoneNum: number,
          edit: true,

      }

      //update state feilds to empty
      this.setState(prev => ({tableData: [...prev.tableData, newData]}))
      this.setState({
          name: '',
          EMail: '',
          number: '',
          sortable: false,
      })

  }
  
}

 //function to delete data
 deleteFunction = e => {  
  console.log(e.target)
  const {tableData} = this.state
  console.log(e.target.id, 'log in id')
   const result = tableData.filter((each, index) => {
       console.log(index, each.id, e.target.id)
       return each.id.toString() !== e.target.id
      })
  console.log(result)
   this.setState({tableData: result});
  }

  editFunction = e => {
    //function to edit the data
    const {tableData,} = this.state
    const non_edited_rows = tableData.filter((each, index) => {
        console.log(index, each.id, e.target.id)
        return each.id.toString() !== e.target.id
       })

      this.setState({sortable: false})
    const result = tableData.filter((each, index) => {
        console.log(index, each.id, e.target.id)
        return each.id.toString() === e.target.id
       })
    
     
    result[0]['edit'] = !result[0]['edit']
    this.setState({tableData: [...non_edited_rows, result[0]]})
  
}
editEachColumData = e =>{
   
    const {tableData} = this.state

    const non_edited_rows = tableData.filter((each, index) => {
        console.log(index, each.id, e.target.id)
        return each.id.toString() !== e.target.id
       })
    console.log('non_edited_rows', non_edited_rows)

    // gettting the {} of clicked row from state
    const result = tableData.filter((each, index) => {
        console.log(index, each.id, e.target.id)
        return each.id.toString() === e.target.id
       })
    console.log('result ', result)
    
    
    // update the attribute
    result[0][e.target.name] = e.target.value
    console.log('result ', result)
    console.log('state update ', [...non_edited_rows, result[0]])
    this.setState({tableData: [...non_edited_rows, result[0]]})
    // const data1 = [...tableData].sort((a, b) => (a.id < b.id ? -1 : 1))
    // this.setState({tableData: data1})
}




  render() {
    const {name, EMail, number, errors, showForm} = this.state
    let result = this.state.tableData.map(each => {
      return (
        <tr key={each.id}>
        <td  name="id"><input className="table-input" id={each.id} disabled={each.edit} value={each.id}  name='id' onChange={this.editEachColumData}></input></td>
        <td  name='Name' className="m-0"><input className="table-name-input table-set"  id={each.id} disabled={each.edit} value={each.Name} name='Name' onChange={this.editEachColumData} ></input></td>
        <td  name='Email' className="m-0"><input className="table-name-input"  id={each.id} disabled={each.edit} value={each.Email} name='Email' onChange={this.editEachColumData} ></input></td>
        <td  name='phoneNum' className="m-0"><input className="table-name-input table-set"  id={each.id} disabled={each.edit} value={each.phoneNum} name='phoneNum' onChange={this.editEachColumData} ></input></td>
        <td><button type="button" className="btn btn-secondary table-set" id={each.id}  onClick={this.editFunction}>{each.edit ? "Edit" : "Save" }</button> <button id={each.id} type="button" className="btn btn-danger table-set" onClick={this.deleteFunction}>Delete</button></td>
        </tr>
        
      )
    })
    return (
      <div className="">
       <nav className="navbar d-flex flex-row justify-content-start navbar-light bg-light">
        <button className="btn btn-primary m-1" >Contact</button>
        <button className="button" onClick={this.enterFormDate}>Add Contact</button>
      </nav>
      <div>
        {showForm ? ( <form className="d-flex flex-column text-start justify-content-center form-class" onSubmit={this.submitForm}>
                    <label htmlFor='name'>Name: </label>
                    
                    <input id="name" className="input-box" type="text" value={name} onChange={this.nameChange} placeholder="Enter Your Name" /> 
                    {errors.name && <p style={{color: "red"}}>{errors.name}</p>}
                    
                    <label htmlFor='EMail'>Email: </label>
                   
                    <input id="EMail" className="input-box" type="text" value={EMail} onChange={this.EMailChange} placeholder="Enter Your E-Mail" /> 
                    {errors.EMail && <p style={{color: "red"}}>{errors.EMail}</p>}
                   
                    <label htmlFor='number'> PhoneNumber: </label>
                    
                    <input id="number" className="input-box" type="text" value={number} onChange={this.phoneNumChange} placeholder="Enter Your PhoneNumber" /> 
                    {errors.number && <p style={{color: "red"}}>{errors.number}</p>}
                 
                    <div>
                    <button className="bt btn-primary button-class" type="submit">
                        Add Contact
                    </button>
                    <button className="bt btn-warning ml-3 button-class close-button" type="button" onClick={this.closeForm}>
                        close
                    </button>
                    </div>
                    
                </form>) : null}
     
              </div>
              <h1>Contact List</h1>
              <div className="unorder-list">
           <table className="table table-bordered table-container"
          >
               <thead>
                <tr>
            <th>S.No</th>
             <th>Name</th>
             <th>Email</th>
             <th>Phone Number</th>
             <th>Edit / Delete</th>
                </tr>
                </thead> 
             <tbody>
               {result}
             </tbody>
            </table>
            </div>  
              
          </div>
        )

  }
 
}

export default NavBar