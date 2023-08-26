import express from 'express'
import Dimensions from '../models/bodydimenstionsModel.js'


export const getDimensions = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }

    const dime = await Dimensions.find({ imageName: name });

    res.status(200).json(dime);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
