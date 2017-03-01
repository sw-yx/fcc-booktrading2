import React, { PropTypes } from 'react';
import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class CardExampleExpandable extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (<Card>
      <CardHeader
        title={"Title: " + this.props.book.title}
      />
      <CardActions>
        {(this.props.book.wanters.length > 0 ? <FlatButton label="Accept Transfer" /> : <div />)}
        <FlatButton label="Delete" onClick={() => {this.props.deleteCard(this.props.book)}}/>
      </CardActions>
  </Card>)
  }
}


const Dashboard = ({ 
  secretData,
  onSubmit,
  onChange,
  errors,
  user,
  books,
  newbook,
  onSubmitBook,
  onChangeBook,
  deleteCard
 }) => (
  <Card className="container">
    <CardTitle
      title="User Dashboard"
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}

    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">User Details</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Full Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="City"
          name="city"
          errorText={errors.city}
          onChange={onChange}
          value={user.city}
        />
        <TextField
          floatingLabelText="State"
          name="state"
          onChange={onChange}
          errorText={errors.state}
          value={user.state}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Save Account Details" primary />
      </div>
    </form>

    <form action="/" onSubmit={onSubmitBook}>
      <h2>My Books:
      </h2>
      {books.map((x,i)=> {return <CardExampleExpandable key={i} book={x} deleteCard={deleteCard}/>})}
      <h2 className="card-heading">Add Book</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="Book Name"
          name="bookname"
          errorText={errors.bookname}
          onChange={onChangeBook}
          value={newbook}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add Book" primary />
      </div>
    </form>


  </Card>
);

Dashboard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  // books: PropTypes.object.isRequired,
  // newbook: PropTypes.object.isRequired,
  secretData: PropTypes.string.isRequired,
  onSubmitBook: PropTypes.func.isRequired,
  onChangeBook: PropTypes.func.isRequired
};

export default Dashboard;