import mongoose from 'mongoose';

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }
  
  next();
};

export const validateIdFavorite = (req, res, next) => {
  const { id } = req.params;
  
      const isValidRoute = req.path.includes('/api/contacts/:id/favorite');
  
  if (isValidRoute && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
      }
  next();
};