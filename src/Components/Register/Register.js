import React, {Component} from 'react';

class Register extends Component{
constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
    this.onEmailCh = this.onEmailCh.bind(this);
    this.onPasswordCh = this.onPasswordCh.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onNameCh = this.onNameCh.bind(this);
  }
  onNameCh(event){
  	this.setState({name: event.target.value})
  }
  onEmailCh(event){
    this.setState({email: event.target.value});
  }

  onPasswordCh(event){
    this.setState({password: event.target.value});
  }

 	onRegister(){
 		 this.props.onRouteCh('signedout')
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    }).then(res => res.json()).then(user => {
      if (user.id) {
      	this.props.loadUser(user);
      	this.props.onRouteCh('signedin');
      }
      })
    .catch(err => console.log('Error!', err));
   
  }
	render(){
			return(
	<article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
	<main className="pa4 black-80 white">
  	<form className="measure" >
		<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	 		<legend className="f1 fw6 ph0 mh0 center">Register</legend>
	 		 <div className="mt3">
	        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
	        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	         type="text" name="email-address" onChange={this.onNameCh} id="name" />
	      </div>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
	        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	         type="email" name="email-address" onChange={this.onEmailCh} id="email-address" />
	      </div>
	      <div className="mv3">
	        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
	        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	         type="password" name="password" onChange={this.onPasswordCh}  id="password" />
	      </div>
		</fieldset>
	    <div className="">
	      <input className="b hover-bg-black white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
	       type="submit" value="Register" onClick={this.onRegister}/>
	    </div>
 	 </form>
	</main>
	</article>
		);
	}

}

export default Register;