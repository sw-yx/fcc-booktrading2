import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};
class CardExampleExpandable extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (<Card className="container">
      <CardHeader
        title={"Title: " + this.props.book.title}
        subtitle={"Owner: " + this.props.book.owner}
      />
      <CardActions>
        <Toggle
          label="Request Transfer"
          style={styles.toggle}
          onClick={() => {this.props.proposeTransfer(this.props.book)}}
        />
      </CardActions>
  </Card>)
  }
}

class BooksPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      // user: {
      //   email: '',
      //   password: ''
      // }
    };

    // this.processForm = this.processForm.bind(this);
    // this.changeUser = this.changeUser.bind(this);
  }

  // /**
  //  * Process the form.
  //  *
  //  * @param {object} event - the JavaScript event object
  //  */
  // processForm(event) {
    
  // }

  // /**
  //  * Change the user object.
  //  *
  //  * @param {object} event - the JavaScript event object
  //  */
  // changeUser(event) {
  //   const field = event.target.name;
  //   const user = this.state.user;
  //   user[field] = event.target.value;

  //   this.setState({
  //     user
  //   });
  // }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/allbooks');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // console.log(xhr.response)
        this.setState({
          successMessage: xhr.response.message,
          books: xhr.response.books,
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (<div>{this.state.books ? this.state.books.map((y,i) => {return (<CardExampleExpandable key={i} book={y} proposeTransfer={y => {console.log(y)}}/>)}) : ""}</div>
    );
  }

}

// BooksPage.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default BooksPage;