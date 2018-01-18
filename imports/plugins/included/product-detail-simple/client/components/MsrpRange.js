import React from "react";
import { Currency } from "/imports/plugins/core/ui/client/components/";

const MSRPRange = (props) => {
  return (
    <div className="pdp price-range">
      <Currency {...props} />
    </div>
  );
};

export default MSRPRange;
