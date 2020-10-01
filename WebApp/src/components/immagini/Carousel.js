import React, { Component } from "react";
import { UncontrolledCarousel } from "reactstrap";

export default class carousel extends Component {
  render() {
    const { data } = this.props;
    if (data == null) return null;
    let items = [];
    data.forEach((element, index) => {
      items.push({
        src: "/" + element.filename,
        altText: element.originalname,
        caption: "",
      });
    });

    return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <UncontrolledCarousel
            autoPlay={false}
            items={items}
          />
        </div>
      </div>
    );
  }
}
