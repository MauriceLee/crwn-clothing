import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collection-overview/collection-overview.component";
import CategoryPage from "../category/category.component";

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:catogoryId`} component={CategoryPage} />
  </div>
);

export default ShopPage;
