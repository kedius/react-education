import React, { Component, PropTypes } from 'react';

import context from '../utils/context';
import { deleteContact } from '../actions/contacts';

import ContactForm from './contact-form';

@context({
  store: PropTypes.object.isRequired
})
class ContactItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };

    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  static propTypes = {
    contact: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.contact.equals(this.props.contact)
      || nextState.editMode !== this.state.editMode;
  }

  handleChangeMode(e) {
    e.preventDefault();
    this.setState({ editMode: true });
  }

  handleUpdate(contact) {
    this.setState({ editMode: false });
  }

  deleteContact(e) {
    e.preventDefault();
    const { dispatch } = this.context.store;
    const { contact } = this.props;

    dispatch(deleteContact(contact.get('id')));
  }

  renderEditMode() {
    return (
      <li>
        <ContactForm
          handleSubmit={this.handleUpdate}
          contact={this.props.contact} />
      </li>
    );
  }

  renderViewMode() {
    const { contact } = this.props;
    
    return (
      <li className="contact-item">
        <div className="image">
          <img src={contact.get('image')} width="45px" height="45px" />
        </div>
        <div className="info">
          <div>{contact.get('name')}</div>
          <div className="phone-number">{contact.get('phoneNumber')}</div>
          <div>
            <a href="#" onClick={this.handleChangeMode}>Edit</a>
            <a href="#" onClick={this.deleteContact}>Delete</a>
          </div>
        </div>
      </li>
    );
  }

  render() {
    return this.state.editMode
      ? this.renderEditMode()
      : this.renderViewMode();
  }
}

export default ContactItem;
