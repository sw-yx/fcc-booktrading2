import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      errors: {},
      books : [],
      newbook : "",
      user: {
        name: '',
        city: '',
        state: '',
        _id: ''
      }
    };
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const city = encodeURIComponent(this.state.user.city);
    const state = encodeURIComponent(this.state.user.state);
    const formData = `name=${name}&city=${city}&state=${state}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          secretData: xhr.response.message,
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect // no redirect needed
        // this.context.router.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }


  /**
   * Process the book adding form.
   *
   * @param {object} event - the JavaScript event object
   */
  submitBook(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const newbook = encodeURIComponent(this.state.newbook);
    // const formData = `newbook=${newbook}&owner=${this.state.user._id}`;
    const formData = `newbook=${newbook}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/book');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          secretData: xhr.response.message,
          errors: {},
          // books: this.state.books.concat([newbook]),
          newbook: ""
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        this.loadInfo();
        // make a redirect // no redirect needed
        // this.context.router.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeBook(event) {
    // const field = event.target.name;
    // const newbook = this.state.newbook;
    const newbook = event.target.value;
    this.setState({
      newbook
    });
  }

  deleteCard(book) {
    // create a string for an HTTP body message
    const bookid = encodeURIComponent(book._id);
    // const formData = `newbook=${newbook}&owner=${this.state.user._id}`;
    const formData = `bookid=${bookid}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('delete', '/api/book');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   this.loadInfo();
    // })
    xhr.send(formData);
    // console.log('deleteCard', book)
    this.loadInfo();
  }

  loadInfo(){
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // console.log(xhr.response)
        this.setState({
          secretData: xhr.response.message,
          user: {
            name: xhr.response.user.name,
            city: xhr.response.user.city,
            state: xhr.response.user.state,
            _id: xhr.response.user._id,
          },
          books: xhr.response.books,
        });
      }
    });
    xhr.send();
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    this.loadInfo();
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard 
      secretData={this.state.secretData} 
      onSubmit={(y) => this.processForm(y)}
      onChange={(y) => this.changeUser(y)}
      errors={this.state.errors}
      user={this.state.user}
      books = {this.state.books}
      newbook = {this.state.newbook}
      onSubmitBook={(y) => this.submitBook(y)}
      onChangeBook={(y) => this.changeBook(y)}
      deleteCard={(y) => this.deleteCard(y)}
      />);
  }

}

export default DashboardPage;