import { getCampaignContract } from '../../helpers/getCampaignContract.js';

export const checkCampaignStatus = async (event, near) => {
  const campaign = getCampaignContract(near, event);
  const metadata = await campaign.get_metadata();
  return metadata.active_drops > 0;
}
