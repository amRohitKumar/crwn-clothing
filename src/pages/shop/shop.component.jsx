import React,{useEffect} from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import './shop.style.scss';
import { fetchCollectionsStart  } from "../../redux/shop/shop.actions";

import { CollectionPageContainer } from "../collection/collection.container.jsx";
import { CollectionOverviewContainer } from "../../components/collections-overview/collections-overview.container.jsx";

const ShopPage = ({match, fetchCollectionsStart}) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
