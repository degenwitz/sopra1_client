import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import {ErrorCode} from "../shared/ErrorHandler/ErrorHandler"
import Player from "../../views/Player";




const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height:400px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled.div`
  margin: 6px 0;
  width: 860px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const UserName = styled.div`
  margin-left: auto;
  margin-right: 10px;
  margin-left: 5px;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const Status = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const Birthday = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const CreationDate = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;



/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class PlayerPage extends React.Component {

    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() { var us = new User( {
        "username" : "Loading",
        "id": 0,
        "status": "Loading"
    } );
        super();
        this.state = {
            user: us
        };
    }

    backTomain(){
        localStorage.removeItem("lookingAtUser");
        this.props.history.push(`/game`);
    }

    editPage(){
        this.props.history.push(`/PlayerPageEdit`);
    }

    getUser(){
        var id = localStorage.getItem("atID");
        fetch(`${getDomain()}/users/`+id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if( response.status < 200 || response.status >= 300 ) {
                throw new Error( ErrorCode(response.status) );
            }
            return response.json() })
            .then(returnedUser => {
                const user = new User(returnedUser);
                this.setState({"user": user});
                // store the token into the local storage
                this.forceUpdate();
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });

    }
    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }


    componentWillMount() {
        var id = localStorage.getItem("atID");
        fetch(`${getDomain()}/users/`+id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if( response.status < 200 || response.status >= 300 ) {
                throw new Error( ErrorCode(response.status) );
            }
            return response.json() })
            .then(async returnedUser => {
                await new Promise(resolve => setTimeout(resolve, 800));
                const user = new User(returnedUser);
                this.setState({"user": user});
                // store the token into the local storage
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }
    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */

    render() {

        var us = new User( {
            "username" : "hans",
            "id": -1,
            "status": "OFFLINE"
        } );

        let button;
        if(localStorage.getItem("atID") == localStorage.getItem("id")){
            button =
                <Button
                    width="50%"
                    onClick={() => {
                        this.editPage();
                    }}>
                edit site
            </Button>;

        }

        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Container>
                            <UserName>User: {this.state.user.username}</UserName>
                            <Birthday>Birthday: {this.state.user.birthday} </Birthday>
                            <Id>Id: {this.state.user.id}</Id>
                            <CreationDate>CreationDate: {this.state.user.creationDate} </CreationDate>
                            <Status>Status: {this.state.user.status}</Status>
                        </Container>
                    </Form>
                    <ButtonContainer>
                        <Button
                            width="50%"
                            onClick={() => {
                                this.backTomain();
                            }}
                        >
                            Return to main Page
                        </Button>
                        {button}
                    </ButtonContainer>
                </FormContainer>
            </BaseContainer>
        );

    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(PlayerPage);
/**
 <Player user ={ this.state.user} />
 <Player user ={ this.state.user} />
 <UserName>User: {this.state.user.username}</UserName>
 <Id>Id: {this.state.user.id}</Id>

 */