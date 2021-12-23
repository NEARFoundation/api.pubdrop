import { getCampaignContract } from '../../helpers/getCampaignContract.js';

export const getCampaignStatus = async (req, res) => {
  try {
    const { event } = req.query;
    const campaign = getCampaignContract(req.near, event);
    const metadata = await campaign.get_metadata();
    res.send({ isActive: metadata.active_drops > 0 });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Cannot check campaign status. Please try again' });
  }
};
