import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './components/Modals/Modal'
import DataTable from './components/Tables/DataTable'
import { CSVLink } from "react-csv"
import { dati } from './actions/crud'

import PropTypes from "prop-types";

import { connect } from "react-redux";

class App extends Component {
  state = {
    items: []
  }

  getItems() {
    this.props.dispatch(dati());
    // fetch('/crud')
    //   .then(response => response.json())
    //   .then(items => this.setState({ items }))
    //   .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    console.log('add intemmmmmm')
    this.props.dispatch(dati());
    // this.setState(prevState => ({
    //   items: [...prevState.items, item]
    // }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <DataTable items={this.props.dati} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={this.props.dati}>
              Download CSV
            </CSVLink>
            <ModalForm className="modal-xl" buttonLabel="Add Item" addItemToState={this.addItemToState} />
          </Col>
        </Row>
      </Container>
    )
  }
}

App.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { crud } = state;
  return {
    dati: crud.dati
  };
};

export default connect(mapStateToProps)(App);