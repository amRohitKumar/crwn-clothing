import { connect } from 'react-redux';

import CollectionPage from './collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionLoading } from '../../redux/shop/shop.selector';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionLoading
});

export const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage));
