import React, { Component } from 'react';

export default class SearchView extends Component {
  // render required as always
  render() {
    return (
      <div id="search" className="row">
        <span className="col-md-1" />
        <form className="col-md-10">
          <div className="form-row align-items-center">

            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-addon">@</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={this.props.text}
                  onChange={this.props.onTextChange} />
              </div>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.onSubmit}>
                Search
              </button>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.props.onSave}>
                Save
              </button>
            </div>

          </div>
        </form>
      </div>
    );
  }
}
