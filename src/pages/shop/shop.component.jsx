import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import './shop.style.scss';
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions.js";

import { CollectionPageContainer } from "../collection/collection.container.jsx";
import { CollectionOverviewContainer } from "../../components/collections-overview/collections-overview.container.jsx";

class ShopPage extends React.Component {
  componentDidMount(){
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }
 
  render() {
    const {match} = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
