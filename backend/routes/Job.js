import express from "express";
import Job from "../models/JobModels.js";

const router = express.Router();


// Get all jobs
router.get("/", async (req, res) => {

  try {

    const jobs = await Job.find()
      .sort({
        createdAt: -1
      });

    res.json(jobs);


  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch jobs"
    });

  }

});



// Search jobs
router.get("/search", async (req, res) => {

  try {

    const keyword = req.query.keyword || "";
    const location = req.query.location || "";


    const jobs = await Job.find({

      title: {
        $regex: keyword,
        $options: "i"
      },

      location: {
        $regex: location,
        $options: "i"
      }

    });


    res.json(jobs);


  } catch (error) {

    res.status(500).json({
      message: "Search failed"
    });

  }

});



// Latest jobs
router.get("/latest", async (req, res) => {

  try {

    const jobs = await Job.find()
      .sort({
        createdAt: -1
      })
      .limit(6);


    res.json(jobs);


  } catch(error) {

    res.status(500).json({
      message:"Latest jobs error"
    });

  }

});



// Categories
router.get("/categories", async(req,res)=>{

  try{

    const categories = await Job.distinct(
      "category"
    );

    res.json(categories);


  }catch(error){

    res.status(500).json({
      message:"Category error"
    });

  }

});



// ⭐ Get single job details by ID
router.get("/:id", async(req,res)=>{

  try{

    const job = await Job.findById(
      req.params.id
    );


    if(!job){

      return res.status(404).json({
        message:"Job not found"
      });

    }


    res.status(200).json(job);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});



export default router;