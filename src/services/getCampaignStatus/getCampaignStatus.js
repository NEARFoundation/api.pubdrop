import { checkCampaignStatus } from "./checkCampaignStatus.js";

export const getCampaignStatus = async (req, res) => {
  try {
    const { event } = req.query;
    res.send({ isActive: checkCampaignStatus(event, req.near) });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Cannot check campaign status. Please try again' });
  }
};
