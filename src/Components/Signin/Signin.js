import React, {Component} from 'react';

class Signin extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onEmailCh = this.onEmailCh.bind(this);
    this.onPasswordCh = this.onPasswordCh.bind(this);
    this.onSignin = this.onSignin.bind(this);
  }

  onEmailCh(event){
    this.setState({email: event.target.value});
  }

  onPasswordCh(event){
    this.setState({password: event.target.value});
  }

  onSignin(){
    this.props.onRouteCh('signedin')
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteCh('signedin');
      }else{
        this.props.onRouteCh('signedout')
      }
    })
    .catch(err => console.log('Error!', err));
    //this.props.onRouteCh('signedin')
  }

  render(){
    const {onRouteCh} = this.props;
      return(
      <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
      <main className="pa4 black-80">
      <form className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
         <legend className="f1 fw6 ph0 mh0 center white">Sign In</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
          <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
           type="email" name="email-address"  id="email-address" 
           onChange={this.onEmailCh} />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
          <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
           type="password" name="password"  id="password" onChange={this.onPasswordCh}/>
        </div>
      </fieldset>
      <div className="">
        <input 
        className="b ph3 pv2 input-reset hover-bg-black ba b--white bg-transparent grow pointer f6 dib white"
         type="submit" value="Sign in" onClick={this.onSignin}/>
      </div>
      <div className="lh-copy mt3">
        <a href="#0" className="f6 link dim black db pointer white" 
        onClick={() => onRouteCh('register')}>Register</a>
      </div>
     </form>
    </main>
    </article>
    );
  }

}

export default Signin;