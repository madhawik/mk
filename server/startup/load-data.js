import { Meteor } from "meteor/meteor";
import { Shops } from "/lib/collections";
import { Logger, Reaction } from "/server/api";
import { Fixture } from "/server/api/core/import";

export default function () {
  /**
   * Hook to setup core additional imports during Reaction init (shops process first)
   */
  Logger.info("Load default data from /private/data/");

  try {
    Reaction.Import.process(Assets.getText("data/Shops.json"), ["name"], Reaction.Import.shop);
    // ensure Shops are loaded first.
    Reaction.Import.flush(Shops);
  } catch (error) {
    Logger.error(error, "Bypassing loading Shop default data");
  }

  // make sure the default shop has been created before going further
  while (!Reaction.getShopId()) {
    Logger.debug("Loading default shop, waiting until it's ready before moving on...");
    Meteor._sleepForMs(1000);
  }

  try {
    Fixture.process(Assets.getText("data/Prepacks.json"), ["packName"], Reaction.Import.load);
    Logger.info("prepack");
    Reaction.Import.flush();
  } catch (error) {
    Logger.info("Bypassing loading Prepacks default data.");
    Logger.info(error);
  }

  //  try {
  //   Fixture.process(Assets.getText("data/Products.json"), ["title"], Reaction.Import.load);
  // } catch (error) {
  //   Logger.info("Bypassing loading Products default data.");
  //   console.log(error);
  //
  // }

  try {
    Logger.debug("Loading Tag Data");
    Fixture.process(Assets.getText("data/Tags.json"), ["name"], Reaction.Import.tag);
  } catch (error) {
    Logger.error(error, "Bypassing loading Tags default data.");
  }

  // try {
  //   Logger.debug("Loading Product Image Data");
  //   Fixture.process(Assets.getText("data/productsimages.json"), ["imageUrl"], Reaction.Import.mediaImage);
  // } catch (error) {
  //   Logger.error(error, "Bypassing loading image default data.");
  // }
  //
  // these will flush and import with the rest of the imports from core init.
  // but Bulk.find.upsert() = false
  //
  Fixture.flush();
}
