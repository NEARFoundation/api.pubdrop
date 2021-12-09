import { isAccessKey } from '../../helpers/isAccessKey.js';

/*
  Get key status. If a contract account doesn't have a key, it means the key was used
  (drop was claimed)
 */

export const getKeyStatus = async (req, res) => {
  try {
    const { publicKey, event } = req.query;
    const isKey = await isAccessKey(req.near, publicKey, event);
    res.send({ isActive: isKey });
  } catch (e) {
    res.status(500).send({ error: 'Cannot check key status. Please try again' });
  }
};
