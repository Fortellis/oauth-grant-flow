import React, { Component } from 'react';
import './App.css';
import { parse as parseQuery } from "query-string";
import jwtDecode from "jwt-decode";
import axios  from 'axios'

class Welcome extends Component {
  
    login = () => {
        this.props.history.push({
            pathname: '/Login'
        })
    }

    logout = () => {
        this.props.history.push({
            pathname: '/'
        })
        this.setState({username:"", authenticated:false})
    }

    constructor(props) {
        super(props);
        this.state = { username: "", authenticated: false };
    }
    
    componentDidMount() {
        var self = this;
        var queryParams = parseQuery(this.props.location.search);
        if(queryParams.code) {
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic NjNTdDdCN1VxVDNsRnp0YjgzZ1kzUTVOb2NydnZVVnU6SHExSkIydGVBV0VzT0lZMg=='
                }
              };
            var postData = {
                grant_type:'authorization_code',
                redirect_uri:'http://localhost:3000',
                code:queryParams.code
            }
    
            axios.post('https://api.accounts.fortellis.io/oauth2/aus1ufzl27tS4FQ9X2p7/v1/token', postData, axiosConfig)
                .then((res) => {
                    var decodedToken = jwtDecode(res.data.access_token);
                    self.setState({authenticated:true, username:decodedToken.sub});
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
        
    }
    render() {
        return (
            
            <div style={{padding: '50px'}}>
                <div style={{'textAlign': 'center', 'backgroundColor': '#d8e9f1'}}>
                    
                            <div style={{'paddingBottom': '10px'}}hidden= {!this.state.authenticated}>Welcome to Fortellis: {this.state.username}</div>
                            <button hidden= {this.state.authenticated} onClick={this.login} >LOGIN</button>
                            <button  hidden= {!this.state.authenticated} onClick={this.logout} >LOGOUT</button>
                    
                </div>
            </div>
        );
    }
}
export default Welcome;