
import express from "express";
import { BranchController } from '../controllers/branchConrtoller.js'


const branchRouter = express.Router();
const branchConrtoller = new BranchController();
// const branchController = new BranchController();

branchRouter.get("/", branchConrtoller.getAllBranches)


// branchRouter.get("/:city", branchConrtoller.geAllBranchesByCity)
// branchRouter.post("/", async (req, res) => {
//     let closeBranches = [];
//     const nodeGeocoder = require("node-geocoder");
//     if (req.body.address === undefined) {
//       res.json("missing user adrress");
//     } else {
//       let options = {
//         provider: "google",
//         apiKey: "AIzaSyC52R7VHe5-Etup41G8odeCv0Qr-3wyqcA",
//       };
//       let userLatitude;
//       let userLongitude;
//       let geoCoder = nodeGeocoder(options);
//       geoCoder.geocode(req.body.address).then((res) => {
//         userLatitude = res[0].latitude;
//         userLongitude = res[0].longitude;
//       });
//       await branches
//         .find()
//         .toArray()
//         .then(async (result) => {
//           for (let i = 0; i < result.length; i++) {
//             await geoCoder.geocode(result[i].street).then(async (res2) => {
//               let branchLatitude = res2[0].latitude;
//               let branchLongitude = res2[0].longitude;
//               if (
//                 Math.abs(branchLatitude - userLatitude) < 0.02 &&
//                 Math.abs(branchLongitude - userLongitude) < 0.02
//               ) {
//                 await closeBranches.push(result[i]);
//               }
//             });
//           }
//         });
  
//       res.json(closeBranches);
//     }
//   });
// eyeglassesRouter.put("/:model", branchController.updateEyeGlasses)
// eyeglassesRouter.post("/", branchController.addEyeglasses)
// eyeglassesRouter.get("/", branchController.getAllEyeglasses)
// וגם להוסיף סניפיםהמנהל צריך שיהיה יכול גם למחוק וגם לעדכן
// eyeglassesRouter.delete("/:model", branchController.deleteEyeglasses)

export {
    branchRouter
}