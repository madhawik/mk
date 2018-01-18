import React from "react";
import { Currency } from "/imports/plugins/core/ui/client/components/";

const EstimatedFCCRange = (props) => {
  return (
    <div className="pdp price-range">
      <Currency {...props} />
    </div>
  );
};

export default EstimatedFCCRange;
