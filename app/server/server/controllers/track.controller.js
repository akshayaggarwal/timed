import Track from '../models/track.model';

/**
 * Load track and append to req.
 */
function load(req, res, next, id) {
  Track.get(id)
    .then((track) => {
      req.track = track; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get track
 * @returns {Track}
 */
function get(req, res) {
  return res.json(req.track);
}

/**
 * Create new track
 * @property {string} req.body.auth0Id - The auth0Id of track.
 * @returns {Track}
 */
function create(req, res, next) {
  const track = new Track({
    auth0Id: req.body.auth0Id
  });

  track.save()
    .then(savedtrack => res.json(savedtrack))
    .catch(e => next(e));
}

/**
 * Update existing track
 * @property {string} req.body.today - Time tracked today.
 * @property {string} req.body.total - Time tracked since the beginning.
 * @returns {Track}
 */
function update(req, res, next) {
  // to understand strict: false, see http://stackoverflow.com/questions/20211970/i-cant-modify-an-array-in-node#answer-20215360
  track.set('today', req.body.today, { strict: false });
  track.set('total', req.body.total, { strict: false });
  track.save()
    .then(savedtrack => res.json(savedtrack))
    .catch(e => next(e));
}

/**
 * Get user's track list.
 * @returns {Track[]}
 */
function list(req, res, next) {
  // console.log(req.user) // auth0Id is in sub property
  // Track.find({ auth0Id: req.user.auth0Id }) // TODO
  Track.find({ auth0Id: req.user.sub })
    .populate('website')
    .then(tracks => res.json(tracks))
    .catch(e => next(e));
}

/**
 * Find user's track list with query.
 * @returns {Track[]}
 */
function find(req, res, next) {
  // console.log(req.user) // auth0Id is in sub property
  // Track.find({ auth0Id: req.user.auth0Id }) // TODO
  console.log(req.user)
  let query = { auth0Id: req.user.sub };
  if (req.query.website)
    query.website = req.query.website;
  Track.find(query)
    .then(tracks => res.json(tracks))
    .catch(e => next(e));
}

/**
 * Delete track.
 * @returns {Track}
 */
function remove(req, res, next) {
  const track = req.track;
  track.remove()
    .then(deletedTrack => res.json(deletedTrack))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, find };
