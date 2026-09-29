import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Safe Model Loader (OverwriteModelError වැළැක්වීමට)
const getModel = (name, collection) =>
  mongoose.models[name] ||
  mongoose.model(
    name,
    new mongoose.Schema({}, { strict: false, timestamps: true }),
    collection
  );

const Villager = getModel('Villager', 'villagers');
const Appointment = getModel('Appointment', 'appointments');
const Complaint = getModel('Complaint', 'complaints');
const Announcement = getModel('Announcement', 'announcements');
const Office = getModel('Office', 'offices');
const Officer = getModel('Officer', 'officers');

// Middleware: MongoDB ObjectId පරීක්ෂාව
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format.' });
  }
  next();
};

/* =========================================================
   1. DASHBOARD SUMMARY
========================================================= */
router.get('/portal-summary', async (req, res) => {
  try {
    const [villagerCount, appointments, complaints, announcements] =
      await Promise.all([
        Villager.countDocuments(),
        Appointment.find().sort({ date: -1 }).limit(5).lean(),
        Complaint.find().sort({ createdAt: -1 }).limit(5).lean(),
        Announcement.find().sort({ createdAt: -1 }).limit(10).lean(),
      ]);

    res.json({
      totalVillagers: villagerCount,
      recentAppointments: appointments,
      recentComplaints: complaints,
      announcements: announcements,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   2. VILLAGERS CRUD
========================================================= */
router.get('/villagers', async (req, res) => {
  try {
    const villagers = await Villager.find().sort({ createdAt: -1 }).lean();
    res.json(villagers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/villagers', async (req, res) => {
  try {
    const newVillager = new Villager(req.body);
    await newVillager.save();
    res.status(201).json(newVillager);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/villagers/:id', validateId, async (req, res) => {
  try {
    const updated = await Villager.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Villager not found.' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/villagers/:id', validateId, async (req, res) => {
  try {
    const deleted = await Villager.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Villager not found.' });
    res.json({ message: 'Villager deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   3. APPOINTMENTS
========================================================= */
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 }).lean();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/appointments/:id/status', validateId, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required.' });

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: 'Appointment not found.' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/appointments/:id/note', validateId, async (req, res) => {
  try {
    const { officerNote } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { officerNote },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: 'Appointment not found.' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* =========================================================
   4. COMPLAINTS
========================================================= */
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }).lean();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/complaints/:id/status', validateId, async (req, res) => {
  try {
    const { status, officerNote } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (officerNote !== undefined) updateData.officerNote = officerNote;

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: 'Complaint not found.' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* =========================================================
   5. ANNOUNCEMENTS
========================================================= */
router.get('/announcements', async (req, res) => {
  try {
    const notices = await Announcement.find().sort({ createdAt: -1 }).lean();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/announcements', async (req, res) => {
  try {
    const newNotice = new Announcement(req.body);
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/announcements/:id', validateId, async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Notice not found.' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/announcements/:id', validateId, async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Notice not found.' });
    res.json({ message: 'Notice deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================================================
   6. OFFICES & OFFICER PROFILE / STATUS
========================================================= */
router.get('/offices', async (req, res) => {
  try {
    const offices = await Office.find().lean();
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/offices/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(200).json({ message: 'Local profile updated', ...req.body });
    }
    const updated = await Office.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated || req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/officers/status', async (req, res) => {
  try {
    const { status, statusMessage } = req.body;
    res.json({ success: true, status, statusMessage, updatedAt: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;