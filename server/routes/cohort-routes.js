const express = require('express');
const router = express.Router();
const Cohort = require('../models/Cohort.model');

router.get('/', async (req, res) => {
    try {
        const cohorts = await Cohort.find();
        res.json(cohorts);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong on the server',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCohort = await Cohort.create(req.body);
        res.status(201).json(newCohort);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong on the server',
        });
    }
});

router.get('/cohort/:cohortId', async (req, res) => {
    try {
        console.log('req.params.cohortId)', req.params.cohortId);
        const oneCohort = await Cohort.findById(req.params.cohortId);
        res.json(oneCohort);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong on the server',
        });
    }
});

router.put('/cohort/:cohortId', async (req, res) => {
    try {
        const updatedCohort = await Cohort.findByIdAndUpdate(
            req.params.cohortId,
            req.body,
            { new: true }
        );
        res.status(202).json(updatedCohort);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong on the server',
        });
    }
});

router.delete('/cohort/:cohortId', async (req, res) => {
    try {
        const cohortToDelete = await Cohort.findByIdAndDelete(
            req.params.cohortId
        );
        res.status(202).json({
            message: `${cohortToDelete.cohortName} was removed from the db`,
        });
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong on the server',
        });
    }
});

module.exports = router;
