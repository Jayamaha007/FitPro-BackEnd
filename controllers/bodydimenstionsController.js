import express from 'express'
import Dimensions from '../models/bodydimenstionsModel.js'


export const getDimensions = async (req, res) => {
    try {
      const { name } = req.params;
  
      if (!name) {
        return res.status(400).json({ error: 'Name parameter is required' });
      }
  
      const dimensions = await Dimensions.findOne({ imageName: name });
      console.log("Dimnesions :" + dimensions)
  
      if (!dimensions) {
        return res.status(404).json({ error: 'Dimensions not found' });
      }
  
      
      const hipSize = parseFloat(dimensions.hipSize);
      const waistSize = parseFloat(dimensions.waistSize);
      const gender = dimensions.gender
      const hipWasiRatio = (hipSize / waistSize).toFixed(2);
      
      console.log("GENDER "+ gender)
      console.log("hipSize "+ hipSize)
      console.log("waistSize "+ waistSize)

      let riskLevel;
  
      if (dimensions.gender === 'female') {
        if (hipWasiRatio <= 0.80) {
          riskLevel = 'low';
        } else if (hipWasiRatio <= 0.85) {
          riskLevel = 'moderate';
        } else {
          riskLevel = 'high';
        }
      } else if (gender === 'male') {
        if (hipWasiRatio <= 0.95) {
          riskLevel = 'low';
        } else if (hipWasiRatio <= 1.0) {
          riskLevel = 'moderate';
        } else {
          riskLevel = 'high';
        }
      }
  
      console.log('Hip Waist Ratio:', hipWasiRatio);
      console.log('Risk Level:', riskLevel);
  
      res.status(200).json({ dimensions, hipWasiRatio, riskLevel });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
