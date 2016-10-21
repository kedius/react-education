import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import context from '../utils/context';
import { createContact, updateContact } from '../actions/contacts';
import '../styles/contact-form.less';

@context({
  store: PropTypes.object.isRequired
})
class ContactForm extends Component {

  static propTypes = {
    contact: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phoneNumber: '',
      image: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.contact) {
      this.setState(this.props.contact.toJS());
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.context.store;

    if (this.state.id) {
      dispatch(updateContact(this.state));
    } else {
      dispatch(createContact(this.state));
    }

    if (this.props.handleSubmit) {
      this.props.handleSubmit(this.state);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange} />
          </div>
          <div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              required />
          </div>
          <div>
            <input
              type="text"
              name="image"
              placeholder="Image Uri"
              value={this.state.image}
              onChange={this.handleChange}
              required />
          </div>
          <div>
            <button>
              {this.state.id ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
