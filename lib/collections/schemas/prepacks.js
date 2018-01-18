import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Metafield } from "./metafield";
import { shopIdAutoValue } from "./helpers";

export const Prepacks = new SimpleSchema({
  _id: {
    type: String
  },
  packName: {
    type: String,
    label:"Prepack Name"
  },
  brand: {
    type: String,
    label:"Brand Name"
  },
  category: {
    type: String,
    label:"Category Name"
  },
  size: {
    type: String,
    label:"Size "
  },

  shopId: {
    type: String,
    autoValue: shopIdAutoValue,
    regEx: SimpleSchema.RegEx.Id,
    index: 1
  },
  packQuantity:{
    type:Number,
    defaultValue:0
  },
  qty:{
    type:Number,
    defaultValue:0
  },
  "prepack":{
    type:[Metafield],
    optional:true
  }
});
