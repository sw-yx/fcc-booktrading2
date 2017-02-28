import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const Dashboard = ({ 
  secretData,
  onSubmit,
  onChange,
  errors,
  user,
 }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}

    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
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
      </div>

      <div className="field-line">
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



  </Card>
);

Dashboard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  secretData: PropTypes.string.isRequired
};

export default Dashboard;