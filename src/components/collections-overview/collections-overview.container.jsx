import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectIsCollectionLoading } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import collectionsOverviewComponent from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionLoading
});

export const CollectionOverviewContainer =  connect(mapStateToProps)(WithSpinner(collectionsOverviewComponent));
