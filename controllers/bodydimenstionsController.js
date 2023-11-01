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

    let riskLevel;
    let hipWasiRatio

    if (dimensions.ratio == "Not Detected") {
       hipWasiRatio = 'Not Detected';
       riskLevel = 'Not Detected';
    }
    else {

      hipWasiRatio = parseFloat(dimensions.ratio);
      const gender = dimensions.gender
      console.log("GENDER " + gender)

      if (dimensions.gender === 'female') {
        if (hipWasiRatio <= 0.85) {
          riskLevel = 'low';
        } else if (hipWasiRatio <= 0.90 && hipWasiRatio >= 0.85) {
          riskLevel = 'moderate';
        } else if ( hipWasiRatio >= 0.90 ){
          riskLevel = 'high';
        }
      } else if (gender === 'male') {
        if (hipWasiRatio <= 0.90) {
          riskLevel = 'low';
        } else if (hipWasiRatio <= 0.95 && hipWasiRatio >= 0.90 ) {
          riskLevel = 'moderate';
        } else if ( hipWasiRatio >= 0.95 ){
          riskLevel = 'high';
        }
      }

    }

    console.log('Hip Waist Ratio:', hipWasiRatio);
    console.log('Risk Level:', riskLevel);

    res.status(200).json({ dimensions, hipWasiRatio, riskLevel });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

